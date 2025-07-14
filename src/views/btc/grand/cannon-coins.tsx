import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import * as CANNON from "cannon-es";
import CannonCoin from "./cannon-coin";
import { useBtcContext } from "../context";

const coins = [
  {
    key: "1",
    position: { x: 0, y: 0, z: -2 },
    backgroundImage: "/new-btc/coins/dolla-eth.png"
  },
  {
    key: "2",
    position: { x: 8, y: -4, z: -2 },
    backgroundImage: "/new-btc/coins/dolla-btc.png"
  },
  {
    key: "3",
    position: { x: -10, y: 2, z: -2 },
    backgroundImage: "/new-btc/coins/dolla-ticket.png"
  },
  {
    key: "4",
    position: { x: 10, y: 4, z: -2 },
    backgroundImage: "/new-btc/coins/dolla-sol.png"
  },
  {
    key: "5",
    position: { x: -6, y: -5, z: -2 },
    backgroundImage: "/new-btc/coins/dolla-usdt.png"
  }
];

const CannonCoins = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const worldRef = useRef<CANNON.World | null>(null);
  const [scene, setScene] = useState<THREE.Scene | null>(null);
  const { isFlipping, flipComplete, coinsRef } = useBtcContext();

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
    camera.position.set(1, -5, 15);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: false,
      powerPreference: "high-performance"
    });

    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace; // Better color accuracy
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.setClearColor(0x000000, 0); // Transparent background
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

  return (
    <>
      {coins.map((coin, index) => (
        <CannonCoin
          key={index}
          scene={scene}
          world={worldRef.current}
          coin={coin}
          isFlipping={isFlipping}
          onFlipComplete={flipComplete}
          ref={(el) => {
            coinsRef.current[index] = el;
          }}
        />
      ))}

      <div
        ref={mountRef}
        style={{
          width: "100%",
          height: "140%",
          position: "absolute",
          bottom: "-10%"
        }}
      />
    </>
  );
};

export default CannonCoins;
