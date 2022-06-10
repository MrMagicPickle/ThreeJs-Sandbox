import * as THREE from 'three';
import Experience from '../../../Experience';
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
    this.reviewScreen.rotation.y = -(Math.PI * 0.5);
    this.reviewScreen.position.set(1, 5, 130);
    this.scene.add(this.reviewScreen);

    this.showReview();
    window.reviewScreen = this;
  }

  get model() {
    return this.reviewScreen;
  }

  showReview() {
    if (this.sliderTimer) {
      clearTimeout(this.sliderTimer);
    }
    this.reviewScreen.material = this.reviewMaterials[this.currReviewIndex];
    this.sliderTimer = setTimeout(() => {
      this.nextReview();
    }, 3000);
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