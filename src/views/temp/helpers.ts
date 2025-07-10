import * as THREE from "three";

export const createCoin = (scene: THREE.Scene) => {
  // Create coin geometry with better proportions for collision detection
  const coinGeometry = new THREE.CylinderGeometry(1, 1, 0.15, 32); // Increased thickness for better collision

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
    emissiveIntensity: 0.3,
    polygonOffset: true
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
    emissiveIntensity: 0.3,
    polygonOffset: true
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

export const createFrontMaterialWithAdvancedLayout = (
  options: {
    text?: string;
    imageUrl?: string;
    textPosition?: "center" | "top" | "bottom";
    textSize?: number;
    textColor?: string;
    backgroundImage?: boolean;
  } = {}
) => {
  const {
    text = "WIN",
    imageUrl = "/new-btc/coins/dolla-s.png",
    textPosition = "center",
    textSize = 80,
    textColor = "red"
  } = options;

  // Create canvas for combined texture
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    return createFrontMaterial();
  }

  canvas.width = 512;
  canvas.height = 512;

  // Create texture from canvas
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;

  const material = new THREE.MeshStandardMaterial({
    map: texture,
    metalness: 0.3,
    roughness: 0.2,
    emissive: 0x333333,
    emissiveIntensity: 0.3,
    polygonOffset: true
  });

  // Load image and update texture when ready
  const img = new Image();
  img.crossOrigin = "anonymous";

  img.onload = () => {
    console.log("img.onload - Drawing image and text");
    // Draw background image
    context.drawImage(img, 0, 0, 512, 512);

    // Calculate text position
    let textY = 256; // center
    if (textPosition === "top") textY = 150;
    if (textPosition === "bottom") textY = 362;

    // Add text
    context.fillStyle = textColor;
    context.font = `bold ${textSize}px Arial`;
    context.textAlign = "center";
    context.textBaseline = "middle";

    // Add text shadow
    context.shadowColor = "rgba(255, 255, 255, 0.8)";
    context.shadowBlur = 8;
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;

    // Draw text
    context.fillText(text, 256, textY);
    console.log(`Text "${text}" drawn at position (256, ${textY})`);

    // Update texture to reflect changes
    texture.needsUpdate = true;
    console.log("Texture updated");
  };

  img.src = imageUrl;

  return material;
};
