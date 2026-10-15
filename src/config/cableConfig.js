/**
 * Engineering specifications & 3D cinematic animation configuration
 * for Nexor Industrial Cable System
 */

export const GLB_MODEL_PATH = '/models/premium_power_cable_v3_cutaway.glb';

export const CABLE_LAYERS = [
  {
    id: '01',
    number: '01',
    name: 'OUTER JACKET',
    shortName: 'JACKET',
    material: 'High-Density LSOH Polyethylene',
    thickness: '3.2 mm',
    temperature: '-40°C to +90°C',
    color: '#1E252D',
    accentColor: '#168CFF',
    description: 'Heavy-duty extruded thermoplastic sheath engineered for mechanical impact, UV weathering, and chemical resistance.',
    specs: ['Impact Resistance: Class AG4', 'Halogen Free: IEC 60754-1', 'Flame Retardant: IEC 60332-3-24'],
    targetMesh: '01_Outer_Sheath',
    worldAnchor: [-2.5, 1.8, 0],
    pinSide: 'left'
  },
  {
    id: '02',
    number: '02',
    name: 'METALLIC BRAID / SHIELD',
    shortName: 'ARMOUR',
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
    name: 'INTERNAL INSULATION',
    shortName: 'BEDDING & TAPE',
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
    name: 'CORE INSULATION',
    shortName: 'XLPE CORES',
    material: 'Cross-Linked Polyethylene (XLPE)',
    ratedVoltage: '18/30 (36) kV to 500 kV',
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
    id: '05',
    number: '05',
    name: 'COPPER CONDUCTOR',
    shortName: 'STRANDED Cu',
    material: 'Class 2 Compacted Annealed Electrolytic Cu',
    conductivity: '> 100% IACS',
    maxResist: '0.0754 Ω/km @ 20°C',
    color: '#FF7A18',
    accentColor: '#FF7A18',
    description: 'Electrolytic copper stranded in concentric geometric layers (57 strands), compressed for circularity and optimal current-carrying efficiency.',
    specs: ['Purity: 99.99% Electrolytic Cu', 'Standard: IEC 60228 Class 2', 'Short-Circuit: 35.8 kA / 1s'],
    targetMesh: '09_Copper_Core1_Strand01',
    worldAnchor: [4.8, 0.6, 0.6],
    pinSide: 'right'
  }
];

export const CABLE_ENVIRONMENTS = [
  {
    id: 'furnace',
    index: 0,
    title: 'HIGH TEMPERATURE / FURNACE',
    tag: 'FURNACE & THERMAL DUTY',
    ambientColor: '#301408',
    ambientIntensity: 1.2,
    topRimColor: '#FF4400',
    topRimIntensity: 8.5,
    bottomRimColor: '#FF8800',
    bottomRimIntensity: 6.5,
    keyColor: '#FFAA44',
    keyIntensity: 3.2,
    backgroundGradient: 'radial-gradient(ellipse at 50% 50%, rgba(220, 65, 10, 0.28) 0%, rgba(40, 15, 6, 0.65) 45%, rgba(7, 9, 11, 1) 80%)',
    description: 'Tested up to +250°C short-circuit surge and continuous +90°C radiant thermal loading in metallurgical smelters and foundry environments.',
    metrics: ['Thermal Rating: 250°C Peak', 'Radiant Heat Shield: AG4', 'Continuous Rating: 90°C']
  },
  {
    id: 'machinery',
    index: 1,
    title: 'INDUSTRIAL MACHINERY',
    tag: 'HEAVY AUTOMATION & ROBOTICS',
    ambientColor: '#1A2A3E',
    ambientIntensity: 1.1,
    topRimColor: '#0088FF',
    topRimIntensity: 8.0,
    bottomRimColor: '#38BDF8',
    bottomRimIntensity: 5.5,
    keyColor: '#E2E8F0',
    keyIntensity: 3.5,
    backgroundGradient: 'radial-gradient(ellipse at 50% 50%, rgba(20, 75, 140, 0.32) 0%, rgba(12, 32, 58, 0.65) 45%, rgba(7, 9, 11, 1) 80%)',
    description: 'Continuous torsional duty and electromagnetic shielding for high-speed robotic gantry lines, rolling mills, and automated stamping presses.',
    metrics: ['Torsional Flex: ±100°/m', 'EMC Shielding: > 85 dB', 'Crush Resistance: 1450 N/mm²']
  },
  {
    id: 'automotive',
    index: 2,
    title: 'EV / AUTOMOTIVE',
    tag: 'E-MOBILITY & FAST CHARGING',
    ambientColor: '#102E38',
    ambientIntensity: 1.15,
    topRimColor: '#00F0FF',
    topRimIntensity: 8.2,
    bottomRimColor: '#10B981',
    bottomRimIntensity: 5.0,
    keyColor: '#F0FDFA',
    keyIntensity: 3.2,
    backgroundGradient: 'radial-gradient(ellipse at 50% 50%, rgba(0, 160, 185, 0.30) 0%, rgba(8, 45, 55, 0.65) 45%, rgba(7, 9, 11, 1) 80%)',
    description: 'High-voltage DC fast-charging busways and lightweight powertrain interconnects certified for 1000V DC continuous battery architectures.',
    metrics: ['DC Charging: 1000V / 500A', 'Weight Optimization: -18%', 'Vibration Index: ISO 16750']
  },
  {
    id: 'energy',
    index: 3,
    title: 'POWER / ENERGY',
    tag: '500 kV EHV TRANSMISSION',
    ambientColor: '#1E2C3F',
    ambientIntensity: 1.2,
    topRimColor: '#168CFF',
    topRimIntensity: 8.5,
    bottomRimColor: '#FF7A18',
    bottomRimIntensity: 6.8,
    keyColor: '#FFFFFF',
    keyIntensity: 3.5,
    backgroundGradient: 'radial-gradient(ellipse at 50% 50%, rgba(26, 85, 160, 0.32) 0%, rgba(14, 30, 52, 0.65) 45%, rgba(7, 9, 11, 1) 80%)',
    description: 'Metropolitan electrical grid transmission, offshore wind inter-array feeds, and nuclear utility links with zero-discharge dielectric safety.',
    metrics: ['Rated Voltage: 500 kV EHV', 'Dielectric Strength: >22 kV/mm', 'Partial Discharge: <2 pC']
  }
];

export const PRODUCT_CATEGORIES = [
  {
    id: 'power',
    name: 'POWER CABLES',
    voltage: '66 kV – 500 kV EHV',
    subtitle: 'Extra-High Voltage Grid Transmission',
    specs: 'Up to 2500 mm² Compacted Cu / Super-Clean XLPE',
    description: 'Designed for primary electrical grid infrastructure, national substation interconnects, and bulk utility power delivery with zero partial discharge.'
  },
  {
    id: 'control',
    name: 'CONTROL CABLES',
    voltage: '0.6 / 1.0 kV',
    subtitle: 'Armoured Multi-Conductor Automation',
    specs: 'Class 5 Flexible Plain Copper / SWA Shielding',
    description: 'High-density multi-conductor cables delivering uncompromised signal fidelity and crush defense in automated switchgear and robotic cells.'
  },
  {
    id: 'instrumentation',
    name: 'INSTRUMENTATION CABLES',
    voltage: '300 / 500 V',
    subtitle: 'Shielded Precision Signal Transmission',
    specs: 'Individual & Collective Al-Mylar Foil / Tinned Drain',
    description: 'Engineered for SCADA networks, DCS architectures, and intrinsically safe petrochemical instrumentation requiring crosstalk rejection > 85 dB.'
  },
  {
    id: 'ev',
    name: 'EV CABLES',
    voltage: '1000 V DC / 500 A',
    subtitle: 'High-Power Automotive & Charging',
    specs: 'Fine Stranded Annealed Cu / Silicone / TPE-U Jacket',
    description: 'Ultra-flexible lightweight high-voltage cabling for electric vehicle powertrains, liquid-cooled superchargers, and megawatt charging systems.'
  },
  {
    id: 'industrial',
    name: 'INDUSTRIAL CABLES',
    voltage: '1.8 / 3.0 kV to 35 kV',
    subtitle: 'Severe-Duty Reeling & Trailing',
    specs: 'Chloroprene / EPR Heavy Duty Rubber Compound',
    description: 'Built for open-cast mining draglines, container terminal gantry cranes, and continuous flex festoon systems tolerating ±100°/m torsion.'
  },
  {
    id: 'specialty',
    name: 'SPECIALTY CABLES',
    voltage: 'Up to 525 kV DC',
    subtitle: 'Dynamic Subsea & Nuclear Certified',
    specs: 'Lead-Sheathed Hermetic Barrier / PEEK Insulation',
    description: 'Custom-engineered subsea power umbilicals for deepwater floating wind turbines and nuclear containment rated for 60-year radiation longevity.'
  }
];

export const MANUFACTURING_STEPS = [
  {
    step: '01',
    title: 'CONDUCTOR STRANDING',
    short: '01 CONDUCTOR',
    detail: '57 annealed electrolytic copper wires spun in counter-concentric layers and roll-compacted to 98% circularity.'
  },
  {
    step: '02',
    title: 'TRIPLE EXTRUSION INSULATION',
    short: '02 INSULATION',
    detail: 'Conductor screen, super-clean XLPE, and core screen extruded simultaneously in a 180m vertical VCV tower.'
  },
  {
    step: '03',
    title: 'STEEL WIRE ARMOURING',
    short: '03 SHIELDING',
    detail: 'High-tensile galvanized steel wires counter-braided under calibrated pneumatic tension for 1450 N/mm² defense.'
  },
  {
    step: '04',
    title: 'OUTER SHEATH EXTRUSION',
    short: '04 JACKET',
    detail: 'Heavy-duty LSOH polymer jacket extruded with continuous inline ultrasonic wall thickness verification.'
  },
  {
    step: '05',
    title: 'FINAL MONOLITHIC CABLE',
    short: '05 FINAL CABLE',
    detail: '100% routine spark, high-voltage withstand, and partial discharge inspection before reel deployment.'
  }
];

export const TIMELINE_PHASES = {
  // 1. Hero entrance and settled state
  heroEntranceEnd: 0.12,
  
  // 2. Controlled rotation & perspective shift
  rotationStart: 0.12,
  rotationEnd: 0.28,
  
  // 3. Exploded view layer-by-layer
  explosionStart: 0.28,
  jacketExplode: 0.35,
  armourExplode: 0.42,
  insulationExplode: 0.47,
  coresExplode: 0.52,
  copperExplode: 0.58,
  
  // 4. Internal inspection camera zoom
  inspectionStart: 0.58,
  inspectionPeak: 0.68,
  
  // 5. Precision reassembly (smooth return)
  reassemblyStart: 0.68,
  reassemblyEnd: 0.78,
  
  // 6. Extreme Environments transition
  environmentsStart: 0.78,
  environmentsEnd: 0.90,
  
  // 7. Interactive product category focus
  productsStart: 0.90,
  productsEnd: 0.96,
  
  // 8. Manufacturing sequence & CTA
  ctaStart: 0.96,
  ctaEnd: 1.00
};

export const ANIMATION_CONFIG = {
  // Sheath translation along X (backwards)
  sheathOffset: -3.5,
  
  // Bedding & tape offset
  beddingOffset: -1.8,
  
  // Inner sheath offset
  innerSheathOffset: -1.0,

  // Armour expansion & shift
  armourAxialOffset: -1.2,
  armourRadialSpread: 0.38,

  // Cores radial spread in Y-Z plane
  core1Spread: { y: 0.0, z: 0.90 },
  core2Spread: { y: 0.80, z: -0.55 },
  core3Spread: { y: -0.80, z: -0.55 },

  // Copper strand forward extension along X (+X)
  copperAxialOffset: 1.15,

  // Global rotation base
  initialRotation: [0.18, -0.46, -0.12],
  explodedRotation: [0.26, -0.68, 0.02],
  inspectionRotation: [0.32, -0.82, 0.08],
  ctaRotation: [0.12, -0.32, -0.18],

  // Camera settings
  cameraEntrance: { x: -3.5, y: 1.6, z: 10.5 },
  cameraHero: { x: 0.0, y: 1.1, z: 8.5 },
  cameraRotated: { x: 0.3, y: 0.9, z: 7.6 },
  cameraExploded: { x: 0.6, y: 0.7, z: 7.2 },
  cameraInspection: { x: 2.4, y: 0.5, z: 4.2 },
  cameraReassembled: { x: 0.0, y: 1.0, z: 8.2 },
  cameraCta: { x: -0.8, y: 0.6, z: 7.8 }
};
