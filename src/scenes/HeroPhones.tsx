import { useFrame } from "@react-three/fiber";
import { Float, RoundedBox, Environment } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function PhoneScreen({ accent, title }: { accent: string; title: string }) {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d");
    if (!ctx) return new THREE.CanvasTexture(canvas);

    const bg = ctx.createLinearGradient(0, 0, 512, 1024);
    bg.addColorStop(0, "#12141b");
    bg.addColorStop(0.46, accent);
    bg.addColorStop(1, "#07080c");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 512, 1024);

    ctx.fillStyle = "rgba(255,255,255,0.18)";
    ctx.fillRect(54, 76, 140, 20);
    ctx.fillStyle = "rgba(255,255,255,0.68)";
    ctx.font = "700 44px Inter, sans-serif";
    ctx.fillText(title, 54, 176);
    ctx.fillStyle = "rgba(255,255,255,0.34)";
    ctx.fillRect(54, 216, 316, 18);
    ctx.fillRect(54, 252, 244, 14);

    for (let i = 0; i < 4; i++) {
      const y = 370 + i * 118;
      ctx.fillStyle = "rgba(255,255,255,0.13)";
      roundRect(ctx, 54, y, 404, 84, 28);
      ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,0.58)";
      roundRect(ctx, 86, y + 25, 142 + i * 26, 13, 8);
      ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,0.22)";
      roundRect(ctx, 86, y + 52, 236, 10, 8);
      ctx.fill();
    }

    ctx.fillStyle = "rgba(86,232,197,0.84)";
    roundRect(ctx, 130, 870, 252, 62, 31);
    ctx.fill();

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 8;
    return tex;
  }, [accent, title]);

  return (
    <mesh position={[0, 0, 0.105]}>
      <planeGeometry args={[1.6, 3.2]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function PhoneFrame({ scale = 1 }: { scale?: number }) {
  return (
    <mesh castShadow>
      <RoundedBox args={[1.8 * scale, 3.6 * scale, 0.11 * scale]} radius={0.18 * scale} smoothness={4}>
        <meshPhysicalMaterial
          color="#0a0b12"
          roughness={0.05}
          metalness={0.9}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </RoundedBox>
      <mesh position={[0.9 * scale, 0, 0]}>
        <boxGeometry args={[0.03 * scale, 0.12 * scale, 0.02 * scale]} />
        <meshPhysicalMaterial color="#1a1a24" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0, 1.65 * scale, 0.12 * scale]}>
        <cylinderGeometry args={[0.06 * scale, 0.06 * scale, 0.02 * scale, 16]} />
        <meshBasicMaterial color="#07080c" />
      </mesh>
    </mesh>
  );
}

export default function HeroPhones() {
  const group = useRef<THREE.Group>(null);
  const targetRot = useRef({ x: 0, y: 0 });

  useFrame(({ clock, pointer }) => {
    if (!group.current) return;
    const time = clock.elapsedTime;
    group.current.position.y = Math.sin(time * 0.6) * 0.06;
    group.current.rotation.y += 0.0015;

    targetRot.current.x += (pointer.y * 0.1 - targetRot.current.x) * 0.04;
    targetRot.current.y += (pointer.x * 0.1 - targetRot.current.y) * 0.04;
    group.current.rotation.x += (targetRot.current.x - group.current.rotation.x) * 0.04;
    group.current.rotation.y += (targetRot.current.y - group.current.rotation.y) * 0.04;
  });

  return (
    <group ref={group}>
      <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.15}>
        <group position={[0, 0, 0]} rotation={[0.14, 0, 0]}>
          <PhoneFrame />
          <PhoneScreen accent="#56E8C5" title="Calm" />
        </group>
      </Float>
      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.12}>
        <group position={[-1.8, -0.3, -0.8]} rotation={[0.17, -0.26, 0]}>
          <PhoneFrame scale={0.7} />
          <PhoneScreen accent="#7C8CFF" title="Swift" />
        </group>
      </Float>
      <Float speed={0.8} rotationIntensity={0.06} floatIntensity={0.1}>
        <group position={[1.9, 0.2, -0.6]} rotation={[-0.09, 0.35, 0]}>
          <PhoneFrame scale={0.55} />
          <PhoneScreen accent="#FFB454" title="Pulse" />
        </group>
      </Float>

      {[0, 1, 2].map((i) => (
        <mesh key={`ring-${i}`} rotation={[i * 1.2, i * 0.8, 0]} position={[0, 0, 0]}>
          <torusGeometry args={[1.3 + i * 0.4, 0.015, 16, 48]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? "#56E8C5" : "#7C8CFF"}
            transparent
            opacity={0.25}
          />
        </mesh>
      ))}

      {Array.from({ length: 10 }).map((_, i) => (
        <mesh
          key={`orb-${i}`}
          position={[
            (Math.random() - 0.5) * 4,
            (Math.random() - 0.5) * 4,
            (Math.random() - 0.5) * 4,
          ]}
        >
          <sphereGeometry args={[0.03 + Math.random() * 0.03, 8, 8]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? "#56E8C5" : "#7C8CFF"}
            transparent
            opacity={0.3 + Math.random() * 0.4}
          />
        </mesh>
      ))}
    </group>
  );
}
