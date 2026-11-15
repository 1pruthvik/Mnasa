import { SCENES } from '../src/data/scenes.ts'

console.log('--- Checking copy, tone & vocabulary rules ---')

const BANNED_WORDS = ['junk', 'trash', 'wreck', 'garbage', 'graveyard', 'litter']

let errors = 0

Object.entries(SCENES).forEach(([sceneId, def]) => {
  if (def.copy.length === 0) {
    console.error(`Error: Scene ${sceneId} has no copy paragraphs`)
    errors++
  }

  def.copy.forEach((paragraph, idx) => {
    // Check banned words, allowing explicit negation from the script ("not a story about garbage", "not visiting a wreck")
    const lower = paragraph.toLowerCase()
    BANNED_WORDS.forEach((banned) => {
      const regex = new RegExp(`(?<!not\\s+(?:a\\s+story\\s+about\\s+|visiting\\s+a\\s+))\\b${banned}\\b`, 'i')
      if (regex.test(lower)) {
        console.error(`Error: Scene ${sceneId} paragraph ${idx + 1} contains banned word: "${banned}"`)
        errors++
      }
    })

    // Word count check
    const words = paragraph.trim().split(/\s+/).length
    if (words > 45) {
      console.warn(`Warning: Scene ${sceneId} paragraph ${idx + 1} has ${words} words (recommended cap is 45)`)
    }
  })
})

if (errors === 0) {
  console.log(`✓ All ${Object.keys(SCENES).length} scenes passed copy & vocabulary audit!`)
} else {
  console.error(`Found ${errors} tone/copy violations.`)
  process.exit(1)
}
