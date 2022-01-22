import Camera from './Camera';
import Experience from "./Experience";
import * as THREE from 'three';

export class ThirdPersonCamera {
  constructor(params) {
    this.experience = new Experience();
    this._camera = new Camera();
    this.target;
    this._currentPosition = new THREE.Vector3(0, 0, 0);
    this._currentLookat = new THREE.Vector3(0, 0, 0);
    this.isPovMode = false;
    window.camera = this;
  }

  _CalculateIdealOffset() {
    if (this.target) {
      let idealOffset
      if (!this.isPovMode) {
        idealOffset = new THREE.Vector3(-15, 20, -30);
      } else {
        idealOffset = new THREE.Vector3(0, 2, -30);
      }
      idealOffset.applyQuaternion(this.target.Rotation);
      idealOffset.add(this.target.Position);
      return idealOffset;
    }
  }

  _CalculateIdealLookat() {
    if (this.target) {
      let idealLookat;
      if (!this.isPovMode) {
        idealLookat = new THREE.Vector3(0, 5, 0);
      } else {
        idealLookat = new THREE.Vector3(0, 8, 0);
      }

      idealLookat.applyQuaternion(this.target.Rotation);
      idealLookat.add(this.target.Position);
      return idealLookat;
    }
  }

  Update(timeElapsed) {
    if (!this.target) {
      return;
    }
    const idealOffset = this._CalculateIdealOffset();
    const idealLookat = this._CalculateIdealLookat();
    // const t = 0.05;
    // const t = 4.0 * timeElapsed;
    const t = 1.0 - Math.pow(0.001, timeElapsed);

    this._currentPosition.lerp(idealOffset, t);
    this._currentLookat.lerp(idealLookat, t);
    this._camera.instance.position.copy(this._currentPosition);
    this._camera.instance.lookAt(this._currentLookat);
  }

  setTarget(target) {
    this.target = target;
  }
}
