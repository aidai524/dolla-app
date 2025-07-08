import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import SingleCoin from "./single-coin";

interface CoinFlipProps {
  autoFlip?: boolean;
  forceResult?: "heads" | "tails"; // Force specified result
  animationDuration?: number; // Animation duration (milliseconds)
}

const CoinFlip: React.FC<CoinFlipProps> = ({
  autoFlip = false,
  forceResult = "heads",
  animationDuration = 3000
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const coinRef = useRef<any>(null);
  const [scene, setScene] = useState<THREE.Scene | null>(null);

  const [isFlipping, setIsFlipping] = useState(false);

  // Initialize Three.js scene
  useEffect(() => {
    if (!mountRef.current) return;

    // Create scene
    const _scene = new THREE.Scene();
    _scene.background = new THREE.Color(0x1a1a1a);
    setScene(_scene);

    // Create camera
    const camera = new THREE.PerspectiveCamera(
      60,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2, 8);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
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
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -2;
    ground.receiveShadow = true;
    _scene.add(ground);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    _scene.add(ambientLight);

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

  // // Handle window resize
  // useEffect(() => {
  //   const handleResize = () => {
  //     if (!mountRef.current || !rendererRef.current || !sceneRef.current)
  //       return;

  //     const width = mountRef.current.clientWidth;
  //     const height = mountRef.current.clientHeight;

  //     rendererRef.current.setSize(width, height);

  //     if (cameraRef.current) {
  //       cameraRef.current.aspect = width / height;
  //       cameraRef.current.updateProjectionMatrix();
  //     }
  //   };

  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  return (
    <div className="coin-flip-container">
      <SingleCoin
        scene={scene}
        camera={cameraRef.current}
        renderer={rendererRef.current}
        isFlipping={isFlipping}
        animationDuration={animationDuration}
        forceResult={forceResult}
        onFlipComplete={() => {
          setIsFlipping(false);
        }}
        autoFlip={autoFlip}
        ref={coinRef}
      />
      <div
        ref={mountRef}
        className="coin-canvas"
        style={{
          width: "400px",
          height: "400px",
          border: "2px solid #333",
          borderRadius: "8px",
          cursor: isFlipping ? "not-allowed" : "pointer"
        }}
      />
      <div
        className="coin-controls"
        style={{ marginTop: "20px", textAlign: "center" }}
      >
        <button
          onClick={() => {
            setIsFlipping(true);
            coinRef.current?.flipCoin();
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
          {isFlipping ? "Flipping..." : "Flip Coin"}
        </button>
      </div>
    </div>
  );
};

export default CoinFlip;
