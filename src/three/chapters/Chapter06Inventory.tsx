import { StarField } from '../env/StarField'
import { AtlasGlobe } from '../env/AtlasGlobe'

export function Chapter06Inventory() {
  return <group>
    <StarField density="dense" />
    <ambientLight intensity={0.75} /><directionalLight position={[4, 10, 18]} intensity={2.2} />
    {/* A symbolic gathering, not a depiction of actual relative distances. */}
    <group position={[0, 2.5, 0]}><AtlasGlobe world="earth" radius={4.6} /></group>
    <group position={[8, -2.5, 0]}><AtlasGlobe world="moon" radius={1.8} /></group>
    <group position={[-6, -3.5, -4]}><AtlasGlobe world="mars" radius={2.7} /></group>
  </group>
}
