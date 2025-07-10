import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import * as CANNON from "cannon-es";
import CannonCoin from "./cannon-coin";

const coins = [
  {
    presetResult: "heads",
    position: { x: 0, y: 0, z: -1.8 }
  },
  {
    presetResult: "heads",
    position: { x: 3, y: 1, z: -1.8 }
  },
  {
    presetResult: "tails",
    position: { x: 6, y: 2, z: -1.8 }
  },
  {
    presetResult: "tails",
    position: { x: -3, y: 8, z: -1.8 }
  },
  {
    presetResult: "tails",
    position: { x: -6, y: -5, z: -1.8 }
  }
];

const CannonCoins: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const worldRef = useRef<CANNON.World | null>(null);
  const [scene, setScene] = useState<THREE.Scene | null>(null);
  const filpNumber = useRef(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const coinsRef = useRef<(any | null)[]>([]);

  useEffect(() => {
    if (!mountRef.current) return;

    const _scene = new THREE.Scene();
    _scene.background = null;
    setScene(_scene);

    const camera = new THREE.PerspectiveCamera(
      60,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, -5, 15);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    const world = new CANNON.World({
      gravity: new CANNON.Vec3(0, 0, -25)
    });
    worldRef.current = world;

    const groundGeometry = new THREE.PlaneGeometry(40, 20);
    const groundMaterial = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0
    });
    const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
    groundMesh.position.set(0, Math.PI, -2);
    groundMesh.receiveShadow = true;
    _scene.add(groundMesh);

    const groundShape = new CANNON.Plane();
    const groundBody = new CANNON.Body({ mass: 0 });
    groundBody.addShape(groundShape);
    groundBody.position.set(0, 0, -2);
    groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), 0);
    world.addBody(groundBody);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    _scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = mountRef.current.clientWidth;
    directionalLight.shadow.mapSize.height = mountRef.current.clientHeight;
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

    // Global physics animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Step the physics world once per frame
      if (world) {
        world.step(1 / 60);
      }

      // Render the scene
      renderer.render(_scene, camera);
    };
    animate();

    return () => {
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const manualFlip = () => {
    filpNumber.current = 0;
    setIsFlipping(true);
    coinsRef.current?.forEach((coinRef: any) => {
      if (coinRef && typeof coinRef.flipCoin === "function") {
        coinRef.flipCoin();
      }
    });
  };

  return (
    <div>
      {coins.map((coin, index) => (
        <CannonCoin
          key={index}
          scene={scene}
          world={worldRef.current}
          coin={coin}
          isFlipping={isFlipping}
          onFlipComplete={() => {
            filpNumber.current++;
            if (filpNumber.current === coins.length) {
              setIsFlipping(false);
            }
          }}
          ref={(el) => {
            coinsRef.current[index] = el;
          }}
        />
      ))}

      <div
        ref={mountRef}
        style={{
          width: "100vw",
          height: "100vh",
          position: "relative"
        }}
      />

      <div
        style={{
          position: "fixed",
          top: "20px",
          left: "20px",
          background: "rgba(0,0,0,0.8)",
          color: "white",
          padding: "15px",
          borderRadius: "8px",
          zIndex: 1000,
          fontFamily: "monospace",
          fontSize: "12px"
        }}
      >
        <button
          onClick={manualFlip}
          style={{
            padding: "8px 16px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            width: "100%"
          }}
        >
          {isFlipping ? "Flipping..." : "Flip"}
        </button>
      </div>
    </div>
  );
};

export default CannonCoins;
