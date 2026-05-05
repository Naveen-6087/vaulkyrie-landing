"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export type ThresholdModeId = "fast" | "one-of-three" | "two-of-three" | "three-of-three";

type ModeConfig = {
  totalDevices: number;
  activeCount: number;
  particleCount: number;
  coreScale: number;
  coreOpacity: number;
  cosignerIndex?: number;
};

const ORBIT_RADIUS = 2.2;

const MODE_CONFIG: Record<ThresholdModeId, ModeConfig> = {
  fast: { totalDevices: 2, activeCount: 2, particleCount: 88, coreScale: 0.9, coreOpacity: 0.44, cosignerIndex: 1 },
  "one-of-three": { totalDevices: 3, activeCount: 1, particleCount: 44, coreScale: 0.82, coreOpacity: 0.32 },
  "two-of-three": { totalDevices: 3, activeCount: 2, particleCount: 104, coreScale: 1, coreOpacity: 0.5 },
  "three-of-three": { totalDevices: 3, activeCount: 3, particleCount: 162, coreScale: 1.12, coreOpacity: 0.62 },
};

function seededUnit(index: number, salt: number) {
  const x = Math.sin(index * 127.1 + salt * 311.7) * 43758.5453123;
  return x - Math.floor(x);
}

function buildDeviceShape() {
  const shape = new THREE.Shape();
  const w = 0.35;
  const h = 0.55;
  const r = 0.06;
  shape.moveTo(-w + r, -h);
  shape.lineTo(w - r, -h);
  shape.quadraticCurveTo(w, -h, w, -h + r);
  shape.lineTo(w, h - r);
  shape.quadraticCurveTo(w, h, w - r, h);
  shape.lineTo(-w + r, h);
  shape.quadraticCurveTo(-w, h, -w, h - r);
  shape.lineTo(-w, -h + r);
  shape.quadraticCurveTo(-w, -h, -w + r, -h);
  return shape;
}

function Device({
  angle,
  color,
  active,
  isCosigner = false,
}: {
  angle: number;
  color: string;
  active: boolean;
  isCosigner?: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  const shape = useMemo(() => buildDeviceShape(), []);
  const outlinePoints = useMemo(
    () => new Float32Array(shape.getPoints(32).flatMap((point) => [point.x, point.y, 0])),
    [shape],
  );
  const markerPoints = useMemo(
    () => new Float32Array([-0.08, 0.08, 0, 0, -0.08, 0, 0, -0.08, 0, 0.08, 0.08, 0]),
    [],
  );

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    const currentAngle = angle + t * 0.2;
    const x = Math.cos(currentAngle) * ORBIT_RADIUS;
    const z = Math.sin(currentAngle) * ORBIT_RADIUS;
    groupRef.current.position.set(x, Math.sin(t * 0.5 + angle) * 0.15, z);
    groupRef.current.lookAt(0, 0, 0);

    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshBasicMaterial;
      const base = active ? 0.12 : 0.018;
      const swing = active ? 0.05 : 0.01;
      mat.opacity = base + Math.sin(t * 2 + angle * 3) * swing;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <shapeGeometry args={[shape]} />
        <meshBasicMaterial color={color} transparent opacity={active ? 0.14 : 0.028} side={THREE.DoubleSide} />
      </mesh>

      <lineLoop>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[outlinePoints, 3]} count={outlinePoints.length / 3} />
        </bufferGeometry>
        <lineBasicMaterial color={color} transparent opacity={active ? 0.72 : 0.14} />
      </lineLoop>

      <mesh position={[0, 0.08, 0.001]}>
        <planeGeometry args={[0.5, 0.6]} />
        <meshBasicMaterial color={color} transparent opacity={active ? 0.06 : 0.012} side={THREE.DoubleSide} />
      </mesh>

      <mesh ref={glowRef} position={[0, 0, -0.05]}>
        <circleGeometry args={[0.6, 24]} />
        <meshBasicMaterial color={color} transparent opacity={0.08} side={THREE.DoubleSide} />
      </mesh>

      <mesh position={[0, -0.4, 0.01]}>
        <circleGeometry args={[0.035, 16]} />
        <meshBasicMaterial color={color} transparent opacity={active ? 0.88 : 0.22} />
      </mesh>

      {isCosigner ? (
        <group position={[0, 0.34, 0.02]}>
          <mesh>
            <circleGeometry args={[0.12, 20]} />
            <meshBasicMaterial color="#dffef3" transparent opacity={0.08} />
          </mesh>
          <lineSegments>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[markerPoints, 3]} count={markerPoints.length / 3} />
            </bufferGeometry>
            <lineBasicMaterial color="#dffef3" transparent opacity={0.9} />
          </lineSegments>
        </group>
      ) : null}
    </group>
  );
}

function TriangleCore({
  activeCount,
  scale,
  opacity,
}: {
  activeCount: number;
  scale: number;
  opacity: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.z = t * 0.32;
      groupRef.current.scale.setScalar(scale + Math.sin(t * 1.4) * 0.02);
    }
    if (ringRef.current) {
      const mat = ringRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = opacity * 0.32 + Math.sin(t * 1.5) * 0.06;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <tetrahedronGeometry args={[0.22, 0]} />
        <meshBasicMaterial color="#00ffd5" transparent opacity={opacity} wireframe />
      </mesh>

      <mesh>
        <sphereGeometry args={[0.28, 16, 16]} />
        <meshBasicMaterial color="#00ffd5" transparent opacity={opacity * 0.12} />
      </mesh>

      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.4, 0.008, 8, 48]} />
        <meshBasicMaterial color="#14b8a6" transparent opacity={0.14} />
      </mesh>

      {activeCount === 3 ? (
        <mesh rotation={[0, 0, Math.PI / 3]}>
          <tetrahedronGeometry args={[0.14, 0]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.34} wireframe />
        </mesh>
      ) : null}
    </group>
  );
}

function ShardStreams({
  deviceAngles,
  activeCount,
  particleCount,
}: {
  deviceAngles: number[];
  activeCount: number;
  particleCount: number;
}) {
  const pointsRef = useRef<THREE.Points>(null);

  const particleData = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const phases: number[] = [];
    const teal = new THREE.Color("#14b8a6");
    const neon = new THREE.Color("#00ffd5");

    for (let index = 0; index < particleCount; index += 1) {
      phases.push(seededUnit(index, 1));
      const color = teal.clone().lerp(neon, seededUnit(index, 2));
      color.toArray(colors, index * 3);
    }

    return { positions, colors, phases };
  }, [particleCount]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime;
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const activeAngles = deviceAngles.slice(0, Math.max(activeCount, 1));

    for (let index = 0; index < particleCount; index += 1) {
      const deviceAngle = activeAngles[index % activeAngles.length] + t * 0.2;
      const deviceX = Math.cos(deviceAngle) * ORBIT_RADIUS;
      const deviceZ = Math.sin(deviceAngle) * ORBIT_RADIUS;
      const progress = (t * 0.45 + particleData.phases[index]) % 1;
      const inward = 1 - progress;

      positions[index * 3] = deviceX * inward;
      positions[index * 3 + 1] = Math.sin(inward * Math.PI) * 0.3 + Math.sin(t + index) * 0.05;
      positions[index * 3 + 2] = deviceZ * inward;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[particleData.positions, 3]} count={particleCount} />
        <bufferAttribute attach="attributes-color" args={[particleData.colors, 3]} count={particleCount} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        transparent
        opacity={0.92}
        vertexColors
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function ConnectionLines({
  deviceAngles,
  activeCount,
}: {
  deviceAngles: number[];
  activeCount: number;
}) {
  const baseRef = useRef<THREE.LineSegments>(null);
  const activeRef = useRef<THREE.LineSegments>(null);
  const totalDevices = deviceAngles.length;

  const positions = useMemo(() => new Float32Array(totalDevices * 2 * 3), [totalDevices]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const updateLines = (ref: THREE.LineSegments | null, brightOnly: boolean) => {
      if (!ref) return;
      const pos = ref.geometry.attributes.position.array as Float32Array;

      for (let index = 0; index < totalDevices; index += 1) {
        const angle = deviceAngles[index] + t * 0.2;
        const x = Math.cos(angle) * ORBIT_RADIUS;
        const z = Math.sin(angle) * ORBIT_RADIUS;
        const visible = !brightOnly || index < activeCount;

        pos[index * 6] = 0;
        pos[index * 6 + 1] = 0;
        pos[index * 6 + 2] = 0;
        pos[index * 6 + 3] = visible ? x : 0;
        pos[index * 6 + 4] = visible ? Math.sin(t * 0.5 + angle) * 0.15 : 0;
        pos[index * 6 + 5] = visible ? z : 0;
      }

      ref.geometry.attributes.position.needsUpdate = true;
    };

    updateLines(baseRef.current, false);
    updateLines(activeRef.current, true);
  });

  return (
    <>
      <lineSegments ref={baseRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions.slice(), 3]} count={totalDevices * 2} />
        </bufferGeometry>
        <lineBasicMaterial color="#14b8a6" transparent opacity={0.08} />
      </lineSegments>

      <lineSegments ref={activeRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions.slice(), 3]} count={totalDevices * 2} />
        </bufferGeometry>
        <lineBasicMaterial color="#00ffd5" transparent opacity={0.26} />
      </lineSegments>
    </>
  );
}

function Scene({ mode }: { mode: ThresholdModeId }) {
  const groupRef = useRef<THREE.Group>(null);
  const config = MODE_CONFIG[mode];

  const deviceAngles = useMemo(() => {
    if (config.totalDevices === 2) {
      return [Math.PI * 0.18, Math.PI * 1.18];
    }

    return Array.from({ length: 3 }, (_, index) => (index * Math.PI * 2) / 3);
  }, [config.totalDevices]);

  const deviceColors = config.totalDevices === 2 ? ["#00ffd5", "#dffef3"] : ["#14b8a6", "#00ffd5", "#2dd4bf"];

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      <TriangleCore activeCount={config.activeCount} scale={config.coreScale} opacity={config.coreOpacity} />

      {deviceAngles.map((angle, index) => (
        <Device
          key={`${mode}-${index}`}
          angle={angle}
          color={deviceColors[index]}
          active={index < config.activeCount}
          isCosigner={config.cosignerIndex === index}
        />
      ))}

      <ShardStreams
        deviceAngles={deviceAngles}
        activeCount={config.activeCount}
        particleCount={config.particleCount}
      />
      <ConnectionLines deviceAngles={deviceAngles} activeCount={config.activeCount} />
    </group>
  );
}

export default function ThresholdSigning3D({ mode }: { mode: ThresholdModeId }) {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 2.5, 5], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <Scene key={mode} mode={mode} />
      </Canvas>
    </div>
  );
}
