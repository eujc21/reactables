import express from 'express';

const homeRoute = express.Router()

// middleware that is specific to this router
homeRoute.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
homeRoute.get('/home', function (req, res) {
  res.send('Birds home page')
})
// define the about route
homeRoute.get('/homess', function (req, res) {
  res.send('About birds')
})

export homeRoute
