import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { GLB_MODEL_PATH, ANIMATION_CONFIG, CABLE_LAYERS } from '../../config/cableConfig';

export function CableModel({ scrollProgress = 0, onUpdateLabels, activeLayerId, onSelectLayer }) {
  const { scene } = useGLTF(GLB_MODEL_PATH);
  const { camera, size } = useThree();
  const groupRef = useRef();

  // Smooth interpolated progress
  const currentProgress = useRef(0);
  const previousReportedState = useRef(-1);
  const lastUpdateProgress = useRef(0);
  const lastUpdateTime = useRef(0);

  // Categorize and preserve individual GLB meshes
  const meshGroups = useMemo(() => {
    // Clone scene to avoid polluting cache if re-mounted
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

    // Console logging & inspection of GLB hierarchy as mandated
    console.group('=== 3D GLB CABLE MODEL INSPECTION ===');
    console.log('Model Path:', GLB_MODEL_PATH);
    console.log('Scene Children Count:', clonedScene.children.length);

    clonedScene.traverse((child) => {
      if (child.isMesh) {
        allMeshes.push(child);
        const name = child.name || '';
        console.log(`[Mesh Found] Name: "${name}" | Geometry: ${child.geometry?.type} | Material: ${child.material?.name}`);

        // Material enhancement for photorealistic PBR rendering
        if (child.material) {
          const mat = child.material.clone();
          mat.envMapIntensity = 1.4;

          if (name.includes('01_Outer_Sheath') || name.includes('01A_Sheath_Cut_Rim')) {
            mat.roughness = 0.35;
            mat.metalness = 0.18;
            mat.color = new THREE.Color('#101418');
          } else if (name.includes('05_Armour') || name.includes('05A_Armour')) {
            mat.roughness = 0.14;
            mat.metalness = 0.98;
            mat.color = new THREE.Color('#CBD5E1');
          } else if (name.includes('03_Insulation_Tape')) {
            mat.roughness = 0.32;
            mat.metalness = 0.20;
            mat.color = new THREE.Color('#E2E8F0');
          } else if (name.includes('02_Bedding')) {
            mat.roughness = 0.35;
            mat.metalness = 0.28;
            mat.color = new THREE.Color('#181E26');
          } else if (name.includes('04_Inner_Sheath')) {
            mat.roughness = 0.30;
            mat.metalness = 0.32;
            mat.color = new THREE.Color('#161C24');
          } else if (name.includes('06_Core_Blue')) {
            mat.roughness = 0.20;
            mat.metalness = 0.15;
            mat.color = new THREE.Color('#0A60FF');
          } else if (name.includes('07_Core_Black')) {
            mat.roughness = 0.25;
            mat.metalness = 0.22;
            mat.color = new THREE.Color('#15181E');
          } else if (name.includes('08_Core_White')) {
            mat.roughness = 0.22;
            mat.metalness = 0.12;
            mat.color = new THREE.Color('#ECEFF1');
          } else if (name.includes('09_Copper')) {
            mat.roughness = 0.15;
            mat.metalness = 0.98;
            mat.color = new THREE.Color('#E8722E');
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

    console.log('--- Categorized Layer Mesh Totals ---');
    console.log('Outer Sheath meshes:', outerSheath.length);
    console.log('Armour meshes:', armour.length);
    console.log('Bedding & Tape meshes:', bedding.length);
    console.log('Inner Sheath meshes:', innerSheath.length);
    console.log('Blue Core meshes:', coreBlue.length, '+ Copper 1:', copperCore1.length);
    console.log('Black Core meshes:', coreBlack.length, '+ Copper 2:', copperCore2.length);
    console.log('White Core meshes:', coreWhite.length, '+ Copper 3:', copperCore3.length);
    console.log('Separator meshes:', coreSeparator.length);
    console.groupEnd();

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

  // Ease function helper
  const smoothStep = (edge0, edge1, x) => {
    const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
    return t * t * (3 - 2 * t);
  };

  useFrame((state, delta) => {
    // Smooth lerp for continuous buttery response
    currentProgress.current = THREE.MathUtils.lerp(
      currentProgress.current,
      scrollProgress,
      Math.min(1, delta * 7)
    );

    const p = currentProgress.current;

    // Report discrete state changes (0 to 8)
    const currentStateIndex = Math.min(8, Math.floor(p * 9));
    if (currentStateIndex !== previousReportedState.current) {
      previousReportedState.current = currentStateIndex;
    }

    // -------------------------------------------------------------
    // PROGRESS FACTORS FOR EACH STATE (0.0 -> 1.0)
    // -------------------------------------------------------------
    // State 1: Camera approach & subtle model tilt
    const s1 = smoothStep(0.02, 0.25, p);

    // State 2: Outer Sheath moves backward along cable axis (X)
    const s2 = smoothStep(0.12, 0.40, p);

    // State 3 & 4: Armour separates radially from inner layers
    const s34 = smoothStep(0.28, 0.58, p);

    // State 5: Bedding & insulation tape layer shift
    const s5 = smoothStep(0.42, 0.70, p);

    // State 6: Three cable cores separate radially from each other
    const s6 = smoothStep(0.56, 0.85, p);

    // State 7: Stranded copper conductors slide forward & flare
    const s7 = smoothStep(0.68, 0.94, p);

    // State 8: Complete explosion & technical inspection
    const s8 = smoothStep(0.80, 1.0, p);

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

    // 1. Move Outer Sheath backward (-X)
    const sheathX = ANIMATION_CONFIG.sheathOffset * s2;
    outerSheath.forEach((m) => {
      const base = basePositions.get(m);
      if (base) {
        m.position.x = base.position.x + sheathX;
      }
    });

    // 2. Expand Armour radially & shift slightly
    const armourRadial = ANIMATION_CONFIG.armourRadialSpread * s34;
    const armourX = ANIMATION_CONFIG.armourAxialOffset * s34;
    armour.forEach((m) => {
      const base = basePositions.get(m);
      if (base) {
        m.position.x = base.position.x + armourX;
        // Radial expansion in Y-Z plane relative to cable axis (0,0)
        // Scale around Y-Z axis
        const scaleFactor = 1 + armourRadial * 0.28;
        m.scale.set(base.scale.x, base.scale.y * scaleFactor, base.scale.z * scaleFactor);
      }
    });

    // 3. Shift Bedding Layer & Tape rings back
    const beddingX = ANIMATION_CONFIG.beddingOffset * s5;
    bedding.forEach((m) => {
      const base = basePositions.get(m);
      if (base) {
        m.position.x = base.position.x + beddingX;
      }
    });

    // 4. Shift Inner Sheath slightly
    const innerSheathX = ANIMATION_CONFIG.innerSheathOffset * s5;
    innerSheath.forEach((m) => {
      const base = basePositions.get(m);
      if (base) {
        m.position.x = base.position.x + innerSheathX;
      }
    });

    // 5. Separate Three Cores + their respective copper strands
    // Core 1 (Blue) moves towards +Z
    const c1SpreadY = ANIMATION_CONFIG.core1Spread.y * s6;
    const c1SpreadZ = ANIMATION_CONFIG.core1Spread.z * s6;
    coreBlue.forEach((m) => {
      const base = basePositions.get(m);
      if (base) {
        m.position.y = base.position.y + c1SpreadY;
        m.position.z = base.position.z + c1SpreadZ;
      }
    });

    // Core 2 (Black) moves towards +Y, -Z
    const c2SpreadY = ANIMATION_CONFIG.core2Spread.y * s6;
    const c2SpreadZ = ANIMATION_CONFIG.core2Spread.z * s6;
    coreBlack.forEach((m) => {
      const base = basePositions.get(m);
      if (base) {
        m.position.y = base.position.y + c2SpreadY;
        m.position.z = base.position.z + c2SpreadZ;
      }
    });

    // Core 3 (White) moves towards -Y, -Z
    const c3SpreadY = ANIMATION_CONFIG.core3Spread.y * s6;
    const c3SpreadZ = ANIMATION_CONFIG.core3Spread.z * s6;
    coreWhite.forEach((m) => {
      const base = basePositions.get(m);
      if (base) {
        m.position.y = base.position.y + c3SpreadY;
        m.position.z = base.position.z + c3SpreadZ;
      }
    });

    // Core Separator shifts back
    const sepX = -0.6 * s6;
    coreSeparator.forEach((m) => {
      const base = basePositions.get(m);
      if (base) {
        m.position.x = base.position.x + sepX;
      }
    });

    // 6. Copper Strands move with their cores + slide forward along X (+X)
    const copperX = ANIMATION_CONFIG.copperAxialOffset * s7;

    copperCore1.forEach((m) => {
      const base = basePositions.get(m);
      if (base) {
        m.position.x = base.position.x + copperX;
        m.position.y = base.position.y + c1SpreadY;
        m.position.z = base.position.z + c1SpreadZ;
      }
    });

    copperCore2.forEach((m) => {
      const base = basePositions.get(m);
      if (base) {
        m.position.x = base.position.x + copperX;
        m.position.y = base.position.y + c2SpreadY;
        m.position.z = base.position.z + c2SpreadZ;
      }
    });

    copperCore3.forEach((m) => {
      const base = basePositions.get(m);
      if (base) {
        m.position.x = base.position.x + copperX;
        m.position.y = base.position.y + c3SpreadY;
        m.position.z = base.position.z + c3SpreadZ;
      }
    });

    // 7. Group subtle rotation & camera movement
    if (groupRef.current) {
      // Subtle floating idle motion + scroll rotation
      const time = state.clock.getElapsedTime();
      const floatTiltY = Math.sin(time * 0.4) * 0.03;
      const floatTiltX = Math.cos(time * 0.3) * 0.02;

      const initRot = ANIMATION_CONFIG.initialRotation;
      const expRot = ANIMATION_CONFIG.explodedRotation;

      groupRef.current.rotation.x = THREE.MathUtils.lerp(initRot[0], expRot[0], p) + floatTiltX;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(initRot[1], expRot[1], p) + floatTiltY;
      groupRef.current.rotation.z = THREE.MathUtils.lerp(initRot[2], expRot[2], p);

      // Center the cable nicely in view
      groupRef.current.position.x = THREE.MathUtils.lerp(0.2, -0.4, p);
      groupRef.current.position.y = THREE.MathUtils.lerp(-0.2, 0.1, p);
      groupRef.current.position.z = THREE.MathUtils.lerp(0, 0.4, p);
    }

    // 8. Project 3D layer anchor points to 2D screen coordinates for crisp HTML/SVG labels
    const timeNow = state.clock.getElapsedTime();
    if (onUpdateLabels && groupRef.current && (Math.abs(p - (lastUpdateProgress.current || 0)) > 0.002 || timeNow - (lastUpdateTime.current || 0) > 0.05)) {
      lastUpdateProgress.current = p;
      lastUpdateTime.current = timeNow;

      const projectedLabels = CABLE_LAYERS.map((layer) => {
        const anchor = new THREE.Vector3(...layer.worldAnchor);

        // Adjust anchor dynamically with its component's displacement
        if (layer.id === '01') {
          anchor.x += sheathX;
        } else if (layer.id === '02') {
          anchor.x += armourX;
          anchor.y += armourRadial * 0.8;
        } else if (layer.id === '03') {
          anchor.x += beddingX;
        } else if (layer.id === '04') {
          anchor.x += innerSheathX;
        } else if (layer.id === '05') {
          anchor.z += c1SpreadZ;
        } else if (layer.id === '06') {
          anchor.x += copperX;
          anchor.z += c1SpreadZ;
        }

        // Apply group transform to anchor
        anchor.applyMatrix4(groupRef.current.matrixWorld);

        // Project through camera to NDC [-1, 1]
        const projected = anchor.clone().project(camera);

        // Convert to screen pixel coordinates
        const screenX = (projected.x * 0.5 + 0.5) * size.width;
        const screenY = (-projected.y * 0.5 + 0.5) * size.height;

        // Visibility determination: appear sequentially as their component separates
        let layerVisibility = 0;
        if (layer.id === '01') layerVisibility = s2;
        else if (layer.id === '02') layerVisibility = s34;
        else if (layer.id === '03') layerVisibility = s5;
        else if (layer.id === '04') layerVisibility = s5;
        else if (layer.id === '05') layerVisibility = s6;
        else if (layer.id === '06') layerVisibility = s7;

        return {
          ...layer,
          screenX,
          screenY,
          isBehind: projected.z > 1,
          opacity: layerVisibility,
          visible: layerVisibility > 0.15 && projected.z < 1
        };
      });

      onUpdateLabels(projectedLabels);
    }
  });

  return (
    <group ref={groupRef} dispose={null}>
      <primitive object={meshGroups.clonedScene} />
    </group>
  );
}

useGLTF.preload(GLB_MODEL_PATH);
