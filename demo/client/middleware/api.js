import fetch from 'isomorphic-fetch'
import has from 'lodash/has'
import reduce from 'lodash/reduce'

const SERVICE_URL = '/api/';
const Headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};
export const Methods = {
  POST: 'POST',
  GET: 'GET',
  PUT: 'PUT',
  DELETE: 'DELETE'
};

//executes the actual API call
function callApi(endpoint, query, method, body){

  const fullUrl = SERVICE_URL + endpoint + objectToQueryString(query)

  return fetch(fullUrl, {
    credentials: 'include',
    method: method,
    headers: Headers,
    mode: 'cors',
    cache: 'no-cache',
    body: JSON.stringify(body)
  })
  .then(response => response.json().then(json => ({json, response})))
  .then(({json, response}) => {

    if(!response.ok){
      return Promise.reject(json);
    }

    return json;
  })
}

// Action key that carries API call info interpreted by this middleware.
export const CALL_API = Symbol('Call API');

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export const api = store => next => action => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { endpoint, retry } = callAPI;

  const { types, method, body, query } = callAPI;

  // if (typeof endpoint === 'function') {
  //   endpoint = endpoint(store.getState())
  // }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  //returns a new action with types array stripped from the action and new data
  function actionWith(data) {
    //create a new action that fits Redux
    const finalAction = Object.assign({}, action, data);
    //strip the symbol dictionary
    delete finalAction[CALL_API];
    //return the new action
    return finalAction
  }

  // extract the types as constants from the array
  // (ES6 Syntax - Extracts items from arrays if you know their position)
  const [ requestType, successType, failureType ] = types;

  //create and execute action with request type
  next(actionWith({ type: requestType, endpoint, retry}));

  return callApi(endpoint, query, method, body)
    .then(
      //create a new action with response data and a type
      response => {
        next(actionWith({
          response,
          //endpoint,
          type: successType,
        }))

        // automatically retry query if page and pageCount mismatch
        if (has(response, ['pageCount', 'query.page']) && response.query.page > response.pageCount) {
          action[CALL_API].endpoint = modifyQueryString(endpoint, 'page', response.pageCount)
          store.dispatch(action)
        }
      }
      ,
      //create a new action with error message and a type
      error =>{
        next(actionWith({
          type: failureType,
          //endpoint,
          error: error.message || 'Something bad happened',
        }))

        // if retry is specified, dispatch again
        if(retry) {
          action[CALL_API].retry = retry - 1
          store.dispatch(action)
        }
      }
    )
}

function objectToQueryString(obj){
  return reduce(obj, (string, value, key) =>{
    const separator = string.length === 0 ? '?' : '&'
    return string + separator + key + '=' + value
  }, '')
}

function modifyQueryString(string, property, value){
  return string
    .split('?')[1]
    .split('&')
    .reduce((string, param)=>{
      let pair = param.split('=')
      if(pair[0] === property){
        pair[1] = value
      }
      return `${string}&${pair[0]}=${pair[1]}`
    }, '?')
}
