import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Sparkles, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { CableModel } from './CableModel';
import { CABLE_ENVIRONMENTS } from '../../config/cableConfig';
import { getScrollProgress } from '../../hooks/useLenisScroll';

// C2 Continuous smootherstep (zero velocity AND zero acceleration at boundaries)
function smootherStep(edge0, edge1, x) {
  if (x <= edge0) return 0;
  if (x >= edge1) return 1;
  const t = (x - edge0) / (edge1 - edge0);
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function CameraRig({ scrollProgress = 0 }) {
  const currentCamPos = useRef(new THREE.Vector3(0, 0.4, 11.5));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const targetCamPos = useRef(new THREE.Vector3());
  const targetLookAt = useRef(new THREE.Vector3());

  // Unified damping factor for heavy, majestic industrial film motion
  const DAMP_LAMBDA = 4.8;

  useFrame(({ camera }, delta) => {
    const dt = Math.min(delta, 0.1);
    // Read synchronous high-precision scroll progress directly from Lenis
    const rawP = getScrollProgress();
    const p = Math.max(0, Math.min(1, typeof rawP === 'number' && !isNaN(rawP) ? rawP : scrollProgress));

    // Calculate camera target across narrative phases with 100% boundary continuity
    if (p <= 0.12) {
      // Phase 1: Hero position (stable, majestic, centered)
      targetCamPos.current.set(0.0, 0.4, 11.5);
      targetLookAt.current.set(0.0, 0.0, 0.0);
    } else if (p <= 0.28) {
      // Phase 2: Rotation reveal (slow, controlled push-in)
      const t = smootherStep(0.12, 0.28, p);
      targetCamPos.current.set(
        THREE.MathUtils.lerp(0.0, 0.2, t),
        THREE.MathUtils.lerp(0.4, 0.35, t),
        THREE.MathUtils.lerp(11.5, 11.0, t)
      );
      targetLookAt.current.set(
        THREE.MathUtils.lerp(0.0, 0.1, t),
        0.0,
        0.0
      );
    } else if (p <= 0.58) {
      // Phase 3: Exploded view (wide framing showcasing all separating components)
      const t = smootherStep(0.28, 0.58, p);
      targetCamPos.current.set(
        THREE.MathUtils.lerp(0.2, 0.25, t),
        THREE.MathUtils.lerp(0.35, 0.25, t),
        THREE.MathUtils.lerp(11.0, 11.2, t)
      );
      targetLookAt.current.set(
        THREE.MathUtils.lerp(0.1, 0.1, t),
        0.0,
        0.0
      );
    } else if (p <= 0.68) {
      // Phase 4: Macro internal inspection (camera dollies in towards copper structure)
      const t = smootherStep(0.58, 0.68, p);
      targetCamPos.current.set(
        THREE.MathUtils.lerp(0.25, 1.3, t),
        THREE.MathUtils.lerp(0.25, 0.30, t),
        THREE.MathUtils.lerp(11.2, 8.2, t)
      );
      targetLookAt.current.set(
        THREE.MathUtils.lerp(0.1, 1.4, t),
        THREE.MathUtils.lerp(0.0, 0.15, t),
        THREE.MathUtils.lerp(0.0, 0.2, t)
      );
    } else if (p <= 0.78) {
      // Phase 5: Reassembly (smooth pull-back as monolithic cable integrity is restored)
      const t = smootherStep(0.68, 0.78, p);
      targetCamPos.current.set(
        THREE.MathUtils.lerp(1.3, 0.0, t),
        THREE.MathUtils.lerp(0.30, 0.4, t),
        THREE.MathUtils.lerp(8.2, 11.5, t)
      );
      targetLookAt.current.set(
        THREE.MathUtils.lerp(1.4, 0.0, t),
        THREE.MathUtils.lerp(0.15, 0.0, t),
        THREE.MathUtils.lerp(0.2, 0.0, t)
      );
    } else if (p <= 0.90) {
      // Phase 6: Environments (stable inspection orbit)
      const t = smootherStep(0.78, 0.90, p);
      targetCamPos.current.set(
        THREE.MathUtils.lerp(0.0, 0.1, t),
        THREE.MathUtils.lerp(0.4, 0.35, t),
        THREE.MathUtils.lerp(11.5, 11.2, t)
      );
      targetLookAt.current.set(0.0, 0.0, 0.0);
    } else if (p <= 0.96) {
      // Phase 7: Product categories (seamless transition from 0.90 boundary)
      const t = smootherStep(0.90, 0.96, p);
      targetCamPos.current.set(
        THREE.MathUtils.lerp(0.1, -0.1, t),
        THREE.MathUtils.lerp(0.35, 0.35, t),
        11.2
      );
      targetLookAt.current.set(
        THREE.MathUtils.lerp(0.0, 0.05, t),
        0.0,
        0.0
      );
    } else {
      // Phase 8: CTA Section (cable positioned gracefully to right, opening left side for CTA)
      const t = smootherStep(0.96, 1.0, p);
      targetCamPos.current.set(
        THREE.MathUtils.lerp(-0.1, -0.6, t),
        THREE.MathUtils.lerp(0.35, 0.25, t),
        THREE.MathUtils.lerp(11.2, 11.0, t)
      );
      targetLookAt.current.set(
        THREE.MathUtils.lerp(0.05, 0.3, t),
        THREE.MathUtils.lerp(0.0, -0.05, t),
        0.0
      );
    }

    // Heavy, synchronized exponential spring damping on camera coordinates
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

function DynamicLighting({ scrollProgress = 0, activeEnvIndex = null }) {
  const ambientRef = useRef();
  const topRimRef = useRef();
  const bottomRimRef = useRef();
  const keyLightRef = useRef();

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1);
    const rawP = getScrollProgress();
    const p = Math.max(0, Math.min(1, typeof rawP === 'number' && !isNaN(rawP) ? rawP : scrollProgress));

    let envIdx = 3;

    if (activeEnvIndex !== null) {
      envIdx = activeEnvIndex;
    } else if (p >= 0.78 && p <= 0.90) {
      const envProgress = (p - 0.78) / (0.90 - 0.78);
      envIdx = Math.min(3, Math.floor(envProgress * 4));
    }

    const currentEnv = CABLE_ENVIRONMENTS[envIdx] || CABLE_ENVIRONMENTS[3];

    // Smooth lighting interpolation
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
        camera={{ position: [0, 0.4, 11.5], fov: isMobile ? 48 : 36 }}
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
        <DynamicLighting scrollProgress={scrollProgress} activeEnvIndex={activeEnvIndex} />

        <CameraRig scrollProgress={scrollProgress} />

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

          <Environment preset="city" environmentIntensity={0.8} />

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
