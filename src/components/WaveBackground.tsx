"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function WaveMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color("#0d7a6e") },
      uColor2: { value: new THREE.Color("#00ffd5") },
      uColor3: { value: new THREE.Color("#14b8a6") },
    }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime * 0.3;
    }
  });

  const vertexShader = `
    uniform float uTime;
    varying vec2 vUv;
    varying float vElevation;

    void main() {
      vUv = uv;
      vec3 pos = position;

      float wave1 = sin(pos.x * 1.5 + uTime * 1.2) * 0.15;
      float wave2 = sin(pos.x * 0.8 + pos.y * 1.2 + uTime * 0.8) * 0.12;
      float wave3 = cos(pos.y * 1.0 + uTime * 0.6) * 0.08;
      float wave4 = sin(pos.x * 2.5 + pos.y * 0.5 + uTime * 1.5) * 0.05;

      pos.z += wave1 + wave2 + wave3 + wave4;
      vElevation = pos.z;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    uniform float uTime;
    varying vec2 vUv;
    varying float vElevation;

    void main() {
      float mixFactor = (vElevation + 0.3) * 1.2;
      vec3 color = mix(uColor1, uColor2, smoothstep(-0.1, 0.3, mixFactor));
      color = mix(color, uColor3, smoothstep(0.3, 0.6, vUv.x + sin(uTime * 0.2) * 0.1));

      float alpha = smoothstep(-0.2, 0.1, vElevation) * 0.35;
      alpha *= smoothstep(0.0, 0.3, vUv.y) * smoothstep(1.0, 0.7, vUv.y);

      gl_FragColor = vec4(color, alpha);
    }
  `;

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 3, 0, 0]} position={[0, -1, -2]}>
      <planeGeometry args={[14, 8, 128, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function WaveBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 60 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
      >
        <WaveMesh />
      </Canvas>
    </div>
  );
}
