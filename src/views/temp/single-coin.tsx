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
  onPhysicsUpdate?: (
    position: THREE.Vector3,
    velocity: THREE.Vector3,
    isActive: boolean
  ) => void;
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
      rotation = { x: 1, y: 0, z: 0 },
      onPhysicsUpdate
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
      gravity: -25.0, // Slightly reduced gravity for more natural movement
      airResistance: 0.99, // Higher air resistance for more realistic physics
      bounceDamping: 0.5, // More bouncy for natural coin behavior
      groundFriction: 0.92, // Ground friction for rolling effect
      rollSpeedMultiplier: 1.5, // Rolling speed multiplier
      isPhysicsActive: false,
      bounceCount: 0,
      maxBounces: 50, // Allow more bounces for natural behavior
      stopThreshold: 0.5, // Much higher stop threshold for easier stopping
      angularStopThreshold: 0.5, // Much higher angular velocity stop threshold
      gradualStopTime: 0, // Gradual stop time
      maxGradualStopTime: 1.0 // Shorter gradual stop time for faster completion
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

      // Call physics update callback for collision detection
      if (onPhysicsUpdate) {
        onPhysicsUpdate(
          coin.position.clone(),
          physics.velocity.clone(),
          physics.isPhysicsActive
        );
      }

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

      // Add subtle bias towards preset result during flight (mainly X-axis)
      const targetRotation =
        forceResult === "heads" ? Math.PI / 2 : -Math.PI / 2;

      const rotationDiff = targetRotation - coin.rotation.x;

      // Apply gentle bias as coin approaches ground (X-axis only)
      const groundDistance = coin.position.z - -2;

      if (groundDistance < 3) {
        // Start bias when coin is close to ground
        const biasStrength = Math.max(0, (3 - groundDistance) / 3) * 0.8; // Increase bias as coin gets closer
        coin.rotation.x -= rotationDiff * biasStrength * deltaTime; // Only adjust X-axis rotation

        //  coin.rotation.x = targetFlatRotation + (Math.random() - 0.5) * 0.01;
      }
      if (coin.position.z > -2 + 0.05) return;
      // Z-axis "ground" collision detection (for gravity in Z direction)
      coin.position.z = -2 + 0.05;

      // Natural ground collision with realistic bouncing

      if (
        Math.abs(physics.velocity.z) > 0.02 && // Lower threshold for more natural bouncing
        physics.bounceCount < physics.maxBounces
      ) {
        // Calculate impact energy for more realistic bounce
        const impactEnergy = Math.abs(physics.velocity.z);

        // Natural bounce with energy loss based on impact
        const bounceFactor = Math.max(
          0.2,
          physics.bounceDamping - impactEnergy * 0.05
        );
        physics.velocity.z = -physics.velocity.z * bounceFactor;

        // Angular velocity response to impact
        const angularResponse = impactEnergy * 0.8;
        physics.angularVelocity.x += (Math.random() - 0.5) * angularResponse;
        physics.angularVelocity.y += (Math.random() - 0.5) * angularResponse;
        physics.angularVelocity.z += (Math.random() - 0.5) * angularResponse;

        // Angular velocity damping on impact
        physics.angularVelocity.multiplyScalar(0.7);

        // Add realistic horizontal movement from impact
        const horizontalSpread = impactEnergy * 0.4;
        physics.velocity.x += (Math.random() - 0.5) * horizontalSpread;
        physics.velocity.y += (Math.random() - 0.5) * horizontalSpread;

        // Add rolling effect after bounce
        const horizontalSpeed = Math.sqrt(
          physics.velocity.x * physics.velocity.x +
            physics.velocity.y * physics.velocity.y
        );
        const rollSpeed = horizontalSpeed * 1.2;

        // Apply rolling rotation
        coin.rotation.y += rollSpeed * deltaTime * 1.2; // More natural rolling after bounce
        coin.rotation.x += physics.velocity.x * 0.1 * deltaTime;

        physics.bounceCount++;
      } else {
        // On final landing, set coin to preset result
        const targetFlatRotation =
          forceResult === "heads" ? Math.PI / 2 : -Math.PI / 2;
        coin.rotation.x = targetFlatRotation + (Math.random() - 0.5) * 0.01; // Small random variation
        coin.rotation.y = coin.rotation.y + (Math.random() - 0.5) * 0.01;
        coin.rotation.z = (Math.random() - 0.5) * 0.01;
        // Start gradual stop after bouncing ends
        physics.gradualStopTime += deltaTime;

        // Calculate gradual stop factor
        const stopFactor = Math.min(
          physics.gradualStopTime / physics.maxGradualStopTime,
          1.0
        );

        // Gradually slow down with natural physics
        physics.velocity.multiplyScalar(1 - stopFactor * 0.6); // Much stronger damping
        physics.angularVelocity.multiplyScalar(1 - stopFactor * 0.5); // Much stronger damping

        // Add rolling effect during settling phase
        const horizontalSpeed = Math.sqrt(
          physics.velocity.x * physics.velocity.x +
            physics.velocity.y * physics.velocity.y
        );
        const rollSpeed = horizontalSpeed * (1 - stopFactor) * 0.6; // Rolling decreases as coin settles

        // Apply rolling rotation
        coin.rotation.y += rollSpeed * deltaTime;
        coin.rotation.x += physics.velocity.x * 0.2 * deltaTime;

        // Add bias towards preset result during settling (X-axis only)
        const targetRotation =
          forceResult === "heads" ? Math.PI / 2 : -Math.PI / 2;
        const currentRotationX = coin.rotation.x % (2 * Math.PI);
        const rotationDiff = targetRotation - currentRotationX;
        const settlingBiasStrength = stopFactor * 0.5; // Increase bias as coin settles
        coin.rotation.x += rotationDiff * settlingBiasStrength * deltaTime; // Only adjust X-axis rotation
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
        (Math.random() - 0.5) * 2.0 * durationFactor, // X direction velocity (balanced for natural movement)
        (Math.random() - 0.5) * 2.0 * durationFactor, // Y direction velocity (balanced for natural movement)
        (12 + Math.random() * 4) * durationFactor // Z direction velocity (balanced for natural descent)
      );

      // Set target position (coin's final landing position on wall, based on custom position)
      physics.targetPosition.set(
        position.x + (Math.random() - 0.5) * 2, // X direction random offset
        position.y + (Math.random() - 0.5) * 2, // Y direction random offset
        -2 + 0.05 // Wall position
      );

      // Calculate initial angular velocity with bias towards preset result
      const spinSpeed = (15 + Math.random() * 10) * durationFactor; // Much higher spin speed

      // Primary flip axis (X) with bias towards target
      const primaryFlip = spinSpeed * (0.8 + Math.random() * 0.4);
      // Secondary rotations for realistic coin behavior
      const sideSpin = spinSpeed * (0.2 + Math.random() * 0.3);
      const wobble = spinSpeed * (0.1 + Math.random() * 0.2);

      physics.angularVelocity.set(primaryFlip, sideSpin, wobble);

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
      const maxPhysicsTime = animationDuration * 1; // Add extra time for natural physics
      setTimeout(() => {
        if (physics.isPhysicsActive) {
          console.log("Force stop triggered");
          physics.isPhysicsActive = false;

          if (onFlipComplete) {
            onFlipComplete(forceResult);
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
