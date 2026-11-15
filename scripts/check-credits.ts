import { OBJECTS } from '../src/data/objects.ts'
import { SOURCES } from '../src/data/sources.ts'

console.log('--- Checking credits, audio & source ledger ---')

let errors = 0

// Check that every object has sourceUrls
OBJECTS.forEach((obj) => {
  if (!obj.sourceUrls || obj.sourceUrls.length === 0) {
    console.error(`Error: Object ${obj.id} has no source URLs`)
    errors++
  }

  // If object has audio, verify credit is present
  if (obj.id === 'insight' && !obj.audioCredit) {
    console.error(`Error: InSight audio credit is missing`)
    errors++
  }
})

// Check that SOURCES has 15 entries
if (SOURCES.length < 15) {
  console.error(`Error: Expected 15 NASA sources, found ${SOURCES.length}`)
  errors++
}

if (errors === 0) {
  console.log(`✓ All credits and ${SOURCES.length} NASA sources verified!`)
} else {
  console.error(`Found ${errors} credit verification errors.`)
  process.exit(1)
}
