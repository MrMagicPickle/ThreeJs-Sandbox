import { FiniteStateMachine } from "../../Utils/FiniteStateMachine";
import { ActiveState, InactiveState } from "./ZoneStates";

export class ZoneFSM extends FiniteStateMachine {
  constructor(proxy) {
    super();
    this._proxy = proxy;
    this._Init();
  }

  _Init() {
    this._AddState('active', ActiveState);
    this._AddState('inactive', InactiveState);
  }
};
