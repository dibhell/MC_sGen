import * as THREE from 'three';

/**
 * Proceduralny generator tekstur i bloków Minecrafta 3D
 */

// Pomocnik tworzenia tekstury Canvas z pikselowym filtrowaniem
function createPixelTexture(drawFn) {
  const canvas = document.createElement('canvas');
  canvas.width = 16;
  canvas.height = 16;
  const ctx = canvas.getContext('2d');
  drawFn(ctx);

  const texture = new THREE.CanvasTexture(canvas);
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  return texture;
}

// 1. Blok Trawy (Grass Block)
export function createGrassBlockTextures() {
  // Top: Green grass
  const top = createPixelTexture((ctx) => {
    ctx.fillStyle = '#5c8e32';
    ctx.fillRect(0, 0, 16, 16);
    // noisy grass blades
    for (let x = 0; x < 16; x++) {
      for (let y = 0; y < 16; y++) {
        if ((x + y * 7) % 3 === 0) {
          ctx.fillStyle = '#4a7428';
          ctx.fillRect(x, y, 1, 1);
        } else if ((x * 3 + y * 5) % 4 === 0) {
          ctx.fillStyle = '#6fa83d';
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }
  });

  // Bottom: Brown dirt
  const bottom = createPixelTexture((ctx) => {
    ctx.fillStyle = '#866043';
    ctx.fillRect(0, 0, 16, 16);
    for (let x = 0; x < 16; x++) {
      for (let y = 0; y < 16; y++) {
        if ((x * 5 + y * 11) % 4 === 0) {
          ctx.fillStyle = '#684830';
          ctx.fillRect(x, y, 1, 1);
        } else if ((x + y * 3) % 5 === 0) {
          ctx.fillStyle = '#9b7352';
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }
  });

  // Sides: Dirt with hanging grass fringe
  const side = createPixelTexture((ctx) => {
    // Dirt base
    ctx.fillStyle = '#866043';
    ctx.fillRect(0, 0, 16, 16);
    for (let x = 0; x < 16; x++) {
      for (let y = 0; y < 16; y++) {
        if ((x * 5 + y * 11) % 4 === 0) {
          ctx.fillStyle = '#684830';
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }
    // Grass top layer
    ctx.fillStyle = '#5c8e32';
    ctx.fillRect(0, 0, 16, 3);
    // Hanging blades
    const fringes = [4, 5, 3, 4, 6, 4, 3, 5, 4, 3, 5, 6, 4, 3, 5, 4];
    for (let x = 0; x < 16; x++) {
      ctx.fillRect(x, 3, 1, fringes[x] - 2);
    }
  });

  return {
    top,
    bottom,
    side
  };
}

// 2. Blok Obsydianu (Obsidian Block)
export function createObsidianTexture() {
  return createPixelTexture((ctx) => {
    ctx.fillStyle = '#100c1c';
    ctx.fillRect(0, 0, 16, 16);
    for (let x = 0; x < 16; x++) {
      for (let y = 0; y < 16; y++) {
        const val = (x * 7 + y * 13) % 7;
        if (val === 0) {
          ctx.fillStyle = '#2b1e4a';
          ctx.fillRect(x, y, 1, 1);
        } else if (val === 1) {
          ctx.fillStyle = '#3c2b69';
          ctx.fillRect(x, y, 1, 1);
        } else if (val === 2) {
          ctx.fillStyle = '#0a0712';
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }
  });
}

// 3. Ruda Diamentu (Diamond Ore Block)
export function createDiamondOreTexture() {
  return createPixelTexture((ctx) => {
    // Stone background
    ctx.fillStyle = '#737373';
    ctx.fillRect(0, 0, 16, 16);
    for (let x = 0; x < 16; x++) {
      for (let y = 0; y < 16; y++) {
        if ((x + y * 3) % 4 === 0) {
          ctx.fillStyle = '#5c5c5c';
          ctx.fillRect(x, y, 1, 1);
        } else if ((x * 3 + y) % 5 === 0) {
          ctx.fillStyle = '#858585';
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }
    // Diamond gems
    const gems = [
      [3, 3], [4, 3], [3, 4], [4, 4], [5, 4],
      [11, 4], [12, 4], [11, 5], [12, 5],
      [7, 9], [8, 9], [7, 10], [8, 10], [9, 10],
      [2, 11], [3, 11], [3, 12],
      [12, 11], [13, 11], [12, 12]
    ];
    for (let [gx, gy] of gems) {
      ctx.fillStyle = '#2de4df';
      ctx.fillRect(gx, gy, 1, 1);
    }
    ctx.fillStyle = '#baf8f6';
    ctx.fillRect(3, 3, 1, 1);
    ctx.fillRect(11, 4, 1, 1);
    ctx.fillRect(7, 9, 1, 1);
  });
}

/**
 * Tworzy siatkę 3D pojedynczego lub złożonego podestu z bloków
 * @param {'grass' | 'obsidian' | 'diamond'} blockType 
 * @returns {THREE.Mesh}
 */
export function buildVoxelPedestal(blockType = 'grass') {
  // Rozmiar dopasowany do stóp postaci Minecraft (szerokość 18, wysokość 3, głębokość 14)
  const geometry = new THREE.BoxGeometry(18, 3.5, 14);

  let materials;

  if (blockType === 'grass') {
    const { top, bottom, side } = createGrassBlockTextures();
    const sideMat = new THREE.MeshLambertMaterial({ map: side });
    const topMat = new THREE.MeshLambertMaterial({ map: top });
    const bottomMat = new THREE.MeshLambertMaterial({ map: bottom });
    // Three.js Box: right, left, top, bottom, front, back
    materials = [sideMat, sideMat, topMat, bottomMat, sideMat, sideMat];
  } else if (blockType === 'obsidian') {
    const tex = createObsidianTexture();
    const mat = new THREE.MeshLambertMaterial({ map: tex });
    materials = [mat, mat, mat, mat, mat, mat];
  } else if (blockType === 'diamond') {
    const tex = createDiamondOreTexture();
    const mat = new THREE.MeshLambertMaterial({ map: tex });
    materials = [mat, mat, mat, mat, mat, mat];
  }

  const mesh = new THREE.Mesh(geometry, materials);
  // Pozycja dokładnie pod stopami postaci (stopy kończą się w okolicach y = -14..-15)
  mesh.position.set(0, -15.8, 0);
  mesh.castShadow = true;
  mesh.receiveShadow = true;

  return mesh;
}
