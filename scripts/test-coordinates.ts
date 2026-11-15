import {
  normalizeLongitude,
  clampLatitude,
  latLonToUV,
  latLonToSphere,
  haversineDistance,
} from '../src/utils/coordinates'

console.log('--- Running Coordinate Conversion Tests ---')

function assert(desc: string, cond: boolean) {
  if (!cond) {
    console.error(`FAIL: ${desc}`)
    process.exit(1)
  }
  console.log(`✓ ${desc}`)
}

function approx(a: number, b: number, eps = 1e-4) {
  return Math.abs(a - b) < eps
}

// 1. Longitude Normalization
assert('normalize 0°', normalizeLongitude(0) === 0)
assert('normalize 180° -> -180°', normalizeLongitude(180) === -180)
assert('normalize -180° -> -180°', normalizeLongitude(-180) === -180)
assert('normalize 190° -> -170°', normalizeLongitude(190) === -170)
assert('normalize -200° -> 160°', normalizeLongitude(-200) === 160)
assert('normalize 360° -> 0°', normalizeLongitude(360) === 0)

// 2. Latitude Clamping
assert('clamp 95° -> 90°', clampLatitude(95) === 90)
assert('clamp -100° -> -90°', clampLatitude(-100) === -90)
assert('clamp 45° -> 45°', clampLatitude(45) === 45)

// 3. Equirectangular UV Mapping
const originUV = latLonToUV(0, 0)
assert('Origin UV u=0.5', approx(originUV.u, 0.5))
assert('Origin UV v=0.5', approx(originUV.v, 0.5))

const northPoleUV = latLonToUV(90, 0)
assert('North Pole UV v=0', approx(northPoleUV.v, 0))

const apollo11UV = latLonToUV(0.67416, 23.47314)
assert('Apollo 11 u in (0.5, 0.6)', apollo11UV.u > 0.5 && apollo11UV.u < 0.6)
assert('Apollo 11 v in (0.45, 0.5)', apollo11UV.v > 0.45 && apollo11UV.v < 0.5)

// 4. Cartesian Sphere Projection
const [x0, y0, z0] = latLonToSphere(0, 0, 10)
assert('Origin sphere x=10, y=0, z=0', approx(x0, 10) && approx(y0, 0) && approx(z0, 0))

const [xEast, yEast, zEast] = latLonToSphere(0, 90, 10)
assert('90°E sphere x=0, y=0, z=10', approx(xEast, 0) && approx(yEast, 0) && approx(zEast, 10))

const [xNorth, yNorth, zNorth] = latLonToSphere(90, 0, 10)
assert('North pole sphere x=0, y=10, z=0', approx(xNorth, 0) && approx(yNorth, 10) && approx(zNorth, 0))

// 5. Apollo 12 and Surveyor 3 Distance Test (~180 meters on Lunar radius 1737.4 km)
// Apollo 12: 3.0128° S, 23.4219° W
// Surveyor 3: 3.01° S, 23.41° W (or ~3° S, 23.41° W)
const apollo12Lat = -3.0128
const apollo12Lon = -23.4219
const surveyor3Lat = -3.0094
const surveyor3Lon = -23.4246
const distKm = haversineDistance(apollo12Lat, apollo12Lon, surveyor3Lat, surveyor3Lon, 1737.4)
console.log(`Calculated Apollo 12 to Surveyor 3 distance: ${(distKm * 1000).toFixed(1)} m`)
assert('Distance is between 100m and 300m', distKm > 0.1 && distKm < 0.3)

console.log('✓ All coordinate tests passed successfully!')

