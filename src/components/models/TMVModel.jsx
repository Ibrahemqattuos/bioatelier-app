import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ──────────────────────────────────────────────
   TMV (Tobacco Mosaic Virus) - Helical / Cylindrical
   ────────────────────────────────────────────── */

function ProteinSubunit({ y, angle, radius = 0.7 }) {
  const rad = (angle * Math.PI) / 180;
  const x = Math.cos(rad) * radius;
  const z = Math.sin(rad) * radius;

  return (
    <mesh position={[x, y, z]} rotation={[0, -rad, 0]}>
      <boxGeometry args={[0.25, 0.12, 0.18]} />
      <meshPhysicalMaterial
        color="#f59e0b"
        emissive="#f59e0b"
        emissiveIntensity={0.15}
        transparent
        opacity={0.55}
        roughness={0.2}
        metalness={0.4}
      />
    </mesh>
  );
}

function RNACore() {
  const ref = useRef();
  const curve = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 200; i++) {
      const t = i / 200;
      const y = 2.5 - t * 5;
      const angle = t * Math.PI * 24;
      pts.push(
        new THREE.Vector3(
          Math.cos(angle) * 0.3,
          y,
          Math.sin(angle) * 0.3
        )
      );
    }
    return new THREE.CatmullRomCurve3(pts);
  }, []);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.1;
  });

  return (
    <mesh ref={ref}>
      <tubeGeometry args={[curve, 200, 0.035, 6, false]} />
      <meshPhysicalMaterial
        color="#ef4444"
        emissive="#ef4444"
        emissiveIntensity={0.5}
        transparent
        opacity={0.8}
        roughness={0.3}
      />
    </mesh>
  );
}

export default function TMVModel() {
  const groupRef = useRef();

  // Generate helical protein subunits
  const subunits = useMemo(() => {
    const subs = [];
    const totalLayers = 40;
    const subunitsPerTurn = 16.3;
    const rise = 5.0 / totalLayers;

    for (let i = 0; i < totalLayers * 3; i++) {
      const layer = Math.floor(i / 3);
      const sublayer = i % 3;
      const y = 2.5 - layer * rise;
      const baseAngle = (layer * 360) / subunitsPerTurn;
      const angle = baseAngle + sublayer * (360 / 3);
      subs.push({ y, angle: angle % 360 });
    }
    return subs;
  }, []);

  return (
    <group ref={groupRef} scale={0.65} position={[0, 0, 0]}>
      {/* Outer cylinder wireframe guide */}
      <mesh>
        <cylinderGeometry args={[0.85, 0.85, 5, 32, 1, true]} />
        <meshPhysicalMaterial
          color="#f59e0b"
          transparent
          opacity={0.04}
          side={THREE.DoubleSide}
          wireframe
        />
      </mesh>

      {/* Protein subunits in helix */}
      {subunits.map((sub, i) => (
        <ProteinSubunit key={i} y={sub.y} angle={sub.angle} />
      ))}

      {/* Central RNA helix */}
      <RNACore />

      {/* Top & bottom caps */}
      {[2.55, -2.55].map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <cylinderGeometry args={[0.82, 0.82, 0.08, 32]} />
          <meshPhysicalMaterial
            color="#f59e0b"
            transparent
            opacity={0.2}
            roughness={0.2}
            metalness={0.3}
          />
        </mesh>
      ))}

      {/* Glow */}
      <mesh scale={1.5}>
        <cylinderGeometry args={[0.8, 0.8, 5.5, 16]} />
        <meshBasicMaterial
          color="#f59e0b"
          transparent
          opacity={0.03}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}
