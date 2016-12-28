import { combineReducers } from 'redux'
import { UPDATE_INPUT_TEXT, INCREMENT_COMPLETED, TOGGLE_PANEL } from '../actions/demo_actions'
import { elementLoaderReducer } from '../../../../src/index'
import moment from 'moment'


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



const initialComponentsState = {
  tableData: [{a:1, b:2, c: 3}, {a:2, b: 3, c: 4}, {a:3, b: 4, c: 5}],
  completed: 0,
  outOf: 100,
  isPanelVisible: false
}

function components(state = initialComponentsState, action) {

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



const now = moment()
const initialChartsState = {
  lineData: [
    {
      name: 'Set 1',
      values: [
        {
          count: 12,
          date: now
        },
        {
          count: 20,
          date: now.clone().add(1, 'day')
        },
        {
          count: 55,
          date: now.clone().add(2, 'days')
        },
        {
          count: 25,
          date: now.clone().add(3, 'days')
        },
        {
          count: 35,
          date: now.clone().add(4, 'days')
        }
      ]
    }
  ] ,
  barData: [
    {
      count: 202,
      year: 2000
    },

    {
      count: 179,
      year: 2002
    },

    {
      count: 154,
      year: 2003
    },

    {
      count: 215,
      year: 2001
    },

    {
      count: 260,
      year: 2010
    }
  ],
  sankeyData: {
    nodes: [
      { name: 'Node 0'},
      { name: 'Node 1'},
      { name: 'Node 2'},
      { name: 'Node 3'},
      { name: 'Node 4'},
    ],
    links: [
      {
        source: 0,
        target: 4,
        value: 10
      },
      {
        source: 1,
        target: 4,
        value: 10
      },
      {
        source: 2,
        target: 4,
        value: 10
      },
      {
        source: 3,
        target: 4,
        value: 10
      },
    ]
  }
}

function charts(state = initialChartsState, action){
  switch(action.type){
    default:
      return state
  }
}



const initialLayoutState = {}

function layout(state = initialLayoutState, action){
  switch(action.type){
    default:
      return state
  }
}

const rootReducer = combineReducers({
  components,
  charts,
  layout,
  errorMessage,
  elementLoaderReducer,
});

export default rootReducer;