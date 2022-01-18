import { FiniteStateMachine } from "../../Utils/FiniteStateMachine";
import { IdleState, GrowState, ShrinkState } from "./TreeStates";

export class TreeFSM extends FiniteStateMachine {
  constructor(proxy) {
    super();
    this._proxy = proxy;
    this._Init();
  }

  _Init() {
    this._AddState('idle', IdleState);
    this._AddState('shrink', ShrinkState);
    this._AddState('grow', GrowState);
  }
};
