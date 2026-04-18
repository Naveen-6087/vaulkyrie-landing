"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const DEVICE_COUNT = 3;
const SHARD_PARTICLES = 120;
const ORBIT_RADIUS = 2.2;

// Rounded-rectangle shape for a device
function Device({
  angle,
  color,
  label,
}: {
  angle: number;
  color: string;
  label: string;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    const currentAngle = angle + t * 0.2;
    const x = Math.cos(currentAngle) * ORBIT_RADIUS;
    const z = Math.sin(currentAngle) * ORBIT_RADIUS;
    groupRef.current.position.set(x, Math.sin(t * 0.5 + angle) * 0.15, z);
    // Face center
    groupRef.current.lookAt(0, 0, 0);

    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.08 + Math.sin(t * 2 + angle * 3) * 0.04;
    }
  });

  // Create a rounded rectangle shape
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    const w = 0.35, h = 0.55, r = 0.06;
    s.moveTo(-w + r, -h);
    s.lineTo(w - r, -h);
    s.quadraticCurveTo(w, -h, w, -h + r);
    s.lineTo(w, h - r);
    s.quadraticCurveTo(w, h, w - r, h);
    s.lineTo(-w + r, h);
    s.quadraticCurveTo(-w, h, -w, h - r);
    s.lineTo(-w, -h + r);
    s.quadraticCurveTo(-w, -h, -w + r, -h);
    return s;
  }, []);

  return (
    <group ref={groupRef}>
      {/* Device body */}
      <mesh>
        <shapeGeometry args={[shape]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.12}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Device outline */}
      <lineLoop>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[
              new Float32Array(
                shape.getPoints(32).flatMap((p) => [p.x, p.y, 0])
              ),
              3,
            ]}
            count={shape.getPoints(32).length}
          />
        </bufferGeometry>
        <lineBasicMaterial color={color} transparent opacity={0.6} />
      </lineLoop>

      {/* Screen area */}
      <mesh position={[0, 0.08, 0.001]}>
        <planeGeometry args={[0.5, 0.6]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.04}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Device glow */}
      <mesh ref={glowRef} position={[0, 0, -0.05]}>
        <circleGeometry args={[0.6, 24]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.08}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Label dot */}
      <mesh position={[0, -0.4, 0.01]}>
        <circleGeometry args={[0.035, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.8} />
      </mesh>

      {/* Invisible label - using simple dot since we can't do text without extra deps */}
      {label && null}
    </group>
  );
}

// Central key shard that splits
function CentralKey() {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.z = t * 0.3;
    }
    if (ringRef.current) {
      const mat = ringRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.15 + Math.sin(t * 1.5) * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Inner core */}
      <mesh>
        <dodecahedronGeometry args={[0.18, 0]} />
        <meshBasicMaterial color="#00ffd5" transparent opacity={0.6} wireframe />
      </mesh>

      {/* Glow sphere */}
      <mesh>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshBasicMaterial color="#00ffd5" transparent opacity={0.06} />
      </mesh>

      {/* Pulse ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.4, 0.008, 8, 48]} />
        <meshBasicMaterial color="#14b8a6" transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

// Particle streams flowing between center and devices
function ShardStreams() {
  const pointsRef = useRef<THREE.Points>(null);

  const particleData = useMemo(() => {
    const positions = new Float32Array(SHARD_PARTICLES * 3);
    const colors = new Float32Array(SHARD_PARTICLES * 3);
    const phases: number[] = [];

    const teal = new THREE.Color("#14b8a6");
    const neon = new THREE.Color("#00ffd5");

    for (let i = 0; i < SHARD_PARTICLES; i++) {
      phases.push(Math.random());
      const c = teal.clone().lerp(neon, Math.random());
      c.toArray(colors, i * 3);
    }

    return { positions, colors, phases };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime;
    const pos = pointsRef.current.geometry.attributes.position
      .array as Float32Array;

    for (let i = 0; i < SHARD_PARTICLES; i++) {
      const deviceIdx = i % DEVICE_COUNT;
      const deviceAngle =
        (deviceIdx * Math.PI * 2) / DEVICE_COUNT + t * 0.2;
      const deviceX = Math.cos(deviceAngle) * ORBIT_RADIUS;
      const deviceZ = Math.sin(deviceAngle) * ORBIT_RADIUS;

      // Animate along the path from center to device
      const progress =
        ((t * 0.4 + particleData.phases[i]) % 1);

      pos[i * 3] = deviceX * progress;
      pos[i * 3 + 1] =
        Math.sin(progress * Math.PI) * 0.3 +
        Math.sin(t + i) * 0.05;
      pos[i * 3 + 2] = deviceZ * progress;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particleData.positions, 3]}
          count={SHARD_PARTICLES}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[particleData.colors, 3]}
          count={SHARD_PARTICLES}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        transparent
        opacity={0.7}
        vertexColors
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// Connection lines between devices
function ConnectionLines() {
  const lineRef = useRef<THREE.Line>(null);

  const positions = useMemo(
    () => new Float32Array(DEVICE_COUNT * 2 * 3),
    []
  );

  useFrame((state) => {
    if (!lineRef.current) return;
    const t = state.clock.elapsedTime;
    const pos = lineRef.current.geometry.attributes.position
      .array as Float32Array;

    for (let i = 0; i < DEVICE_COUNT; i++) {
      const angle = (i * Math.PI * 2) / DEVICE_COUNT + t * 0.2;
      const x = Math.cos(angle) * ORBIT_RADIUS;
      const z = Math.sin(angle) * ORBIT_RADIUS;

      // Line from center to device
      pos[i * 6] = 0;
      pos[i * 6 + 1] = 0;
      pos[i * 6 + 2] = 0;
      pos[i * 6 + 3] = x;
      pos[i * 6 + 4] = Math.sin(t * 0.5 + angle) * 0.15;
      pos[i * 6 + 5] = z;
    }

    lineRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={DEVICE_COUNT * 2}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#14b8a6" transparent opacity={0.12} />
    </lineSegments>
  );
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.04;
    }
  });

  const deviceAngles = useMemo(
    () =>
      Array.from(
        { length: DEVICE_COUNT },
        (_, i) => (i * Math.PI * 2) / DEVICE_COUNT
      ),
    []
  );
  const deviceColors = ["#14b8a6", "#00ffd5", "#2dd4bf"];
  const deviceLabels = ["Phone", "Laptop", "Tablet"];

  return (
    <group ref={groupRef}>
      <CentralKey />
      {deviceAngles.map((angle, i) => (
        <Device
          key={i}
          angle={angle}
          color={deviceColors[i]}
          label={deviceLabels[i]}
        />
      ))}
      <ShardStreams />
      <ConnectionLines />
    </group>
  );
}

export default function DevicePairing3D() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 2.5, 5], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
