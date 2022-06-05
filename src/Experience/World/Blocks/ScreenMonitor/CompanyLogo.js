import * as THREE from 'three';
import Experience from '../../../Experience';
import { CompanyLogoMaterial, CompanyLogoPlaneGeometry } from '../../../Utils/Reusables';

export class CompanyLogo {
  constructor(materialName, name='defaultCompanyName') {
    this.materialName = materialName;
    this.name = name;
    this.init();
  }

  init() {
    this.experience = new Experience();
    this.resources = this.experience.resources;
    this.model = new THREE.Mesh(
      CompanyLogoPlaneGeometry,
      CompanyLogoMaterial,
    );

    this.resources.on('ready', () => {
      const materialTexture = this.resources.items[this.materialName];
      materialTexture.encoding = THREE.sRGBEncoding;
      this.model.material = new THREE.MeshBasicMaterial({
        map: materialTexture,
      });
    });

    // this.model.rotation.y = -Math.PI * 0.5;
  }
}