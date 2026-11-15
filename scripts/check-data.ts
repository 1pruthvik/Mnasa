import { OBJECTS } from '../src/data/objects.ts'
import { BEATS } from '../src/contracts/beats.ts'

console.log('--- Checking objects & data integrity ---')

const beatSceneIds = new Set(BEATS.map((b) => b.sceneId))

let errors = 0

OBJECTS.forEach((obj) => {
  if (!beatSceneIds.has(obj.sceneId)) {
    console.error(`Error: Object ${obj.id} has invalid sceneId: ${obj.sceneId}`)
    errors++
  }

  obj.sourceUrls.forEach((url) => {
    if (!url.startsWith('https://')) {
      console.error(`Error: Object ${obj.id} has non-HTTPS source URL: ${url}`)
      errors++
    }
  })

  if (obj.hardFacts.length === 0) {
    console.error(`Error: Object ${obj.id} has no hardFacts`)
    errors++
  }

  if (obj.lat !== undefined && (obj.lat < -90 || obj.lat > 90)) {
    console.error(`Error: Object ${obj.id} has invalid latitude: ${obj.lat}`)
    errors++
  }

  if (obj.lon !== undefined && (obj.lon < -180 || obj.lon > 180)) {
    console.error(`Error: Object ${obj.id} has invalid longitude: ${obj.lon}`)
    errors++
  }
})

if (errors === 0) {
  console.log(`✓ All ${OBJECTS.length} canonical objects passed data integrity audit!`)
} else {
  console.error(`Found ${errors} data integrity errors.`)
  process.exit(1)
}
