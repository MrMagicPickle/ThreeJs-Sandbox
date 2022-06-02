export class GsapZone {
  constructor(foxController, triggerPosZ, blockContainer) {
    this.triggerPosZ = triggerPosZ;
    this.blockContainer = blockContainer;
    this.foxController = foxController;
  }

  update() {
    if (this.foxController.Position.z >= this.triggerPosZ) {
      this.activate();
    }
  }

  activate() {
    if (!this.blockContainer.isActive) {
      this.blockContainer.activate();
    }
  }
}