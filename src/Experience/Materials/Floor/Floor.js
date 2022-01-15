import * as THREE from 'three'

import shaderFragment from './fragment.glsl'
import shaderVertex from './vertex.glsl'

export default function()
{
    const uniforms = {
        tBackground: { value: null }
    }

    const material = new THREE.ShaderMaterial({
        wireframe: false,
        transparent: false,
        uniforms,
        vertexShader: shaderVertex,
        fragmentShader: shaderFragment
    })

    return material
}
