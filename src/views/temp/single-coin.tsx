import { useEffect, useImperativeHandle, useRef, forwardRef } from "react";
import * as THREE from "three";
import { createCoin } from "./helpers";

interface SingleCoinProps {
  scene: THREE.Scene | null;
  camera: THREE.Camera | null;
  renderer: any;
  isFlipping: boolean;
  animationDuration: number;
  forceResult: "heads" | "tails";
  onFlipComplete: (result: "heads" | "tails") => void;
  autoFlip: boolean;
  position?: { x: number; y: number; z: number };
  scale?: number;
  rotation?: { x: number; y: number; z: number };
}

const SingleCoin = forwardRef<any, SingleCoinProps>(
  (
    {
      scene,
      camera,
      renderer,
      isFlipping,
      animationDuration = 3000,
      forceResult,
      onFlipComplete,
      autoFlip = false,
      position = { x: 0, y: 0, z: 2 },
      scale = 1,
      rotation = { x: 1, y: 0, z: 0 }
    },
    ref
  ) => {
    const animationRef = useRef<number | null>(null);
    const coinRef = useRef<THREE.Mesh | null>(null);
    // Physics parameters
    const physicsRef = useRef({
      velocity: new THREE.Vector3(0, 0, 0),
      angularVelocity: new THREE.Vector3(0, 0, 0),
      // Target state parameters
      targetPosition: new THREE.Vector3(0, 0, 0),
      targetRotation: new THREE.Vector3(0, 0, 0),
      targetVelocity: new THREE.Vector3(0, 0, 0),
      // Physics parameters
      gravity: -9.8,
      airResistance: 0.99,
      bounceDamping: 0.6,
      isPhysicsActive: false,
      bounceCount: 0,
      maxBounces: 3,
      stopThreshold: 0.1, // Stop threshold
      angularStopThreshold: 0.05, // Angular velocity stop threshold
      gradualStopTime: 0, // Gradual stop time
      maxGradualStopTime: 2.0 // Maximum gradual stop time (seconds)
    });

    useEffect(() => {
      if (!scene) return;

      const coin = createCoin(scene);

      // Apply custom position, scale and rotation
      coin.position.set(position.x, position.y, position.z);
      coin.scale.set(scale, scale, scale);
      coin.rotation.set(rotation.x, rotation.y, rotation.z);

      coinRef.current = coin;
      scene.add(coin);

      // Render loop
      const animate = () => {
        animationRef.current = requestAnimationFrame(animate);

        // Update physics simulation
        if (physicsRef.current.isPhysicsActive) {
          updatePhysics(0.016); // 60fps
        } else if (coinRef.current && !isFlipping) {
          // Add subtle wobble effect to make coin look more natural
          const time = Date.now() * 0.001;
          const coin = coinRef.current;
          coin.rotation.y += Math.sin(time) * 0.001;
          coin.rotation.z += Math.cos(time * 0.7) * 0.001;
        }

        renderer.render(scene, camera);
      };
      animate();

      // Cleanup function
      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }, [scene]);

    const updatePhysics = (deltaTime: number) => {
      if (!coinRef.current) return;

      const coin = coinRef.current;
      const physics = physicsRef.current;

      // Apply gravity in Z direction (forward throw direction)
      physics.velocity.z += physics.gravity * deltaTime;

      // Apply air resistance
      physics.velocity.multiplyScalar(physics.airResistance);
      physics.angularVelocity.multiplyScalar(physics.airResistance);

      // Update position
      coin.position.add(physics.velocity.clone().multiplyScalar(deltaTime));

      // Update rotation
      coin.rotation.x += physics.angularVelocity.x * deltaTime;
      coin.rotation.y += physics.angularVelocity.y * deltaTime;
      coin.rotation.z += physics.angularVelocity.z * deltaTime;

      // Z-axis "ground" collision detection (for gravity in Z direction)
      if (coin.position.z <= -2 + 0.05) {
        coin.position.z = -2 + 0.05;

        // Enhanced bounce on Z-axis "ground"
        if (
          Math.abs(physics.velocity.z) > 0.3 &&
          physics.bounceCount < physics.maxBounces
        ) {
          physics.velocity.z = -physics.velocity.z * physics.bounceDamping;
          physics.angularVelocity.multiplyScalar(0.7);
          physics.bounceCount++;

          // Add some horizontal randomness
          physics.velocity.x += (Math.random() - 0.5) * 0.5;
          physics.velocity.y += (Math.random() - 0.5) * 0.5;
        } else {
          // Start gradual stop after bouncing ends
          physics.gradualStopTime += deltaTime;

          // Calculate gradual stop factor
          const stopFactor = Math.min(
            physics.gradualStopTime / physics.maxGradualStopTime,
            1.0
          );

          // Gradually slow down and guide to target state
          physics.velocity.multiplyScalar(1 - stopFactor * 0.1);
          physics.angularVelocity.multiplyScalar(1 - stopFactor * 0.15);

          // Add target state guidance
          const positionDiff = physics.targetPosition
            .clone()
            .sub(coin.position);
          const rotationDiff = physics.targetRotation
            .clone()
            .sub(
              new THREE.Vector3(
                coin.rotation.x,
                coin.rotation.y,
                coin.rotation.z
              )
            );

          // Slightly adjust position and rotation to guide to target state
          if (stopFactor > 0.3) {
            // Start guidance in later stages of gradual stop
            const guideStrength = (stopFactor - 0.3) * 0.1; // Guidance strength
            coin.position.add(
              positionDiff.multiplyScalar(guideStrength * deltaTime)
            );

            const rotationGuide = rotationDiff.multiplyScalar(
              guideStrength * deltaTime
            );
            coin.rotation.x += rotationGuide.x;
            coin.rotation.y += rotationGuide.y;
            coin.rotation.z += rotationGuide.z;
          }

          // Check if completely stopped
          const velocityMagnitude = physics.velocity.length();
          const angularVelocityMagnitude = physics.angularVelocity.length();

          if (
            velocityMagnitude < physics.stopThreshold &&
            angularVelocityMagnitude < physics.angularStopThreshold &&
            physics.gradualStopTime > 0.5 // At least 0.5 seconds of gradual stop
          ) {
            // Completely stop and set to target state - ensure flat on Z-axis
            physics.velocity.set(0, 0, 0);
            physics.angularVelocity.set(0, 0, 0);
            coin.position.copy(physics.targetPosition);
            coin.rotation.set(
              physics.targetRotation.x,
              physics.targetRotation.y,
              physics.targetRotation.z
            );
            physics.isPhysicsActive = false;
          }
        }
      }
    };

    // Flip coin animation
    const flipCoin = () => {
      if (isFlipping || !coinRef.current) return;

      const coin = coinRef.current;
      const physics = physicsRef.current;

      // Reset coin to initial state (using custom position) - flat on Z-axis
      coin.rotation.set(Math.PI / 2, 0, 0);
      coin.position.set(position.x, position.y, position.z);

      // Reset physics state
      physics.bounceCount = 0;
      physics.gradualStopTime = 0;

      // Adjust physics parameters based on animation duration
      const durationFactor = animationDuration / 3000; // Duration factor relative to 3 seconds

      physics.velocity.set(
        (Math.random() - 0.5) * 1.5 * durationFactor, // X direction velocity
        (Math.random() - 0.5) * 1.5 * durationFactor,
        // Y direction velocity
        (6 + Math.random() * 3) * durationFactor // Z direction velocity (upward)
      );

      // Preset target state based on forced result - visible result
      if (forceResult === "heads") {
        physics.targetRotation.set(
          6 + Math.random(), // X-axis: ensure heads face user
          10, // Y-axis: random rotation
          10 // Z-axis: random rotation
        );
      } else if (forceResult === "tails") {
        physics.targetRotation.set(
          2 + Math.random(), // X-axis: ensure tails face user
          10, // Y-axis: random rotation
          10 // Z-axis: random rotation
        );
      }

      // Set target position (coin's final landing position on wall, based on custom position)
      physics.targetPosition.set(
        position.x + (Math.random() - 0.5) * 2, // X direction random offset
        position.y + (Math.random() - 0.5) * 2, // Y direction random offset
        -2 + 0.05 // Wall position
      );

      // Set target velocity (coin's final stop)
      physics.targetVelocity.set(0, 0, 0);

      // Calculate initial angular velocity based on target state
      const currentRotation = new THREE.Vector3(Math.PI / 2, 0, 0); // Initial orientation
      const rotationDiff = physics.targetRotation.clone().sub(currentRotation);
      const angularVelocity = rotationDiff.multiplyScalar(
        2 / (animationDuration / 1000)
      );

      physics.angularVelocity.copy(angularVelocity);

      // Activate physics simulation
      physics.isPhysicsActive = true;

      // Monitor physics simulation completion
      const checkPhysicsComplete = () => {
        if (!physics.isPhysicsActive) {
          // Use preset result
          const actualResult = forceResult;

          if (onFlipComplete) {
            onFlipComplete(actualResult);
          }
        } else {
          // Continue checking
          requestAnimationFrame(checkPhysicsComplete);
        }
      };

      // Start checking physics simulation status
      setTimeout(() => {
        checkPhysicsComplete();
      }, 100);

      // Force stop mechanism - prevent physics simulation from getting stuck
      const maxPhysicsTime = animationDuration; // Add extra time for smooth transition
      setTimeout(() => {
        if (physics.isPhysicsActive) {
          console.log("Force stop physics simulation");
          physics.isPhysicsActive = false;
          physics.velocity.set(0, 0, 0);
          physics.angularVelocity.set(0, 0, 0);

          // Use preset result
          const actualResult = forceResult;

          if (onFlipComplete) {
            onFlipComplete(actualResult);
          }
        }
      }, maxPhysicsTime);
    };

    // Auto flip
    useEffect(() => {
      if (autoFlip && !isFlipping) {
        const timer = setTimeout(() => {
          flipCoin();
        }, 1000);
        return () => clearTimeout(timer);
      }
    }, [autoFlip, isFlipping]);

    useImperativeHandle(ref, () => ({
      flipCoin
    }));

    return null;
  }
);

export default SingleCoin;
