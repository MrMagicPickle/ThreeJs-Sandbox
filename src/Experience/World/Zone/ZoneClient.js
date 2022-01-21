import { kickOffZoneEntityActiveState } from "../WorldUtils/ZoneEntityStates.util";
import { ZoneFSM } from "./ZoneFSM";
import { ActiveState } from "./ZoneStates";

export class ZoneClient {
  constructor(client) {
    this.spatialHashGridClient = client;
    this.entities = [];
    this.triggered = false;
    this._stateMachine = new ZoneFSM(this);
    this._stateMachine.SetState('inactive');
  }

  AddEntity(ent) {
    this.entities.push(ent);
  }

  Update(timeInSeconds) {
    // this._stateMachine.Update(timeInSeconds, undefined);
  }

  Trigger() {
    // console.log('trigger? ', this._stateMachine._currentState);
    if (this._stateMachine._currentState.Name === 'active') {
      return;
    }

    this._stateMachine.SetState('active');
    this.entities.forEach(ent => {
      if (!ent.isActiveEntity) {
        kickOffZoneEntityActiveState(ent);
        ent.isActiveEntity = true;
      }
    });
  }
}
