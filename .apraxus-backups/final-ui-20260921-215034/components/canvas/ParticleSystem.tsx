'use client';

import React, { useMemo, useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

// GLSL Vertex Shader: Subtle deep background particle field
const vertexShader = `
  uniform float uTime;
  uniform float uProgress;
  uniform vec2 uMouse;
  
  attribute vec3 state2;
  attribute vec3 state3;
  attribute vec3 state4;
  attribute vec3 state5;
  attribute vec3 aColor;
  attribute float aRandom;

  varying vec3 vColor;
  varying float vAlpha;

  // Segmented smooth interpolation across 5 states
  vec3 getMorphPosition(float p) {
    vec3 p1 = position; // State 1: Sphere
    vec3 p2 = state2;   // State 2: Double Helix
    vec3 p3 = state3;   // State 3: Network Grid
    vec3 p4 = state4;   // State 4: Vortex
    vec3 p5 = state5;   // State 5: Galaxy

    if (p < 0.25) {
      float t = smoothstep(0.0, 0.25, p);
      return mix(p1, p2, t);
    } else if (p < 0.50) {
      float t = smoothstep(0.25, 0.50, p);
      return mix(p2, p3, t);
    } else if (p < 0.75) {
      float t = smoothstep(0.50, 0.75, p);
      return mix(p3, p4, t);
    } else {
      float t = smoothstep(0.75, 1.0, p);
      return mix(p4, p5, t);
    }
  }

  void main() {
    vColor = aColor;
    vec3 pos = getMorphPosition(uProgress);

    // Deep background positioning: push z back so it never overlaps text cards
    pos.z -= 2.5;

    // Controlled slow ambient oscillation
    float slowTime = uTime * 0.2;
    pos.x += sin(slowTime + pos.y * 1.5 + aRandom * 6.28) * 0.05;
    pos.y += cos(slowTime + pos.x * 1.5 + aRandom * 6.28) * 0.05;

    // Subtle gentle cursor repulsion
    vec3 mouse3D = vec3(uMouse.x * 4.0, uMouse.y * 3.0, -2.5);
    float dist = distance(pos, mouse3D);
    if (dist < 2.5) {
      vec3 dir = normalize(pos - mouse3D);
      float force = (2.5 - dist) / 2.5;
      pos += dir * force * 0.5;
    }

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Small, refined, non-distracting point size
    gl_PointSize = (6.5 * (1.0 + aRandom * 0.5)) / -mvPosition.z;
    
    // Soft atmospheric transparency
    vAlpha = smoothstep(28.0, 3.0, -mvPosition.z);
  }
`;

// GLSL Fragment Shader: Soft subtle glow points
const fragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = length(coord);

    if (dist > 0.5) discard;

    // Soft Gaussian falloff
    float alpha = smoothstep(0.5, 0.08, dist) * vAlpha;
    gl_FragColor = vec4(vColor, alpha * 0.65);
  }
`;

export const ParticleSystem: React.FC<{ progress?: number }> = ({ progress = 0 }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const [particleCount, setParticleCount] = useState(25000);

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches || window.matchMedia('(pointer: coarse)').matches;
    if (isMobile) {
      setParticleCount(12000);
    } else {
      setParticleCount(28000);
    }
  }, []);

  const { positions, state2, state3, state4, state5, colors, randoms } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const s2 = new Float32Array(particleCount * 3);
    const s3 = new Float32Array(particleCount * 3);
    const s4 = new Float32Array(particleCount * 3);
    const s5 = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    const rnd = new Float32Array(particleCount);

    const cIndigo = new THREE.Color('#7B5CFA');
    const cViolet = new THREE.Color('#4F2CE0');
    const cCyan = new THREE.Color('#38E8F8');
    const cWhite = new THREE.Color('#E2E8F0');

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      rnd[i] = Math.random();

      // State 1: Sphere
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 2.5;
      pos[i3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = r * Math.cos(phi);

      // State 2: Double Helix
      const tHelix = (i / particleCount) * Math.PI * 12.0 - Math.PI * 6.0;
      const strand = i % 2 === 0 ? 1 : -1;
      const radiusHelix = 1.8 + (Math.random() - 0.5) * 0.3;
      s2[i3] = Math.cos(tHelix + (strand * Math.PI)) * radiusHelix;
      s2[i3 + 1] = (tHelix / (Math.PI * 6.0)) * 3.8;
      s2[i3 + 2] = Math.sin(tHelix + (strand * Math.PI)) * radiusHelix;

      // State 3: Network Grid
      const gridX = ((i % 160) / 160 - 0.5) * 9.0;
      const gridZ = (Math.floor(i / 160) / (particleCount / 160) - 0.5) * 9.0;
      const gridY = Math.sin(gridX * 1.2) * Math.cos(gridZ * 1.2) * 0.7;
      s3[i3] = gridX;
      s3[i3 + 1] = gridY;
      s3[i3 + 2] = gridZ;

      // State 4: Vortex
      const vortexAngle = Math.sqrt(i / particleCount) * Math.PI * 16.0;
      const vortexRadius = Math.sqrt(i / particleCount) * 4.5;
      s4[i3] = Math.cos(vortexAngle) * vortexRadius;
      s4[i3 + 1] = -Math.pow(1.0 - (vortexRadius / 4.5), 2.0) * 1.8;
      s4[i3 + 2] = Math.sin(vortexAngle) * vortexRadius;

      // State 5: Galaxy
      const galaxyArms = 3;
      const armIndex = i % galaxyArms;
      const galaxyDist = Math.pow(Math.random(), 1.4) * 4.8;
      const galaxyAngle = (armIndex * ((2 * Math.PI) / galaxyArms)) + (galaxyDist * 1.2);
      s5[i3] = Math.cos(galaxyAngle) * galaxyDist;
      s5[i3 + 1] = (Math.random() - 0.5) * 0.6;
      s5[i3 + 2] = Math.sin(galaxyAngle) * galaxyDist;

      // Color
      let chosenColor = cIndigo;
      if (rnd[i] > 0.88) chosenColor = cWhite;
      else if (rnd[i] > 0.65) chosenColor = cCyan;
      else if (rnd[i] > 0.35) chosenColor = cViolet;

      col[i3] = chosenColor.r;
      col[i3 + 1] = chosenColor.g;
      col[i3 + 2] = chosenColor.b;
    }

    return { positions: pos, state2: s2, state3: s3, state4: s4, state5: s5, colors: col, randoms: rnd };
  }, [particleCount]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }),
    []
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!materialRef.current) return;
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      materialRef.current.uniforms.uMouse.value.set(x, y);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;
      materialRef.current.uniforms.uProgress.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uProgress.value,
        progress,
        0.06
      );
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.015;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry key={particleCount}>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-state2" args={[state2, 3]} />
        <bufferAttribute attach="attributes-state3" args={[state3, 3]} />
        <bufferAttribute attach="attributes-state4" args={[state4, 3]} />
        <bufferAttribute attach="attributes-state5" args={[state5, 3]} />
        <bufferAttribute attach="attributes-aColor" args={[colors, 3]} />
        <bufferAttribute attach="attributes-aRandom" args={[randoms, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};
