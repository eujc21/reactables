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

export const SET_PAGE_SCROLL_POSITION = 'SET_PAGE_SCROLL_POSITION'
export function setPageScrollPosition(position){
  return {
    type: SET_PAGE_SCROLL_POSITION,
    position
  }
}

export const SET_MOBILE_VIEW = 'SET_MOBILE_VIEW'
export function setMobileView(isMobile){
  return {
    type: SET_MOBILE_VIEW,
    isMobile
  }
}

export const UPDATE_INPUT_TEXT = 'UPDATE_INPUT_TEXT'
export function updateInputText(text){
  return {
    type: UPDATE_INPUT_TEXT,
    text
  }
}

export const UPDATE_FILTER_INPUT_TEXT = 'UPDATE_FILTER_INPUT_TEXT'
export function updateFilterInputText(text){
  return {
    type: UPDATE_FILTER_INPUT_TEXT,
    inputFilterText: text
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

export const GENERATE_CHART_DATA = 'GENERATE_CHART_DATA'
export function generateChartData(){
  return {
    type: GENERATE_CHART_DATA
  }
}
