import { createStore, applyMiddleware } from 'redux'
import { logger, crashReporter } from '../middleware/logging'
import rootReducer from '../reducers/root_reducer'
import { elementLoaderMiddleware } from '../../../lib/index'

function configureStore(initialState){
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      elementLoaderMiddleware(),
      crashReporter
    )
  )
}

export default configureStore
