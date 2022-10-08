uniform float uTime;
uniform float uPixelRatio;
uniform float uSize;

attribute float aScale;
float random(vec2 co){
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    // modelPosition.y += sin(uTime + modelPosition.x * 100.0) * aScale * 0.2;

    float heightCap = 20.0;
    modelPosition.y += uTime * aScale / 1.5;
    modelPosition.y = mod(modelPosition.y, heightCap);

    /* Adjust the xz positions of the particles to move around a bit.*/
    modelPosition.x += sin(uTime * 2.0) * aScale / 1.5 * 0.25;
    modelPosition.z += sin(uTime * 2.0) * aScale / 1.5 * 0.25;

    /* Playing with random values but it doesnt do much. */
    // float startX = modelPosition.x + sin(uTime * 2.0) * aScale / 1.5;
    // float endX = modelPosition.x;
    // modelPosition.x = random(vec2(endX, startX)) * 0.1;

    // float startz = modelPosition.z + sin(uTime * 2.0) * aScale / 1.5;
    // float endz = modelPosition.z;
    // modelPosition.z = random(vec2(endz, startX)) * 0.1;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;

    gl_PointSize = uSize * aScale * uPixelRatio;
    gl_PointSize *= (1.0 / - viewPosition.z);
}