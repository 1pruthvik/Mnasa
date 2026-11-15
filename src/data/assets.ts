/**
 * Manifest of local 3D models and planetary textures used in The Atlas of Quiet Explorers.
 * All models and planetary maps are derived from NASA/JPL/ESA public domain scientific archives.
 */

export interface AssetRecord {
  id: string
  name: string
  type: 'model' | 'texture'
  path: string
  source: string
  attribution: string
  license: string
  description: string
}

export const ASSET_MANIFEST: AssetRecord[] = [
  {
    id: 'apollo-lm-model',
    name: 'Apollo Lunar Module 3D Model',
    type: 'model',
    path: '/models/apollo-lm.glb',
    source: 'NASA 3D Resources',
    attribution: 'NASA / GSFC',
    license: 'Public Domain (NASA Media Guidelines)',
    description: 'Historical 3D model of Apollo Lunar Module with descent stage.',
  },
  {
    id: 'viking-lander-model',
    name: 'Viking Lander 3D Model',
    type: 'model',
    path: '/models/viking-lander.glb',
    source: 'NASA 3D Resources',
    attribution: 'NASA / JPL-Caltech',
    license: 'Public Domain (NASA Media Guidelines)',
    description: '3D model of the Viking 1 & 2 Mars lander surface science station.',
  },
  {
    id: 'opportunity-model',
    name: 'Mars Exploration Rover Opportunity (MER-B)',
    type: 'model',
    path: '/models/opportunity.glb',
    source: 'NASA 3D Resources',
    attribution: 'NASA / JPL-Caltech',
    license: 'Public Domain (NASA Media Guidelines)',
    description: '3D model of the Opportunity rover with solar arrays and Pancam mast.',
  },
  {
    id: 'insight-model',
    name: 'InSight Mars Lander 3D Model',
    type: 'model',
    path: '/models/insight.glb',
    source: 'NASA 3D Resources',
    attribution: 'NASA / JPL-Caltech',
    license: 'Public Domain (NASA Media Guidelines)',
    description: '3D model of InSight with deployed robotic arm, UltraFlex solar arrays, and SEIS dome.',
  },
  {
    id: 'ingenuity-model',
    name: 'Ingenuity Mars Helicopter 3D Model',
    type: 'model',
    path: '/models/ingenuity.glb',
    source: 'NASA 3D Resources',
    attribution: 'NASA / JPL-Caltech',
    license: 'Public Domain (NASA Media Guidelines)',
    description: '3D model of the Ingenuity Mars coaxial rotorcraft.',
  },
  {
    id: 'dawn-model',
    name: 'Dawn Spacecraft 3D Model',
    type: 'model',
    path: '/models/dawn.glb',
    source: 'NASA 3D Resources',
    attribution: 'NASA / JPL-Caltech / UCLA',
    license: 'Public Domain (NASA Media Guidelines)',
    description: '3D model of Dawn with ion propulsion thrusters and large solar wings.',
  },
  {
    id: 'near-model',
    name: 'NEAR Shoemaker 3D Model',
    type: 'model',
    path: '/models/near.glb',
    source: 'NASA 3D Resources',
    attribution: 'NASA / JHUAPL',
    license: 'Public Domain (NASA Media Guidelines)',
    description: '3D model of NEAR Shoemaker landed on Asteroid 433 Eros.',
  },
  {
    id: 'pioneer10-model',
    name: 'Pioneer 10 3D Model',
    type: 'model',
    path: '/models/pioneer10.glb',
    source: 'NASA 3D Resources',
    attribution: 'NASA / Ames Research Center',
    license: 'Public Domain (NASA Media Guidelines)',
    description: '3D model of Pioneer 10 with 2.74m parabolic dish antenna and golden plaque.',
  },
  {
    id: 'kepler-model',
    name: 'Kepler Space Telescope 3D Model',
    type: 'model',
    path: '/models/kepler.glb',
    source: 'NASA 3D Resources',
    attribution: 'NASA / Ames Research Center / Ball Aerospace',
    license: 'Public Domain (NASA Media Guidelines)',
    description: '3D model of Kepler photometer and angled solar shield.',
  },
  {
    id: 'sun-texture',
    name: 'Sun Photosphere Texture',
    type: 'texture',
    path: '/textures/sun.jpg',
    source: 'NASA SOHO / SDO',
    attribution: 'NASA / ESA SDO',
    license: 'Public Domain',
    description: 'High-contrast photosphere map of the Sun.',
  },
  {
    id: 'moon-texture',
    name: 'Lunar Reconnaissance Orbiter (LRO) Albedo Map',
    type: 'texture',
    path: '/textures/moon.jpg',
    source: 'NASA Goddard SVS / LROC',
    attribution: 'NASA / GSFC / Arizona State University',
    license: 'Public Domain',
    description: '1K global surface texture map of the Moon with crater highlands and maria.',
  },
  {
    id: 'mars-texture',
    name: 'Mars Global Surveyor / Viking Color Map',
    type: 'texture',
    path: '/textures/mars.jpg',
    source: 'NASA / USGS Astrogeology Science Center',
    attribution: 'NASA / JPL / USGS',
    license: 'Public Domain',
    description: '1K global true-color mosaic of Mars.',
  },
  {
    id: 'earth-texture',
    name: 'NASA Blue Marble Earth Map',
    type: 'texture',
    path: '/textures/earth.jpg',
    source: 'NASA Earth Observatory',
    attribution: 'NASA / GSFC Earth Observatory',
    license: 'Public Domain',
    description: 'Visible Earth global surface texture map.',
  },
]

