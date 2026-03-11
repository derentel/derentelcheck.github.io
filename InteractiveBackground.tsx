import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useMemo, Suspense, useCallback, useEffect } from 'react';
import * as THREE from 'three';

function InteractiveParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const count = 600;
  const { viewport } = useThree();

  const [positions, originalPositions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const orig = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 16;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 8;
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      orig[i * 3] = x;
      orig[i * 3 + 1] = y;
      orig[i * 3 + 2] = z;
    }
    return [pos, orig];
  }, []);

  const handlePointerMove = useCallback((e: PointerEvent) => {
    mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }, []);

  useEffect(() => {
    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [handlePointerMove]);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const geo = pointsRef.current.geometry;
    const pos = geo.attributes.position.array as Float32Array;
    const t = clock.getElapsedTime();
    const mx = mouseRef.current.x * viewport.width * 0.5;
    const my = mouseRef.current.y * viewport.height * 0.5;

    for (let i = 0; i < count; i++) {
      const ox = originalPositions[i * 3];
      const oy = originalPositions[i * 3 + 1];
      const oz = originalPositions[i * 3 + 2];

      // Gentle drift
      const drift = Math.sin(t * 0.3 + i * 0.1) * 0.08;

      // Mouse repulsion
      const dx = ox - mx;
      const dy = oy - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const repulse = dist < 2 ? (2 - dist) * 0.4 : 0;
      const angle = Math.atan2(dy, dx);

      pos[i * 3] = ox + Math.cos(angle) * repulse + drift;
      pos[i * 3 + 1] = oy + Math.sin(angle) * repulse + drift * 0.5;
      pos[i * 3 + 2] = oz + Math.sin(t * 0.2 + i) * 0.05;
    }
    geo.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#00E5FF" size={0.02} transparent opacity={0.35} sizeAttenuation />
    </points>
  );
}

function GridPlane() {
  const meshRef = useRef<THREE.GridHelper>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.position.z = -(clock.getElapsedTime() * 0.15) % 2;
    }
  });

  return (
    <gridHelper
      ref={meshRef}
      args={[40, 60, '#00E5FF', '#00E5FF']}
      position={[0, -4, 0]}
      rotation={[0, 0, 0]}
      material-transparent
      material-opacity={0.04}
    />
  );
}

function WireframeGeo() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.08;
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.05) * 0.15;
    }
  });

  return (
    <mesh ref={meshRef} position={[4, 0.5, -2]}>
      <icosahedronGeometry args={[1.8, 2]} />
      <meshBasicMaterial color="#00E5FF" wireframe transparent opacity={0.06} />
    </mesh>
  );
}

export default function InteractiveBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <div className="absolute inset-0 pointer-events-auto">
        <Canvas camera={{ position: [0, 0, 7], fov: 50 }} dpr={[1, 1.5]}>
          <Suspense fallback={null}>
            <InteractiveParticles />
            <WireframeGeo />
            <GridPlane />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}
