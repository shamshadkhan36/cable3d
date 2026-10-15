import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Sparkles, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { CableModel } from './CableModel';
import { CABLE_ENVIRONMENTS } from '../../config/cableConfig';

function CameraRig({ scrollProgress = 0 }) {
  const currentCamPos = useRef(new THREE.Vector3(0, 0.6, 12.0));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const targetCamPos = useRef(new THREE.Vector3());
  const targetLookAt = useRef(new THREE.Vector3());

  useFrame(({ camera }, delta) => {
    const dt = Math.min(delta, 0.1);
    const p = Math.max(0, Math.min(1, scrollProgress));

    const smootherStep = (edge0, edge1, x) => {
      if (x <= edge0) return 0;
      if (x >= edge1) return 1;
      const t = (x - edge0) / (edge1 - edge0);
      return t * t * t * (t * (t * 6 - 15) + 10);
    };

    // Generous, pulled-back camera coordinates so cable is 100% visible and never cropped
    if (p <= 0.12) {
      // Hero position: well-framed, balanced, fully visible
      targetCamPos.current.set(0.0, 0.4, 11.5);
      targetLookAt.current.set(0.0, 0.0, 0.0);
    } else if (p <= 0.28) {
      // Rotation phase: slight push-in
      const t = smootherStep(0.12, 0.28, p);
      targetCamPos.current.set(
        THREE.MathUtils.lerp(0.0, 0.2, t),
        THREE.MathUtils.lerp(0.4, 0.3, t),
        THREE.MathUtils.lerp(11.5, 11.0, t)
      );
      targetLookAt.current.set(
        THREE.MathUtils.lerp(0.0, 0.1, t),
        0.0,
        0.0
      );
    } else if (p <= 0.58) {
      // Exploded view: wide framing so all 5 separating components are visible at once
      const t = smootherStep(0.28, 0.58, p);
      targetCamPos.current.set(
        THREE.MathUtils.lerp(0.2, 0.3, t),
        THREE.MathUtils.lerp(0.3, 0.2, t),
        THREE.MathUtils.lerp(11.0, 11.2, t)
      );
      targetLookAt.current.set(
        THREE.MathUtils.lerp(0.1, 0.2, t),
        0.0,
        0.0
      );
    } else if (p <= 0.68) {
      // Macro internal inspection: detailed inspection without clipping
      const t = smootherStep(0.58, 0.68, p);
      targetCamPos.current.set(
        THREE.MathUtils.lerp(0.3, 1.4, t),
        THREE.MathUtils.lerp(0.2, 0.3, t),
        THREE.MathUtils.lerp(11.2, 7.8, t)
      );
      targetLookAt.current.set(
        THREE.MathUtils.lerp(0.2, 1.5, t),
        THREE.MathUtils.lerp(0.0, 0.15, t),
        THREE.MathUtils.lerp(0.0, 0.25, t)
      );
    } else if (p <= 0.78) {
      // Reassembly: smooth pull-back as components return to monolithic position
      const t = smootherStep(0.68, 0.78, p);
      targetCamPos.current.set(
        THREE.MathUtils.lerp(1.4, 0.0, t),
        THREE.MathUtils.lerp(0.3, 0.4, t),
        THREE.MathUtils.lerp(7.8, 11.5, t)
      );
      targetLookAt.current.set(
        THREE.MathUtils.lerp(1.5, 0.0, t),
        THREE.MathUtils.lerp(0.15, 0.0, t),
        THREE.MathUtils.lerp(0.25, 0.0, t)
      );
    } else if (p <= 0.90) {
      // Environments: stable cinematic inspection
      const t = smootherStep(0.78, 0.90, p);
      targetCamPos.current.set(
        THREE.MathUtils.lerp(0.0, 0.15, t),
        THREE.MathUtils.lerp(0.4, 0.35, t),
        THREE.MathUtils.lerp(11.5, 11.2, t)
      );
      targetLookAt.current.set(0.0, 0.0, 0.0);
    } else if (p <= 0.96) {
      // Product categories
      targetCamPos.current.set(-0.1, 0.35, 11.2);
      targetLookAt.current.set(0.1, 0.0, 0.0);
    } else {
      // CTA Section: cable framed gracefully to the right, opening left side for CTA
      const t = smootherStep(0.96, 1.0, p);
      targetCamPos.current.set(
        THREE.MathUtils.lerp(-0.1, -0.65, t),
        THREE.MathUtils.lerp(0.35, 0.2, t),
        THREE.MathUtils.lerp(11.2, 11.0, t)
      );
      targetLookAt.current.set(
        THREE.MathUtils.lerp(0.1, 0.35, t),
        -0.05,
        0.0
      );
    }

    currentCamPos.current.x = THREE.MathUtils.damp(currentCamPos.current.x, targetCamPos.current.x, 5.5, dt);
    currentCamPos.current.y = THREE.MathUtils.damp(currentCamPos.current.y, targetCamPos.current.y, 5.5, dt);
    currentCamPos.current.z = THREE.MathUtils.damp(currentCamPos.current.z, targetCamPos.current.z, 5.5, dt);

    currentLookAt.current.x = THREE.MathUtils.damp(currentLookAt.current.x, targetLookAt.current.x, 5.5, dt);
    currentLookAt.current.y = THREE.MathUtils.damp(currentLookAt.current.y, targetLookAt.current.y, 5.5, dt);
    currentLookAt.current.z = THREE.MathUtils.damp(currentLookAt.current.z, targetLookAt.current.z, 5.5, dt);

    camera.position.copy(currentCamPos.current);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}

function DynamicLighting({ scrollProgress = 0, activeEnvIndex = null }) {
  const ambientRef = useRef();
  const topRimRef = useRef();
  const bottomRimRef = useRef();
  const keyLightRef = useRef();

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1);
    const p = Math.max(0, Math.min(1, scrollProgress));

    let envIdx = 3;

    if (activeEnvIndex !== null) {
      envIdx = activeEnvIndex;
    } else if (p >= 0.78 && p <= 0.90) {
      const envProgress = (p - 0.78) / (0.90 - 0.78);
      envIdx = Math.min(3, Math.floor(envProgress * 4));
    }

    const currentEnv = CABLE_ENVIRONMENTS[envIdx] || CABLE_ENVIRONMENTS[3];

    if (ambientRef.current) {
      ambientRef.current.color.lerp(new THREE.Color(currentEnv.ambientColor), dt * 4.0);
      ambientRef.current.intensity = THREE.MathUtils.damp(ambientRef.current.intensity, currentEnv.ambientIntensity + 0.4, 4.0, dt);
    }

    if (topRimRef.current) {
      topRimRef.current.color.lerp(new THREE.Color(currentEnv.topRimColor), dt * 4.0);
      topRimRef.current.intensity = THREE.MathUtils.damp(topRimRef.current.intensity, currentEnv.topRimIntensity, 4.0, dt);
    }

    if (bottomRimRef.current) {
      bottomRimRef.current.color.lerp(new THREE.Color(currentEnv.bottomRimColor), dt * 4.0);
      bottomRimRef.current.intensity = THREE.MathUtils.damp(bottomRimRef.current.intensity, currentEnv.bottomRimIntensity, 4.0, dt);
    }

    if (keyLightRef.current) {
      keyLightRef.current.color.lerp(new THREE.Color(currentEnv.keyColor), dt * 4.0);
      keyLightRef.current.intensity = THREE.MathUtils.damp(keyLightRef.current.intensity, currentEnv.keyIntensity + 1.2, 4.0, dt);
    }
  });

  return (
    <>
      {/* Rich ambient fill for clear surface contours */}
      <ambientLight ref={ambientRef} intensity={1.3} color="#2A384C" />

      {/* Primary Key Light */}
      <directionalLight
        ref={keyLightRef}
        position={[3, 8, 9]}
        intensity={4.2}
        color="#F8FAFC"
      />

      {/* Front Soft Fill Light */}
      <directionalLight
        position={[0, 1, 8]}
        intensity={2.0}
        color="#E2E8F0"
      />

      {/* Electric Blue Top Rim Light */}
      <directionalLight
        ref={topRimRef}
        position={[-5, 7, -3]}
        intensity={7.5}
        color="#0099FF"
      />

      {/* Warm Industrial Orange Bottom Rim Light */}
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
  onUpdateLabels,
  activeLayerId,
  onSelectLayer,
  activeCategory = null,
  activeEnvIndex = null,
  isMobile = false
}) {
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0.6, 12.0], fov: isMobile ? 48 : 36 }}
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
        {/* Dynamic Studio Lighting with High Visibility */}
        <DynamicLighting scrollProgress={scrollProgress} activeEnvIndex={activeEnvIndex} />

        {/* Well-framed Camera Rig */}
        <CameraRig scrollProgress={scrollProgress} />

        {/* 3D Cable Model */}
        <Suspense fallback={null}>
          <CableModel
            scrollProgress={scrollProgress}
            onUpdateLabels={onUpdateLabels}
            activeLayerId={activeLayerId}
            onSelectLayer={onSelectLayer}
            activeCategory={activeCategory}
            environmentIndex={activeEnvIndex}
            isMobile={isMobile}
          />

          {/* HDR Studio Reflections */}
          <Environment preset="city" environmentIntensity={0.8} />

          {/* Atmospheric micro particles */}
          <Sparkles
            count={isMobile ? 12 : 28}
            scale={[16, 9, 10]}
            size={isMobile ? 1.0 : 1.6}
            speed={0.2}
            opacity={0.25}
            color="#93C5FD"
          />

          {/* Contact shadow */}
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
