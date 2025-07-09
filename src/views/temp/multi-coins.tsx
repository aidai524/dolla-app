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

interface CoinFlipProps {
  autoFlip?: boolean;
  coinConfigs: CoinConfig[]; // Coin configuration array
  animationDuration?: number; // Animation duration (milliseconds)
  layout?: "grid" | "circle" | "random" | "custom"; // Layout method
  gridConfig?: {
    rows: number;
    cols: number;
    spacing: number;
  };
  circleConfig?: {
    radius: number;
    centerY: number;
  };
}

const MultiCoins: React.FC<CoinFlipProps> = ({
  autoFlip = false,
  coinConfigs,
  animationDuration = 3000,
  layout = "grid",
  gridConfig = { rows: 2, cols: 2, spacing: 2 },
  circleConfig = { radius: 3, centerY: 0 }
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const coinsRef = useRef<(any | null)[]>([]);
  const [scene, setScene] = useState<THREE.Scene | null>(null);
  const filpNumber = useRef(0);

  const [isFlipping, setIsFlipping] = useState(false);

  // Calculate coin positions
  const calculateCoinPositions = useCallback(() => {
    const positions: CoinPosition[] = [];

    // Define safe boundaries to prevent coins from going out of view when flipped
    const safeBoundary = 3; // Safe distance from edges
    const maxX = 6 - safeBoundary; // Maximum X coordinate
    const maxZ = 6 - safeBoundary; // Maximum Z coordinate

    switch (layout) {
      case "grid":
        const { rows, cols, spacing } = gridConfig;
        for (let i = 0; i < coinConfigs.length; i++) {
          const row = Math.floor(i / cols);
          const col = i % cols;
          const x = (col - (cols - 1) / 2) * spacing;
          const z = (row - (rows - 1) / 2) * spacing;
          // Limit within safe boundaries
          const safeX = Math.max(-maxX, Math.min(maxX, x));
          const safeZ = Math.max(-maxZ, Math.min(maxZ, z));
          positions.push({ x: safeX, y: 0, z: safeZ });
        }
        break;

      case "circle":
        const { radius, centerY } = circleConfig;
        // Limit circle radius to ensure coins don't go beyond boundaries
        const safeRadius = Math.min(radius, maxX - 1, maxZ - 1);
        for (let i = 0; i < coinConfigs.length; i++) {
          const angle = (i / coinConfigs.length) * 2 * Math.PI;
          const x = Math.cos(angle) * safeRadius;
          const z = Math.sin(angle) * safeRadius;
          positions.push({ x, y: centerY, z });
        }
        break;

      case "random":
        for (let i = 0; i < coinConfigs.length; i++) {
          // Generate random positions within safe boundaries
          const x = (Math.random() - 0.5) * (maxX * 2);
          const z = (Math.random() - 0.5) * (maxZ * 2);
          positions.push({ x, y: 0, z });
        }
        break;

      case "custom":
        // Use custom positions from coinConfigs, but also check boundaries
        coinConfigs.forEach((config) => {
          const customPos = config.position || { x: 0, y: 0, z: 0 };
          const safeX = Math.max(-maxX, Math.min(maxX, customPos.x));
          const safeZ = Math.max(-maxZ, Math.min(maxZ, customPos.z));
          positions.push({ x: safeX, y: customPos.y, z: safeZ });
        });
        break;
    }

    return positions;
  }, [layout, gridConfig, circleConfig, coinConfigs]);

  // Initialize coin ref array
  useEffect(() => {
    coinsRef.current = new Array(coinConfigs.length).fill(null);
  }, [coinConfigs.length]);

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
    camera.position.set(0, 2, 8); // Adjust camera position for larger view
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
    const groundGeometry = new THREE.PlaneGeometry(20, 20);
    const groundMaterial = new THREE.MeshLambertMaterial({
      // color: 0x333333,
      transparent: true,
      opacity: 0
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.y = Math.PI;
    ground.position.z = -2;
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

    // Cleanup function
    return () => {
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

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
                }
              }}
              autoFlip={autoFlip}
              position={coinPosition}
              scale={config.scale || 1}
              rotation={config.rotation || { x: 1, y: 0, z: 0 }}
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
          width: "400px",
          height: "400px",
          cursor: isFlipping ? "not-allowed" : "pointer"
        }}
      />
      <div
        className="coin-controls"
        style={{ marginTop: "20px", textAlign: "center" }}
      >
        <button
          onClick={() => {
            filpNumber.current = 0;
            setIsFlipping(true);
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
