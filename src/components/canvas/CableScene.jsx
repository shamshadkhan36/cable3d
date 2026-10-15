import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Sparkles, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { CableModel } from './CableModel';
import { ANIMATION_CONFIG } from '../../config/cableConfig';

function CameraRig({ scrollProgress = 0 }) {
  const targetCamPos = useRef(new THREE.Vector3());
  const targetLookAt = useRef(new THREE.Vector3());

  useFrame(({ camera }) => {
    const p = Math.max(0, Math.min(1, scrollProgress));

    // Smooth continuous camera coordinates
    targetCamPos.current.set(
      THREE.MathUtils.lerp(0.0, 0.6, p),
      THREE.MathUtils.lerp(1.2, 0.8, p),
      THREE.MathUtils.lerp(8.5, 7.2, p)
    );
    targetLookAt.current.set(
      THREE.MathUtils.lerp(0.0, 0.4, p),
      0,
      0
    );

    camera.position.lerp(targetCamPos.current, 0.08);
    camera.lookAt(targetLookAt.current);
  });

  return null;
}

export function CableScene({
  scrollProgress = 0,
  onUpdateLabels,
  activeLayerId,
  onSelectLayer,
  isMobile = false
}) {
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 1.2, 8.5], fov: isMobile ? 55 : 42 }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15
        }}
        className="touch-none"
      >
        {/* Cinematic Dual Industrial Lighting Setup */}
        {/* Soft dark ambient fill */}
        <ambientLight intensity={0.8} color="#0E131B" />

        {/* Dramatic Electric Blue Rim Light (Left / Top-back) */}
        <directionalLight
          position={[-9, 7, -5]}
          intensity={5.8}
          color="#168CFF"
        />
        <pointLight
          position={[-6, 3, 2]}
          intensity={2.8}
          color="#38BDF8"
          distance={16}
          decay={2}
        />

        {/* Warm Industrial Orange Rim Light (Right / Bottom-front) */}
        <directionalLight
          position={[9, -3, 5]}
          intensity={4.4}
          color="#FF7A18"
        />
        <pointLight
          position={[6, -2, 4]}
          intensity={3.2}
          color="#FB923C"
          distance={15}
          decay={2}
        />

        {/* Overhead Technical Key Light */}
        <directionalLight
          position={[1, 9, 7]}
          intensity={2.0}
          color="#E2E8F0"
        />

        {/* Camera movement controller */}
        <CameraRig scrollProgress={scrollProgress} />

        {/* 3D Cable Model */}
        <Suspense fallback={null}>
          <CableModel
            scrollProgress={scrollProgress}
            onUpdateLabels={onUpdateLabels}
            activeLayerId={activeLayerId}
            onSelectLayer={onSelectLayer}
          />

          {/* HDR Studio Reflections for metallic surfaces */}
          <Environment preset="city" environmentIntensity={0.65} />

          {/* Atmospheric micro dust particles */}
          <Sparkles
            count={isMobile ? 18 : 45}
            scale={[14, 8, 10]}
            size={isMobile ? 1.4 : 2.2}
            speed={0.4}
            opacity={0.35}
            color="#93C5FD"
          />

          {/* Photorealistic contact shadows on subtle floor */}
          <ContactShadows
            position={[0, -2.4, 0]}
            opacity={0.7}
            scale={18}
            blur={2.4}
            far={5}
            resolution={isMobile ? 256 : 512}
            color="#000000"
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
