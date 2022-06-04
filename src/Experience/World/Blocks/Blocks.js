import * as THREE from 'three';
/*
 * For word plane textures, we use 1024 x 512 images
 * Also, we use width: 25, height: 12.5 for the Geometry dimensions
 * This allows better readability.
 */
/*
 * All non-custom Blocks must have the following structure:
 * {
 *   isCustom: false,
 *   color: 0xff0000,
 *   dimensions: {
 *     width: 0,
 *     height: 0,
 *     depth: 0,
 *   },
 *   start: {
 *     position: {
 *       x: 0,
 *       y: 0,
 *       z: 0,
 *     },
 *   },
 *   end: {
 *     position: {
 *       x: 0,
 *       y: 0,
 *       z: 0,
 *     }
 *   }
 * }
 */

export const introIsland = () => {
  const islandBase = {
    isCustom: false,
    isImage: false,
    color: 0xff0000,
    dimensions: {
      width: 10,
      height: 2,
      depth: 10,
    },
    start: {
      position: {
        x: 15,
        y: -10,
        z: 40,
      },
    },
    end: {
      position: {
        x: 15,
        y: 0,
        z: 40,
      },
    },
  };
  const introText = {
    name: 'Intro text',
    isCustom: true,
    isImage: false,
    model: new THREE.Mesh(
      new THREE.PlaneGeometry(25, 12.5),
      new THREE.MeshBasicMaterial({})
    ),
    modelMaterial: 'aboutMeText',
    rotation: {
      x: - (Math.PI * 0.5),
    },
    start: {
      position: {
        x: 15,
        y: -10,
        z: 40,
      },
    },
    end: {
      position: {
        x: 15,
        y: 5,
        z: 40,
      },
    },
  };

  return [islandBase, introText];
};

export const companiesIsland = () => {
  const islandBase = {
    isCustom: false,
    isImage: false,
    color: 0xff0000,
    dimensions: {
      width: 10,
      height: 2,
      depth: 10,
    },
    start: {
      position: {
        x: 15,
        y: -10,
        z: 90,
      },
    },
    end: {
      position: {
        x: 15,
        y: 0,
        z: 90,
      },
    },
  };
  const compassLogo = {
    name: 'Compass',
    isCustom: true,
    model: new THREE.Mesh(
      new THREE.PlaneGeometry(5, 2.5),
      new THREE.MeshBasicMaterial({})
    ),
    modelMaterial: 'compassInteractiveLogo',
    isImage: true,
    rotation: {
      x: - (Math.PI * 0.5),
    },
    start: {
      position: {
        x: 15,
        y: -10,
        z: 90,
      },
    },
    end: {
      position: {
        x: 15,
        y: 5,
        z: 90,
      },
    },
  };

  return [islandBase, compassLogo];
};

export const sampleBlocksList = [
  {
    color: 0xffff00,
    dimensions: {
      width: 2,
      height: 2,
      depth: 2,
    },
    start: {
      position: {
        x: 2,
        y: -10,
        z: 2,
      },
    },
    end: {
      position: {
        x: 2,
        y: 5,
        z: 2,
      },
    },
  },
  {
    color: 0xffffff,
    dimensions: {
      width: 2,
      height: 2,
      depth: 2,
    },
    start: {
      position: {
        x: 4,
        y: -10,
        z: 2,
      },
    },
    end: {
      position: {
        x: 2,
        y: 5,
        z: 2,
      },
    },
  },
  {
    color: 0xf0ff00,
    dimensions: {
      width: 2,
      height: 2,
      depth: 2,
    },
    start: {
      position: {
        x: 6,
        y: -10,
        z: 2,
      },
    },
    end: {
      position: {
        x: 2,
        y: 5,
        z: 2,
      },
    },
  },
  {
    color: 0xf0ff00,
    dimensions: {
      width: 2,
      height: 2,
      depth: 2,
    },
    start: {
      position: {
        x: 6,
        y: -10,
        z: 4,
      },
    },
    end: {
      position: {
        x: 2,
        y: 5,
        z: 2,
      },
    },
  },
  {
    color: 0xf0ff00,
    dimensions: {
      width: 2,
      height: 2,
      depth: 2,
    },
    start: {
      position: {
        x: 6,
        y: -10,
        z: 6,
      },
    },
    end: {
      position: {
        x: 2,
        y: 5,
        z: 2,
      },
    },
  },
  {
    color: 0x00ff00,
    dimensions: {
      width: 2,
      height: 2,
      depth: 2,
    },
    start: {
      position: {
        x: 2,
        y: -10,
        z: 4,
      },
    },
    end: {
      position: {
        x: 2,
        y: 5,
        z: 2,
      },
    },
  },
  {
    color: 0xffff0f,
    dimensions: {
      width: 2,
      height: 2,
      depth: 2,
    },
    start: {
      position: {
        x: 2,
        y: -10,
        z: 6,
      },
    },
    end: {
      position: {
        x: 2,
        y: 5,
        z: 2,
      },
    },
  },
];