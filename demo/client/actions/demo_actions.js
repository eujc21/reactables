import { CALL_API, Methods } from '../middleware/api'

export const DEMO_CALL_REQUEST = 'DEMO_CALL_REQUEST'
export const DEMO_CALL_SUCCESS = 'DEMO_CALL_SUCCESS'
export const DEMO_CALL_FAILURE = 'DEMO_CALL_FAILURE'

export function demoCall(){
  return {
    [CALL_API]:{
      types: [DEMO_CALL_REQUEST, DEMO_CALL_SUCCESS, DEMO_CALL_FAILURE],
      method: Methods.GET,
      endpoint: 'test'
    }
  }
}

export const UPDATE_INPUT_TEXT = 'UPDATE_INPUT_TEXT'

export function updateInputText(text){
  return {
    type: UPDATE_INPUT_TEXT,
    text
  }
}

export const INCREMENT_COMPLETED = 'INCREMENT_COMPLETED'

export function incrementCompleted(increment){
  return {
    type: INCREMENT_COMPLETED,
    increment
  }
}

export const TOGGLE_PANEL = 'TOGGLE_PANEL'

export function togglePanel(isVisible){
  return {
    type: TOGGLE_PANEL,
    isVisible
  }
}