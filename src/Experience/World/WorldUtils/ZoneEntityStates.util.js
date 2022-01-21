import { Tree } from "../Tree/Tree";

export function kickOffZoneEntityActiveState(ent) {
  switch(ent.constructor) {
    case Tree:
      ent._stateMachine.SetState('grow');
      break;
    default:
      console.log('Unknown Zone Entity Instance: Unable to kick off entity active state');
  }
}
