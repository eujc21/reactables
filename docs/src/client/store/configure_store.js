import { createStore, applyMiddleware } from 'redux'
import { api } from '../middleware/api'
import { logger, crashReporter } from '../middleware/logging'
import rootReducer from '../reducers/root_reducer'
import { elementLoaderMiddleware } from '../../../../src/index'

function configureStore(initialState){
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      api,
      elementLoaderMiddleware(),
      logger,
      crashReporter
    )
  )
}

export default configureStore
