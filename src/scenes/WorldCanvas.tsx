import { Suspense } from "react";
import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import ParticleField from "./ParticleField";
import ConnectingThread from "./ConnectingThread";
import HeroPhones from "./HeroPhones";

function Scene({ scrollProgress = 0 }: { scrollProgress?: number }) {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[4, 6, 4]} intensity={1.4} color="#56E8C5" />
      <pointLight position={[-3, -2, 2]} intensity={0.8} color="#7C8CFF" />
      <Environment preset="city" />
      <ParticleField scrollProgress={scrollProgress} />
      <ConnectingThread scrollProgress={scrollProgress} />
      <group position={[0, -15, 0]}>
        <HeroPhones />
      </group>
    </>
  );
}

export default function WorldCanvas({ scrollProgress = 0 }: { scrollProgress?: number }) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  if (isMobile) return null;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 8], fov: 42 }}
        style={{ pointerEvents: "none" }}
      >
        <Suspense fallback={null}>
          <Scene scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
}
