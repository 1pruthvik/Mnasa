# Abandoned But Not Forgotten — Acceptance Log

## Status

| Milestone | Owner | State | Note |
|---|---|---|---|
| M0 Contracts | pru | ✅ | BEATS_VERSION 1 frozen. All 15 objects and 17 scenes typed and verified. |
| M1 Camera & Rail | pru & niv | ✅ | Single scroll progress driver active; rail & 38-screen track verified. |
| M2 Copy & Scenes | pru | ✅ | Verbatim copy and quotes from NASA sources for all 17 scenes. |
| M3 High-Value Widgets | pru | ✅ | Odometer, FlightCounter (overflow), RtgDiagram, WeatherLog, DateSlider, StillWorkingToggle. |
| M4 Atlas Maps | pru | ✅ | Lunar & Mars SVG maps with honest coordinates and hollow uncoordinated site pins. |
| M5 Inventory Table | pru | ✅ | Sortable by year and distance; "Still working" filter; 320px mobile card responsive. |
| M6 Fallback & A11y | pru | ✅ | Complete non-3D FallbackStory, reading mode, keyboard nav, screen-reader summaries. |

## Accuracy Pass (Canonical 17 Scenes)

| Scene | Subject | Numbers checked against | Quotes verified | Source URL | Verified By |
|---|---|---|---|---|---|
| 0.1 | Milky Way | objects.ts | Plaque inscription | NSSDCA 1969-059C | pru |
| 0.2 | Catalogue | objects.ts (1969-059C) | Verbatim NSSDCA | NSSDCA 1969-059C | pru |
| 1.1 | Eagle | objects.ts | Neil Armstrong | NSSDCA 1969-059C | pru |
| 1.2 | Intrepid & Surveyor 3 | objects.ts | Vidicon failure quote | NSSDCA 1969-099C & Surveyor 3 | pru |
| 1.3 | Falcon & LRV | objects.ts | Harrison Schmitt | NSSDCA 1971-063C & apollo_lrv | pru |
| 1.4 | Six Stations | objects.ts | EASEP frequencies | NSSDCA 1969-059C | pru |
| 2.1 | Viking 1 | objects.ts | Viking fleet totals | NASA Science Viking 1 | pru |
| 2.2 | Pathfinder & Sojourner | objects.ts | n/a | NASA Science Mars Pathfinder | pru |
| 3.1 | Spirit & Opportunity | objects.ts | Pancam clean panels | NASA Science MER | pru |
| 3.2 | InSight | objects.ts | Martian wind audio | NASA Science InSight | pru |
| 3.3 | Ingenuity | objects.ts | n/a | NASA Science Ingenuity | pru |
| 4.1 | Dawn | objects.ts | n/a | NASA Science Dawn | pru |
| 4.2 | NEAR Shoemaker | objects.ts | Touchdown coordinates | NASA Science NEAR Shoemaker | pru |
| 5.1 | Pioneer 10 | objects.ts | Plaque purpose | NASA Science Pioneer 10 | pru |
| 5.2 | Kepler / K2 | objects.ts | William Borucki | NASA Science Kepler | pru |
| 6.1 | The Full Inventory | objects.ts | n/a | All 15 source pages | pru |
| 6.2 | The Close | objects.ts | n/a | Final litany | pru |

## Deliberate Conservative / Unknown Fields

| Object | Field | Reason from NASA Source |
|---|---|---|
| Spirit | wentQuiet | Supplied NASA page does not state exact final command date; recorded as year '2010'. |
| Opportunity | wentQuiet | Recorded as '2018-06' during the planet-wide dust storm. |
| Mars Pathfinder | lat / lon | Supplied NASA page gives site name 'Ares Vallis' without coordinates. Displayed as hollow marker on map. |
| Spirit, Opportunity, Ingenuity | lat / lon | Published by named craters/valleys in brief; handled honestly with site names. |

## Verification Sign-Off

- **Single Progress Seam**: `useLenis` drives window scroll; raw `progress` feeds R3F and DOM overlays.
- **Tone & Registry**: Zero instances of banned words (*junk, trash, wreck, garbage, graveyard, litter*). NASA archival voice preserved throughout.
- **Non-Endorsement Notice**: Placed in footer and full credit ledger.

