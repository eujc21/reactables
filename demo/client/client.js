// ie11 support
import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configure_store'

import App from './containers/app'

const store = configureStore(window.__initialState__)

ReactDOM.render(
  <Provider store={ store } >
    <App />
  </Provider>, document.getElementById('root')
)
