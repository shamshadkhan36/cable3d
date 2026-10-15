/**
 * Engineering specifications & 3D animation configuration
 * for Nexor Industrial Cable System
 */

export const GLB_MODEL_PATH = '/models/premium_power_cable_v3_cutaway.glb';

export const CABLE_LAYERS = [
  {
    id: '01',
    number: '01',
    name: 'OUTER SHEATH',
    material: 'High-Density LSOH Polyethylene',
    thickness: '3.2 mm',
    temperature: '-40°C to +90°C',
    color: '#1E252D',
    accentColor: '#168CFF',
    description: 'Heavy-duty extruded thermoplastic sheath engineered for high mechanical impact, UV weathering, and chemical resistance.',
    specs: ['Impact Resistance: Class AG4', 'Halogen Free: IEC 60754-1', 'Flame Retardant: IEC 60332-3-24'],
    targetMesh: '01_Outer_Sheath',
    worldAnchor: [-2.5, 1.8, 0],
    pinSide: 'left'
  },
  {
    id: '02',
    number: '02',
    name: 'METALLIC ARMOUR',
    material: 'Galvanized Steel Wire Braid (GSWB)',
    coverage: '> 92% optical density',
    tensile: '1,450 N/mm²',
    color: '#8A99AD',
    accentColor: '#168CFF',
    description: 'High-tensile interlocking galvanized steel wires provide crushing protection, subterranean rodent resistance, and low-impedance earth fault path.',
    specs: ['Tensile Strength: >1250 N', 'Torsion Limit: <30°/m', 'Standard: BS EN 10257-1'],
    targetMesh: '05_Armour_0_00',
    worldAnchor: [0.6, 1.7, 0.4],
    pinSide: 'right'
  },
  {
    id: '03',
    number: '03',
    name: 'INSULATION LAYER',
    material: 'Semi-Conductive Water-Blocking Tape & Bedding',
    dielectric: 'Extruded PVC/LSOH Bedding',
    waterResist: 'Longitudinal water barrier',
    color: '#4B5563',
    accentColor: '#FF7A18',
    description: 'Extruded inner bedding coupled with swelling water-tight semi-conductive swelling tapes prevents moisture ingress and cushions armour impact.',
    specs: ['Water Tightness: IEC 60502-2', 'Dielectric Strength: >22 kV/mm'],
    targetMesh: '02_Bedding_Layer',
    worldAnchor: [0.5, -1.6, -0.4],
    pinSide: 'left'
  },
  {
    id: '04',
    number: '04',
    name: 'INNER SHEATH',
    material: 'Hydrocarbon & Chemical Impermeable Polymer',
    dielectric: '2.4 mm extruded',
    color: '#1F2937',
    accentColor: '#168CFF',
    description: 'Primary radial chemical barrier preventing hydrocarbon migration and providing smooth cylindrical bedding over three-core bundle.',
    specs: ['Permeation Index: Class 0', 'Continuous Rating: 90°C'],
    targetMesh: '04_Inner_Sheath',
    worldAnchor: [1.5, 1.3, -0.6],
    pinSide: 'right'
  },
  {
    id: '05',
    number: '05',
    name: 'CORE INSULATION',
    material: 'Cross-Linked Polyethylene (XLPE)',
    ratedVoltage: '18/30 (36) kV to 132 kV',
    thermalClass: '90°C normal / 250°C short circuit',
    color: '#168CFF',
    accentColor: '#168CFF',
    description: 'Triple extruded super-clean XLPE with bonded inner and outer semi-conducting screens, delivering exceptional dielectric breakdown strength.',
    specs: ['Partial Discharge: <2 pC @ 1.73 U0', 'Loss Factor: tan δ < 0.0004'],
    targetMesh: '06_Core_Blue',
    worldAnchor: [2.8, -0.8, 0.7],
    pinSide: 'left'
  },
  {
    id: '06',
    number: '06',
    name: 'STRANDED COPPER CONDUCTOR',
    material: 'Class 2 Compacted Annealed Cu',
    conductivity: '> 100% IACS',
    maxResist: '0.0754 Ω/km @ 20°C',
    color: '#FF7A18',
    accentColor: '#FF7A18',
    description: 'Electrolytic copper stranded in concentric geometric layers, compressed for maximum circularity and optimal current-carrying efficiency.',
    specs: ['Purity: 99.99% Electrolytic Cu', 'Standard: IEC 60228 Class 2', 'Short-Circuit Capacity: 35.8 kA / 1s'],
    targetMesh: '09_Copper_Core1_Strand01',
    worldAnchor: [4.8, 0.6, 0.6],
    pinSide: 'right'
  }
];

export const ANIMATION_CONFIG = {
  // Sheath translation along X (backwards)
  sheathOffset: -3.2,
  sheathCutRimOffset: -3.2,

  // Bedding & tape offset
  beddingOffset: -1.6,
  tapeOffset: -1.6,

  // Inner sheath offset
  innerSheathOffset: -0.8,

  // Armour expansion & shift
  armourRadialSpread: 0.42,
  armourAxialOffset: -1.0,

  // Core 1 (Blue) radial spread in Y-Z plane
  core1Spread: { y: 0.0, z: 0.85 },

  // Core 2 (Black) radial spread in Y-Z plane
  core2Spread: { y: 0.75, z: -0.5 },

  // Core 3 (White) radial spread in Y-Z plane
  core3Spread: { y: -0.75, z: -0.5 },

  // Copper strand forward extension along X and slight flare
  copperAxialOffset: 0.95,
  copperFlareScale: 1.12,

  // Global rotation and camera adjustments across scroll
  initialRotation: [0.15, -0.45, 0.05],
  explodedRotation: [0.32, -0.85, 0.12],

  // Camera settings
  cameraInitial: { x: 0, y: 1.2, z: 8.5 },
  cameraZoomed: { x: 1.0, y: 0.8, z: 6.2 },
  cameraExploded: { x: 1.2, y: 0.6, z: 7.2 }
};
