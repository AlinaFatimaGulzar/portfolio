import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const PARTICLE_COUNT = typeof window !== "undefined" && window.innerWidth < 768 ? 300 : 1200;

export default function ParticleField({ scrollProgress = 0 }: { scrollProgress?: number }) {
  const ref = useRef<THREE.Points>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const seeds = useMemo(() => new Float32Array(PARTICLE_COUNT * 3), []);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const col = new Float32Array(PARTICLE_COUNT * 3);
    const mint = new THREE.Color("#56E8C5");
    const indigo = new THREE.Color("#7C8CFF");
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 40;
      pos[i3 + 1] = (Math.random() - 0.5) * 120;
      pos[i3 + 2] = (Math.random() - 0.5) * 20;
      seeds[i3] = Math.random() * 100;
      seeds[i3 + 1] = Math.random() * 100;
      seeds[i3 + 2] = Math.random() * 100;
      const t = (pos[i3 + 1] + 60) / 120;
      const c = mint.clone().lerp(indigo, t);
      col[i3] = c.r;
      col[i3 + 1] = c.g;
      col[i3 + 2] = c.b;
    }
    return [pos, col];
  }, []);

  useFrame(({ clock, pointer }) => {
    if (!ref.current) return;
    const pos = ref.current.geometry.attributes.position.array as Float32Array;
    const time = clock.elapsedTime;
    const mouseWorldX = pointer.x * 12;
    const mouseWorldY = pointer.y * 8;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      const seed = seeds[i3];
      const seed1 = seeds[i3 + 1];
      const seed2 = seeds[i3 + 2];

      pos[i3] += Math.sin(time * 0.3 + seed) * 0.004;
      pos[i3 + 1] += Math.cos(time * 0.25 + seed1) * 0.004;
      pos[i3 + 2] += Math.sin(time * 0.2 + seed2) * 0.003;

      const dx = pos[i3] - mouseWorldX;
      const dy = pos[i3 + 1] - mouseWorldY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 4 && dist > 0.01) {
        const force = (4 - dist) / 4 * 0.08;
        pos[i3] += (dx / dist) * force;
        pos[i3 + 1] += (dy / dist) * force;
      }

      const bounds = 22;
      if (pos[i3] > bounds) pos[i3] = -bounds;
      if (pos[i3] < -bounds) pos[i3] = bounds;
      if (pos[i3 + 1] > 62) pos[i3 + 1] = -62;
      if (pos[i3 + 1] < -62) pos[i3 + 1] = 62;
    }

    ref.current.geometry.attributes.position.needsUpdate = true;

    const sizes = ref.current.geometry.attributes.size;
    if (sizes) {
      const sz = sizes.array as Float32Array;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const depth = pos[i * 3 + 1];
        const band = scrollProgress * 120 - 60;
        const dist = Math.abs(depth - band);
        sz[i] = dist < 8 ? 2.5 : 1.2;
      }
      sizes.needsUpdate = true;
    }
  });

  const sizeAttr = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT);
    arr.fill(1.5);
    return new THREE.BufferAttribute(arr, 1);
  }, []);

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizeAttr.array, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.35}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}
