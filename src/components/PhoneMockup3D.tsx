import { Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type PhoneMockup3DProps = {
  position: [number, number, number];
  rotation: [number, number, number];
  accent: string;
  title: string;
  delay?: number;
};

function createScreenTexture(accent: string, title: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 1024;
  const context = canvas.getContext("2d");

  if (context) {
    const background = context.createLinearGradient(0, 0, 512, 1024);
    background.addColorStop(0, "#12141b");
    background.addColorStop(0.46, accent);
    background.addColorStop(1, "#07080c");
    context.fillStyle = background;
    context.fillRect(0, 0, 512, 1024);

    context.fillStyle = "rgba(255,255,255,0.18)";
    context.fillRect(54, 76, 140, 20);
    context.fillStyle = "rgba(255,255,255,0.68)";
    context.font = "700 44px Inter, sans-serif";
    context.fillText(title, 54, 176);
    context.fillStyle = "rgba(255,255,255,0.34)";
    context.fillRect(54, 216, 316, 18);
    context.fillRect(54, 252, 244, 14);

    for (let i = 0; i < 4; i += 1) {
      const y = 370 + i * 118;
      context.fillStyle = "rgba(255,255,255,0.13)";
      roundRect(context, 54, y, 404, 84, 28);
      context.fill();
      context.fillStyle = "rgba(255,255,255,0.58)";
      roundRect(context, 86, y + 25, 142 + i * 26, 13, 8);
      context.fill();
      context.fillStyle = "rgba(255,255,255,0.22)";
      roundRect(context, 86, y + 52, 236, 10, 8);
      context.fill();
    }

    context.fillStyle = "rgba(86,232,197,0.84)";
    roundRect(context, 130, 870, 252, 62, 31);
    context.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

function roundRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.arcTo(x + width, y, x + width, y + height, radius);
  context.arcTo(x + width, y + height, x, y + height, radius);
  context.arcTo(x, y + height, x, y, radius);
  context.arcTo(x, y, x + width, y, radius);
  context.closePath();
}

export default function PhoneMockup3D({ position, rotation, accent, title, delay = 0 }: PhoneMockup3DProps) {
  const group = useRef<THREE.Group>(null);
  const texture = useMemo(() => createScreenTexture(accent, title), [accent, title]);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const time = clock.elapsedTime + delay;
    group.current.rotation.y = rotation[1] + Math.sin(time * 0.45) * 0.09;
    group.current.position.y = position[1] + Math.sin(time * 0.75) * 0.12;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.12} floatIntensity={0.18}>
      <group ref={group} position={position} rotation={rotation}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[1.68, 3.42, 0.18]} />
          <meshPhysicalMaterial
            color="#151821"
            metalness={0.8}
            roughness={0.24}
            clearcoat={0.9}
            clearcoatRoughness={0.2}
          />
        </mesh>
        <mesh position={[0, 0, 0.096]}>
          <planeGeometry args={[1.45, 3.07]} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
        <mesh position={[0, 1.55, 0.105]}>
          <boxGeometry args={[0.5, 0.08, 0.015]} />
          <meshBasicMaterial color="#07080c" />
        </mesh>
      </group>
    </Float>
  );
}
