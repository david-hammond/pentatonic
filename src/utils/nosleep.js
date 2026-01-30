/**
 * NoSleep.js utility wrapper
 * Prevents screen from sleeping during timer
 */

import NoSleep from 'nosleep.js'

// Singleton instance
let noSleepInstance = null

function getNoSleepInstance() {
  if (!noSleepInstance) {
    noSleepInstance = new NoSleep()
  }
  return noSleepInstance
}

/**
 * Enable wake lock to prevent screen sleep
 * MUST be called from a user gesture (button click, touch event, etc.)
 */
export async function enableNoSleep() {
  try {
    console.log('🔒 Attempting to enable NoSleep...')
    console.log('- Browser:', navigator.userAgent)
    console.log('- Has wakeLock API?', 'wakeLock' in navigator)
    console.log('- Is HTTPS?', window.location.protocol === 'https:')

    const noSleep = getNoSleepInstance()

    console.log('- Calling noSleep.enable()...')
    await noSleep.enable()

    console.log('✅ NoSleep enabled successfully!')
    console.log('- noSleep.isEnabled:', noSleep.isEnabled)

    // Always show alert for debugging
    const info = `✅ NoSleep enabled!\n\nwakeLock API: ${'wakeLock' in navigator ? 'YES' : 'NO'}\nHTTPS: ${window.location.protocol === 'https:' ? 'YES' : 'NO'}\nisEnabled: ${noSleep.isEnabled}`
    alert(info)

    return true
  } catch (error) {
    console.error('❌ Failed to enable NoSleep:', error)
    console.error('- Error name:', error.name)
    console.error('- Error message:', error.message)

    // Always show error alert
    alert('❌ NoSleep FAILED!\n\nError: ' + error.message + '\n\nwakeLock API: ' + ('wakeLock' in navigator ? 'YES' : 'NO'))

    return false
  }
}

/**
 * Disable wake lock to allow screen sleep
 * Can be called anytime (no user gesture required)
 */
export async function disableNoSleep() {
  try {
    const noSleep = getNoSleepInstance()
    await noSleep.disable()
    console.log('✓ NoSleep disabled - screen can sleep')
  } catch (error) {
    console.error('Failed to disable NoSleep:', error)
  }
}

/**
 * Check if NoSleep is currently enabled
 */
export function isNoSleepEnabled() {
  return noSleepInstance && noSleepInstance.isEnabled
}
