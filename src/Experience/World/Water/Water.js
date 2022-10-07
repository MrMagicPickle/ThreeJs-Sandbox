import * as THREE from 'three';
import waterVertexShader from './shaders/vertex.glsl'
import waterFragmentShader from './shaders/fragment.glsl'


const waterGeometry = new THREE.PlaneGeometry(50, 50, 512*4, 512 * 4);
const waterMaterial = new THREE.ShaderMaterial({
  vertexShader: waterVertexShader,
  fragmentShader: waterFragmentShader,
  uniforms:
  {
      uTime: { value: 0 },

      uBigWavesElevation: { value: 0.4 },
      uBigWavesFrequency: { value: new THREE.Vector2(0.8, 0.1) },
      uBigWavesSpeed: { value: 0.75 },

      uSmallWavesElevation: { value: 0.4 },
      uSmallWavesFrequency: { value: 0.8 },
      uSmallWavesSpeed: { value: 0.2 },
      uSmallIterations: { value: 1 },

      uDepthColor: { value: new THREE.Color('#31c196') },
      uSurfaceColor: { value: new THREE.Color('#51D3AD') },
      uColorOffset: { value: 0.08 },
      uColorMultiplier: { value: 5 }
  }
});

const water = new THREE.Mesh(waterGeometry, waterMaterial)
water.rotation.x = - Math.PI * 0.5

export { water };
