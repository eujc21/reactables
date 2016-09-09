import React from 'react'
import _ from 'lodash'

const UP = 38
const DOWN = 40
const LEFT = 37
const RIGHT = 39
const A = 65
const B = 66
const ENTER = 13

const KONAMI_CODE = [UP, UP, DOWN, DOWN, LEFT, RIGHT, LEFT, RIGHT, B, A, ENTER]

export class KonamiCode extends React.Component {

  constructor(props){
    super(props)
  }

  state = {
    userCode: [],
    isUnlocked: false
  }

  componentDidMount(){
    window.addEventListener('keydown', this.handleKeyPress)
  }

  componentDidUpdate(){

    if(_.isEqual(this.state.userCode, KONAMI_CODE)){
      this.setState({
        isUnlocked: true,
        userCode: []
      })
      alert(this.props.message)
    }

  }

  handleKeyPress =(e)=>{
    const { userCode, isUnlocked } = this.state
    const i = userCode.length

    if(!isUnlocked)
      this.setState({
        userCode: e.keyCode === KONAMI_CODE[i]
          ? [...userCode, e.keyCode] : e.keyCode === UP
          ? [e.keyCode] : []
      })
  }

  render(){
    return(null)
  }

}