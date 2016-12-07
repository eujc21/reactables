import { CALL_API, Methods } from '../middleware/api'

export const TEST_CALL_REQUEST = 'TEST_CALL_REQUEST'
export const TEST_CALL_SUCCESS = 'TEST_CALL_SUCCESS'
export const TEST_CALL_FAILURE = 'TEST_CALL_FAILURE'

export const TEST_CALL_1_REQUEST = 'TEST_CALL_1_REQUEST'
export const TEST_CALL_1_SUCCESS = 'TEST_CALL_1_SUCCESS'
export const TEST_CALL_1_FAILURE = 'TEST_CALL_1_FAILURE'

export function testCall(){
  return {
    [CALL_API]:{
      types: [TEST_CALL_REQUEST, TEST_CALL_SUCCESS, TEST_CALL_FAILURE],
      method: Methods.GET,
      endpoint: 'test'
    }
  }
}

export function testCall1(){
  return {
    [CALL_API]:{
      types: [TEST_CALL_1_REQUEST, TEST_CALL_1_SUCCESS, TEST_CALL_1_FAILURE],
      method: Methods.GET,
      endpoint: 'test1',
      retry: 5
    }
  }
}