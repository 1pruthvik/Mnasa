import type { SourceEntry } from '../contracts/types'

export const SOURCES: SourceEntry[] = [
  {
    url: 'https://nssdc.gsfc.nasa.gov',
    label: 'NASA Space Science Data Coordinated Archive (NSSDCA Home)',
    usedFor: ['0.2'],
    fetched: '2026-11-15',
  },
  {
    url: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C',
    label: 'NSSDCA Master Catalog: Apollo 11 Lunar Module / EASEP (1969-059C)',
    usedFor: ['0.2', '1.1', '6.1'],
    fetched: '2026-11-15',
  },
  {
    url: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-099C',
    label: 'NSSDCA Master Catalog: Apollo 12 Lunar Module / ALSEP (1969-099C)',
    usedFor: ['1.2', '1.4', '6.1'],
    fetched: '2026-11-15',
  },
  {
    url: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1971-063C',
    label: 'NSSDCA Master Catalog: Apollo 15 Lunar Module / ALSEP (1971-063C)',
    usedFor: ['1.3', '1.4', '6.1'],
    fetched: '2026-11-15',
  },
  {
    url: 'https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo_lrv.html',
    label: 'NSSDCA Lunar Exploration: Apollo Lunar Roving Vehicle',
    usedFor: ['1.3', '6.1'],
    fetched: '2026-11-15',
  },
  {
    url: 'https://science.nasa.gov/mission/surveyor-3/',
    label: 'NASA Science: Surveyor 3 Mission',
    usedFor: ['1.2', '6.1'],
    fetched: '2026-11-15',
  },
  {
    url: 'https://science.nasa.gov/mission/viking-1/',
    label: 'NASA Science: Viking 1 Mission',
    usedFor: ['2.1', '6.1'],
    fetched: '2026-11-15',
  },
  {
    url: 'https://science.nasa.gov/mission/mars-pathfinder/',
    label: 'NASA Science: Mars Pathfinder & Sojourner',
    usedFor: ['2.2', '6.1'],
    fetched: '2026-11-15',
  },
  {
    url: 'https://science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/',
    label: 'NASA Science: Mars Exploration Rovers (Spirit & Opportunity)',
    usedFor: ['3.1', '6.1'],
    fetched: '2026-11-15',
  },
  {
    url: 'https://science.nasa.gov/mission/insight/',
    label: 'NASA Science: InSight Mars Lander',
    usedFor: ['3.2', '6.1'],
    fetched: '2026-11-15',
  },
  {
    url: 'https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/',
    label: 'NASA Science: Ingenuity Mars Helicopter',
    usedFor: ['3.3', '6.1'],
    fetched: '2026-11-15',
  },
  {
    url: 'https://science.nasa.gov/mission/dawn/',
    label: 'NASA Science: Dawn Mission at Vesta and Ceres',
    usedFor: ['4.1', '6.1'],
    fetched: '2026-11-15',
  },
  {
    url: 'https://science.nasa.gov/mission/near-shoemaker/',
    label: 'NASA Science: NEAR Shoemaker Mission to 433 Eros',
    usedFor: ['4.2', '6.1'],
    fetched: '2026-11-15',
  },
  {
    url: 'https://science.nasa.gov/mission/pioneer-10/',
    label: 'NASA Science: Pioneer 10 Mission',
    usedFor: ['5.1', '6.1'],
    fetched: '2026-11-15',
  },
  {
    url: 'https://science.nasa.gov/mission/kepler/',
    label: 'NASA Science: Kepler & K2 Planet-Hunting Mission',
    usedFor: ['5.2', '6.1'],
    fetched: '2026-11-15',
  },
]
