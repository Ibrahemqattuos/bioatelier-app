import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ──────────────────────────────────────────────
   Coronavirus (SARS-CoV-2) 3D Model
   Spherical virus with spike proteins
   ────────────────────────────────────────────── */

function SpikeProtein({ position, normal }) {
  const spikeRef = useRef();
  const quaternion = useMemo(() => {
    const q = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
    return q;
  }, [normal]);

  return (
    <group position={position} quaternion={quaternion}>
      {/* Spike stem */}
      <mesh>
        <cylinderGeometry args={[0.03, 0.02, 0.5, 6]} />
        <meshPhysicalMaterial
          color="#f59e0b"
          emissive="#f59e0b"
          emissiveIntensity={0.3}
          roughness={0.3}
          metalness={0.4}
        />
      </mesh>
      {/* Spike crown (the characteristic "corona") */}
      <group position={[0, 0.3, 0]}>
        <mesh>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshPhysicalMaterial
            color="#ef4444"
            emissive="#ef4444"
            emissiveIntensity={0.4}
            roughness={0.2}
            metalness={0.5}
          />
        </mesh>
        {/* Three prongs */}
        {[0, 120, 240].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          return (
            <mesh key={i} position={[Math.cos(rad) * 0.08, 0.08, Math.sin(rad) * 0.08]} rotation={[0.3 * Math.sin(rad), 0, -0.3 * Math.cos(rad)]}>
              <sphereGeometry args={[0.04, 6, 6]} />
              <meshPhysicalMaterial
                color="#ef4444"
                emissive="#ef4444"
                emissiveIntensity={0.5}
              />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

function RNAInside() {
  const ref = useRef();
  const curve = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 100; i++) {
      const t = i / 100;
      const phi = t * Math.PI * 8;
      const r = 0.6 * (1 - t * 0.3);
      pts.push(
        new THREE.Vector3(
          Math.sin(phi) * r * Math.cos(t * Math.PI * 3),
          (t - 0.5) * 1.6,
          Math.cos(phi) * r * Math.sin(t * Math.PI * 2 + 1)
        )
      );
    }
    return new THREE.CatmullRomCurve3(pts);
  }, []);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.15;
  });

  return (
    <mesh ref={ref}>
      <tubeGeometry args={[curve, 100, 0.02, 6, false]} />
      <meshPhysicalMaterial
        color="#06b6d4"
        emissive="#06b6d4"
        emissiveIntensity={0.6}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
}

export default function CoronavirusModel() {
  const groupRef = useRef();

  // Generate spike positions on sphere surface using fibonacci distribution
  const spikeData = useMemo(() => {
    const spikes = [];
    const N = 60;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = goldenAngle * i;
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;
      const normal = new THREE.Vector3(x, y, z).normalize();
      const pos = normal.clone().multiplyScalar(1.25);
      spikes.push({ position: [pos.x, pos.y, pos.z], normal });
    }
    return spikes;
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <group ref={groupRef} scale={0.9}>
      {/* Viral envelope - outer membrane */}
      <mesh>
        <sphereGeometry args={[1.3, 64, 64]} />
        <meshPhysicalMaterial
          color="#8b5cf6"
          transparent
          opacity={0.15}
          roughness={0.1}
          metalness={0.2}
          transmission={0.6}
          thickness={0.8}
          clearcoat={1}
          clearcoatRoughness={0.1}
          side={THREE.DoubleSide}
          envMapIntensity={0.5}
        />
      </mesh>

      {/* Lipid bilayer visual */}
      <mesh>
        <sphereGeometry args={[1.22, 48, 48]} />
        <meshPhysicalMaterial
          color="#a855f7"
          transparent
          opacity={0.1}
          roughness={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* M-protein shell */}
      <mesh>
        <sphereGeometry args={[1.1, 32, 32]} />
        <meshPhysicalMaterial
          color="#7c3aed"
          transparent
          opacity={0.08}
          roughness={0.3}
          wireframe
        />
      </mesh>

      {/* Glow */}
      <mesh scale={1.8}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0.04}
          side={THREE.BackSide}
        />
      </mesh>

      {/* RNA inside */}
      <RNAInside />

      {/* Spike proteins */}
      {spikeData.map((spike, i) => (
        <SpikeProtein
          key={i}
          position={spike.position}
          normal={spike.normal}
        />
      ))}
    </group>
  );
}
