import { useEffect, useImperativeHandle, useRef, forwardRef } from "react";
import * as THREE from "three";
import * as CANNON from "cannon-es";
import { gsap } from "gsap";

const CannonCoin = forwardRef<any, any>(
  ({ scene, world, coin, onFlipComplete, isFlipping }, ref) => {
    const coinBodyRef = useRef<CANNON.Body | null>(null);
    const coinMeshRef = useRef<THREE.Mesh | null>(null);
    const physicsRef = useRef<any>({
      bounceCount: 0,
      gradualStopTime: 0,
      maxBounces: 5,
      bounceDamping: 0.7,
      maxGradualStopTime: 2.0,
      transitionStarted: false,
      isPhysicsActive: false,
      lastPosition: null,
      lastPositionTime: null
    });
    const animationRef = useRef<number | null>(null);

    useEffect(() => {
      if (!scene || !coin || !world) return;

      const coinGeometry = new THREE.CylinderGeometry(2, 2, 0.4, 64);

      const coinMaterials = [
        new THREE.MeshStandardMaterial({
          color: 0xbdaa7a, // Even brighter gold color
          map: createCoinSideTexture(),
          metalness: 0.3,
          roughness: 0.4
        }),

        new THREE.MeshBasicMaterial({
          map: loadCoinFaceTexture("/new-btc/coins/dolla-s.png"),
          transparent: false
        }),

        new THREE.MeshBasicMaterial({
          map: loadCoinFaceTexture(coin.backgroundImage),
          transparent: false
        })
      ];

      const coinMesh = new THREE.Mesh(coinGeometry, coinMaterials);
      coinMesh.position.set(coin.position.x, coin.position.y, coin.position.z);

      coinMesh.rotation.x = Math.PI / 2;

      coinMesh.castShadow = true;
      coinMesh.receiveShadow = true;
      scene.add(coinMesh);
      const coinShape = new CANNON.Cylinder(2, 2, 0.4, 32);
      const coinBody = new CANNON.Body({
        mass: 1,
        shape: coinShape,
        position: new CANNON.Vec3(
          coin.position.x,
          coin.position.y,
          coin.position.z
        ),
        material: new CANNON.Material({
          friction: 0.6, // Higher friction to prevent sliding
          restitution: 0.2 // Very low restitution to reduce bouncing
        }),
        linearDamping: 0.2, // Stronger linear damping
        angularDamping: 0.2 // Stronger angular damping
      });

      coinBody.quaternion.setFromAxisAngle(
        new CANNON.Vec3(1, 0, 0),
        Math.PI / 2
      );
      world.addBody(coinBody);
      coinBodyRef.current = coinBody;
      coinMeshRef.current = coinMesh;

      const updateCoin = () => {
        if (!physicsRef.current.isPhysicsActive) {
          return;
        }

        const coinBody = coinBodyRef.current;
        const coinMesh = coinMeshRef.current;

        if (!coinBody || !coinMesh) {
          return;
        }

        // Apply air resistance to both linear and angular velocity (but not too much initially)
        const airResistance = 0.999;
        coinBody.velocity.scale(airResistance, coinBody.velocity);
        coinBody.angularVelocity.scale(airResistance, coinBody.angularVelocity);

        const boundaryX = 8;
        const boundaryY = 6;
        const boundaryBuffer = 0.5;

        if (Math.abs(coinBody.position.x) > boundaryX - boundaryBuffer) {
          coinBody.position.x =
            Math.sign(coinBody.position.x) * (boundaryX - boundaryBuffer);
          coinBody.velocity.x *= -0.7; // Bounce back with reduced velocity
          coinBody.velocity.y *= 0.95; // Add damping
          coinBody.velocity.z *= 0.95; // Add damping
        }

        if (Math.abs(coinBody.position.y) > boundaryY - boundaryBuffer) {
          coinBody.position.y =
            Math.sign(coinBody.position.y) * (boundaryY - boundaryBuffer);
          coinBody.velocity.y *= -0.7; // Bounce back with reduced velocity
          coinBody.velocity.x *= 0.95; // Add damping
          coinBody.velocity.z *= 0.95; // Add damping
        }

        const groundZ = -2;
        const groundBuffer = 0.1;

        const isAlmostStopped =
          Math.abs(coinBody.velocity.x) < 0.1 &&
          Math.abs(coinBody.velocity.y) < 0.1 &&
          Math.abs(coinBody.velocity.z) < 0.1;

        const physics = physicsRef.current;

        // Apply stronger damping when coin is near settled state
        if (isAlmostStopped && coinBody.position.z < 1) {
          // Strong damping for overlapping coins
          coinBody.velocity.scale(0.7, coinBody.velocity);
          coinBody.angularVelocity.scale(0.7, coinBody.angularVelocity);

          // Prevent tiny oscillations by snapping very small movements to zero
          if (Math.abs(coinBody.velocity.x) < 0.05) coinBody.velocity.x = 0;
          if (Math.abs(coinBody.velocity.y) < 0.05) coinBody.velocity.y = 0;
          if (Math.abs(coinBody.velocity.z) < 0.05) coinBody.velocity.z = 0;

          if (Math.abs(coinBody.angularVelocity.x) < 0.1)
            coinBody.angularVelocity.x = 0;
          if (Math.abs(coinBody.angularVelocity.y) < 0.1)
            coinBody.angularVelocity.y = 0;
          if (Math.abs(coinBody.angularVelocity.z) < 0.1)
            coinBody.angularVelocity.z = 0;

          // Store stable position when coin first settles
          if (!physics.stablePosition) {
            physics.stablePosition = {
              x: coinBody.position.x,
              y: coinBody.position.y,
              z: coinBody.position.z
            };
            physics.stableTime = Date.now();
          } else {
            // Check if coin has been stable long enough to lock its position
            const stableElapsed = Date.now() - physics.stableTime;

            if (stableElapsed > 300) {
              // After 300ms of stability, lock position more aggressively
              // Very strong position locking for overlapping coins
              const distance = Math.sqrt(
                Math.pow(coinBody.position.x - physics.stablePosition.x, 2) +
                  Math.pow(coinBody.position.y - physics.stablePosition.y, 2)
              );

              // If moved more than 0.15 units horizontally, snap back immediately
              if (distance > 0.15) {
                coinBody.position.x = physics.stablePosition.x;
                coinBody.position.y = physics.stablePosition.y;
                coinBody.velocity.x = 0;
                coinBody.velocity.y = 0;
                coinBody.velocity.z = Math.min(coinBody.velocity.z, 0); // Only allow downward movement
              }

              // More strict Z-axis jump prevention
              const zDiff = Math.abs(
                coinBody.position.z - physics.stablePosition.z
              );
              if (zDiff > 0.3) {
                // Reduced from 0.5 to 0.3
                // If coin tries to jump more than 0.3 units in Z, snap it back
                coinBody.position.z = physics.stablePosition.z;
                coinBody.velocity.z = 0;
                coinBody.angularVelocity.set(0, 0, 0); // Also stop rotation
              }

              // Additional check: if coin is moving too fast while supposed to be stable, stop it
              const speed = Math.sqrt(
                coinBody.velocity.x * coinBody.velocity.x +
                  coinBody.velocity.y * coinBody.velocity.y +
                  coinBody.velocity.z * coinBody.velocity.z
              );
              if (speed > 0.5) {
                coinBody.velocity.scale(0.3, coinBody.velocity); // Aggressive damping
              }
            } else {
              // During initial settling, use gentler correction
              const distance = Math.sqrt(
                Math.pow(coinBody.position.x - physics.stablePosition.x, 2) +
                  Math.pow(coinBody.position.y - physics.stablePosition.y, 2) +
                  Math.pow(coinBody.position.z - physics.stablePosition.z, 2)
              );

              if (distance > 0.3) {
                const pullStrength = 0.2;
                coinBody.position.x +=
                  (physics.stablePosition.x - coinBody.position.x) *
                  pullStrength;
                coinBody.position.y +=
                  (physics.stablePosition.y - coinBody.position.y) *
                  pullStrength;
              }
            }
          }
        } else {
          // Reset stable position if coin starts moving again
          physics.stablePosition = null;
          physics.stableTime = null;
        }

        // Enhanced stop condition with multiple criteria
        const isReallySettled =
          isAlmostStopped &&
          // Must be near or below a reasonable height (not floating in air)
          coinBody.position.z < 2 &&
          // Angular velocity should also be small
          Math.abs(coinBody.angularVelocity.x) < 0.3 &&
          Math.abs(coinBody.angularVelocity.y) < 0.3 &&
          Math.abs(coinBody.angularVelocity.z) < 0.3;
        if (isReallySettled) {
          // Add time-based confirmation to avoid false positives
          if (!physics.settlementStartTime) {
            physics.settlementStartTime = Date.now();
          } else if (Date.now() - physics.settlementStartTime > 200) {
            // Wait 200ms
            physicsRef.current.isPhysicsActive = false;
            coinBody.velocity.set(0, 0, 0);
            coinBody.angularVelocity.set(0, 0, 0);
            onFlipComplete(coin);
            return;
          }
        } else {
          // Reset settlement timer if conditions not met
          physics.settlementStartTime = null;
        }

        if (
          coinBody.velocity.z < 0 &&
          coinBody.position.z < 1.5 &&
          !physics.transitionStarted
        ) {
          physics.transitionStarted = true;

          const isHeads = coin.presetResult === "heads";
          const targetRotationX = isHeads ? Math.PI / 2 : -Math.PI / 2;

          const distanceToGround = coinBody.position.z - groundZ;
          const fallSpeed = Math.abs(coinBody.velocity.z);
          const estimatedFallTime = distanceToGround / fallSpeed;

          const diffRotationX = targetRotationX - coinMesh.rotation.x;

          gsap
            .timeline({
              onStart: () => {
                physics.transitionStarted = true;
                coinBody.angularVelocity.set(0.01, 0.01, 0.01);
              },
              onComplete: () => {
                coinMesh.rotation.z = 0;

                coinBody.position.z = -2;
                coinBody.velocity.set(0, 0, 0);

                coinBody.quaternion.setFromAxisAngle(
                  new CANNON.Vec3(1, 0, 0),
                  targetRotationX
                );
              }
            })

            .to(coinMesh.rotation, {
              x: targetRotationX - diffRotationX / 3,
              z: 0,
              duration: estimatedFallTime / 3,
              ease: "power2.out"
            })
            .to(coinMesh.rotation, {
              x: targetRotationX - (diffRotationX / 3) * 2,
              z: 0,
              duration: estimatedFallTime / 3,
              ease: "power2.out"
            })
            .to(coinMesh.rotation, {
              x: targetRotationX,
              z: 0,
              duration: estimatedFallTime,
              ease: "power2.out"
            });
        }

        if (coinBody.position.z > groundZ + groundBuffer) {
          coinMesh.position.copy(coinBody.position as any);
          if (!physics.transitionStarted) {
            coinMesh.quaternion.copy(coinBody.quaternion as any);
          }
          return;
        }

        if (!physics.transitionStarted) {
          coinMesh.position.copy(coinBody.position as any);
          coinMesh.quaternion.copy(coinBody.quaternion as any);
        }
      };

      const animate = () => {
        animationRef.current = requestAnimationFrame(animate);
        updateCoin();
      };
      animate();

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }, [scene, coin, world]);

    // Flip coin animation
    const flipCoin = () => {
      if (!coinBodyRef.current || !coinMeshRef.current || isFlipping) {
        return;
      }
      console.log("flipCoin called");
      const coinMesh = coinMeshRef.current;
      const coinBody = coinBodyRef.current;

      // First stop any existing physics
      physicsRef.current.isPhysicsActive = false;

      // Reset positions and rotations
      coinMesh.rotation.set(Math.PI / 2, 0, 0);
      coinMesh.position.set(coin.position.x, coin.position.y, coin.position.z);

      // Reset physics body position and rotation
      coinBody.position.set(coin.position.x, coin.position.y, coin.position.z);
      coinBody.quaternion.setFromAxisAngle(
        new CANNON.Vec3(1, 0, 0),
        Math.PI / 2
      );

      // Clear any existing velocities
      coinBody.velocity.set(0, 0, 0);
      coinBody.angularVelocity.set(0, 0, 0);

      // Reset physics state
      physicsRef.current = {
        bounceCount: 0,
        gradualStopTime: 0,
        maxBounces: 5,
        bounceDamping: 0.7,
        maxGradualStopTime: 2.0,
        transitionStarted: false,
        isPhysicsActive: false,
        settlementStartTime: null,
        stablePosition: null,
        stableTime: null
      };

      // Wait a frame before applying forces to ensure position is set
      setTimeout(() => {
        const initialVelocityZ = 18 + Math.random() * 4;
        coinBody.velocity.set(
          (Math.random() - 0.5) * 0.8, // Reduced X direction velocity - keep coin closer to start position
          (Math.random() - 0.5) * 0.2, // Reduced Y direction velocity - minimal Y movement
          initialVelocityZ // Z direction velocity
        );

        const spinSpeed = 25 + Math.random() * 3;
        const primaryFlip = spinSpeed * (0.8 + Math.random() * 0.4);
        const sideSpin = spinSpeed * (0.2 + Math.random() * 0.3);
        const wobble = spinSpeed * (0.1 + Math.random() * 0.2);

        coinBody.angularVelocity.set(primaryFlip, sideSpin, wobble);

        // Activate physics
        physicsRef.current.isPhysicsActive = true;
      }, 16); // Wait one frame (16ms)
    };

    useImperativeHandle(ref, () => ({
      flipCoin
    }));

    return null;
  }
);

export default CannonCoin;

const createCoinSideTexture = () => {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 64;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#7D6C41";
  ctx.fillRect(0, 0, 256, 64);

  ctx.strokeStyle = "#6B5A35";
  ctx.lineWidth = 1;
  for (let i = 0; i < 256; i += 12) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 64);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  return texture;
};

const loadCoinFaceTexture = (imagePath: string) => {
  const loader = new THREE.TextureLoader();
  const texture = loader.load(imagePath);

  // Improve texture quality
  texture.flipY = true;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.anisotropy = 64; // Improve texture sharpness at angles
  texture.format = THREE.RGBAFormat;
  texture.colorSpace = THREE.SRGBColorSpace; // Correct color space for images

  return texture;
};
