import * as THREE from 'three';
import Experience from '../../Experience';

export class PlatformPath {
  constructor() {
    this.init();
  }

  init() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    const color = [0xff0000, 0x00ff00, 0x0000ff];
    const width = 2;
    const height = 2;
    const depth = 2;
    const pathMatrix = [];
    const pathDiameter = 5;
    this.pathStartX = -pathDiameter;
    this.pathEndX = pathDiameter;
    for (let i = 0; i < 30; i++) {
      const row = [];
      const currColor = color[i % 3];
      for (let j = 0; j < pathDiameter; j++) {
        const model = new THREE.Mesh(new THREE.BoxGeometry(
          width,
          height,
          depth,
        ), new THREE.MeshStandardMaterial({ color: currColor}));
        this.scene.add(model);
        /* X = centered [-2, 0, 2], Z = increasing depth [0, 2, 4, 6, ... 58]*/
        model.position.set((pathDiameter - (width * j)), 0, i * depth);

        /* Essentially shifting center of origin to be at the center x and bottom y*/
        model.geometry.translate(-(width /  2), -(height / 2), 0);
        row.push(model);
      }
      pathMatrix.push(row);
    }
    window.path = this;
  }
}