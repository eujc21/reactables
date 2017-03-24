import { homePage } from '../static/homepage.static';

export function handleRender(req, res){
  if(process.env.NODE_ENV === 'production') {
    res.sendFile(path.join(__dirname + '/index.html'))
  } else {
    res.send(homePage('', {}))
  }
}
