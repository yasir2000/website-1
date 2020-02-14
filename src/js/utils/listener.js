function listener (el, a, type, cb, p) {
  const passive = p === true ? { passive: true } : false
  const action = a === 'a' ? 'add' : 'remove'
  el[action + 'EventListener'](type, cb, passive)
}

export default listener