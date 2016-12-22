export function getTop(el){
  const element = el.getBoundingClientRect()
  const body = document.body
  const doc = document.documentElement

  const scrollTop = window.pageYOffset || doc.scrollTop || body.scrollTop
  const clientTop = doc.clientTop || body.clientTop || 0

  return element.top +  scrollTop - clientTop
}