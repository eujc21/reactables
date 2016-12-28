import React from 'react'
import Router from 'react-router/lib/Router'
import App from '../containers/app'

export default function configureRouter(history, store){

  function errorLoading(err){
    console.error('Dynamic page loading failed', err)
  }

  function loadRoute(cb) {
    return (module) => cb(null, module.default)
  }

  function setScrollTop(){
    document.body.scrollTop = 0
  }

  return (
    <Router history={ history } routes={[
      {
        component: App,
        path: '/',
        onEnter: ()=>{ },
        indexRoute: { onEnter: (nextState, replace) => replace('/components') },
        childRoutes: [
          {
            path: '/components',
            getComponent(location, cb) {
              System
                .import('../containers/components')
                .then(loadRoute(cb))
                .then(setScrollTop)
                .catch(errorLoading)
            }
          },
          {
            path: '/charts',
            getComponent(location, cb) {
              System
                .import('../containers/charts')
                .then(loadRoute(cb))
                .then(setScrollTop)
                .catch(errorLoading)
            }
          },
          {
            path: '/layout',
            getComponent(location, cb) {
              System
                .import('../containers/layout')
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