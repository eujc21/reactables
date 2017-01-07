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

  // {
  //   path: '/components',
  //     getComponent(location, cb) {
  //     System
  //       .import('../containers/components')
  //       .then(loadRoute(cb))
  //       .then(setScrollTop)
  //       .catch(errorLoading)
  //   }
  // },

  return (
    <Router history={ history } routes={[
      {
        component: App,
        path: '/',
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
            path: '/charts',
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