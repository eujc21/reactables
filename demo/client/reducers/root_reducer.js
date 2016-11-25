import { combineReducers } from 'redux'
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

const rootReducer = combineReducers({
  errorMessage,
  elementLoaderReducer,
});

export default rootReducer;