export const SHOW = 'element-loader/SHOW'
export const HIDE = 'element-loader/HIDE'
export const SET_ELEMENT = 'element-loader/SET_ELEMENT'

export function showElement(prefix) {
  return {
    type: SHOW,
    prefix
  }
}

export function hideElement(prefix) {
  return {
    type: HIDE,
    prefix
  }
}

export function setElement(prefix){
  return {
    type: SET_ELEMENT,
    prefix
  }
}

export default function elementLoaderReducer(state = {}, action) {

  const prefix = action.prefix

  switch (action.type) {
    case SET_ELEMENT:
      return {
        ...state,
        [prefix]: 0
      }
    case SHOW:
      return {
        ...state,
        [prefix]: state[prefix] + 1
      }
    case HIDE:
      return {
        ...state,
        [prefix]: state[prefix] > 0 ? state[prefix] - 1 : 0
      }
    default:
      return state
  }
}
