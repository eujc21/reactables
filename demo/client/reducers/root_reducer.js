import { combineReducers } from 'redux'
import { UPDATE_INPUT_TEXT, INCREMENT_COMPLETED, TOGGLE_PANEL } from '../actions/demo_actions'
import { elementLoaderReducer } from '../../../src/index'


function errorMessage(state = null, action) {
  const { type, error } = action;

  if (type === 'RESET_ERROR_MESSAGE') {
    return null
  } else if (error) {
    console.log(error);
    return action.error
  }

  return state
}

const initialAppState = {
  tableData: [{a:1, b:2, c: 3}, {a:2, b: 3, c: 4}, {a:3, b: 4, c: 5}],
  completed: 0,
  outOf: 100,
  isPanelVisible: false
}

function app(state = initialAppState, action) {

  switch(action.type){
    case UPDATE_INPUT_TEXT:
      return { ...state, inputText: action.text }

    case INCREMENT_COMPLETED:
      let completed = state.completed + action.increment

      return { ...state, completed: completed > state.outOf ? 0 : completed }

    case TOGGLE_PANEL:
      return { ...state, isPanelVisible: action.isVisible }

    default:
      return state
  }
}

const rootReducer = combineReducers({
  app,
  errorMessage,
  elementLoaderReducer,
});

export default rootReducer;