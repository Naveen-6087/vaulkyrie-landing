"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Rays({ count = 80 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const rays = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 30,
      y: (Math.random() - 0.5) * 14,
      z: -1 - Math.random() * 4,
      speed: 0.06 + Math.random() * 0.18,
      length: 0.4 + Math.random() * 2.0,
      thickness: 0.004 + Math.random() * 0.012,
      hue: Math.random(),
    }));
  }, [count]);

  const colors = useMemo(() => {
    const arr = new Float32Array(count * 3);
    rays.forEach((ray, i) => {
      const color = new THREE.Color();
      if (ray.hue < 0.5) {
        color.setStyle("#14b8a6");
      } else if (ray.hue < 0.8) {
        color.setStyle("#00ffd5");
      } else {
        color.setStyle("#2dd4bf");
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
        ray.y = (Math.random() - 0.5) * 14;
        ray.speed = 0.06 + Math.random() * 0.18;
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
      <meshBasicMaterial transparent opacity={0.5} vertexColors />
      <instancedBufferAttribute
        attach="geometry-attributes-color"
        args={[colors, 3]}
      />
    </instancedMesh>
  );
}

function GlowOrbs({ count = 12 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel: number[] = [];
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 24;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = -2 - Math.random() * 3;
      vel.push(0.01 + Math.random() * 0.04);
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
        posArr[i * 3 + 1] = (Math.random() - 0.5) * 12;
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
      <pointsMaterial color="#00ffd5" size={0.08} transparent opacity={0.8} sizeAttenuation />
    </points>
  );
}

export default function PhotonRays() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ alpha: true, antialias: false }}
        style={{ background: "transparent" }}
      >
        <Rays />
        <GlowOrbs />
      </Canvas>
    </div>
  );
}
