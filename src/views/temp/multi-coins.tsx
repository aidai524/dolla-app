import React, { useRef, useEffect, useState, useCallback } from "react";
import * as THREE from "three";
import SingleCoin from "./single-coin";

interface CoinPosition {
  x: number;
  y: number;
  z: number;
}

interface CoinConfig {
  result: "heads" | "tails";
  position?: CoinPosition; // Optional, if not provided, calculated by layout algorithm
  scale?: number;
  rotation?: {
    x: number;
    y: number;
    z: number;
  };
}

interface CoinPhysics {
  velocity: THREE.Vector3;
  angularVelocity: THREE.Vector3;
  position: THREE.Vector3;
  radius: number;
  mass: number;
  isActive: boolean;
}

interface CoinFlipProps {
  autoFlip?: boolean;
  coinConfigs: CoinConfig[]; // Coin configuration array
  animationDuration?: number; // Animation duration (milliseconds)
}

const MultiCoins: React.FC<CoinFlipProps> = ({
  autoFlip = false,
  coinConfigs,
  animationDuration = 3000
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const coinsRef = useRef<(any | null)[]>([]);
  const [scene, setScene] = useState<THREE.Scene | null>(null);
  const filpNumber = useRef(0);

  const [isFlipping, setIsFlipping] = useState(false);

  // Collision detection system
  const collisionSystemRef = useRef({
    coins: new Map<number, CoinPhysics>(),
    coinRadius: 1.1, // Adjusted coin radius to match geometry
    restitution: 0.7, // Bounce factor for collisions
    friction: 0.8, // Friction between coins
    collisionDistance: 3.0, // Increased collision detection distance
    isCollisionActive: false,
    collisionCount: 0, // Track collision count for debugging
    maxCollisionsPerFrame: 20, // Increased max collisions per frame
    separationForce: 3.0, // Increased force multiplier for separation
    penetrationThreshold: 0.05, // Reduced threshold for more sensitive detection
    maxPenetrationDepth: 0.2, // Maximum allowed penetration depth
    continuousCollisionDetection: true, // Enable continuous collision detection
    boundaryBuffer: 0.5 // Buffer zone for boundary constraints
  });

  // Calculate random coin positions with improved distribution
  const calculateCoinPositions = useCallback(() => {
    const positions: CoinPosition[] = [];

    // Define distribution area based on canvas size (1200x400)
    const maxX = Math.floor(window.innerWidth / 150); // Much wider X range for 1200px canvas
    const maxY = Math.floor(window.innerHeight / 120); // Much wider Y range for 400px canvas
    const coinRadius = 0.6;
    const minDistance = coinRadius * 3;

    // Create grid zones to ensure better distribution
    const gridSize = Math.ceil(Math.sqrt(coinConfigs.length));
    const zoneWidth = (maxX * 2) / gridSize;
    const zoneHeight = (maxY * 2) / gridSize;

    for (let i = 0; i < coinConfigs.length; i++) {
      let position: CoinPosition | null = null;
      let attemptsCount = 0;
      const maxAttempts = 200;

      // Calculate which zone this coin should be in
      const zoneRow = Math.floor(i / gridSize);
      const zoneCol = i % gridSize;

      // Define zone boundaries
      const zoneStartX = -maxX + zoneCol * zoneWidth;
      const zoneEndX = -maxX + (zoneCol + 1) * zoneWidth;
      const zoneStartY = -maxY + zoneRow * zoneHeight;
      const zoneEndY = -maxY + (zoneRow + 1) * zoneHeight;

      while (!position && attemptsCount < maxAttempts) {
        // Generate position within the assigned zone
        const x = zoneStartX + Math.random() * (zoneEndX - zoneStartX);
        const y = zoneStartY + Math.random() * (zoneEndY - zoneStartY);

        // Check if this position overlaps with existing coins
        let hasOverlap = false;
        for (const existingPos of positions) {
          const distance = Math.sqrt(
            Math.pow(x - existingPos.x, 2) + Math.pow(y - existingPos.y, 2)
          );
          if (distance < minDistance) {
            hasOverlap = true;
            break;
          }
        }

        if (!hasOverlap) {
          position = { x, y, z: -2 };
        }
        attemptsCount++;
      }

      // If no non-overlapping position found in zone, try anywhere
      if (!position) {
        const x = (Math.random() - 0.5) * (maxX * 2);
        const y = (Math.random() - 0.5) * (maxY * 2);
        position = { x, y, z: -2 };
      }

      positions.push(position);
    }

    // Debug: Log positions to console
    console.log(
      "Coin positions:",
      positions.map(
        (pos, i) => `Coin ${i}: (${pos.x.toFixed(2)}, ${pos.y.toFixed(2)})`
      )
    );

    return positions;
  }, [coinConfigs]);

  // Initialize collision system
  const initializeCollisionSystem = useCallback(() => {
    const collisionSystem = collisionSystemRef.current;
    collisionSystem.coins.clear();

    // Initialize physics data for each coin
    coinConfigs.forEach((_, index) => {
      collisionSystem.coins.set(index, {
        velocity: new THREE.Vector3(0, 0, 0),
        angularVelocity: new THREE.Vector3(0, 0, 0),
        position: new THREE.Vector3(0, 0, 0),
        radius: collisionSystem.coinRadius,
        mass: 1.0,
        isActive: false
      });
    });
  }, [coinConfigs]);

  // Collision detection and response
  const updateCollisions = useCallback(() => {
    const collisionSystem = collisionSystemRef.current;
    if (!collisionSystem.isCollisionActive) return;

    const coins = Array.from(collisionSystem.coins.entries());
    collisionSystem.collisionCount = 0;

    // Multiple collision resolution passes for better accuracy
    const maxPasses = 5; // Increased passes for better collision resolution

    for (let pass = 0; pass < maxPasses; pass++) {
      let collisionResolved = false;

      // Check all coin pairs for collisions
      for (let i = 0; i < coins.length; i++) {
        for (let j = i + 1; j < coins.length; j++) {
          const [index1, coin1] = coins[i];
          const [index2, coin2] = coins[j];

          if (!coin1.isActive || !coin2.isActive) continue;

          // Skip collision detection if coins are too far apart (performance optimization)
          const distance = coin1.position.distanceTo(coin2.position);
          const maxDetectionDistance = collisionSystem.collisionDistance * 2;

          if (distance > maxDetectionDistance) continue;

          const minDistance = coin1.radius + coin2.radius;
          const penetration = minDistance - distance;

          // Enhanced collision detection with continuous collision detection
          if (collisionSystem.continuousCollisionDetection) {
            // Check for future collision based on velocity
            const relativeVelocity = new THREE.Vector3().subVectors(
              coin2.velocity,
              coin1.velocity
            );
            const velocityAlongNormal = relativeVelocity.dot(
              new THREE.Vector3()
                .subVectors(coin2.position, coin1.position)
                .normalize()
            );

            // If coins are moving towards each other, predict collision
            if (velocityAlongNormal < 0 && distance < minDistance + 0.5) {
              const predictedPenetration =
                minDistance - distance + Math.abs(velocityAlongNormal) * 0.016;
              if (predictedPenetration > collisionSystem.penetrationThreshold) {
                resolveCollision(
                  coin1,
                  coin2,
                  index1,
                  index2,
                  predictedPenetration
                );
                collisionSystem.collisionCount++;
                collisionResolved = true;
                continue;
              }
            }
          }

          if (
            penetration > collisionSystem.penetrationThreshold &&
            collisionSystem.collisionCount <
              collisionSystem.maxCollisionsPerFrame
          ) {
            // Collision detected - resolve collision
            resolveCollision(coin1, coin2, index1, index2, penetration);
            collisionSystem.collisionCount++;
            collisionResolved = true;
          }
        }
      }

      // If no collisions were resolved in this pass, we can stop
      if (!collisionResolved) break;
    }
  }, []);

  // Resolve collision between two coins
  const resolveCollision = useCallback(
    (
      coin1: CoinPhysics,
      coin2: CoinPhysics,
      index1: number,
      index2: number,
      penetration: number
    ) => {
      const collisionSystem = collisionSystemRef.current;

      // Calculate collision normal
      const normal = new THREE.Vector3()
        .subVectors(coin2.position, coin1.position)
        .normalize();

      // Calculate relative velocity
      const relativeVelocity = new THREE.Vector3().subVectors(
        coin2.velocity,
        coin1.velocity
      );

      // Calculate velocity along normal
      const velocityAlongNormal = relativeVelocity.dot(normal);

      // Don't resolve if objects are moving apart
      if (velocityAlongNormal > 0) return;

      // Calculate restitution
      const restitution = collisionSystem.restitution;

      // Calculate impulse scalar
      const impulseScalar = -(1 + restitution) * velocityAlongNormal;
      const impulse = normal.clone().multiplyScalar(impulseScalar);

      // Apply impulse to velocities
      const impulse1 = impulse.clone().multiplyScalar(-1 / coin1.mass);
      const impulse2 = impulse.clone().multiplyScalar(1 / coin2.mass);

      coin1.velocity.add(impulse1);
      coin2.velocity.add(impulse2);

      // Apply friction to reduce sliding
      const friction = collisionSystem.friction;
      const tangentialVelocity = relativeVelocity
        .clone()
        .sub(normal.clone().multiplyScalar(velocityAlongNormal));

      const frictionImpulse = tangentialVelocity
        .clone()
        .multiplyScalar(-friction);

      coin1.velocity.add(
        frictionImpulse.clone().multiplyScalar(-1 / coin1.mass)
      );
      coin2.velocity.add(
        frictionImpulse.clone().multiplyScalar(1 / coin2.mass)
      );

      // Enhanced separation algorithm to prevent overlap
      const separationDistance = Math.min(
        penetration * collisionSystem.separationForce,
        collisionSystem.maxPenetrationDepth
      );
      const separation = normal.clone().multiplyScalar(separationDistance);

      // Apply separation based on mass ratio for more realistic behavior
      const totalMass = coin1.mass + coin2.mass;
      const separation1 = separation
        .clone()
        .multiplyScalar(coin2.mass / totalMass);
      const separation2 = separation
        .clone()
        .multiplyScalar(coin1.mass / totalMass);

      coin1.position.sub(separation1);
      coin2.position.add(separation2);

      // Add additional velocity correction to prevent sticking
      const velocityCorrection = normal
        .clone()
        .multiplyScalar(separationDistance * 15); // Increased correction force
      coin1.velocity.sub(
        velocityCorrection.clone().multiplyScalar(coin2.mass / totalMass)
      );
      coin2.velocity.add(
        velocityCorrection.clone().multiplyScalar(coin1.mass / totalMass)
      );

      // Additional penetration correction to ensure coins don't overlap
      const currentDistance = coin1.position.distanceTo(coin2.position);
      const minRequiredDistance = coin1.radius + coin2.radius;

      if (currentDistance < minRequiredDistance) {
        const additionalPenetration = minRequiredDistance - currentDistance;
        const additionalSeparation = normal
          .clone()
          .multiplyScalar(additionalPenetration * 0.5);

        coin1.position.sub(
          additionalSeparation.clone().multiplyScalar(coin2.mass / totalMass)
        );
        coin2.position.add(
          additionalSeparation.clone().multiplyScalar(coin1.mass / totalMass)
        );
      }

      // Update actual coin meshes
      const coinMesh1 = coinsRef.current[index1]?.coinRef?.current;
      const coinMesh2 = coinsRef.current[index2]?.coinRef?.current;

      if (coinMesh1) {
        coinMesh1.position.copy(coin1.position);
      }
      if (coinMesh2) {
        coinMesh2.position.copy(coin2.position);
      }

      // Add collision sound effect (optional)
      console.log(`Collision detected between coins ${index1} and ${index2}`);
    },
    []
  );

  // Update coin physics in collision system
  const updateCoinPhysics = useCallback(
    (
      index: number,
      position: THREE.Vector3,
      velocity: THREE.Vector3,
      isActive: boolean
    ) => {
      const collisionSystem = collisionSystemRef.current;
      const coin = collisionSystem.coins.get(index);

      if (coin) {
        // Apply boundary constraints to prevent coins from flying out of scene
        const boundaryX = 15; // X boundary
        const boundaryY = 10; // Y boundary
        const boundaryBuffer = collisionSystem.boundaryBuffer;

        let constrainedPosition = position.clone();
        let constrainedVelocity = velocity.clone();

        // X-axis boundary with buffer zone
        if (Math.abs(position.x) > boundaryX - boundaryBuffer) {
          const maxX = boundaryX - boundaryBuffer;
          constrainedPosition.x = Math.sign(position.x) * maxX;
          constrainedVelocity.x *= -0.7; // Increased bounce back velocity

          // Add damping to prevent oscillation
          constrainedVelocity.y *= 0.95;
          constrainedVelocity.z *= 0.95;
        }

        // Y-axis boundary with buffer zone
        if (Math.abs(position.y) > boundaryY - boundaryBuffer) {
          const maxY = boundaryY - boundaryBuffer;
          constrainedPosition.y = Math.sign(position.y) * maxY;
          constrainedVelocity.y *= -0.7; // Increased bounce back velocity

          // Add damping to prevent oscillation
          constrainedVelocity.x *= 0.95;
          constrainedVelocity.z *= 0.95;
        }

        // Enhanced penetration correction with other coins
        if (isActive) {
          const coins = Array.from(collisionSystem.coins.entries());
          for (const [otherIndex, otherCoin] of coins) {
            if (otherIndex === index || !otherCoin.isActive) continue;

            const distance = constrainedPosition.distanceTo(otherCoin.position);
            const minDistance = coin.radius + otherCoin.radius;

            if (distance < minDistance) {
              // Force separation to prevent overlap
              const normal = new THREE.Vector3()
                .subVectors(constrainedPosition, otherCoin.position)
                .normalize();

              const penetration = minDistance - distance;
              const correction = normal
                .clone()
                .multiplyScalar(penetration * 1.0); // Full correction force

              constrainedPosition.add(correction);
              constrainedVelocity.add(correction.clone().multiplyScalar(8)); // Increased velocity correction

              // Additional iterative correction for deep penetration
              if (penetration > collisionSystem.maxPenetrationDepth) {
                const additionalCorrection = normal
                  .clone()
                  .multiplyScalar(penetration * 0.5);
                constrainedPosition.add(additionalCorrection);
              }
            }
          }
        }

        coin.position.copy(constrainedPosition);
        coin.velocity.copy(constrainedVelocity);
        coin.isActive = isActive;
      }
    },
    []
  );

  // Initialize coin ref array
  useEffect(() => {
    coinsRef.current = new Array(coinConfigs.length).fill(null);
    initializeCollisionSystem();
  }, [coinConfigs.length, initializeCollisionSystem]);

  // Initialize Three.js scene
  useEffect(() => {
    if (!mountRef.current) return;

    // Create scene
    const _scene = new THREE.Scene();
    _scene.background = null; // Set transparent background
    setScene(_scene);

    // Create camera
    const camera = new THREE.PerspectiveCamera(
      60,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 3, 12); // Adjusted camera position for wider view
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true // Enable transparent background
    });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Create ground
    const groundGeometry = new THREE.PlaneGeometry(40, 20); // Wider ground for better distribution
    const groundMaterial = new THREE.MeshLambertMaterial({
      // color: 0x333333,
      transparent: true,
      opacity: 0
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.y = Math.PI;
    ground.position.z = 0;
    ground.receiveShadow = true;
    _scene.add(ground);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    _scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.left = -10;
    directionalLight.shadow.camera.right = 10;
    directionalLight.shadow.camera.top = 10;
    directionalLight.shadow.camera.bottom = -10;
    _scene.add(directionalLight);

    // Add point lights
    const pointLight1 = new THREE.PointLight(0xffffff, 1.0, 20);
    pointLight1.position.set(-5, 5, 5);
    _scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 1.0, 20);
    pointLight2.position.set(5, 5, -5);
    _scene.add(pointLight2);

    // Add top fill light
    const topLight = new THREE.DirectionalLight(0xffffff, 0.8);
    topLight.position.set(0, 15, 0);
    _scene.add(topLight);

    // Add front fill light
    const frontLight = new THREE.DirectionalLight(0xffffff, 0.6);
    frontLight.position.set(0, 0, 10);
    _scene.add(frontLight);

    // Collision update loop - higher frequency for better accuracy
    const collisionUpdateLoop = () => {
      updateCollisions(); // 120fps collision updates for better accuracy
      requestAnimationFrame(collisionUpdateLoop);
    };
    collisionUpdateLoop();

    // Cleanup function
    return () => {
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [updateCollisions]);

  return (
    <div>
      {(() => {
        const positions = calculateCoinPositions();
        return coinConfigs?.map((config, index) => {
          const coinPosition = positions[index] || { x: 0, y: 0, z: 0 };
          return (
            <SingleCoin
              key={index}
              scene={scene}
              camera={cameraRef.current}
              renderer={rendererRef.current}
              isFlipping={isFlipping}
              animationDuration={animationDuration}
              forceResult={config.result}
              onFlipComplete={() => {
                filpNumber.current++;
                if (filpNumber.current === coinConfigs?.length) {
                  setIsFlipping(false);
                  collisionSystemRef.current.isCollisionActive = false;
                }
              }}
              autoFlip={autoFlip}
              position={coinPosition}
              scale={config.scale || 1}
              rotation={config.rotation || { x: 1, y: 0, z: 0 }}
              onPhysicsUpdate={(position, velocity, isActive) => {
                updateCoinPhysics(index, position, velocity, isActive);
              }}
              ref={(el) => {
                coinsRef.current[index] = el;
              }}
            />
          );
        });
      })()}
      <div
        ref={mountRef}
        className="coin-canvas"
        style={{
          width: "100vw",
          height: "100vh",
          cursor: isFlipping ? "not-allowed" : "pointer"
        }}
      />
      <div
        className="fixed right-[20px] top-[20px] z-10"
        style={{ textAlign: "center" }}
      >
        <button
          onClick={() => {
            filpNumber.current = 0;
            setIsFlipping(true);
            collisionSystemRef.current.isCollisionActive = true;
            coinsRef.current?.forEach((coinRef: any) => {
              if (coinRef && typeof coinRef.flipCoin === "function") {
                coinRef.flipCoin();
              }
            });
          }}
          disabled={isFlipping}
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            backgroundColor: isFlipping ? "#666" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: isFlipping ? "not-allowed" : "pointer",
            marginRight: "10px"
          }}
        >
          {isFlipping ? "Flipping..." : "Flip Coins"}
        </button>
      </div>
    </div>
  );
};

export default MultiCoins;
