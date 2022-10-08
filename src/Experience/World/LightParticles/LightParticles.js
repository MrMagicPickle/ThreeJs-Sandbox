import * as THREE from 'three';
import firefliesVertexShader from './shaders/vertex.glsl'
import firefliesFragmentShader from './shaders/fragment.glsl'

/**
 * Fireflies
 */
// Geometry
const firefliesGeometry = new THREE.BufferGeometry()
const firefliesCount = 1000
const positionArray = new Float32Array(firefliesCount * 3)
const scaleArray = new Float32Array(firefliesCount)

for(let i = 0; i < firefliesCount; i++)
{
    positionArray[i * 3 + 0] = (Math.random() - 0.5) * 50
    positionArray[i * 3 + 1] = Math.random() * 6
    positionArray[i * 3 + 2] = (Math.random() - 0.5) * 50

    scaleArray[i] = Math.random() * 4
}

firefliesGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3))
firefliesGeometry.setAttribute('aScale', new THREE.BufferAttribute(scaleArray, 1))

// Material
const firefliesMaterial = new THREE.ShaderMaterial({
    uniforms:
    {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        uSize: { value: 100 }
    },
    vertexShader: firefliesVertexShader,
    fragmentShader: firefliesFragmentShader,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
});
const fireflies = new THREE.Points(firefliesGeometry, firefliesMaterial);
export { fireflies };