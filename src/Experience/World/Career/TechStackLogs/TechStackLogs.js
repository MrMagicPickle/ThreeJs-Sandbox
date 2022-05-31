import Experience from "../../../Experience";
import * as THREE from 'three';
import { Group, Vector3 } from "three";
import { math } from "../../../Utils/Math";

export class SingleLogChunk {
  constructor(position) {
    this.position = position;
    this._Init();
  }

  _Init() {
    this.dimensions = {
      width: 2,
      height: 1,
      depth: 2,
    };
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.model = new THREE.Mesh(
      new THREE.CylinderGeometry(
        this.dimensions.width / 2,
        this.dimensions.width / 2,
        this.dimensions.height
      ),
      new THREE.MeshStandardMaterial({
        color: 0xb08612,
      }),
    );
    this.model.position.set(
      this.position.x,
      this.position.y,
      this.position.z
    );
    this.model.geometry.translate(0, this.dimensions.height / 2, 0);

  }
}

export class TechStackLogs {
  constructor(position, numberOfLogs = 1) {
    this.position = position;
    this.numberOfLogs = numberOfLogs;
    this.logChunks = [];
    this.group = new Group();
    this._Init();
  }

  _Init() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.AddLogChunksToStack();
    this.scene.add(this.group);
    window.stack = this;
  }

  AddLogChunksToStack() {
    const { x, y, z } = this.position;
    const logChunkHeight = 1;
    for (let i = 0; i < this.numberOfLogs; i++) {
      const offsetX = math.rand_float(x - 0.1, x + 0.1);
      const offsetZ = math.rand_float(z - 0.1, z + 0.1);
      const logChunk = new SingleLogChunk(
        new Vector3(offsetX, y + (i * logChunkHeight), offsetZ)
      );
      this.logChunks.push(
        logChunk
      );
      this.group.add(
        logChunk.model
      );
    }
  }
}
