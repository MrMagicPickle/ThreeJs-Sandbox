import * as THREE from 'three';
import { Vector3 } from 'three';
import Experience from '../../../Experience';

export class ScreenMonitor {
  constructor(position) {
    this.position = position;
    this.init();
  }

  init() {
    this.width = 5;
    this.height = 2.5;
    this.depth = 0.2;
    this.experience = new Experience();
    this.scene = this.experience.scene;
    const material = new THREE.MeshBasicMaterial({ wireframe: false, color: 0x4a4949});

    const backMaterial = new THREE.MeshBasicMaterial({ wireframe: false, color: 0xff0000});
    const sideGeometry = new THREE.BoxGeometry(this.depth, this.height, this.depth);
    const topGeometry = new THREE.BoxGeometry(this.depth, this.width + (this.depth), this.depth);
    const backGeometry = new THREE.BoxGeometry(this.width, this.height, this.depth);
    const monitorTop = new THREE.Mesh(
      topGeometry,
      material,
    );
    const monitorBottom = new THREE.Mesh(
      topGeometry,
      material,
    );
    const monitorLeft = new THREE.Mesh(
      sideGeometry,
      material,
    );
    const monitorRight = new THREE.Mesh(
      sideGeometry,
      material,
    );
    const monitorBack = new THREE.Mesh(
      backGeometry,
      backMaterial,
    );
    this.screenMonitor = new THREE.Group();
    // this.screenMonitor.add(monitorBack);
    this.screenMonitor.add(monitorTop);
    this.screenMonitor.add(monitorBottom);
    this.screenMonitor.add(monitorRight);
    this.screenMonitor.add(monitorLeft);
    this.screenMonitor.rotation.y = - (Math.PI * 0.5);
    this.screenMonitor.position.set(this.position.x, this.position.y, this.position.z);

    monitorLeft.position.x = -(this.width / 2) ;
    monitorLeft.rotation.y = (Math.PI * 0.5);
    monitorRight.position.x = this.width / 2;
    monitorRight.rotation.y = -(Math.PI * 0.5);

    monitorTop.position.y = (this.height / 2) + this.depth/2;
    monitorTop.rotation.z = -(Math.PI * 0.5);
    // monitorTop.rotation.x = Math.PI * 0.5;

    monitorBottom.position.y = -( (this.height / 2) + this.depth/2);
    monitorBottom.rotation.z = (Math.PI * 0.5);

    monitorBack.position.z = -this.depth/2;
    this.experience.scene.add(this.screenMonitor);
    window.screenMonitor = this;
  }

  get size() {
    let measure = new Vector3();
    // const box =  this.screenMonitor.getSize(measure);
    // return measure;
    const box = new THREE.Box3().setFromObject(this.screenMonitor);
    box.getSize(measure);
    return measure;
  }
}
