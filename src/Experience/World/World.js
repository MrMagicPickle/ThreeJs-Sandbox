import { Vector3 } from 'three';
import Experience from '../Experience.js'
import { CharacterController } from './Character/CharacterController.js'
import Environment from './Environment.js'
import Floor from './Floor.js'
import { SpatialHash_Slow } from './SpatialHashGrid.js'
import { Tree } from './Tree/Tree.js'
import { ZoneClient } from './Zone/ZoneClient.js'
import * as THREE from 'three';
import { SingleLogChunk, TechStackLogs } from './Career/TechStackLogs/TechStackLogs.js'
import { Block } from './Blocks/SampleBlock.js'
import { introIsland, sampleBlocksList } from './Blocks/Blocks.js';
import { BlockContainer } from './Blocks/BlockContainer.js';
import { PlatformPath } from './Path/Path.js'
import { GsapZone } from './Zone/GsapZone.js';

export default class World {
  constructor()
  {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.time = this.experience.time;
    this.zoneClients = [];
    this.initSpatialHashGrid();

    /* Init path */
    this.platformPath = new PlatformPath();

    this._controls = new CharacterController({
      pathStartX: this.platformPath.pathStartX,
      pathEndX: this.platformPath.pathEndX,
    });

    /* Init gsap block */
    this.blockContainer = new BlockContainer(sampleBlocksList);
    this.initIntroIsland();

    window.blocks = this.blockContainer;


    /* Init tree */
    this.trees = [];
    this.initTrees();

    /* Init career section */
    this.initCareerSection();

    // Wait for resources
    this.resources.on('ready', () =>
    {
      // Setup
      this.floor = new Floor()
      this.environment = new Environment()
      this._controls.LoadResources();
      this.foxClient = this.spatialHashGrid.NewClient([this._controls.Position.x, this._controls.Position.z], [5, 5]);
      this.experience.camera.setTarget(this._controls);

      /* Test text plane on wall */
      const textPlaneTexture = this.experience.resources.items.careerText1;
      const textPlaneGeometry = new THREE.PlaneGeometry(10, 5);
      const textPlaneMaterial = new THREE.MeshBasicMaterial({ map: textPlaneTexture, alphaMap: textPlaneTexture, transparent: true, color: 0x0000ff });
      const textPlane = new THREE.Mesh(textPlaneGeometry, textPlaneMaterial);

      textPlane.position.set(0, 5, -30);
      this.scene.add(textPlane);

      /* Test text plane on floor */
      // const textPlaneTexture = this.experience.resources.items.careerText1;
      // const textPlaneGeometry = new THREE.PlaneGeometry(10, 5);
      // const textPlaneMaterial = new THREE.MeshBasicMaterial({ map: textPlaneTexture, alphaMap: textPlaneTexture, transparent: true, color: 0x0000ff });
      const floorPlane = new THREE.Mesh(textPlaneGeometry, textPlaneMaterial);
      floorPlane.position.set(0, 0, -30);
      floorPlane.rotation.x = - Math.PI * 0.25;
      this.scene.add(floorPlane);
    });
  }

  initSpatialHashGrid() {
    const hashGridBounds = [[-10, -10], [10, 10]];
    const hashGridDimensions = [5, 5];
    this.spatialHashGrid = new SpatialHash_Slow(hashGridBounds, hashGridDimensions);
  }

  update()
  {
    if (this._controls) {
      this._controls.Update(this.time.delta * 0.001);
      if (this.foxClient) {
        this.foxClient.position = [this._controls.Position.x, this._controls.Position.z];
        this.spatialHashGrid.UpdateClient(this.foxClient);
      }
      this.triggerNearbyZones();
    }

    /* Update GSAP zone */
    this.introIslandTriggerZone.update();

    /* Update trees */
    for (let i = 0; i < this.trees.length; i++) {
      const tree = this.trees[i];
      tree.Update(this.time.delta * 0.001);
    }
  }

  triggerNearbyZones() {
    const clients = [...this.spatialHashGrid.FindNear([this._controls.Position.x, this._controls.Position.z], [5, 5])];
    const nearbyZoneClients = this.zoneClients.filter(zoneClient => clients.map(client => client.id).includes(zoneClient.spatialHashGridClient.id));
    nearbyZoneClients.forEach(zoneClient => {
      zoneClient.Trigger();
    });
  }

  initTrees() {
    const treeZoneAttr = {
      position: {
        x: 10,
        z: 10,
      },
      dimensions: {
        w: 5,
        h: 5,
      }
    };
    this.trees = [
      new Tree(new Vector3(10, 0, 10)),
      new Tree(new Vector3(13, 0, 13)),
    ];
    const treeZoneClient = new ZoneClient(
      this.spatialHashGrid.NewClient(
        [treeZoneAttr.position.x, treeZoneAttr.position.z],
        [treeZoneAttr.dimensions.w, treeZoneAttr.dimensions.h]
      )
    );

    this.trees.forEach(tree => {
      treeZoneClient.AddEntity(tree);
    });

    this.zoneClients.push(treeZoneClient);
  }

  initCareerSection() {
    // new SingleLogChunk(new Vector3(10, 0, 0));
    new TechStackLogs(new Vector3(10, 0, 0), 5);
  }

  initIntroIsland() {
    this.introIsland = new BlockContainer(introIsland());
    const zPos = 30;
    this.introIslandTriggerZone = new GsapZone(this._controls, zPos, this.introIsland);
  }
}