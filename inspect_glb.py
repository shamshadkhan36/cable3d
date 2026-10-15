import struct
import json

with open('premium_power_cable_v3_cutaway.glb', 'rb') as f:
    magic, version, length = struct.unpack('<4sII', f.read(12))
    chunk_length, chunk_type = struct.unpack('<II', f.read(8))
    json_bytes = f.read(chunk_length)
    gltf = json.loads(json_bytes.decode('utf-8'))

print('=== GLTF SCENE INFO ===')
print('Asset:', gltf.get('asset'))
print('Nodes count:', len(gltf.get('nodes', [])))
print('Meshes count:', len(gltf.get('meshes', [])))
print('Materials count:', len(gltf.get('materials', [])))

print('\n--- NODES ---')
for i, n in enumerate(gltf.get('nodes', [])):
    mesh_idx = n.get('mesh')
    mesh_name = gltf['meshes'][mesh_idx].get('name', '') if mesh_idx is not None else ''
    print(f"Node {i}: name='{n.get('name', '')}' | mesh_idx={mesh_idx} ('{mesh_name}') | children={n.get('children', [])} | translation={n.get('translation')} | rotation={n.get('rotation')}")

print('\n--- MESHES ---')
for i, m in enumerate(gltf.get('meshes', [])):
    mat_ids = [p.get('material') for p in m.get('primitives', [])]
    print(f"Mesh {i}: name='{m.get('name', '')}' | materials={mat_ids}")

print('\n--- MATERIALS ---')
for i, mat in enumerate(gltf.get('materials', [])):
    pbr = mat.get('pbrMetallicRoughness', {})
    print(f"Material {i}: name='{mat.get('name', '')}' | baseColorFactor={pbr.get('baseColorFactor')} | metallic={pbr.get('metallicFactor')} | roughness={pbr.get('roughnessFactor')}")

print('\n--- SCENES ---')
for i, s in enumerate(gltf.get('scenes', [])):
    print(f"Scene {i}: name='{s.get('name', '')}' | nodes={s.get('nodes', [])}")

print('\n--- HIERARCHY ---')
nodes = gltf['nodes']
def print_tree(idx, indent=0):
    n = nodes[idx]
    mesh_info = f" (mesh: {gltf['meshes'][n['mesh']]['name']})" if 'mesh' in n else ''
    trans = f" t={n.get('translation')}" if 'translation' in n else ''
    print('  '*indent + f"[{idx}] {n.get('name', 'unnamed')}{mesh_info}{trans}")
    for child in n.get('children', []):
        print_tree(child, indent + 1)

for s in gltf.get('scenes', []):
    for root_node in s.get('nodes', []):
        print_tree(root_node)

print('\n--- ACCESSOR BOUNDS FOR KEY MESHES ---')
accessors = gltf['accessors']
key_names = ['01_Outer_Sheath', '02_Bedding_Layer', '04_Inner_Sheath', '05_Armour_0_00', '06_Core_Blue', '07_Core_Black', '08_Core_White', '09_Copper_Core1_Strand01', '10_Core_Separator']
for m in gltf['meshes']:
    if any(k in m['name'] for k in key_names):
        pos_acc = accessors[m['primitives'][0]['attributes']['POSITION']]
        print(f"{m['name']}:")
        print(f"   min: {pos_acc.get('min')}")
        print(f"   max: {pos_acc.get('max')}")


