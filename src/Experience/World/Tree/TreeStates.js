import { State } from "../../Utils/State";

export class GrowState extends State {
  constructor(parent) {
    super(parent);
    this.growFactor = 0.01;
  }

  get Name() {
    return 'grow';
  }

  Enter(prevState) {

  }

  Exit() {
  }

  Update(timeElapsed, input) {
    const { model } = this._parent._proxy;
    if (model.scale.y < 1) {
      this._parent._proxy.model.scale.y += (this.growFactor * timeElapsed * 100);
      return;
    }
    if (model.scale.x < 1) {
      this._parent._proxy.model.scale.x += (this.growFactor * timeElapsed * 100);
    }
    if (model.scale.z < 1) {
      this._parent._proxy.model.scale.z += (this.growFactor * timeElapsed * 100);
    }
  }
}

export class ShrinkState extends State {
  constructor(parent) {
    super(parent);
    this.shrinkFactor = 0.01;
  }

  get Name() {
    return 'shrink';
  }

  Enter(prevState) {
  }

  Exit() {
  }

  Update(timeElapsed, input) {
    const { model } = this._parent._proxy;
    let isShrinkingWidth = false;
    if (model.scale.x > 0.1) {
      this._parent._proxy.model.scale.x -= (this.shrinkFactor * timeElapsed * 100);
      isShrinkingWidth = true;
    }
    if (model.scale.z > 0.1) {
      this._parent._proxy.model.scale.z -= (this.shrinkFactor * timeElapsed * 100);
      isShrinkingWidth = true;
    }

    if (isShrinkingWidth) {
      return;
    }

    if (model.scale.y > 0) {
      this._parent._proxy.model.scale.y -= (this.shrinkFactor * timeElapsed * 100);
    }
  }
}

export class IdleState extends State {
  constructor(parent) {
    super(parent);
  }

  get Name() {
    return 'idle';
  }

  Enter(prevState) {
  }

  Exit() {
  }

  Update(timeElapsed, input) {
    // console.log('idle update?');
  }
}
