import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ──────────────────────────────────────────────
   Adenovirus Model - Polyhedral (Icosahedral)
   ────────────────────────────────────────────── */

function FiberKnob({ position, normal }) {
  const quaternion = useMemo(() => {
    const q = new THREE.Quaternion();
    q.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal);
    return q;
  }, [normal]);

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0.4, 0),
      new THREE.Vector3(0.05, 0.7, 0.05),
      new THREE.Vector3(0, 1, 0),
    ]);
  }, []);

  return (
    <group position={position} quaternion={quaternion}>
      {/* Fiber shaft */}
      <mesh>
        <tubeGeometry args={[curve, 12, 0.02, 6, false]} />
        <meshPhysicalMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={0.3}
          transparent
          opacity={0.7}
        />
      </mesh>
      {/* Knob at tip */}
      <mesh position={[0, 1, 0]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshPhysicalMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={0.6}
        />
      </mesh>
    </group>
  );
}

export default function AdenovirusModel() {
  const groupRef = useRef();
  const wireRef = useRef();

  useFrame((_, delta) => {
    if (wireRef.current) {
      wireRef.current.rotation.y += delta * 0.05;
      wireRef.current.rotation.x += delta * 0.02;
    }
  });

  // Vertices of icosahedron for fiber positions
  const fiberData = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.55, 0);
    const positions = geo.attributes.position;
    const uniqueVerts = new Map();

    for (let i = 0; i < positions.count; i++) {
      const x = parseFloat(positions.getX(i).toFixed(3));
      const y = parseFloat(positions.getY(i).toFixed(3));
      const z = parseFloat(positions.getZ(i).toFixed(3));
      const key = `${x},${y},${z}`;
      if (!uniqueVerts.has(key)) {
        const normal = new THREE.Vector3(x, y, z).normalize();
        uniqueVerts.set(key, {
          position: [x, y, z],
          normal,
        });
      }
    }

    return Array.from(uniqueVerts.values());
  }, []);

  // Capsomere positions on faces
  const capsomeres = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.4, 1);
    const positions = geo.attributes.position;
    const caps = [];
    const seen = new Set();

    for (let i = 0; i < positions.count; i++) {
      const x = parseFloat(positions.getX(i).toFixed(2));
      const y = parseFloat(positions.getY(i).toFixed(2));
      const z = parseFloat(positions.getZ(i).toFixed(2));
      const key = `${x},${y},${z}`;
      if (!seen.has(key)) {
        seen.add(key);
        const normal = new THREE.Vector3(x, y, z).normalize();
        caps.push({ position: [x, y, z], normal });
      }
    }
    return caps;
  }, []);

  return (
    <group ref={groupRef} scale={0.8}>
      {/* Main icosahedral shell */}
      <mesh>
        <icosahedronGeometry args={[1.4, 0]} />
        <meshPhysicalMaterial
          color="#06b6d4"
          transparent
          opacity={0.2}
          roughness={0.1}
          metalness={0.3}
          transmission={0.5}
          thickness={0.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Wireframe */}
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.42, 1]} />
        <meshBasicMaterial
          color="#06b6d4"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Capsomeres (protein subunits on surface) */}
      {capsomeres.map((cap, i) => (
        <mesh key={i} position={cap.position}>
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshPhysicalMaterial
            color="#06b6d4"
            emissive="#06b6d4"
            emissiveIntensity={0.2}
            transparent
            opacity={0.5}
            roughness={0.2}
            metalness={0.5}
          />
        </mesh>
      ))}

      {/* DNA core */}
      <mesh>
        <icosahedronGeometry args={[0.6, 2]} />
        <meshPhysicalMaterial
          color="#10b981"
          emissive="#10b981"
          emissiveIntensity={0.4}
          transparent
          opacity={0.25}
          wireframe
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshPhysicalMaterial
          color="#10b981"
          transparent
          opacity={0.1}
          emissive="#10b981"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Fiber knobs from vertices */}
      {fiberData.map((fiber, i) => (
        <FiberKnob
          key={i}
          position={fiber.position}
          normal={fiber.normal}
        />
      ))}

      {/* Glow */}
      <mesh scale={2}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#06b6d4"
          transparent
          opacity={0.03}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}
