export interface CelestialBodyData {
  id: string
  name: string
  type: 'Star' | 'Planet' | 'Moon' | 'Spacecraft'
  radius: number
  color: string
  roughness: number
  emissive?: string
  orbitRadius: number
  orbitSpeed: number
  rotationSpeed: number
  distanceFromSun: string
  orbitalPeriod: string
  temperature: string
  nasaMissions: string[]
  description: string
}
