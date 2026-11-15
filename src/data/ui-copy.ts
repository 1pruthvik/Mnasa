// src/data/ui-copy.ts — UI copy deck from §3.9b
export const UI_COPY = {
  rail: {
    hint: 'Scroll to descend',
  },
  label: {
    toggle: 'Labels',
    off: 'Labels off',
  },
  mode: {
    reading: 'Reading mode',
    immersive: 'Immersive mode',
  },
  map: {
    title: 'Where they are',
    note: 'Schematic. Positions from published coordinates; not a navigation aid.',
    noteMars: 'Four sites are named in the source material without published coordinates.',
  },
  table: {
    title: 'The full inventory',
    sortYear: 'Sort by date',
    sortDistance: 'Sort by distance',
    filter: 'Still working',
    filterNote: 'Nothing on this list that needed power is still running.',
    unknownDate: 'The source does not state a precise date.',
  },
  drawer: {
    note: "Where NASA says 'not known', our website says 'not known'.",
  },
  signal: {
    ours: "our estimate at today's distance — NASA's last measurement was 11 h 20 min",
    nasaLabel: 'NASA, last signal, 23 January 2003',
  },
  quake: {
    note: 'A record of an artificial impact, not an audio recording.',
  },
  audio: {
    warn: 'Recorded on Mars, 1 December 2018. Contains low-frequency rumble.',
    credit: 'NASA/JPL-Caltech/CNES/IPGP/Imperial College/Cornell',
  },
  freeze: {
    caption: 'Rotor damage. The last flight was 18 January 2024.',
  },
  descent: {
    note: 'Distances and body sizes in the descent are compressed for legibility. Object dimensions are to scale.',
  },
  door: {
    caption: "NASA's permanent archive for space science mission data.",
  },
  end: {
    line: 'Abandoned, but not forgotten.',
  },
  error: {
    widget: 'This diagram failed to load.',
    gl: "This device can't run the 3D view, so here's the whole story in text.",
  },
  footer: {
    disclaimer:
      'NASA does not endorse any non-U.S. Government entity and is not responsible for information contained on non-U.S. Government websites. For non-U.S. Government websites, participants must comply with any data use parameters of that specific website.',
  },
} as const
