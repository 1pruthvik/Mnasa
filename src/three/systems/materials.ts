// src/three/systems/materials.ts
import * as THREE from 'three'

// Canvas noise generator for gold foil crinkle and normal maps
function createFoilNoiseTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const ctx = canvas.getContext('2d')
  if (ctx) {
    const imgData = ctx.createImageData(256, 256)
    for (let i = 0; i < imgData.data.length; i += 4) {
      const v = Math.floor(Math.random() * 120 + 80)
      imgData.data[i] = v
      imgData.data[i + 1] = v
      imgData.data[i + 2] = 255
      imgData.data[i + 3] = 255
    }
    ctx.putImageData(imgData, 0, 0)
  }
  const tex = new THREE.CanvasTexture(canvas)
  tex.wrapS = THREE.RepeatWrapping
  tex.wrapT = THREE.RepeatWrapping
  tex.repeat.set(4, 4)
  return tex
}

function createMeshLatticeTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 64
  canvas.height = 64
  const ctx = canvas.getContext('2d')
  if (ctx) {
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, 64, 64)
    ctx.strokeStyle = '#ffffff'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(0, 32); ctx.lineTo(32, 0); ctx.lineTo(64, 32); ctx.lineTo(32, 64); ctx.closePath()
    ctx.stroke()
  }
  const tex = new THREE.CanvasTexture(canvas)
  tex.wrapS = THREE.RepeatWrapping
  tex.wrapT = THREE.RepeatWrapping
  tex.repeat.set(8, 8)
  return tex
}

const foilNoiseTex = typeof document !== 'undefined' ? createFoilNoiseTexture() : null
const meshLatticeTex = typeof document !== 'undefined' ? createMeshLatticeTexture() : null

export const MATERIALS = {
  goldFoil: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#c9a227'),
    metalness: 0.85,
    roughness: 0.42,
    normalMap: foilNoiseTex,
    normalScale: new THREE.Vector2(0.3, 0.3),
  }),

  blackStrut: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#14171c'),
    metalness: 0.2,
    roughness: 0.8,
  }),

  whitePaint: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#e2e5eb'),
    metalness: 0.1,
    roughness: 0.5,
  }),

  aluminium: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#b8c2cc'),
    metalness: 0.8,
    roughness: 0.3,
  }),

  wireMesh: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#a4b2c0'),
    metalness: 0.9,
    roughness: 0.3,
    alphaMap: meshLatticeTex,
    transparent: true,
    side: THREE.DoubleSide,
  }),

  solarPanel: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#0d1b3e'),
    metalness: 0.6,
    roughness: 0.2,
  }),

  glassLens: new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#bcd6ff'),
    metalness: 0.1,
    roughness: 0.05,
    transmission: 0.9,
    thickness: 0.2,
    transparent: true,
  }),

  retroReflector: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#b9c8d8'),
    metalness: 1.0,
    roughness: 0.06,
  }),
}
