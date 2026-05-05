"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function seededUnit(index: number, salt: number) {
  const x = Math.sin(index * 127.1 + salt * 311.7) * 43758.5453123;
  return x - Math.floor(x);
}

function Rays({
  count = 140,
  brightness = 1,
  speedBoost = 1,
}: {
  count?: number;
  brightness?: number;
  speedBoost?: number;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const rays = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      x: (seededUnit(i, 1) - 0.5) * 30,
      y: (seededUnit(i, 2) - 0.5) * 14,
      z: -1 - seededUnit(i, 3) * 4,
      speed: (0.06 + seededUnit(i, 4) * 0.18) * speedBoost,
      length: 0.6 + seededUnit(i, 5) * 2.4,
      thickness: 0.006 + seededUnit(i, 6) * 0.018,
      hue: seededUnit(i, 7),
    }));
  }, [count, speedBoost]);

  const colors = useMemo(() => {
    const arr = new Float32Array(count * 3);
    rays.forEach((ray, i) => {
      const color = new THREE.Color();
      if (ray.hue < 0.42) {
        color.setStyle("#14b8a6");
      } else if (ray.hue < 0.82) {
        color.setStyle("#00ffd5");
      } else {
        color.setStyle("#f8fafc");
      }
      color.toArray(arr, i * 3);
    });
    return arr;
  }, [rays, count]);

  useFrame(() => {
    if (!meshRef.current) return;

      rays.forEach((ray, i) => {
        ray.x += ray.speed;
        if (ray.x > 16) {
          ray.x = -16;
          ray.y = (seededUnit(i, 8) - 0.5) * 14;
          ray.speed = (0.06 + seededUnit(i, 9) * 0.18) * speedBoost;
        }

      dummy.position.set(ray.x, ray.y, ray.z);
      dummy.scale.set(ray.length, ray.thickness, ray.thickness);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial transparent opacity={Math.min(0.95, 0.56 * brightness)} vertexColors />
      <instancedBufferAttribute
        attach="geometry-attributes-color"
        args={[colors, 3]}
      />
    </instancedMesh>
  );
}

function GlowOrbs({
  count = 18,
  brightness = 1,
}: {
  count?: number;
  brightness?: number;
}) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel: number[] = [];
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (seededUnit(i, 10) - 0.5) * 24;
      pos[i * 3 + 1] = (seededUnit(i, 11) - 0.5) * 12;
      pos[i * 3 + 2] = -2 - seededUnit(i, 12) * 3;
      vel.push(0.01 + seededUnit(i, 13) * 0.04);
    }
    return [pos, vel];
  }, [count]);

  useFrame(() => {
    if (!pointsRef.current) return;
    const posArr = pointsRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      posArr[i * 3] += velocities[i];
      if (posArr[i * 3] > 14) {
        posArr[i * 3] = -14;
        posArr[i * 3 + 1] = (seededUnit(i, 14) - 0.5) * 12;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial color="#e2fff6" size={0.1 * brightness} transparent opacity={Math.min(1, 0.82 * brightness)} sizeAttenuation />
    </points>
  );
}

export default function PhotonRays({
  rayCount = 140,
  orbCount = 18,
  brightness = 1,
  speedBoost = 1,
}: {
  rayCount?: number;
  orbCount?: number;
  brightness?: number;
  speedBoost?: number;
}) {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ alpha: true, antialias: false }}
        style={{ background: "transparent" }}
      >
        <Rays count={rayCount} brightness={brightness} speedBoost={speedBoost} />
        <GlowOrbs count={orbCount} brightness={brightness} />
      </Canvas>
    </div>
  );
}
