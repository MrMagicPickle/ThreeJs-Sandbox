import * as THREE from 'three';
import { BoxGeometry } from 'three';
import Experience from '../../../Experience';
import { makeInteractable } from '../../../Interactable';
import { ThirdPersonCamera } from '../../../ThirdPersonCamera';
import { CompanyLogoMaterial, ReviewPlaneGeometry } from '../../../Utils/Reusables';

export class ReviewScreen {
  constructor(reviewMaterialNames, startPosition, endPosition) {
    this.reviewMaterialNames = reviewMaterialNames;
    this.startPosition = startPosition,
    this.endPosition = endPosition;
    this.sliderTimer;
    this.init();
  }

  init() {
    this.width = 5;
    this.height = 2.5;
    this.depth = 0.2;
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.reviewMaterials = [];
    this.currReviewIndex = 0;

    this.group = new THREE.Group();

    this.reviewScreen = new THREE.Mesh(
      ReviewPlaneGeometry,
      CompanyLogoMaterial,
    );
    this.resources.on('ready', () => {
      for (let i = 0; i < this.reviewMaterialNames.length; i++) {
        const reviewMaterialTexture = this.resources.items[this.reviewMaterialNames[i]];
        reviewMaterialTexture.encoding = THREE.sRGBEncoding;
        const material = new THREE.MeshBasicMaterial({
          map: reviewMaterialTexture,
          blending: THREE.CustomBlending,
          blendSrc: THREE.SrcColorFactor,
          blendDst: THREE.ZeroFactor,
        });
        this.reviewMaterials.push(material);
      }
      this.reviewScreen.material = this.reviewMaterials[this.currReviewIndex];
    });
    this.group.add(this.reviewScreen);

    this.leftButton = new THREE.Mesh(
      new BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: 0xff0000 }),
    );
    this.leftButton.position.set(-3, 2.5, 2.5);
    this.group.add(this.leftButton);

    this.rightButton = new THREE.Mesh(
      new BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
    );
    this.rightButton.position.set(3, 2.5, 2.5);
    this.group.add(this.rightButton);

    this.group.rotation.y = -(Math.PI * 0.5);
    this.group.position.set(5, 5, 130);
    this.scene.add(this.group);

    this.showReview();
    window.reviewScreen = this;

    /* Make buttons interactable */
    makeInteractable(this.leftButton);
    makeInteractable(this.rightButton);

    /* Handle on click events for buttons */
    this.handleButtonsOnClick();
  }

  handleButtonsOnClick() {

  }

  get model() {
    return this.group;
  }

  showReview() {
    if (this.sliderTimer) {
      clearTimeout(this.sliderTimer);
    }
    this.reviewScreen.material = this.reviewMaterials[this.currReviewIndex];
    this.sliderTimer = setTimeout(() => {
      this.nextReview();
    }, 5000);
  }

  nextReview() {
    if (this.currReviewIndex < this.reviewMaterials.length - 1) {
      this.currReviewIndex ++;
    } else {
      this.currReviewIndex = 0;
    }
    this.showReview();
  }

  prevReview() {
  if (this.currReviewIndex > 0) {
      this.currReviewIndex --;
    } else {
      this.currReviewIndex = this.reviewMaterials.length - 1;
    }
    this.showReview();
  }
}