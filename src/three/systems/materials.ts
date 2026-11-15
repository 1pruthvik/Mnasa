import * as THREE from 'three'

// Helper to generate procedural noise normal map for foil crinkles
function createFoilCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const ctx = canvas.getContext('2d')
  if (!ctx) return canvas

  const imgData = ctx.createImageData(256, 256)
  const d = imgData.data
  for (let i = 0; i < d.length; i += 4) {
    // Generate pseudo-random faceted noise for crinkled thermal foil
    const val = 128 + Math.floor((Math.random() - 0.5) * 80)
    d[i] = val
    d[i + 1] = val
    d[i + 2] = 255
    d[i + 3] = 255
  }
  ctx.putImageData(imgData, 0, 0)
  return canvas
}

// Helper to generate solar cell grid texture
function createSolarGridCanvas(): HTMLCanvasElement {
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 128
  const ctx = canvas.getContext('2d')
  if (!ctx) return canvas

  ctx.fillStyle = '#0a1226'
  ctx.fillRect(0, 0, 128, 128)

  ctx.strokeStyle = '#38bdf8'
  ctx.lineWidth = 1
  for (let i = 0; i <= 128; i += 16) {
    ctx.beginPath()
    ctx.moveTo(i, 0)
    ctx.lineTo(i, 128)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(0, i)
    ctx.lineTo(128, i)
    ctx.stroke()
  }

  // Gold busbar down center
  ctx.strokeStyle = '#fbbf24'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(64, 0)
  ctx.lineTo(64, 128)
  ctx.stroke()

  return canvas
}

let foilTexture: THREE.CanvasTexture | null = null
let solarTexture: THREE.CanvasTexture | null = null

export function getFoilTexture(): THREE.CanvasTexture {
  if (!foilTexture && typeof document !== 'undefined') {
    foilTexture = new THREE.CanvasTexture(createFoilCanvas())
    foilTexture.wrapS = THREE.RepeatWrapping
    foilTexture.wrapT = THREE.RepeatWrapping
    foilTexture.repeat.set(4, 4)
  }
  return foilTexture as THREE.CanvasTexture
}

export function getSolarTexture(): THREE.CanvasTexture {
  if (!solarTexture && typeof document !== 'undefined') {
    solarTexture = new THREE.CanvasTexture(createSolarGridCanvas())
    solarTexture.wrapS = THREE.RepeatWrapping
    solarTexture.wrapT = THREE.RepeatWrapping
    solarTexture.repeat.set(2, 2)
  }
  return solarTexture as THREE.CanvasTexture
}

export const goldFoilMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color('#eab308'),
  metalness: 0.9,
  roughness: 0.35,
})

export const silverFoilMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color('#e2e8f0'),
  metalness: 0.92,
  roughness: 0.25,
})

export const solarPanelMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color('#0f172a'),
  metalness: 0.8,
  roughness: 0.2,
})

export const whitePaintMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color('#f8fafc'),
  metalness: 0.1,
  roughness: 0.5,
})

export const blackStrutMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color('#090d16'),
  metalness: 0.4,
  roughness: 0.8,
})

export const aluminiumMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color('#cbd5e1'),
  metalness: 0.85,
  roughness: 0.4,
})

export const copperMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color('#d97706'),
  metalness: 0.8,
  roughness: 0.4,
})

export const antennaMeshMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color('#fde047'),
  metalness: 0.7,
  roughness: 0.5,
  wireframe: true,
})
