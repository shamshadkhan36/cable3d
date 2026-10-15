import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Sparkles, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { CableModel } from './CableModel';
import { CABLE_ENVIRONMENTS, TIMELINE_PHASES } from '../../config/cableConfig';

function CameraRig({ scrollProgress = 0 }) {
  const currentCamPos = useRef(new THREE.Vector3(0, 1.4, 9.6));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const targetCamPos = useRef(new THREE.Vector3());
  const targetLookAt = useRef(new THREE.Vector3());

  useFrame(({ camera }, delta) => {
    const dt = Math.min(delta, 0.1);
    const p = Math.max(0, Math.min(1, scrollProgress));

    // Ken Perlin smootherstep for C2 continuity
    const smootherStep = (edge0, edge1, x) => {
      if (x <= edge0) return 0;
      if (x >= edge1) return 1;
      const t = (x - edge0) / (edge1 - edge0);
      return t * t * t * (t * (t * 6 - 15) + 10);
    };

    // Calculate camera target based on scroll narrative
    if (p <= 0.12) {
      // Hero position: stable, cinematic, powerful
      targetCamPos.current.set(0.0, 1.1, 8.5);
      targetLookAt.current.set(0.0, 0.0, 0.0);
    } else if (p <= 0.28) {
      // Rotation phase: gradual push-in and slight angle shift
      const t = smootherStep(0.12, 0.28, p);
      targetCamPos.current.set(
        THREE.MathUtils.lerp(0.0, 0.35, t),
        THREE.MathUtils.lerp(1.1, 0.9, t),
        THREE.MathUtils.lerp(8.5, 7.8, t)
      );
      targetLookAt.current.set(
        THREE.MathUtils.lerp(0.0, 0.2, t),
        0.0,
        0.0
      );
    } else if (p <= 0.58) {
      // Exploded view: framing the longitudinal separation
      const t = smootherStep(0.28, 0.58, p);
      targetCamPos.current.set(
        THREE.MathUtils.lerp(0.35, 0.6, t),
        THREE.MathUtils.lerp(0.9, 0.7, t),
        THREE.MathUtils.lerp(7.8, 7.4, t)
      );
      targetLookAt.current.set(
        THREE.MathUtils.lerp(0.2, 0.35, t),
        0.0,
        0.0
      );
    } else if (p <= 0.68) {
      // Macro internal inspection: travelling inside the cable core structure!
      const t = smootherStep(0.58, 0.68, p);
      targetCamPos.current.set(
        THREE.MathUtils.lerp(0.6, 2.2, t),
        THREE.MathUtils.lerp(0.7, 0.45, t),
        THREE.MathUtils.lerp(7.4, 4.2, t)
      );
      targetLookAt.current.set(
        THREE.MathUtils.lerp(0.35, 2.4, t),
        THREE.MathUtils.lerp(0.0, 0.2, t),
        THREE.MathUtils.lerp(0.0, 0.4, t)
      );
    } else if (p <= 0.78) {
      // Reassembly: camera pulls back smoothly as components lock into place
      const t = smootherStep(0.68, 0.78, p);
      targetCamPos.current.set(
        THREE.MathUtils.lerp(2.2, 0.0, t),
        THREE.MathUtils.lerp(0.45, 1.0, t),
        THREE.MathUtils.lerp(4.2, 8.2, t)
      );
      targetLookAt.current.set(
        THREE.MathUtils.lerp(2.4, 0.0, t),
        THREE.MathUtils.lerp(0.2, 0.0, t),
        THREE.MathUtils.lerp(0.4, 0.0, t)
      );
    } else if (p <= 0.90) {
      // Environments: stable cinematic inspection orbit
      const t = smootherStep(0.78, 0.90, p);
      targetCamPos.current.set(
        THREE.MathUtils.lerp(0.0, 0.25, t),
        THREE.MathUtils.lerp(1.0, 0.85, t),
        THREE.MathUtils.lerp(8.2, 7.9, t)
      );
      targetLookAt.current.set(0.0, 0.0, 0.0);
    } else if (p <= 0.96) {
      // Product categories
      targetCamPos.current.set(-0.15, 0.8, 7.8);
      targetLookAt.current.set(0.1, 0.0, 0.0);
    } else {
      // CTA Section: cable framed diagonally to the right, opening left side for CTA
      const t = smootherStep(0.96, 1.0, p);
      targetCamPos.current.set(
        THREE.MathUtils.lerp(-0.15, -0.65, t),
        THREE.MathUtils.lerp(0.8, 0.5, t),
        THREE.MathUtils.lerp(7.8, 7.6, t)
      );
      targetLookAt.current.set(
        THREE.MathUtils.lerp(0.1, 0.4, t),
        -0.1,
        0.0
      );
    }

    // Heavy, cinematic spring damping on position and lookAt simultaneously
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

    // Determine target lighting colors based on active environment or scroll timeline
    let envIdx = 3; // Default: Power / Energy (Electric Blue + Warm Orange)

    if (activeEnvIndex !== null) {
      envIdx = activeEnvIndex;
    } else if (p >= 0.78 && p <= 0.90) {
      // Map scroll progress in environments chapter across 4 environments
      const envProgress = (p - 0.78) / (0.90 - 0.78);
      envIdx = Math.min(3, Math.floor(envProgress * 4));
    }

    const currentEnv = CABLE_ENVIRONMENTS[envIdx] || CABLE_ENVIRONMENTS[3];

    // Smoothly damp lighting colors and intensities
    if (ambientRef.current) {
      ambientRef.current.color.lerp(new THREE.Color(currentEnv.ambientColor), dt * 4.0);
      ambientRef.current.intensity = THREE.MathUtils.damp(ambientRef.current.intensity, currentEnv.ambientIntensity, 4.0, dt);
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
      keyLightRef.current.intensity = THREE.MathUtils.damp(keyLightRef.current.intensity, currentEnv.keyIntensity, 4.0, dt);
    }
  });

  return (
    <>
      <ambientLight ref={ambientRef} intensity={0.8} color="#080C14" />
      <directionalLight
        ref={topRimRef}
        position={[-4, 8, -2]}
        intensity={8.0}
        color="#168CFF"
      />
      <directionalLight
        ref={bottomRimRef}
        position={[2, -6, 3]}
        intensity={6.5}
        color="#FF7A18"
      />
      <directionalLight
        ref={keyLightRef}
        position={[2, 6, 7]}
        intensity={2.6}
        color="#F1F5F9"
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
        camera={{ position: [0, 1.4, 9.6], fov: isMobile ? 55 : 42 }}
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
        {/* Cinematic Dynamic Lighting supporting all 4 Industrial Environments */}
        <DynamicLighting scrollProgress={scrollProgress} activeEnvIndex={activeEnvIndex} />

        {/* Slow, Heavy, Cinematic Camera Rig */}
        <CameraRig scrollProgress={scrollProgress} />

        {/* Primary 3D Cable Hero Model */}
        <Suspense fallback={null}>
          <CableModel
            scrollProgress={scrollProgress}
            onUpdateLabels={onUpdateLabels}
            activeLayerId={activeLayerId}
            onSelectLayer={onSelectLayer}
            activeCategory={activeCategory}
            environmentIndex={activeEnvIndex}
          />

          {/* HDR Studio Reflections */}
          <Environment preset="city" environmentIntensity={0.65} />

          {/* Subtle atmospheric micro dust */}
          <Sparkles
            count={isMobile ? 14 : 32}
            scale={[14, 8, 10]}
            size={isMobile ? 1.2 : 1.8}
            speed={0.25}
            opacity={0.30}
            color="#93C5FD"
          />

          {/* Silky smooth contact shadow */}
          <ContactShadows
            position={[0, -2.4, 0]}
            opacity={0.7}
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
