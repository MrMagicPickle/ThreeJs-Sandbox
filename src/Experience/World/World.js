import Experience from '../Experience.js'
import { CharacterController } from './Character/CharacterController.js'
import Environment from './Environment.js'
import Floor from './Floor.js'
import Fox from './Fox.js'
import { SpatialHash_Slow } from './SpatialHashGrid.js'
import { Tree } from './Tree/Tree.js'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time;
        this._controls = new CharacterController({});
        this.tree = new Tree();
        const hashGridBounds = [[-10, -10], [10, 10]];
        const hashGridDimensions = [5, 5];
        this.spatialHashGrid = new SpatialHash_Slow(hashGridBounds, hashGridDimensions);
        this.treeClient = this.spatialHashGrid.NewClient([this.tree.position.x, this.tree.position.z], [2, 2]);
        console.log(this.treeClient ,'<< tree client');
        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            this.floor = new Floor()
            // this.fox = new Fox()
            this.environment = new Environment()
            this._controls.LoadResources();
            this.foxClient = this.spatialHashGrid.NewClient([this._controls.Position.x, this._controls.Position.z], [5, 5]);
            this.experience.camera.setTarget(this._controls);
        });
    }

    update()
    {
        // if(this.fox)
        //     this.fox.update()
        if (this._controls) {
            this._controls.Update(this.time.delta * 0.001);
            if (this.foxClient) {
                this.foxClient.position = [this._controls.Position.x, this._controls.Position.z];
                this.spatialHashGrid.UpdateClient(this.foxClient);
            }
            const clients = this.spatialHashGrid.FindNear([this._controls.Position.x, this._controls.Position.z], [5, 5]);
            console.log(clients, '<< clients');
        }
        if (this.tree) {
            this.tree.Update(this.time.delta * 0.001);
        }
    }
}