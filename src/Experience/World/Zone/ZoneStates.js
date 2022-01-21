import { State } from "../../Utils/State";

export class ActiveState extends State {
  constructor(parent) {
    super(parent);
  }

  get Name() {
    return 'active';
  }

  Enter(prevState) {

  }

  Exit() {
  }

  Update(timeElapsed, input) {
    // We can temporarily just update their isActiveEntity flag in the ZoneClient itself.
    // We will reserve this space for Continuous updates if we need to.

    // this._parent._proxy.entitities.forEach(ent => {
    //   ent.isActiveEntity = true;
    // });
  }
}

export class InactiveState extends State {
  constructor(parent) {
    super(parent);
  }

  get Name() {
    return 'inactive';
  }

  Enter(prevState) {
  }

  Exit() {
  }

  Update(timeElapsed, input) {
    console.log('is inactive');
  }
}
