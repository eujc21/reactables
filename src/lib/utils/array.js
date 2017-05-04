export const findAdditions = (current = [], next = []) =>{

  if(!Array.isArray(current) || !Array.isArray(next))
    return console.error('args must be an array')

  return next.filter(val => current.indexOf(val) === -1)
}
