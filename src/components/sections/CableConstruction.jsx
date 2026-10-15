import React, { useState, Suspense, useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { GLB_MODEL_PATH } from '../../config/cableConfig';
import { Check, ShieldCheck, Zap, Activity } from 'lucide-react';

const CONSTRUCTION_LAYERS = [
  {
    id: 'outer-sheath',
    name: 'OUTER SHEATH',
    material: 'High-Density LSOH Polyethylene',
    thickness: '3.2 mm',
    temperature: '-40°C to +90°C',
    tensile: '12.5 N/mm²',
    elongation: '> 300%',
    standards: 'IEC 60502-2, IEC 60811-501',
    description: 'The outermost defensive barrier engineered with carbon black UV stabilization and flame retardant low-smoke compounding. Resists severe abrasive drag, hydrocarbon penetration, and subterranean rodent attack.',
    highlightMesh: '01_Outer_Sheath'
  },
  {
    id: 'armour',
    name: 'METALLIC ARMOUR',
    material: 'Galvanized Steel Wire Braid (GSWB)',
    thickness: '2.5 mm Wire Dia',
    temperature: 'Continuous Earth Path',
    tensile: '1,450 N/mm²',
    elongation: 'Optical density > 92%',
    standards: 'BS EN 10257-1, BS 5467',
    description: 'Interlocking helical galvanized steel wires engineered to absorb massive radial crushing forces, mechanical impacts from excavation equipment, and provide a direct low-impedance path for system short-circuit currents.',
    highlightMesh: '05_Armour'
  },
  {
    id: 'insulation',
    name: 'BEDDING & INSULATION TAPE',
    material: 'Semi-Conductive Water-Blocking Swellable Polymer',
    thickness: '1.8 mm Bedding',
    temperature: '90°C continuous',
    tensile: '5.0 N/mm²',
    elongation: 'Zero water migration @ 10 bar',
    standards: 'IEC 60502-2 Annex B',
    description: 'Extruded bedding cushions the core assembly against the mechanical pressure of the steel armour while semi-conducting hygroscopic water-blocking tapes seal instantly against longitudinal water migration in the event of sheath breach.',
    highlightMesh: '02_Bedding'
  },
  {
    id: 'core',
    name: 'CORE INSULATION (XLPE)',
    material: 'Triple Extruded Super-Clean XLPE',
    thickness: '5.5 mm Dielectric Wall',
    temperature: '90°C Normal / 250°C Short-Circuit',
    tensile: 'Dielectric > 22 kV/mm',
    elongation: 'Loss factor tan δ < 0.0004',
    standards: 'IEC 60502-2, CIGRE TB 496',
    description: 'Manufactured via closed-loop triple extrusion in our 180m vertical vulcanization tower under pressurized dry nitrogen. Both inner conductor screen and outer core screen are atomically bonded to ensure uniform electrical field distribution without micro-voids.',
    highlightMesh: '06_Core'
  },
  {
    id: 'copper',
    name: 'STRANDED COPPER CONDUCTOR',
    material: 'Class 2 Compacted Annealed Electrolytic Copper',
    thickness: '240 mm² to 2500 mm²',
    temperature: '100% IACS Conductivity',
    tensile: '99.99% Cu Purity',
    elongation: 'Compacted circularity > 98%',
    standards: 'IEC 60228 Class 2, ASTM B8',
    description: 'High-purity oxygen-free electrolytic copper wires concentrically stranded and roll-compacted to eliminate inter-strand voids, minimize skin effect losses, and maximize electrical ampacity at peak load.',
    highlightMesh: '09_Copper'
  }
];

function InteractiveCableViewer({ activeLayerMesh }) {
  const { scene } = useGLTF(GLB_MODEL_PATH);
  const modelRef = useRef();

  const clonedScene = useMemo(() => {
    return scene.clone(true);
  }, [scene]);

  // Highlight active layer meshes dynamically
  useEffect(() => {
    if (!clonedScene) return;
    clonedScene.traverse((child) => {
      if (child.isMesh) {
        const isMatch = activeLayerMesh && child.name.includes(activeLayerMesh);
        if (child.material) {
          const mat = child.material.clone();
          if (isMatch) {
            mat.emissive = new THREE.Color('#168CFF');
            mat.emissiveIntensity = 0.5;
          } else {
            mat.emissive = new THREE.Color('#000000');
            mat.emissiveIntensity = 0;
          }
          child.material = mat;
        }
      }
    });
  }, [clonedScene, activeLayerMesh]);

  useFrame((state, delta) => {
    if (modelRef.current) {
      // Gentle constant rotation for 360 inspection
      modelRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={modelRef} position={[0, -0.2, 0]} rotation={[0.2, -0.6, 0.1]} scale={1.2}>
      <primitive object={clonedScene} />
    </group>
  );
}

export function CableConstruction() {
  const [activeTab, setActiveTab] = useState(CONSTRUCTION_LAYERS[0]);

  return (
    <section id="construction" className="py-32 px-6 sm:px-12 lg:px-20 bg-[#07090B] border-t border-[#141B24]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-10 h-[1px] bg-[#168CFF]" />
              <span className="font-mono-tech text-xs tracking-widest uppercase text-[#168CFF]">
                03 / ANATOMY & METALLURGY
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black font-display tracking-tight text-[#F5F5F5] uppercase">
              CABLE CONSTRUCTION
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#168CFF] to-[#38BDF8]">
                LAYER EXPLORER
              </span>
            </h2>
          </div>
          <p className="text-sm font-mono-tech text-[#9CA3AF] max-w-md">
            Interactive multi-layered engineering breakdown showing physical barriers, electrical shielding, and metallurgical purity.
          </p>
        </div>

        {/* Layer Selector Tabs */}
        <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-[#1A222D]">
          {CONSTRUCTION_LAYERS.map((layer, index) => {
            const isActive = activeTab.id === layer.id;
            return (
              <button
                key={layer.id}
                onClick={() => setActiveTab(layer)}
                className={`px-5 py-3 font-mono-tech text-xs uppercase tracking-wider transition-all duration-300 border flex items-center gap-2.5 ${
                  isActive
                    ? 'bg-[#168CFF]/15 border-[#168CFF] text-white shadow-[0_0_15px_rgba(22,140,255,0.25)]'
                    : 'bg-[#0B0F15] border-[#1E2633] text-[#9CA3AF] hover:text-white hover:border-[#384860]'
                }`}
              >
                <span className={isActive ? 'text-[#168CFF] font-bold' : 'text-[#6B7280]'}>
                  0{index + 1}
                </span>
                <span>{layer.name}</span>
              </button>
            );
          })}
        </div>

        {/* Detailed Two-Column Breakdown & 360 3D Orbit View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: 360 Interactive 3D Cable Canvas */}
          <div className="lg:col-span-6 bg-[#0B0F15] border border-[#1E2633] relative h-[420px] sm:h-[500px] flex flex-col justify-between overflow-hidden">
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-[#168CFF] animate-ping" />
              <span className="text-[10px] font-mono-tech tracking-widest text-[#9CA3AF] uppercase">
                360° ORBIT INSPECTION VIEW
              </span>
            </div>

            <div className="absolute top-4 right-4 z-10 text-[9px] font-mono-tech text-[#6B7280] pointer-events-none">
              DRAG TO ROTATE • SCROLL TO ZOOM
            </div>

            {/* 3D Canvas with OrbitControls */}
            <div className="w-full h-full cursor-grab active:cursor-grabbing">
              <Canvas
                camera={{ position: [0, 1.0, 7.5], fov: 42 }}
                gl={{ antialias: true, alpha: true }}
              >
                <ambientLight intensity={0.9} />
                <directionalLight position={[-8, 6, -4]} intensity={5.0} color="#168CFF" />
                <directionalLight position={[8, -3, 5]} intensity={4.0} color="#FF7A18" />
                <directionalLight position={[1, 7, 6]} intensity={2.0} color="#E2E8F0" />
                <Suspense fallback={null}>
                  <InteractiveCableViewer activeLayerMesh={activeTab.highlightMesh} />
                  <Environment preset="city" environmentIntensity={0.6} />
                  <ContactShadows position={[0, -2.2, 0]} opacity={0.6} scale={15} blur={2.5} far={4} color="#000000" />
                </Suspense>
                <OrbitControls enablePan={false} maxDistance={12} minDistance={4} />
              </Canvas>
            </div>

            {/* Bottom active layer bar */}
            <div className="p-4 bg-[#07090B]/90 border-t border-[#18202C] flex items-center justify-between text-xs font-mono-tech z-10">
              <span className="text-[#9CA3AF]">SELECTED FOCUS:</span>
              <span className="text-[#168CFF] font-bold">{activeTab.name}</span>
            </div>
          </div>

          {/* Right Column: Layer Specifications & Performance Metrics */}
          <div className="lg:col-span-6 bg-[#0B0F15] border border-[#1E2633] p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#1A222D]">
                <span className="text-xs font-mono-tech text-[#168CFF] tracking-wider uppercase font-semibold">
                  ENGINEERING SPECIFICATION
                </span>
                <span className="text-xs font-mono-tech text-[#6B7280]">
                  REF: {activeTab.standards.split(',')[0]}
                </span>
              </div>

              <h3 className="text-3xl font-black font-display text-white uppercase mb-2">
                {activeTab.name}
              </h3>
              <p className="text-sm font-semibold text-[#168CFF] font-mono-tech mb-6">
                {activeTab.material}
              </p>

              <p className="text-sm text-[#D1D5DB] leading-relaxed mb-8">
                {activeTab.description}
              </p>

              {/* Technical Metrics Grid */}
              <div className="grid grid-cols-2 gap-4 p-5 bg-[#07090B] border border-[#18202C] mb-6">
                <div>
                  <span className="text-[10px] font-mono-tech text-[#6B7280] block">DIMENSION / THICKNESS</span>
                  <span className="text-sm font-mono-tech font-bold text-white">{activeTab.thickness}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono-tech text-[#6B7280] block">THERMAL THRESHOLD</span>
                  <span className="text-sm font-mono-tech font-bold text-[#FF7A18]">{activeTab.temperature}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono-tech text-[#6B7280] block">MECHANICAL TENSILE</span>
                  <span className="text-sm font-mono-tech font-bold text-[#168CFF]">{activeTab.tensile}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono-tech text-[#6B7280] block">ELASTICITY / SEALING</span>
                  <span className="text-sm font-mono-tech font-bold text-white">{activeTab.elongation}</span>
                </div>
              </div>
            </div>

            {/* Quality Standards Tag */}
            <div className="pt-4 border-t border-[#1A222D] flex items-center justify-between text-xs font-mono-tech">
              <span className="text-[#6B7280]">APPROVED TEST CODE:</span>
              <span className="text-[#38BDF8]">{activeTab.standards}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
