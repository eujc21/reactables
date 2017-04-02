import { combineReducers } from 'redux'
import { UPDATE_PAGINATION_PAGE, SET_MOBILE_VIEW, SET_PAGE_SCROLL_POSITION, UPDATE_INPUT_TEXT, INCREMENT_COMPLETED, TOGGLE_PANEL, GENERATE_CHART_DATA } from '../actions/demo_actions'
import { INCREMENT_LIST } from '../actions/layout_actions'
import { elementLoaderReducer } from '../../../lib/index'


function errorMessage(state = null, action) {
  const { type, error } = action

  if (type === 'RESET_ERROR_MESSAGE') {
    return null
  } else if (error) {
    console.log(error)
    return action.error
  }

  return state
}

const initialAppState = {
  pageScrollPosition: 0,
  isMobile: false
}

function app(state = initialAppState, action){
  switch(action.type){
    case SET_MOBILE_VIEW:
      return {...state, isMobile: action.isMobile}
    case SET_PAGE_SCROLL_POSITION:
      return {...state, pageScrollPosition: action.position }
    default:
      return state
  }
}

const initialComponentsState = {
  paginationPage: 5,
  paginationCount: 10,
  tableData: [{a:1, b:2, c: 3}, {a:2, b: 3, c: 4}, {a:3, b: 4, c: 5}],
  completed: 0,
  outOf: 100,
  isPanelVisible: false
}

function components(state = initialComponentsState, action) {

  switch(action.type){
    case UPDATE_INPUT_TEXT:
      return { ...state, inputText: action.text }

    case UPDATE_PAGINATION_PAGE:
      return { ...state, paginationPage: action.page }

    case INCREMENT_COMPLETED:
      let completed = state.completed + action.increment

      return { ...state, completed: completed > state.outOf ? 0 : completed }

    case TOGGLE_PANEL:
      return { ...state, isPanelVisible: action.isVisible }

    default:
      return state
  }
}


const initialLayoutState = {
  listIndex: 1
}
function layout(state = initialLayoutState, action){
  switch(action.type){
    case INCREMENT_LIST:
      return {
        ...state,
        listIndex: action.listIndex
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  app,
  components,
  layout,
  errorMessage,
  elementLoaderReducer
});

export default rootReducer