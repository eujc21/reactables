import { showElement, hideElement } from './elementLoaderReducer'

const defaultTypeSuffixes = ['REQUEST', 'SUCCESS', 'FAILURE']

export default function elementLoaderMiddleware(config = {}) {
  const promiseTypeSuffixes = config.actionTypeSuffixes || defaultTypeSuffixes

  function stripPrefix(type, prefix){
    return type.substring(0, type.length - prefix.length - 1)
  }

  return store => next => action => {

    if (action.type) {
      const [REQUEST, SUCCESS, FAILURE] = promiseTypeSuffixes

      const isRequest = new RegExp(`${REQUEST}$`, 'g')
      const isSuccess = new RegExp(`${SUCCESS}$`, 'g')
      const isFailure = new RegExp(`${FAILURE}$`, 'g')

      if (action.type.match(isRequest)) {
        const prefix = stripPrefix(action.type, REQUEST)
        store.dispatch(showElement(prefix))

      } else if (action.type.match(isSuccess)) {
        const prefix = stripPrefix(action.type, SUCCESS)
        store.dispatch(hideElement(prefix))

      } else if(action.type.match(isFailure)){
        const prefix = stripPrefix(action.type, FAILURE)
        store.dispatch(hideElement(prefix))
      }
    }

    return next(action)
  }
}
