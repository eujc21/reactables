import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'
import App from '../containers/app'
import Components from '../containers/components'
import Charts from '../containers/charts'

export default function configureRouter(history, store){

  const BASE_PATH = process.env.NODE_ENV === 'production' ? '/reactables/' : '/'

  function setScrollTop(){
    document.body.scrollTop = 0
  }

  function errorLoading(err){
    console.error('Dynamic page loading failed', err)
  }

  function loadRoute(cb) {
    return (module) => cb(null, module.default)
  }

  return (
    <Router history={ history } routes={[
      {
        component: App,
        path: BASE_PATH,
        onEnter: ()=>{ },
        indexRoute: {
          getComponent(location, cb) {
            System
              .import('../containers/components')
              .then(loadRoute(cb))
              .then(setScrollTop)
              .catch(errorLoading)
          }
        },
        childRoutes: [
          {
            path: BASE_PATH + 'charts',
            getComponent(location, cb) {
              System
                .import('../containers/charts')
                .then(loadRoute(cb))
                .then(setScrollTop)
                .catch(errorLoading)
            }
          }
        ]
      }
    ]} />
  )
}