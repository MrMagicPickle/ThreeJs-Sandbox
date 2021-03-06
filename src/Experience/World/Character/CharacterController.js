import Experience from "../../Experience";
import * as THREE from 'three';
import { CharacterControllerInput } from "./CharacterControllerInput";
import { CharacterFSM } from "./CharacterFSM";

export class CharacterController {
  constructor(params) {

    this._Init(params);
  }

  _Init(params) {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    const { pathStartX, pathEndX } = params;
    this.pathStartX = pathStartX;
    this.pathEndX = pathEndX;
    this._decceleration = new THREE.Vector3(-0.0005, -0.0001, -5.0);
    this._acceleration = new THREE.Vector3(1, 0.25, 50.0);
    this._velocity = new THREE.Vector3(0, 0, 0);
    this._position = new THREE.Vector3();
    this.model;
    this._animations = {};
    this._input = new CharacterControllerInput();
    this._stateMachine = new CharacterFSM(new CharacterControllerProxy(this._animations));
    window.fox = this;
  }

  LoadResources() {
    this.resources = this.experience.resources;
    this.resource = this.resources.items.foxModel;
    this._LoadModels();
    this._LoadAnimations();
  }

  get Position() {
    return this._position;
  }

  get Rotation() {
    if (!this.model) {
      return new THREE.Quaternion();
    }
    return this.model.quaternion;
  }


  _LoadModels() {
    this.model = this.resource.scene;
    this.model.scale.set(0.02, 0.02, 0.02);
    this.scene.add(this.model);
    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {

        child.castShadow = true
        this._target = child;
      }
    });
  }

  _LoadAnimations() {
      this._mixer = new THREE.AnimationMixer(this.model);

      const loadAnimations = (name, anim) => {
        const clip = anim;
        const action = this._mixer.clipAction(clip);

        this._animations[name] = {
          clip,
          action,
        };
      }
      loadAnimations('idle', this.resource.animations[0]);
      loadAnimations('walk', this.resource.animations[1]);
      loadAnimations('run', this.resource.animations[2]);
      this._stateMachine.SetState('idle');
  }

  Update(timeInSeconds) {

    if (!this.model) {
      return;
    }
    this._mixer.update(timeInSeconds);

    this._stateMachine.Update(timeInSeconds, this._input);

    const velocity = this._velocity;
    const frameDecceleration = new THREE.Vector3(
        velocity.x * this._decceleration.x,
        velocity.y * this._decceleration.y,
        velocity.z * this._decceleration.z
    );
    frameDecceleration.multiplyScalar(timeInSeconds);
    frameDecceleration.z = Math.sign(frameDecceleration.z) * Math.min(
        Math.abs(frameDecceleration.z), Math.abs(velocity.z));

    velocity.add(frameDecceleration);

    const controlObject = this.model;
    const _Q = new THREE.Quaternion();
    const _A = new THREE.Vector3();
    const _R = controlObject.quaternion.clone();

    const acc = this._acceleration.clone();
    if (this._input._keys.shift) {
      acc.multiplyScalar(2.0);
    }

    if (this._stateMachine._currentState.Name == 'dance') {
      acc.multiplyScalar(0.0);
    }

    /* Fixed left / right movement. */
    if (this._input._keys.right) {
      velocity.z += acc.z * timeInSeconds;
    }
    if (this._input._keys.left) {
      velocity.z += acc.z * timeInSeconds;
    }
    if (this._input._keys.left) {
      if (controlObject.rotation.y !== -Math.PI ) {
        controlObject.rotation.y = -Math.PI ;
      }
    }
    if (this._input._keys.right) {
      if (controlObject.rotation.y !== 0) {
        controlObject.rotation.y = 0;
      }
    }

    /* Original movement. */
    // if (this._input._keys.forward) {
    //   velocity.z += acc.z * timeInSeconds;
    // }
    // if (this._input._keys.backward) {
    //   velocity.z -= acc.z * timeInSeconds;
    // }
    // if (this._input._keys.left) {
    //   _A.set(0, 1, 0);
    //   _Q.setFromAxisAngle(_A, 4.0 * Math.PI * timeInSeconds * this._acceleration.y);
    //   _R.multiply(_Q);
    // }
    // if (this._input._keys.right) {
    //   _A.set(0, 1, 0);
    //   _Q.setFromAxisAngle(_A, 4.0 * -Math.PI * timeInSeconds * this._acceleration.y);
    //   _R.multiply(_Q);
    // }

    // controlObject.quaternion.copy(_R);



    const oldPosition = new THREE.Vector3();
    oldPosition.copy(controlObject.position);

    const forward = new THREE.Vector3(0, 0, 1);
    forward.applyQuaternion(controlObject.quaternion);
    forward.normalize();

    const sideways = new THREE.Vector3(1, 0, 0);
    sideways.applyQuaternion(controlObject.quaternion);
    sideways.normalize();

    sideways.multiplyScalar(velocity.x * timeInSeconds);
    forward.multiplyScalar(velocity.z * timeInSeconds);

    controlObject.position.add(forward);
    controlObject.position.add(sideways);

    controlObject.position.x = controlObject.position.x > 0 ? Math.min(controlObject.position.x, this.pathEndX) : Math.max(controlObject.position.x, this.pathStartX);
    this._position.copy(controlObject.position);

    oldPosition.copy(controlObject.position);

    if (this._mixer) {
      this._mixer.update(timeInSeconds);
    }
  }
}


export class CharacterControllerProxy {
  constructor(animations) {
    this._animations = animations;
  }

  get animations() {
    return this._animations;
  }
};
