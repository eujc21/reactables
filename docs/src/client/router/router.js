import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'
import App from '../containers/app'
import Components from '../containers/components'
import Charts from '../containers/charts'

export default function configureRouter(history, store){

  function setScrollTop(){
    document.body.scrollTop = 0
  }

  return (
    <Router history={ history }>
      <Route path='/reactables' component={ App }>
        <IndexRoute component={ Components } onEnter={ setScrollTop }/>
        <Route path={ '/charts' } component={ Charts } onEnter={ setScrollTop }/>
      </Route>
    </Router>
  )

  // function errorLoading(err){
  //   console.error('Dynamic page loading failed', err)
  // }
  //
  // function loadRoute(cb) {
  //   return (module) => cb(null, module.default)
  // }
  //
  // return (
  //   <Router history={ history } routes={[
  //     {
  //       component: App,
  //       path: '/',
  //       onEnter: ()=>{ },
  //       indexRoute: { onEnter: (nextState, replace) => replace('/components') },
  //       childRoutes: [
  //         {
  //           path: '/components',
  //           getComponent(location, cb) {
  //             System
  //               .import('../containers/components')
  //               .then(loadRoute(cb))
  //               .then(setScrollTop)
  //               .catch(errorLoading)
  //           }
  //         },
  //         {
  //           path: '/charts',
  //           getComponent(location, cb) {
  //             System
  //               .import('../containers/charts')
  //               .then(loadRoute(cb))
  //               .then(setScrollTop)
  //               .catch(errorLoading)
  //           }
  //         }
  //       ]
  //     }
  //   ]} />
  // )
}