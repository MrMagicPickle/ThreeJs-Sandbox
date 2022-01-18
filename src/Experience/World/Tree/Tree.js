import Experience from "../../Experience";
import { TreeFSM } from "./TreeFSM";
import * as THREE from 'three';
import { Vector3 } from "three";

export class Tree {
  constructor() {
    this._Init();
  }

  _Init() {
    // this.initialDimensions = {
    //   width: 1,
    //   height: 0.1,
    //   depth: 1,
    // }
    // this.grownDimensions = {
    //   width: 2,
    //   height: 5,
    //   depth: 2,
    // };
    this.dimensions = {
      width: 2,
      height: 5,
      depth: 2,
    }
    this.position = new Vector3(5, 0, 5);
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.model = new THREE.Mesh(new THREE.BoxGeometry(this.dimensions.width, this.dimensions.height, this.dimensions.depth), new THREE.MeshStandardMaterial({ color: 0xff0000}));
    this.model.scale.set(0.1, 0.1, 0.1);
    this._stateMachine = new TreeFSM(this);
    this._stateMachine.SetState('idle');
    this.scene.add(this.model);
    this.model.position.set(this.position.x, this.position.y, this.position.z);
    // console.log(this.model.position);

    // Use this to compute the bounding box, to identify how much to offset the geometry such that
    // the center of origin will be at the bottom of the mesh.
    // const bbox = new THREE.Box3().setFromObject(this.model);
    this.model.geometry.translate(0, 2.5, 0);
    window.tree = this;
  }

  Update(timeInSeconds) {
    if (!this.model) {
      return;
    }
    this._stateMachine.Update(timeInSeconds, undefined);
  }
}
