import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Sparkles, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { CableModel } from './CableModel';
import { CABLE_ENVIRONMENTS } from '../../config/cableConfig';

function CameraRig({ explodedProgress = 0, isMobile = false }) {
  const currentCamPos = useRef(new THREE.Vector3(0, 0.4, isMobile ? 12.5 : 11.5));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const targetCamPos = useRef(new THREE.Vector3());
  const targetLookAt = useRef(new THREE.Vector3());

  const DAMP_LAMBDA = 4.8;

  useFrame(({ camera }, delta) => {
    const dt = Math.min(delta, 0.1);
    const p = Math.max(0, Math.min(1, explodedProgress || 0));

    // Subtle camera push-in during explosion to reveal conductor detail
    const camZ = THREE.MathUtils.lerp(isMobile ? 12.5 : 11.5, isMobile ? 11.8 : 10.8, p);
    const camY = THREE.MathUtils.lerp(0.4, 0.32, p);

    targetCamPos.current.set(0.0, camY, camZ);
    targetLookAt.current.set(0.0, 0.0, 0.0);

    currentCamPos.current.x = THREE.MathUtils.damp(currentCamPos.current.x, targetCamPos.current.x, DAMP_LAMBDA, dt);
    currentCamPos.current.y = THREE.MathUtils.damp(currentCamPos.current.y, targetCamPos.current.y, DAMP_LAMBDA, dt);
    currentCamPos.current.z = THREE.MathUtils.damp(currentCamPos.current.z, targetCamPos.current.z, DAMP_LAMBDA, dt);

    currentLookAt.current.x = THREE.MathUtils.damp(currentLookAt.current.x, targetLookAt.current.x, DAMP_LAMBDA, dt);
    currentLookAt.current.y = THREE.MathUtils.damp(currentLookAt.current.y, targetLookAt.current.y, DAMP_LAMBDA, dt);
    currentLookAt.current.z = THREE.MathUtils.damp(currentLookAt.current.z, targetLookAt.current.z, DAMP_LAMBDA, dt);

    camera.position.copy(currentCamPos.current);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}

function DynamicLighting({ activeEnvIndex = 3 }) {
  const ambientRef = useRef();
  const topRimRef = useRef();
  const bottomRimRef = useRef();
  const keyLightRef = useRef();

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1);
    const envIdx = typeof activeEnvIndex === 'number' ? Math.min(3, Math.max(0, activeEnvIndex)) : 3;
    const currentEnv = CABLE_ENVIRONMENTS[envIdx] || CABLE_ENVIRONMENTS[3];

    if (ambientRef.current) {
      ambientRef.current.color.lerp(new THREE.Color(currentEnv.ambientColor), dt * 3.5);
      ambientRef.current.intensity = THREE.MathUtils.damp(ambientRef.current.intensity, currentEnv.ambientIntensity + 0.4, 3.5, dt);
    }

    if (topRimRef.current) {
      topRimRef.current.color.lerp(new THREE.Color(currentEnv.topRimColor), dt * 3.5);
      topRimRef.current.intensity = THREE.MathUtils.damp(topRimRef.current.intensity, currentEnv.topRimIntensity, 3.5, dt);
    }

    if (bottomRimRef.current) {
      bottomRimRef.current.color.lerp(new THREE.Color(currentEnv.bottomRimColor), dt * 3.5);
      bottomRimRef.current.intensity = THREE.MathUtils.damp(bottomRimRef.current.intensity, currentEnv.bottomRimIntensity, 3.5, dt);
    }

    if (keyLightRef.current) {
      keyLightRef.current.color.lerp(new THREE.Color(currentEnv.keyColor), dt * 3.5);
      keyLightRef.current.intensity = THREE.MathUtils.damp(keyLightRef.current.intensity, currentEnv.keyIntensity + 1.2, 3.5, dt);
    }
  });

  return (
    <>
      <ambientLight ref={ambientRef} intensity={1.3} color="#2A384C" />
      <directionalLight
        ref={keyLightRef}
        position={[3, 8, 9]}
        intensity={4.2}
        color="#F8FAFC"
      />
      <directionalLight
        position={[0, 1, 8]}
        intensity={2.0}
        color="#E2E8F0"
      />
      <directionalLight
        ref={topRimRef}
        position={[-5, 7, -3]}
        intensity={7.5}
        color="#0099FF"
      />
      <directionalLight
        ref={bottomRimRef}
        position={[3, -6, 3]}
        intensity={6.0}
        color="#FF7A18"
      />
    </>
  );
}

export function CableScene({
  scrollProgress = 0,
  explodedProgress = 0,
  envProgress = 0,
  activeEnvIndex = 3,
  isMobile = false,
  onUpdateLabels
}) {
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0.4, isMobile ? 12.5 : 11.5], fov: isMobile ? 48 : 36 }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.25
        }}
        className="touch-none"
      >
        <DynamicLighting activeEnvIndex={activeEnvIndex} />

        <CameraRig explodedProgress={explodedProgress} isMobile={isMobile} />

        <Suspense fallback={null}>
          <CableModel
            scrollProgress={scrollProgress}
            explodedProgress={explodedProgress}
            envProgress={envProgress}
            activeEnvIndex={activeEnvIndex}
            isMobile={isMobile}
            onUpdateLabels={onUpdateLabels}
          />

          <Environment preset="city" environmentIntensity={0.85} />

          <Sparkles
            count={isMobile ? 12 : 28}
            scale={[16, 9, 10]}
            size={isMobile ? 1.0 : 1.6}
            speed={0.2}
            opacity={0.25}
            color="#93C5FD"
          />

          <ContactShadows
            position={[0, -2.4, 0]}
            opacity={0.65}
            scale={18}
            blur={2.0}
            far={5}
            resolution={isMobile ? 512 : 1024}
            color="#000000"
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
