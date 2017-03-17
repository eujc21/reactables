export const INCREMENT_LIST = 'INCREMENT_LIST'
export function incrementList(listIndex){
  return {
    type: INCREMENT_LIST,
    listIndex
  }
}