import { Vector2 } from "three";
import EventEmitter from "./EventEmitter";

export default class Mouse extends EventEmitter {
  constructor(sizes) {
    super();
    this._mouse = new Vector2();
    window.addEventListener('mousemove', (event) => {
      this._mouse.x = event.clientX / sizes.width * 2 - 1
      this._mouse.y = - (event.clientY / sizes.height) * 2 + 1
    });

    window.addEventListener('click', () => {
      this.trigger('click');
    });
  }
}