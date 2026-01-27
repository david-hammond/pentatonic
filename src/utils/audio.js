let audioContext = null

function getAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)()
  }
  return audioContext
}

export function playChime() {
  try {
    const ctx = getAudioContext()

    // Resume audio context if suspended (required for mobile)
    if (ctx.state === 'suspended') {
      ctx.resume()
    }

    const now = ctx.currentTime

    // Create a pleasant chime with two tones
    const frequencies = [523.25, 659.25] // C5 and E5

    frequencies.forEach((freq, index) => {
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)

      oscillator.type = 'sine'
      oscillator.frequency.setValueAtTime(freq, now)

      // Envelope: quick attack, gentle decay
      const startTime = now + index * 0.1
      gainNode.gain.setValueAtTime(0, startTime)
      gainNode.gain.linearRampToValueAtTime(0.3, startTime + 0.02)
      gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + 1.5)

      oscillator.start(startTime)
      oscillator.stop(startTime + 1.5)
    })
  } catch (error) {
    // Graceful fallback - audio not available
    console.log('Audio not available:', error.message)
  }
}
