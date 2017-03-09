import { combineReducers } from 'redux'
import { UPDATE_PAGINATION_PAGE, SET_MOBILE_VIEW, SET_PAGE_SCROLL_POSITION, UPDATE_INPUT_TEXT, INCREMENT_COMPLETED, TOGGLE_PANEL, GENERATE_CHART_DATA } from '../actions/demo_actions'
import { elementLoaderReducer } from '../../../../src/index'
import moment from 'moment'

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



const now = moment()
const initialChartsState = {
  lineData: [],
  barData: [],
  pieData: [],
  sankeyData: {
    nodes: [],
    links: []
  }
}

function charts(state = initialChartsState, action) {
  switch (action.type) {
    case GENERATE_CHART_DATA:

      function random() {
        return Math.floor(Math.random() * 50)
      }

      const barData = Array.from(new Array(5), (x, i)=>({
        number: random(),
        count: random(),
        year: 2000 + i
      }))

      const lineData = [
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
        ]

      const pieData = [
        {
          age: '< 5',
          population: 2704659
        },
        {
          age: '5-13',
          population: 4499890
        },
        {
          age: '14-17',
          population: 2159981
        },
        {
          age: '18-24',
          population: 3853788
        },
        {
          age: '25-44',
          population: 14106543
        },
        {
          age: '45-64',
          population: 8819342
        },
        {
          age: '≥ 65',
          population: 612463
        }
      ]

      const sankeyData = {
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

      return {
        ...state,
        barData,
        lineData,
        pieData,
        sankeyData
      }

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
  app,
  components,
  charts,
  layout,
  errorMessage,
  elementLoaderReducer,
});

export default rootReducer