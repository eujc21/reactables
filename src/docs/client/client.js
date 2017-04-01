// ie11 support
//import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configure_store'
import Router from './containers/router'
import './styles/text_finder.css'

const store = configureStore(window.__initialState__)

ReactDOM.render(
  <Provider store={ store } >
    <Router />
  </Provider>, document.getElementById('root')
)
