import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import {
  GLB_MODEL_PATH,
  ANIMATION_CONFIG,
  CABLE_LAYERS,
  TIMELINE_PHASES
} from '../../config/cableConfig';

export function CableModel({
  scrollProgress = 0,
  onUpdateLabels,
  activeLayerId,
  onSelectLayer,
  activeCategory = null,
  environmentIndex = 0,
  isMobile = false
}) {
  const { scene } = useGLTF(GLB_MODEL_PATH);
  const { camera, size } = useThree();
  const groupRef = useRef();

  // Entrance animation progress (0 -> 1)
  const entranceRef = useRef(0);
  const entranceStartTime = useRef(null);

  // Mouse parallax coordinates (normalized -1 to 1)
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Smooth interpolated scroll progress
  const currentProgress = useRef(0);
  const lastUpdateProgress = useRef(0);
  const lastUpdateTime = useRef(0);

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
          mat.envMapIntensity = 1.5;

          if (name.includes('01_Outer_Sheath') || name.includes('01A_Sheath_Cut_Rim')) {
            // Refined graphite/charcoal (not pure black) so cylinder curvature is clearly visible
            mat.roughness = 0.32;
            mat.metalness = 0.22;
            mat.color = new THREE.Color('#222933');
          } else if (name.includes('05_Armour') || name.includes('05A_Armour')) {
            // Bright polished galvanized steel wires
            mat.roughness = 0.15;
            mat.metalness = 0.98;
            mat.color = new THREE.Color('#E2E8F0');
          } else if (name.includes('03_Insulation_Tape')) {
            // Water-blocking swelling tape
            mat.roughness = 0.30;
            mat.metalness = 0.20;
            mat.color = new THREE.Color('#CBD5E1');
          } else if (name.includes('02_Bedding')) {
            // Bedding buffer
            mat.roughness = 0.35;
            mat.metalness = 0.25;
            mat.color = new THREE.Color('#2D3748');
          } else if (name.includes('04_Inner_Sheath')) {
            // Inner sheath layer
            mat.roughness = 0.30;
            mat.metalness = 0.28;
            mat.color = new THREE.Color('#252E3A');
          } else if (name.includes('06_Core_Blue')) {
            // Vibrant electric royal blue XLPE
            mat.roughness = 0.20;
            mat.metalness = 0.18;
            mat.color = new THREE.Color('#168CFF');
          } else if (name.includes('07_Core_Black')) {
            // Rich midnight slate XLPE (visible against dark background)
            mat.roughness = 0.25;
            mat.metalness = 0.22;
            mat.color = new THREE.Color('#2A323D');
          } else if (name.includes('08_Core_White')) {
            // Pure pearl white XLPE
            mat.roughness = 0.22;
            mat.metalness = 0.12;
            mat.color = new THREE.Color('#F8FAFC');
          } else if (name.includes('09_Copper')) {
            // Gleaming annealed electrolytic copper
            mat.roughness = 0.14;
            mat.metalness = 0.98;
            mat.color = new THREE.Color('#F97316');
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

    // Cache initial base positions of all meshes
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

  // C2 continuous smootherstep
  const smootherStep = (edge0, edge1, x) => {
    if (x <= edge0) return 0;
    if (x >= edge1) return 1;
    const t = (x - edge0) / (edge1 - edge0);
    return t * t * t * (t * (t * 6 - 15) + 10);
  };

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.1);
    const clockTime = state.clock.getElapsedTime();

    // 1. PAGE LOAD ENTRANCE ANIMATION (Smooth, heavy, stable arrival)
    if (entranceStartTime.current === null) {
      entranceStartTime.current = clockTime;
    }
    const entranceElapsed = clockTime - entranceStartTime.current;
    const entranceDuration = 2.0;
    if (entranceRef.current < 1) {
      const rawT = Math.min(1, entranceElapsed / entranceDuration);
      entranceRef.current = 1 - Math.pow(1 - rawT, 3.5);
    }
    const entrance = entranceRef.current;

    // 2. SMOOTH EXPONENTIAL DAMPING FOR SCROLL PROGRESS
    currentProgress.current = THREE.MathUtils.damp(
      currentProgress.current,
      scrollProgress,
      8.0,
      dt
    );
    const p = currentProgress.current;

    // 3. SUBTLE MOUSE PARALLAX (1-2 degrees max, premium)
    mouseRef.current.x = THREE.MathUtils.damp(mouseRef.current.x, mouseRef.current.targetX, 4.0, dt);
    mouseRef.current.y = THREE.MathUtils.damp(mouseRef.current.y, mouseRef.current.targetY, 4.0, dt);
    const parallaxY = mouseRef.current.x * 0.03;
    const parallaxX = -mouseRef.current.y * 0.02;

    // 4. TIMELINE PHASES & SMOOTH EXPANSION / REASSEMBLY CURVES
    const rotPhase = smootherStep(TIMELINE_PHASES.rotationStart, TIMELINE_PHASES.rotationEnd, p);

    // Exploded view separation (0.28 -> 0.58)
    const sJacket = smootherStep(0.28, 0.40, p);
    const sArmour = smootherStep(0.34, 0.46, p);
    const sBedding = smootherStep(0.39, 0.50, p);
    const sCores = smootherStep(0.44, 0.54, p);
    const sCopper = smootherStep(0.48, 0.58, p);

    // Inspection hold (0.58 -> 0.68)
    const inspectionPhase = smootherStep(TIMELINE_PHASES.inspectionStart, TIMELINE_PHASES.inspectionPeak, p);

    // Reconnection / Reassembly (0.68 -> 0.78)
    const reassemblyPhase = smootherStep(TIMELINE_PHASES.reassemblyStart, TIMELINE_PHASES.reassemblyEnd, p);
    const assembleFactor = 1 - reassemblyPhase;

    // CTA composition (0.96 -> 1.00)
    const ctaPhase = smootherStep(TIMELINE_PHASES.ctaStart, TIMELINE_PHASES.ctaEnd, p);

    // Apply assembleFactor to explosion offsets so reassembly returns perfectly to 0
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

    // 1. Move Outer Jacket backward along cable axis (X)
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
    if (groupRef.current) {
      // Entrance interpolation
      const entrancePosX = THREE.MathUtils.lerp(-1.8, 0.0, entrance);
      const entrancePosZ = THREE.MathUtils.lerp(-1.0, 0.0, entrance);
      const entranceRotY = THREE.MathUtils.lerp(-0.70, ANIMATION_CONFIG.initialRotation[1], entrance);

      // Scroll-based rotation trajectory
      let targetRotX = ANIMATION_CONFIG.initialRotation[0];
      let targetRotY = entranceRotY;
      let targetRotZ = ANIMATION_CONFIG.initialRotation[2];

      if (p <= 0.28) {
        targetRotX = THREE.MathUtils.lerp(ANIMATION_CONFIG.initialRotation[0], ANIMATION_CONFIG.explodedRotation[0], rotPhase);
        targetRotY = THREE.MathUtils.lerp(ANIMATION_CONFIG.initialRotation[1], ANIMATION_CONFIG.explodedRotation[1], rotPhase);
        targetRotZ = THREE.MathUtils.lerp(ANIMATION_CONFIG.initialRotation[2], ANIMATION_CONFIG.explodedRotation[2], rotPhase);
      } else if (p <= 0.68) {
        targetRotX = THREE.MathUtils.lerp(ANIMATION_CONFIG.explodedRotation[0], ANIMATION_CONFIG.inspectionRotation[0], inspectionPhase);
        targetRotY = THREE.MathUtils.lerp(ANIMATION_CONFIG.explodedRotation[1], ANIMATION_CONFIG.inspectionRotation[1], inspectionPhase);
        targetRotZ = THREE.MathUtils.lerp(ANIMATION_CONFIG.explodedRotation[2], ANIMATION_CONFIG.inspectionRotation[2], inspectionPhase);
      } else if (p <= 0.90) {
        targetRotX = THREE.MathUtils.lerp(ANIMATION_CONFIG.inspectionRotation[0], 0.20, reassemblyPhase);
        targetRotY = THREE.MathUtils.lerp(ANIMATION_CONFIG.inspectionRotation[1], -0.48, reassemblyPhase);
        targetRotZ = THREE.MathUtils.lerp(ANIMATION_CONFIG.inspectionRotation[2], -0.10, reassemblyPhase);
      } else if (p <= 0.96) {
        targetRotX = 0.18;
        targetRotY = -0.42;
        targetRotZ = -0.12;
      } else {
        targetRotX = THREE.MathUtils.lerp(0.18, ANIMATION_CONFIG.ctaRotation[0], ctaPhase);
        targetRotY = THREE.MathUtils.lerp(-0.42, ANIMATION_CONFIG.ctaRotation[1], ctaPhase);
        targetRotZ = THREE.MathUtils.lerp(-0.12, ANIMATION_CONFIG.ctaRotation[2], ctaPhase);
      }

      // Add mouse parallax
      targetRotX += parallaxX;
      targetRotY += parallaxY;

      // Group Position trajectory (well-centered with generous margins)
      let targetPosX = entrancePosX;
      let targetPosY = 0.0;
      let targetPosZ = entrancePosZ;

      if (entrance >= 0.99) {
        if (p <= 0.58) {
          // Centered exploded view
          targetPosX = THREE.MathUtils.lerp(0.0, -0.2, sJacket);
          targetPosY = THREE.MathUtils.lerp(0.0, 0.05, sJacket);
          targetPosZ = THREE.MathUtils.lerp(0.0, 0.2, sJacket);
        } else if (p <= 0.68) {
          targetPosX = THREE.MathUtils.lerp(-0.2, 0.0, inspectionPhase);
          targetPosY = 0.05;
          targetPosZ = 0.2;
        } else if (p <= 0.78) {
          targetPosX = THREE.MathUtils.lerp(0.0, 0.0, reassemblyPhase);
          targetPosY = THREE.MathUtils.lerp(0.05, 0.0, reassemblyPhase);
          targetPosZ = THREE.MathUtils.lerp(0.2, 0.0, reassemblyPhase);
        } else if (p <= 0.96) {
          targetPosX = 0.0;
          targetPosY = 0.0;
          targetPosZ = 0.0;
        } else {
          // CTA section: cable framed to the right
          targetPosX = THREE.MathUtils.lerp(0.0, 0.65, ctaPhase);
          targetPosY = THREE.MathUtils.lerp(0.0, -0.15, ctaPhase);
          targetPosZ = THREE.MathUtils.lerp(0.0, 0.1, ctaPhase);
        }
      }

      // Smooth exponential damping on group transforms
      groupRef.current.position.x = THREE.MathUtils.damp(groupRef.current.position.x, targetPosX, 6.0, dt);
      groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, targetPosY, 6.0, dt);
      groupRef.current.position.z = THREE.MathUtils.damp(groupRef.current.position.z, targetPosZ, 6.0, dt);

      groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetRotX, 6.0, dt);
      groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetRotY, 6.0, dt);
      groupRef.current.rotation.z = THREE.MathUtils.damp(groupRef.current.rotation.z, targetRotZ, 6.0, dt);
    }

    // 8. PROJECT TECHNICAL LABELS ANCHORS (Visible during explosion phase 0.28 -> 0.68)
    const timeNow = clockTime;
    const isLabelPhase = p >= 0.25 && p <= 0.70;

    if (onUpdateLabels && groupRef.current && isLabelPhase && (Math.abs(p - (lastUpdateProgress.current || 0)) > 0.002 || timeNow - (lastUpdateTime.current || 0) > 0.03)) {
      lastUpdateProgress.current = p;
      lastUpdateTime.current = timeNow;

      const projectedLabels = CABLE_LAYERS.map((layer) => {
        const anchor = new THREE.Vector3(...layer.worldAnchor);

        if (layer.id === '01') {
          anchor.x += jacketDisp;
        } else if (layer.id === '02') {
          anchor.x += armourDispX;
          anchor.y += armourRadial * 0.8;
        } else if (layer.id === '03') {
          anchor.x += beddingDisp;
        } else if (layer.id === '04') {
          anchor.z += core1Z;
        } else if (layer.id === '05') {
          anchor.x += copperDispX;
          anchor.z += core1Z;
        }

        anchor.applyMatrix4(groupRef.current.matrixWorld);
        const projected = anchor.clone().project(camera);

        const screenX = (projected.x * 0.5 + 0.5) * size.width;
        const screenY = (-projected.y * 0.5 + 0.5) * size.height;

        let layerVisibility = 0;
        if (layer.id === '01') layerVisibility = sJacket * assembleFactor;
        else if (layer.id === '02') layerVisibility = sArmour * assembleFactor;
        else if (layer.id === '03') layerVisibility = sBedding * assembleFactor;
        else if (layer.id === '04') layerVisibility = sCores * assembleFactor;
        else if (layer.id === '05') layerVisibility = sCopper * assembleFactor;

        return {
          ...layer,
          screenX,
          screenY,
          isBehind: projected.z > 1,
          opacity: Math.max(0, Math.min(1, layerVisibility)),
          visible: layerVisibility > 0.15 && projected.z < 1
        };
      });

      onUpdateLabels(projectedLabels);
    } else if (onUpdateLabels && !isLabelPhase && lastUpdateProgress.current !== -1) {
      lastUpdateProgress.current = -1;
      onUpdateLabels([]);
    }
  });

  // Base scale of 0.68 (or 0.55 on mobile) guarantees full, comfortable visibility without cropping
  const baseScale = isMobile ? 0.52 : 0.68;

  return (
    <group ref={groupRef} scale={baseScale} dispose={null}>
      <primitive object={meshGroups.clonedScene} />
    </group>
  );
}

useGLTF.preload(GLB_MODEL_PATH);
