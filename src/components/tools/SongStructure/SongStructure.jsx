import { useState } from 'react'
import './SongStructure.css'

const SONG_STRUCTURES = [
  {
    name: 'Verse-Chorus',
    description: 'Most common pop/rock structure',
    sections: ['Intro', 'Verse 1', 'Chorus', 'Verse 2', 'Chorus', 'Bridge', 'Chorus', 'Outro'],
    examples: ['Most pop songs', 'Rock anthems'],
  },
  {
    name: 'Verse-Chorus-Verse',
    description: 'Simple and effective',
    sections: ['Verse 1', 'Chorus', 'Verse 2', 'Chorus', 'Verse 3', 'Chorus'],
    examples: ['Folk songs', 'Country ballads'],
  },
  {
    name: 'AABA',
    description: 'Classic 32-bar form',
    sections: ['A (Verse)', 'A (Verse)', 'B (Bridge)', 'A (Verse)'],
    examples: ['Jazz standards', '"Yesterday" by Beatles'],
  },
  {
    name: 'ABABCB',
    description: 'Verse-Chorus with bridge',
    sections: ['Verse', 'Chorus', 'Verse', 'Chorus', 'Bridge', 'Chorus'],
    examples: ['Pop ballads', 'Modern rock'],
  },
  {
    name: '12-Bar Blues',
    description: 'Classic blues progression',
    sections: ['I-I-I-I', 'IV-IV-I-I', 'V-IV-I-V'],
    examples: ['Blues standards', 'Early rock & roll'],
  },
  {
    name: 'Through-Composed',
    description: 'No repeating sections',
    sections: ['A', 'B', 'C', 'D', '...'],
    examples: ['Art songs', 'Bohemian Rhapsody'],
  },
  {
    name: 'Verse-Pre-Chorus-Chorus',
    description: 'Builds anticipation',
    sections: ['Verse', 'Pre-Chorus', 'Chorus', 'Verse', 'Pre-Chorus', 'Chorus', 'Bridge', 'Chorus'],
    examples: ['Modern pop', 'EDM drops'],
  },
  {
    name: 'AAA (Strophic)',
    description: 'Same melody, different lyrics',
    sections: ['Verse 1', 'Verse 2', 'Verse 3', 'Verse 4'],
    examples: ['Folk ballads', '"Blowin\' in the Wind"'],
  },
]

const RHYME_STRUCTURES = [
  {
    name: 'ABAB',
    description: 'Alternate rhyme',
    pattern: ['A', 'B', 'A', 'B'],
    example: 'Roses are red (A)\nViolets are blue (B)\nSugar is sweet (A)\nAnd so are you (B)',
    usage: 'Ballads, hymns, sonnets',
  },
  {
    name: 'AABB',
    description: 'Couplets',
    pattern: ['A', 'A', 'B', 'B'],
    example: 'The cat sat on the mat (A)\nWearing a funny hat (A)\nIt looked at the door (B)\nThen lay on the floor (B)',
    usage: 'Nursery rhymes, hip-hop, pop hooks',
  },
  {
    name: 'ABCABC',
    description: 'Interlocking rhyme',
    pattern: ['A', 'B', 'C', 'A', 'B', 'C'],
    example: 'Three rhyme sounds\nweaving through\nthe verse structure\nmaking rounds\nold and new\nrich in texture',
    usage: 'Complex poetry, art songs',
  },
  {
    name: 'AABA',
    description: 'Classic song form',
    pattern: ['A', 'A', 'B', 'A'],
    example: 'Line one rhymes here (A)\nLine two rhymes near (A)\nLine three breaks free (B)\nLine four reappears (A)',
    usage: 'Tin Pan Alley, jazz standards',
  },
  {
    name: 'ABBA',
    description: 'Enclosed rhyme',
    pattern: ['A', 'B', 'B', 'A'],
    example: 'First line sets the tone (A)\nSecond line goes deep (B)\nThird continues steep (B)\nFourth returns back home (A)',
    usage: 'Sonnets, sophisticated pop',
  },
  {
    name: 'AAAA',
    description: 'Monorhyme',
    pattern: ['A', 'A', 'A', 'A'],
    example: 'Every line the same (A)\nRhyming is the game (A)\nBuilding up the flame (A)\nWriting without shame (A)',
    usage: 'Hip-hop verses, comedic effect',
  },
  {
    name: 'ABAC',
    description: 'Partial rhyme',
    pattern: ['A', 'B', 'A', 'C'],
    example: 'Some lines rhyme today (A)\nOthers stand alone (B)\nCome what may (A)\nIn a different zone (C)',
    usage: 'Folk, conversational lyrics',
  },
  {
    name: 'Free Verse',
    description: 'No fixed pattern',
    pattern: ['X', 'X', 'X', 'X'],
    example: 'Lines flow naturally\nWithout forced rhyme\nMeaning over sound\nFreedom in form',
    usage: 'Modern poetry, spoken word',
  },
]

const SECTION_INFO = {
  Intro: { bars: '4-8', purpose: 'Set the mood, hook the listener' },
  Verse: { bars: '8-16', purpose: 'Tell the story, build narrative' },
  'Verse 1': { bars: '8-16', purpose: 'Introduce the story/theme' },
  'Verse 2': { bars: '8-16', purpose: 'Develop the story/theme' },
  'Verse 3': { bars: '8-16', purpose: 'Conclude or twist the story' },
  'Pre-Chorus': { bars: '4-8', purpose: 'Build tension before chorus' },
  Chorus: { bars: '8-16', purpose: 'Main hook, emotional peak' },
  Bridge: { bars: '8', purpose: 'Contrast, new perspective' },
  Outro: { bars: '4-8', purpose: 'Resolve, fade out' },
  'A (Verse)': { bars: '8', purpose: 'Main melodic theme' },
  'B (Bridge)': { bars: '8', purpose: 'Contrasting middle section' },
}

export default function SongStructure({ onBack }) {
  const [mode, setMode] = useState('song')
  const [selectedStructure, setSelectedStructure] = useState(null)

  const structures = mode === 'song' ? SONG_STRUCTURES : RHYME_STRUCTURES

  return (
    <div className="song-structure">
      <button onClick={onBack} className="btn-back" aria-label="Back to home">
        &larr;
      </button>

      <div className="content">
        <h1>Structures</h1>

        {/* Mode Selector */}
        <div className="mode-selector">
          <button
            onClick={() => { setMode('song'); setSelectedStructure(null) }}
            className={`mode-btn ${mode === 'song' ? 'selected' : ''}`}
          >
            Song
          </button>
          <button
            onClick={() => { setMode('rhyme'); setSelectedStructure(null) }}
            className={`mode-btn ${mode === 'rhyme' ? 'selected' : ''}`}
          >
            Rhyme Scheme
          </button>
        </div>

        {!selectedStructure ? (
          <>
            <p className="intro-text">
              {mode === 'song' ? 'Choose a song structure' : 'Choose a rhyme scheme'}
            </p>
            <div className="structure-grid">
              {structures.map((structure) => (
                <button
                  key={structure.name}
                  onClick={() => setSelectedStructure(structure)}
                  className="structure-card"
                >
                  <span className="structure-name">{structure.name}</span>
                  <span className="structure-desc">{structure.description}</span>
                </button>
              ))}
            </div>
          </>
        ) : mode === 'song' ? (
          /* Song Structure Detail */
          <div className="structure-detail">
            <button onClick={() => setSelectedStructure(null)} className="btn btn-secondary back-btn">
              &larr; All Structures
            </button>

            <h2>{selectedStructure.name}</h2>
            <p className="detail-desc">{selectedStructure.description}</p>

            <div className="sections-flow">
              {selectedStructure.sections.map((section, i) => (
                <div key={i} className="section-item">
                  <span className="section-name">{section}</span>
                  {SECTION_INFO[section] && (
                    <span className="section-bars">{SECTION_INFO[section].bars} bars</span>
                  )}
                </div>
              ))}
            </div>

            <div className="section-details">
              <h3>Section Guide</h3>
              {[...new Set(selectedStructure.sections)].map((section) => {
                const info = SECTION_INFO[section]
                if (!info) return null
                return (
                  <div key={section} className="section-info">
                    <span className="info-name">{section}</span>
                    <span className="info-purpose">{info.purpose}</span>
                  </div>
                )
              })}
            </div>

            {selectedStructure.examples && (
              <div className="examples">
                <h3>Examples</h3>
                <ul>
                  {selectedStructure.examples.map((ex, i) => (
                    <li key={i}>{ex}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          /* Rhyme Structure Detail */
          <div className="structure-detail">
            <button onClick={() => setSelectedStructure(null)} className="btn btn-secondary back-btn">
              &larr; All Schemes
            </button>

            <h2>{selectedStructure.name}</h2>
            <p className="detail-desc">{selectedStructure.description}</p>

            <div className="rhyme-pattern">
              {selectedStructure.pattern.map((letter, i) => (
                <span key={i} className={`pattern-letter letter-${letter.toLowerCase()}`}>
                  {letter}
                </span>
              ))}
            </div>

            <div className="rhyme-example">
              <h3>Example</h3>
              <pre>{selectedStructure.example}</pre>
            </div>

            <div className="examples">
              <h3>Common Usage</h3>
              <p>{selectedStructure.usage}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
