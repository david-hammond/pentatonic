import Anthropic from '@anthropic-ai/sdk'
import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUTPUT_PATH = join(__dirname, '..', 'public', 'data', 'prompts.json')

const SYSTEM_PROMPT = `You are helping create writing prompts for songwriters doing object writing exercises.

Object writing is a technique where writers explore a topic using all their senses (sight, sound, taste, touch, smell) plus motion and emotion. The goal is to generate evocative, specific prompts that spark sensory exploration.

Generate diverse prompts across these categories:
- Concrete objects (cigarette, rusted key, vinyl record)
- Settings/places (hospital waiting room, dive bar at 2am, childhood bedroom)
- Sensory experiences (fluorescent light hum, gasoline smell, velvet texture)
- Abstract concepts made concrete (Sunday morning loneliness, 3am anxiety, first kiss nervousness)
- Weather/nature (fog rolling in, summer thunderstorm, frost on glass)
- Everyday moments (coffee going cold, missed phone call, loose thread)

Guidelines:
- Be specific and evocative, not generic
- Avoid clichés and overused songwriting tropes
- Mix simple (one word) with complex (short phrases)
- Include some unexpected or unusual prompts
- Prompts should spark sensory exploration, not complete song ideas`

async function generatePrompts() {
  const apiKey = process.env.ANTHROPIC_API_KEY

  if (!apiKey) {
    console.error('Error: ANTHROPIC_API_KEY environment variable is required')
    console.error('Usage: ANTHROPIC_API_KEY=your-key npm run generate')
    process.exit(1)
  }

  const client = new Anthropic({ apiKey })

  console.log('Generating prompts with Claude Haiku...')

  try {
    const response = await client.messages.create({
      model: 'claude-3-5-haiku-latest',
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: `Generate exactly 200 object writing prompts. Return them as a JSON array of strings, nothing else. No markdown, no explanation, just the JSON array.

Example format:
["cigarette smoke", "hospital waiting room", "rust on metal", "fluorescent light hum"]

Generate 200 diverse, evocative prompts now:`,
        },
      ],
    })

    const content = response.content[0].text.trim()

    // Parse the JSON response
    let prompts
    try {
      prompts = JSON.parse(content)
    } catch (parseError) {
      // Try to extract JSON array if wrapped in other text
      const match = content.match(/\[[\s\S]*\]/)
      if (match) {
        prompts = JSON.parse(match[0])
      } else {
        throw new Error('Could not parse prompts from response')
      }
    }

    if (!Array.isArray(prompts) || prompts.length === 0) {
      throw new Error('Invalid prompts format received')
    }

    // Ensure output directory exists
    const outputDir = dirname(OUTPUT_PATH)
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true })
    }

    // Write prompts to file
    writeFileSync(OUTPUT_PATH, JSON.stringify(prompts, null, 2))

    console.log(`Successfully generated ${prompts.length} prompts`)
    console.log(`Saved to: ${OUTPUT_PATH}`)
  } catch (error) {
    console.error('Error generating prompts:', error.message)
    process.exit(1)
  }
}

generatePrompts()
