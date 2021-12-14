import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Floor
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.setGeometry()
        this.setTextures()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry()
    {
        // this.geometry = new THREE.CircleGeometry(5, 64)
        this.geometry = new THREE.PlaneGeometry(100, 100)
        // this.geometry = new THREE.BoxGeometry(100, 100, 0.00001);

    }

    setTextures()
    {
        this.textures = {}

        this.textures.color = this.resources.items.grassColorTexture
        this.textures.color.encoding = THREE.sRGBEncoding
        // this.textures.color.repeat.set(1.5, 1.5)
        this.textures.color.repeat.set(10,10)
        this.textures.color.wrapS = THREE.RepeatWrapping
        this.textures.color.wrapT = THREE.RepeatWrapping

        // this.textures.normal = this.resources.items.grassNormalTexture
        // this.textures.normal.repeat.set(1.5, 1.5)
        // this.textures.normal.repeat.set(10, 10)
        // this.textures.normal.wrapS = THREE.RepeatWrapping
        // this.textures.normal.wrapT = THREE.RepeatWrapping

        // this.textures.displacement = this.resources.items.grassDisplacementTexture
        // // this.textures.displacement.repeat.set(1.5, 1.5)
        // this.textures.displacement.repeat.set(10, 10)
        // this.textures.displacement.wrapS = THREE.RepeatWrapping
        // this.textures.displacement.wrapT = THREE.RepeatWrapping
    }

    setMaterial()
    {
        this.material = new THREE.MeshStandardMaterial({
            map: this.textures.color,
            normalMap: this.textures.normal,
            shadowSide: THREE.DoubleSide,
        })
        // this.material = new THREE.MeshStandardMaterial({
        //     color: 0x2bad52
        // });
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.rotation.x = - Math.PI * 0.5
        this.mesh.receiveShadow = true
        this.scene.add(this.mesh)
    }
}