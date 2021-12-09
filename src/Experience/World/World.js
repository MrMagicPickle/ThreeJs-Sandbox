import Experience from '../Experience.js'
import { CharacterController } from './Character/CharacterController.js'
import Environment from './Environment.js'
import Floor from './Floor.js'
import Fox from './Fox.js'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time;
        this._controls = new CharacterController({});
        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            this.floor = new Floor()
            // this.fox = new Fox()
            this.environment = new Environment()
            this._controls.LoadResources();
            this.experience.camera.setTarget(this._controls);
        })
    }

    update()
    {
        if(this.fox)
            this.fox.update()
        if (this._controls) {
            this._controls.Update(this.time.delta * 0.001);
        }
    }
}