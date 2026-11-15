# ══════════════════════════════════════════════════════════════════════════════
#  ABANDONED BUT NOT FORGOTTEN — MASTER BUILD PROMPT
#  NASA Space Apps Challenge 2026 · Experiential 3D Scroll Website
# ══════════════════════════════════════════════════════════════════════════════

## CONTENTS — four parts, pasted separately into Antigravity

| Part | File section | Who pastes | Owns |
|---|---|---|---|
| **PART 0 — INITIAL PART** | §0.1 – §0.23 | both, once, at session start | context, facts, copy, rules |
| **PART 1 — NIVISH PART** | §1.0 – §1.25 | Nivish | `src/three/**` — Three.js, R3F, anime.js 3D |
| **PART 2 — PRUTHVIK PART** | §2.0 – §2.24 | Pruthvik | contracts, data, store, `src/ui/**`, anime.js DOM |
| **PART 3 — INTEGRATION PROMPT** | §3.0 – §3.14b | both, at merge | QA, perf, schedule, deploy, submission |

## Paste order (do not improvise)

1. **PART 0** → both, at the top of the session. Keep it there for the whole build.
2. **PART 1** → Nivish only.
3. **PART 2** → Pruthvik only.
4. **PART 3** → both, when you merge.

## The one rule

Pruthvik writes `src/contracts/` and `src/data/` **first, at H0**, and freezes them.
Nivish never edits those files. Nivish owns everything with triangles in it. Pruthvik
owns everything with words in it. The only shared surfaces are `progress` in the store,
`beats.ts`, `tokens.css` and one projection helper.

## Source of truth

`Abandoned_But_Not_Forgotten_Storytelling_Script.pdf` — 17 scenes, 15 objects, all
NASA-sourced. Every fact in these four parts is traceable to a NASA page named in
PART 0 §0.18 and in `src/data/sources.ts`.

---

# ══════════════════════════════════════════════════════════════════════════════
# ABANDONED BUT NOT FORGOTTEN — MASTER BUILD PROMPT v2.0
# NASA Space Apps Challenge 2026 · Experiential 3D Scroll Website
# ══════════════════════════════════════════════════════════════════════════════
#
# FOUR PARTS · EACH PART IS PASTED SEPARATELY INTO ANTIGRAVITY
#
#   PART 0 — INITIAL PART ....... permanent context for both builders
#   PART 1 — NIVISH PART ........ Three.js + anime.js descent engine
#   PART 2 — PRUTHVIK PART ...... archive layer, data, DOM, anime.js UI
#   PART 3 — INTEGRATION PROMPT . merge, QA, schedule, deploy, submission
#
# Stack: Vite · React 18 · TypeScript · Three.js · @react-three/fiber
#        @react-three/drei · @react-three/postprocessing · anime.js v4
#        zustand · lenis · CSS Modules
#
# Source of truth: Abandoned_But_Not_Forgotten_Storytelling_Script.pdf
# Companion data:  MASTER_PROMPT_Antigravity_Nivish_Pruthvik.md
# Every fact in this document is traceable to a NASA page listed in §0.16.
# ══════════════════════════════════════════════════════════════════════════════


# ══════════════════════════════════════════════════════════════════════════════
# PART 0 — INITIAL PART
# Paste this first. It is permanent context. Both builders paste the same text.
# ══════════════════════════════════════════════════════════════════════════════


## 0.1 — What you are being asked to build

You are a senior creative technologist building a production website for a NASA
Space Apps Challenge submission. Two engineers work in parallel in one repository.
Your job in this session is to write code that satisfies the specification below
exactly, in small runnable increments, with no invented facts.

**The product.** "Abandoned but Not Forgotten" is a scroll-driven experiential
website. A visitor begins at the scale of the Milky Way, and by scrolling alone
falls through the Sun, the solar system, the inner planets and Earth, and lands
on the Moon — then travels to Mars, into the asteroid belt, and out to
interstellar space — to look at fifteen pieces of NASA hardware that are still
exactly where they were left. Every object has an NSSDCA catalogue record. The
visitor's only input is scrolling. There are no menus in the 3D experience, no
clicks required to advance, no modals. The site's argument, stated in the closing
scene, is: *the machines were abandoned, but the addresses were not.*

**The emotional arc.** Wonder (scale) → recognition (a catalogue) → intimacy
(one footpad) → loss (Viking's faulty command, Kepler's empty tank) → awe (Pioneer
10 still travelling) → resolution (a filed inventory). Every technical decision
must serve that arc. If a decision makes the site cleverer but colder, reject it.

**The audience.** NASA judges, other teams, and members of the public on a phone.
The judges may open the site on a locked-down laptop with no WebGL. That is why
the non-3D fallback is not optional.

**What "done" means.** See §0.15. Read it before you write a single line, because
it is also the judging rubric.


## 0.2 — How the four parts fit together

```
PART 0  (this file)  → pasted by BOTH, once, at session start. Permanent context.
PART 1  (Nivish)     → pasted by Nivish. Owns src/three/**.
PART 2  (Pruthvik)   → pasted by Pruthvik. Owns src/contracts/**, src/data/**,
                        src/store.ts, src/ui/**, src/App.tsx, public/**.
PART 3  (Integration) → pasted by BOTH when merging. Owns the schedule, the QA
                        matrix, the deploy, the submission.
```

**The single rule that prevents merge hell.** Pruthvik writes `src/contracts/`
and `src/data/` FIRST and freezes them. Nivish never edits those files. In one
sentence: **Nivish owns everything with triangles in it; Pruthvik owns everything
with words in it.** The only shared surfaces are (a) the `progress` number in the
zustand store, (b) the `beats.ts` timeline, (c) `tokens.css`, and (d) one helper
file `src/three/systems/project.ts` that Nivish writes and Pruthvik reads.

**Paste protocol.**
1. Both paste PART 0 at the top of their Antigravity session. Keep it there.
2. Nivish pastes PART 1 as his working brief.
3. Pruthvik pastes PART 2 as his working brief.
4. When you integrate, both paste PART 3.
5. Drive the agent one milestone at a time. Never paste two milestone prompts at
   once. After every milestone, run `npm run build` and load the page. If it is
   red, stop and fix before continuing.


## 0.3 — Non-negotiable accuracy rules

These are the rules that make the site credible. They outrank design preference.

1. **Every number rendered on screen must exist in `src/data/objects.ts` or
   `src/data/scenes.ts`**, and that record must name its NASA source. If a number
   is not in the data file, it does not go on screen. No exceptions, including
   "obviously true" numbers.
2. **Never write** *junk, trash, wreck, garbage, graveyard, space debris problem,
   litter*. Use NASA's own register: *inactive, retired, inoperable, silent,
   stationary artifact, out of fuel, on the surface, remains in orbit*.
3. **Where NASA does not know, we say we do not know.** The canonical example,
   quoted verbatim: *"The fate of the LM is not known, but it is assumed that it
   crashed into the lunar surface sometime within the following 1 to 4 months."*
   Never smooth an unknown into a tidy ending.
4. **Never describe an object's current appearance** unless the source says so.
   Only two objects qualify: InSight (imaged from orbit after retirement to study
   dust movement) and Ingenuity (documented rotor damage). No invented dust
   layers, no invented corrosion, no colour drift, no "now a silent sentinel"
   imagery in the voice of fact. Poetic framing is allowed in the closing litany
   only, and it must be phrased as image, not as observation.
5. **Quotations must be verbatim**, including punctuation, and must carry the
   speaker and the source page. Do not paraphrase inside quotation marks.
6. **No editorialising about money or politics.** The only financial figures used
   anywhere: the LRV contract ($19M original → $38M final) in Scene 1.3, and the
   Discovery programme cost cap (< ~$150M mid-1990s dollars) in Scene 4.2.
7. **Credits.** Every NASA image carries `Credit: NASA` or the exact credit line
   from its record. Every audio file carries its full credit line, visible
   without interaction. Never use the NASA logo or insignia as a design element.
   Never use the word "official". Footer must contain the non-endorsement notice.
8. **Label every extrapolation.** If we compute a live number from a documented
   one (e.g. today's signal travel time to Pioneer 10), it must be labelled as
   *our estimate*, with NASA's last measured figure shown beside it.
9. **No fake telemetry, no fake countdowns, no invented "live" data.** There is
   no live feed in this project. Do not simulate one.
10. **Dates are shown in the form NASA uses** and in UTC where NASA gives UTC,
    with the format `20 Jul 1969 · 20:17:40 UT`. Coordinates use the NSSDCA
    form `0.67416° N, 23.47314° E` with the degree symbol and the hemisphere
    letter. Tabular figures, monospaced digits, no rounding unless the source
    rounds.


## 0.4 — Tone, voice and language rules

**Narrator.** One voice. Third person, past tense for history, present tense for
the object's current condition. Calm, unhurried, factual. A museum audio guide,
not a movie trailer. No exclamation marks anywhere on the site.

**Sentence rhythm.** Alternate a long descriptive line (18–25 words) with a short
flat one (4–8 words). The short ones carry the facts. Example from the script:
*"The stations did not fail that day. They were switched off, together, from
Earth. Except for the mirrors."*

**Density.** One idea per screen. One number per screen, maximum. A visitor
scrolling on a phone remembers one fact per screen; give them the best one. Hard
cap: **45 visible words per scroll-screen** of narrative copy.

**Person.** Second person is allowed only for the visitor's position, never for
the object's interiority. *"You are standing at 26.13° N"* is allowed. *"You are
the rover, waiting"* is forbidden.

**What we never do.**
- Never anthropomorphise a spacecraft into speech, thought or feeling.
- Never moralise about waste, littering, or "leaving our mark".
- Never claim the objects are "waiting", "hoping", "dreaming", "sleeping".
- Never use the word "we" to mean humanity in a grandiose register.
- Never use a sci-fi register. No "signal lost…", no terminal voice, no glitch
  text, no beeps.

**What we may do.** Let the dates and numbers do the emotional work. *"Turned on
18:37 UT, 31 July 1971. Shut down 30 September 1977."* Nothing invented will beat
that. When in doubt, cut the adjective and keep the timestamp.

**Reading level.** Age 12 and up. If a 12-year-old cannot follow the number, cut
the number.


## 0.5 — The eight zoom stops (the spine of the whole site)

The site's navigation metaphor is a camera falling toward a surface. The rail at
the bottom of the screen shows eight named stops, exactly as in the reference
design language supplied with the brief:

| # | Rail label | What the visitor is looking at | Narrative job |
|---|---|---|---|
| 0 | **Milky Way** | A field of stars, one of them marked | Establish scale, then break it |
| 1 | **Sun** | One star, huge and near | The source of every "still working" object |
| 2 | **Solar system** | Eight planets, orbits implied | The scale of the machine we built |
| 3 | **Inner planets** | Four rocky worlds, closing in | We are almost at the ground |
| 4 | **Earth** | One blue world | The place that kept the paperwork |
| 5 | **Moon** | Gray regolith, four sites | Six objects, one shutdown date |
| 6 | **Mars** | Oxide red, dust haze | Nine objects, six kinds of silence |
| 7 | **Anywhere** | No ground at all | Four objects that left the map |

When the visitor reaches the final scene, the rail returns but each stop is
relabelled with what is actually there — the visitor's own scroll becomes the map.


## 0.6 — The seven movements and seventeen scenes (full index)

| Scene | Title | Objects | Beat window (t of whole page) | Owner of 3D |
|---|---|---|---|---|
| 0.1 | Somewhere in the Milky Way | — (scale only) | 0.000–0.145 | Nivish |
| 0.2 | The catalogue that remembers | NSSDCA as a character | 0.145–0.175 | Nivish |
| 1.1 | Eagle | Apollo 11 LM / EASEP / LRRR | 0.175–0.225 | Nivish |
| 1.2 | Intrepid, and the machine it came to visit | Apollo 12 LM / ALSEP + Surveyor 3 | 0.225–0.275 | Nivish |
| 1.3 | Falcon, and the car we parked | Apollo 15 LM / ALSEP + LRV | 0.275–0.335 | Nivish |
| 1.4 | The six stations, and the year the listening stopped | All ALSEP stations | 0.335–0.400 | Nivish (reuse) |
| 2.1 | The lander that was renamed for a man who died | Viking 1 Lander / Orbiter | 0.400–0.445 | Nivish |
| 2.2 | Sojourner: the first wheels, and the beach ball | Mars Pathfinder / Sojourner | 0.445–0.490 | Nivish |
| 3.1 | Spirit and Opportunity: two sides of one planet | Spirit + Opportunity | 0.490–0.535 | Nivish |
| 3.2 | InSight: the machine that listened | InSight + MarCO | 0.535–0.585 | Nivish |
| 3.3 | Ingenuity: seventy-two flights | Ingenuity Mars Helicopter | 0.585–0.660 | Nivish |
| 4.1 | Dawn: out of fuel, in orbit, forever | Dawn at Ceres / Vesta | 0.660–0.710 | Nivish |
| 4.2 | NEAR Shoemaker: the landing nobody planned | NEAR Shoemaker at 433 Eros | 0.710–0.760 | Nivish |
| 5.1 | Pioneer 10: still going, no longer speaking | Pioneer 10 | 0.760–0.810 | Nivish |
| 5.2 | Kepler: 2,600 worlds | Kepler / K2 | 0.810–0.860 | Nivish |
| 6.1 | The full inventory | All fifteen | 0.860–0.940 | Nivish (dissolve) |
| 6.2 | Abandoned, but not forgotten | — (the close) | 0.940–1.000 | Nivish (star field) |

Total document height on desktop: **38 × 100vh**. Scroll progress is
`progress = scrollY / (documentHeight - innerHeight)`, clamped to 0…1.
The beat windows above are the contract. Pruthvik encodes them; Nivish times his
camera curves to them.


## 0.7 — Scene 0.1 · "Somewhere in the Milky Way"

**Where.** No coordinates yet. Scroll position 0 %.
**Copy, in scroll order.**
1. *"A few hundred billion stars. One of them is ours."*
2. *"Around it, eight planets. Around one of those planets, one moon. And on that
   moon, and on the fourth planet out, there are machines that stopped working
   decades ago and have not moved since."*
3. *"This is not a story about garbage. It is a story about a filing system — the
   most patient filing system humans have ever built — and about fifteen pieces
   of hardware that are still filed, still numbered, still sitting exactly where
   the paperwork says they are."*

**Quote shown at the end of the scene (amber):**
> *"We came in peace for all mankind."*
> — Inscription on the plaque left on the Apollo 11 descent stage, read aloud by
> the crew on the surface, 20 July 1969. Quoted on NSSDCA 1969-059C.

**3D (Nivish).** GPU point-cloud star field, three parallax layers (200k / 60k /
20k points), custom ShaderMaterial with size attenuation and slow twinkle. A
single bright point grows as `progress` rises. Stars streak past, then resolve.
**Interaction (Pruthvik).** The eight-stop rail fades in at `progress > 0.02`.
Nothing requires a click. Scroll drives a continuous zoom; no modals.
**Facts available here.** The objects in this site span the Moon, Mars, the main
asteroid belt, interstellar space and heliocentric orbit. Kepler, for example,
was retired *"within its current, safe orbit, away from Earth"* in October 2018.


## 0.8 — Scene 0.2 · "The catalogue that remembers"

**Where.** Earth · NASA Goddard Space Flight Center, Greenbelt, Maryland — the
archive. Not a museum. A form.

**Copy.**
1. *"Every object in this story has a number. Not a nickname — a number. The
   NSSDCA/COSPAR ID."*
2. *"The NASA Space Science Data Coordinated Archive describes itself plainly:
   NASA's permanent archive for space science mission data. It is the place you
   go to search for any spacecraft or instrument ever sent into space, retrieve
   its mission parameters, and find out what happened to it."*
3. *"So this is what we are actually doing. We are reading the file. The file
   says: object **1969-059C**. Alternate names: LM-5, Eagle, Apollo11EASEP.
   Launch date 1969-07-16. Launch vehicle Saturn 5. Mass 15,103 kilograms. And
   then, in the plainest sentence in the whole archive, it tells you what happened
   to the thing after the astronauts left."*

**Quote (amber, held for two full seconds of scroll):**
> *"The fate of the LM is not known, but it is assumed that it crashed into the
> lunar surface sometime within the following 1 to 4 months."*
> — NSSDCA spacecraft record 1969-059C, Apollo 11 Lunar Module / EASEP.

**Rule displayed as a design element:** *"Where NASA says 'not known', our
website says 'not known'."*

**3D (Nivish).** The star field decays into a paper-white plane. The camera passes
*through* the catalog record as if through a doorway. This is the transition from
space to story and it is the most important transition in the site.
**Widget (Pruthvik).** `FactDrawer` — a real, selectable catalog record; fields
type in on scroll; final paragraph held in amber.


## 0.9 — Scene 1.1 · "Eagle"

**Where.** Mare Tranquilitatis (Sea of Tranquility) · 0.67416° N, 23.47314° E ·
arrived 20 July 1969 · quiet 27 August 1969.
**Objects.** Apollo 11 Lunar Module descent stage "Eagle" + Early Apollo Surface
Experiments Package (EASEP) + Laser Ranging Retroreflector (LRRR).
**NSSDCA ID.** 1969-059C · **Mass** 15,103 kg (ascent + descent, incl. propellant).

**Copy, in scroll order.**
1. *"20 July 1969, 20:17:40 UT. A machine the shape of a spider sets itself down
   on a flat gray plain at 0.67416 degrees north, 23.47314 degrees east. The
   coordinates were not known to that precision at the time. They were measured
   later, from orbit, by the Lunar Reconnaissance Orbiter."*
2. *"Nineteen minutes after Neil Armstrong stepped out, Edwin Aldrin followed him
   and called the surface what it looks like: 'Magnificent desolation.'"*
3. *"Then the two men did something that is easy to miss in the drama of the
   moment. They took the spacecraft apart by leaving half of it behind."*
4. *"The Lunar Module was two vehicles stacked. A descent stage — an octagonal
   prism 4.2 metres across and 1.7 metres thick, four landing legs with round
   footpads 9.4 metres apart, a one-metre conical engine skirt underneath — and,
   sitting on top of it, a small ascent stage with a crew cabin of 6.65 cubic
   metres and no seats at all. When the ascent stage lit its 15,000-newton engine
   and went home, the descent stage stayed. It was built to stay. It was the
   launch pad."*
5. *"And underneath the ladder, 17 metres south of the spacecraft, they left a
   package on the ground: two solar panels facing east and west, a passive
   seismometer, a lunar dust detector, an antenna pointing at Earth, and 48
   kilograms of apparatus including a small isotope heater. It was switched on by
   command from the ground at 04:40:39 UT while the crew was still outside."*

**Quote.**
> *"Houston, Tranquility Base here — the Eagle has landed."*
> — Neil Armstrong, 20 July 1969, 20:17:40 UT.

**The time of death (the beat every scene ends on).**
*"The EASEP operated on the lunar surface for the rest of that first lunar day,
despite running at temperatures 30 °C above its planned maximum. It worked.
Ground controllers stopped transmissions about five hours before local lunar
sunset, on 3 August 1969, at 10:58:46 UT, because the power was dropping exactly
as predicted. Then they tried again on the next lunar day. And on 27 August 1969,
near noon of that second lunar day, the package stopped accepting commands from
Earth. The experiment was terminated. The seismometer is still there. The
retroreflector — deployed about five metres north-north-west of the package, a
mirror that needs no power at all — is still there too."*

**Widgets.** Footpad scale comparison against a human silhouette (9.4 m span).
Toggle **"show only what still works"** → only the passive retroreflector stays
lit; caption: *"One mirror. No power. Still there."*


## 0.10 — Scene 1.2 · "Intrepid, and the machine it came to visit"

**Where.** Oceanus Procellarum · 3.0128° S, 23.4219° W · arrived 19 November 1969
· landed about 180 m from Surveyor 3.
**Objects.** Apollo 12 LM "Intrepid" descent stage + ALSEP, and Surveyor 3
(NSSDCA 1967-035A, mass 997.9 kg).

**Copy, in scroll order.**
1. *"Three months after Tranquility Base, a second crew came down in the Oceanus
   Procellarum with a specific address in mind. They landed at 3.0128 degrees
   south, 23.4219 degrees west — within about 180 metres of a machine that had
   been dead for two and a half years."*
2. *"That machine was Surveyor 3. It had launched on 17 April 1967 on an Atlas
   Centaur, massed 997.9 kilograms, and carried exactly two scientific
   instruments: a television camera and a surface sampler. Its descent did not go
   smoothly. Highly reflective rocks confused the descent radar and the main
   engine failed to cut off at the right moment, about 4.3 metres above the
   ground. So Surveyor 3 bounced. Twice. The first bounce took it 10 metres up;
   the second, 3 metres. On the third contact it settled, softly, at 00:04:17 UT
   on 20 April 1967."*
3. *"Then it did its job with great thoroughness. It sent back 6,326 television
   pictures. Its surface sampler dug four trenches, performed four bearing tests
   and thirteen impact tests. And from those tests scientists reached a
   conclusion that made the rest of this story possible: lunar soil has a
   consistency similar to wet sand, with a bearing strength of about 10 pounds per
   square inch — solid enough to hold up an Apollo Lunar Module."*
4. *"Last contact: 4 May 1967, two days after the lunar night began."*
5. *"So when Pete Conrad and Alan Bean walked over to it in November 1969, they
   were not visiting a wreck. They were collecting a sample of something no
   laboratory on Earth could provide: two and a half years of exposure to the
   Moon. They brought back about 10 kilograms of parts, including the soil scoop
   and the camera system, so that scientists could evaluate what that exposure had
   done."*

**Quote (the human failure — amber).**
> *"The TV camera was inadvertently pointed towards the Sun when it was being set
> up and the vidicon tube was damaged rendering the camera inoperable."*
> — NSSDCA 1969-099C.

**Copy continues.**
6. *"And the crew left their own machine behind, exactly like the first crew did.
   Intrepid's descent stage stayed where it landed. On the second moonwalk they
   deployed the ALSEP — the Apollo Lunar Surface Experiments Package — six
   instruments arranged around a 25-kilogram central station that supplied power
   and talked to Earth through a 58-centimetre helical antenna pointed by hand.
   That station was turned on at 14:21 UT on 19 November 1969."*
7. *"It was shut down, along with every other ALSEP station, on 30 September
   1977."*
8. *"The ascent stage, meanwhile, did not get to be a monument. It was
   deliberately crashed into the Moon at 3.94° S, 338.80° E, about 60 kilometres
   from the seismic station it had helped deploy — and in doing so it produced the
   first recorded artificial moonquake."*

**Widgets.** The 180 m ruler, scaled to the visitor's screen. Two-date split card
(1967 vs 1977). Moonquake waveform, labelled honestly: *a record of an artificial
impact, not an audio recording.*


## 0.11 — Scene 1.3 · "Falcon, and the car we parked"

**Where.** Mare Imbrium, foot of the Apennine mountains · 26.13239° N,
3.63330° E · arrived 30 July 1971.
**Objects.** Apollo 15 LM "Falcon" descent stage + ALSEP + the first Lunar Roving
Vehicle driven on the Moon. NSSDCA 1971-063C. LM mass 16,430 kg; LRV 210 kg.

**Copy, in scroll order.**
1. *"July 1971. The fourth crewed landing, at 26.13239 degrees north, 3.63330
   degrees east, in the Mare Imbrium at the foot of the Apennine mountains. And
   for the first time, they brought a car."*
2. *"The Lunar Roving Vehicle was a serious piece of engineering pretending to be
   a toy. It massed 210 kilograms and was built to carry another 490. Its frame
   was welded aluminium alloy tubing, 3.1 metres long on a 2.3-metre wheelbase,
   hinged in the centre so the whole chassis could be folded up and hung in a bay
   on the side of the Lunar Module. It was developed in only 17 months."*
3. *"Each of its four wheels had its own electric drive: a quarter-horsepower DC
   series-wound motor turning at up to 10,000 rpm through an 80:1 harmonic drive.
   Steering came from separate front and rear motors, 0.1 horsepower each, turning
   in opposite directions to give a turning radius of 3.1 metres. Power came from
   two 36-volt silver-zinc potassium hydroxide batteries, 121 amp-hours,
   non-rechargeable. There was a utility outlet on the front to run the TV
   camera."*
4. *"There was no key. You pushed a stick forward to go forward, pulled it back to
   brake, and flicked a switch on the handle first if you wanted reverse.
   Navigation was a directional gyro, an odometer, a computer keeping track of the
   way home, and — because the Sun moves very slowly in the lunar sky — a
   Sun-shadow device that gave a manual heading."*
5. *"Deployment took two people and no tools: one astronaut climbed the ladder and
   released the rover from its bay while the second lowered it on reels and tapes.
   As it came down, most of the unfolding happened by itself. Rear wheels swung
   out and locked. The frame let itself down. Seats and footrests came up. Then
   you switched on the electronics and backed away from the spacecraft."*
6. *"Over three days, on three traverses, David Scott and James Irwin drove it 27.8
   kilometres. The longest single traverse was 12.5 kilometres. At its furthest,
   the rover was 5.0 kilometres from the Lunar Module — which, on a world where
   walking is the alternative, is the difference between a day's sample and a
   month's."*
7. *"Two more of these vehicles went to the Moon. Apollo 16's covered 26.7
   kilometres in 3 hours 26 minutes and reached 4.5 kilometres from its LM.
   Apollo 17's covered 35.9 kilometres in 4 hours 26 minutes, with a longest
   single traverse of 20.1 kilometres and a greatest distance from the LM of 7.6
   kilometres. Four rovers were built; the fourth became spare parts after the
   remaining Apollo missions were cancelled."*

**Quote (amber).**
> *"Without it, the major scientific discoveries of Apollo 15, 16, and 17 would
> not have been possible; and our current understanding of lunar evolution would
> not have been possible."*
> — Harrison Schmitt, Apollo 17 lunar module pilot.

**The ALSEP: the part that kept working after everyone went home.**
*"The instruments were not plugged into anything. They were powered by a SNAP-27
radioisotope thermoelectric generator: a 46-centimetre cylinder with eight
radiating fins, 40 centimetres tip-to-tip, containing 442 spring-loaded
lead-telluride thermoelectric couples. The fuel was a rod-shaped capsule of
plutonium-238, about 4 kilograms, placed into the inner cylinder by the astronauts
during deployment. Plutonium-238 has a half-life of 89.6 years and produces heat.
The heat crossed the thermocouples and became electricity — about 70 watts at 16
volts, and 63.5 watts after a year. That trickle of power ran seven instruments: a
passive seismometer; a lunar surface magnetometer; a solar wind spectrometer; a
suprathermal ion detector; a cold cathode ion gauge; a lunar dust detector; and a
heat flow experiment measuring how fast the Moon is losing its own interior heat.
They were connected to a central station by cables, and commanded from Earth on
2119 MHz. The Apollo 15 central station was turned on at 18:37 UT on 31 July 1971.
It was shut down on 30 September 1977 — six years later — along with every other
ALSEP station on the Moon. Not because it broke. Because the programme ended."*

**Widgets.** `Odometer` (27.8 → 26.7 → 35.9 km, one per mission, with crews and
max range). Battery badge: *"two non-rechargeable batteries — the car could never
come back on its own."* `RtgDiagram`: exploded SNAP-27 with 442 thermocouples and
the 89.6-year half-life pinned to the parts. Note the plaque left in memory of all
fourteen American and Soviet space explorers who died, and the hammer-and-feather
demonstration after the final EVA.


## 0.12 — Scene 1.4 · "The six stations, and the year the listening stopped"

**Copy.**
1. *"Put the pins on the map and a pattern appears. Apollo 11's package was a
   prototype: solar panels, two experiments, and it survived only into a second
   lunar day before it stopped accepting commands."*
2. *"Apollo 12's was the first full ALSEP: a nuclear-powered central station with
   six experiments, turned on in November 1969. Apollo 15's added a magnetometer
   and a heat flow experiment and ran seven."*
3. *"Between them, these packages were a network. Seismometers listening to a body
   that is not quite dead. A magnetometer reading a field almost too faint to call
   a field. Ion gauges sniffing an atmosphere that is closer to a vacuum with a
   memory."*
4. *"And then one date ends all of it at once. 30 September 1977. The stations did
   not fail that day. They were switched off, together, from Earth."*
5. *"Except for the mirrors."*

**Quote.**
> *"The EASEP received uplink commands at 2119 MHz and transmitted telemetry data
> back to Earth at 2276.5 MHz. The laser ranging retroreflector (LRRR) was also
> considered part of the EASEP although it was not attached to the unit and
> required no power."*
> — NSSDCA 1969-059C.

**Interaction.** A single date slider 1969 → 1977. As it moves, each station's
status changes from LIVE to SILENT; on 30 September 1977 all powered stations go
dark in one frame. The retroreflectors stay lit and cannot be turned off by the
slider. The interface makes the argument. Filter: "show only objects that still
work" — the honest answer is a short list, and the shortness is the point.


## 0.13 — Scenes 2.1 and 2.2 · the first machines on Mars

### Scene 2.1 · "The lander that was renamed for a man who died"
**Where.** Chryse Planitia ("the Golden Plain") · 22.483° N, 47.94° W · arrived
20 July 1976, 11:53:06 UT · quiet 11 November 1982. Mass 3,527 kg total
(orbiter 2,339 kg, lander 978 kg).

**Copy.**
1. *"20 July 1976. Seven years to the day after Tranquility Base, a different kind
   of spacecraft came down on a different world. Viking 1 had launched on 20
   August 1975 on a Titan IIIE-Centaur, massed 3,527 kilograms in two parts — a
   2,339-kilogram orbiter and a 978-kilogram lander — and had made three course
   corrections on the way out: 27 August 1975, 10 June 1976, 15 June 1976."*
2. *"It entered orbit on 19 June 1976. And then the mission nearly had to change
   its address. When the orbiter began transmitting photographs of the primary
   landing site in the Chryse region, scientists discovered the area was rougher
   than expected. Using those new pictures, they retargeted the lander to the
   western slopes of Chryse Planitia."*
3. *"The lander separated at 08:32 UT on 20 July 1976 and, after a complicated
   entry during which it took air samples, set down at 11:53:06 UT at 22.483
   degrees north, 47.94 degrees west — about 28 kilometres from its planned
   target. It began taking high-quality photographs in three colours. It recorded
   temperatures from minus 86 °C before dawn to minus 33 °C in the afternoon."*
4. *"On 28 July the robot arm scooped the first soil samples and delivered them
   into a biological laboratory with a gas chromatograph mass spectrometer. The
   cumulative data from four samples could have been read as a weak positive. The
   major test for organic compounds — sensitive to between 10 and 100 parts per
   billion — came back negative. The soil was loaded with sulfur, unlike anything
   known on Earth or the Moon."*
5. *"Then Viking 1 did the thing that makes it belong in this story. It did not
   stop. Its primary mission ended in November 1976. It continued through an
   extended mission to May 1978, a continuation mission to July 1979, and a survey
   mission after that. The lander kept returning daily — and eventually weekly —
   weather reports under something called the Viking Monitor Mission."*
6. *"In January 1982 it was renamed the Thomas Mutch Memorial Station, for Thomas
   A. Mutch (1931–1980), the leader of the Viking imaging team, who had died on 6
   October 1980."*
7. *"It operated until 11 November 1982, when a faulty command sent from Earth
   interrupted communications. Further attempts to regain contact were
   unsuccessful."*
8. *"Read that again. The machine did not die of dust, or cold, or distance. It
   was switched off by a mistake in a command from home."*

**Quote.**
> *"Both NASA Viking missions used a combination of orbiter and lander to explore
> Mars in unprecedented detail. In total, the two Viking orbiters returned 52,663
> images of Mars and mapped about 97 percent of the surface at a resolution of 984
> feet (300 meters). The landers returned 4,500 photos of the two landing sites."*
> — NASA Science, Viking 1.

**Widget.** `WeatherLog` — a counter of daily/weekly reports climbing while the
year ticks 1976 → 1982, then breaking mid-increment on 11 November 1982. Do not
animate the break prettily; let it look like a fault. Name plate changes from
"Viking 1 Lander" to "Thomas Mutch Memorial Station" at the 1982 marker. Note
honestly that the seismometer was inoperable — it never worked on the surface.

### Scene 2.2 · "Sojourner: the first wheels, and the beach ball"
**Where.** Ares Vallis · arrived 4 July 1997 · final data transmission
27 September 1997. Rover mass 10.6 kg (23 lb), height 30 cm.

**Copy.**
1. *"4 July 1997. No retro-rockets, no landing legs, no careful hover. Mars
   Pathfinder hit the atmosphere directly, slowed under a parachute, and then
   inflated the largest airbag system anyone had ever flown: four large bags, each
   containing six smaller interconnected spheres, standing 5 metres tall and 5
   metres across, inflated about 100 metres above the ground by an onboard
   altimeter."*
2. *"It struck at 14 metres per second and bounced. About fifteen times, as high
   as 15 metres, for two and a half minutes, before coming to rest about a
   kilometre from the point of first impact. It was the first time this technique
   had been used."*
3. *"The lander was named the Carl Sagan Memorial Station, after the astronomer
   who had died the year before. On the night of 5 July — late on the second
   Martian day — the little rover inside it stood up to its full height of 30
   centimetres and rolled down the rear ramp, tilted at 20 degrees, well within
   limits."*
4. *"Its name was Sojourner, after the American civil-rights crusader Sojourner
   Truth. It weighed 10.6 kilograms. It was the first robotic rover on Mars."*
5. *"It landed in Ares Vallis: named for Ares, the Greek counterpart to Mars, and
   the Latin word for valley. An ancient flood plain, among the rockiest parts of
   the planet, chosen because it was relatively safe and because it held a wide
   variety of rocks deposited during a catastrophic flood — an event that
   scientists believe cut the floodplain with a volume of water the size of North
   America's Great Lakes in about two weeks."*
6. *"Between landing and its final transmission on 27 September 1997, Pathfinder
   returned 2.3 billion bits of information: more than 16,500 images from the
   lander, 550 from the rover, more than 15 chemical analyses of rocks and soil,
   and extensive data on winds and weather. The findings suggested Mars had once
   been warm and wet. Rounded pebbles and cobbles pointed to conglomerates formed
   in running water. Airborne dust turned out to be magnetic, probably maghemite.
   Early morning water ice clouds were seen in the lower atmosphere. Dust devils
   were measured."*
7. *"Sojourner drove roughly a hundred metres from the lander and stopped. That is
   the whole of its territory. Both machines are still in it."*

**Widgets.** Bounce counter with both impact markers on the map. Range comparison
(~100 m vs 7.7 km vs 45.16 km) that sets up Act 3. Instrument cards: Alpha Proton
X-ray Spectrometer, three cameras, Atmospheric Structure Instrument / Meteorology
Package.


## 0.14 — Scenes 3.1 to 3.3 · the long lives

### Scene 3.1 · "Spirit and Opportunity: two sides of one planet"
**Where.** Gusev Crater (Columbia Memorial Station) and Meridiani Planum ·
arrived January 2004 · Opportunity silent June 2018.

**Copy.**
1. *"They were sent to opposite sides of the same planet, to two places that both
   looked as though liquid water had once been there. Spirit went to Gusev Crater,
   a possible former lake inside a giant impact crater. Opportunity went to
   Meridiani Planum, where mineral deposits suggested a wet history."*
2. *"Their job was narrow and enormous: by studying the rock record, confirm
   whether water had stood on the surface of Mars in ancient times. They confirmed
   it."*
3. *"And then they kept going. Spirit journeyed 4.8 miles — 7.7 kilometres —
   before its mission ended. Opportunity drove 28.06 miles, 45.16 kilometres, and
   held the off-Earth roving distance record when it fell silent in June 2018."*
4. *"That record stood until 11 October 2026, when its successor, Perseverance,
   rolled past it at 28.10 miles — 45.22 kilometres — and kept counting."*

**Quote.**
> *"This self-portrait of Opportunity shows how the wind had cleaned much of the
> dust off the rover's solar panels."*
> — NASA/JPL-Caltech/Cornell/Arizona State Univ., Pancam self-portrait taken
> 22–24 March 2014.

**Widgets.** `OdometerWall`: horizontal bars for Sojourner ~100 m, Spirit 7.7 km,
Opportunity 45.16 km, Perseverance 45.22 km, with the 2026 overtake animated —
the only moment of triumph in the Mars half of the site. Dust-clean before/after
slider, captioned with the March 2014 date.

### Scene 3.2 · "InSight: the machine that listened"
**Where.** Elysium Planitia · 4.5° N, 135.9° E · landed 26 November 2018,
11:52:59 a.m. PT · mission ended 15 December 2022.

**Copy.**
1. *"Every other Mars mission in this script looked at the surface. InSight was
   sent to ignore it."*
2. *"It landed on 26 November 2018 at 11:52:59 a.m. PT, near the equator on the
   western side of a flat, smooth plain called Elysium Planitia — 4.5 degrees
   north, 135.9 degrees east, just 600 kilometres from Curiosity's landing site in
   Gale Crater. The site was chosen not for its surface features but for safety,
   because InSight's purpose was to study the interior, not the ground."*
3. *"Planitia is Latin for a flat surface or plain. Elysium comes from the ancient
   Greek name for an afterlife paradise."*
4. *"Its two goals were to understand how rocky planets formed and evolved, and to
   find out how tectonically active Mars is today and how often meteorites hit it.
   To do it, the lander's arm — over 1.8 metres long — lifted a seismometer and a
   heat flow probe off the deck and placed them on the ground, and then the
   spacecraft listened. It determined the size of the core, what it is made of and
   whether it is liquid or solid; the thickness and structure of the crust; the
   structure of the mantle; how warm the interior is and how much heat is still
   flowing out of it."*
5. *"It was the first mission to give Mars a thorough checkup since the planet
   formed 4.5 billion years ago. Four years on the Red Planet. Vital signs: pulse,
   temperature, reflexes."*
6. *"The mission ended on 15 December 2022. And here is the detail that earns
   InSight its place in this story: the object did not disappear from the record
   when it stopped working. A NASA Mars orbiter later spotted the retired lander
   specifically to study dust movement — the retired machine becoming an
   instrument one last time, this time as a fixed reference point on the surface
   of another planet."*

**Quote.**
> *"InSight sensors captured a haunting low rumble caused by vibrations from the
> Martian wind, estimated to be blowing at 10 to 15 mph (5 to 7 meters a second)
> on Dec. 1, 2018. The winds were consistent with the direction of dust devil
> streaks in the landing area, which were observed from orbit."*
> — NASA Science, InSight. Audio credit: NASA/JPL-Caltech/CNES/IPGP/Imperial
> College/Cornell.

**Widgets.** Vital-signs panel (pulse / temperature / reflexes). `AudioPlayer`,
muted by default, with a volume warning and the credit visible without
interaction. The 600 km line to Gale Crater. MarCO footnote: two briefcase-sized
CubeSats flew their own path to Mars behind InSight — the first interplanetary
CubeSats.

### Scene 3.3 · "Ingenuity: seventy-two flights, and the last twenty-nine seconds"
**Where.** Jezero Crater · first flight 19 April 2021 · last flight 18 January
2024 · mission completed 25 January 2024.
**Specs.** Mass 1.8 kg · rotor span just under 1.2 m · solar-charged lithium-ion ·
~350 W average in flight. Records: 72 flights · 128.8 flying minutes · 10.5 mi
(17.0 km) · altitudes to 78.7 ft (24.0 m).

**Copy.**
1. *"It rode to Mars strapped under the belly of the Perseverance rover and was
   designed to make no more than five test flights in thirty days. It was a
   technology demonstration. It was, on paper, disposable."*
2. *"On 19 April 2021 it flew for the first time — the first powered, controlled
   flight on another planet. NASA called it a Wright Brothers moment, and for once
   the phrase was not too big."*
3. *"The engineering problem was the air. Less than one percent as dense as
   Earth's. The solution was speed: rotors just under 1.2 metres tip to tip,
   spinning fast enough to bite into almost nothing. Mass: 1.8 kilograms. Power: a
   solar panel charging lithium-ion batteries, enough for one 90-second flight per
   Martian day, at about 350 watts average during flight."*
4. *"It was supposed to stop after five. It flew seventy-two times across nearly
   three years."*
5. *"It became something the designers had not planned: an operations
   demonstration. It served as an aerial scout for scientists and rover planners.
   It photographed Perseverance's landing gear debris so engineers could learn
   from it. In its final phase it ran experimental flight tests that expanded the
   team's knowledge of the vehicle's aerodynamic limits — a test pilot with no one
   on board, and no way home except to keep working."*
6. *"The numbers at the end: 128.8 flying minutes. 10.5 miles, or 17.0 kilometres.
   Altitudes as high as 78.7 feet, 24 metres. A record for groundspeed and a
   record for altitude, both set in October 2023."*
7. *"It flew for the last time on 18 January 2024. It sustained rotor damage. The
   mission was declared complete on 25 January 2024."*
8. *"It is on the floor of Jezero Crater now. It is the only object in this entire
   script that got there by flying, and could not fly away."*

**Widgets.** `FlightCounter` — planned 5 vs flown 72; the 72 bar must visually
overflow its container. Timeline scrubber with the fifteen real milestones
(3 Apr 2021 four feet on Mars; 4 Apr surviving the first night; 8 Apr first rotor
spin tests; 19 Apr first flight; 25 Apr first photo of the rover; 7 May tech demo
complete; 5 Jul venturing to new territory; 24 Jul first scouting flight;
4 Aug another rover sighting; 8 Apr 2022 distance record; 19 Apr 2022 sighting
the rover's landing hardware; 13 Apr 2023 fifty flights and beyond; 5 Oct 2023
altitude record; 12 Oct 2023 groundspeed record; 25 Jan 2024 mission ends). The
final-29-seconds navcam note. One closing line may mention NASA's SkyFall
mission, clearly in the future tense.


## 0.15 — Scenes 4.1 to 5.2 · orbit, the belt, and anywhere

### Scene 4.1 · "Dawn: out of fuel, in orbit, forever"
**Where.** In orbit around Ceres, in the main asteroid belt · launch
27 September 2007, 11:34 UTC · end of mission 1 November 2018.

**Copy.**
1. *"Dawn launched on 27 September 2007 at 11:34 UTC from Cape Canaveral. Its
   mission was different from every other mission in this script, because it was
   not about arriving. It was about comparing."*
2. *"The question the mission addressed was the role of size and water in
   determining how planets evolve. It needed two bodies that were the same kind of
   object and utterly different in outcome — two protoplanets, baby planets whose
   growth was interrupted by the formation of Jupiter. Ceres is very primitive and
   wet. Vesta is evolved and dry."*
3. *"So Dawn went to both. Launch 27 September 2007. Mars gravity assist
   17 February 2009. Vesta arrival 16 July 2011, departure 5 September 2017.
   Ceres arrival 5 March 2015. End of prime mission June 2016, first extended
   mission from July 2016, second extended mission from October 2017, end of
   mission 1 November 2018."*
4. *"Two worlds, one spacecraft, eleven years. It formed a bridge between the
   exploration of the rocky inner solar system and the icy outer solar system —
   completing the first-order exploration of the inner solar system and
   complementing the investigations of Mercury, Earth and Mars."*
5. *"And then it ran out of fuel."*
6. *"There is no dramatic final transmission in the NASA record for Dawn. There is
   simply this: a spacecraft that has no propellant left cannot change its
   attitude, and a spacecraft that cannot change its attitude cannot point a solar
   array at the Sun or an antenna at Earth. It remains in orbit around Ceres. It
   will continue to."*

**Interaction.** Two-worlds panel (Vesta evolved and dry beside Ceres primitive
and wet, sharing the sentence about Jupiter). Mission-event slider with the eight
dated events. Orbit diagram the visitor may try to change by dragging — the UI
refuses, once, politely, and says why: no propellant.

### Scene 4.2 · "NEAR Shoemaker: the landing nobody planned"
**Where.** 433 Eros · touchdown 12 February 2001, 19:44 UT, just south of Himeros
· last contact 28 February 2001.

**Copy.**
1. *"NEAR was the first mission flown under NASA's Discovery programme —
   low-cost planetary science projects, selected competitively, led by a principal
   investigator rather than a NASA manager. Its target was the minor planet 433
   Eros, and its job was to characterise it: physical properties, mineral
   components, shape, internal mass distribution, magnetic field. It was the first
   spacecraft to rely on solar cells for power during operations beyond Mars
   orbit."*
2. *"The journey was not clean. On the way it made a 25-minute flyby of asteroid
   253 Mathilde on 27 June 1997, closest approach about 1,200 kilometres at
   12:56 UT, photographing 60 percent of a 4.5-billion-year-old, cratered,
   less-dense-than-expected body. It flew past Earth on 23 January 1998 for a
   gravity assist. Then an aborted engine burn on 20 December 1998 cost it the
   trajectory it needed, and the mission was rewritten in flight: a different
   flyby of Eros on 23 December 1998 at a range of about 3,827 kilometres, which
   revealed a smaller-than-expected asteroid with two medium-sized craters, a long
   surface ridge, and a density similar to Earth's crust."*
3. *"It finally entered orbit around Eros at 15:33 UT on 14 February 2000 —
   roughly a year later than intended — becoming the first human-made object to
   orbit a minor planet. On 14 March 2000, NASA renamed it NEAR Shoemaker for the
   geologist Eugene M. Shoemaker (1928–1997)."*
4. *"Then it spiralled inward with great patience. Operational orbit at about 50
   kilometres from Eros' centre by 30 April 2000. A lower orbit on 13 July 2000,
   bringing it about 19 kilometres from the surface. A close flyby on 26 October
   2000 to about 5.3 kilometres above the surface. By the end of that year, a
   circular 35-kilometre orbit with passes only 5 to 6 kilometres above the
   ground."*
5. *"And then, on 12 February 2001, a slow, controlled descent. It took 69
   high-resolution photographs on the way down and touched the surface at 19:44 UT
   at a gentle 6.4 kilometres per hour, just south of a saddle-shaped feature named
   Himeros."*
6. *"This was the first time a U.S. spacecraft had been first to land on a
   celestial body — the Soviets having got there first at the Moon, Mars and
   Venus."*
7. *"And then the part nobody expected: the orbiter survived the contact. It kept
   returning valuable data, especially from its gamma-ray spectrometer, for about
   two weeks. Last contact was 28 February 2001 — the spacecraft succumbing to the
   cold, minus 173 °C."*
8. *"In the end NEAR returned about ten times more data than planned, including
   160,000 images, and mapped more than 70 percent of the surface. It also
   established that Eros has no magnetic field."*

**Quote.**
> *"Following a slow, controlled descent, during which it took 69 high-resolution
> photos of Eros, NEAR touched down on Eros at a gentle 4 miles per hour (6.4
> kilometers per hour), just south of a saddle-shaped feature named Himeros, on
> Feb. 12, 2001, at 19:44 UT."*
> — NASA Science, NEAR Shoemaker.

**Widgets.** Speed comparison at 6.4 km/h (walking figure, car). Descent altitude
ladder: 50 km → 19 km → 5.3 km → 5–6 km passes → surface, each rung dated. Two
weeks of bonus counter, captioned with the cause of death: minus 173 °C.

### Scene 5.1 · "Pioneer 10: still going, no longer speaking"
**Where.** Interstellar space · last signal 23 January 2003, 12.23 billion km from
Earth · heading toward the star Aldebaran.

**Copy.**
1. *"Pioneer 10 collected a set of firsts that no other robotic spacecraft has
   matched. The first vehicle placed on a trajectory to escape the solar system
   into interstellar space. The first to fly beyond Mars. The first to fly through
   the asteroid belt. The first to fly past Jupiter. The first to use all-nuclear
   electrical power — two SNAP-19 radioisotope thermoelectric generators capable of
   delivering about 140 watts during the Jupiter encounter."*
2. *"It launched into a maximum escape velocity of 51,682 kilometres per hour,
   32,110 miles per hour — faster than any previous human-made object at that
   moment. It entered the asteroid belt on 15 July 1972 and emerged in February
   1973 after about 435 million kilometres, taking some hits, fewer than expected.
   It crossed the front of Jupiter's bow shock on 26 November 1973 at 20:30 UT,
   and made closest approach at 02:26 UT on 4 December 1973, at a range of
   130,354 kilometres and a velocity of about 126,000 kilometres per hour."*
3. *"It photographed Callisto, Ganymede and Europa — but not Io, because the
   photopolarimeter had already succumbed to radiation by then. Between 6 November
   and 31 December 1973 it took about 500 pictures of Jupiter's atmosphere, with
   the highest resolution about 320 kilometres, showing the Great Red Spot
   clearly."*
4. *"It crossed Saturn's orbit in February 1976 and found that Jupiter's magnetic
   tail, almost 800 million kilometres long, covered the entire distance between
   the two planets. On 13 June 1983 it crossed the orbit of Neptune, becoming the
   first human-made object to go beyond the outermost planet."*
5. *"And then the long, quiet part. Routine contact was terminated on 31 March
   1997 at 19:35 UT, when Pioneer 10 was 67 AU from Earth, for budgetary reasons.
   Intermittent contact continued as the onboard power allowed. On 17 February
   1998 it was passed by Voyager 1 and stopped being the farthest human-made
   object. A ground team got a signal on 5 August 2000 confirming systems were
   still nominal. The last telemetry came on 27 April 2002."*
6. *"The last signal of all came on 23 January 2003, from 12.23 billion kilometres
   away. It took 11 hours and 20 minutes to arrive. By then it was clear that the
   RTG power source had decayed and could no longer run the radio transmitter. A
   final attempt on 4 March 2006 failed."*
7. *"It was designed for a 21-month mission. By 5 November 2017 it was roughly
   118.8 AU from Earth."*
8. *"It is heading in the direction of the red star Aldebaran, the eye of Taurus.
   NASA expects it to pass by Aldebaran in about two million years."*

**Quote.**
> *"In case it's intercepted by intelligent life, Pioneer 10 carries an aluminum
> plaque with diagrams of a man and a woman, the solar system, and its location
> relative to 14 pulsars."*
> — NASA Science, Pioneer 10.

**Widgets.** `SignalDelay` (seed from the documented 11 h 20 min at 12.23 billion
km; any live figure is labelled as our extrapolation). `PlaqueViewer` with four
hotspots. The Aldebaran rendezvous as a single line of text over a star field.

### Scene 5.2 · "Kepler: 2,600 worlds, and a tank of fuel that ran out"
**Where.** Heliocentric orbit, trailing Earth · launched 6 March 2009 · retired
30 October 2018.

**Copy.**
1. *"Kepler was NASA's first planet-hunting mission. It was assigned a portion of
   the Milky Way and told to look for Earth-sized planets orbiting stars outside
   our solar system. It was launched on 6 March 2009 and positioned to stare
   continuously at 150,000 stars in one patch of sky in the constellation
   Cygnus."*
2. *"It found planets by watching for transits — tiny dips in a star's brightness
   when a planet passes in front of it. Its mirror was 1.4 metres across, one of
   the largest beyond Earth orbit. It was designed to monitor about 100,000
   main-sequence stars for three and a half years."*
3. *"In its first six weeks it found five exoplanets. In April 2010 it delivered
   the first confirmed planetary system with more than one planet transiting the
   same star, Kepler-9, from a survey of more than 156,000 stars over seven
   months. Kepler-11 turned out to hold six planets, larger than Earth, the
   largest comparable to Uranus and Neptune. And the most common size of planet it
   found does not exist in our own solar system: a world between the size of Earth
   and Neptune."*
4. *"Then, in May 2013, it lost the second of its four gyroscope-like reaction
   wheels. It needed three to hold a pointing. It could no longer stay aimed at
   its target without drifting — because the Sun, the very body that gives it
   power, also pushes it around with the pressure of sunlight."*
5. *"So engineers did something remarkable. They stopped fighting the sunlight and
   used it. By balancing the spacecraft against solar photon pressure, like a
   kayak steering into a current, they gave it a second life. K2 scanned a larger
   swath of sky along the ecliptic plane, shifting its field of view roughly every
   three months in what the team called a campaign. They thought the remaining
   fuel would buy them ten campaigns. They got nineteen."*
6. *"K2 lasted as long as the original mission and pushed the total number of
   surveyed stars past 500,000. It also began new kinds of research: objects inside
   our own solar system, exploded stars, and the supermassive black holes at the
   hearts of distant galaxies."*
7. *"And then, in 2018, the fuel ran out. On 30 October 2018, NASA retired the
   spacecraft within its current, safe orbit, away from Earth."*
8. *"Its final message was the count. More than 2,600 planet discoveries outside
   our solar system — analysis of Kepler data suggests that 20 to 50 percent of
   the stars visible in the night sky are likely to have small, possibly rocky,
   planets similar in size to Earth, in the habitable zone of their stars. When the
   mission was first conceived, 35 years before its findings were published, nobody
   knew of a single planet outside our solar system."*
9. *"Kepler is out there now, powered down, carrying that number in its data
   archive rather than in its memory. It found them and sent them home while it
   still could. Then it stopped, and stayed where it was told to stay."*

**Quote (the last quotation in the site).**
> *"When we started conceiving this mission 35 years ago, we didn't know of a
> single planet outside our solar system. Now that we know planets are everywhere,
> Kepler has set us on a new course that's full of promise for future generations
> to explore our galaxy."*
> — William Borucki, Kepler's founding principal investigator, retired from
> NASA's Ames Research Center.

**Widget.** `TransitDemo` — drag a planet across a star, watch the light curve dip.
One sentence: *"This is how Kepler found 2,600 worlds."*


## 0.16 — Scenes 6.1 and 6.2 · the inventory and the close

### Scene 6.1 · "The full inventory"
**Narration, the pull-back.** *"So here is the whole list, in the only order that
matters: the order they went quiet."*

**The table (fifteen rows — this is the canonical ordering for the site):**

| Object | Where | Coordinates | Went quiet | How |
|---|---|---|---|---|
| Surveyor 3 | Moon, Oceanus Procellarum | 3° S, 23.41° W | 4 May 1967 | Contact lost two days after lunar night began. |
| Apollo 11 LM descent stage (Eagle) + EASEP | Moon, Mare Tranquilitatis | 0.67416° N, 23.47314° E | 27 Aug 1969 | EASEP stopped accepting commands on its second lunar day. Descent stage never moved; ascent stage's fate unknown, presumed impacted within 1–4 months. |
| Apollo 12 LM descent stage (Intrepid) + ALSEP | Moon, Oceanus Procellarum | 3.0128° S, 23.4219° W | 30 Sep 1977 | Switched off with all ALSEP stations. Ascent stage deliberately impacted at 3.94° S, 338.80° E. |
| Apollo 15 LM descent stage (Falcon) + ALSEP + LRV | Moon, Mare Imbrium | 26.13239° N, 3.63330° E | 30 Sep 1977 | Same shutdown. Rover parked after three traverses. Ascent stage impacted 03:03:37 UT 3 Aug 1971 at 26.36° N, 0.25° E. |
| Viking 1 lander (Thomas Mutch Memorial Station) | Mars, Chryse Planitia | 22.483° N, 47.94° W | 11 Nov 1982 | A faulty command sent from Earth interrupted communications. |
| Mars Pathfinder / Sojourner | Mars, Ares Vallis | Ares Vallis | 27 Sep 1997 | Final data transmission, three months after landing by airbag bounce. |
| NEAR Shoemaker | Asteroid 433 Eros | just south of Himeros | 28 Feb 2001 | Succumbed to cold, minus 173 °C, two weeks after deliberately landing. |
| Pioneer 10 | Interstellar space | 12.23 billion km out | 23 Jan 2003 | RTG decayed; insufficient power for the transmitter. Signal took 11 h 20 min to arrive. |
| Spirit | Mars, Gusev Crater | Columbia Memorial Station | 2010 (mission end) | Inactive on the surface after 7.7 km of driving. |
| Dawn | Orbit around Ceres | main asteroid belt | 1 Nov 2018 | Ran out of fuel. Remains in orbit, unpowered. |
| Opportunity | Mars, Meridiani Planum | Perseverance Valley | June 2018 | Fell silent in a dust-storm season after 45.16 km. |
| Kepler | Heliocentric orbit, away from Earth | trailing Earth | 30 Oct 2018 | Out of fuel. Retired in its safe orbit. |
| InSight | Mars, Elysium Planitia | 4.5° N, 135.9° E | 15 Dec 2022 | End of mission after four years of listening. |
| Ingenuity | Mars, Jezero Crater | Jezero floor | 18 Jan 2024 | Sustained rotor damage; became a stationary artifact after 72 flights. |

**Editing note carried into the build.** Four rows are deliberately conservative
because the supplied NASA pages do not state a precise shutdown date or
coordinate: Spirit, Opportunity, Dawn's last command, and Pathfinder's cause. If
the team wants sharper values, add the source — never guess. Encode as `'UNKNOWN'`
or a year-only string, and let the UI render that honestly.

**Closing narration.**
1. *"Every object on that list is exactly where it was put. Not approximately.
   The coordinates were measured, published and archived, and they have not
   changed, because nothing up there moves on its own."*
2. *"This is the part people get wrong about abandoned equipment. It is not a mess
   left behind. It is a record kept in the only medium that cannot be edited:
   position."*
3. *"We know that Surveyor 3 is at 3 degrees south, 23.41 degrees west because two
   men walked over to it and then men and women wrote it down. We know that InSight
   is in Elysium Planitia because an orbiter went back to photograph it after it
   stopped working. We know where Pioneer 10 is to within a metre per second
   because we have been tracking it, patiently, from the moment it stopped being
   able to answer."*
4. *"The machines were abandoned. The addresses were not."*

### Scene 6.2 · "Abandoned, but not forgotten"
**Final screen copy, one paragraph per screen.**
1. *"There is a plaque on the Moon that says we came in peace for all mankind."*
2. *"There is a plaque on the Moon in memory of fourteen people who died trying to
   get there. There is a small figure beside it."*
3. *"There is a mirror on the Moon that still reflects a laser fired from Earth
   tonight, because it was built with no moving parts and needs no power to do the
   only thing it was made for."*
4. *"There is a helicopter in a crater on Mars that flew seventy-two times and
   cannot fly again."*
5. *"There is a telescope in an empty orbit that found more than 2,600 worlds and
   then ran out of fuel."*
6. *"And there is a spacecraft twelve billion kilometres away, still carrying a
   drawing of a man and a woman and a map to our star, heading for a red eye in
   the constellation of Taurus that it will not reach for two million years."*
7. *"None of them are lost. All of them are filed."*
8. **"Abandoned, but not forgotten."**

**Final interaction.** After the last line, the site returns to the opening star
field, but now the eight rail stops are labelled with what is actually at each
one. The visitor's own scroll history becomes the map.


## 0.17 — The fifteen object records (canonical data, for `src/data/objects.ts`)

Each record below is complete. Fields not stated by NASA are omitted or marked
`UNKNOWN`. Pruthvik encodes; Nivish reads shape and scale from them.

### 1 · Surveyor 3
`id: 'surveyor-3'` · body Moon · site Oceanus Procellarum · lat −3 · lon −23.41 ·
arrived `1967-04-20T00:04:17Z` · wentQuiet `1967-05-04` · status `on-surface` ·
massKg 997.9 · sceneId `1.2`
Launch 1967-04-17 07:05:01 UT, Atlas Centaur AC-12, LC-36B. Instruments: TV camera
(25 mm and 100 mm lenses; 200-line images in ~20 s; 600-line digital), surface
sampler (1.5 m reach, 18 cm dig). Descent radar confused by reflective rocks;
engine cut-off late at 4.3 m; bounced to 10 m, then 3 m. 6,326 TV images. Four
trenches, four bearing tests, thirteen impact tests → soil like wet sand,
~10 psi / 98 kPa, strong enough for an Apollo LM. Last contact two days after
lunar night began. Apollo 12 landed ~180 m away; second EVA recovered the scoop
and camera, ~10 kg of parts.

### 2 · Apollo 11 LM / EASEP ("Eagle")
`id: '1969-059C'` · alternateNames `['LM-5','Eagle','Apollo11EASEP','04041']` ·
lat 0.67416 · lon 23.47314 · arrived `1969-07-20T20:17:40Z` · wentQuiet
`1969-08-27` · status `on-surface` with sub-element `unknown` · massKg 15103.
Descent stage: octagonal prism 4.2 m × 1.7 m; legs hold it 1.5 m above the
surface; 9.4 m between opposite footpads; 1 m conical engine skirt; descent
engine ~45,000 N gimballed, left behind as the launch platform. Ascent stage:
~2.8 m high, 4.0 × 4.3 m, crew cabin 6.65 m³, no seats, engine ~15,000 N fixed,
RCS 4 × 450 N chambers, six silver-zinc batteries. Surface: 21 h 36 min, ~250 m
traversed, 21.55 kg of samples; liftoff 1969-07-21 17:54:01 UT; jettisoned
1969-07-22 00:01:01 UT; **fate unknown, presumed impacted within 1–4 months.**
EASEP: 48 kg, deployed ~17 m south at 0.6735° N, 23.4730° E; uplink 2119 MHz,
downlink 2276.5 MHz; on 1969-07-21 04:40:39 UT; transmission stopped 1969-08-03
10:58:46 UT; ceased accepting commands 1969-08-27. LRRR deployed ~5 m NNW; no
power required.

### 3 · Apollo 12 LM / ALSEP ("Intrepid")
`id: '1969-099C'` · lat −3.0128 · lon −23.4219 · arrived `1969-11-19T06:54:35Z` ·
wentQuiet `1977-09-30` · massKg 15235 · sceneId `1.2`
Two EVAs, 7 h 45 min, 1.35 km. 34.35 kg of samples. TV camera vidicon damaged by
pointing at the Sun. ~10 kg of Surveyor parts returned. 31 h 31 min on the
surface; ascent stage jettisoned 20:21:30, intentionally impacted 3.94° S,
338.80° E, ~60 km from the seismic station → first recorded artificial moonquake.
ALSEP: central station 25 kg, 34,800 cm³ stowed, 58 cm × 3.8 cm helical antenna,
uplink 2119 MHz, downlink 2278.5 MHz, at 3.0094° S, 23.4246° W; on 1969-11-19
14:21 UT; off 1977-09-30. Six instruments: passive seismometer, suprathermal ion
detector, cold cathode ion gauge, lunar dust detector, lunar surface magnetometer,
solar wind spectrometer. SNAP-27 RTG: 46 cm cylinder, eight fins, 40 cm tip-to-tip,
442 lead-telluride thermocouples, 17 kg, ~4 kg Pu-238 capsule, half-life 89.6 y,
~70 W at 16 V (63.5 W after a year).

### 4 · Apollo 15 LM / ALSEP ("Falcon") + LRV
`id: '1971-063C'` · lat 26.13239 · lon 3.63330 · arrived `1971-07-30T22:16:29Z` ·
wentQuiet `1977-09-30` · massKg 16430 · sceneId `1.3`
Three EVAs, 18 h 35 min, 27.9 km, 77.31 kg of samples. Standup EVA 33 min.
Traverses 10.3 km / 12.5 km / 5.1 km. 66 h 55 min on the surface; liftoff
1971-08-02 17:11:22 UT; impacted 1971-08-03 03:03:37 UT at 26.36° N, 0.25° E.
Hammer-and-feather demonstration after the final EVA. Plaque and small figure in
memory of all fourteen American and Soviet space explorers who died. ALSEP at
26.1341° N, 3.6298° E, on 1971-07-31 18:37 UT, off 1977-09-30, downlink 2278.0 MHz.
Seven instruments: passive seismometer, lunar surface magnetometer, solar wind
spectrometer, suprathermal ion detector, cold cathode ion gauge, lunar dust
detector, heat flow experiment.

### 5 · Lunar Roving Vehicle
`id: 'lrv'` · body Moon · sites Apollo 15/16/17 · status `on-surface` ·
sceneId `1.3`
210 kg, +490 kg payload. Frame 3.1 m, wheelbase 2.3 m, height 1.14 m, aluminium
alloy 2219 welded tubing, hinged three-part chassis folding into LM quad 1. Two
folding seats, armrest, footrests, Velcro belts, mesh dish antenna. Wheels: spun
aluminium hub, 81.8 cm × 23 cm woven zinc-coated steel tyres (0.083 cm strands),
titanium chevrons on 50 % of the contact area, 64.8 cm bump-stop frame, dust
guards. Drive: 0.25 hp DC series-wound motor per wheel, 10,000 rpm, 80:1 harmonic
drive, mechanical brake. Steering: 0.1 hp front and rear motors, turning radius
3.1 m. Power: 2 × 36 V silver-zinc potassium hydroxide, 121 Ah, non-rechargeable;
36 V utility outlet. T-handle controller: forward = drive, pull = brake,
switch + pull = reverse, full pull = parking brake. Navigation: directional gyro +
odometer + computer, plus a Sun-shadow device. Deployment: two astronauts,
pulleys and braked reels. Distances — Apollo 15: 27.8 km in 3 h 02 min, longest
traverse 12.5 km, max range 5.0 km; Apollo 16: 26.7 km in 3 h 26 min, 11.6 km,
4.5 km; Apollo 17: 35.9 km in 4 h 26 min, 20.1 km, 7.6 km. Contract $19M → $38M;
developed in 17 months; four built, the fourth became spares.

### 6 · Viking 1 Lander (Thomas Mutch Memorial Station)
`id: 'viking-1'` · lat 22.483 · lon −47.94 · arrived `1976-07-20T11:53:06Z` ·
wentQuiet `1982-11-11` · massKg 3527 · sceneId `2.1`
Launch 1975-08-20 21:22:00 UT, Titan IIIE-Centaur TC-4, LC-41. Orbiter 2,339 kg;
lander 978 kg. SNAP-19 RTGs on the landers; solar on the orbiters. Course
corrections 1975-08-27, 1976-06-10, 1976-06-15. Orbit 1976-06-19; initial
1,500 × 50,300 km, operational 1,500 × 32,800 km. Site changed to western Chryse
Planitia after orbiter photography. Separation 08:32 UT; touchdown 28 km from
target. Three-colour imaging; 300° panorama. −86 °C before dawn, −33 °C in the
afternoon. Seismometer inoperable. First soil sample 1976-07-28; GCMS organics
test negative; abundant sulfur. Mission phases: primary → Nov 1976, extended →
May 1978, continuation → Jul 1979, survey → Jul 1980. Renamed Jan 1982 for
Thomas A. Mutch (1931–1980, died 1980-10-06). Lander lost to a faulty command
from Earth. Orbiter shut down 1980-08-07 on its 1,489th orbit after exhausting
attitude-control propellant. Fleet totals: 52,663 orbiter images, ~97 % of the
surface at 300 m, 4,500 lander photographs.

### 7 · Mars Pathfinder / Sojourner
`id: 'pathfinder'` · body Mars · site Ares Vallis · arrived `1997-07-04` ·
wentQuiet `1997-09-27` · sceneId `2.2`. Empty coordinate fields: the supplied
source does not publish lat/lon — render the site name only.
Launch 1996-12-04, Delta II 7925. Lander = Carl Sagan Memorial Station. Rover
10.6 kg / 23 lb, 30 cm tall, deployed sol 2 (night of 5 July) down a 20° ramp.
Airbags: four bags × six interconnected spheres, 5 m tall × 5 m diameter,
inflated ~100 m above the surface, impact 14 m/s, ~15 bounces up to 15 m over
2.5 minutes, rest ~1 km from first impact. Returned 2.3 billion bits: 16,500+
lander images, 550 rover images, 15+ chemical analyses. Instruments: Alpha Proton
X-ray Spectrometer, three cameras, Atmospheric Structure Instrument /
Meteorology Package. Highlights: rounded pebbles and cobbles → conglomerates
formed in running water; core radius > 1,300 km and < 2,000 km; magnetic dust
probably maghemite; dust devils; early-morning water-ice clouds.

### 8 · Spirit
`id: 'spirit'` · body Mars · site Gusev Crater (Columbia Memorial Station) ·
arrived `2004-01` · wentQuiet `UNKNOWN` · sceneId `3.1` · distanceKm 7.7
Driven 4.8 mi / 7.7 km. Mission ended; rover inactive on the surface. Landing
site chosen as a possible former lake inside a giant impact crater. Science: the
rock record confirmed long-standing surface water in ancient times. The supplied
source does not state a precise end date — do not invent one.

### 9 · Opportunity
`id: 'opportunity'` · body Mars · site Meridiani Planum · arrived `2004-01` ·
wentQuiet `2018-06` · sceneId `3.1` · distanceKm 45.16
Driven 28.06 mi / 45.16 km — the off-Earth roving distance record until
2026-10-11, when Perseverance passed it at 28.10 mi / 45.22 km and counting. Fell
silent in June 2018. Pancam self-portrait 2014-03-22 to 2014-03-24 shows
wind-cleaned solar panels (credit NASA/JPL-Caltech/Cornell/Arizona State Univ.).

### 10 · InSight
`id: 'insight'` · lat 4.5 · lon 135.9 · arrived `2018-11-26T11:52:59-08:00` ·
wentQuiet `2022-12-15` · sceneId `3.2`
Launch 2018-05-05 04:05 PT, Atlas V-401, Vandenberg. Built on the Phoenix lander
design; arm 1.8 m (5 ft 9 in). Site chosen for safety, not scenery; 600 km from
Gale Crater. Planitia = flat plain; Elysium = Greek afterlife paradise. Goals:
interior structure and processes (core size/composition/state, crust thickness,
mantle structure, heat flow) and present-day tectonics and impact rate. Four
years of "vital signs — pulse, temperature, reflexes"; the first thorough checkup
since the planet formed 4.5 billion years ago. MarCO: two briefcase-sized
CubeSats, the first interplanetary CubeSats. Wind recording 2018-12-01, 5–7 m/s,
credit NASA/JPL-Caltech/CNES/IPGP/Imperial College/Cornell. Later imaged from
orbit by a Mars orbiter to study dust movement.

### 11 · Ingenuity
`id: 'ingenuity'` · body Mars · site Jezero Crater · arrived `2021-02-18` ·
wentQuiet `2024-01-18` · sceneId `3.3`
Launch 2020-07-30. Deployed from the rover's belly 2021-03-29. First flight
2021-04-19 — the first powered, controlled flight on another planet. 72 flights,
128.8 flying minutes, 10.5 mi / 17.0 km, max altitude 78.7 ft / 24.0 m. Mass
1.8 kg (3.97 lb); 1.5 lb on Mars. Rotor span just under 4 ft / 1.2 m. Solar panel
+ lithium-ion; one 90-second flight per Martian day; ~350 W average in flight.
Design flight altitude up to 15 ft / 5 m; design range up to 980 ft / 300 m.
Atmosphere < 1 % of Earth's density. Records: distance 2022-04-08; altitude
2023-10-05; groundspeed 2023-10-12. Final 29 seconds recorded by its navcam on
the sixth flight. Successor: NASA's SkyFall mission. Sustained rotor damage;
became a stationary artifact.

### 12 · Dawn
`id: 'dawn'` · body Ceres · launched `2007-09-27T11:34Z` · wentQuiet `2018-11-01`
· status `in-orbit` · sceneId `4.1`
First truly interplanetary spaceship. Targets in the main asteroid belt. Question:
the role of size and water in planetary evolution. Ceres primitive and wet; Vesta
evolved and dry; both are protoplanets whose growth was interrupted by Jupiter.
Three science drivers: the earliest moments of solar-system origin; the nature of
the building blocks of the terrestrial planets; the contrast of two very
different evolutionary paths. Timeline: Mars gravity assist 2009-02-17; Vesta
arrival 2011-07-16; Ceres arrival 2015-03-05; end of prime mission June 2016;
Vesta departure 2017-09-05; extended missions July 2016 and October 2017; end of
mission 2018-11-01. Out of fuel — remains in orbit around Ceres, unpowered.

### 13 · NEAR Shoemaker
`id: 'near-shoemaker'` · body Eros · arrived `2001-02-12T19:44Z` · wentQuiet
`2001-02-28` · sceneId `4.2`
First Discovery-programme mission (< ~$150 M mid-1990s dollars). Target ~221
million mi / 355 million km from Earth; Eros ~21 miles long. First spacecraft to
rely on solar cells beyond Mars orbit. Mathilde flyby 1997-06-27, closest
~1,200 km at 12:56 UT, 60 % photographed, 4.5-billion-year-old, cratered, less
dense than expected. Earth gravity assist 1998-01-23 07:23 UT, ~540 km. Aborted
burn 1998-12-20; the mission was rewritten in flight. Eros flyby 1998-12-23
18:41:23 UT, ~3,827 km: smaller than expected, two medium craters, a long ridge,
density similar to Earth's crust. Orbit insertion 2000-02-14 15:33 UT,
~321 × 366 km — first human-made object to orbit a minor planet. Renamed
2000-03-14 for Eugene M. Shoemaker (1928–1997). Orbit lowered: ~50 km
(2000-04-30), ~19 km from the surface (2000-07-13), ~5.3 km flyby (2000-10-26),
then a 35 km circular orbit with 5–6 km passes. Touchdown 2001-02-12 19:44 UT at
6.4 km/h (4 mph), 69 high-resolution photographs during descent, just south of
Himeros. First U.S. spacecraft to be first to land on a celestial body. Survived;
returned gamma-ray spectrometer data for ~2 weeks. Last contact 2001-02-28 at
−173 °C (−279 °F); final attempt 2002-12-10 failed. 160,000 images; >70 % mapped;
no magnetic field.

### 14 · Pioneer 10
`id: 'pioneer-10'` · body Interstellar · wentQuiet `2003-01-23` · status
`in-space` · sceneId `5.1`
Firsts: escape trajectory to interstellar space; beyond Mars; through the asteroid
belt; past Jupiter; all-nuclear electrical power (2 × SNAP-19 RTG, ~140 W at
Jupiter). Max escape velocity 51,682 km/h (32,110 mph). Belt 1972-07-15 →
Feb 1973, ~435 million km; measured zodiacal light; some hits, fewer than
expected. Solar storm recorded with Pioneer 9 on 1972-08-07. Jupiter bow shock
1973-11-26 20:30 UT. Closest approach 1973-12-04 02:26 UT, 130,354 km,
~126,000 km/h; 6 of 11 instruments ran continuously; photographed Callisto,
Ganymede, Europa — not Io (the photopolarimeter was lost to radiation).
~500 Jupiter images, best resolution ~320 km, Great Red Spot visible. Encounter
declared over 1974-01-02. Crossed Saturn's orbit Feb 1976; Jupiter's magnetic
tail ~800 million km long. Crossed Neptune's orbit 1983-06-13. Routine contact
ended 1997-03-31 19:35 UT at 67 AU (budgetary). Passed by Voyager 1 1998-02-17
at 69.4 AU. Systems nominal 2000-08-05. Last telemetry 2002-04-27. Last signal
2003-01-23 — 11 h 20 min travel time; RTG decay insufficient for the transmitter.
Final attempt 2006-03-04 failed. ~118.824 AU on 2017-11-05. Heading toward
Aldebaran (Taurus), pass in ~2 million years, upstream toward the nose of the
heliosphere. Carries an aluminium plaque: man, woman, solar system, position
relative to 14 pulsars. Designed for 21 months.

### 15 · Kepler / K2
`id: 'kepler'` · body Heliocentric · launched `2009-03-06` · wentQuiet
`2018-10-30` · status `in-space` · sceneId `5.2`
NASA's first planet-hunting mission. 150,000 stars in one patch of Cygnus;
designed to monitor ~100,000 main-sequence stars over 3.5 years. Transit
photometry. 1 m aperture; 1.4 m (4 ft 7 in) mirror, one of the largest beyond
Earth orbit. First five planets in six weeks (Kepler-4b … 8b, announced
Jan 2010). Kepler-9 announced April 2010 from 156,000+ stars over seven months —
the first confirmed multi-transiting system. Kepler-11 (Feb 2011): six planets,
~2,000 light-years away, the largest comparable to Uranus and Neptune. The most
common size found: between Earth and Neptune — absent from our solar system.
Second reaction wheel lost May 2013; the Sun that powered it also pushed it. K2
used solar photon pressure to hold pointing, "like a kayak steering into the
current"; campaigns roughly every three months along the ecliptic; 10 estimated,
19 achieved; 500,000+ stars surveyed; new research areas (solar-system objects,
supernovae, supermassive black holes). Retired 2018-10-30 in its safe orbit, away
from Earth. 2,600+ planet discoveries. 20–50 % of visible stars may host small
rocky planets in the habitable zone. Data released immediately to the public and
the science community. TESS continues the work from April 2018.


## 0.18 — Source ledger (the fifteen links, and what came from each)

| Source page | What the site uses from it |
|---|---|
| `nssdc.gsfc.nasa.gov` (NSSDCA home) | The archive's self-description — "NASA's permanent archive for space science mission data" — and the Master Catalog's purpose. Frames Scene 0.2. |
| `.../display.action?id=1969-059C` (Apollo 11 LM / EASEP) | All of Scene 1.1: landing time and coordinates, Eagle and crew, the EASEP deployment and its two-stage shutdown, the LRRR, LM subsystem dimensions and masses, engine thrusts, battery count, sample mass, traverse distance, time on surface, the "fate unknown" line, the plaque inscription and both surface quotations, alternate names, launch facts. |
| `.../display.action?id=1969-099C` (Apollo 12 LM / ALSEP) | All of Scene 1.2: Intrepid and crew, coordinates and the 180 m distance to Surveyor 3, the damaged TV camera, EVA durations, 34.35 kg of samples, Surveyor parts returned, the intentional impact and first artificial moonquake, ALSEP central station and antenna, SNAP-27 detail, the six Apollo 12 instruments, on/off times. |
| `.../display.action?id=1971-063C` (Apollo 15 LM / ALSEP) | All of Scene 1.3: Falcon, Scott and Irwin, coordinates, three EVAs and 27.9 km, 77.31 kg, the standup EVA, the three traverses, the hammer-and-feather demonstration, the memorial plaque and small figure, liftoff and impact times, the full ALSEP description, the SNAP-27 RTG in full (442 thermocouples, 89.6-year half-life, 70 W at 16 V, 63.5 W after a year), the seven instruments and frequencies. |
| `.../planetary/lunar/apollo_lrv.html` | All LRV material: three crews and their rovers, per-mission distance and drive-time figures, mass and payload, frame dimensions and folding chassis, seats and antenna, suspension, wheel construction, motors and drives, steering, batteries, the T-handle control logic, navigation and the Sun-shadow device, the two-person deployment, the $19M → $38M contract, the rovers and trainers built, 17-month development, the Harrison Schmitt quotation. |
| `science.nasa.gov/mission/surveyor-3/` | All Surveyor 3 material: mission type and objectives, mass 997.9 kg, Atlas Centaur AC-12, launch, the two instruments, the descent radar and late cut-off, the two bounces, touchdown, 6,326 images, the trenches and bearing tests, the wet-sand comparison and 98 kPa, camera detail, last contact, the Apollo 12 recovery, the both-spacecraft photograph caption. |
| `science.nasa.gov/mission/mars-pathfinder/` | All of Scene 2.2, as listed in §0.13. |
| `science.nasa.gov/mission/mars-exploration-rovers-spirit-and-opportunity/` | All of Scene 3.1, as listed in §0.14. |
| `science.nasa.gov/mission/viking-1/` | All of Scene 2.1, as listed in §0.13. |
| `science.nasa.gov/mission/insight/` and `.../insight/science/` | All of Scene 3.2, as listed in §0.14. |
| `science.nasa.gov/mission/dawn/` and `.../dawn/objectives/` | All of Scene 4.1, as listed in §0.15. |
| `science.nasa.gov/mission/near-shoemaker/` | All of Scene 4.2, as listed in §0.15. |
| `science.nasa.gov/mission/pioneer-10/` | All of Scene 5.1, as listed in §0.15. |
| `science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/` | All of Scene 3.3, as listed in §0.14. |
| `science.nasa.gov/mission/kepler/` | All of Scene 5.2, as listed in §0.15. |


## 0.19 — What is deliberately absent, and how to handle it

- **Phoenix.** The brief groups Phoenix with InSight, and no Phoenix source page was
  supplied. The only Phoenix fact available is that InSight was built on the
  proven design of the Mars Phoenix lander — used in Scene 3.2. If the team wants
  a Phoenix scene, add `science.nasa.gov/mission/phoenix` as a source and write it
  fresh. Do not extrapolate it.
- **Apollo 16 and 17 sites.** Their descent stages and rovers are real and appear
  inside Scene 1.3 through the LRV distance figures, but no NSSDCA records were
  supplied, so they have no scene of their own. Do not invent coordinates.
- **Precise dates for Spirit, Opportunity and Dawn's last command.** Not stated on
  the supplied pages. Keep the conservative wording, or add sources.
- **Current visual condition.** The sources describe objects as built and as last
  observed. They do not offer a current visual. Do not describe dust layers,
  colour change or damage NASA has not published.
- **Cost, politics, "waste".** Only the two documented financial figures may
  appear. Nothing else in this project is editorial about money, and the site
  must not be either.


## 0.20 — The technical contract (stack, budgets, accessibility)

```
Framework      Vite 5 + React 18 + TypeScript (strict: true, noUncheckedIndexedAccess: true)
3D             three ~0.166, @react-three/fiber 8, @react-three/drei 9,
               @react-three/postprocessing 2
Motion         anime.js v4 (DOM + 3D object choreography; scroll-scrubbed via seek())
Scroll         lenis 1.x (smooth) + one rAF-driven progress writer
State          zustand 4 (single store, see §2.4)
Styling        CSS Modules + one global tokens file. No Tailwind.
Fonts          Self-hosted, /public/fonts, woff2 only, max 2 files + 2 italic
Images         Self-hosted, /public/img, webp, max 1920 px wide
Audio          Self-hosted, /public/audio, mp3, muted by default
Bundle budget  ≤ 900 KB gzipped initial JS (3D chunk loaded on demand)
```

**Performance targets (measure; do not assume).**
- 60 fps on a 2020 MacBook Air; ≥ 30 fps on a mid-range Android.
- `dpr = Math.min(devicePixelRatio, 2)`, and `1.5` on touch.
- One 3D scene mounted at a time. Dispose geometry, materials, textures on unmount.
- ≤ 120 draw calls per chapter. `InstancedMesh` for anything repeated > 8 times.
- No texture above 2048². Prefer procedural geometry + small textures.
- Zero layout shift after first paint. Overlays are absolutely positioned.
- First contentful paint < 1.8 s on a 4G throttle.

**Accessibility (judging criterion, not a nicety).**
- Complete non-3D fallback with the same 17 scenes, copy, facts and table. It must
  be genuinely good to read, not a stub.
- All narrative copy lives in the DOM. The canvas is `aria-hidden="true"`.
- Keyboard: Tab reaches every control; Space/PageDown scrolls; Esc closes overlays.
- Body text ≥ 7:1 contrast; large display text ≥ 4.5:1.
- Each scene has a real `h2` in reading order.
- No autoplaying audio. Nothing flashes above 3 Hz. All motion pauses when the tab
  is hidden and when `prefers-reduced-motion: reduce` is set.
- Focus-visible rings on every interactive element, `:focus-visible` only.


## 0.21 — Things that must never appear

1. The words *junk, trash, wreck, garbage, graveyard, litter, debris problem*.
2. Any framing of this site as being about space debris risk.
3. Invented coordinates, dates, quotes, masses, or "current condition".
4. Fake live counters presented as NASA data. Extrapolations must be labelled ours.
5. Autoplaying audio, flashing, or unpausable motion.
6. The NASA logo used as a design element; the word "official"; implied endorsement.
7. Stock sci-fi sound effects (beeps, glitches, terminal text) unless clearly
   labelled as composed ambience — and prefer none.
8. Loading spinners longer than 1.5 s without a skeleton.
9. Any scroll-jacking that traps the visitor; the scrollbar must always work.
10. A cookie banner, newsletter modal, or any interruption of the descent.


## 0.22 — Definition of done (the rubric — build to this, in this order)

1. Scroll 0 → 1 on a laptop and on a phone with no console errors, no frame over
   100 ms, and no missing scene.
2. All 17 scenes render heading, copy, quote (where present) and interaction.
3. The reduced-motion / no-WebGL fallback tells the whole story with all facts and
   the full fifteen-row table.
4. The inventory table sorts by year and by distance; the "still working" toggle
   leaves only the passive retroreflectors.
5. Every NASA image and audio file shows its credit line beside it or in credits.
6. The non-endorsement disclaimer is in the footer, always reachable.
7. Lighthouse: Performance ≥ 85 desktop, Accessibility ≥ 95, Best Practices ≥ 95,
   SEO ≥ 90.
8. `docs/ACCEPTANCE.md` is complete, with one line per scene naming who verified
   it and against which source.
9. Every number on screen traces to `src/data/`.
10. A visitor who scrolls from top to bottom without reading a single word still
    understands: we went out, we left things, and we know exactly where they are.


## 0.23 — Glossary (use exactly these words in code and comments)

| Term | Meaning in this project |
|---|---|
| **progress** | The single normalised scroll value, 0…1. The only driver of the camera. |
| **beat** | A named time window on the page, from `beats.ts`, with `t0`/`t1`. |
| **stop** | One of the eight named zoom levels on the rail. |
| **chapter** | One mounted 3D scene, keyed to a range of beats. |
| **movement** | A narrative grouping of scenes (00…06). |
| **record** | One entry in `objects.ts`. |
| **scene** | One entry in `scenes.ts`, with copy, quote and widget list. |
| **widget** | A DOM interaction teaching one fact (Odometer, FlightCounter, …). |
| **scrub** | Driving an animation's time from `progress` rather than from a clock. |
| **freeze** | A deliberate full stop of motion (Ingenuity at t = 0.63). |
| **the door** | The void→paper transition at t ≈ 0.145 in Scene 0.2. |
| **label bridge** | `src/three/systems/project.ts` — 3D object → screen coordinates. |
| **fallback** | `FallbackStory.tsx`, the complete non-3D experience. |
| **governor** | The runtime perf degrader in `src/three/systems/perf.ts`. |
| **freeze protocol** | The rule that contracts stop changing after Milestone 1. |
# ══════════════════════════════════════════════════════════════════════════════
# PART 1 — NIVISH PART
# "THE DESCENT ENGINE" — Three.js, @react-three/fiber and anime.js
# Paste this after PART 0. Owns src/three/** entirely.
# ══════════════════════════════════════════════════════════════════════════════


## 1.0 — Your brief

You are building the thing people will gasp at. Your deliverable is **one
continuous camera descent** from a galaxy to a footpad, in seven 3D chapters,
driven entirely by the shared `progress` value that Pruthvik writes into the
zustand store. You write no prose, no data, no DOM overlays, no store logic, no
contracts. You are the cinematographer and the model shop.

You own exactly this:

```
src/three/CanvasRoot.tsx
src/three/CameraRig.tsx
src/three/chapters/Chapter00Descent.tsx
src/three/chapters/Chapter01Moon.tsx
src/three/chapters/Chapter02MarsEarly.tsx
src/three/chapters/Chapter03MarsLong.tsx
src/three/chapters/Chapter04Belt.tsx
src/three/chapters/Chapter05Anywhere.tsx
src/three/chapters/Chapter06Inventory.tsx
src/three/objects/LMDescent.tsx
src/three/objects/LRV.tsx
src/three/objects/ALSEPStation.tsx
src/three/objects/RTG_SNAP27.tsx
src/three/objects/LRRReflector.tsx
src/three/objects/Surveyor.tsx
src/three/objects/VikingLander.tsx
src/three/objects/PathfinderLander.tsx
src/three/objects/Sojourner.tsx
src/three/objects/SpiritRover.tsx
src/three/objects/OpportunityRover.tsx
src/three/objects/InSightLander.tsx
src/three/objects/Ingenuity.tsx
src/three/objects/Dawn.tsx
src/three/objects/NEARShoemaker.tsx
src/three/objects/Pioneer10.tsx
src/three/objects/Kepler.tsx
src/three/env/StarField.tsx
src/three/env/MoonTerrain.tsx
src/three/env/MarsTerrain.tsx
src/three/env/BeltRocks.tsx
src/three/env/DustField.tsx
src/three/env/PaperPlane.tsx
src/three/fx/Post.tsx
src/three/fx/Grain.tsx
src/three/systems/perf.ts
src/three/systems/dispose.ts
src/three/systems/animeBridge.ts
src/three/systems/project.ts
src/three/systems/waypoints.ts
```

If you need something from Pruthvik — a changed `t0`/`t1`, a new store field, a
different scene boundary — you do not edit his files. You append a request to the
bottom of `docs/ACCEPTANCE.md` in the form:

```
REQUEST (niv) → (pru): need <thing>. Reason: <why>. Blocking: <yes/no>. Needed by: <M#>.
```

The single most important sentence in your whole brief: **`progress` is the only
thing that drives the camera.** No local scroll listeners anywhere inside
`src/three/**`. No camera moves triggered by clicks. No independent clocks for
camera position. If you find yourself adding `window.addEventListener('scroll')`
in a chapter, you have made an architecture mistake — stop and re-read §1.5.


## 1.1 — Package setup

```jsonc
// package.json (excerpt — Pruthvik scaffolds, you may add 3D deps only)
{
  "dependencies": {
    "three": "~0.166.1",
    "@react-three/fiber": "^8.17.0",
    "@react-three/drei": "^9.109.0",
    "@react-three/postprocessing": "^2.16.0",
    "animejs": "^4.0.2",
    "zustand": "^4.5.0",
    "lenis": "^1.1.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/three": "^0.166.0"
  }
}
```

**Import discipline.** Always import from `'three'` (never from deep paths like
`three/src/...`, which break tree-shaking). Use drei only for genuine
conveniences: `useTexture`, `Instances`, `InstancesInstancedMesh`, `Html` is
**forbidden** (labels are Pruthvik's DOM), `OrbitControls` is **forbidden**,
`ScrollControls` is **forbidden** (Lenis owns scroll).

**anime.js v4 notes you must internalise.**
- v4 uses named imports: `import { createTimeline, createAnimatable, utils, stagger } from 'animejs'`.
- A timeline has `.seek(ms)` — this is how you scrub from `progress`. Do **not**
  use `.play()` for anything that should follow the scroll.
- `createTimeline({ autoplay: false })` then `tl.seek(progress * duration)`.
- `utils.set()` replaces the old `.set()` for instant state.
- `createAnimatable(obj, params)` gives you a per-property interpolator you can
  drive manually — ideal for "the rotors spin while the camera is here".
- anime.js can animate **plain JS objects**, so you can animate a `{ t: 0 }`
  proxy and read it in `useFrame`, keeping React out of the hot path.
- anime.js cannot animate Three.js Vector3/Quaternion directly; use a proxy
  object `{x,y,z}` or `{rx,ry,rz}` and apply it in `useFrame`. This is the pattern
  you will use everywhere.


## 1.2 — `CanvasRoot.tsx` — the single canvas

Rules: exactly **one** `<Canvas>` in the whole app. Chapters are children that
mount/unmount by beat. Never a second canvas, never a portal into another canvas.

```tsx
// src/three/CanvasRoot.tsx
import { Canvas } from '@react-three/fiber'
import { Suspense, useMemo } from 'react'
import * as THREE from 'three'
import { useStore } from '../store'
import CameraRig from './CameraRig'
import ChapterSwitch from './chapters/ChapterSwitch'
import Post from './fx/Post'

export default function CanvasRoot() {
  const reducedMotion = useStore(s => s.reducedMotion)
  const lowTier       = useStore(s => s.lowTier)
  const webglOk       = useStore(s => s.webglOk)

  // The canvas is never mounted in the fallback path.
  if (reducedMotion || lowTier === 'none' || !webglOk) return null

  const dpr = useMemo<[number, number]>(() =>
    matchMedia('(pointer: coarse)').matches ? [1, 1.5] : [1, 2], [])

  return (
    <Canvas
      aria-hidden
      dpr={dpr}
      frameloop="always"
      shadows={lowTier === 'high'}
      gl={{
        antialias: lowTier === 'high',
        alpha: false,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true,
        preserveDrawingBuffer: false,
      }}
      camera={{ fov: 70, near: 0.05, far: 4000, position: [0, 0, 40] }}
      onCreated={({ gl, scene }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping
        gl.toneMappingExposure = 1.05
        gl.outputColorSpace = THREE.SRGBColorSpace
        scene.background = new THREE.Color('#05070d')
        scene.fog = null
      }}
      style={{ position: 'fixed', inset: 0, zIndex: 0 }}
    >
      <Suspense fallback={null}>
        <CameraRig />
        <ChapterSwitch />
        {lowTier === 'high' && <Post />}
      </Suspense>
    </Canvas>
  )
}
```

**`frameloop="always"` is required** — this site has continuous motion (twinkle,
dust, rotors). Do not use `demand`, which would force manual invalidation on every
animated frame and cost you more than it saves. Instead, control cost through
`dpr`, the perf governor, and chapter unmounting.

**`ChapterSwitch.tsx`** (also yours) reads `activeBeatId`/`progress`, maps it to one
`ChapterId`, and renders exactly one chapter with a `key` so unmount disposes
cleanly:

```tsx
// src/three/chapters/ChapterSwitch.tsx
const MAP: Record<ChapterId, React.ComponentType> = {
  'ch00-descent':     Chapter00Descent,
  'ch01-moon':        Chapter01Moon,
  'ch02-mars-early':  Chapter02MarsEarly,
  'ch03-mars-long':   Chapter03MarsLong,
  'ch04-belt':        Chapter04Belt,
  'ch05-anywhere':    Chapter05Anywhere,
  'ch06-inventory':   Chapter06Inventory,
}
export default function ChapterSwitch() {
  const id = useStore(s => s.activeChapter)
  const C = MAP[id]
  return <C key={id} />
}
```

No cross-fade between chapters in 3D. The transition is done by the camera moving
through geometry (see §1.9, the door, and §1.11 the atmosphere passes). Chapters
must not overlap on screen; if you feel you need an overlap, the camera curve is
wrong.


## 1.3 — `waypoints.ts` — author the descent once

This file holds the single source of camera positions, authored by hand, in one
normalised world space. It is data for you, not for Pruthvik. Keep it readable.

```ts
// src/three/systems/waypoints.ts
export interface WP { t: number; pos: [number,number,number]; look: [number,number,number]; fov: number; roll?: number; note: string }

export const DESCENT: WP[] = [
  { t: 0.000, pos: [0,   0,   900], look: [0,0,0],        fov: 70, note: 'Milky Way, deep field' },
  { t: 0.045, pos: [0,   0,   520], look: [0,0,0],        fov: 66, note: 'Sun resolves' },
  { t: 0.075, pos: [-12, 6,   300], look: [0,0,0],        fov: 62, note: 'Solar system, orbits implied' },
  { t: 0.115, pos: [-6,  2,   140], look: [0,0,-40],      fov: 56, note: 'Inner planets' },
  { t: 0.145, pos: [0,   0,    62], look: [0,0,-60],      fov: 50, note: 'Earth; THE DOOR begins' },
  { t: 0.175, pos: [0,   6,    26], look: [0,0,-40],      fov: 44, note: 'Moon surface, arrival' },   // 1.1
  { t: 0.225, pos: [14,  3.2,  10], look: [0,2,-4],       fov: 42, roll: 6, note: 'Eagle, low orbit around LM' },
  { t: 0.275, pos: [-18, 2.4,   9], look: [-16,1.2,-6],   fov: 40, note: 'Intrepid + Surveyor, 180 m apart' },
  { t: 0.335, pos: [30,  1.6,  22], look: [24,1.0,10],    fov: 38, note: 'LRV wheel height, Mare Imbrium' },
  { t: 0.400, pos: [34, 12,    46], look: [24,0,14],      fov: 40, note: 'Six stations; pull up and away' },
  { t: 0.445, pos: [0,   3.0,  16], look: [0,2,-6],       fov: 40, note: 'Mars: Viking horizon' },      // 2.1
  { t: 0.490, pos: [12,  4.5,  14], look: [8,1,-8],       fov: 40, note: 'Pathfinder bounce + Sojourner' },
  { t: 0.535, pos: [-10, 3.2,  18], look: [-8,1,-10],     fov: 40, note: 'Spirit + Opportunity' },       // 3.1
  { t: 0.585, pos: [6,   2.8,  12], look: [4,1,-8],       fov: 40, note: 'InSight, arm to ground' },
  { t: 0.620, pos: [8,   9.0,  10], look: [8,9,-2],       fov: 42, note: 'Ingenuity flight altitude' }, // 3.3
  { t: 0.660, pos: [8,   9.0,  10], look: [8,9,-2],       fov: 42, note: 'FREEZE — nothing moves' },
  { t: 0.710, pos: [-40, 18,   60], look: [-20,0,-30],    fov: 44, note: 'Asteroid belt, Dawn loop' },   // 4.1
  { t: 0.760, pos: [-70, 10,   40], look: [-40,-6,-10],   fov: 48, note: 'Eros, NEAR on the surface' },  // 4.2
  { t: 0.810, pos: [0,   0,   260], look: [0,0,-200],     fov: 62, note: 'Anywhere: sparse stars, Pioneer 10' }, // 5.1
  { t: 0.860, pos: [0,   0,   120], look: [0,0,-120],     fov: 58, note: 'Kepler, barrel silhouette' },  // 5.2
  { t: 0.940, pos: [0,   0,    60], look: [0,0,-60],      fov: 54, note: 'Inventory: dissolve to plane' },// 6.1
  { t: 1.000, pos: [0,   0,    44], look: [0,0,-44],      fov: 52, note: 'The close: stars, count, nothing else' },
]
```

Notes on this table, and why each number is what it is.
- Positions are in **world units**. `WORLD_SCALE` (below) converts real metres.
- The camera **never** approaches a real object closer than 0.6 m equivalent, so
  even a 30 cm Sojourner stays readable at phone width.
- The only authored `roll` is 6° at 0.225 s (the Apollo 11 moment). Everywhere
  else roll is ≤ 2°, which the rig adds procedurally.
- `t` values must match the beat boundaries in `beats.ts`. If Pruthvik bumps
  `BEATS_VERSION`, re-check every waypoint against it.

**Spatial mapping for the Moon and Mars chapters.** Each body gets one coordinate
space, and latitude/longitude map to world x/z with a documented projection, so
the LRV at 26.13° N sits where it should relative to Eagle at 0.67° N:

```ts
// src/three/systems/project.ts  (part 1 of 2 — world mapping)
export const WORLD_SCALE = 0.01            // 1 real metre = 0.01 world units

// Equirectangular projection onto a local tangent patch. Fine at these scales,
// and honest: we are not building a globe, we are building four sites.
export function latLonToWorld(lat: number, lon: number, centreLat: number, centreLon: number, radius = 60) {
  const x = (lon - centreLon) * (Math.PI / 180) * Math.cos(centreLat * Math.PI / 180) * radius
  const z = (lat - centreLat) * (Math.PI / 180) * radius
  return [x, 0, z] as [number, number, number]
}
```


## 1.4 — `CameraRig.tsx` — the most important file you write

```tsx
// src/three/CameraRig.tsx
import { useThree, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useStore } from '../store'
import { DESCENT } from './systems/waypoints'

export default function CameraRig() {
  const { camera } = useThree()
  const reduced = useStore(s => s.reducedMotion)

  // Two curves: where we are, and what we are looking at. Both authored.
  const { posCurve, lookCurve } = useMemo(() => {
    const posCurve  = new THREE.CatmullRomCurve3(DESCENT.map(w => new THREE.Vector3(...w.pos)),  false, 'catmullrom', 0.5)
    const lookCurve = new THREE.CatmullRomCurve3(DESCENT.map(w => new THREE.Vector3(...w.look)), false, 'catmullrom', 0.5)
    posCurve.arcLengthDivisions = 1200; lookCurve.arcLengthDivisions = 1200
    return { posCurve, lookCurve }
  }, [])

  // FOV and roll are looked up from the same table by linear interpolation.
  const fovAt = (t: number) => lerpTable(DESCENT, t, w => w.fov)
  const rollAt = (t: number) => lerpTable(DESCENT, t, w => w.roll ?? 0)

  const tmpP = useMemo(() => new THREE.Vector3(), [])
  const tmpL = useMemo(() => new THREE.Vector3(), [])
  const up   = useMemo(() => new THREE.Vector3(0, 1, 0), [])
  const clock = useRef(0)

  useFrame((_, dt) => {
    // RAW progress. No smoothing here — Lenis already smooths upstream.
    const t = useStore.getState().progress
    clock.current += dt

    posCurve.getPointAt(THREE.MathUtils.clamp(t, 0, 1), tmpP)
    lookCurve.getPointAt(THREE.MathUtils.clamp(t, 0, 1), tmpL)

    // Handheld drift: tiny, non-repeating, killed under reduced motion.
    if (!reduced) {
      const d = 0.004
      tmpP.x += Math.sin(clock.current * 0.31) * d
      tmpP.y += Math.sin(clock.current * 0.23 + 1.7) * d
    }

    camera.position.copy(tmpP)
    camera.up.copy(up)
    camera.lookAt(tmpL)

    // Roll after lookAt, so it is a true camera roll.
    const rollDeg = rollAt(t) + (reduced ? 0 : Math.sin(clock.current * 0.19) * 1.2)
    camera.rotateZ(THREE.MathUtils.degToRad(rollDeg))

    const fov = fovAt(t)
    if (Math.abs((camera as THREE.PerspectiveCamera).fov - fov) > 0.01) {
      (camera as THREE.PerspectiveCamera).fov = fov
      ;(camera as THREE.PerspectiveCamera).updateProjectionMatrix()
    }
  })

  return null
}

function lerpTable<T>(rows: { t: number }[], t: number, pick: (r: any) => number) {
  for (let i = 0; i < rows.length - 1; i++) {
    const a = rows[i], b = rows[i + 1]
    if (t >= a.t && t <= b.t) {
      const k = (t - a.t) / (b.t - a.t || 1)
      return pick(a) + (pick(b) - pick(a)) * k
    }
  }
  return pick(rows[t <= rows[0].t ? 0 : rows.length - 1])
}
```

**Why `getPointAt` and not `getPoint`.** `getPoint` samples by parameter, so speed
varies wildly between close waypoints. `getPointAt` samples by **arc length**, so
the visitor moves at a constant rate through world space regardless of how tightly
you authored the waypoints. This is the difference between "a camera on rails" and
"a camera with a sticky wheel".

**Why no smoothing in the rig.** Lenis already interpolates scroll. If you also
lerp `progress` here, you get double lag: the camera visibly drifts behind the
text, which reads as a broken site. Read raw; let the upstream smoothing be the
only smoothing.

**FOV is the secret of the fall.** 70° at the galaxy reads wide and cold; 38–42° at
ground level reads intimate and slightly compressed. Animating FOV alongside
position is what makes the descent feel like falling rather than like a slideshow
of zoom levels.

**Roll budget.** ≤ 2° everywhere except the one authored 6° at the Apollo 11
moment. More than that and the horizon tips enough to make people seasick.

**Verification for M1.** Scrub the scrollbar from top to bottom and back at a
constant slow speed. You should never see a jump, a reversal, a wall of geometry
in front of the camera, or a frame where the camera is inside a mesh. If you do,
fix the waypoint table, not the code.

**If a chapter's framing is wrong,** you adjust the waypoint row for its beat —
never the curve tension, never the chapter geometry. That keeps the whole descent
re-tunable in one table.


## 1.5 — `animeBridge.ts` — anime.js as a scrubbing engine, not a player

The rule: **anime.js never plays on its own.** Every anime timeline that matters
is created with `autoplay: false` and then **seeks** from `progress`. This makes
the entire site reversible: scrolling up rewinds, exactly like scrubbing a film.

Three patterns, use all three:

### Pattern A — a scroll-scrubbed timeline for object choreography

```ts
// src/three/systems/animeBridge.ts
import { createTimeline, createAnimatable, utils } from 'animejs'

/** Build a timeline whose total duration is 1 (normalised) and seek it 0..1. */
export function makeScrub(durationMs = 1000) {
  const tl = createTimeline({ autoplay: false, defaults: { ease: 'linear' } })
  return {
    tl,
    /** seek a normalised 0..1 value into the timeline */
    seek(u: number) { tl.seek(utils.clamp(u, 0, 1) * durationMs) },
    durationMs,
  }
}
```

### Pattern B — animating Three.js objects through a proxy

anime.js cannot touch `THREE.Vector3` directly, so animate a plain object and read
it in `useFrame`. Zero allocations in the frame loop.

```ts
// Example: the LRV unfolding (Scene 1.3)
const lrv = { chassis: 0, wheels: 0, seats: 0, mast: 0 }
const scrub = makeScrub(1000)
scrub.tl
  .add(lrv, { wheels: 1, duration: 260, ease: 'outCubic' }, 120)
  .add(lrv, { chassis: 1, duration: 340, ease: 'inOutQuad' }, 300)
  .add(lrv, { seats: 1, duration: 200, ease: 'outBack' }, 560)
  .add(lrv, { mast: 1, duration: 240, ease: 'outCubic' }, 700)
// In the chapter's useFrame:
scrub.seek(local01)   // local01 = remap(progress, 0.275, 0.335)
// Then read lrv.wheels etc. to set rotations/positions.
```

### Pattern C — `createAnimatable` for continuous, non-scrubbed motion

For things that should always be alive while visible — rotors, dust, twinkle
phases, the RTG fin shimmer — use `createAnimatable` and simply read it. This
keeps "alive" motion separate from "narrative" motion, which is important at the
Ingenuity freeze: you kill the animatables, you do not kill the scrubs.

```ts
const rotor = createAnimatable({ spin: 0 }, { spin: { duration: 900, ease: 'linear' } })
rotor.spin(720)          // keep spinning
// at t = 0.63:  rotor.spin(0)  and  frozen = true
```

**Easing vocabulary.** Use only these, and use them consistently: `linear` for
anything scrubbed (because the scroll supplies the timing), `outCubic` /
`outQuint` for reveals, `inOutQuad` for mechanical unfolding, `outBack` for a
single moment of overshoot (the seats), `inOutSine` for orbital drift.

**Never** use anime.js for: the camera (that is the rig), DOM text (that is
Pruthvik's), or anything that needs to survive a chapter unmount. Timelines are
local to a chapter and are garbage-collected with it.


## 1.6 — Chapter lifecycle, Suspense and disposal

Every chapter is a function component that may `useLoader` assets. Structure:

```tsx
export default function Chapter01Moon() {
  const { scene } = useThree()
  const reg = useDisposeRegistry()
  useEffect(() => () => reg.disposeAll(), [reg])   // last line of defence
  return (<>
    <MoonTerrain />
    <group position={site('eagle')}>
      <LMDescent />
      <ALSEPStation />
      <LRRReflector />
    </group>
    {/* … */}
  </>)
}
```

`useDisposeRegistry` (in `systems/dispose.ts`) collects geometries, materials and
textures created inside the chapter and disposes them on unmount:

```ts
export function useDisposeRegistry() {
  const reg = useRef({ geos: new Set<THREE.BufferGeometry>(), mats: new Set<THREE.Material>(), texs: new Set<THREE.Texture>() })
  useEffect(() => () => {
    reg.current.geos.forEach(g => g.dispose())
    reg.current.mats.forEach(m => m.dispose())
    reg.current.texs.forEach(t => t.dispose())
    reg.current.geos.clear(); reg.current.mats.clear(); reg.current.texs.clear()
  }, [])
  return {
    geo<T extends THREE.BufferGeometry>(g: T) { reg.current.geos.add(g); return g },
    mat<T extends THREE.Material>(m: T) { reg.current.mats.add(m); return m },
    tex<T extends THREE.Texture>(t: T) { reg.current.texs.add(t); return t },
    disposeAll() { /* same as the effect body */ },
  }
}
```

**Rules that keep memory flat over a 6-minute scroll:**
1. Every geometry created inside a chapter goes through `reg.geo()`.
2. Every material through `reg.mat()`.
3. Every texture loaded through drei's `useTexture` is cached globally by drei —
   that is fine, but textures you generate (`CanvasTexture`, `DataTexture`) must be
   registered.
4. Never build geometry in `useFrame`. Ever.
5. `useMemo` every geometry; if a parameter changes, key the memo.
6. Verify with `renderer.info` after scrolling the full page three times:
   `memory.geometries` and `memory.textures` must return to their start values
   after one full loop.


## 1.7 — `StarField.tsx` — the opening, and the closing

Two appearances: Scene 0.1 (dense, with planets) and Scene 5.2/6.2 (sparse, no
planets). One component, a `density` prop.

```tsx
// 3 layers: far 200k, mid 60k, near 20k (governor may halve these)
const layers = [
  { count: 200_000, radius: [700, 900], size: 0.9, drift: 0.02 },
  { count: 60_000,  radius: [420, 700], size: 1.4, drift: 0.06 },
  { count: 20_000,  radius: [180, 420], size: 2.2, drift: 0.14 },
]
```

- Geometry: `BufferGeometry` with position + a per-point `aSeed` float attribute.
- Material: `ShaderMaterial`, `transparent: true`, `depthWrite: false`,
  `blending: AdditiveBlending`.
- Vertex shader: `gl_PointSize = uSize * aSeed * (uAttenuation / -mvPosition.z)`.
- Fragment shader: soft radial falloff — `float d = length(gl_PointCoord - 0.5); alpha = smoothstep(0.5, 0.0, d)`. Multiply by a slow twinkle
  `0.85 + 0.15 * sin(uTime * 0.7 + aSeed * 40.0)`.
- Colour: mostly `#dfe9ff`, 6 % warm `#ffe7cc`, 3 % blue-white `#bcd6ff`.
- `uTime` advances only while the chapter is visible; kill it under reduced motion
  (which will not happen, since the canvas is unmounted then — but keep the guard).
- Parallax: give each layer a different `uDrift` so that camera translation
  produces genuine depth instead of a flat sheet.

**The single bright point.** Add one `Sprite` at the camera's forward direction
with a soft glow texture generated on a 128² canvas, scaled by
`0.4 + 3.0 * smoothstep(0, 0.05, progress)`. This is "one of them is ours".

**Perf.** 280k points is fine on desktop and too much on a mid phone. The
governor halves the far layer first (§1.20). Keep the attribute arrays in
`Float32Array` and never touch them after creation.


## 1.8 — Planets and the Sun

Keep them almost embarrassingly simple, because the audience is moving fast.

- Sun: `SphereGeometry(1, 32, 32)` + `shaderMaterial` with a noisy emissive rim,
  plus a `Sprite` glow at 6× radius with `AdditiveBlending`. One `PointLight` at
  the sun's position, `intensity` high, `distance 0` (infinite), `decay 0` — this
  is your only light in ch00.
- Planets: `SphereGeometry(1, 48, 48)` with a `MeshStandardMaterial`
  (`roughness 1`, `metalness 0`) and a subtle 3-band colour ramp per planet
  (Mercury grey, Venus cream, Earth blue+white, Mars oxide). Add an **atmosphere
  rim** as a second sphere at 1.02× scale with a custom shader:
  `float f = pow(1.0 - dot(normalize(vNormal), normalize(vViewDir)), 2.6);`
  colour × f, additive, `side: THREE.BackSide`.
- Sizes are **not to scale** — and you must tell Pruthvik so he can note it in the
  credits. Use "readable scale": Earth 6 units, Mars 5, Jupiter 12, Sun 22, with
  orbits spaced for legibility. The site is factual about objects; the descent is
  a diagram, and the credits line is: *"Distances and body sizes in the descent are
  compressed for legibility."*
- Motion: each planet rotates on its axis at a barely visible rate. No orbits
  animate — the camera does the moving.

**Order matters.** The descent passes: Milky Way → Sun → solar system → inner
planets → Earth → (door) → Moon. Place them along −Z with increasing closeness to
the camera path so the transit reads as continuous forward motion. Cross-check
every planet against `DESCENT` y/x drift so nothing clips the camera; run the
sweep test in §1.22.


## 1.9 — THE DOOR — `PaperPlane.tsx`

This single transition carries more of the site's meaning than any model. It is
where space becomes story, and where the palette flips from void to paper.

Implementation: a full-screen quad parented to the camera, sitting 1.2 units in
front of it, only in `ch00-descent`.

```glsl
// fragment, simplified
uniform float uMix;          // 0 = invisible, 1 = full paper
uniform vec3  uVoid;         // #05070d
uniform vec3  uPaper;        // #f4f7fb
uniform vec2  uCenter;       // where the "doorway" is
varying vec2  vUv;

void main() {
  // A soft rectangle of paper grows out of uCenter.
  vec2 p = vUv - uCenter;
  p.x *= uAspect;
  float box = 1.0 - smoothstep(0.0, 0.62, max(abs(p.x), abs(p.y)) - uMix * 0.75);
  float grain = hash(vUv * 900.0) * 0.05;          // paper fibre
  vec3 col = mix(uVoid, uPaper + grain, box * uMix);
  float a  = box * uMix;
  gl_FragColor = vec4(col, a);
}
```

- `uMix` is driven by `smoothstep(0.138, 0.158, progress)`. Slightly asymmetric
  in/out so it feels like passing through, not fading.
- Centre it slightly above the middle-left, where the catalog record will appear
  in the DOM (Pruthvik's `FactDrawer`), so the text seems to be *printed on* the
  paper as the paper arrives. Coordinate this with him once, at M2, and do not
  change it after.
- **Second duty.** The same quad, with `uMix` reversed, is reused at the start of
  `ch06-inventory` to dissolve 3D into the dark plane behind the table.
- **The feel we want:** not a wipe, not a fade. A doorway. The visitor should feel
  the frame pass *through* something. Test it at three scroll speeds; it must read
  at all three. If it feels like a fade, sharpen the `smoothstep` edges and reduce
  the total duration window by 20 %.


## 1.10 — `MoonTerrain.tsx`

The Moon must read as the Moon in under one second. What does that is **shadow +
grain**, not geometry detail.

- Plane: `PlaneGeometry(400, 400, 256, 256)` rotated `-Math.PI/2`, positioned so
  the four landing sites (mapped via `latLonToWorld`) sit inside the visible area.
- Displacement: 5 octaves of simplex noise in the vertex shader (do it on GPU, not
  in JS) — amplitude ~0.9 units, frequency ladder 0.012 / 0.03 / 0.07 / 0.15 / 0.3.
  Add a large-scale "mare vs highland" mask so the ground is not uniformly rough.
- Craters: a `craterField` function in the same vertex shader — for each of N=14
  seeded craters (passed as a `uniform vec4[14]`: xz centre, radius, depth), carve
  a bowl: `h -= depth * smoothstep(r, 0.0, d) + rim * exp(-pow((d - r)/ (r*0.18), 2.0))`.
  GPU craters cost zero draw calls and look better than instanced cones.
- Secondary craters: an `InstancedMesh` of 120 low-poly rim+bowl meshes for
  near-camera detail only, seeded deterministically (`mulberry32(1337)`).
- Material: `MeshStandardMaterial` with a 1024² greyscale noise normal map
  generated once on a canvas (register it for disposal), `roughness 0.95`,
  `metalness 0.0`, colour `#9a9a96`. Add a second `MeshPhysicalMaterial`
  underneath with `sheen` 0.3 at `#cfcfc8` and `sheenRoughness` 0.9 for the
  regolith bloom at grazing angles.
- **Lighting.** One `directionalLight` at elevation 8–12°, intensity 3.2, colour
  `#fff6e8`, casting shadows with a tight `shadow.camera` frustum around the
  active site (not the whole 400-unit plane). One `ambientLight` at 0.06 — this
  is near-vacuum; almost no fill. That contrast is the whole effect.
- Footprints of the era: no footprints, no flag geometry unless you also model it
  accurately. Prefer to omit the flag entirely — the data does not describe it and
  a wrong flag is worse than no flag.
- Site layout (metres, real, then × `WORLD_SCALE`): Eagle group at
  `latLonToWorld(0.67416, 23.47314, 0, 0)`, Intrepid+Surveyor at
  `latLonToWorld(-3.0128, -23.4219, 0, 0)`, Falcon+LRV at
  `latLonToWorld(26.13239, 3.63330, 0, 0)`. Because these are hundreds of km apart
  in reality, compress the *plan* by a factor of ~90 while keeping each object's
  own scale exact, and state that in the credits. **Never** compress an object's
  own dimensions.

**Determinism.** Same seed, same terrain, every load, every device. Never
`Math.random()` in geometry. This matters because Nivish's screenshots and
Pruthvik's pins must agree.


## 1.11 — `MarsTerrain.tsx` and `DustField.tsx`

- Plane: `PlaneGeometry(400, 400, 192, 192)`, gentler displacement than the Moon
  (amplitude 0.55; Mars is smoother at these scales), plus a few long dune ridges
  made with a directional noise term: `sin(noise(x*0.02, z*0.05) * 12.0)`.
- Palette: base `#a8563a`; scattered darker basalt `#5a3527`; light dust
  `#c98b63`. Mix by a noise mask so the ground reads as dust over rock.
- `fog`: `new THREE.FogExp2('#b4685a', 0.0075)` in this chapter only, tuned so the
  horizon dissolves at ~120 units. This is what makes Mars feel like an atmosphere
  and the Moon feel like a vacuum — the pairing is the point.
- Sky: no skybox needed. A large `SphereGeometry` with `BackSide` and a vertical
  gradient shader `#c98b63 → #7d4636`, `depthWrite: false`.
- `DustField`: 4,000 points in a 60×12×60 box around the camera, each drifting on
  a slow noise-driven vector, wrapping at the box edges. `ShaderMaterial`, additive,
  size 2–4 px, alpha 0.04–0.10. **This is the only constant motion on Mars** and it
  should feel like the planet breathing. Governor may disable it entirely on low
  tiers — that is the first thing to go, and Mars will still read fine.
- InSight's site: flat, boring, correct. Elysium Planitia was chosen for safety,
  so the terrain there must be *obviously* duller than the other sites. Give it a
  near-flat patch and let the visitor notice.


## 1.12 — `BeltRocks.tsx`, Ceres, Vesta, Eros

- Belt: an `InstancedMesh` of 900 irregular polyhedra. Build one base geometry by
  jittering an `IcosahedronGeometry(1, 1)`'s vertices with seeded noise, then vary
  each instance's scale (0.2–3.2) and rotation. Two materials, one lit and one in
  shadow, to fake the single-source lighting.
- Ceres: `SphereGeometry(6, 64, 64)` + a subtle crater normal map. Vesta:
  `SphereGeometry(4.5, 64, 64)`, visibly more irregular — scale it
  non-uniformly (`[1, 0.86, 0.92]`) so it reads as "evolved and battered".
- Eros: an irregular elongated body. Build from `IcosahedronGeometry(1, 3)` with
  seeded vertex displacement, then scale to `[1.0, 0.62, 2.4]` — the ~21-mile
  length is the identifying feature. Add a ridged "saddle" dent so the Himeros area
  is plausible, and place `NEARShoemaker` on it just south of that dent.
- Lighting: `directionalLight` only, no ambient, distance-based shadow. Lonely
  objects, harsh single source, long black. **Do not add fill light here.**
- Dawn's loop: a `CatmullRomCurve3` ellipse around Ceres. Dawn's position is
  `curve.getPointAt(frac)` where `frac` advances slowly from an animatable — it
  must never complete a lap within the scene's scroll window, so the visitor never
  sees a resolution. That is the visual argument of the scene: *the loop never
  resolves*.


## 1.13 — `Chapter05Anywhere` — no ground, no up

- Reuse `StarField` at `density="sparse"`, no planets.
- Pioneer 10 drifts along a fixed vector at a speed the visitor can *just* perceive
  (~0.4 units/s). Rotate it very slowly so the dish catches the light once every
  ~40 s.
- Kepler: a barrel with an open aperture, tumbling at ~0.02 rad/s. Nothing else.
- **No `camera.up`** — set `camera.up` to a lerped vector that drifts by ±12° over
  the chapter so the visitor slowly loses their sense of which way is down. This is
  the only chapter where that is allowed, and it is the emotional point: there is
  no ground here. Lerp the up-vector with `inOutSine`, never instantly, and clamp
  the total drift.


## 1.14 — `Chapter06Inventory` — get out of the way

Full-bleed dark plane (`#05070d`) with a very faint dot grid — one dot per object,
fifteen dots, positioned in a loose constellation. The `PaperPlane` quad reverses
over the first 15 % of the chapter. Then: **hold**. No camera drift beyond the
handheld 0.004. The table is Pruthvik's; your job is to give it a quiet, dark,
almost empty room. When the chapter ends, dissolve back to stars for Scene 6.2.


## 1.15 — The thirteen procedural models

**Global rules for every model.**
1. Authored in **real metres**, then multiplied by one `WORLD_SCALE = 0.01` at
   chapter level. A model file must contain no scale tricks of its own.
2. Every model accepts `<group visible scale position rotation>` via props spread.
3. Every model uses **shared materials** from `systems/materials.ts` where
   possible: `goldFoil`, `blackStrut`, `whitePaint`, `aluminium`, `wireMesh`,
   `solarPanel`, `glassLens`. Shared materials keep draw calls and memory down.
4. Primitives only. No external GLB, no downloaded models — they will not be
   licensed, credited or sized correctly, and they blow the bundle budget.
5. Each model exports a `useMemo`-built geometry tree and a `SITE` anchor
   (`{ center: [x,y,z], labelAnchor: [x,y,z] }`) so Pruthvik's DOM labels can
   attach. `labelAnchor` is the point where a label should point — the top of the
   ascent stage, not the middle of the footpad.
6. Fidelity target: recognisable by silhouette in **under 300 ms of looking**, at
   phone width, without a label. Test that with a friend.

### `LMDescent` — Apollo 11/12/15 descent stage
- Body: octagonal prism, **4.2 m across, 1.7 m thick** → `CylinderGeometry(2.1, 2.1, 1.7, 8)`.
- Four legs: two main + two outrigger per side as per the real geometry; simplify
  to four legs at 45° intervals with the strut angle that puts the footpads
  **9.4 m apart** and holds the body bottom **1.5 m** above the surface.
- Footpads: `CylinderGeometry(0.46, 0.46, 0.09, 20)` with a slight dish.
- Engine skirt: **1 m** conical — `CylinderGeometry(0.5, 0.72, 1.0, 24)` inverted,
  protruding below the body centre.
- Ladder + egress platform on one leg.
- Materials: gold foil body (`MeshStandardMaterial` `#c9a227`, `metalness 0.85`,
  `roughness 0.42`, with a `normalMap` of creased noise to fake foil crinkle),
  black struts, white ascent-stage stub (a short `CylinderGeometry` on top so the
  children understand it is a *base*).
- `labelAnchor`: `[0, 3.2, 0]` (in metres, above the ascent stub).

### `LRV` — Lunar Roving Vehicle
- Frame: `BoxGeometry`-based welded tube look — use thin `CylinderGeometry` struts
  between nodes; 3.1 m long, 2.3 m wheelbase, 1.14 m max height.
- Wheels: ×4, **81.8 cm diameter, 23 cm wide**. Tyre = `CylinderGeometry(0.409, 0.409, 0.23, 32, 1, true)` with a wire-mesh look: a `MeshStandardMaterial`
  with an alpha-mapped canvas texture of a diamond lattice, `transparent`, `side: DoubleSide`.
  Chevrons: a second thin torus ring of 20 small angled boxes, 50 % coverage.
  Hub: spun aluminium disc. Bump-stop: a smaller inner ring so the wheel reads as
  hollow-mesh, not solid.
- Seats: two side-by-side, `BoxGeometry` frames + a `PlaneGeometry` nylon webbing
  with a canvas texture. Armrest between. Footrests forward.
- Mast: front centre, with a **mesh dish antenna** —
  `SphereGeometry(0.28, 24, 12, 0, Math.PI*2, 0, Math.PI/3)` opened, `side: DoubleSide`,
  `wireframe` false but with an alpha-mapped mesh texture so it reads as mesh.
- Battery boxes low between the wheels, `36 V` label region (no text in 3D).
- The folding: build the chassis as **three hinged parts** with pivots at the real
  hinge lines so §1.16's deployment animation is physically right.

### `ALSEPStation` — the central station
- Central station: **25 kg** box, roughly 0.5 m cube on four short legs, with a
  louvred radiator face (instanced thin fins).
- Antenna mast: 58 cm long, 3.8 cm diameter `CylinderGeometry`, with a small
  helical antenna at the top.
- Apollo 11 variant prop `solar="easep"`: two canted rectangular panels facing
  east and west on brackets.
- Apollo 15 variant: no solar panels; the RTG is separate. Use `<RTG_SNAP27 />`
  beside it, connected by a cable (`CatmullRomCurve3` → `TubeGeometry`, thin).

### `RTG_SNAP27` — get this one exactly right
- Central cylinder: **46 cm high**, with a thinner concentric inner cylinder.
- **Eight radiating rectangular fins**, total tip-to-tip diameter **40 cm**.
  The fin count is the identifying feature; a viewer who knows the hardware will
  check it. Build with `InstancedMesh` of 8 boxes rotated around Y.
- Fuel rod cap: a small `CylinderGeometry` at the top, `#3b3f46`, matte.
- Heat shimmer: a tiny additive sprite above the fins with very low alpha and a
  slow animatable oscillation. This is *artistic* — the RTG does run hot — but keep
  it under 0.06 alpha so it never looks like flame.
- `labelAnchor`: `[0, 0.3, 0]`.

### `LRRReflector` — the object that outlives everything
- A small square array of corner-cube retroreflectors: `BoxGeometry(0.6, 0.05, 0.6)`
  with a 3×3 `InstancedMesh` of small `SphereGeometry` lens caps on top, tinted
  `#b9c8d8`, `metalness 1`, `roughness 0.06`.
- Give it a **single** faint specular response to the key light so it catches the
  eye once. It must look inert and precise — this is the object that needs no
  power, and the whole "still working" argument rests on it.

### `Surveyor` — Surveyor 3
- Triangular leg frame: three `CylinderGeometry` legs with crushable aluminium
  struts and round footpads, meeting a central body.
- Body: a squat `BoxGeometry`/`CylinderGeometry` hybrid, white paint with a
  gold-ish radiator panel.
- Mast: a short vertical boom with the camera head box, plus the **surface sampler
  scoop** on a horizontal boom — a small open box with a serrated front lip.
- Sun sensors and a small high-gain antenna dish (0.3 m) on a short mast.
- It must read **small** next to `LMDescent` — that is the whole point of Scene 1.2.

### `VikingLander` — Viking 1
- Body: an aeroshell-derived hexagonal/octagonal body ~2.2 m across, white paint
  with gold thermal blankets on the upper surface.
- Three legs, splayed, with round footpads, holding the body ~1.2 m up.
- Sampler arm: a folding boom with a scoop head at the tip, reaching forward.
- Two RTG booms (SNAP-19) angled out, each a finned cylinder — the identifying
  silhouette feature of a Viking lander.
- Camera head on a short boom; a small meteorology mast.
- `labelAnchor` at the top of the body.

### `PathfinderLander` + `Sojourner`
- Pathfinder: a tetrahedral petal lander, three petals opened flat, with the
  ramps; solar cells as dark blue panels on the inner faces.
- `Sojourner`: **30 cm tall**, flat solar deck, six small wheels (build a 6-wheel
  bogie in two rows of three, each wheel ~13 cm), short mast with a camera head,
  small rear antenna. It must look tiny beside Pathfinder and *absurdly* tiny
  beside the LM. That scale contrast is a factual service to the visitor.

### `SpiritRover` / `OpportunityRover` — Mars Exploration Rovers
- One shared parametric component with a `variant` prop; the two are near-identical
  externally. Body: a flat rectangular equipment deck on a rocker-bogie
  suspension — build the six wheels at ~26 cm diameter with visible hub motors,
  and the rocker-bogie linkage as thin struts in the correct triangular pattern.
- Pancam mast: a 1.5 m vertical mast with a rectangular camera head (two eyes).
- Solar arrays folded as deck panels with dark blue cells.
- IDD arm folded against the front, with a turret of tools at the tip.

### `InSightLander`
- Circular deck ~1.6 m diameter on three legs.
- Two **round** fan-out solar arrays, each a segmented disc (this is the
  silhouette: two big pancakes).
- Robotic arm: over 1.8 m, built as three segments with visible joints, reaching
  down to a point on the ground beside the deck.
- On the ground beside it: a small hexagonal seismometer package and the heat-probe
  mole with its tether — these two props are essential, because they are what the
  mission actually did.
- Slightly domed top deck with the windscreen/shield.

### `Ingenuity`
- Fuselage: a small box ~0.14 m, with a solar panel on top.
- **Two counter-rotating rotor pairs**: two masts, each with two blades ~0.6 m
  long (span just under 1.2 m tip-to-tip). Blades are thin tapered boxes with a
  slight twist; make them visibly separate so counter-rotation reads.
- Four thin legs with skids, splayed wide.
- Landing gear must look fragile — it is.
- For the freeze (§1.17) you need the rotors as separate refs with their own
  rotation values, and a `frozen` prop that hard-stops them mid-rotation.

### `Dawn`
- Rectangular bus ~1.7 × 1.3 × 1.7 m, white/black thermal.
- Two long solar array wings, each in two segments (a distinctive "double
  butterfly" silhouette).
- Ion engine bell at the −Z face: a shallow `CylinderGeometry` cone, dark metal.
- High-gain antenna dish on the +Z face; star trackers as small cylinders.

### `NEARShoemaker`
- Boxy bus ~2.7 m long, four fixed solar panels in a cross, a 1.5 m high-gain dish,
  a smaller X-band antenna, and a magnetometer boom.
- It should look like a *machine that was never meant to land* — no legs, no
  footpads. That absence is the story of Scene 4.2.

### `Pioneer10`
- **2.9 m parabolic dish** — the dominant feature. Build with
  `SphereGeometry(1.45, 48, 24, 0, Math.PI*2, 0, Math.PI/2.6)` `side: DoubleSide`,
  with a faint mesh pattern via alpha map.
- Two RTG booms (SNAP-19) on short outriggers, each finned.
- One long instrument boom (~6 m) with a magnetometer at the tip.
- The **plaque**: a thin gold plate (0.23 × 0.15 m) mounted on the side of the bus,
  angled so a camera passing at 0.81 can catch it. Do not attempt to render the
  artwork in 3D — Pruthvik's `PlaqueViewer` handles that in the DOM.

### `Kepler`
- Barrel photometer ~0.95 m aperture, ~4.7 m long — a `CylinderGeometry` with an
  open front, an inner dark baffle stack (instanced rings receding), and a flat
  solar array panel extending from the side.
- The **open aperture** is the key read: a black circle with faint concentric
  baffles, facing away from the visitor at first and rotating into view.
- Body behind the barrel with a small high-gain antenna.

**Materials file.** Build `systems/materials.ts` once with all shared materials and
export them as constants with `useMemo`-free singletons (they are immutable). This
alone will save you ~40 % of material instantiations.


## 1.16 — anime.js choreography per scene

Each scene gets one scrubbed timeline, built once in `useMemo`, seeked from
`progress` inside the chapter. Below is what each should do. Timings are
normalised 0…1 inside the scene's own window, not the whole page.

**ch01 · Scene 1.1 (Eagle).** Camera orbits; the LM does not move. Animate only:
the EASEP's solar panel glint (an `emissiveIntensity` animatable, 0 → 0.15 → 0),
and, at u = 0.85, dim every powered surface by 70 % while raising the
retroreflector's specular — a single frame where the app's central argument is
visible. The `StillWorkingToggle` DOM widget drives the same values through the
store, so read that flag and multiply.

**ch01 · Scene 1.2 (Intrepid + Surveyor).** A 180 m beam-line: a thin
`TubeGeometry` drawn along the ground between the two objects, with
`drawRange` animated 0 → full as u goes 0.2 → 0.7. Then a `moonquake` beat at
u = 0.9: a single 120 ms shake of the terrain group (`position.y` ± 0.04) — the
visual echo of the intentional impact that produced the first recorded artificial
moonquake.

**ch01 · Scene 1.3 (Falcon + LRV).** The full deployment sequence, scrubbed:
wheel fold-out (u 0.10–0.36), chassis unfold (0.30–0.64), seats up (0.56–0.76,
`outBack`), mast up (0.70–0.94). Then a slow "drive" reading: advance the rover
0.0–1.2 m along x with the wheels rotating at the correct ratio
(`rotation = distance / (2πr)`), because a rolling wheel that does not match its
travel is the kind of detail a judge will notice.

**ch02 · Scene 2.1 (Viking).** Nothing mechanical moves. Instead animate a single
`light.distance` fade at u = 0.92 — the beacon going out — while the sampler arm
holds mid-reach. Do not animate an explosion, a dust wave, or a collapse. The
failure was a bad command; it should look like nothing happened at all.

**ch02 · Scene 2.2 (Pathfinder).** The bounce, scrubbed to the real physics
minimum: four arcs, peaks at u = 0.18 / 0.34 / 0.48 / 0.60, decreasing height
(15 m → 6 → 2.5 → 0.8), then a settle wobble, then the petal open (0.74–0.88) and
Sojourner's ramp descent (0.86–1.0). Use `inOutSine` for arcs and `outCubic` for
the settle. The visitor is watching 2.5 minutes of real time compressed into one
scroll — that is the point.

**ch03 · Scene 3.1 (Spirit + Opportunity).** Static rovers, animated *dust*:
a very slow settling of the dust field around Opportunity's arrays, and a single
glint sweep across its clean panels at u = 0.8 — the visual reference to the
March 2014 wind that cleaned them.

**ch03 · Scene 3.2 (InSight).** The arm: a three-segment placement sequence
(u 0.1–0.45) that ends with the seismometer and the mole on the ground. Then a
`seismic pulse`: one ring of low-amplitude concentric circles drawn on the terrain
(shader `uPulse`), 0 → 1 → 0 across 900 ms, at u = 0.8. That is what "listening"
is worth visualising.

**ch03 · Scene 3.3 (Ingenuity) — the freeze.**
- u 0.0–0.35: camera rises to flight altitude; rotors spin up via animatable,
  accelerating from 0 to full over 400 ms.
- u 0.35–0.60: the flight — a small arc, 3–4 m of lateral travel, rotor blur
  maximum.
- u 0.60 → **0.63: DECELERATE AND STOP.** Rotor rpm animatable → 0. Lateral
  motion → 0. Dust → 0.
- u ≥ 0.63: **absolutely nothing moves.** Not the camera drift, not the dust, not
  the twinkle. Add `frozen = true` and early-return in every `useFrame` in the
  chapter. The only motion on screen is Pruthvik's DOM `FlightCounter`.
- Hold the rotor at a **slightly asymmetric angle** — one blade restored to a
  plausible stopped position, one visibly bent 8–12°. A stopped propeller, not a
  crashed one. Do not render debris.
- This 0.03-wide freeze window is the single most important 3 % of the site. Test
  it on a phone. If the visitor scrolls through it in under a second they will
  miss it; that is why Pruthvik gives it a full beat window and a static caption.

**ch04 · Scene 4.1 (Dawn).** The orbit, driven by an animatable, never completing
a lap. On a very slow sinusoidal `attitude wobble` (0.5°), so it looks alive and
untended. No thrusters, no engine glow — it has no fuel.

**ch04 · Scene 4.2 (NEAR).** A 69-photograph beat: a subtle `flash` on the
spacecraft's camera aperture, 69 times, spaced across u 0.1–0.8, at very low
intensity (0.05). Then a gentle settle, then stillness. The last contact is
Pruthvik's `AudioPlayer`-free caption; you do not animate a death.

**ch05 · Scene 5.1 (Pioneer 10).** Constant drift, slow tumble, one dish glint
per ~40 s. At u = 0.9 the spacecraft's scale shrinks by 15 % over 2 s — a visual
lie that reads as distance, and it is the only "cinematic" liberty you take in the
whole chapter. Acceptable because nothing factual is annotated to its size.

**ch05 · Scene 5.2 (Kepler).** The aperture rotates into view; a single transit
`blink` — a small dark disc crossing the aperture once, at u = 0.7, with a 4 %
dip in an emissive ring around the aperture. That blink is the whole mission in
one frame. Then stillness.

**ch06.** No object choreography. Only the paper dissolve reversal and the dot
grid's slow fade-in.


## 1.17 — Lighting design, chapter by chapter

One table, follow it exactly, because inconsistent lighting is what makes a
multi-chapter 3D site look like five different projects.

| Chapter | Key light | Fill | Fog | Notes |
|---|---|---|---|---|
| ch00 | `PointLight` at sun, intensity 900, decay 0 | none | none | Additive stars; no shadows |
| ch01 Moon | `DirectionalLight` elev 8–12°, 3.2, `#fff6e8` | `AmbientLight` 0.06 | none | Hard shadows, tight frustum per site |
| ch02/03 Mars | `DirectionalLight` elev 26°, 2.4, `#ffd9b0` | `AmbientLight` 0.25 `#b4685a` | `FogExp2 #b4685a 0.0075` | Dust haze softens everything |
| ch04 Belt | `DirectionalLight`, 3.6, `#ffffff` | **none** | none | Lonely, harsh, long black |
| ch05 Anywhere | `DirectionalLight` far away, 2.0 | none | none | Raking light on dish and barrel |
| ch06 | `AmbientLight` 0.4 only | — | none | Flat, graphic, hands over to DOM |

Shadows: **only** in ch01 at `lowTier === 'high'`. Everywhere else, fake grounding
with a soft dark ellipse decal under each object, which costs one texture and
looks better at these distances than a real shadow map.


## 1.18 — Post-processing — `fx/Post.tsx`

Keep it to three effects and no more. Restraint reads as confidence.

1. **Bloom** — `Bloom({ intensity: 0.55, luminanceThreshold: 0.62, luminanceSmoothing: 0.3, mipmapBlur: true })`. Only the sun, stars, RTG glow and panel glints should bloom.
2. **Film grain** — a custom `Effect` with `uAmount` 0.035, animated by an
   animatable at 8 fps stepping (not per-frame random — per-frame random looks
   like video noise, stepped looks like film). Kill entirely in ch06.
3. **Vignette** — `Vignette({ eskil: false, offset: 0.32, darkness: 0.72 })`,
   reduced by half in ch06.

**Forbidden:** chromatic aberration (dated), scanlines (wrong register), depth of
field (too expensive on mobile and it fights the "everything is legible" rule),
motion blur (fakes a camera the visitor is not in).

`Post.tsx` must render `null` when `lowTier !== 'high'`. The governor may also set
a store flag `postEnabled` that you read — do not read `lowTier` directly, or you
will fight with the governor at runtime.


## 1.19 — `systems/perf.ts` — the governor

```ts
// Degrade in this order. Never degrade the models. Never touch geometry already built.
// 0 (full) → 1 drop post → 2 halve far starfield → 3 halve terrain segments (next mount)
//          → 4 drop dust field → 5 clamp dpr to 1.0 → 6 pixel-ratio 0.85 + disable shadows
```

- Sample frame time with a rolling 60-frame mean. If mean > 22 ms for 3
  consecutive samples, step down one level. If < 13 ms for 10 consecutive samples
  and level > 0, step up one (hysteresis prevents flapping).
- Write the level into the store as `tier: number` (0–6) and a derived
  `postEnabled`, `dustEnabled`, `starScale`, `terrainSegments` set of flags that
  chapters read. **Do not let chapters decide their own degradation.**
- Log every step change to console in dev only, with the frame-time reason.
- **Never** step down during the Ingenuity freeze or during the door transition —
  a resolution pop there would ruin the two best moments. Add a `holdGovernor`
  flag that Pruthvik's store exposes, or gate it on `progress` windows locally.
- On a `visibilitychange` to hidden, pause everything: stop the render loop
  (`frameloop` cannot change reactively — instead set a store flag the chapters
  read and early-return from `useFrame`).


## 1.20 — `systems/project.ts` — the label bridge

Pruthvik needs to place DOM labels over your objects. You expose exactly one
function; he calls it once per frame at most.

```ts
// src/three/systems/project.ts  (part 2 of 2 — screen projection)
import * as THREE from 'three'

// Registered by each chapter on mount: objectId → Object3D + local anchor offset.
const anchors = new Map<string, { obj: THREE.Object3D; offset: THREE.Vector3 }>()

export function registerAnchor(id: string, obj: THREE.Object3D, offset: [number,number,number]) {
  anchors.set(id, { obj, offset: new THREE.Vector3(...offset) })
  return () => anchors.delete(id)
}

const v = new THREE.Vector3()

/** Returns {x,y,visible} in CSS pixels, or null if the id is not mounted. */
export function projectToScreen(
  id: string, camera: THREE.Camera, size: { width: number; height: number }
): { x: number; y: number; visible: boolean } | null {
  const a = anchors.get(id)
  if (!a) return null
  v.copy(a.offset)
  a.obj.localToWorld(v)
  v.project(camera)
  return {
    x: (v.x * 0.5 + 0.5) * size.width,
    y: (-v.y * 0.5 + 0.5) * size.height,
    visible: v.z < 1 && v.z > -1,
  }
}
```

Rules: no allocation inside `projectToScreen` beyond the shared `v`; no DOM
reads; no `getBoundingClientRect` (Pruthvik caches size). If he needs more than
one anchor per object, `id` becomes `'eagle:top'` and `'eagle:footpad'` — the map
handles it.


## 1.21 — The freeze protocol and the fallback handoff

**Freeze (t = 0.63, Scene 3.3).** A single boolean in the chapter, plus an early
return at the top of every `useFrame`:

```tsx
useFrame((_, dt) => {
  if (frozenRef.current) return          // FIRST LINE, always
  ...
})
```
Set `frozenRef.current = true` when `progress >= 0.63` and **never unsets it while
the chapter is mounted**. Scrolling back up within the same chapter keeps it
frozen until the chapter unmounts — which is correct, because the machine does not
restart.

**Fallback handoff.** When `reducedMotion || lowTier === 'none' || !webglOk`,
`CanvasRoot` returns `null` and Pruthvik's `FallbackStory` renders. Your job:
1. Detect once at boot in `systems/capability.ts` and write to the store:
   `webglOk = !!canvas.getContext('webgl2')`, plus a `lowTier` classification
   (`'none' | 'low' | 'high'`) from `deviceMemory`, `hardwareConcurrency` and a
   2-second frame probe.
2. Never partially render. Half a 3D experience is worse than none.
3. Ensure nothing in `src/three/**` runs when the canvas is absent — no module-level
   side effects, no top-level `new THREE.Scene()`.


## 1.22 — Your QA sweep (run before you tell anyone you are done)

**The scrubs.** For each of these, scroll 0→1 at three speeds (slow, medium, flick)
and 1→0 once:
1. No geometry ever intersects the camera near plane.
2. No chapter boundary shows both chapters at once.
3. FPS stays above target; log the minimum per chapter.
4. The door reads at all three speeds.
5. The Ingenuity freeze is unmistakable at all three speeds.

**The memory loop.** Scroll the whole page three times, then check:
```js
const i = gl.info
console.log(i.memory.geometries, i.memory.textures, i.render.calls)
```
Geometries and textures must return to the values measured after the first full
pass. If they climb, you have an undisposed resource — find it with the registry.

**The silhouette test.** Screenshot each model alone on black at phone width and
show it to someone who has not seen the site. They should name the LM, the LRV,
and Ingenuity without prompting. If not, the proportions are wrong, not the
materials.

**The throttle test.** DevTools → Performance → CPU 4× slowdown → hold each chapter
for 30 seconds → record mean fps in `docs/ACCEPTANCE.md`.

**The reduced-motion test.** Set `prefers-reduced-motion: reduce` in DevTools
Rendering, reload: the canvas must not mount, and the fallback must be complete.


## 1.23 — Your milestones, with definitions of done

| M | Deliverable | Definition of done |
|---|---|---|
| **M1** | `CanvasRoot` + `CameraRig` + `ChapterSwitch` with a placeholder `BoxGeometry` per chapter | Scrub 0→1 smoothly through all seven chapters; build passes; no console errors; `progress` is the only driver |
| **M2** | `ch00-descent`: StarField, Sun, planets, `PaperPlane` door | 60 fps desktop; the door reads as a doorway at three speeds; stars resolve rather than pop |
| **M3** | `ch01-moon`: MoonTerrain + LMDescent, ALSEPStation, RTG, LRRR, Surveyor, LRV at true relative scale | A stranger names the LM and the LRV from silhouette; RTG has eight fins; `renderer.info` flat over a 3× loop |
| **M4** | `ch02` + `ch03`: Mars terrain, Viking, Pathfinder + Sojourner, MER pair, InSight, Ingenuity, dust field | Dust never stutters; the Ingenuity freeze holds absolutely still at t = 0.63; InSight's arm reaches the ground |
| **M5** | `ch04` + `ch05` + `ch06`: belt, Eros, Dawn loop, Anywhere drift, inventory dissolve | No terrain anywhere in 04/05; Dawn's loop never completes; ch06 hands over cleanly to the DOM |
| **M6** | Governor, dispose registry, mobile pass, capability detection, fallback handoff | ≥ 30 fps on a mid-range Android at tier ≤ 3; memory flat; reduced-motion never mounts the canvas |

**Order of work inside each milestone:** geometry → materials → lighting → anime
choreography → perf. Never tune perf before the content exists; you will optimise
the wrong thing.


## 1.24 — Things that will go wrong, and what to do

| Symptom | Cause | Fix |
|---|---|---|
| Camera drifts behind the text | You lerped `progress` in the rig | Remove the lerp; trust Lenis |
| Movement feels sticky then fast | Using `getPoint` instead of `getPointAt` | Switch to arc-length sampling |
| Chapter boundary shows both scenes | Two chapters mounted | Fix `ChapterSwitch` to render exactly one, with `key` |
| Stars pop in at the start | Points rendered before first frame tick | Render the field with `frustumCulled={false}` and a 1-frame fade-in animatable |
| Model looks like a toy | Wrong `WORLD_SCALE` applied twice | Scale only at chapter level; models stay in metres |
| Everything looks gray on Mars | Fog density too high | Lower to ≤ 0.008 and raise key light colour temperature |
| Mobile is unusable | 280k points + shadows + post | Governor tier 3+; shadows off below `high` |
| Door looks like a fade | `smoothstep` window too wide | Narrow the window by 20 %, sharpen edges |
| Freeze is missed | Rotors still animating, or camera drift | Early-return in every `useFrame`; kill animatables |
| Memory climbs over a session | Textures created per mount | Register every generated texture; prefer drei cache |
| Labels sit in the wrong place | `labelAnchor` in wrong space | Anchors are **local metres**, converted with `localToWorld` |


## 1.25 — What you never do

1. Never edit `src/contracts/**`, `src/data/**`, `src/store.ts`, `src/ui/**`,
   `src/App.tsx`, `index.html` or `public/**`.
2. Never add 3D text, `Html` from drei, or a second canvas.
3. Never add a scroll listener, wheel handler, or pointer scroll behaviour.
4. Never add an external 3D model, HDRI, or texture from a CDN.
5. Never invent a detail that implies a fact: no flags, no footprints, no debris,
   no weathering, no "damage" the sources do not document.
6. Never animate a crash, an explosion, a collapse, or a failure as spectacle.
7. Never let a chapter own its own degradation logic; the governor decides.
8. Never optimise before the content exists.
9. Never merge a chapter that pushes `render.calls` above 120.
10. Never ship without the memory loop and the silhouette test passing.
# ══════════════════════════════════════════════════════════════════════════════
# PART 2 — PRUTHVIK PART
# "THE ARCHIVE LAYER" — contracts, data, DOM, widgets, maps, anime.js UI
# Paste this after PART 0. Owns src/contracts/**, src/data/**, src/store.ts,
# src/ui/**, src/App.tsx, src/main.tsx, public/**, index.html.
# ══════════════════════════════════════════════════════════════════════════════


## 2.0 — Your brief

You are the reason the site is *true*, and the reason it is *readable*. You own the
data, the copy placement, the interactions that teach, the maps with real
coordinates, the inventory table, the fallback experience, the accessibility work,
and the entire DOM shell around Nivish's canvas.

You also ship the contracts **first**, so Nivish is never blocked. That is your
first two hours and nothing else happens until it is done and pushed.

You own exactly this:

```
src/contracts/types.ts
src/contracts/beats.ts
src/contracts/tokens.css
src/data/objects.ts
src/data/scenes.ts
src/data/sources.ts
src/data/widgets.ts
src/store.ts
src/main.tsx
src/App.tsx
src/scroll/useLenis.ts
src/ui/Overlay.tsx
src/ui/SceneText.tsx
src/ui/QuoteBlock.tsx
src/ui/ProgressRail.tsx
src/ui/FactDrawer.tsx
src/ui/ObjectLabel.tsx
src/ui/LunarMap.tsx
src/ui/MarsMap.tsx
src/ui/InventoryTable.tsx
src/ui/StillWorkingToggle.tsx
src/ui/Credits.tsx
src/ui/Footer.tsx
src/ui/ReadingModeToggle.tsx
src/ui/FallbackStory.tsx
src/ui/widgets/Odometer.tsx
src/ui/widgets/OdometerWall.tsx
src/ui/widgets/FlightCounter.tsx
src/ui/widgets/RtgDiagram.tsx
src/ui/widgets/SignalDelay.tsx
src/ui/widgets/TransitDemo.tsx
src/ui/widgets/WeatherLog.tsx
src/ui/widgets/AudioPlayer.tsx
src/ui/widgets/PlaqueViewer.tsx
src/ui/widgets/MoonquakeWaveform.tsx
src/ui/widgets/BounceCounter.tsx
src/ui/widgets/DescentLadder.tsx
src/ui/widgets/VitalSigns.tsx
src/ui/widgets/DateSlider.tsx
src/ui/widgets/RangeComparison.tsx
src/ui/widgets/Readout.tsx
src/ui/motion/useScrub.ts
src/ui/motion/useReveal.ts
src/ui/motion/useCountUp.ts
public/fonts/**
public/img/**
public/audio/**
docs/ACCEPTANCE.md
index.html
```

Requests to Nivish go at the bottom of `docs/ACCEPTANCE.md` in this exact form:

```
REQUEST (pru) → (niv): need <thing>. Reason: <why>. Blocking: <yes/no>. Needed by: <M#>.
```


## 2.1 — Milestone 0, in order, before anything else

Do these five things, in this order, and push. Nothing else.

1. Scaffold: `npm create vite@latest . -- --template react-ts`, strict mode on,
   `noUncheckedIndexedAccess: true`, path alias `@/*` → `src/*`.
2. Write `src/contracts/types.ts`, `beats.ts`, `tokens.css` **exactly** as §2.2,
   §2.3 and §2.6 specify. Do not "improve" them.
3. Write `src/store.ts` exactly as §2.4 specifies.
4. Write `src/data/objects.ts` with all fifteen records from PART 0 §0.17, strictly
   typed. Where NASA does not state a value, use `undefined` or `'UNKNOWN'` — never
   a guess. Then print a table of every `UNKNOWN` field and paste it into
   `docs/ACCEPTANCE.md` so both of you can review it.
5. Build the skeleton shell: a `100vh`-per-beat placeholder structure, the eight-stop
   rail, and a corner label showing `activeBeatId` and `progress` to three decimals.

Then message Nivish: **"contracts frozen."** He is unblocked and must never wait on
you again. After this moment, `src/contracts/**` changes only with a
`BEATS_VERSION` bump and an announcement.


## 2.2 — `src/contracts/types.ts`

```ts
// ─────────────────────────────────────────────────────────────────────────────
// The single source of shape for the entire project. Frozen after Milestone 0.
// ─────────────────────────────────────────────────────────────────────────────

export type Body = 'Moon' | 'Mars' | 'Ceres' | 'Vesta' | 'Eros' | 'Interstellar' | 'Heliocentric'

export type ZoomStop =
  | 'milky-way' | 'sun' | 'solar-system' | 'inner-planets'
  | 'earth' | 'moon' | 'mars' | 'anywhere'

export type ChapterId =
  | 'ch00-descent' | 'ch01-moon' | 'ch02-mars-early'
  | 'ch03-mars-long' | 'ch04-belt' | 'ch05-anywhere' | 'ch06-inventory'

export type ObjectStatus =
  | 'on-surface' | 'in-orbit' | 'in-space' | 'impacted' | 'unknown'

export type Owner = 'niv' | 'pru' | 'both'

/** One catalogue record. Every number rendered on the site comes from here. */
export interface MissionObject {
  id: string                      // '1969-059C' | 'viking-1'
  name: string                    // full catalogue name
  shortName: string               // 'Eagle'
  alternateNames?: string[]
  body: Body
  site: string                    // 'Mare Tranquilitatis'
  lat?: number                    // decimal degrees, negative = S/W
  lon?: number
  arrived?: string                // ISO 8601, or 'UNKNOWN'
  wentQuiet: string               // ISO date, '2010' (year only), or 'UNKNOWN'
  quietReason: string             // one sentence, from the NASA source
  status: ObjectStatus
  subElements?: { name: string; state: string }[]
  massKg?: number
  sceneId: string                 // '1.1'
  hardFacts: string[]             // verbatim numbers, one per line
  quote?: { text: string; attribution: string }
  audioCredit?: string
  imageCredit?: string
  sourceUrls: string[]
}

/** One scroll beat. Owned by this file; never changed without a version bump. */
export interface Beat {
  id: string                      // 'moon.1.1'
  sceneId: string                 // '1.1'
  label: string                   // rail label, short
  fullLabel: string               // 'Eagle — Apollo 11 Lunar Module'
  stop: ZoomStop
  t0: number                      // 0..1 inclusive
  t1: number                      // 0..1 exclusive
  chapter: ChapterId
  owner: Owner
  copy: string[]                  // paragraphs, in scroll order
  quoteId?: string                // key into scenes.ts
  widgets: WidgetId[]
}

export type WidgetId =
  | 'fact-drawer' | 'odometer' | 'odometer-wall' | 'flight-counter'
  | 'rtg-diagram' | 'signal-delay' | 'transit-demo' | 'weather-log'
  | 'audio-player' | 'plaque-viewer' | 'moonquake' | 'bounce-counter'
  | 'descent-ladder' | 'vital-signs' | 'date-slider' | 'range-compare'
  | 'still-working-toggle' | 'object-label' | 'lunar-map' | 'mars-map'

export interface WidgetSpec {
  id: WidgetId
  sceneId: string
  placement: 'left' | 'right' | 'bottom' | 'inline'
  title: string                   // accessible name
  caption?: string
}

export interface SceneQuote {
  id: string
  text: string                    // verbatim
  attribution: string             // speaker — role / source, one line
  sourceUrl?: string
}

export interface SourceEntry {
  url: string
  label: string
  usedFor: string[]               // scene ids
  fetched: string                 // '2026-11-15'
}
```

**Why these types and not more.** Every optional field is optional because NASA
does not state it, not because it is inconvenient. `lat`/`lon` are optional because
Pathfinder's supplied source does not publish coordinates. `arrived` is optional for
the same reason. If you find yourself adding a required field, check whether the
source supports it for all fifteen objects — it almost certainly does not.

**Banned types.** No `any`. No `object`. No `Record<string, unknown>` for domain
data. If TypeScript complains, the data model is wrong, not the compiler.


## 2.3 — `src/contracts/beats.ts`

```ts
// ⚠️  BEATS_VERSION must be bumped on any t0/t1 change, and the change announced.
export const BEATS_VERSION = 1

export const TOTAL_SCREENS = 38     // desktop document height = 38 × 100vh

export const STOPS: { id: ZoomStop; label: string; t0: number; t1: number }[] = [
  { id: 'milky-way',     label: 'Milky Way',      t0: 0.000, t1: 0.045 },
  { id: 'sun',           label: 'Sun',            t0: 0.045, t1: 0.075 },
  { id: 'solar-system',  label: 'Solar system',   t0: 0.075, t1: 0.115 },
  { id: 'inner-planets', label: 'Inner planets',  t0: 0.115, t1: 0.145 },
  { id: 'earth',         label: 'Earth',          t0: 0.145, t1: 0.175 },
  { id: 'moon',          label: 'Moon',           t0: 0.175, t1: 0.400 },
  { id: 'mars',          label: 'Mars',           t0: 0.400, t1: 0.660 },
  { id: 'anywhere',      label: 'Anywhere',       t0: 0.660, t1: 1.000 },
]

export const BEATS = [
  { id:'open.0.1',     sceneId:'0.1', t0:0.000, t1:0.145, chapter:'ch00-descent',    stop:'milky-way',     owner:'both' },
  { id:'open.0.2',     sceneId:'0.2', t0:0.145, t1:0.175, chapter:'ch00-descent',    stop:'inner-planets', owner:'both' },
  { id:'moon.1.1',     sceneId:'1.1', t0:0.175, t1:0.225, chapter:'ch01-moon',       stop:'moon',          owner:'both' },
  { id:'moon.1.2',     sceneId:'1.2', t0:0.225, t1:0.275, chapter:'ch01-moon',       stop:'moon',          owner:'both' },
  { id:'moon.1.3',     sceneId:'1.3', t0:0.275, t1:0.335, chapter:'ch01-moon',       stop:'moon',          owner:'both' },
  { id:'moon.1.4',     sceneId:'1.4', t0:0.335, t1:0.400, chapter:'ch01-moon',       stop:'moon',          owner:'both' },
  { id:'mars.2.1',     sceneId:'2.1', t0:0.400, t1:0.445, chapter:'ch02-mars-early', stop:'mars',          owner:'both' },
  { id:'mars.2.2',     sceneId:'2.2', t0:0.445, t1:0.490, chapter:'ch02-mars-early', stop:'mars',          owner:'both' },
  { id:'mars.3.1',     sceneId:'3.1', t0:0.490, t1:0.535, chapter:'ch03-mars-long',  stop:'mars',          owner:'both' },
  { id:'mars.3.2',     sceneId:'3.2', t0:0.535, t1:0.585, chapter:'ch03-mars-long',  stop:'mars',          owner:'both' },
  { id:'mars.3.3',     sceneId:'3.3', t0:0.585, t1:0.660, chapter:'ch03-mars-long',  stop:'mars',          owner:'both' },
  { id:'any.4.1',      sceneId:'4.1', t0:0.660, t1:0.710, chapter:'ch04-belt',       stop:'anywhere',      owner:'both' },
  { id:'any.4.2',      sceneId:'4.2', t0:0.710, t1:0.760, chapter:'ch04-belt',       stop:'anywhere',      owner:'both' },
  { id:'any.5.1',      sceneId:'5.1', t0:0.760, t1:0.810, chapter:'ch05-anywhere',   stop:'anywhere',      owner:'both' },
  { id:'any.5.2',      sceneId:'5.2', t0:0.810, t1:0.860, chapter:'ch05-anywhere',   stop:'anywhere',      owner:'both' },
  { id:'inv.6.1',      sceneId:'6.1', t0:0.860, t1:0.940, chapter:'ch06-inventory',  stop:'anywhere',      owner:'both' },
  { id:'inv.6.2',      sceneId:'6.2', t0:0.940, t1:1.000, chapter:'ch06-inventory',  stop:'anywhere',      owner:'both' },
] as const

/** The only place in the app that maps progress → beat. Pure, no side effects. */
export function beatAt(progress: number) {
  const p = Math.min(1, Math.max(0, progress))
  for (const b of BEATS) if (p >= b.t0 && p < b.t1) return b
  return BEATS[BEATS.length - 1]!
}

export function stopAt(progress: number) {
  const p = Math.min(1, Math.max(0, progress))
  for (const s of STOPS) if (p >= s.t0 && p < s.t1) return s
  return STOPS[STOPS.length - 1]!
}

/** Local 0..1 inside a beat — the value every scene animation scrubs on. */
export function localU(progress: number, t0: number, t1: number) {
  return Math.min(1, Math.max(0, (progress - t0) / (t1 - t0)))
}
```

**Key structural fact:** `t0`/`t1` in this file and the waypoint `t` values in
Nivish's `waypoints.ts` are the *same numbers*. If you change one, tell him in the
same message and bump `BEATS_VERSION`. This single coupling is the entire "two
people, one camera" contract.

**Document height.** `TOTAL_SCREENS = 38` gives roughly 3.5 viewport-heights per
scene cluster on a laptop. Shorter feels rushed; longer feels broken because the
visitor scrolls and nothing changes. Tune it once at M2 and then leave it alone.


## 2.4 — `src/store.ts`

```ts
import { create } from 'zustand'
import type { ChapterId, ZoomStop } from './contracts/types'
import { beatAt, stopAt } from './contracts/beats'

export type Tier = 'none' | 'low' | 'high'
export type PerfLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6

interface AppState {
  // ── written by the scroll system (the only writer of progress)
  progress: number
  activeBeatId: string
  activeSceneId: string
  activeStop: ZoomStop
  activeChapter: ChapterId

  // ── capability, written once at boot
  webglOk: boolean
  tier: Tier
  reducedMotion: boolean
  readingMode: boolean

  // ── perf governor, written by Nivish's systems/perf.ts
  perfLevel: PerfLevel
  postEnabled: boolean
  dustEnabled: boolean
  starScale: number
  terrainSegments: number

  // ── UI state, written by the DOM
  mapOpen: boolean
  creditsOpen: boolean
  filterWorkingOnly: boolean
  labelsOn: boolean
  audioUnlocked: boolean

  setProgress: (p: number) => void
  setPerfLevel: (l: PerfLevel) => void
  setCapability: (c: { webglOk: boolean; tier: Tier; reducedMotion: boolean }) => void
  toggleReadingMode: () => void
  openMap: () => void
  closeMap: () => void
  openCredits: () => void
  closeCredits: () => void
  setFilterWorkingOnly: (v: boolean) => void
  setLabelsOn: (v: boolean) => void
  unlockAudio: () => void
}

const start = { progress: 0, ...(() => {
  const b = beatAt(0), s = stopAt(0)
  return { activeBeatId: b.id, activeSceneId: b.sceneId, activeStop: s.id, activeChapter: b.chapter }
})() }

export const useStore = create<AppState>((set, get) => ({
  ...start,
  webglOk: true,
  tier: 'high',
  reducedMotion: false,
  readingMode: false,
  perfLevel: 0,
  postEnabled: true,
  dustEnabled: true,
  starScale: 1,
  terrainSegments: 256,
  mapOpen: false,
  creditsOpen: false,
  filterWorkingOnly: false,
  labelsOn: true,
  audioUnlocked: false,

  setProgress: (p) => {
    const q = Math.min(1, Math.max(0, p))
    const prev = get()
    const b = beatAt(q), s = stopAt(q)
    // Only allocate a new state object when a derived value actually changes.
    if (prev.activeBeatId !== b.id || prev.activeChapter !== b.chapter) {
      set({ progress: q, activeBeatId: b.id, activeSceneId: b.sceneId,
            activeStop: s.id, activeChapter: b.chapter })
    } else {
      set({ progress: q })
    }
  },

  setPerfLevel: (l) => set({
    perfLevel: l,
    postEnabled: l < 1,
    starScale: l < 2 ? 1 : 0.5,
    terrainSegments: l < 3 ? 256 : 128,
    dustEnabled: l < 4,
  }),

  setCapability: (c) => set({ ...c }),
  toggleReadingMode: () => set(s => ({ readingMode: !s.readingMode })),
  openMap: () => set({ mapOpen: true }),
  closeMap: () => set({ mapOpen: false }),
  openCredits: () => set({ creditsOpen: true }),
  closeCredits: () => set({ creditsOpen: false }),
  setFilterWorkingOnly: (v) => set({ filterWorkingOnly: v }),
  setLabelsOn: (v) => set({ labelsOn: v }),
  unlockAudio: () => set({ audioUnlocked: true }),
}))
```

**Rules.**
- `setProgress` is the **only** mutation called from a scroll frame. Keep it cheap:
  one `set` per frame at most, and avoid allocating objects when nothing derived
  changed (as above).
- Nivish writes `perfLevel`; you never set it. He reads `postEnabled`,
  `dustEnabled`, `starScale`, `terrainSegments`; you never set those directly (they
  are derived in `setPerfLevel`, which is his call).
- The `tier` value `'none'` means "render the fallback, never mount the canvas".


## 2.5 — `src/scroll/useLenis.ts`

One scroll implementation. Nothing else in the app may listen to scroll.

```ts
import Lenis from 'lenis'
import { useEffect } from 'react'
import { useStore } from '../store'

export function useLenis(enabled: boolean) {
  const setProgress = useStore(s => s.setProgress)

  useEffect(() => {
    if (!enabled) return
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      syncTouch: false,          // native touch scroll feels better on iOS
      autoRaf: false,            // we drive it ourselves with our own rAF
    })

    let raf = 0
    let running = true
    const loop = (time: number) => {
      if (!running) return
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    // Single source of progress.
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? lenis.scroll / max : 0)
    }
    lenis.on('scroll', onScroll)
    onScroll()

    const onVis = () => {
      running = document.visibilityState === 'visible'
      if (running) raf = requestAnimationFrame(loop)
      else { cancelAnimationFrame(raf); lenis.stop() }
    }
    document.addEventListener('visibilitychange', onVis)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      document.removeEventListener('visibilitychange', onVis)
      lenis.off('scroll', onScroll)
      lenis.destroy()
    }
  }, [enabled, setProgress])
}
```

**Why `autoRaf: false`.** One rAF loop, ours. Everything else (governor sampling,
label projection, anime scrubbing) piggybacks on the same tick or on R3F's
`useFrame`. Two independent rAF loops will drift and cause a visible 1-frame lag
between the 3D camera and the DOM text.

**Interactions that must not scroll-jack.** Anchors, the rail, the table of
contents, and "back to top" all call `lenis.scrollTo(target, { offset, duration })`.
Never `window.scrollTo` (it fights Lenis). Native scrollbar dragging must always
work — do not set `overflow: hidden` on `body` for any reason except while a
fullscreen overlay is open, and during a `modal` also call `lenis.stop()`.

**Mobile.** `syncTouch: false` — iOS native momentum feels better than any
emulation, and the progress calculation still works because we listen to Lenis's
own scroll event, which is fired from the touch fallback too. Verify on a real
iPhone at M6; if progress lags, switch to `syncTouch: true` with
`touchMultiplier: 2`.

**Reduced motion.** If `prefers-reduced-motion: reduce`, do not mount Lenis at
all: pass `enabled = false` and let the browser scroll natively. The site still
works, because progress is read from `window.scrollY` in a passive listener in that
case (add a tiny fallback branch in `useLenis`).


## 2.6 — `src/contracts/tokens.css`

```css
:root{
  /* ── palette, meaning-bearing; see the usage rules below */
  --void:#05070d;          /* space, the present */
  --void-2:#0a0f18;
  --paper:#f4f7fb;         /* the archive; any moment a fact is verified */
  --paper-2:#e8eef7;
  --ink:#0d1420;
  --ink-soft:#2b3444;
  --mute:#6b7689;
  --star:#eaf0fa;
  --beam:#7fb3ff;          /* signals, coordinates, live data */
  --beam-dim:#4a6a9e;
  --amber:#a8763a;         /* a NASA quotation, or a human failure */
  --amber-soft:#c99a5c;
  --regolith:#9a9a96;      /* the Moon */
  --oxide:#a8563a;         /* Mars */
  --line:#1c2330;
  --line-paper:#dfe3ea;

  /* ── type scale, 1.25 modular, clamped for phone */
  --step--1: clamp(0.78rem, 0.76rem + 0.1vw, 0.84rem);
  --step-0:  clamp(0.95rem, 0.92rem + 0.15vw, 1.06rem);
  --step-1:  clamp(1.10rem, 1.05rem + 0.25vw, 1.28rem);
  --step-2:  clamp(1.35rem, 1.25rem + 0.5vw, 1.72rem);
  --step-3:  clamp(1.75rem, 1.55rem + 1.0vw, 2.35rem);
  --step-4:  clamp(2.35rem, 1.9rem + 2.2vw, 3.6rem);
  --step-5:  clamp(3.0rem, 2.2rem + 4.0vw, 5.4rem);

  /* ── families: two roles, one voice each */
  --font-display: 'Archivo', 'Helvetica Neue', Arial, sans-serif;
  --font-body: 'Source Serif 4', Georgia, 'Times New Roman', serif;
  --font-mono: 'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace;

  /* ── spacing, 4px base */
  --s-1:4px; --s-2:8px; --s-3:12px; --s-4:16px; --s-5:24px;
  --s-6:32px; --s-7:48px; --s-8:64px; --s-9:96px; --s-10:128px;

  /* ── motion */
  --ease-out:cubic-bezier(.16,1,.3,1);
  --ease-in-out:cubic-bezier(.65,0,.35,1);
  --dur-fast:180ms; --dur:420ms; --dur-slow:900ms;

  /* ── layout */
  --rail-h:64px;
  --measure: 66ch;
  --gutter: clamp(20px, 4vw, 72px);
}
```

**Colour logic — this carries meaning. Do not use arbitrarily.**
- **Void** = space and the present. Any full-bleed background in the descent.
- **Paper** = the archive. **Any time a fact is being verified, the palette flips
  to paper** — the `FactDrawer`, the inventory table, the sources, the credits.
- **Beam** = signals, coordinates, live numbers, interactive affordances.
- **Amber** = a NASA quotation, or a moment of human failure (the faulty command,
  the vidicon tube, the last signal). Never decoration.
- **Regolith** = anything on the Moon. **Oxide** = anything on Mars. Never mix in
  one frame unless the scene explicitly compares the two.

**Typography rules.**
- Display and UI: geometric grotesque, uppercase labels at `letter-spacing: .18em`,
  tight tracking on headlines (`-0.015em`).
- Narrative: serif, real italics for quotations. Body 17–19 px, `line-height: 1.65`,
  measure 62–70 characters, `text-wrap: pretty` where supported.
- Numbers: `font-variant-numeric: tabular-nums`. Dates and coordinates **always**
  monospaced, always with a non-breaking thin space before the unit.
- Never centre a paragraph of narrative text. Centre only single-line statements
  and the closing lines.

**Fonts.** Self-host two weights + italic of the body serif, and two weights of the
display face. Subset to Latin. `font-display: swap`. Preload only the regular body
weight. Total font payload ≤ 120 KB. **No Google Fonts, no CDN.**


## 2.7 — `src/data/objects.ts` — the fifteen records

Encode PART 0 §0.17 **verbatim**. Structural requirements:

```ts
import type { MissionObject } from '../contracts/types'

export const OBJECTS: MissionObject[] = [
  {
    id: 'surveyor-3',
    name: 'Surveyor 3',
    shortName: 'Surveyor 3',
    body: 'Moon',
    site: 'Oceanus Procellarum',
    lat: -3, lon: -23.41,
    arrived: '1967-04-20T00:04:17Z',
    wentQuiet: '1967-05-04',
    quietReason: 'Contact lost two days after the lunar night began.',
    status: 'on-surface',
    massKg: 997.9,
    sceneId: '1.2',
    hardFacts: [
      'Launched 17 Apr 1967 · 07:05:01 UT on an Atlas Centaur (AC-12) from LC-36B',
      'Mass 2,200 lb (997.9 kg)',
      'Two instruments: a TV camera and a surface sampler',
      'Sampler reached 1.5 m and dug 18 cm deep',
      'Descent radar confused by reflective rocks; engine cut-off late at 4.3 m',
      'Bounced twice: first to 10 m, then to 3 m; settled 00:04:17 UT 20 Apr 1967',
      'Transmitted 6,326 TV images',
      '4 trenches · 4 bearing tests · 13 impact tests',
      'Soil like wet sand, ~10 psi (98 kPa) bearing strength',
      'Last contact 4 May 1967',
      'Apollo 12 landed ~180 m away; ~10 kg of parts returned on the second EVA',
    ],
    sourceUrls: [
      'https://science.nasa.gov/mission/surveyor-3/',
      'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-099C',
    ],
  },
  // … thirteen more, exactly as PART 0 §0.17 states …
]

export const BY_ID = Object.fromEntries(OBJECTS.map(o => [o.id, o]))
export const WORKING_ONLY = OBJECTS.filter(o => o.status !== 'in-space' && o.id.includes('lrr'))
```

**Hard rules for this file.**
1. Never round a number the source does not round. `0.67416` stays `0.67416`.
2. Never merge two facts into one string when they have different sources.
3. Never add a fact you cannot point at in `sourceUrls`.
4. Keep `quietReason` to **one sentence**, in the source's register.
5. `wentQuiet` is a string, not a Date — because four of them are `UNKNOWN` or
   year-only. Do not coerce.
6. Every object's `sceneId` must match a beat in `beats.ts`. Write a test that
   asserts this (a 20-line script is fine; see §2.22).
7. Where the source does not give coordinates (Pathfinder), omit `lat`/`lon` and
   the UI renders the site name only. **Do not invent a coordinate.**


## 2.8 — `src/data/scenes.ts` — the seventeen scenes' copy

```ts
import type { Beat, SceneQuote, WidgetSpec } from '../contracts/types'

export const QUOTES: Record<string, SceneQuote> = {
  'q.eagle': {
    id: 'q.eagle',
    text: 'The fate of the LM is not known, but it is assumed that it crashed into the lunar surface sometime within the following 1 to 4 months.',
    attribution: 'NSSDCA spacecraft record 1969-059C',
    sourceUrl: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C',
  },
  // … every quote in PART 0, verbatim, with its attribution …
}

export const WIDGETS: WidgetSpec[] = [
  { id:'fact-drawer',    sceneId:'0.2', placement:'left',  title:'NSSDCA catalogue record' },
  { id:'odometer',       sceneId:'1.3', placement:'right', title:'Lunar Roving Vehicle distance' },
  // … etc …
]
```

**Rules.**
1. Copy strings are **copied letter-for-letter** from PART 0. Do not re-punctuate.
2. Quotation text is copied **letter-for-letter**, including any odd spacing in the
   original — then rendered with `text-wrap: pretty` and normalised spaces in CSS
   only if visually necessary (never in the data).
3. Copy is an **array of paragraphs**, one string per scroll screen. Never one long
   blob; the overlay relies on the array to sequence screens.
4. Every scene's copy array length tells you how many screens it occupies; the
   overlay distributes them evenly across the beat window (see §2.10).
5. No copy string over 45 words. If PART 0 has a longer paragraph, split it at a
   sentence boundary **without changing a word**.
6. Each scene gets `aria-label` text of one short line for screen readers, e.g.
   `'Scene 1.1, Eagle, the Apollo 11 lunar module descent stage.'`


## 2.9 — `src/App.tsx` — the shell

```tsx
export default function App() {
  const { reducedMotion, tier, readingMode, setCapability, setProgress } = useStore()
  const fallback = readingMode || reducedMotion || tier === 'none' || !useStore(s => s.webglOk)

  useBootCapability()               // writes webglOk / tier / reducedMotion once
  useLenis(!fallback)

  return (
    <>
      {fallback ? <FallbackStory /> : <CanvasRoot />}
      <Overlay />                     {/* always mounted; reads activeBeatId */}
      <ProgressRail />
      <ObjectLabels />                {/* DOM labels over the canvas */}
      <ReadingModeToggle />
      <Footer />
      {fallback ? null : <div className="scrollTrack" aria-hidden />}  {/* 38 screens tall */}
    </>
  )
}
```

**Layout contract (this is the piece that makes 3D and DOM coexist):**
- The document itself is the scroller. `body` has `--page-height: 38 * 100vh` worth
  of content in a single `<div class="scrollTrack" aria-hidden />` — **not** a fixed
  overlay. Lenis scrolls the window, so the native scrollbar is real and the
  visitor can drag it.
- The canvas is `position: fixed; inset: 0; z-index: 0`.
- All narrative DOM is `position: fixed` and positioned **from `progress`**, not
  from document flow. This means the text is always in the right place regardless
  of scroll speed, and scrubbing backwards is exact.
- Because the narrative DOM is fixed, the scroll track is the only thing in flow —
  so `aria-hidden` on it is correct, and the accessible content is the Overlay's
  DOM, which is always in the tree in reading order.
- Above `1024px`: copy occupies the **left third** (`max-width: 34ch`), vertically
  centred. Below `1024px`: copy occupies the **bottom 42%**, with a scrim.
- A permanent 12 % bottom scrim on mobile and a 30 % left scrim on desktop keep the
  copy at ≥ 7:1 contrast over the brightest possible 3D frame. Do not rely on the
  3D being dark.


## 2.10 — `src/ui/Overlay.tsx` — the narrative layer

```tsx
export default function Overlay() {
  const progress = useStore(s => s.progress)
  const beat = beatAt(progress)
  const u = localU(progress, beat.t0, beat.t1)
  const screens = SCENES[beat.sceneId].copy
  const per = 1 / screens.length
  const idx = Math.min(screens.length - 1, Math.floor(u / per))
  const localUInScreen = (u - idx * per) / per

  return (
    <section className="overlay" role="region" aria-label="Narrative">
      <ol className="sceneIndex" aria-hidden>{/* 17 dots, current one active */}</ol>
      <SceneText
        key={`${beat.id}:${idx}`}
        beat={beat}
        text={screens[idx] ?? ''}
        u={localUInScreen}
        first={idx === 0}
        last={idx === screens.length - 1}
      />
      <ScreenReaderSummary beat={beat} />   {/* full beat copy, visually hidden */}
    </section>
  )
}
```

**Rules that make or break this component.**
1. **No `IntersectionObserver`.** Position everything from `progress`. The scene
   text is chosen by arithmetic, so scrubbing backwards is identical to forwards.
2. Changing screens is a **key change** on `SceneText`, which re-mounts and plays a
   single reveal (§2.11). Do not cross-fade two copies of the text at once; that
   produces illegible overlap at flick speed.
3. Every beat renders an `h2` (the scene title) **once**, not per screen. It can be
   sticky at the top of the copy column, or fade out after the first screen — but
   it must exist exactly once in the DOM per beat for correct heading order.
4. The `ScreenReaderSummary` contains the *entire* beat copy in one visually hidden
   paragraph, so a screen-reader user is never dependent on scroll position to hear
   the story. This is the single most important accessibility decision on the site.
5. The overlay is `pointer-events: none` except on widgets, quotes and links.
   Otherwise it blocks the visitor's ability to drag the scrollbar.
6. Respect the 45-word cap: if the string is longer, the CSS must not shrink the
   font below `--step-0`. Cut in the data instead.

**Vertical rhythm inside a scene.** First screen: kicker + `h2` + paragraph.
Middle screens: paragraph only, `fade-in` on entry. Final screen: paragraph +
quote (if the beat has one) + the widget, if the widget is `inline`. Keep the
quote to its own screen in every scene — a quotation deserves a clean frame.


## 2.11 — anime.js in the DOM: three hooks, used everywhere

anime.js v4 is the DOM motion engine. Three hooks, no ad-hoc animation code.

```ts
// src/ui/motion/useReveal.ts — a one-shot reveal, used when a screen mounts
import { animate, stagger } from 'animejs'
export function useReveal(ref: RefObject<HTMLElement>, deps: unknown[] = []) {
  const reduced = useStore(s => s.reducedMotion)
  useEffect(() => {
    if (!ref.current) return
    if (reduced) { ref.current.style.opacity = '1'; return }
    const targets = ref.current.querySelectorAll<HTMLElement>('[data-reveal]')
    animate(targets.length ? targets : ref.current, {
      opacity: [0, 1],
      translateY: [14, 0],
      filter: ['blur(6px)', 'blur(0px)'],
      duration: 720,
      delay: targets.length ? stagger(90) : 0,
      ease: 'out(3)',
    })
  }, deps)
}
```

```ts
// src/ui/motion/useScrub.ts — scrubbed from progress, for anything tied to scroll
import { createTimeline } from 'animejs'
export function useScrub(durationMs = 1000) {
  const tl = useMemo(() => createTimeline({ autoplay: false, defaults: { ease: 'linear' } }), [])
  const seek = useCallback((u: number) => tl.seek(Math.min(1, Math.max(0, u)) * durationMs), [tl, durationMs])
  return { tl, seek }
}
```

```ts
// src/ui/motion/useCountUp.ts — a number that counts, then holds
import { animate } from 'animejs'
export function useCountUp(
  el: RefObject<HTMLElement>, to: number, opts: { from?: number; ms?: number; decimals?: number; start?: number } = {}
) {
  const { from = 0, ms = 1400, decimals = 0, start = 1 } = opts
  const reduced = useStore(s => s.reducedMotion)
  const played = useRef(false)
  useEffect(() => {
    if (!el.current || played.current) return
    played.current = true
    const node = el.current
    if (reduced) { node.textContent = to.toFixed(decimals); return }
    const proxy = { v: from }
    animate(proxy, {
      v: to, duration: ms * start, ease: 'out(4)',
      onUpdate: () => { node.textContent = proxy.v.toFixed(decimals) },
    })
  }, [el, to])
}
```

**Rules for DOM motion.**
1. Only these three hooks. No inline `animate()` calls scattered in components.
2. Every animated element must have a **static final state** that is correct without
   JS: render the final text/numbers in the markup, and animate *from* a hidden
   state. If anime.js fails, the site still reads.
3. Scrubbed (`useScrub`) for anything the visitor controls by scrolling. One-shot
   (`useReveal`) for anything that mounts once.
4. Never animate `width`/`height`/`top`/`left`. Use `transform` and `opacity` only,
   so the compositor handles it. Exception: the `FlightCounter` overflow bar, which
   is a deliberate layout event — animate `scaleX` with a `transform-origin` instead.
5. Durations: reveals 600–800 ms, counters 1200–1800 ms, glints 200–400 ms.
   Nothing over 2 s except the deliberate slow beats (`WeatherLog`, `SignalDelay`).
6. `prefers-reduced-motion`: all three hooks short-circuit to the final state. The
   fallback path does not animate at all.


## 2.12 — `ProgressRail.tsx` — the eight stops

The rail is the site's spine and the visitor's only map.

- Fixed to the bottom, `height: var(--rail-h)`, full width, `z-index: 30`.
- Eight stops, laid out **proportionally to their `t0/t1` widths**, so the Moon
  occupies a visibly longer stretch than the Sun — the rail teaches the structure
  without a word.
- Each stop: a 1 px rule segment, a 6 px dot, an uppercase label at
  `--step--1`/`letter-spacing: .16em`. Labels hide below 640 px except the active
  one and its neighbours.
- A fill line runs left→right, `scaleX(progress)`, `transform-origin: left`.
- The active dot scales to 1.6× and gets a `--beam` ring. Move the ring with a
  scrubbed transform, not with a CSS transition, so it tracks the scroll exactly.
- Clicking a stop calls `lenis.scrollTo(t0 * pageHeight)`; on keyboard, each stop is
  a `<button>` with `aria-current` on the active one. `Esc` does nothing here.
- Contrast: labels are `--star` at 0.7 alpha over a `--void` scrim of 0.55; on paper
  sections the rail inverts to `--ink` on `--paper`. This inversion is the single
  most "designed" moment in the UI — get it right.
- Final state (Scene 6.2): the eight labels are replaced by what is actually at each
  stop: `Milky Way · 1 telescope`, `Sun · —`, `Solar system · 2 probes leaving`,
  `Inner planets · —`, `Earth · the archive`, `Moon · 6 objects`, `Mars · 9 objects`,
  `Anywhere · 4 objects`. Animate the label swap with a 400 ms `out(3)` stagger.


## 2.13 — `ObjectLabel.tsx` — DOM labels over the canvas

```tsx
export default function ObjectLabels() {
  const labelsOn = useStore(s => s.labelsOn)
  const beat = useStore(s => s.activeBeatId)
  const { camera, size } = useThree()          // NOTE: read-only access to R3F context
  // requestAnimationFrame loop (same tick as Lenis) → projectToScreen(id, camera, size)
}
```

**Important architectural note.** This component lives in `src/ui/` but needs the
camera. Pruthvik does **not** import `three` beyond types. The pattern: `CanvasRoot`
renders `<LabelBridge />` (Nivish's file) inside the canvas, which each frame writes
projected positions into a **plain zustand slice of numbers** (`labelPositions`), and
`ObjectLabels` renders absolutely-positioned `<div>`s from that slice. No R3F context
is consumed from outside the canvas. Agree this at M2; it is one of the two places
where the boundary is thin enough to cause trouble.

Label rules:
- Max **two** labels visible at once. More than that and the screen becomes a
  diagram instead of a scene.
- Label content: `shortName` + one datum (`1969-059C` or `0.67416° N`), never both.
- Leader line: a 1 px `--beam-dim` line at 45°, max 28 px, drawn with a rotated
  pseudo-element. No SVG per label.
- Fade labels out when `progress` is inside the Ingenuity freeze, so nothing
  competes with the stop.
- `labelsOn` toggle in the footer for visitors who find them distracting. Default on.


## 2.14 — The widgets, one by one

Every widget: `data-testid`, an accessible `role`/label, a **static final state**,
a reduced-motion state, and a caption that never contains a fact not in
`objects.ts`.

### `FactDrawer` — Scene 0.2
Renders the Eagle record as a real, selectable document on paper:
- Fields type in on scroll (`useScrub`), in this order: `NSSDCA/COSPAR ID` →
  `Alternate names` → `Launch date` → `Launch vehicle` → `Mass` → `Disciplines`.
- Values: `1969-059C` · `LM-5 · Eagle · Apollo11EASEP · 04041` · `1969-07-16` ·
  `Saturn 5` · `15,103 kg` · `Planetary Science · Human Crew`.
- Then the "Fate" paragraph in amber, held for two full seconds of scroll before the
  beat moves on: the verbatim NSSDCA sentence.
- The text must be **selectable** (`user-select: text`) and in the DOM as real text,
  not canvas. A judge who copies `1969-059C` out of the page is the best possible
  compliment.

### `Odometer` — Scene 1.3
Three states revealed as `progress` passes: `27.8 km` (Apollo 15, Scott & Irwin,
max 5.0 km from the LM), `26.7 km` (Apollo 16, Young & Duke, 4.5 km), `35.9 km`
(Apollo 17, Cernan & Schmitt, 7.6 km). Each with drive time (3 h 02 min / 3 h 26 min
/ 4 h 26 min). Monospaced digits, `tabular-nums`, count-up on entry. No bar chart —
the numbers are dramatic enough.

### `OdometerWall` — Scene 3.1
Four horizontal bars: Sojourner `~100 m`, Spirit `7.7 km`, Opportunity `45.16 km`,
Perseverance `45.22 km`. The 2026 overtake is the animation: Opportunity's bar stays
at full width, Perseverance's bar crosses it by a hair (0.13 % — show the real
difference, do not exaggerate it), and a caption appears: *"Perseverance passed
Opportunity's record on 11 October 2026."* Scale: use a **log** scale or a broken
axis for Sojourner, clearly labelled — otherwise its 100 m is invisible and the
honesty of the chart collapses. State which scale you used, in the caption.

### `FlightCounter` — Scene 3.3
Two bars: "planned: 5" and "flown: 72". The 72 bar **must visually overflow its
container** — that overflow is the entire point; do not clip it politely. Implement
as an inner element with `width: 100%` scaled by `scaleX(72/5)` with
`transform-origin: left` and `overflow: visible` on the track. Add the real totals
beneath: `128.8 flying minutes · 10.5 mi (17.0 km) · max altitude 78.7 ft (24.0 m)`.
The timeline scrubber beneath lists the fifteen real milestones, each a `<button>`
that scrolls to the relevant sub-beat.

### `RtgDiagram` — Scene 1.3
An exploded diagram, not an illustration: fuel rod (Pu-238, half-life `89.6 y`) →
inner cylinder → `442 thermocouples` → `8 fins` → `~70 W at 16 V` (`63.5 W` after a
year). Pin the numbers **to the parts** with leader lines, not in a caption block
below. On keyboard focus, each part is focusable and its number is read aloud.
Static version: the labelled exploded view with no animation at all.

### `SignalDelay` — Scene 5.1
Seed from the documented fact: last signal `23 January 2003`, at `12.23 billion km`,
travel time `11 h 20 min`. The live number is an **extrapolation** and is labelled:
*"our estimate at today's distance — NASA's last measurement was 11 h 20 min."*
Implementation: compute distance using the documented escape velocity
(`51,682 km/h`) from 2003-01-23 to today, divide by `c`, render as
`≈ 16 h 41 min` style. Show both figures side by side, the NASA one first and
larger. **Never** present the extrapolation alone.

### `TransitDemo` — Scene 5.2
A star circle, a brightness curve beneath it, and a draggable planet circle. Drag
the planet across; the curve dips in real time. Keyboard: `←`/`→` moves the planet
in 5 % steps. One sentence beneath: *"This is how Kepler found 2,600 worlds."*
Static version: the planet at mid-transit and the dip drawn in.

### `WeatherLog` — Scene 2.1
A counter of daily/weekly reports climbing while the year ticks 1976 → 1982
(`useScrub`), then **breaking mid-increment** on 11 November 1982 — the digits stop
mid-roll and the last value is visibly incomplete. Do not animate the break
prettily; let it look like a fault. The name plate above it changes from
`Viking 1 Lander` to `Thomas Mutch Memorial Station` at the 1982 marker, with the
dates `1931–1980` appearing beside the new name.

### `AudioPlayer` — Scene 3.2
Martian wind, `1 Dec 2018`, `5–7 m/s`. Muted by default; an explicit play button;
a short volume warning on first play; the full credit line
`NASA/JPL-Caltech/CNES/IPGP/Imperial College/Cornell` **visible without
interaction** beneath the player. Use a bare `<audio>` element with custom controls;
no third-party player. Stop playback on beat exit and on `visibilitychange`.

### `PlaqueViewer` — Scene 5.1
Four hotspots on an SVG of the Pioneer plaque: `man`, `woman`, `solar system`,
`14 pulsar vectors`. Each explains one element in ≤ 25 words, from the source.
Keyboard focusable hotspots, arrow-key navigation, `aria-describedby` for the text.
Static version: the four labels printed around the image.

### `MoonquakeWaveform` — Scene 1.2
A small waveform drawn from synthetic but clearly-labelled data, captioned:
*"a record of an artificial impact, not an audio recording."* On entry, draw the
waveform left→right over 900 ms. The caption is not optional; this is the widget
most likely to be mistaken for a real recording.

### `BounceCounter` — Scene 2.2
Counts the ~15 bounces with two markers on a distance scale: first impact and final
rest `~1 km` apart. Real numbers: impact `14 m/s`, and the sizes (`4 bags × 6 inner
spheres`, `5 m tall × 5 m diameter`). The counter should feel physical — a small
easing overshoot per bounce.

### `DescentLadder` — Scene 4.2
Rungs: `50 km` (30 Apr 2000) → `19 km from surface` (13 Jul 2000) → `5.3 km flyby`
(26 Oct 2000) → `5–6 km passes` (end of 2000) → `surface` (12 Feb 2001, 19:44 UT,
`6.4 km/h`). Each rung is a labelled row; scrubbing moves a marker down the ladder.
Add the `69 photographs` note at the surface rung.

### `VitalSigns` — Scene 3.2
Three panels: **pulse** (seismicity), **temperature** (heat flow), **reflexes**
(impacts). Each states what InSight determined and — honestly — what it could not.
No invented readings; use only the mission's stated goals and results.

### `DateSlider` — Scene 1.4
`1969 → 1977`, one range input. As it moves, six station dots switch from LIVE to
SILENT; at `1977-09-30` all powered stations go dark in one frame. The two
retroreflectors cannot be switched off by the slider — attempts show a one-line
note: *"This one needs no power."* Keyboard: `←`/`→` advance by one year. This is
the single most persuasive interaction in the site; give it room.

### `RangeComparison` — Scene 2.2
Sojourner `~100 m` against Spirit `7.7 km` and Opportunity `45.16 km`, drawn to a
shared scale with the longest bar labelled. Sets up Act 3.

### `StillWorkingToggle` — Scenes 1.1 and 6.1
One toggle. When on: every powered object dims to 35 %, and only the passive
retroreflectors stay at full brightness. Caption: *"One mirror. No power. Still
there."* In the inventory table it filters the rows to those that still function
passively. **Nothing on this site that needed power is still running** — that
sentence may appear beside the toggle, because it is a statement about our data,
not about NASA hardware generally.

### `Readout` — a shared primitive
A `<dl>`-based two-column readout used by six widgets: monospaced value, sans label,
1 px rules. Build it once; it is what makes the widgets feel like one family.

**Widget QA, for every widget:**
1. Static final state renders correctly with JS animation disabled.
2. Reduced motion: final state immediately, no intermediate frames.
3. Keyboard reachable and operable; `aria-live="polite"` only where a number changes
   as a result of the visitor's action.
4. No fact appears that is not in `objects.ts` or `scenes.ts`.
5. Works at 320 px width without horizontal scroll.
6. Under 6 KB gzipped each; no charting library.


## 2.15 — `LunarMap.tsx` and `MarsMap.tsx`

Hand-authored SVG. **No tile service** — it will not load in every environment, it
adds a network dependency to the most important diagram, and it looks like a
different product.

**`LunarMap`.**
- An equal-area circle (the near side), 320 × 320 viewBox, with four soft dark
  maria shapes hand-drawn: Tranquillitatis, Procellarum, Imbrium, plus Serenitatis
  for orientation. Label them, small, `--mute`.
- Pins from real coordinates via the documented equirectangular projection
  (see Nivish's `latLonToWorld`, but implement it independently here so the SVG is
  not coupled to 3D):
  ```
  x = cx + (lon - 0)  * k * cos(lat * π/180)
  y = cy - (lat - 0)  * k
  ```
  with `k = 1.25` px/degree and `cx=cy=160`. Pins for `0.67416,23.47314`;
  `-3.0128,-23.4219`; `26.13239,3.63330`; `-3,-23.41`.
- Each pin: a 5 px dot, a leader to a label with `shortName` + coordinates in mono.
  On hover/focus, the pin grows and the coordinates become selectable text.
- Pins **accumulate** as `progress` passes each scene: at 0.175 only Eagle; 0.225
  adds Intrepid + Surveyor 3; 0.275 adds Falcon. The accumulation is driven by
  `progress`, not by timers.
- Honest caption, always visible: *"Schematic. Positions from published
  coordinates; not a navigation aid."*

**`MarsMap`.**
- A rectangle with an equator line, `0°`, and a 30°-spaced grid, 640 × 360.
- Pins for Viking 1 (`22.483, −47.94`), InSight (`4.5, 135.9`), and site-named pins
  for Gusev Crater, Meridiani Planum, Ares Vallis, Jezero Crater — for these four,
  **no coordinates**, because the supplied sources do not publish them. Draw them as
  **hollow** pins labelled with the site name only, and add a footnote:
  *"Four sites are named in the source material without published coordinates."*
  This is the honesty rule made visible, and it is one of the most credible details
  on the whole site.

**Both maps:** keyboard focusable pins, `<title>` per pin, no animation beyond a
150 ms scale on hover, and a static print-friendly state.


## 2.16 — `InventoryTable.tsx` — the most useful page on the site

Requirements:
1. Fifteen rows, columns: `Object`, `Where`, `Coordinates`, `Went quiet`, `How`.
2. Sortable by `wentQuiet` (chronological, with `UNKNOWN` last and year-only values
   parsed leniently) and by `distanceFromEarth` (a hand-curated sort key per object,
   documented in the data file — Moon 0.38 M km, Mars 55–400 M km, Ceres 0.4 B km,
   Eros 0.2 B km, Pioneer 10 12.23 B km, Kepler 1 AU heliocentric).
3. Filter **"Still working"** → leaves only the passive retroreflectors, with the
   caption *"Nothing on this list that needed power is still running."*
4. Every row links to its scene (anchor + `lenis.scrollTo`). Every scene links back
   to the table (a small "see the full inventory" link at the end of each scene).
5. On paper background; `--ink` text; `tabular-nums`; `1px` rules; no zebra striping
   (it fights the mono digits). Row hover: `--paper-2`.
6. Mobile: collapse to a card list, one card per object, with the same five fields
   as a definition list. Do not horizontally scroll a table on a phone.
7. The four conservative rows carry a subtle dotted underline on the date with a
   tooltip: *"The source does not state a precise date."* Honesty at the row level.
8. Print stylesheet: the table prints on white, one object per row, with the source
   URL column appended.

This table is what a judge will screenshot. Treat it as a product, not a footnote.


## 2.17 — `FallbackStory.tsx` — the complete non-3D experience

Triggered by: `prefers-reduced-motion: reduce`, no WebGL2, `tier === 'none'`, or the
visitor's own **Reading mode** toggle in the footer. It is **not** a stub. It is the
same seventeen scenes, the same copy, the same quotes, the same widgets in static
form, the same inventory table.

Design:
- A single column, `--measure`, generous `--s-7` vertical rhythm, paper background
  for the archive moments and void for the space moments — the same palette logic.
- Each scene: kicker, `h2`, paragraphs, quote block, widget (static), and a small
  `n. of 17` counter.
- A sticky mini-table-of-contents on the left at ≥ 1024 px, listing the seven
  movements.
- Reading progress bar at the top, `scaleX`, driven by native scroll.
- No animation at all except a 120 ms link-hover. No Lenis. No canvas.
- This is also the screen-reader path, so heading order is `h1` (site title) →
  `h2` (movement) → `h3` (scene). Verify with a screen reader, not just a validator.

**Ship test:** open the fallback on a phone, read it top to bottom. If it feels like
a punishment, it is not finished. Judges on locked-down laptops will see only this.


## 2.18 — Accessibility checklist (work through it in order at M6)

1. Landmarks: `header`, `main`, `nav`, `footer`. One `h1`. No skipped heading levels.
2. Every widget has an accessible name; every control is a real `<button>`/`<input>`.
3. Focus visible: `:focus-visible` ring, 2 px `--beam`, 2 px offset, on every
   control including rail stops, pins and hotspots.
4. `Tab` order follows reading order in both the 3D and fallback paths.
5. The canvas is `aria-hidden="true"`; nothing in 3D is a control.
6. The whole beat copy is available in a visually hidden paragraph per scene.
7. `Esc` closes the map, the credits and the reading-mode overlay.
8. Contrast: measure every text/background pair. Body ≥ 7:1, large ≥ 4.5:1. The
   scrims exist to guarantee this over any 3D frame.
9. No motion above 3 Hz anywhere; nothing autoplays audio.
10. `prefers-reduced-motion` disables all animation, Lenis and the canvas.
11. `prefers-contrast: more` raises scrim opacity and removes translucency.
12. Zoom to 200 % at 1280 px width: no clipping, no overlap, no horizontal scroll.
13. Screen-reader pass: VoiceOver or NVDA, whole story, one full read-through.
14. Lighthouse Accessibility ≥ 95, with zero `aria` errors.


## 2.19 — Credits, sources and the disclaimer

`Credits.tsx` (a panel, `Esc`-closable, reachable from the footer at all times):
- **Data and mission information:** NASA Space Science Data Coordinated Archive
  (NSSDCA) and NASA Science. Link the fifteen source URLs from
  `src/data/sources.ts`, grouped by object.
- **Imagery:** each image with its exact credit line, as recorded in
  `objects.ts` → `imageCredit`.
- **Audio:** the Martian wind, `NASA/JPL-Caltech/CNES/IPGP/Imperial College/Cornell`.
- **Diagram note:** *"Distances and body sizes in the descent are compressed for
  legibility. Object dimensions are to scale."*
- **Schematic note:** *"The lunar and Mars maps are schematic. Positions are taken
  from published coordinates; they are not a navigation aid."*
- **Non-endorsement, verbatim, in the footer and here:** *"NASA does not endorse any
  non-U.S. Government entity and is not responsible for information contained on
  non-U.S. Government websites. For non-U.S. Government websites, participants must
  comply with any data use parameters of that specific website."*

**Rule:** if an image or audio file has no credit line in the data, it does not ship.


## 2.20 — `src/data/sources.ts` and the in-repo README

`sources.ts` is the machine-readable version of PART 0 §0.18: fifteen entries, each
with `url`, `label`, `usedFor` (scene ids), and `fetched: '2026-11-15'`. The Credits
panel renders directly from it, so the ledger can never drift from the site.

`README.md` (yours) must contain: what the site is, the stack, how to run it, the
data provenance, a link to each of the fifteen NASA pages, the accuracy rules in
five lines, and the non-endorsement text. Judges read the README more often than
they read the site.


## 2.21 — `docs/ACCEPTANCE.md` — the living contract

Create it at M0 with these sections and keep it current. It is both your QA record
and your communication channel.

```md
# Acceptance log

## Status
| Milestone | Owner | State | Note |
|---|---|---|---|
| M0 contracts | pru | ✅ | BEATS_VERSION 1 frozen |
| M1 camera | niv | ⬜ | |

## Accuracy pass (one line per scene)
| Scene | Numbers checked against | Quotes verified | Credits | By |
|---|---|---|---|---|
| 0.1 | objects.ts | n/a | n/a | |
| …   | | | | |

## UNKNOWN fields (deliberate)
| Object | Field | Why |
|---|---|---|
| Spirit | wentQuiet | source gives no end date |
| … | | |

## Requests
REQUEST (niv) → (pru): …
REQUEST (pru) → (niv): …
```

The accuracy pass table is signed scene by scene. **This pass is worth more marks
than any animation**; do not leave it for the last hour.


## 2.22 — Tests you can actually run in a hackathon

No test framework, just three scripts in `scripts/`, run with `tsx`:

1. `check-data.ts` — asserts: every `OBJECTS[i].sceneId` exists in `BEATS`; every
   `sourceUrls` entry is an `https` URL; no `hardFacts` string is empty; no
   coordinate is outside `[-90,90]`/`[-180,180]`; every `UNKNOWN` is a literal
   `'UNKNOWN'` (not `''`, not `undefined` in a string field).
2. `check-copy.ts` — asserts: every beat has ≥ 1 copy paragraph; no paragraph
   exceeds 45 words; every quote in `QUOTES` appears verbatim in the source list in
   PART 0 (paste the quote corpus into the script as a string); no copy string
   contains a banned word from PART 0 §0.21.
3. `check-credits.ts` — asserts: every object with an `imageCredit` maps to a file
   that exists in `public/img`; every audio reference has a credit.

Run all three before every push. They take two seconds and they catch the errors
that hurt most: a stray number, a banned word, a missing credit.


## 2.23 — Your milestones, with definitions of done

| M | Deliverable | Definition of done |
|---|---|---|
| **M0** | Contracts, store, fifteen records, skeleton with rail | Nivish unblocked; `progress` visibly drives the beat label; `check-data` passes; contracts announced frozen |
| **M1** | Overlay system + Scenes 0.1, 0.2, 6.1, 6.2 copy in place | The opening and closing are readable with **no 3D at all**; 45-word cap honoured; scrubbing backwards identical |
| **M2** | All seventeen scenes' copy, quotes, widgets mounted by scroll | Full story readable; every quote verbatim; `check-copy` passes |
| **M3** | The six highest-value widgets: `Odometer`, `FlightCounter` (with overflow), `RtgDiagram`, `WeatherLog`, `DateSlider`, `StillWorkingToggle` | Each has a static state; each is keyboard operable; each is under 6 KB |
| **M4** | `LunarMap` + `MarsMap` with real coordinates and hollow uncoordinated pins | Pins match `objects.ts`; schematic captions present; four named-only sites handled honestly |
| **M5** | `InventoryTable` with sort + filter, and the remaining widgets | "Still working" leaves only retroreflectors; mobile card layout works at 320 px |
| **M6** | `FallbackStory` complete + accessibility pass + credits + disclaimer | Keyboard-only run-through of the whole site succeeds; Lighthouse A11y ≥ 95; screen-reader read-through done |
| **M7** | Accuracy pass + `docs/ACCEPTANCE.md` signed per scene | Every number traceable to `objects.ts`; every quote verified character by character |


## 2.24 — What you never do

1. Never edit `src/three/**`, `src/contracts/beats.ts` after freeze, or
   `src/three/systems/project.ts`.
2. Never add a fact that is not in `objects.ts`, even in a caption, tooltip or
   `aria-label`. Especially in an `aria-label`.
3. Never invent a coordinate, a date or a quote. `UNKNOWN` is a valid design choice.
4. Never use a charting library, a UI kit, a carousel, or a CDN of any kind.
5. Never let a widget contain its own scroll listener.
6. Never present an extrapolation as NASA data — label it, and show NASA's figure.
7. Never ship an image or audio file without a credit line in the data.
8. Never use the words in PART 0 §0.21, including in code comments that a judge
   might read in the repo.
9. Never let a modal trap the visitor; the scrollbar and `Esc` must always work.
10. Never skip the accuracy pass because the design looks good.
# ══════════════════════════════════════════════════════════════════════════════
# PART 3 — INTEGRATION PROMPT
# "ONE SITE, TWO PEOPLE" — merging, QA, performance, deploy, submission
# Paste by BOTH builders when you merge. Read it before you need it.
# ══════════════════════════════════════════════════════════════════════════════


## 3.0 — The integration brief

You are now merging two parallel codebases that were designed to fit. The
architecture is deliberately dumb about the seam: Nivish's canvas reads one number,
Pruthvik's DOM writes one number, and the timeline they both agree on lives in a
frozen file. Almost every integration failure you will hit is one of five things:

1. **A contract violation** — someone edited a file they did not own, or changed a
   `t0`/`t1` without bumping `BEATS_VERSION`.
2. **A double scroll listener** — something in `src/three/**` is listening to scroll,
   or two rAF loops are running.
3. **A mount error** — two chapters mounted, or a chapter mounted while the canvas
   is null, or the canvas mounted while the fallback is showing.
4. **A z-index/layout error** — the fixed overlay is fighting the scroll track, so
   the visitor cannot drag the scrollbar or the copy sits over the subject.
5. **A credit/accuracy error** — a number or quote drifted during the merge.

Fix the cause, not the symptom. If the symptom is "the text lags the camera", the
cause is a double smoothing, not a CSS offset.

**Your integration mantra:** *the seam is one number and one file. Everything else is
downstream of that.*


## 3.1 — Repository setup, branches and the merge that should be boring

**One repo, one Vite app, two owners by path.**

```
main                      ← protected, always green, always deployable
├── feat/contracts        (pru)  → merged at H2 → contracts frozen
├── feat/three-descent    (niv)  → merged at H10, H24, H36
└── feat/archive-layer    (pru)  → merged at H10, H24, H36
```

**Rules.**
- `main` deploys on every merge (Vercel/Netlify preview per branch, production on
  `main`). A red build on `main` blocks both of you; fix it first, always.
- Rebase on `main` before every push. No merge commits from feature branches.
- Commit prefixes: `niv:` for `src/three/**`, `pru:` for everything else, `both:`
  for `docs/`, `package.json`, config and `README.md`.
- One commit = one milestone step, message names the milestone (`niv: M3 LMDescent
  + ALSEP + LRRR at true scale`).
- Never commit `node_modules`, `.env`, or a `public/img` file over 400 KB.
- Never force-push `main`. Never rebase a branch someone else has pulled.

**.gitignore essentials.**
```
node_modules/
dist/
.env*
.DS_Store
*.log
.vite/
public/img/tmp/
```

**`package.json` ownership.** Pruthvik owns it. Nivish may add **only** `three`,
`@react-three/*`, `@types/three` and `animejs` — and only via a `both:` commit that
Pruthvik acknowledges, because a dependency is a shared decision. A second copy of
React, a duplicate `three`, or a stray `gsap` will cost you a day.

**Lockfile.** Commit `package-lock.json`. Never mix `npm`, `pnpm` and `yarn` between
the two of you; Pruthvik decides, and it is `npm`.


## 3.2 — The interface audit (run this at every merge, takes 8 minutes)

Go down this list in order. Each item is a yes/no. If any answer is wrong, stop.

**Contracts**
1. `git log -1 -- src/contracts/` — has anything changed since freeze? If yes, is
   `BEATS_VERSION` bumped and was it announced?
2. Do the seventeen `t0`/`t1` pairs in `beats.ts` match the `t` values in Nivish's
   `waypoints.ts` one-for-one? Diff them side by side, literally.
3. Is `TOTAL_SCREENS` still 38, and does the scroll track actually measure that?

**The seam**
4. Is `progress` written in exactly one place (`useLenis`)?
5. Grep the whole `src/three/` directory for `scroll`, `wheel`, `touchstart`,
   `IntersectionObserver`. The only permitted hit is a comment. Any listener is a bug.
6. Are there exactly two rAF loops maximum: Lenis's, and R3F's? Check with a
   breakpoint in `requestAnimationFrame`.
7. Does `src/three/**` import from `src/ui/**` or `src/data/**`? It may import the
   store and types only. Any other import is a boundary violation.
8. Does `src/ui/**` import `three` beyond `import type`? It must not.

**Mounting**
9. With the canvas active: exactly one chapter rendered. Log `activeChapter` and the
   chapter's mount/unmount in dev.
10. With `reducedMotion` on: canvas absent, `FallbackStory` complete, no errors.
11. With WebGL disabled in the browser: same as above, and `tier` is `'none'`.
12. With reading mode toggled mid-scroll: handover is clean, no orphaned listeners.

**Layout**
13. The scrollbar is draggable at every point in the experience.
14. Copy never covers the object being described — check every scene at 1440 px and
    at 390 px.
15. The rail is legible over both void and paper backgrounds (the inversion works).
16. Zoom to 200 %: no clipping, no horizontal scrollbars.

**Accuracy**
17. `npm run check-data && npm run check-copy && npm run check-credits` — all pass.
18. Pick three random numbers on screen and trace each to `objects.ts`. Then trace
    that to a NASA URL. If you cannot, it comes off.


## 3.3 — The performance audit

Run this at H24 and again at H36. Numbers go in `docs/ACCEPTANCE.md`, not in your
head.

**Desktop (Chrome, 1440 × 900, no throttling).**
```js
// paste in the console after a full scroll
const gl = document.querySelector('canvas')?.__r3f?.root?.getState?.().gl
console.table({
  calls: gl.info.render.calls, triangles: gl.info.render.triangles,
  geometries: gl.info.memory.geometries, textures: gl.info.memory.textures,
  programs: gl.info.programs.length,
})
```
Targets: `calls ≤ 120`, `geometries` and `textures` flat across three full scrolls,
`programs ≤ 30`.

**Frame budget per chapter.** Record the minimum fps for each of the seven chapters
while scrolling at a medium speed. Any chapter under 50 fps desktop is a problem.

**Mobile (a real mid-range Android, not a simulator).**
- Target ≥ 30 fps at governor tier ≤ 3.
- Check the door transition and the Ingenuity freeze specifically — they are the two
  moments where a frame drop is most visible.
- Confirm `dpr` is clamped (inspect `gl.getPixelRatio()`).

**Bundle.**
```
npm run build
npx vite-bundle-visualizer         # or: du -sh dist/assets/*
```
Targets: initial JS ≤ 900 KB gzipped; the 3D chunk lazy-loaded; fonts ≤ 120 KB;
images total ≤ 2.5 MB; audio ≤ 400 KB. If the 3D chunk is not lazy, make it lazy:
`const CanvasRoot = lazy(() => import('./three/CanvasRoot'))`.

**Network.** Throttle to Fast 3G and reload: first contentful paint under 2.5 s, and
the fallback must be readable before three.js arrives. This is why the fallback is
also the loading state — if the 3D chunk fails, the visitor still gets the story.

**The governor.** Verify it actually degrades: in DevTools, throttle CPU 6× and
confirm the tier climbs and post-processing drops. Then confirm it never steps down
during the freeze or the door (Nivish's guard).


## 3.4 — The 48-hour schedule, hour by hour

Assumes a night in the middle. Adjust the labels, keep the shape.

**H0–H2 · Contracts (Pruthvik)**
Pruthvik: scaffold, contracts, store, fifteen records, skeleton, rail, capability
detection. Push. Announce **contracts frozen**.
Nivish, in parallel: sketch the descent on paper, list the thirteen models, write
`waypoints.ts` as a table only (no code), decide `WORLD_SCALE` and the label-bridge
signature. **Zero blocked time.**

**H2 · The fifteen-minute call**
Freeze `beats.ts` and `BEATS_VERSION = 1`. Agree `WORLD_SCALE = 0.01`. Agree the
`projectToScreen(id, camera, size)` signature and that Nivish writes it. Agree the
door centre position so the `FactDrawer` lands on the paper. Agree the test command
names. Then stop talking and work.

**H2–H10 · Parallel build one**
Nivish: M1 (canvas, rig, chapter switch, placeholder boxes) → M2 (stars, planets,
the door).
Pruthvik: M1 (overlay) → M2 (all seventeen scenes' copy, quotes, sources).

**H10 · Integration one — the canvas goes behind the DOM**
Mount `CanvasRoot` behind `Overlay`. Run §3.2 in full. Fix the seam, not the
symptoms. Expected problems: z-index, `pointer-events`, the rail over the 3D, and
`progress` lag from a stray smoothing. Budget two hours; if it takes four, the
contracts were wrong — find out which one and fix it properly.

**H10–H24 · Parallel build two**
Nivish: M3 (Moon) → M4 (Mars).
Pruthvik: M3 (six widgets) → M4 (maps).

**H24 · Integration two + the phone test**
Run §3.2 and §3.3. Open the site on a real phone over 4G. **This is the moment to
cut, not add.** Apply the cut order in §3.6 immediately; do not "see how it goes".

**H24–H36 · Parallel build three**
Nivish: M5 (belt, anywhere, inventory dissolve) → M6 (governor, disposal, mobile).
Pruthvik: M5 (inventory table, remaining widgets) → M6 (fallback, accessibility,
credits).

**H36 · Integration three + freeze**
Nivish: perf pass only. Pruthvik: accuracy pass only. Both: §3.2 as a final gate.
Then **code freeze**. No exceptions, no "one more thing".

**H36–H42 · The accuracy and polish window**
Pruthvik signs off `docs/ACCEPTANCE.md` scene by scene. Nivish runs the silhouette
test and the memory loop. Both fix only what is broken.

**H42–H46 · Deploy and record**
Deploy production. Test in an incognito window on a phone and on a desktop with
WebGL disabled. Record the two-minute video (§3.9).

**H46–H48 · Write the submission**
README, credits, the one-paragraph pitch, the video upload. **No code changes in
these two hours.** None.


## 3.4b — The two thin boundaries, in code

Two places in this architecture are thin enough to cause real trouble. Write them
once, at H10, and never touch them again.

### Boundary one — the label bridge

Nivish owns the projection; Pruthvik owns the DOM. The exchange is a **numeric
slice**, never a React context, never a callback ref into R3F.

```ts
// src/store.ts — the ONE addition allowed after contracts freeze (BEATS_VERSION unaffected)
labelPositions: Record<string, { x: number; y: number; visible: boolean }>
setLabelPositions: (p: Record<string, { x: number; y: number; visible: boolean }>) => void
```

```tsx
// src/three/systems/LabelBridge.tsx   (NIVISH)
import { useFrame, useThree } from '@react-three/fiber'
import { useStore } from '../../store'
import { projectToScreen, LABEL_IDS } from './project'

export default function LabelBridge() {
  const { camera, size } = useThree()
  const set = useStore(s => s.setLabelPositions)
  let acc = 0
  useFrame((_, dt) => {
    acc += dt
    if (acc < 1 / 20) return                 // 20 Hz is plenty for labels
    acc = 0
    const next: Record<string, {x:number;y:number;visible:boolean}> = {}
    for (const id of LABEL_IDS) {
      const p = projectToScreen(id, camera, size)
      if (p) next[id] = p
    }
    set(next)
  })
  return null
}
```

```tsx
// src/ui/ObjectLabels.tsx   (PRUTHVIK)
export default function ObjectLabels() {
  const labelsOn = useStore(s => s.labelsOn)
  const pos = useStore(s => s.labelPositions)
  const scene = useStore(s => s.activeSceneId)
  if (!labelsOn) return null
  const shown = labelIdsForScene(scene).slice(0, 2)   // hard cap: two at once
  return (
    <div className="labelLayer" aria-hidden>
      {shown.map(id => {
        const p = pos[id]
        if (!p?.visible) return null
        return (
          <div key={id} className="objLabel" style={{ transform: `translate3d(${p.x}px, ${p.y}px, 0)` }}>
            <span className="leader" />
            <span className="name">{LABEL_COPY[id].name}</span>
            <span className="datum mono">{LABEL_COPY[id].datum}</span>
          </div>
        )
      })}
    </div>
  )
}
```

**Why 20 Hz and why a store slice.** Projection math is cheap but writing a React
store 60 times a second re-renders the whole label layer and any subscriber. 20 Hz is
invisible for a label, and the store slice keeps the canvas entirely out of the DOM's
render path. Both halves stay independent; if either is broken the other still runs.

**Failure modes to check at H10.**
- Labels drift by a constant offset → the canvas has CSS transforms on an ancestor.
  Fix by making the canvas a direct child of `body`-level fixed positioning.
- Labels trail the object during fast scroll → projection is running on a different
  clock. Ensure `LabelBridge` is inside the same `<Canvas>` as the chapters.
- Labels appear over the fallback → `labelLayer` must be unmounted when
  `readingMode || reducedMotion`.

### Boundary two — the door and the fact drawer

The `PaperPlane` quad is 3D; the `FactDrawer` is DOM. They must look like one event.

Agreed contract (fix at H2, never change):
- Door centre, in normalised screen space: `x = 0.34, y = 0.44` at 1440 × 900.
- Door timing: `uMix = smoothstep(0.138, 0.158, progress)` — Nivish, in the shader.
- `FactDrawer` mount: `progress ∈ [0.150, 0.176]`, entering from `opacity 0`,
  `translateY(12px)`, `blur(8px)` → resolved over 620 ms — Pruthvik, anime.js.
- Paper colour is identical in both: `#f4f7fb` from `tokens.css`, passed to the
  shader as a uniform read from a single exported constant. **One colour, two
  renderers.**

```ts
// src/contracts/door.ts  — add at H10 with a `both:` commit. Two constants, no logic.
export const DOOR = {
  center: [0.34, 0.44] as [number, number],
  tIn: 0.138, tFull: 0.158,
  paper: '#f4f7fb', void: '#05070d',
} as const
```

**Test for this boundary:** record the transition at 0.25× speed. The record must
appear to be *on* the paper, printed as the paper arrives — not fading in over a
dark frame. If the text precedes the paper by more than three frames, shift
`FactDrawer`'s mount by +0.002 and re-test. This one transition is worth an hour of
the schedule; it is the moment a judge decides the site is good.

## 3.4c — State ownership map (print this and tape it to the monitor)

| Value | Written by | Read by | Notes |
|---|---|---|---|
| `progress` | `useLenis` only | everyone | the seam |
| `activeBeatId` / `activeSceneId` / `activeStop` / `activeChapter` | `setProgress` (derived) | everyone | never set directly |
| `webglOk`, `tier`, `reducedMotion` | boot detection | App, CanvasRoot | set once, before first render |
| `readingMode` | footer toggle | App | visitor's choice, persisted in `sessionStorage` |
| `perfLevel` + derived perf flags | `systems/perf.ts` (Nivish) | chapters, `Post` | Pruthvik never writes these |
| `labelPositions` | `LabelBridge` (Nivish) | `ObjectLabels` | 20 Hz |
| `filterWorkingOnly` | `InventoryTable` | table, maps, toggle | |
| `labelsOn` | footer | `ObjectLabels` | default on |
| `mapOpen`, `creditsOpen` | map, footer | overlays | always `Esc`-closable |
| `audioUnlocked` | `AudioPlayer` gesture | `AudioPlayer` | respects autoplay policy |

If a value is not on this table, do not add a new store field for it. Local
component state is almost always the right answer, and the store is the one place
where two people's code can silently fight.

## 3.4d — Error boundaries, loading, and graceful failure

Three boundaries, nested:

```tsx
// src/App.tsx
<RootErrorBoundary>                 {/* catches everything, renders FallbackStory + a notice */}
  {fallback ? <FallbackStory /> : (
    <CanvasErrorBoundary>           {/* catches R3F throws, sets tier='none', renders null */}
      <CanvasRoot />
    </CanvasErrorBoundary>
  )}
  <UiErrorBoundary>                 {/* catches a broken widget, renders its static caption */}
    <Overlay />
  </UiErrorBoundary>
</RootErrorBoundary>
```

Rules:
1. A crash in 3D must never remove the story. `CanvasErrorBoundary` sets
   `tier = 'none'` in the store, which flips `App` to the fallback on the next
   render. The visitor loses the 3D and keeps the site.
2. A crash in one widget must render that widget's static caption plus a quiet line:
   *"This diagram failed to load."* Never a blank box, never an error stack.
3. Log to console in dev only. No error-reporting service — no network calls at all
   is a feature here, and it keeps the privacy story clean.
4. The 3D chunk is lazy-loaded. While it loads, the **fallback is the loading state**
   — the copy is already in the DOM, so the visitor reads immediately and the canvas
   fades in when ready. No spinner past 1.5 s, ever.
5. If the chunk 404s (deploy asset mismatch — the classic Vercel stale-HTML bug),
   the fallback simply persists. Verify by renaming a chunk file locally and
   reloading.

## 3.4e — Scene-by-scene integration sign-off

Copy into `docs/ACCEPTANCE.md`. Both initials required. This table is the difference
between "we think it's done" and "it is done".

| Scene | 3D reads correctly | Copy verbatim | Quote verified | Widget works | Credit present | Mobile ok | niv | pru |
|---|---|---|---|---|---|---|---|---|
| 0.1 Milky Way | | | n/a | n/a | n/a | | | |
| 0.2 Catalogue | | | | `FactDrawer` | n/a | | | |
| 1.1 Eagle | | | | scale + toggle | n/a | | | |
| 1.2 Intrepid + Surveyor 3 | | | | ruler, split, waveform | image credit | | | |
| 1.3 Falcon + LRV | | | | odometer, RTG, battery | n/a | | | |
| 1.4 Six stations | | | | date slider | n/a | | | |
| 2.1 Viking 1 | | | | weather log, name plate | image credit | | | |
| 2.2 Pathfinder | | | n/a | bounce, range | image credit | | | |
| 3.1 Spirit + Opportunity | | | | odometer wall, dust slider | Pancam credit | | | |
| 3.2 InSight | | | | vitals, audio | wind credit | | | |
| 3.3 Ingenuity | | | n/a | flight counter, timeline | n/a | | | |
| 4.1 Dawn | | | n/a | orbit refusal, two worlds | n/a | | | |
| 4.2 NEAR Shoemaker | | | | speed, ladder | image credit | | | |
| 5.1 Pioneer 10 | | | | signal delay, plaque | n/a | | | |
| 5.2 Kepler | | | | transit demo | n/a | | | |
| 6.1 Inventory | | | n/a | sort + filter | source links | | | |
| 6.2 The close | | | n/a | rail relabel | n/a | | | |

## 3.5 — The merge-time bug playbook

| # | Symptom | Almost always | Fix |
|---|---|---|---|
| 1 | Text lags the camera by a few frames | `progress` smoothed twice (Lenis + `CameraRig`) | Remove the lerp in the rig; read raw |
| 2 | Camera stutters at chapter boundaries | Two chapters mounted, or heavy mount work | `ChapterSwitch` renders exactly one, `key`ed; defer heavy work to `useEffect` after first frame |
| 3 | Cannot drag the scrollbar | `overflow: hidden` on `body`, or an overlay with `pointer-events: auto` over the page | Restore flow; `pointer-events: none` on the overlay, `auto` on widgets only |
| 4 | Copy sits over the object | Overlay occupies the centre, not the left third / bottom 40 % | Enforce the layout contract in §2.9 |
| 5 | Rail invisible over the paper sections | Rail colours not inverted per section | Drive a `data-tone="paper|void"` attribute from `activeBeatId` |
| 6 | Blank canvas, no errors | A chapter threw inside `Suspense` and swallowed it | Add an error boundary that falls back to `FallbackStory` and logs |
| 7 | Memory climbs over a session | Textures/geometries not registered for disposal | `reg.tex/geo/mat` every creation; re-run the 3× loop |
| 8 | Stars pop in | Points rendered before the first tick | `frustumCulled={false}` and a 1-frame fade-in |
| 9 | Labels detached from objects | Anchor offsets in world space instead of local metres | Anchors are local; use `localToWorld` |
| 10 | Freeze missed on fast scroll | Camera drift or animatables still running | Early-return in **every** `useFrame`; kill animatables |
| 11 | Numbers disagree between widget and table | A second source of truth | Both must read `objects.ts`; no literals in components |
| 12 | Quote differs by a comma | Retyped during the merge | Copy from `QUOTES`, never retype |
| 13 | Build fails on `main` | Lockfile conflict or a stray dependency | Reproduce locally from a clean clone; fix the lockfile once |
| 14 | Mobile scroll is janky or stuck | `syncTouch`/`autoRaf` misconfigured, or an overlay intercepting touch | Verify on a real device; `touch-action: manipulation` on controls |
| 15 | Reduced motion still shows the canvas | `tier`/`reducedMotion` read before capability detection ran | Detect in `useBootCapability` **before** first render; gate on a `booted` flag |


## 3.6 — The cut list, in the order you cut (decided at H24, not later)

Cut from the top. Each item names what you remove and what you keep instead.

1. **Dawn + NEAR scenes (4.1, 4.2)** → keep their rows in the inventory table and
   their quotes in the belt chapter as text. Saves a chapter, two models, two
   widgets. **Highest value cut.**
2. **The lunar map** → replace with coordinates printed beside each scene heading.
3. **`AudioPlayer`** → keep the credit line and the sentence about the wind.
4. **`PlaqueViewer`** → keep the quote and one sentence about the plaque.
5. **The planets in ch00** (go straight from stars to the door) → keep the Sun and
   Earth only; the descent still reads.
6. **Mars terrain detail** → flat ground with fog and dust; the objects carry it.
7. **The seven remaining widgets** beyond the six core ones → static readouts.

**Never cut, under any circumstances:**
- the reduced-motion / no-WebGL fallback
- the inventory table (sortable, filterable)
- the accuracy pass
- the Ingenuity freeze
- Scene 6.2, the closing litany
- the credits and the non-endorsement notice
- the rail

If you are behind at H36 and everything on the cut list is already gone, cut scene
*count*, not scene *depth*: merge 4.1+4.2 into one scene and 5.1+5.2 into one, but
keep both quotes and both objects in the table.


## 3.6b — The 90-second boundary drill (do this at H10, before you build further)

Two people, two machines, one shared screen. Ten steps, ninety seconds. If any step
fails, stop and fix it before writing another line of feature code.

1. On the laptop, open the dev server. Do not touch the mouse.
2. Press `End`. The page must land on Scene 6.2. The rail's last stop must be active.
3. Press `Home`. Scene 0.1. The rail resets. No flash of the closed scene's text.
4. Drag the scrollbar to the exact middle. `progress ≈ 0.5` in the corner readout —
   the Mars section, second or third scene.
5. Hold `PageDown` for four seconds. Nothing stutters; the camera never overtakes or
   falls behind the copy.
6. Scroll back up through the Moon. The chapter re-mounts; check the memory readout
   returns to baseline within two frames.
7. Hit `Tab` eight times. Focus must land on rail stops and widget controls only —
   never on the canvas, never on a hidden element.
8. Open the map with the keyboard, move between pins with arrows, close with `Esc`.
   The scroll position must be unchanged.
9. Turn on Reading mode from the footer. The whole story must appear above the fold
   without the canvas. Turn it off. You are exactly where you were.
10. Set `prefers-reduced-motion: reduce` in DevTools and reload. No canvas, no Lenis
    easing, complete story, zero errors in the console.

The drill takes ninety seconds and catches about eighty per cent of integration bugs.
Run it at H10, H24, H36 and after every deploy.

## 3.6c — Three ways this project fails, and the tell for each

**Failure one: it becomes a slideshow.** The tell is that the visitor scrolls and the
picture does not change, or changes in hard cut. Cause: chapters keyed to beats rather
than the camera being continuous; or `progress` sampling stale state. The site's whole
claim is a continuous fall; a slideshow is a different, lesser product. Test: scroll at
a constant slow speed for twenty seconds and count visual cuts. The correct number is
zero.

**Failure two: it becomes a 3D demo with text on top.** The tell is that a judge
scrolls, says "nice graphics", and cannot tell you one fact afterwards. Cause: the
copy was written as captions rather than as the artefact; the numbers are in the
widgets but not in the sentences. Test: mute the visuals mentally and read only the
Overlay copy from top to bottom. If it does not stand alone as a piece of writing, the
balance is wrong. Fix by cutting 3D detail, not by adding text.

**Failure three: it becomes a data dump.** The tell is that a judge scrolls, learns
several things, and feels nothing. Cause: no scene has a beat of silence; every frame
is busy; the numbers arrive without a pause before them. Test: watch the Ingenuity
freeze and the Viking weather log with someone who has not seen the site. If they do
not go quiet at those two moments, the pacing is wrong. Fix with whitespace and
duration, never with more content.

## 3.7 — The QA matrix (copy into `docs/ACCEPTANCE.md` and fill it)

| # | Test | How | Pass |
|---|---|---|---|
| 1 | Full scroll, desktop | Scroll 0→1 slowly, then flick | No errors, no missing scene, no jank |
| 2 | Full scroll, mobile | Real device, 4G | ≥ 30 fps, no stuck scroll |
| 3 | Reverse scroll | Scroll 1→0 | Every scene reverses identically |
| 4 | Scrollbar drag | Drag the native bar to random points | Lands on the right scene each time |
| 5 | Chapter boundaries | Stop on each of the six boundaries | Exactly one chapter visible |
| 6 | The door | Slow, medium, flick | Reads as a doorway every time |
| 7 | The freeze | Slow, medium, flick at t≈0.63 | Absolutely still for the full beat |
| 8 | Reduced motion | DevTools emulation + reload | Canvas absent, fallback complete |
| 9 | No WebGL | Chrome flag / Safari setting | Fallback, no errors |
| 10 | Reading mode | Footer toggle, mid-scroll | Clean handover both ways |
| 11 | Keyboard only | Tab through everything, no mouse | Every control reachable and operable |
| 12 | Screen reader | VoiceOver/NVDA, full read | Whole story heard, correct order |
| 13 | Zoom 200 % | Browser zoom at 1280 px | No clipping or overlap |
| 14 | Contrast | Measure 10 text pairs | Body ≥ 7:1, large ≥ 4.5:1 |
| 15 | Audio | Play the wind, navigate away | Stops on exit; muted by default |
| 16 | Table sort/filter | Sort both columns, filter working | Correct order; retroreflectors only |
| 17 | Mobile table | 320 px width | Card layout, no h-scroll |
| 18 | Memory | Three full scrolls, check `gl.info` | Geometries/textures flat |
| 19 | Bundle | Build + visualiser | ≤ 900 KB gz initial JS |
| 20 | Network failure | Block the 3D chunk | Fallback readable immediately |
| 21 | Print | Print the inventory table | White background, readable |
| 22 | Deep link | Open at a mid-page anchor | Lands correctly, rail updates |
| 23 | Refresh mid-page | Reload at t≈0.5 | Restores position (see §3.8) |
| 24 | Accuracy spot check | 3 random numbers traced to a NASA URL | All trace |
| 25 | Credit check | Every image/audio has its line | All credited |


## 3.8 — Edge cases that will bite you

**Refresh mid-page.** Browsers restore scroll position. Because `progress` is derived
from `scrollY`, a restored scroll is harmless *if* `setProgress` runs once on mount
before the first frame — it does, via the `onScroll()` call in `useLenis`. Verify.
For a cleaner feel, consider `history.scrollRestoration = 'manual'` and restoring
to the top; for a hackathon, prefer restoring, because a judge who refreshes should
land where they were.

**Deep links.** Any scene should be linkable. Implement `#s1.1` style anchors: on
load, read the hash, find the beat, `lenis.scrollTo(t0 * pageHeight)`. The rail and
the table use these. Cost: twenty lines. Value: judges linking each other to a scene.

**Tab hidden, then visible.** Lenis stops, R3F's `frameloop` keeps requesting
frames. Ensure the store flag pauses chapter animation, and restart Lenis on
`visibilitychange`. Test by switching tabs for 30 seconds and returning: no burst of
catch-up motion.

**Slow first load.** The 3D chunk is the heaviest asset. Show the fallback copy
immediately (it is already in the DOM), then swap to the canvas when ready. Never
show a spinner for more than 1.5 s; never a blank screen.

**A missing image.** Every `<img>` needs `width`, `height`, and a fallback: if a
Mars photograph 404s, the caption and the credit must still render. Use an `onError`
that hides the image and keeps the figure.

**Audio autoplay policy.** `audio.play()` will reject until a gesture. Handle the
promise rejection and show "tap to allow audio" rather than failing silently.

**iOS Safari 100vh.** `100vh` is a lie on iOS. Use `100dvh` with a `100vh` fallback,
and compute `pageHeight` from `documentElement.scrollHeight`, never from a
multiplied viewport unit.

**Two-finger zoom on mobile.** `touch-action: pan-y` on the scroll track; never
`none`. Do not disable pinch-zoom — it is an accessibility requirement.

**Fonts.** Self-hosted woff2 with `font-display: swap`. A blocking font on 4G costs
you your first-contentful-paint score. Preload only the body regular.

**A judge opens the site in an iframe preview.** Some embeds block WebGL. Your
capability detection must fall back, not blank out. Test by embedding locally in an
iframe with `sandbox="allow-scripts"`.


## 3.9 — The two-minute demo video (script it, do not improvise)

Record at 1440 × 900, 60 fps, browser at 100 % zoom, sound on, cursor hidden.

| Time | What is on screen | What you say (voiceover) |
|---|---|---|
| 0:00–0:08 | Star field, rail fades in | "A few hundred billion stars. One of them is ours." |
| 0:08–0:20 | Descent through sun and planets, then **the door** into paper | "NASA's archive has a number for every object it ever sent up." |
| 0:20–0:32 | The catalog record types in; the "fate unknown" line holds | "And where NASA doesn't know what happened, it says so." |
| 0:32–0:52 | Eagle on the Moon, footpad scale, the still-working toggle | "Some of it is still working. One mirror, and it needs no power." |
| 0:52–1:08 | Intrepid + Surveyor, the 180 m ruler, the moonquake | "This one had been dead for two and a half years before anyone came to visit." |
| 1:08–1:22 | LRV deployment, the odometer, the RTG diagram | "Three of these cars are parked up there. Between them they drove ninety kilometres." |
| 1:22–1:38 | Mars: Viking, the weather log breaking mid-tick | "Viking 1 sent weather reports for six years. It died to a typo in a command." |
| 1:38–1:52 | Ingenuity flight — **and the freeze** | "This flew seventy-two times. Watch what happens here." *(let the freeze sit)* |
| 1:52–2:06 | Anywhere: Pioneer 10, the plaque, Kepler's 2,600 | "One of them is still going, and no longer speaking." |
| 2:06–2:20 | The inventory table, sorting, filtering | "Every object. Every coordinate. Every date it went quiet." |
| 2:20–2:30 | The closing litany, then the title card | "None of them are lost. All of them are filed. Abandoned, but not forgotten." |

Rules: never move the cursor, never open a menu, never scroll fast enough to blur,
and **always** show the freeze for a full three seconds. Finish on the title card,
not on the UI.


## 3.9b — Copy deck for the interface (so nobody improvises microcopy)

Every string the UI needs that is **not** narrative copy, decided once. Put these in
`src/data/ui-copy.ts` and never type them inline.

| Key | String | Where |
|---|---|---|
| `rail.hint` | `Scroll to descend` | fades out after 4 s |
| `label.toggle` | `Labels` | footer |
| `label.off` | `Labels off` | footer, active state |
| `mode.reading` | `Reading mode` | footer |
| `mode.immersive` | `Immersive mode` | footer, when in reading mode |
| `map.title` | `Where they are` | map overlay heading |
| `map.note` | `Schematic. Positions from published coordinates; not a navigation aid.` | always visible |
| `map.noteMars` | `Four sites are named in the source material without published coordinates.` | Mars map |
| `table.title` | `The full inventory` | heading |
| `table.sortYear` | `Sort by date` | control |
| `table.sortDistance` | `Sort by distance` | control |
| `table.filter` | `Still working` | toggle |
| `table.filterNote` | `Nothing on this list that needed power is still running.` | caption when on |
| `table.unknownDate` | `The source does not state a precise date.` | tooltip on dotted rows |
| `drawer.note` | `Where NASA says 'not known', our website says 'not known'.` | Scene 0.2 |
| `signal.ours` | `our estimate at today's distance — NASA's last measurement was 11 h 20 min` | `SignalDelay` |
| `signal.nasaLabel` | `NASA, last signal, 23 January 2003` | `SignalDelay`, above the larger figure |
| `quake.note` | `A record of an artificial impact, not an audio recording.` | `MoonquakeWaveform` |
| `audio.warn` | `Recorded on Mars, 1 December 2018. Contains low-frequency rumble.` | first play |
| `audio.credit` | `NASA/JPL-Caltech/CNES/IPGP/Imperial College/Cornell` | always visible |
| `freeze.caption` | `Rotor damage. The last flight was 18 January 2024.` | static during the freeze |
| `descent.note` | `Distances and body sizes in the descent are compressed for legibility. Object dimensions are to scale.` | credits |
| `door.caption` | `NASA's permanent archive for space science mission data.` | Scene 0.2 |
| `end.line` | `Abandoned, but not forgotten.` | Scene 6.2 |
| `error.widget` | `This diagram failed to load.` | widget error boundary |
| `error.gl` | `This device can't run the 3D view, so here's the whole story in text.` | fallback notice |
| `footer.disclaimer` | *(the verbatim non-endorsement text from PART 0 §0.21)* | footer + credits |

Rules: sentence case everywhere except rail labels and widget titles (uppercase via
CSS, not in the string). No exclamation marks. No emoji. No arrows in strings (`→`
is allowed only in `DescentLadder` and the rail, and comes from CSS `::after`). No
"click here" — use the verb: *"Open the map"*, *"Read the sources"*.

## 3.9c — Where the numbers live, and the one-page data audit

Before the final gate, run this audit and paste the result into the submission PDF.
It is the single most persuasive artefact a NASA panel can receive from a student
team: a table proving every number on screen has a home.

| On screen | Rendered by | From | NASA page |
|---|---|---|---|
| `0.67416° N, 23.47314° E` | Scene 1.1 heading, map pin | `objects.ts → 1969-059C.lat/lon` | NSSDCA 1969-059C |
| `9.4 m` footpad span | Scene 1.1 widget | `1969-059C.hardFacts[3]` | NSSDCA 1969-059C |
| `04:40:39 UT` EASEP on | Scene 1.1 copy | `1969-059C.hardFacts[9]` | NSSDCA 1969-059C |
| `27 Aug 1969` quiet | Scene 1.1, table | `1969-059C.wentQuiet` | NSSDCA 1969-059C |
| `180 m` to Surveyor 3 | Scene 1.2, ruler | `1969-099C.hardFacts[3]` | NSSDCA 1969-099C |
| `6,326` TV images | Scene 1.2 | `surveyor-3.hardFacts[6]` | Surveyor 3 |
| `98 kPa` bearing | Scene 1.2 | `surveyor-3.hardFacts[8]` | Surveyor 3 |
| `14:21 UT / 30 Sep 1977` | Scene 1.2, 1.4, table | `1969-099C` | NSSDCA 1969-099C |
| `442 thermocouples` | Scene 1.3 `RtgDiagram` | `1971-063C.hardFacts[..]` | NSSDCA 1971-063C |
| `89.6 y` half-life | Scene 1.3 `RtgDiagram` | `1971-063C` | NSSDCA 1971-063C |
| `27.8 / 26.7 / 35.9 km` | Scene 1.3 `Odometer` | `lrv.hardFacts` | NSSDCA apollo_lrv |
| `210 kg`, `121 Ah`, `80:1` | Scene 1.3 | `lrv.hardFacts` | NSSDCA apollo_lrv |
| `22.483° N, 47.94° W` | Scene 2.1, map | `viking-1` | Viking 1 |
| `52,663` orbiter images | Scene 2.1 quote | `viking-1.quote` | Viking 1 |
| `11 Nov 1982` | Scene 2.1 `WeatherLog` | `viking-1.wentQuiet` | Viking 1 |
| `14 m/s`, `~15 bounces`, `~1 km` | Scene 2.2 `BounceCounter` | `pathfinder.hardFacts` | Mars Pathfinder |
| `2.3 billion bits` | Scene 2.2 | `pathfinder.hardFacts` | Mars Pathfinder |
| `7.7 / 45.16 / 45.22 km` | Scene 3.1 `OdometerWall` | `spirit`, `opportunity` | MER page |
| `11 Oct 2026` | Scene 3.1 | `opportunity.hardFacts` | MER page |
| `4.5° N, 135.9° E`, `600 km` | Scene 3.2, map | `insight` | InSight |
| `5–7 m/s` | Scene 3.2 audio caption | `insight.audioCredit` + copy | InSight |
| `72`, `128.8 min`, `17.0 km`, `24.0 m` | Scene 3.3 `FlightCounter` | `ingenuity.hardFacts` | Ingenuity |
| `1.8 kg`, `1.2 m` rotor | Scene 3.3 | `ingenuity.hardFacts` | Ingenuity |
| `27 Sep 2007`, `1 Nov 2018` | Scene 4.1 | `dawn` | Dawn |
| `6.4 km/h`, `69` photos, `−173 °C` | Scene 4.2 | `near-shoemaker.hardFacts` | NEAR Shoemaker |
| `51,682 km/h`, `12.23 B km`, `11 h 20 min` | Scene 5.1 `SignalDelay` | `pioneer-10.hardFacts` | Pioneer 10 |
| `118.824 AU`, `~2,000,000 y` | Scene 5.1 | `pioneer-10.hardFacts` | Pioneer 10 |
| `2,600+`, `20–50 %`, `500,000+` | Scene 5.2 | `kepler.hardFacts` | Kepler / K2 |
| all fifteen rows | Scene 6.1 table | `OBJECTS` | fifteen pages |

If a row in this audit cannot be filled, the number does not ship. Print the audit,
sign it, put it in the PDF.

## 3.10 — Deployment runbook

**Host.** Vercel (or Netlify). Framework preset: Vite. Build: `npm run build`.
Output: `dist`. Node 20.

**Pre-deploy checklist.**
1. `npm ci && npm run build` on a clean clone of `main`.
2. `npm run check-data && npm run check-copy && npm run check-credits`.
3. Bundle budget verified.
4. `index.html` has: `<title>`, `<meta name="description">`, OG tags, `theme-color`
   `#05070d`, `lang="en"`, and a `<link rel="preload">` for the body font.
5. `robots.txt` and a `sitemap.xml` (one page is fine — SEO is a scored category).
6. No `console.log` in production except the governor (guard with `import.meta.env.DEV`).
7. No source maps shipped publicly (or ship them — but decide, and be consistent).
8. `favicon` present, and the OG image is a real frame from the door transition.

**Headers.**
```
Cache-Control: public, max-age=31536000, immutable      # /assets/*
Cache-Control: public, max-age=3600                     # /img/*, /audio/*
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
```

**Post-deploy verification (5 minutes).**
1. Open the production URL in an incognito window on a phone, over cellular.
2. Scroll to the freeze. Confirm it holds.
3. Open with WebGL disabled. Confirm the fallback.
4. Run Lighthouse on production. Record the four scores in `docs/ACCEPTANCE.md`.
5. Click every link in the credits. All fifteen NASA URLs must resolve.
6. Refresh mid-page; confirm the position restores.
7. Sharpen the QR code to the deployment for the judges' table.

**If something breaks at H45:** roll back to the last green commit, deploy that, and
fix forward in a branch. Never debug on production during submission hour.


## 3.11 — Final acceptance gate (the last hour, nothing else)

Answer all ten, out loud, together:

1. Does the story make sense with the sound off, on a phone, without reading a word?
2. Can a stranger identify the LM, the LRV and Ingenuity from silhouette?
3. Is every number on screen traceable to a NASA page?
4. Does every quote match the source character for character?
5. Is every image and audio file credited, visibly?
6. Is the non-endorsement notice reachable from every screen?
7. Does the site work with reduced motion, with no WebGL, and with JS animation off?
8. Can you complete the whole journey with the keyboard alone?
9. Does the fallback read *well* — would you send it to a friend?
10. Is `docs/ACCEPTANCE.md` signed and complete?

If any answer is no, that is the only thing you work on. Everything else is done.


## 3.12 — The submission package

Prepare all six; a hacked-together submission loses to a documented one.

1. **Deployed URL** + a QR code in the slide deck.
2. **Two-minute video** (§3.9), uploaded, not screen-recorded live.
3. **`README.md`** — what it is, the stack, how to run, the fifteen NASA sources,
   the accuracy rules, the non-endorsement notice.
4. **`docs/ACCEPTANCE.md`** — the QA matrix and the per-scene accuracy sign-off.
5. **A one-page PDF** with: the pitch paragraph, three screenshots (the door, the
   freeze, the table), and the source ledger.
6. **The submission-form paragraph**, verbatim:

> *We built a scroll-driven atlas of the NASA hardware still sitting on the Moon and
> Mars, and of the four objects that left the neighbourhood entirely. Every scene asks
> one question: if we abandoned the machine, why do we still know exactly where it is?
> The answer is the NSSDCA archive — and the archive is the product. The visitor falls
> from the Milky Way to a single footpad and arrives at a filing cabinet.*

**Optional but strong:** a 20-second vertical cut for social, ending on the freeze.
Judges see a lot of entries; the one they remember is the one with a three-second
silence in it.


## 3.12b — Judge-proofing: the seven questions you will be asked

Rehearse these answers. They are short on purpose.

**1. "Where did the data come from?"**
Every number is from one of fifteen NASA pages — the NSSDCA spacecraft records and
NASA Science mission pages — listed in `src/data/sources.ts`, printed in the credits,
and traceable row by row in the audit table. Where NASA says it does not know
something, the site says it does not know.

**2. "Isn't this just space junk?"**
No, and we are careful about the language. These are catalogued, located, identified
pieces of heritage hardware at rest on two worlds. The site is about the archive, not
about debris risk. We never use the word "junk" anywhere.

**3. "Why scrolling?"**
Because the subject is scale. A menu cannot deliver the feeling of falling from a
galaxy to a footpad. Scroll is the only input that is continuous, reversible, and
already in everyone's hands. There is no click required to advance and no scroll
hijacking — the scrollbar always works.

**4. "What if I don't have WebGL?"**
Then you get the whole site — all seventeen scenes, all the copy, all the numbers, the
sortable inventory — as a designed reading experience. It is not a stub. Toggle
"Reading mode" and I'll show you.

**5. "How is this accessible?"**
The 3D is decorative and `aria-hidden`. The narrative lives in the DOM in reading
order, with the full text of each scene available to a screen reader regardless of
scroll position. Full keyboard operation, reduced-motion support, 7:1 contrast on body
text, and a reading-mode toggle.

**6. "What's the hardest technical thing here?"**
One camera, driven by one number, across seven scenes with correct relative scale on
thirteen procedurally modelled spacecraft — while a completely independent DOM layer
narrates and teaches over the top, and neither half ever blocks the other. And a
three-percent scroll window at the Ingenuity scene where absolutely nothing moves.

**7. "What would you do next?"**
Add Phoenix, Apollo 16 and Apollo 17 with new sources, publish a plain printable
coordinates page, and open-source the thirteen spacecraft models, correctly scaled.
The architecture already supports it: one record, one beat, one model, one scene.

## 3.12c — Risk register (what actually threatens this submission)

| Risk | Likelihood | Impact | Mitigation | Owner |
|---|---|---|---|---|
| Integration eats a whole day | High | High | Contracts frozen at H2; the 8-minute audit at every merge | both |
| Mobile performance collapses | High | High | Governor from M2; test on a real device at H24; cut order ready | niv |
| Accuracy drift during merge | Medium | High | Single source of truth in `objects.ts`; three check scripts on every push | pru |
| The fallback gets left as a stub | Medium | High | Scheduled as M6 with a ship test: "would you send this to a friend?" | pru |
| A judge opens it on a locked-down laptop | Medium | High | Capability detection + reading mode; tested at H46 in an incognito window | both |
| Someone retypes a quote | Medium | Medium | Quotes live in `QUOTES` only; components never contain literals | pru |
| 3D chunk fails on the deploy host | Low | High | Fallback is the loading state; error boundary; tested by renaming a chunk | niv |
| Two chapters mount at once | Low | Medium | `ChapterSwitch` renders exactly one, keyed; audit item 9 | niv |
| A missing image credit ships | Low | High | `check-credits` script blocks the push | pru |
| Scope creep in the last six hours | High | High | Code freeze at H36, written in PART 3 and agreed out loud | both |

## 3.12d — The ten-minute standup script (use it twice: H24 and H36)

Each of you answers these four questions in ninety seconds, no discussion until both
have spoken.

1. **What is done and verified?** (A milestone letter, plus the evidence — a passing
   check script, a measured fps number, a screenshot.)
2. **What is done but unverified?** (This is where the surprises live.)
3. **What is blocked, and on whom?** (Name the file, not the feeling.)
4. **What will you cut if the clock stopped now?** (Answering this out loud makes the
   cut order real.)

Then, together, one decision: **is the cut list triggered?** If either of you says yes,
apply it immediately and re-plan the remaining hours against the smaller scope. A
smaller finished site beats a larger unfinished one in every judging rubric ever
written.

## 3.13 — The pitch, if you get ninety seconds on stage

Say this, in this order, and stop:

> "There are fifteen pieces of NASA hardware on the Moon and Mars right now, and we
> know the coordinates of every single one. Not roughly — to five decimal places,
> because someone wrote it down and someone else checked it. So we made a site where
> you fall from the Milky Way to a footpad in one scroll, and at the end you land on a
> catalog record. The machines were abandoned. The addresses were not.
>
> *(pause)*
>
> Everything you'll see is sourced from NASA's own archive. Where NASA doesn't know
> something, we say we don't know. And if you're on a laptop that won't run 3D —
> *(gesture)* — it reads beautifully without it."

Then play the freeze. Do not explain the freeze. Let them watch it.


## 3.13b — If you have an on-stage demo instead of a video

Live demos fail. Prepare for it in this order.

1. **Pre-load everything.** Open the site, scroll to the end once, scroll back to the
   top. The 3D chunk, fonts and images are now cached. Never demo cold on conference
   wifi.
2. **Have the video ready in a tab.** If the live site stalls, switch tabs and keep
   talking. Do not debug on stage.
3. **Know three scroll targets by heart:** the door (for the opening), the Viking
   weather log (for the emotional turn), the Ingenuity freeze (for the close). Drive
   with `End`/`Home` and the scrollbar, not with a trackpad.
4. **Never scroll fast on stage.** Fast scrolling hides the two moments that matter.
   Slow down; the silence is the demo.
5. **Keep one laptop on the fallback path.** If the projector machine has no WebGL,
   you switch to the reading-mode machine and the pitch still works — because the
   argument never depended on the renderer.
6. **End on the title card and stop talking.** The last line on screen is the last line
   you say.

## 3.14 — Post-submission: what to do with the repo

If you have time after submitting (or for a portfolio), in this order:

1. **Add the remaining objects properly** — Phoenix, Apollo 16, Apollo 17 — with new
   sources, new scenes, new models. The architecture already supports it: one record,
   one beat, one model, one scene entry.
2. **Ship a "coordinates" page** — a plain, printable list of all fifteen objects with
   NSSDCA IDs and source links. It is the most linkable page the site could have.
3. **Write the sourcing note** — a short essay on what it means that the archive
   remembers the position but not always the fate. This is the intellectual content
   the project is gesturing at, and it would make the work citable.
4. **Open-source the models** — thirteen procedural spacecraft, correctly scaled,
   MIT-licensed. That is genuinely useful to other teams and costs you nothing.
5. **Do not add features.** The site is finished because it stops. That is the whole
   argument of its subject.

## 3.14b — Closing note to the two of you

Three things worth saying plainly, because they are the things that actually decide
whether this works.

**The seam is one number.** Two people, two codebases, one `progress` value and one
frozen file of timings. Every hour you spend protecting that boundary is repaid twice.
Every shortcut through it — a quick scroll listener in a chapter, a camera move on a
click, "just this once" — costs you an evening.

**The facts are the design.** The reason this project can be beautiful is that it does
not need to invent anything. A lander that died of a typo. A mirror that works without
power. A helicopter that was built for five flights and made seventy-two. A telescope
that found two thousand six hundred worlds and then simply ran out. Those are better
than anything either of you could write. Your job is to get out of their way: place the
number, hold the frame, and be quiet.

**The fallback is not the backup plan, it is the argument.** A site that says "someone
kept the record" has to be readable by everyone, on every machine, including the
locked-down laptop on the judges' table. Build it with the same care as the descent,
and it becomes the most persuasive thing in the submission — because it proves you
meant it.

Good luck. Ship it, then stop.

---

*Prepared 15 November 2026 · companion to `Abandoned_But_Not_Forgotten_Storytelling_Script.pdf`
and `MASTER_PROMPT_Antigravity_Nivish_Pruthvik.md` · every fact in these four parts is
traceable to a NASA page named in PART 0 §0.18 and in `src/data/sources.ts`.*
