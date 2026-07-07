export const vertexShader = `
varying vec2 vUv;
uniform float uTime;
uniform float uScrollProgress;

void main() {
  vUv = uv;
  vec3 pos = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

export const fragmentShader = `
uniform float uTime;
uniform float uScrollProgress;
uniform vec3 uColor1;
uniform vec3 uColor2;

varying vec2 vUv;

void main() {
  float flow = mod(vUv.y * 2.0 + uTime * 0.15, 1.0);
  vec3 color = mix(uColor1, uColor2, flow);
  float pulse = 0.15 + 0.35 * smoothstep(0.35, 0.65, abs(uScrollProgress - vUv.y));
  gl_FragColor = vec4(color, pulse);
}
`;
