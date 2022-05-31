import gsap from 'gsap';
import Experience from '../../Experience';
import * as THREE from 'three';

export class BlockContainer {
  constructor(blocks) {
    this.blocks = blocks;
    this.tweens = [];
    this.init();

  }

  init() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    for (const block of this.blocks) {
      const model = new THREE.Mesh(new THREE.BoxGeometry(block.dimensions.width, block.dimensions.height, block.dimensions.depth), new THREE.MeshStandardMaterial({ color: block.color}));
      this.scene.add(model);
      model.position.set(block.start.position.x, block.start.position.y, block.start.position.z);

      const tween = gsap.to(model.position, {
        duration: 1,
        y: block.end.position.y,
        paused: true,
        ease: 'none,'
      });
      this.tweens.push(tween);
    }
  }

  async activate() {
    for (const tween of this.tweens) {
      tween.play();
      await delay(50);
    }
  }
}

function delay(delayInms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(2);
    }, delayInms);
  });
}