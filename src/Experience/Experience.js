import * as THREE from 'three'

import Debug from './Utils/Debug.js'
import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import World from './World/World.js'
import Resources from './Utils/Resources.js'

import sources from './sources.js'
import { ThirdPersonCamera } from './ThirdPersonCamera.js'
import { Raycaster, Vector2 } from 'three'

let instance = null

export default class Experience
{
    constructor(_canvas)
    {
        // Singleton
        if(instance)
        {
            return instance
        }
        instance = this

        // Global access
        window.experience = this

        // Options
        this.canvas = _canvas

        // Setup
        this.interactables = [];
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.resources = new Resources(sources)
        this.camera = new ThirdPersonCamera();
        this.renderer = new Renderer()
        this.world = new World()

        /* Raycaster */
        this.raycaster = new Raycaster();
        this.currentIntersect;

        // Resize event
        this.sizes.on('resize', () =>
        {
            this.resize()
        })

        // Time tick event
        this.time.on('tick', () =>
        {
            this.update()
        })

        /* Mouse */
        window.mouse = new Vector2();
        window.addEventListener('mousemove', (event) => {
            window.mouse.x = event.clientX / this.sizes.width * 2 - 1
            window.mouse.y = - (event.clientY / this.sizes.height) * 2 + 1
        });
    }

    resize()
    {
        if (this.camera) {
            this.camera._camera.resize();
        }

        this.renderer.resize()
    }

    update()
    {
        this.world.update()
        this.camera.Update(this.time.delta);

        /* Handle mouse intersect with Raycaster */
        this.raycaster.setFromCamera(window.mouse, this.camera._camera.instance);
        const intersects = this.raycaster.intersectObjects(this.interactables);
        if (intersects.length > 0) {
          this.currentIntersect = intersects[0];
        } else {
          this.currentIntersect = undefined;
        }

        this.renderer.update()
    }

    destroy()
    {
        this.sizes.off('resize')
        this.time.off('tick')
        // Traverse the whole scene
        this.scene.traverse((child) =>
        {
            // Test if it's a mesh
            if(child instanceof THREE.Mesh)
            {
                child.geometry.dispose()

                // Loop through the material properties
                for(const key in child.material)
                {
                    const value = child.material[key]

                    // Test if there is a dispose function
                    if(value && typeof value.dispose === 'function')
                    {
                        value.dispose()
                    }
                }
            }
        })

        this.renderer.instance.dispose()

        if(this.debug.active)
            this.debug.ui.destroy()
    }
}