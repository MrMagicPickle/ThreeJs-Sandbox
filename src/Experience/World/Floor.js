import * as THREE from 'three'
import { MeshBasicMaterial, MeshStandardMaterial, PlaneGeometry } from 'three';
import Experience from '../Experience.js'
import FloorMaterial from '../Materials/Floor/Floor';

export default class Floor
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Colors
        this.colors = {}
        // this.colors.topLeft = '#f5883c'
        // this.colors.topRight = '#ff9043'

        // this.colors.bottomLeft = '#f5aa58'
        // this.colors.bottomRight = '#fccf92'

        this.colors.topLeft = '#17C45C'
        this.colors.topRight = '#1AD665'

        this.colors.bottomLeft = '#2CD692'
        this.colors.bottomRight = '#36F3A8'


        this.setGeometry()
        this.setTextures()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry()
    {
        // this.geometry = new THREE.CircleGeometry(5, 64)
        // this.geometry = new THREE.PlaneGeometry(100, 100)
        // this.geometry = new THREE.BoxGeometry(100, 100, 0.00001);

        // Bruno
        this.geometry = new THREE.PlaneBufferGeometry(2, 2, 10, 10);

    }

    setTextures()
    {
        // this.textures = {}

        // this.textures.color = this.resources.items.grassColorTexture
        // this.textures.color.encoding = THREE.sRGBEncoding
        // // this.textures.color.repeat.set(1.5, 1.5)
        // this.textures.color.repeat.set(10,10)
        // this.textures.color.wrapS = THREE.RepeatWrapping
        // this.textures.color.wrapT = THREE.RepeatWrapping

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
        this.material = new FloorMaterial();
        this.updateMaterial = () =>
        {
            const topLeft = new THREE.Color(this.colors.topLeft)
            const topRight = new THREE.Color(this.colors.topRight)
            const bottomRight = new THREE.Color(this.colors.bottomRight)
            const bottomLeft = new THREE.Color(this.colors.bottomLeft)

            const data = new Uint8Array([
                Math.round(bottomLeft.r * 255), Math.round(bottomLeft.g * 255), Math.round(bottomLeft.b * 255),
                Math.round(bottomRight.r * 255), Math.round(bottomRight.g * 255), Math.round(bottomRight.b * 255),
                Math.round(topLeft.r * 255), Math.round(topLeft.g * 255), Math.round(topLeft.b * 255),
                Math.round(topRight.r * 255), Math.round(topRight.g * 255), Math.round(topRight.b * 255)
            ])

            this.backgroundTexture = new THREE.DataTexture(data, 2, 2, THREE.RGBFormat)
            this.backgroundTexture.magFilter = THREE.LinearFilter
            this.backgroundTexture.needsUpdate = true

            this.material.uniforms.tBackground.value = this.backgroundTexture
        }

        this.updateMaterial()

        // this.material = new THREE.MeshStandardMaterial({
        //     map: this.textures.color,
        //     normalMap: this.textures.normal,
        //     shadowSide: THREE.DoubleSide,
        // })
    }

    setMesh()
    {
        // this.mesh = new THREE.Mesh(this.geometry, this.material)
        // this.mesh.rotation.x = - Math.PI * 0.5
        // this.mesh.receiveShadow = true
        // this.scene.add(this.mesh)
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.frustumCulled = false
        this.mesh.matrixAutoUpdate = false
        this.mesh.updateMatrix()
        // this.mesh.receiveShadow = true
        this.scene.add(this.mesh)
    }
}