import { PlaneGeometry, Vector3 } from 'three';
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
import { companiesIsland, introIsland, linkIsland, reviewIsland, sampleBlocksList } from './Blocks/Blocks.js';
import { BlockContainer } from './Blocks/BlockContainer.js';
import { PlatformPath } from './Path/Path.js'
import { GsapZone } from './Zone/GsapZone.js';
import { ScreenMonitor } from './Blocks/ScreenMonitor/ScreenMonitor.js';
import { ReviewScreen } from './Blocks/ReviewIsland/ReviewScreen.js';
import { water } from './Water/Water.js';
// import { CompanyLogoPlaneGeometry } from '../Experience/Utils/Reusables.js';

export default class World {
  constructor()
  {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.time = this.experience.time;
    this.zoneClients = [];
    this.initSpatialHashGrid();
    this.clock = new THREE.Clock();

    /* Init path */
    this.platformPath = new PlatformPath();

    this._controls = new CharacterController({
      pathStartX: this.platformPath.pathStartX,
      pathEndX: this.platformPath.pathEndX,
    });

    /* Init gsap block */
    this.blockContainer = new BlockContainer(sampleBlocksList);
    this.initIntroIsland();
    this.initCompaniesIsland();
    this.initReviewIsland();
    this.initLinkIsland();

    /* Init room */
    this.roomModel = null;

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

      /* Load room scene from blender */
      // const bakedTexture = this.experience.resources.items.roomTexture;
      // bakedTexture.flipY = false;
      // bakedTexture.encoding = THREE.sRGBEncoding;


      this.initRoom();

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
    if (this.roomModel) {
      this.roomModel.rotation.y += 0.005;
    }
    if (this.roomModel2) {
      this.roomModel2.rotation.y += 0.005;
    }
    if (this.roomModel3) {
      this.roomModel3.rotation.y += 0.005;
    }
    if (this.roomModel4) {
      this.roomModel4.rotation.y += 0.005;
    }
    if (this.water) {
      const elapsedTime = this.clock.getElapsedTime();
      this.water.material.uniforms.uTime.value = elapsedTime;
    }
    /* Update GSAP zone */
    this.introIslandTriggerZone.update();
    this.companiesIslandTriggerZone.update();
    // this.reviewIslandTriggerZone.update();
    this.linkIslandTriggerZone.update();

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
    // new TechStackLogs(new Vector3(10, 0, 0), 5);
  }

  initIntroIsland() {
    this.introIsland = new BlockContainer(introIsland());
    const zPos = 30;
    this.introIslandTriggerZone = new GsapZone(this._controls, zPos, this.introIsland);
  }

  initCompaniesIsland() {
    this.companiesIsland = new BlockContainer(companiesIsland());
    const zPos = 75;
    this.companiesIslandTriggerZone = new GsapZone(this._controls, zPos, this.companiesIsland);
  }

  initReviewIsland() {
    // this.reviewIsland = new BlockContainer(reviewIsland());
    // const zPos = 115;
    // this.reviewIslandTriggerZone = new GsapZone(
    //   this._controls,
    //   zPos,
    //   this.reviewIsland
    // );
    this.reviewScreen = new ReviewScreen(['howardReview', 'jasonReview'], new Vector3(1, 5, 130), new Vector3(1, 5, 130));
  }

  initLinkIsland() {
    this.linkIsland = new BlockContainer(linkIsland());
    const zPos = 155;
    this.linkIslandTriggerZone = new GsapZone(
      this._controls,
      zPos,
      this.linkIsland,
    );
  }

  initRoom() {
    this.roomModel = this.experience.resources.items.roomModel.scene;
    this.roomModel.position.set(5, 0, -10);
    this.roomModel.rotation.y = - Math.PI * 1.25;
    const bakedTexture = this.experience.resources.items.roomTexture;
    bakedTexture.flipY = false;
    bakedTexture.encoding = THREE.sRGBEncoding;

    const roomTexture = new THREE.MeshBasicMaterial({ map: bakedTexture });


    this.roomModel.traverse((child) => {
      child.material = roomTexture;
      /* Add logo screen for main monitor */
      if (child.name === 'mainMonitor') {
        const seekLogo = this.experience.resources.items.seekLogo;
        seekLogo.encoding = THREE.sRGBEncoding;
        const seekLogoTexture = new THREE.MeshBasicMaterial({ map: seekLogo });
        const seekLogoPlane = new THREE.PlaneGeometry(5, 2.5);
        const seekLogoMesh = new THREE.Mesh(
          seekLogoPlane,
          seekLogoTexture,
        );
        const childPos = new Vector3();
        child.getWorldPosition(childPos);
        seekLogoMesh.position.set(childPos.x - 0.2 , childPos.y, childPos.z - 0.15);
        seekLogoMesh.rotation.set(child.rotation.x, child.rotation.y + this.roomModel.rotation.y, child.rotation.z);
        // this.scene.add(seekLogoMesh);
      } else if (child.name.includes('monitor')) {
        // const seekLogo = this.experience.resources.items.seekLogo;
        // seekLogo.encoding = THREE.sRGBEncoding;
        // const seekLogoTexture = new THREE.MeshBasicMaterial({ map: seekLogo });
        // const seekLogoPlane = new THREE.PlaneGeometry(5, 2.5);
        // const seekLogoMesh = new THREE.Mesh(
        //   seekLogoPlane,
        //   seekLogoTexture,
        // );
        // const childPos = new Vector3();
        // child.getWorldPosition(childPos);
        // seekLogoMesh.position.set(childPos.x - 0.2 , childPos.y, childPos.z - 0.15);
        // seekLogoMesh.rotation.set(child.rotation.x, child.rotation.y + this.roomModel.rotation.y, child.rotation.z);
        // this.scene.add(seekLogoMesh);
      }
    });
    const seekLogo = this.experience.resources.items.seekLogo;
    // seekLogo.flipY = false;
    // seekLogo.rotation = -Math.PI;
    seekLogo.wrapS = THREE.RepeatWrapping;
    seekLogo.repeat.x = - 1;
    seekLogo.encoding = THREE.sRGBEncoding;
    const seekLogoTexture = new THREE.MeshBasicMaterial({ map: seekLogo });
    // const seekLogoPlane = new THREE.PlaneGeometry(5, 2.5);
    // const seekLogoMesh = new THREE.Mesh(
    //   seekLogoPlane,
    //   seekLogoTexture,
    // );
    // const mainMonitorScreen = this.roomModel.children.find(x => x.name === 'mainMonitorScreen');
    // mainMonitorScreen.material = seekLogoTexture;
    // console.log(mainMonitorScreen, '< sc');
    const scaleFactor = 0.3;
    this.roomModel.scale.set(scaleFactor, scaleFactor, scaleFactor);
    this.scene.add(this.roomModel);
    // console.log(this.roomModel, '<< roomModel');

    const roomModel2 = this.experience.resources.items.roomModel2.scene;
    roomModel2.position.set(5, 0, -10);
    roomModel2.rotation.y = - Math.PI * 1.25;
    const bakedTexture2 = this.experience.resources.items.roomTexture2;
    bakedTexture2.flipY = false;
    bakedTexture2.encoding = THREE.sRGBEncoding;
    const roomTexture2 = new THREE.MeshBasicMaterial({ map: bakedTexture2 });
    roomModel2.traverse((child) => {
      child.material = roomTexture2;
    });

    roomModel2.scale.set(scaleFactor, scaleFactor, scaleFactor);
    this.roomModel2 = roomModel2;
    this.scene.add(roomModel2);

    const roomModel3 = this.experience.resources.items.roomModel3.scene;
    roomModel3.position.set(5, 0, -10);
    roomModel3.rotation.y = - Math.PI * 1.25;
    const bakedTexture3 = this.experience.resources.items.roomTexture3;
    bakedTexture3.flipY = false;
    bakedTexture3.encoding = THREE.sRGBEncoding;
    const roomTexture3 = new THREE.MeshBasicMaterial({ map: bakedTexture3 });
    roomModel3.traverse((child) => {
      child.material = roomTexture3;
    });

    roomModel3.scale.set(scaleFactor, scaleFactor, scaleFactor);
    this.roomModel3 = roomModel3;
    this.scene.add(roomModel3);

    const roomModel4 = this.experience.resources.items.roomModel4.scene;
    roomModel4.position.set(5, 0, -10);
    roomModel4.rotation.y = - Math.PI * 1.25;
    const bakedTexture4 = this.experience.resources.items.roomTexture4;
    bakedTexture4.flipY = false;
    bakedTexture4.encoding = THREE.sRGBEncoding;
    const roomTexture4 = new THREE.MeshBasicMaterial({ map: bakedTexture4 });
    roomModel4.traverse((child) => {
      child.material = roomTexture4;
    });

    roomModel4.scale.set(scaleFactor, scaleFactor, scaleFactor);
    this.roomModel4 = roomModel4;
    this.scene.add(roomModel4);


    // const planeGeometry = new THREE.PlaneGeometry(50, 50);
    // const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x51D3AD });
    // const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    // // planeMesh.position.y = -2;
    // planeMesh.rotation.x = -Math.PI * 0.5;
    // this.scene.add(planeMesh);
    this.water = water;
    this.scene.add(water);
  }


}