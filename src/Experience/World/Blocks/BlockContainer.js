import gsap from 'gsap';
import Experience from '../../Experience';
import * as THREE from 'three';

export class BlockContainer {
  constructor(blocks) {
    this.isActive = false;
    this.blocks = blocks;
    this.tweens = [];
    this.init();

  }

  init() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    for (const block of this.blocks) {
      let model;
      if (block.isInstance) {
        model = block.instance.model;
      } else if (block.isCustom) {
        model = block.model;
        this.resources.on('ready', () => {
          const materialTexture = this.resources.items[block.modelMaterial];
          /* This encoding code is needed because our renderer's outputEncoding is
             THREE.sRGBEncoding.
             https://discourse.threejs.org/t/image-texture-is-looks-white/19494 */
          materialTexture.encoding = THREE.sRGBEncoding;
          if (!block.isImage) {
            model.material = new THREE.MeshBasicMaterial({ map: materialTexture, alphaMap: materialTexture, transparent: true, color: 0x0000ff, });
          } else {
            model.material = new THREE.MeshBasicMaterial({ map: materialTexture });
          }
        });
        model.rotation.y = block.rotation.x;
      } else {
        model = new THREE.Mesh(new THREE.BoxGeometry(block.dimensions.width, block.dimensions.height, block.dimensions.depth), new THREE.MeshStandardMaterial({ color: block.color }));
      }
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
    this.isActive = true;
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