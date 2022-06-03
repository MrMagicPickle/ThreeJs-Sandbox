import * as THREE from 'three';
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
    color: 0x0000ff,
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
    isCustom: true,
    model: new THREE.Mesh(
      new THREE.PlaneGeometry(10, 5),
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