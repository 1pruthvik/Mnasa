import type { WidgetSpec } from '../contracts/types'

export const ALL_WIDGETS: WidgetSpec[] = [
  { id: 'fact-drawer', sceneId: '0.2', placement: 'left', title: 'NSSDCA Catalogue Record' },
  { id: 'still-working-toggle', sceneId: '1.1', placement: 'right', title: 'Show Only What Still Works' },
  { id: 'moonquake', sceneId: '1.2', placement: 'right', title: 'Artificial Moonquake Waveform' },
  { id: 'odometer', sceneId: '1.3', placement: 'right', title: 'Lunar Roving Vehicle Distance Traverses' },
  { id: 'rtg-diagram', sceneId: '1.3', placement: 'right', title: 'SNAP-27 RTG Exploded Spec' },
  { id: 'date-slider', sceneId: '1.4', placement: 'bottom', title: 'ALSEP Network Shutdown Timeline' },
  { id: 'weather-log', sceneId: '2.1', placement: 'right', title: 'Viking Weather Telemetry Log' },
  { id: 'bounce-counter', sceneId: '2.2', placement: 'right', title: 'Airbag Bounce Metrics' },
  { id: 'range-compare', sceneId: '2.2', placement: 'right', title: 'Mars Surface Distance Scale' },
  { id: 'odometer-wall', sceneId: '3.1', placement: 'right', title: 'Off-Earth Roving Records Wall' },
  { id: 'vital-signs', sceneId: '3.2', placement: 'right', title: 'Mars Vital Signs Dashboard' },
  { id: 'audio-player', sceneId: '3.2', placement: 'right', title: 'Martian Wind Recording' },
  { id: 'flight-counter', sceneId: '3.3', placement: 'right', title: 'Planned vs Flown Flight Metrics' },
  { id: 'descent-ladder', sceneId: '4.2', placement: 'right', title: 'Eros Descent Ladder' },
  { id: 'signal-delay', sceneId: '5.1', placement: 'right', title: 'Interstellar Signal Travel Time' },
  { id: 'plaque-viewer', sceneId: '5.1', placement: 'right', title: 'Pioneer Plaque Hotspots' },
  { id: 'transit-demo', sceneId: '5.2', placement: 'right', title: 'Exoplanet Transit Photometry' },
]

