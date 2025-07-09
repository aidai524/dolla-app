import * as THREE from "three";

export const createCoin = (scene: THREE.Scene) => {
  // Create coin geometry
  const coinGeometry = new THREE.CylinderGeometry(1, 1, 0.1, 32);

  const sideMaterial = createSideMaterial();
  const headsMaterial = createFrontMaterial();
  const tailsMaterial = createBackMaterial();

  // Create coin mesh with different materials for side, top, and bottom
  const coin = new THREE.Mesh(coinGeometry, [
    sideMaterial,
    headsMaterial,
    tailsMaterial
  ]);
  coin.castShadow = true;
  coin.receiveShadow = true;

  // Set initial coin orientation to face the user
  coin.rotation.set(Math.PI / 2, 0, 0);
  coin.position.set(0, 0, 0);

  scene.add(coin);

  return coin;
};

export const createFrontMaterial = () => {
  const headsTexture = new THREE.TextureLoader().load(
    "/new-btc/coins/dolla-s.png"
  );
  const headsMaterial = new THREE.MeshStandardMaterial({
    map: headsTexture,
    metalness: 0.3,
    roughness: 0.2,
    emissive: 0x333333,
    emissiveIntensity: 0.3
  });

  return headsMaterial;
};

export const createBackMaterial = () => {
  const tailsTexture = new THREE.TextureLoader().load(
    "/new-btc/coins/dolla-eth.png"
  );
  const tailsMaterial = new THREE.MeshStandardMaterial({
    map: tailsTexture,
    metalness: 0.3,
    roughness: 0.2,
    emissive: 0x333333,
    emissiveIntensity: 0.3
  });

  return tailsMaterial;
};

export const createSideMaterial = () => {
  const sideMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xfafc81, // Yellow
    metalness: 1,
    roughness: 0.3,
    clearcoat: 0.6,
    clearcoatRoughness: 0.2
  });

  return sideMaterial;
};
