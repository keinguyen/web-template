export function safeRun (fn, ...args) {
  return typeof fn === 'function' && fn(...args)
}
