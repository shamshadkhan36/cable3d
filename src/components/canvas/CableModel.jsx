import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import {
  GLB_MODEL_PATH,
  ANIMATION_CONFIG,
  CABLE_LAYERS
} from '../../config/cableConfig';
import { getScrollProgress } from '../../hooks/useLenisScroll';

// C2 Continuous smootherstep (Ken Perlin formula)
function smootherStep(edge0, edge1, x) {
  if (x <= edge0) return 0;
  if (x >= edge1) return 1;
  const t = (x - edge0) / (edge1 - edge0);
  return t * t * t * (t * (t * 6 - 15) + 10);
}

export function CableModel({
  scrollProgress = 0,
  explodedProgress = 0,
  envProgress = 0,
  activeEnvIndex = 3,
  isMobile = false,
  onUpdateLabels
}) {
  const { scene } = useGLTF(GLB_MODEL_PATH);
  const { camera, size } = useThree();
  const groupRef = useRef();

  // Entrance animation progress (0 -> 1)
  const entranceRef = useRef(0);
  const entranceStartTime = useRef(null);

  // Mouse parallax coordinates
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Damping constant for heavy, majestic industrial film motion
  const DAMP_LAMBDA = 4.8;

  // Set up subtle mouse parallax listener
  useEffect(() => {
    const handleMouseMove = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      mouseRef.current.targetX = nx;
      mouseRef.current.targetY = ny;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Categorize and preserve individual GLB meshes with smooth vertex normals & clear materials
  const meshGroups = useMemo(() => {
    const clonedScene = scene.clone(true);

    const outerSheath = [];
    const bedding = [];
    const innerSheath = [];
    const armour = [];
    const coreBlue = [];
    const coreBlack = [];
    const coreWhite = [];
    const copperCore1 = [];
    const copperCore2 = [];
    const copperCore3 = [];
    const coreSeparator = [];
    const allMeshes = [];

    clonedScene.traverse((child) => {
      if (child.isMesh) {
        allMeshes.push(child);
        const name = child.name || '';

        // Compute vertex normals for smooth cylindrical shading
        if (child.geometry) {
          child.geometry = child.geometry.clone();
          child.geometry.computeVertexNormals();
        }

        // Material enhancement for maximum visibility, photorealism, and clear separation
        if (child.material) {
          const mat = child.material.clone();
          mat.flatShading = false;
          mat.envMapIntensity = 1.6;

          if (name.includes('01_Outer_Sheath') || name.includes('01A_Sheath_Cut_Rim')) {
            mat.roughness = 0.35;
            mat.metalness = 0.20;
            mat.color = new THREE.Color('#1c222b');
          } else if (name.includes('05_Armour') || name.includes('05A_Armour')) {
            mat.roughness = 0.16;
            mat.metalness = 0.98;
            mat.color = new THREE.Color('#E2E8F0');
          } else if (name.includes('03_Insulation_Tape')) {
            mat.roughness = 0.32;
            mat.metalness = 0.18;
            mat.color = new THREE.Color('#CBD5E1');
          } else if (name.includes('02_Bedding')) {
            mat.roughness = 0.36;
            mat.metalness = 0.22;
            mat.color = new THREE.Color('#2A3342');
          } else if (name.includes('04_Inner_Sheath')) {
            mat.roughness = 0.32;
            mat.metalness = 0.25;
            mat.color = new THREE.Color('#222A36');
          } else if (name.includes('06_Core_Blue')) {
            mat.roughness = 0.20;
            mat.metalness = 0.18;
            mat.color = new THREE.Color('#168CFF');
          } else if (name.includes('07_Core_Black')) {
            mat.roughness = 0.25;
            mat.metalness = 0.22;
            mat.color = new THREE.Color('#262E38');
          } else if (name.includes('08_Core_White')) {
            mat.roughness = 0.22;
            mat.metalness = 0.12;
            mat.color = new THREE.Color('#F8FAFC');
          } else if (name.includes('09_Copper')) {
            mat.roughness = 0.12;
            mat.metalness = 0.98;
            mat.color = new THREE.Color('#FF7A18');
          }

          child.material = mat;
        }

        // Categorize by structural layer
        if (name.startsWith('01_') || name.startsWith('01A_')) {
          outerSheath.push(child);
        } else if (name.startsWith('02_') || name.startsWith('03_')) {
          bedding.push(child);
        } else if (name.startsWith('04_')) {
          innerSheath.push(child);
        } else if (name.startsWith('05_') || name.startsWith('05A_')) {
          armour.push(child);
        } else if (name.startsWith('06_Core_Blue')) {
          coreBlue.push(child);
        } else if (name.startsWith('07_Core_Black')) {
          coreBlack.push(child);
        } else if (name.startsWith('08_Core_White')) {
          coreWhite.push(child);
        } else if (name.startsWith('09_Copper_Core1')) {
          copperCore1.push(child);
        } else if (name.startsWith('09_Copper_Core2')) {
          copperCore2.push(child);
        } else if (name.startsWith('09_Copper_Core3')) {
          copperCore3.push(child);
        } else if (name.startsWith('10_Core_Separator')) {
          coreSeparator.push(child);
        }
      }
    });

    const basePositions = new Map();
    allMeshes.forEach((mesh) => {
      basePositions.set(mesh, {
        position: mesh.position.clone(),
        scale: mesh.scale.clone(),
        rotation: mesh.rotation.clone()
      });
    });

    return {
      clonedScene,
      outerSheath,
      bedding,
      innerSheath,
      armour,
      coreBlue,
      coreBlack,
      coreWhite,
      copperCore1,
      copperCore2,
      copperCore3,
      coreSeparator,
      basePositions
    };
  }, [scene]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.1);
    const clockTime = state.clock.getElapsedTime();

    // 1. PAGE LOAD ENTRANCE ANIMATION (Slow, heavy, stable arrival)
    if (entranceStartTime.current === null) {
      entranceStartTime.current = clockTime;
    }
    const entranceElapsed = clockTime - entranceStartTime.current;
    const entranceDuration = 2.2;
    if (entranceRef.current < 1) {
      const rawT = Math.min(1, entranceElapsed / entranceDuration);
      entranceRef.current = 1 - Math.pow(1 - rawT, 3.5);
    }
    const entrance = entranceRef.current;

    // 2. EXPLODED PROGRESS SMOOTHING
    const expP = Math.max(0, Math.min(1, typeof explodedProgress === 'number' && !isNaN(explodedProgress) ? explodedProgress : 0));

    // 3. SUBTLE MOUSE PARALLAX (Gentle 1-2 degrees, luxurious fluid float)
    mouseRef.current.x = THREE.MathUtils.damp(mouseRef.current.x, mouseRef.current.targetX, 2.5, dt);
    mouseRef.current.y = THREE.MathUtils.damp(mouseRef.current.y, mouseRef.current.targetY, 2.5, dt);
    const parallaxY = mouseRef.current.x * 0.025;
    const parallaxX = -mouseRef.current.y * 0.018;

    // 4. TIMELINE PHASES WITH CONTINUOUS C2 MATHEMATICAL CURVES
    const rotPhase = smootherStep(0.00, 0.14, expP);

    // Exploded view separation curves
    const sJacket = smootherStep(0.12, 0.32, expP);
    const sArmour = smootherStep(0.24, 0.44, expP);
    const sBedding = smootherStep(0.36, 0.56, expP);
    const sCores = smootherStep(0.48, 0.68, expP);
    const sCopper = smootherStep(0.60, 0.80, expP);

    // Reconnection / Reassembly (0.82 -> 0.98)
    const sReturn = smootherStep(0.82, 0.98, expP);
    const assembleFactor = 1 - sReturn;

    // Apply assembleFactor to explosion offsets so reassembly returns with C2 zero velocity
    const jacketDisp = ANIMATION_CONFIG.sheathOffset * sJacket * assembleFactor;
    const armourDispX = ANIMATION_CONFIG.armourAxialOffset * sArmour * assembleFactor;
    const armourRadial = ANIMATION_CONFIG.armourRadialSpread * sArmour * assembleFactor;
    const beddingDisp = ANIMATION_CONFIG.beddingOffset * sBedding * assembleFactor;
    const innerSheathDisp = ANIMATION_CONFIG.innerSheathOffset * sBedding * assembleFactor;

    const core1Z = ANIMATION_CONFIG.core1Spread.z * sCores * assembleFactor;
    const core2Y = ANIMATION_CONFIG.core2Spread.y * sCores * assembleFactor;
    const core2Z = ANIMATION_CONFIG.core2Spread.z * sCores * assembleFactor;
    const core3Y = ANIMATION_CONFIG.core3Spread.y * sCores * assembleFactor;
    const core3Z = ANIMATION_CONFIG.core3Spread.z * sCores * assembleFactor;

    const copperDispX = ANIMATION_CONFIG.copperAxialOffset * sCopper * assembleFactor;

    const {
      outerSheath,
      bedding,
      innerSheath,
      armour,
      coreBlue,
      coreBlack,
      coreWhite,
      copperCore1,
      copperCore2,
      copperCore3,
      coreSeparator,
      basePositions
    } = meshGroups;

    // 1. Outer Jacket backward along cable axis (X)
    outerSheath.forEach((m) => {
      const base = basePositions.get(m);
      if (base) {
        m.position.x = base.position.x + jacketDisp;
      }
    });

    // 2. Expand Armour radially & shift slightly along X
    armour.forEach((m) => {
      const base = basePositions.get(m);
      if (base) {
        m.position.x = base.position.x + armourDispX;
        const scaleFactor = 1 + armourRadial * 0.28;
        m.scale.set(base.scale.x, base.scale.y * scaleFactor, base.scale.z * scaleFactor);
      }
    });

    // 3. Shift Bedding Layer & Tape rings back along X
    bedding.forEach((m) => {
      const base = basePositions.get(m);
      if (base) {
        m.position.x = base.position.x + beddingDisp;
      }
    });

    // 4. Shift Inner Sheath slightly along X
    innerSheath.forEach((m) => {
      const base = basePositions.get(m);
      if (base) {
        m.position.x = base.position.x + innerSheathDisp;
      }
    });

    // 5. Separate Three Cores radially in Y-Z plane
    coreBlue.forEach((m) => {
      const base = basePositions.get(m);
      if (base) {
        m.position.z = base.position.z + core1Z;
      }
    });

    coreBlack.forEach((m) => {
      const base = basePositions.get(m);
      if (base) {
        m.position.y = base.position.y + core2Y;
        m.position.z = base.position.z + core2Z;
      }
    });

    coreWhite.forEach((m) => {
      const base = basePositions.get(m);
      if (base) {
        m.position.y = base.position.y + core3Y;
        m.position.z = base.position.z + core3Z;
      }
    });

    // Core Separator shifts back
    const sepX = -0.6 * sCores * assembleFactor;
    coreSeparator.forEach((m) => {
      const base = basePositions.get(m);
      if (base) {
        m.position.x = base.position.x + sepX;
      }
    });

    // 6. Copper Strands move with their cores + slide forward along X (+X)
    copperCore1.forEach((m) => {
      const base = basePositions.get(m);
      if (base) {
        m.position.x = base.position.x + copperDispX;
        m.position.z = base.position.z + core1Z;
      }
    });

    copperCore2.forEach((m) => {
      const base = basePositions.get(m);
      if (base) {
        m.position.x = base.position.x + copperDispX;
        m.position.y = base.position.y + core2Y;
        m.position.z = base.position.z + core2Z;
      }
    });

    copperCore3.forEach((m) => {
      const base = basePositions.get(m);
      if (base) {
        m.position.x = base.position.x + copperDispX;
        m.position.y = base.position.y + core3Y;
        m.position.z = base.position.z + core3Z;
      }
    });

    // 7. Global Model Group Position & Rotation
    // On desktop, position cable at x: +1.35 so it is prominently showcased on the right half!
    if (groupRef.current) {
      const restingX = isMobile ? 0.0 : 1.35;
      const restingY = isMobile ? 0.45 : 0.0;
      const entrancePosX = THREE.MathUtils.lerp(restingX - 1.8, restingX, entrance);
      const entrancePosZ = THREE.MathUtils.lerp(-0.8, 0.0, entrance);
      const entranceRotY = THREE.MathUtils.lerp(-0.65, ANIMATION_CONFIG.initialRotation[1], entrance);

      let targetRotX = ANIMATION_CONFIG.initialRotation[0];
      let targetRotY = entranceRotY;
      let targetRotZ = ANIMATION_CONFIG.initialRotation[2];

      let targetPosX = entrancePosX;
      let targetPosY = restingY;
      let targetPosZ = entrancePosZ;

      if (expP > 0) {
        // Exploded section active
        targetRotX = THREE.MathUtils.lerp(ANIMATION_CONFIG.initialRotation[0], 0.24, rotPhase);
        targetRotY = THREE.MathUtils.lerp(ANIMATION_CONFIG.initialRotation[1], -0.66, rotPhase);
        targetRotZ = THREE.MathUtils.lerp(ANIMATION_CONFIG.initialRotation[2], 0.00, rotPhase);

        // Subtly shift along X to maintain perfect balance as components separate
        const shiftX = THREE.MathUtils.lerp(0.0, -0.25, sJacket * assembleFactor);
        targetPosX = restingX + shiftX;
        targetPosY = restingY;
        targetPosZ = 0.0;
      } else if (envProgress > 0) {
        // Environment section active - subtle cinematic orbit
        const envOrbit = Math.sin(envProgress * Math.PI) * 0.16;
        targetRotX = 0.20;
        targetRotY = ANIMATION_CONFIG.initialRotation[1] + envOrbit;
        targetRotZ = -0.10;
        targetPosX = restingX;
        targetPosY = restingY;
        targetPosZ = 0.0;
      }

      // Add subtle mouse parallax
      targetRotX += parallaxX;
      targetRotY += parallaxY;

      // Exponential damping
      groupRef.current.position.x = THREE.MathUtils.damp(groupRef.current.position.x, targetPosX, DAMP_LAMBDA, dt);
      groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, targetPosY, DAMP_LAMBDA, dt);
      groupRef.current.position.z = THREE.MathUtils.damp(groupRef.current.position.z, targetPosZ, DAMP_LAMBDA, dt);

      groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetRotX, DAMP_LAMBDA, dt);
      groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetRotY, DAMP_LAMBDA, dt);
      groupRef.current.rotation.z = THREE.MathUtils.damp(groupRef.current.rotation.z, targetRotZ, DAMP_LAMBDA, dt);
    }
  });

  const baseScale = isMobile ? 0.52 : 0.68;

  return (
    <group ref={groupRef} scale={baseScale} dispose={null}>
      <primitive object={meshGroups.clonedScene} />
    </group>
  );
}

useGLTF.preload(GLB_MODEL_PATH);
