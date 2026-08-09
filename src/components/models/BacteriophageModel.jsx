import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ──────────────────────────────────────────────
   Bacteriophage 3D Model  (T4-like phage)
   ────────────────────────────────────────────── */

function IcosahedralHead({ color = "#10b981" }) {
  const meshRef = useRef();
  const glowRef = useRef();

  useFrame((_, delta) => {
    if (glowRef.current) {
      glowRef.current.material.opacity =
        0.08 + Math.sin(Date.now() * 0.002) * 0.04;
    }
  });

  return (
    <group position={[0, 2.2, 0]}>
      {/* Main head - icosahedron */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.3, 0]} />
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={0.35}
          roughness={0.1}
          metalness={0.3}
          transmission={0.4}
          thickness={0.5}
          envMapIntensity={1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Wireframe overlay */}
      <mesh>
        <icosahedronGeometry args={[1.32, 0]} />
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={0.5}
        />
      </mesh>
      {/* Glow sphere */}
      <mesh ref={glowRef} scale={1.6}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

function DNAHelix({ color1 = "#06b6d4", color2 = "#8b5cf6" }) {
  const groupRef = useRef();
  const helixPoints1 = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 80; i++) {
      const t = i / 80;
      const y = 2.8 - t * 2.2;
      pts.push(
        new THREE.Vector3(
          Math.sin(t * Math.PI * 6) * 0.35,
          y,
          Math.cos(t * Math.PI * 6) * 0.35
        )
      );
    }
    return pts;
  }, []);

  const helixPoints2 = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 80; i++) {
      const t = i / 80;
      const y = 2.8 - t * 2.2;
      pts.push(
        new THREE.Vector3(
          Math.sin(t * Math.PI * 6 + Math.PI) * 0.35,
          y,
          Math.cos(t * Math.PI * 6 + Math.PI) * 0.35
        )
      );
    }
    return pts;
  }, []);

  const curve1 = useMemo(
    () => new THREE.CatmullRomCurve3(helixPoints1),
    [helixPoints1]
  );
  const curve2 = useMemo(
    () => new THREE.CatmullRomCurve3(helixPoints2),
    [helixPoints2]
  );

  // Rungs connecting the two helices
  const rungs = useMemo(() => {
    const r = [];
    for (let i = 5; i < 75; i += 10) {
      const t = i / 80;
      const p1 = curve1.getPoint(t);
      const p2 = curve2.getPoint(t);
      r.push({ p1, p2 });
    }
    return r;
  }, [curve1, curve2]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Strand 1 */}
      <mesh>
        <tubeGeometry args={[curve1, 80, 0.04, 8, false]} />
        <meshPhysicalMaterial
          color={color1}
          emissive={color1}
          emissiveIntensity={0.5}
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>
      {/* Strand 2 */}
      <mesh>
        <tubeGeometry args={[curve2, 80, 0.04, 8, false]} />
        <meshPhysicalMaterial
          color={color2}
          emissive={color2}
          emissiveIntensity={0.5}
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>
      {/* Rungs */}
      {rungs.map((rung, i) => {
        const mid = new THREE.Vector3()
          .addVectors(rung.p1, rung.p2)
          .multiplyScalar(0.5);
        const dir = new THREE.Vector3().subVectors(rung.p2, rung.p1);
        const len = dir.length();
        return (
          <mesh key={i} position={mid} quaternion={new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize())}>
            <cylinderGeometry args={[0.02, 0.02, len, 6]} />
            <meshPhysicalMaterial
              color="#ffffff"
              transparent
              opacity={0.3}
              emissive="#ffffff"
              emissiveIntensity={0.2}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function Collar() {
  return (
    <group position={[0, 0.85, 0]}>
      <mesh>
        <cylinderGeometry args={[0.5, 0.55, 0.2, 6]} />
        <meshPhysicalMaterial
          color="#10b981"
          transparent
          opacity={0.5}
          roughness={0.2}
          metalness={0.7}
        />
      </mesh>
      <mesh>
        <cylinderGeometry args={[0.52, 0.57, 0.22, 6]} />
        <meshBasicMaterial color="#10b981" wireframe transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

function TailSheath() {
  const sheathRef = useRef();

  useFrame(() => {
    if (sheathRef.current) {
      sheathRef.current.material.opacity =
        0.25 + Math.sin(Date.now() * 0.001) * 0.1;
    }
  });

  // Tail segments
  const segments = useMemo(() => {
    const segs = [];
    for (let i = 0; i < 8; i++) {
      segs.push({
        y: 0.7 - i * 0.28,
        radius: 0.22 - i * 0.005,
      });
    }
    return segs;
  }, []);

  return (
    <group>
      {/* Main tail tube */}
      <mesh ref={sheathRef}>
        <cylinderGeometry args={[0.18, 0.15, 2.2, 8]} />
        <meshPhysicalMaterial
          color="#10b981"
          transparent
          opacity={0.3}
          roughness={0.15}
          metalness={0.5}
        />
      </mesh>
      {/* Ring segments */}
      {segments.map((seg, i) => (
        <mesh key={i} position={[0, seg.y, 0]}>
          <torusGeometry args={[seg.radius, 0.03, 8, 16]} />
          <meshPhysicalMaterial
            color="#10b981"
            emissive="#10b981"
            emissiveIntensity={0.3}
            transparent
            opacity={0.6}
            roughness={0.2}
            metalness={0.5}
          />
        </mesh>
      ))}
      {/* Inner core tube */}
      <mesh>
        <cylinderGeometry args={[0.06, 0.06, 2.2, 8]} />
        <meshPhysicalMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={0.3}
          transparent
          opacity={0.5}
        />
      </mesh>
    </group>
  );
}

function Baseplate() {
  return (
    <group position={[0, -1.45, 0]}>
      {/* Hexagonal base plate */}
      <mesh>
        <cylinderGeometry args={[0.6, 0.5, 0.15, 6]} />
        <meshPhysicalMaterial
          color="#10b981"
          transparent
          opacity={0.5}
          roughness={0.15}
          metalness={0.6}
        />
      </mesh>
      <mesh>
        <cylinderGeometry args={[0.62, 0.52, 0.16, 6]} />
        <meshBasicMaterial color="#10b981" wireframe transparent opacity={0.3} />
      </mesh>
      {/* Spikes */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(rad) * 0.45,
              -0.15,
              Math.sin(rad) * 0.45,
            ]}
            rotation={[0.3 * Math.cos(rad), 0, 0.3 * Math.sin(rad)]}
          >
            <coneGeometry args={[0.06, 0.25, 6]} />
            <meshPhysicalMaterial
              color="#10b981"
              emissive="#10b981"
              emissiveIntensity={0.3}
              transparent
              opacity={0.6}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function TailFiber({ angle, length = 2.5 }) {
  const rad = (angle * Math.PI) / 180;
  const startX = Math.cos(rad) * 0.45;
  const startZ = Math.sin(rad) * 0.45;
  const endX = Math.cos(rad) * length;
  const endZ = Math.sin(rad) * length;

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(startX, -1.55, startZ),
      new THREE.Vector3(startX * 1.3, -1.9, startZ * 1.3),
      new THREE.Vector3(endX * 0.6, -2.5, endZ * 0.6),
      new THREE.Vector3(endX * 0.8, -2.9, endZ * 0.8),
    ]);
  }, [startX, startZ, endX, endZ]);

  const endPoint = curve.getPoint(1);

  return (
    <group>
      <mesh>
        <tubeGeometry args={[curve, 20, 0.025, 6, false]} />
        <meshPhysicalMaterial
          color="#10b981"
          emissive="#10b981"
          emissiveIntensity={0.4}
          transparent
          opacity={0.7}
          roughness={0.2}
          metalness={0.5}
        />
      </mesh>
      {/* Foot / attachment point */}
      <mesh position={endPoint}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshPhysicalMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={0.8}
        />
      </mesh>
    </group>
  );
}

export default function BacteriophageModel() {
  const groupRef = useRef();

  return (
    <group ref={groupRef} scale={0.75} position={[0, 0.5, 0]}>
      <IcosahedralHead />
      <DNAHelix />
      <Collar />
      <TailSheath />
      <Baseplate />
      {/* 6 tail fibers at 60° intervals */}
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <TailFiber key={angle} angle={angle} />
      ))}
    </group>
  );
}
