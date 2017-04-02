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

export const UPDATE_PAGINATION_PAGE = 'UPDATE_PAGINATION_PAGE'
export function updatePaginationPage(page){
  return {
    type: UPDATE_PAGINATION_PAGE,
    page
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