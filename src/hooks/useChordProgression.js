import { useState, useCallback, useMemo } from 'react'

// Circle of fifths - clockwise
const CIRCLE_OF_FIFTHS = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Db', 'Ab', 'Eb', 'Bb', 'F']

// Enharmonic equivalents
const ENHARMONIC = {
  'F#': 'Gb',
  'Gb': 'F#',
  'Db': 'C#',
  'C#': 'Db',
}

// Scale degrees for major keys (chord qualities)
const MAJOR_SCALE_CHORDS = [
  { degree: 'I', quality: '', name: 'Tonic' },
  { degree: 'ii', quality: 'm', name: 'Supertonic' },
  { degree: 'iii', quality: 'm', name: 'Mediant' },
  { degree: 'IV', quality: '', name: 'Subdominant' },
  { degree: 'V', quality: '', name: 'Dominant' },
  { degree: 'vi', quality: 'm', name: 'Submediant' },
  { degree: 'vii°', quality: 'dim', name: 'Leading Tone' },
]

// Semitones from root for major scale
const MAJOR_INTERVALS = [0, 2, 4, 5, 7, 9, 11]

// All notes in chromatic order
const CHROMATIC = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
const CHROMATIC_FLAT = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']

// Common progressions with descriptions
const COMMON_PROGRESSIONS = [
  { numerals: ['I', 'IV', 'V', 'I'], name: 'Classic', description: 'Traditional resolution' },
  { numerals: ['I', 'V', 'vi', 'IV'], name: 'Pop', description: 'Most popular progression' },
  { numerals: ['I', 'vi', 'IV', 'V'], name: '50s', description: 'Doo-wop progression' },
  { numerals: ['ii', 'V', 'I'], name: 'Jazz', description: 'Jazz standard cadence' },
  { numerals: ['I', 'IV', 'vi', 'V'], name: 'Sensitive', description: 'Emotional ballad feel' },
  { numerals: ['vi', 'IV', 'I', 'V'], name: 'Minor Pop', description: 'Darker pop feel' },
  { numerals: ['I', 'V', 'IV', 'I'], name: 'Rock', description: 'Simple rock progression' },
  { numerals: ['I', 'bVII', 'IV', 'I'], name: 'Mixolydian', description: 'Rock/folk borrowed chord' },
]

function getNoteIndex(note) {
  const normalized = note.replace('b', 'b').replace('#', '#')
  let idx = CHROMATIC.indexOf(normalized)
  if (idx === -1) idx = CHROMATIC_FLAT.indexOf(normalized)
  return idx
}

function getNote(index, useFlats = false) {
  const normalized = ((index % 12) + 12) % 12
  return useFlats ? CHROMATIC_FLAT[normalized] : CHROMATIC[normalized]
}

function shouldUseFlats(key) {
  return ['F', 'Bb', 'Eb', 'Ab', 'Db', 'Gb'].includes(key)
}

function getChordsInKey(key) {
  const rootIndex = getNoteIndex(key)
  const useFlats = shouldUseFlats(key)

  return MAJOR_SCALE_CHORDS.map((chord, i) => {
    const noteIndex = rootIndex + MAJOR_INTERVALS[i]
    const root = getNote(noteIndex, useFlats)
    return {
      ...chord,
      root,
      chord: root + chord.quality,
    }
  })
}

function getCirclePosition(key) {
  const normalized = key.replace('Gb', 'F#').replace('C#', 'Db')
  return CIRCLE_OF_FIFTHS.indexOf(normalized)
}

function getRelatedKeys(key) {
  const pos = getCirclePosition(key)
  if (pos === -1) return []

  const len = CIRCLE_OF_FIFTHS.length
  return {
    dominant: CIRCLE_OF_FIFTHS[(pos + 1) % len], // Fifth above
    subdominant: CIRCLE_OF_FIFTHS[(pos - 1 + len) % len], // Fifth below
    relativeMinor: getNote(getNoteIndex(key) + 9, shouldUseFlats(key)) + 'm',
    parallelMinor: key + 'm',
  }
}

function getSuggestedNextChords(currentChord, key) {
  const chordsInKey = getChordsInKey(key)
  const suggestions = []

  // Find current chord's degree
  const currentDegree = chordsInKey.find(
    (c) => c.chord === currentChord || c.root === currentChord.replace('m', '').replace('dim', '')
  )

  if (!currentDegree) return chordsInKey.map((c) => c.chord)

  // Common chord movements based on music theory
  const movements = {
    I: ['IV', 'V', 'vi', 'ii'],
    ii: ['V', 'vii°', 'IV'],
    iii: ['vi', 'IV', 'ii'],
    IV: ['V', 'I', 'ii', 'vii°'],
    V: ['I', 'vi', 'IV'],
    vi: ['ii', 'IV', 'V', 'iii'],
    'vii°': ['I', 'iii'],
  }

  const nextDegrees = movements[currentDegree.degree] || ['I', 'IV', 'V']

  nextDegrees.forEach((degree) => {
    const found = chordsInKey.find((c) => c.degree === degree)
    if (found) suggestions.push(found.chord)
  })

  return suggestions
}

export function useChordProgression() {
  const [key, setKey] = useState('C')
  const [progression, setProgression] = useState([])

  const chordsInKey = useMemo(() => getChordsInKey(key), [key])
  const relatedKeys = useMemo(() => getRelatedKeys(key), [key])

  const suggestedNext = useMemo(() => {
    if (progression.length === 0) {
      return chordsInKey.slice(0, 4).map((c) => c.chord) // I, ii, iii, IV
    }
    const lastChord = progression[progression.length - 1]
    return getSuggestedNextChords(lastChord, key)
  }, [progression, key, chordsInKey])

  const addChord = useCallback((chord) => {
    setProgression((prev) => [...prev, chord])
  }, [])

  const removeLastChord = useCallback(() => {
    setProgression((prev) => prev.slice(0, -1))
  }, [])

  const clearProgression = useCallback(() => {
    setProgression([])
  }, [])

  const applyCommonProgression = useCallback(
    (numerals) => {
      const chords = numerals.map((numeral) => {
        // Handle borrowed chords like bVII
        if (numeral.startsWith('b')) {
          const degree = numeral.slice(1)
          const degreeIndex = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'].indexOf(degree.toUpperCase())
          if (degreeIndex !== -1) {
            const rootIndex = getNoteIndex(key) + MAJOR_INTERVALS[degreeIndex] - 1
            return getNote(rootIndex, shouldUseFlats(key))
          }
        }
        const found = chordsInKey.find((c) => c.degree.toLowerCase() === numeral.toLowerCase())
        return found ? found.chord : numeral
      })
      setProgression(chords)
    },
    [key, chordsInKey]
  )

  return {
    key,
    setKey,
    progression,
    chordsInKey,
    relatedKeys,
    suggestedNext,
    commonProgressions: COMMON_PROGRESSIONS,
    circleOfFifths: CIRCLE_OF_FIFTHS,
    addChord,
    removeLastChord,
    clearProgression,
    applyCommonProgression,
  }
}
