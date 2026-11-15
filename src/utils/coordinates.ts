/**
 * Scientific Coordinate Conversion Utilities
 * Handles planetary coordinate normalization and projection:
 * - Latitude: North-positive [-90, 90]
 * - Longitude: East-positive [-180, 180)
 * - 2:1 Equirectangular UV mapping
 * - 3D Sphere cartesian conversion
 */

export interface LatLon {
  lat: number
  lon: number
}

export interface CoordinateMeta {
  kind: 'point' | 'approximate' | 'region-only'
  referenceFrame?: string
  uncertaintyKm?: number
  sourceId: string
}

/**
 * Normalizes longitude to east-positive degrees in [-180, 180)
 */
export function normalizeLongitude(lon: number): number {
  let l = lon % 360
  if (l >= 180) l -= 360
  if (l < -180) l += 360
  return l
}

/**
 * Clamps latitude to [-90, 90]
 */
export function clampLatitude(lat: number): number {
  return Math.max(-90, Math.min(90, lat))
}

/**
 * Converts (lat, lon) to 2:1 Equirectangular UV coordinates [0, 1]
 * - u: 0 at -180° W, 0.5 at 0° (Prime Meridian), 1 at +180° E
 * - v: 0 at +90° N (Top pole), 0.5 at 0° (Equator), 1 at -90° S (Bottom pole)
 */
export function latLonToUV(lat: number, lon: number): { u: number; v: number } {
  const normLon = normalizeLongitude(lon)
  const normLat = clampLatitude(lat)

  const u = (normLon + 180) / 360
  const v = (90 - normLat) / 180

  return { u, v }
}

/**
 * Converts (lat, lon) to 3D Cartesian coordinates on a sphere of radius r
 * Body-local convention:
 * - x = r * cos(lat) * cos(lon)
 * - y = r * sin(lat)
 * - z = r * cos(lat) * sin(lon)
 */
export function latLonToSphere(
  lat: number,
  lon: number,
  radius: number = 1
): [number, number, number] {
  const latRad = (clampLatitude(lat) * Math.PI) / 180
  const lonRad = (normalizeLongitude(lon) * Math.PI) / 180

  const x = radius * Math.cos(latRad) * Math.cos(lonRad)
  const y = radius * Math.sin(latRad)
  const z = radius * Math.cos(latRad) * Math.sin(lonRad)

  return [x, y, z]
}

/**
 * Great-circle surface distance in kilometers using the Haversine formula
 */
export function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
  bodyRadiusKm: number
): number {
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180

  const rLat1 = (lat1 * Math.PI) / 180
  const rLat2 = (lat2 * Math.PI) / 180

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rLat1) * Math.cos(rLat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return bodyRadiusKm * c
}
