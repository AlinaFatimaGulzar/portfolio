import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { vertexShader, fragmentShader } from "./shaders/threadFlow";

export default function ConnectingThread({ scrollProgress = 0 }: { scrollProgress?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const uniformsRef = useRef({
    uTime: { value: 0 },
    uScrollProgress: { value: 0 },
    uColor1: { value: new THREE.Color("#56E8C5") },
    uColor2: { value: new THREE.Color("#7C8CFF") },
  });

  const curvePoints = useMemo(() => [
    new THREE.Vector3(0, -20, 0),
    new THREE.Vector3(4, -10, 1),
    new THREE.Vector3(-3, 0, -1),
    new THREE.Vector3(2, 10, 0),
    new THREE.Vector3(-2, 20, 1),
    new THREE.Vector3(1, 30, 0),
    new THREE.Vector3(-1, 40, -1),
    new THREE.Vector3(0, 50, 0),
  ], []);

  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(curvePoints);
    return new THREE.TubeGeometry(curve, 200, 0.04, 8, false);
  }, [curvePoints]);

  const material = useMemo(() => new THREE.ShaderMaterial({
    uniforms: uniformsRef.current,
    vertexShader,
    fragmentShader,
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  }), []);

  useFrame(({ clock }) => {
    uniformsRef.current.uTime.value = clock.elapsedTime;
    uniformsRef.current.uScrollProgress.value = scrollProgress ?? 0;
  });

  return <mesh ref={meshRef} geometry={geometry} material={material} />;
}
