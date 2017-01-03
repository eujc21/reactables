// ie11 support
//import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configure_store'
import configureRouter from './router/router'

import { browserHistory } from 'react-router'

const store = configureStore(window.__initialState__)

ReactDOM.render(
  <Provider store={ store } >
    { configureRouter(browserHistory, store) }
  </Provider>, document.getElementById('root')
)
