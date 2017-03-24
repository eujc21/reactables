import Koa from 'koa'
import path from 'path'
import bodyParser from 'koa-bodyparser'
import cors from 'kcors'
import webpack from 'webpack'
import koaWebpack from 'koa-webpack';
import webpackConfig from '../../webpack.config'
import { homePage } from './static/homepage.static'


const koaApp = new Koa();
const webpackConfiguration = webpackConfig()
const compiler = webpack(webpackConfiguration)
const middleware = koaWebpack({
  compiler,
  dev: {
    noInfo: true,
    publicPath: '/'
  }
});
if(process.env.NODE_ENV === 'development') {
  koaApp.use(middleware)
}

koaApp
  .use(cors())
  .use(async ctx => {
    ctx.body = homePage('',{});
  });

koaApp.listen(process.env.KOAPORT || 3000);
export default koaApp
