// src/data/sources.ts
export interface NasaSource {
  id: string
  title: string
  category: 'Moon' | 'Mars' | 'Asteroids' | 'Interstellar' | 'Archive'
  url: string
  nssdcaId?: string
  description: string
}

export const NASA_SOURCES: NasaSource[] = [
  {
    id: 'nssdca-master',
    title: 'NASA Space Science Data Coordinated Archive (NSSDCA)',
    category: 'Archive',
    url: 'https://nssdc.gsfc.nasa.gov/',
    description: "NASA's definitive, publicly available catalog to search for any spacecraft, mission parameters, resting place, and status.",
  },
  {
    id: 'apollo-lm',
    title: 'Apollo Lunar Modules (LM Descent Stages)',
    category: 'Moon',
    url: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C',
    nssdcaId: '1969-059C',
    description: "Descent stages left behind as launch pads at Tranquility Base, Ocean of Storms, and Hadley Rille.",
  },
  {
    id: 'lrv',
    title: 'Lunar Roving Vehicles (LRVs)',
    category: 'Moon',
    url: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1971-063C',
    nssdcaId: '1971-063C',
    description: 'Electric mobility buggies driven on Apollo 15, 16, and 17, parked permanently on the lunar surface.',
  },
  {
    id: 'alsep',
    title: 'ALSEP Scientific Packages',
    category: 'Moon',
    url: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-099C',
    nssdcaId: '1969-099C',
    description: 'Apollo Lunar Surface Experiments Packages (seismometers, SNAP-27 RTGs, retroreflectors) left for ongoing science.',
  },
  {
    id: 'surveyor-3',
    title: 'Surveyor 3 Lander',
    category: 'Moon',
    url: 'https://science.nasa.gov/mission/surveyor-3/',
    nssdcaId: '1967-035A',
    description: 'Proved soft landings on the Moon in 1967. Apollo 12 touched down 180m away and inspected its hardware.',
  },
  {
    id: 'pathfinder-sojourner',
    title: 'Mars Pathfinder & Sojourner Rover',
    category: 'Mars',
    url: 'https://science.nasa.gov/mission/mars-pathfinder/',
    nssdcaId: '1996-068A',
    description: 'The first rover on Mars (1997) delivered by the tetrahedral airbag lander at Ares Vallis. Now permanently parked.',
  },
  {
    id: 'mer-spirit-opportunity',
    title: 'Spirit & Opportunity (Mars Exploration Rovers)',
    category: 'Mars',
    url: 'https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/',
    nssdcaId: '2003-027A',
    description: 'Twin robot geologists at Gusev Crater and Meridiani Planum that operated for years. Inactive monuments on Mars.',
  },
  {
    id: 'viking-1',
    title: 'Viking 1 Lander (Thomas Mutch Memorial Station)',
    category: 'Mars',
    url: 'https://science.nasa.gov/mission/viking-1/',
    nssdcaId: '1975-075C',
    description: 'First U.S. lander to operate on Mars (1976) at Chryse Planitia. Went silent due to a command sequence uplink error.',
  },
  {
    id: 'insight',
    title: 'InSight Mars Lander',
    category: 'Mars',
    url: 'https://science.nasa.gov/mission/insight/',
    nssdcaId: '2018-042a',
    description: 'Listened for marsquakes with SEIS and measured subsurface heat flow at Elysium Planitia until dust covered its solar arrays.',
  },
  {
    id: 'ingenuity',
    title: 'Ingenuity Mars Helicopter',
    category: 'Mars',
    url: 'https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/',
    description: 'First powered controlled aircraft on another planet (72 flights, 17 km). Sustained rotor tip damage on flight 72.',
  },
  {
    id: 'dawn',
    title: 'Dawn Spacecraft',
    category: 'Asteroids',
    url: 'https://science.nasa.gov/mission/dawn/',
    nssdcaId: '2007-043A',
    description: 'Explored Vesta and Ceres. Ran out of hydrazine attitude fuel in 2018 and remains in a stable, unpowered perpetual orbit.',
  },
  {
    id: 'near-shoemaker',
    title: 'NEAR Shoemaker',
    category: 'Asteroids',
    url: 'https://science.nasa.gov/mission/near-shoemaker/',
    nssdcaId: '1996-008A',
    description: 'First spacecraft to orbit and touch down on an asteroid (433 Eros, 2001). Machine that was never designed with landing legs.',
  },
  {
    id: 'pioneer-10',
    title: 'Pioneer 10',
    category: 'Interstellar',
    url: 'https://science.nasa.gov/mission/pioneer-10/',
    nssdcaId: '1972-012A',
    description: 'First probe through asteroid belt and past Jupiter. Drifting silently toward Aldebaran carrying the golden plaque.',
  },
  {
    id: 'kepler',
    title: 'Kepler Space Telescope',
    category: 'Interstellar',
    url: 'https://science.nasa.gov/mission/kepler/',
    nssdcaId: '2009-011A',
    description: 'Discovered over 2,600 exoplanets. Ran out of fuel in 2018 and drifts silently in an Earth-trailing heliocentric orbit.',
  },
]
