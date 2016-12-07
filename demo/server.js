var express = require('express')
var path = require('path')
var port = process.env.PORT || 8080

var app = express()

if(process.env.NODE_ENV === 'development'){
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const webpackConfig = require('../webpack.config.js')()
  const compiler = webpack(webpackConfig)
  app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: webpackConfig.output.publicPath}))
  app.use(webpackHotMiddleware(compiler))
}

// Disable Caching
app.use((req, res, next)=>{
  res.header('Cache-Control', 'no-cache')
  next()
})

function renderFullPage(html) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta http-equiv="X-UA-Compatible" content="IE=11">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Reactables</title>
        <style>
          html { font-size: 16px }
          html, body, #root { margin: 0; }
          body { background-color: #f4f4f4;}
        </style>
      </head>
      <body>
        <div id="root">${ html }</div>
        <script src="/client.js"></script>
      </body>
    </html>`
}

function handleRender(req, res){
  res.send(renderFullPage('', {}))
}

//Express API Routes
app.use(express.static( path.join(__dirname, '/public') ))
app.get('/api/test', (req, res)=>{
  setTimeout(()=>{
    res.json()
  }, 3000)

})

app.get('/api/test1', (req, res)=>{
  setTimeout(()=>{
    res.json()
  }, 1000)

})
app.use(handleRender)

let server = app.listen(port, ()=> console.log(`Server is listening on port: ${server.address().port}...`))

