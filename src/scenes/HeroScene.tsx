import { Environment, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import PhoneMockup3D from "../components/PhoneMockup3D";

function Particles() {
  const points = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const positions = new Float32Array(120 * 3);
    for (let i = 0; i < 120; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return particleGeometry;
  }, []);

  useFrame(({ clock }) => {
    if (points.current) {
      points.current.rotation.y = clock.elapsedTime * 0.025;
    }
  });

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial color="#56e8c5" size={0.018} transparent opacity={0.46} />
    </points>
  );
}

function SceneContent() {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(clock.elapsedTime * 0.24) * 0.08;
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0.2, 6.6]} fov={42} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 4, 5]} intensity={2.2} />
      <pointLight position={[-3, 1.5, 2]} intensity={8} color="#56e8c5" distance={7} />
      <pointLight position={[3.2, -0.5, 2.5]} intensity={6} color="#7c8cff" distance={7} />
      <Environment preset="city" />
      <Particles />
      <mesh position={[0.2, -0.2, -1.5]}>
        <sphereGeometry args={[2.3, 48, 48]} />
        <meshBasicMaterial color="#56e8c5" transparent opacity={0.08} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh position={[1.2, 0.1, -1.8]}>
        <sphereGeometry args={[2.1, 48, 48]} />
        <meshBasicMaterial color="#7c8cff" transparent opacity={0.08} blending={THREE.AdditiveBlending} />
      </mesh>
      <group ref={group}>
        <PhoneMockup3D
          accent="#56e8c5"
          delay={0}
          position={[-1.65, -0.15, 0.25]}
          rotation={[0.1, 0.34, -0.08]}
          title="Baby"
        />
        <PhoneMockup3D
          accent="#7c8cff"
          delay={1.3}
          position={[0.15, 0.25, 0]}
          rotation={[-0.04, -0.08, 0.04]}
          title="Craft"
        />
        <PhoneMockup3D
          accent="#ffb454"
          delay={2.1}
          position={[1.68, -0.35, 0.15]}
          rotation={[0.08, -0.36, 0.09]}
          title="Pets"
        />
      </group>
    </>
  );
}

export default function HeroScene() {
  return (
    <Canvas dpr={[1, 1.6]} gl={{ antialias: true, alpha: true }} shadows>
      <SceneContent />
    </Canvas>
  );
}
