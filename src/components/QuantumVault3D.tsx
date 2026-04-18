"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const SURFACE_PARTICLES = 5000;
const FLYING_PARTICLES = 3000;
const W = 1.0;
const H = 1.15;
const D = 0.55;

/* ── Wireframe: full vault skeleton as line segments ── */
function createWireframe(): THREE.BufferGeometry {
  const v: number[] = [];
  const c: [number, number, number][] = [
    [-W, -H, D],
    [W, -H, D],
    [W, H, D],
    [-W, H, D],
    [-W, -H, -D],
    [W, -H, -D],
    [W, H, -D],
    [-W, H, -D],
  ];
  const edges: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [3, 0],
    [4, 5], [5, 6], [6, 7], [7, 4],
    [0, 4], [1, 5], [2, 6], [3, 7],
  ];
  for (const [a, b] of edges) v.push(...c[a], ...c[b]);

  // Front panel inset
  const ins = 0.15;
  const pw = W - ins, ph = H - ins, pz = D + 0.01;
  v.push(-pw, -ph, pz, pw, -ph, pz);
  v.push(pw, -ph, pz, pw, ph, pz);
  v.push(pw, ph, pz, -pw, ph, pz);
  v.push(-pw, ph, pz, -pw, -ph, pz);

  // Dial circles
  const dz = D + 0.03;
  const segs = 48;
  for (const r of [0.42, 0.3, 0.15]) {
    for (let i = 0; i < segs; i++) {
      const a1 = (i / segs) * Math.PI * 2;
      const a2 = ((i + 1) / segs) * Math.PI * 2;
      v.push(Math.cos(a1) * r, Math.sin(a1) * r, dz);
      v.push(Math.cos(a2) * r, Math.sin(a2) * r, dz);
    }
  }

  // 24 tick marks
  for (let i = 0; i < 24; i++) {
    const a = (i / 24) * Math.PI * 2;
    v.push(Math.cos(a) * 0.44, Math.sin(a) * 0.44, dz);
    v.push(Math.cos(a) * 0.5, Math.sin(a) * 0.5, dz);
  }

  // Hinges on right
  const hx = W + 0.03;
  for (const hy of [0.55, -0.55]) {
    v.push(hx, hy - 0.12, -0.07, hx, hy + 0.12, -0.07);
    v.push(hx, hy + 0.12, -0.07, hx, hy + 0.12, 0.07);
    v.push(hx, hy + 0.12, 0.07, hx, hy - 0.12, 0.07);
    v.push(hx, hy - 0.12, 0.07, hx, hy - 0.12, -0.07);
  }

  // Cross braces
  v.push(-W * 0.5, H, D, -W * 0.5, H, -D);
  v.push(W * 0.5, H, D, W * 0.5, H, -D);
  v.push(-W * 0.5, -H, D, -W * 0.5, -H, -D);
  v.push(W * 0.5, -H, D, W * 0.5, -H, -D);

  const geom = new THREE.BufferGeometry();
  geom.setAttribute("position", new THREE.Float32BufferAttribute(v, 3));
  return geom;
}

/* ── Random point on the vault surface ── */
function randomSurface(): [number, number, number] {
  const f = Math.floor(Math.random() * 6);
  switch (f) {
    case 0: return [(Math.random() - 0.5) * 2 * W, (Math.random() - 0.5) * 2 * H, D];
    case 1: return [(Math.random() - 0.5) * 2 * W, (Math.random() - 0.5) * 2 * H, -D];
    case 2: return [W, (Math.random() - 0.5) * 2 * H, (Math.random() - 0.5) * 2 * D];
    case 3: return [-W, (Math.random() - 0.5) * 2 * H, (Math.random() - 0.5) * 2 * D];
    case 4: return [(Math.random() - 0.5) * 2 * W, H, (Math.random() - 0.5) * 2 * D];
    default: return [(Math.random() - 0.5) * 2 * W, -H, (Math.random() - 0.5) * 2 * D];
  }
}

/* ── Surface particles — biased to one half for dots-vs-lines look ── */
function generateSurface(count: number) {
  const pos = new Float32Array(count * 3);
  const col = new Float32Array(count * 3);
  const jit = () => (Math.random() - 0.5) * 0.015;

  const dark = new THREE.Color("#0d7a6e");
  const teal = new THREE.Color("#14b8a6");
  const bright = new THREE.Color("#2dd4bf");
  const neon = new THREE.Color("#00ffd5");

  const edgeN = Math.floor(count * 0.25);
  const faceN = Math.floor(count * 0.35);
  const dialN = Math.floor(count * 0.25);
  const restN = count - edgeN - faceN - dialN;

  let idx = 0;

  // Edges — biased toward right half (x > 0) for particle density
  for (let i = 0; i < edgeN; i++) {
    const edge = Math.floor(Math.random() * 12);
    const t = Math.random();
    let x = 0, y = 0, z = 0;
    switch (edge) {
      case 0:  x = -W + t * 2 * W; y = H; z = D; break;
      case 1:  x = -W + t * 2 * W; y = -H; z = D; break;
      case 2:  x = -W; y = -H + t * 2 * H; z = D; break;
      case 3:  x = W; y = -H + t * 2 * H; z = D; break;
      case 4:  x = -W + t * 2 * W; y = H; z = -D; break;
      case 5:  x = -W + t * 2 * W; y = -H; z = -D; break;
      case 6:  x = -W; y = -H + t * 2 * H; z = -D; break;
      case 7:  x = W; y = -H + t * 2 * H; z = -D; break;
      case 8:  x = -W; y = H; z = -D + t * 2 * D; break;
      case 9:  x = W; y = H; z = -D + t * 2 * D; break;
      case 10: x = -W; y = -H; z = -D + t * 2 * D; break;
      case 11: x = W; y = -H; z = -D + t * 2 * D; break;
    }
    // Bias: particles denser on the right half (z > 0 in local space)
    const density = (z + D) / (2 * D);
    if (Math.random() > Math.max(density, 0.12)) {
      x = (Math.random() - 0.5) * 2 * W;
      y = (Math.random() - 0.5) * 2 * H;
      z = D * (0.3 + Math.random() * 0.7);
    }
    pos[idx * 3] = x + jit();
    pos[idx * 3 + 1] = y + jit();
    pos[idx * 3 + 2] = z + jit();
    const c = bright.clone().lerp(neon, Math.random());
    c.toArray(col, idx * 3);
    idx++;
  }

  // Face particles
  for (let i = 0; i < faceN; i++) {
    let [x, y, z] = randomSurface();
    const density = (z + D) / (2 * D);
    if (Math.random() > Math.max(density, 0.08)) {
      [x, y, z] = randomSurface();
      z = Math.abs(z);
    }
    pos[idx * 3] = x + jit();
    pos[idx * 3 + 1] = y + jit();
    pos[idx * 3 + 2] = z + jit();
    const c = dark.clone().lerp(teal, Math.random() * 0.7);
    c.toArray(col, idx * 3);
    idx++;
  }

  // Dial particles (front face center — always present)
  const dialZ = D + 0.03;
  for (let i = 0; i < dialN; i++) {
    const r = Math.random();
    const angle = Math.random() * Math.PI * 2;
    let radius: number;
    if (r < 0.35) radius = 0.42 + (Math.random() - 0.5) * 0.03;
    else if (r < 0.55) radius = 0.3 + (Math.random() - 0.5) * 0.025;
    else if (r < 0.7) radius = 0.15 + (Math.random() - 0.5) * 0.04;
    else if (r < 0.85) radius = 0.04 * Math.random();
    else {
      const tick = Math.floor(Math.random() * 24);
      const ta = (tick / 24) * Math.PI * 2;
      pos[idx * 3] = Math.cos(ta) * (0.44 + Math.random() * 0.06);
      pos[idx * 3 + 1] = Math.sin(ta) * (0.44 + Math.random() * 0.06);
      pos[idx * 3 + 2] = dialZ;
      const c = teal.clone().lerp(neon, Math.random() * 0.8 + 0.2);
      c.toArray(col, idx * 3);
      idx++;
      continue;
    }
    pos[idx * 3] = Math.cos(angle) * radius;
    pos[idx * 3 + 1] = Math.sin(angle) * radius;
    pos[idx * 3 + 2] = dialZ + (r > 0.55 ? 0.02 : 0);
    const c = teal.clone().lerp(neon, Math.random() * 0.8 + 0.2);
    c.toArray(col, idx * 3);
    idx++;
  }

  // Panel outline + hinges
  const panelW = W - 0.15, panelH = H - 0.15;
  for (let i = 0; i < restN; i++) {
    if (i < restN * 0.6) {
      const side = Math.floor(Math.random() * 4);
      const t = Math.random();
      let x = 0, y = 0;
      switch (side) {
        case 0: x = -panelW + t * 2 * panelW; y = panelH; break;
        case 1: x = -panelW + t * 2 * panelW; y = -panelH; break;
        case 2: x = -panelW; y = -panelH + t * 2 * panelH; break;
        case 3: x = panelW; y = -panelH + t * 2 * panelH; break;
      }
      pos[idx * 3] = x + jit();
      pos[idx * 3 + 1] = y + jit();
      pos[idx * 3 + 2] = D + 0.01;
    } else {
      const hx = W + 0.03;
      const hy = Math.random() > 0.5 ? 0.55 : -0.55;
      pos[idx * 3] = hx + Math.random() * 0.06;
      pos[idx * 3 + 1] = hy + (Math.random() - 0.5) * 0.25;
      pos[idx * 3 + 2] = (Math.random() - 0.5) * 0.15;
    }
    const c = dark.clone().lerp(bright, Math.random() * 0.5);
    c.toArray(col, idx * 3);
    idx++;
  }

  return { positions: pos, colors: col };
}

/* ── Flying / colliding particles — spawn far, crash into vault ── */
function spawnFlyer(
  i: number,
  pos: Float32Array,
  vel: Float32Array,
  tgt: Float32Array,
  spd: Float32Array,
  stagger = false,
) {
  const i3 = i * 3;
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos(2 * Math.random() - 1);
  const dist = 4 + Math.random() * 6;
  const sx = Math.sin(phi) * Math.cos(theta) * dist;
  const sy = Math.sin(phi) * Math.sin(theta) * dist;
  const sz = Math.cos(phi) * dist;

  const [tx, ty, tz] = randomSurface();
  tgt[i3] = tx;
  tgt[i3 + 1] = ty;
  tgt[i3 + 2] = tz;

  spd[i] = 3 + Math.random() * 5;
  const dx = tx - sx, dy = ty - sy, dz = tz - sz;
  const len = Math.sqrt(dx * dx + dy * dy + dz * dz);
  vel[i3] = (dx / len) * spd[i];
  vel[i3 + 1] = (dy / len) * spd[i];
  vel[i3 + 2] = (dz / len) * spd[i];

  const prog = stagger ? Math.random() : 0;
  pos[i3] = sx + dx * prog;
  pos[i3 + 1] = sy + dy * prog;
  pos[i3 + 2] = sz + dz * prog;
}

function initFlying(count: number) {
  const pos = new Float32Array(count * 3);
  const vel = new Float32Array(count * 3);
  const tgt = new Float32Array(count * 3);
  const col = new Float32Array(count * 3);
  const spd = new Float32Array(count);

  const neon = new THREE.Color("#00ffd5");
  const teal = new THREE.Color("#14b8a6");
  const bright = new THREE.Color("#2dd4bf");
  const palette = [teal, bright, neon];

  for (let i = 0; i < count; i++) {
    spawnFlyer(i, pos, vel, tgt, spd, true);
    const c = palette[Math.floor(Math.random() * 3)].clone();
    c.toArray(col, i * 3);
  }
  return { pos, vel, tgt, col, spd };
}

/* ── Scene: spinning vault + wireframe + surface dots + flying dots ── */
function VaultScene() {
  const groupRef = useRef<THREE.Group>(null);
  const flyingRef = useRef<THREE.Points>(null);

  const wireGeom = useMemo(() => createWireframe(), []);
  const surfData = useMemo(() => generateSurface(SURFACE_PARTICLES), []);
  const flyData = useMemo(() => initFlying(FLYING_PARTICLES), []);

  useFrame((_state, delta) => {
    if (!groupRef.current) return;
    // Continuous spin
    groupRef.current.rotation.y += delta * 0.25;

    // Animate flying particles
    if (!flyingRef.current) return;
    const posArr = flyingRef.current.geometry.attributes.position
      .array as Float32Array;

    for (let i = 0; i < FLYING_PARTICLES; i++) {
      const i3 = i * 3;
      posArr[i3] += flyData.vel[i3] * delta;
      posArr[i3 + 1] += flyData.vel[i3 + 1] * delta;
      posArr[i3 + 2] += flyData.vel[i3 + 2] * delta;

      const dx = posArr[i3] - flyData.tgt[i3];
      const dy = posArr[i3 + 1] - flyData.tgt[i3 + 1];
      const dz = posArr[i3 + 2] - flyData.tgt[i3 + 2];
      if (dx * dx + dy * dy + dz * dz < 0.08) {
        spawnFlyer(i, posArr, flyData.vel, flyData.tgt, flyData.spd);
      }
    }
    flyingRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group ref={groupRef} rotation={[0.1, -0.55, 0]}>
      {/* Wireframe skeleton — the "line" half */}
      <lineSegments geometry={wireGeom}>
        <lineBasicMaterial color="#14b8a6" transparent opacity={0.45} />
      </lineSegments>

      {/* Surface dots — the "particle" half */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[surfData.positions, 3]}
            count={SURFACE_PARTICLES}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[surfData.colors, 3]}
            count={SURFACE_PARTICLES}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.018}
          transparent
          opacity={0.85}
          vertexColors
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      {/* Flying dots crashing into the vault */}
      <points ref={flyingRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[flyData.pos, 3]}
            count={FLYING_PARTICLES}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[flyData.col, 3]}
            count={FLYING_PARTICLES}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.013}
          transparent
          opacity={0.6}
          vertexColors
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export default function QuantumVault3D() {
  return (
    <div className="w-full h-full" style={{ minHeight: "400px" }}>
      <Canvas
        camera={{ position: [0, 0.3, 3.5], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <VaultScene />
      </Canvas>
    </div>
  );
}
