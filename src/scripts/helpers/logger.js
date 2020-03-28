export function log (...args) {
  window.enableConsole && console.log('[LOG] >>', ...args)
}

export function trace (...args) {
  window.enableConsole && console.trace('[TRACE] >>', ...args)
}

export function error (...args) {
  console.error('[ERROR] >>', ...args)
}

export function warn (...args) {
  console.warn('[WARN] >>', ...args)
}

export default { log, trace, error, warn }
