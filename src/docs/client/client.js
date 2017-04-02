import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import loadApp from 'bundle-loader?lazy!./containers/app'
import Bundle from './components/bundler'

const App = () => (
  <Bundle load={loadApp}>
    {(App) => App ? <App/> : <div />}
  </Bundle>
)

const store = configureStore(window.__initialState__)

ReactDOM.render(
  <Provider store={ store } >
    <App />
  </Provider>, document.getElementById('root')
)

