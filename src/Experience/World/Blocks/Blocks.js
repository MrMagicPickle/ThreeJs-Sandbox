import * as THREE from 'three';
import { Vector3 } from 'three';
import { CompanyLogo } from './ScreenMonitor/CompanyLogo';
import { ScreenMonitor } from './ScreenMonitor/ScreenMonitor';
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

/* Intro Island */
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

/* Company Island */
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

  const zPositions = [
    [80, 85.7, 91.4],
    [80, 85.7, 91.4],
    [82.85, 88.55],
  ];
  const yPositions = [
    9.3,
    5.9,
    2.5,
  ];

  const compassLogo = new CompanyLogo('compassInteractiveLogo', 'Compass');
  const compassScreen = {
    isInstance: true,
    instance: new ScreenMonitor(compassLogo, new Vector3(0, 0, 0), new Vector3(0, 0, 0)),
    start: {
      position: {
        x: 15, y: -10, z: zPositions[0][1],
      },
    },
    end: {
      position: {
        x: 15, y: yPositions[0], z: zPositions[0][1],
      },
    },
  };

  const nikeBlackLogo = new CompanyLogo('nikeBlackLogo', 'Nike');
  const nikeScreen = {
    isInstance: true,
    instance: new ScreenMonitor(nikeBlackLogo, new Vector3(0, 0, 0), new Vector3(0, 0, 0)),
    start: {
      position: {
        x: 15, y: -10, z: zPositions[2][1],
      },
    },
    end: {
      position: {
        x: 15, y: yPositions[2], z: zPositions[2][1],
      },
    },
  };

  const configuraLogo = new CompanyLogo('configuraLogo', 'Configura');
  const configuraScreen = {
    isInstance: true,
    instance: new ScreenMonitor(configuraLogo, new Vector3(0, 0, 0), new Vector3(0, 0, 0)),
    start: {
      position: {
        x: 15, y: -10, z: zPositions[1][0],
      },
    },
    end: {
      position: {
        x: 15, y: yPositions[1], z: zPositions[1][0],
      },
    },
  };

  const kiehlsLogo = new CompanyLogo('kiehlsLogo', 'Kiehls');
  const kiehlsScreen = {
    isInstance: true,
    instance: new ScreenMonitor(kiehlsLogo, new Vector3(0, 0, 0), new Vector3(0, 0, 0)),
    start: {
      position: {
        x: 15, y: -10, z: zPositions[2][0],
      },
    },
    end: {
      position: {
        x: 15, y: yPositions[2], z: zPositions[2][0],
      },
    },
  };

  const ikeaLogo = new CompanyLogo('ikeaLogo', 'Ikea');
  const ikeaScreen = {
    isInstance: true,
    instance: new ScreenMonitor(ikeaLogo, new Vector3(0, 0, 0), new Vector3(0, 0, 0)),
    start: {
      position: {
        x: 15, y: -10, z: zPositions[0][0],
      },
    },
    end: {
      position: {
        x: 15, y: yPositions[0], z: zPositions[0][0],
      },
    },
  };

  const brickmagicLogo = new CompanyLogo('brickmagicLogo', 'BrickMagic');
  const brickmagicScreen = {
    isInstance: true,
    instance: new ScreenMonitor(brickmagicLogo, new Vector3(0, 0, 0), new Vector3(0, 0, 0)),
    start: {
      position: {
        x: 15, y: -10, z: zPositions[0][2],
      },
    },
    end: {
      position: {
        x: 15, y: yPositions[0], z: zPositions[0][2],
      },
    },
  };

  const jbiLogo = new CompanyLogo('jbiLogo', 'JBI');
  const jbiScreen = {
    isInstance: true,
    instance: new ScreenMonitor(jbiLogo, new Vector3(0, 0, 0), new Vector3(0, 0, 0)),
    start: {
      position: {
        x: 15, y: -10, z: zPositions[1][2],
      },
    },
    end: {
      position: {
        x: 15, y: yPositions[1], z: zPositions[1][2],
      },
    },
  };

  const snappymobLogo = new CompanyLogo('snappymobLogo', 'Snappymob');
  const snappymobScreen = {
    isInstance: true,
    instance: new ScreenMonitor(snappymobLogo, new Vector3(15, -10, 0), new Vector3(15, 5, 0)),
    start: {
      position: {
        x: 15, y: -10, z: zPositions[1][1],
      },
    },
    end: {
      position: {
        x: 15, y: yPositions[1], z: zPositions[1][1],
      },
    },
  };

  return [
    islandBase,
    compassScreen,
    nikeScreen,
    configuraScreen,
    kiehlsScreen,
    ikeaScreen,
    brickmagicScreen,
    jbiScreen,
    snappymobScreen,
  ];
};


/* Review Island, Z > 130 */
export const reviewIsland = () => {
  const islandBase = {
    isCustom: false,
    isImage: false,
    color: 0xff00ff,
    dimensions: {
      width: 10,
      height: 2,
      depth: 10,
    },
    start: {
      position: {
        x: 15,
        y: -10,
        z: 130,
      },
    },
    end: {
      position: {
        x: 15,
        y: 0,
        z: 130,
      },
    },
  };
  const reviewScreen = {
    name: 'Review',
    isCustom: true,
    model: new THREE.Mesh(
      new THREE.PlaneGeometry(20, 10),
      new THREE.MeshBasicMaterial({})
    ),
    modelMaterial: 'howardReview',
    isImage: true,
    rotation: {
      x: - (Math.PI * 0.5),
    },
    start: {
      position: {
        x: 1,
        y: -10,
        z: 130,
      },
    },
    end: {
      position: {
        x: 1,
        y: 5,
        z: 130,
      },
    },
  };
  return [islandBase, reviewScreen];
};

export const linkIsland = () => {
  const islandBase = {
    isCustom: false,
    isImage: false,
    color: 0xff00ff,
    dimensions: {
      width: 10,
      height: 2,
      depth: 10,
    },
    start: {
      position: {
        x: 15,
        y: -10,
        z: 170,
      },
    },
    end: {
      position: {
        x: 15,
        y: 0,
        z: 170,
      },
    },
  };
  return [islandBase];
}

/* Sample List */
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


/* Company logo example for reference */
  // const snappymobLogo = {
  //   name: 'Snappymob',
  //   isCustom: true,
  //   model: new THREE.Mesh(
  //     new THREE.PlaneGeometry(5, 2.5),
  //     new THREE.MeshBasicMaterial({})
  //   ),
  //   modelMaterial: 'snappymobLogo',
  //   isImage: true,
  //   rotation: {
  //     x: - (Math.PI * 0.5),
  //   },
  //   start: {
  //     position: {
  //       x: 15,
  //       y: -10,
  //       z: 105,
  //     },
  //   },
  //   end: {
  //     position: {
  //       x: 15,
  //       y: 5,
  //       z: 105,
  //     },
  //   },
  // };
