import Experience from "./Experience";

/* Deprecated - use makeInteractable function when possible. */
export class Interactable {
  constructor(meshObject) {
    this.meshObject = meshObject;
    this.experience = new Experience();
    this.experience.interactables.push(this.meshObject);
  }
}

/* We can use this function instead of instantiating a new class object. */
export const makeInteractable = (meshObject) => {
  window.experience.interactables.push(meshObject);
}
