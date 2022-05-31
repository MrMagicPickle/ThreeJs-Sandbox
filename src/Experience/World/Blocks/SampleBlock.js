import gsap from 'gsap';
import Experience from '../../Experience';
import * as THREE from 'three';

export class Block {
  constructor() {

    this.init();
  }

  init() {
    this.experience = new Experience();

    this.dimensions = {
      width: 2,
      height: 2,
      depth: 2,
    }
    this.position = {
      x: 2,
      y: -10,
      z: 2,
    }

    this.scene = this.experience.scene;
    this.model = new THREE.Mesh(new THREE.BoxGeometry(this.dimensions.width, this.dimensions.height, this.dimensions.depth), new THREE.MeshStandardMaterial({ color: 0xffff00}));
    this.scene.add(this.model);
    this.model.position.set(this.position.x, this.position.y, this.position.z);

    const tween = gsap.to(this.model.position, {
      duration: 1,
      y: 7,
      paused: true,
      ease: 'none,'
    });

    window.block = this;
    window.tween = tween;
  }
}
