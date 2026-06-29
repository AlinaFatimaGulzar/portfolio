import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Torus } from "@react-three/drei";
import * as THREE from "three";

function FloatingShape({ position, color, shape, mouse, index, opacity: shapeOpacity, ...props }) {
  const meshRef = useRef();
  const basePos = useMemo(() => position, []);

  useFrame(() => {
    if (meshRef.current && mouse.current) {
      meshRef.current.rotation.x += 0.003;
      meshRef.current.rotation.y += 0.005;
      const depthFactor = 0.5 + index * 0.2;
      meshRef.current.position.x = basePos[0] + mouse.current.x * 2.5 * depthFactor;
      meshRef.current.position.y = basePos[1] + mouse.current.y * 2.5 * depthFactor;
    }
  });

  const geometry = useMemo(() => {
    switch (shape) {
      case "icosahedron": return new THREE.IcosahedronGeometry(1, 0);
      case "octahedron": return new THREE.OctahedronGeometry(1, 0);
      case "torusKnot": return new THREE.TorusKnotGeometry(0.8, 0.3, 64, 8);
      case "dodecahedron": return new THREE.DodecahedronGeometry(1, 0);
      default: return new THREE.IcosahedronGeometry(1, 0);
    }
  }, [shape]);

  return (
    <Float speed={1 + index * 0.2} rotationIntensity={0.6} floatIntensity={0.6}>
      <mesh ref={meshRef} position={position} geometry={geometry} {...props}>
        <MeshDistortMaterial
          color={color}
          roughness={0.2}
          metalness={0.2}
          transparent
          opacity={shapeOpacity ?? 0.35}
          distort={0.25}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

function WireframeShape({ position, color, mouse, index }) {
  const meshRef = useRef();
  const basePos = useMemo(() => position, []);

  useFrame(() => {
    if (meshRef.current && mouse.current) {
      meshRef.current.rotation.x += 0.002;
      meshRef.current.rotation.z += 0.003;
      meshRef.current.position.x = basePos[0] + mouse.current.x * 1.8 * (0.3 + index * 0.15);
      meshRef.current.position.y = basePos[1] + mouse.current.y * 1.8 * (0.3 + index * 0.15);
    }
  });

  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1.4, 1), []);

  return (
    <mesh ref={meshRef} position={position} geometry={geometry}>
      <meshBasicMaterial color={color} wireframe transparent opacity={0.2} />
    </mesh>
  );
}

function CentralRing({ mouse }) {
  const ringRef = useRef();

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.3;
      ringRef.current.rotation.y += 0.008;
      ringRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.15) * 0.15;
      if (mouse.current) {
        ringRef.current.position.x = mouse.current.x * 0.6;
        ringRef.current.position.y = mouse.current.y * 0.6;
      }
    }
  });

  return (
    <group ref={ringRef}>
      <Torus args={[2.8, 0.03, 16, 80]} position={[0, 0, -4]}>
        <meshBasicMaterial color="#FF8A72" transparent opacity={0.2} />
      </Torus>
      <Torus args={[3.6, 0.02, 16, 80]} position={[0, 0, -6]}>
        <meshBasicMaterial color="#FFA28E" transparent opacity={0.15} />
      </Torus>
      <Torus args={[1.8, 0.025, 16, 80]} position={[0, 0, -2.5]}>
        <meshBasicMaterial color="#FFBBA8" transparent opacity={0.18} />
      </Torus>
      <Torus args={[4.2, 0.015, 16, 80]} position={[0, 0, -8]}>
        <meshBasicMaterial color="#FFD4C4" transparent opacity={0.1} />
      </Torus>
    </group>
  );
}

function GlowSphere() {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 0.3) * 0.15);
    }
  });

  return (
    <Sphere ref={meshRef} args={[0.5, 16, 16]} position={[0, 0, 2]}>
      <meshBasicMaterial color="#FF8A72" transparent opacity={0.08} />
    </Sphere>
  );
}

function ConnectingNetwork({ mouse }) {
  const count = 120;
  const particlesRef = useRef();
  const linesRef = useRef();

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30 - 5;
      vel[i * 3] = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.005;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
    }
    return [pos, vel];
  }, []);

  const linePositions = useMemo(() => {
    const maxLines = count * 4;
    return new Float32Array(maxLines * 6);
  }, []);

  useFrame((state) => {
    if (!particlesRef.current || !linesRef.current) return;

    const posAttr = particlesRef.current.geometry.attributes.position;
    const posArray = posAttr.array;

    for (let i = 0; i < count; i++) {
      posArray[i * 3] += velocities[i * 3];
      posArray[i * 3 + 1] += velocities[i * 3 + 1];
      posArray[i * 3 + 2] += velocities[i * 3 + 2];

      if (Math.abs(posArray[i * 3]) > 20) velocities[i * 3] *= -1;
      if (Math.abs(posArray[i * 3 + 1]) > 20) velocities[i * 3 + 1] *= -1;
      if (Math.abs(posArray[i * 3 + 2]) > 20) velocities[i * 3 + 2] *= -1;

      if (mouse.current) {
        posArray[i * 3] += mouse.current.x * 0.002;
        posArray[i * 3 + 1] += mouse.current.y * 0.002;
      }
    }
    posAttr.needsUpdate = true;

    let lineIndex = 0;
    const maxDist = 5;

    for (let i = 0; i < count; i += 2) {
      for (let j = i + 1; j < count; j += 2) {
        if (lineIndex >= linePositions.length / 6 - 1) break;
        const dx = posArray[i * 3] - posArray[j * 3];
        const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
        const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < maxDist) {
          const alpha = 1 - dist / maxDist;
          linePositions[lineIndex * 6] = posArray[i * 3];
          linePositions[lineIndex * 6 + 1] = posArray[i * 3 + 1];
          linePositions[lineIndex * 6 + 2] = posArray[i * 3 + 2];
          linePositions[lineIndex * 6 + 3] = posArray[j * 3];
          linePositions[lineIndex * 6 + 4] = posArray[j * 3 + 1];
          linePositions[lineIndex * 6 + 5] = posArray[j * 3 + 2];
          lineIndex++;
        }
      }
    }

    const lineAttr = linesRef.current.geometry.attributes.position;
    lineAttr.count = lineIndex * 2;
    for (let i = 0; i < lineIndex * 6; i++) {
      lineAttr.array[i] = linePositions[i];
    }
    lineAttr.needsUpdate = true;
  });

  return (
    <group>
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.06} color="#FF8A72" transparent opacity={0.5} sizeAttenuation />
      </points>
      <lineSegments ref={linesRef} geometry={new THREE.BufferGeometry()}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={0}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#FF8A72" transparent opacity={0.1} />
      </lineSegments>
    </group>
  );
}

function Beam({ start, end, color, speed }) {
  const ref = useRef();

  useFrame((state) => {
    if (ref.current) {
      ref.current.material.opacity = 0.1 + Math.sin(state.clock.elapsedTime * speed) * 0.1;
    }
  });

  const points = useMemo(() => {
    const p = new Float32Array(6);
    p[0] = start[0]; p[1] = start[1]; p[2] = start[2];
    p[3] = end[0]; p[4] = end[1]; p[5] = end[2];
    return p;
  }, []);

  return (
    <line ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={2}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color={color} transparent opacity={0.15} />
    </line>
  );
}

function Scene({ mouse }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#FF8A72" />
      <directionalLight position={[-5, -5, -5]} intensity={0.2} color="#FFA28E" />
      <pointLight position={[0, 5, 5]} intensity={0.3} color="#FF8A72" />
      <pointLight position={[0, -5, 5]} intensity={0.15} color="#FFBBA8" />

      <GlowSphere />
      <ConnectingNetwork mouse={mouse} />

      <Beam start={[-6, 3, -5]} end={[7, -2, -8]} color="#FF8A72" speed={1.5} />
      <Beam start={[-4, -4, -10]} end={[5, 5, -12]} color="#FFA28E" speed={2} />
      <Beam start={[0, -3, -15]} end={[-7, -1, -18]} color="#FFBBA8" speed={1.8} />
      <Beam start={[8, 4, -20]} end={[-5, 6, -7]} color="#FFD4C4" speed={2.2} />
      <Beam start={[-6, 3, -5]} end={[-4, -4, -10]} color="#FF8A72" speed={1.2} />
      <Beam start={[7, -2, -8]} end={[5, 5, -12]} color="#FFA28E" speed={1.6} />

      <FloatingShape position={[-6, 3, -5]} color="#FF8A72" shape="icosahedron" scale={1.3} mouse={mouse} index={0} opacity={0.4} />
      <FloatingShape position={[7, -2, -8]} color="#FFA28E" shape="torusKnot" scale={1.1} mouse={mouse} index={1} opacity={0.35} />
      <FloatingShape position={[-4, -4, -10]} color="#FFBBA8" shape="octahedron" scale={0.9} mouse={mouse} index={2} opacity={0.3} />
      <FloatingShape position={[5, 5, -12]} color="#FF8A72" shape="dodecahedron" scale={1.2} mouse={mouse} index={3} opacity={0.35} />
      <FloatingShape position={[0, -3, -15]} color="#FFA28E" shape="icosahedron" scale={0.7} mouse={mouse} index={4} opacity={0.3} />
      <FloatingShape position={[-7, -1, -18]} color="#FFBBA8" shape="torusKnot" scale={0.8} mouse={mouse} index={5} opacity={0.25} />
      <FloatingShape position={[8, 4, -20]} color="#FF8A72" shape="octahedron" scale={1} mouse={mouse} index={6} opacity={0.3} />
      <FloatingShape position={[-5, 6, -7]} color="#FFD4C4" shape="dodecahedron" scale={0.6} mouse={mouse} index={7} opacity={0.25} />

      <WireframeShape position={[3, -5, -14]} color="#FF8A72" mouse={mouse} index={0} />
      <WireframeShape position={[-6, -2, -9]} color="#FFA28E" mouse={mouse} index={1} />
      <WireframeShape position={[0, 6, -16]} color="#FFBBA8" mouse={mouse} index={2} />

      <CentralRing mouse={mouse} />
    </>
  );
}

export default function ThreeBackground() {
  const mouse = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    mouse.current = { x, y };
  };

  return (
    <div className="three-bg" onMouseMove={handleMouseMove}>
      <Canvas
        camera={{ position: [0, 0, 14], fov: 55 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene mouse={mouse} />
      </Canvas>
    </div>
  );
}
