import React from 'react'
import { Base } from './components/base'
import { Line } from './components/line'

export const LineChart =(props)=>{
  return(
    <Base { ...props}><Line {...props} /></Base>
  )
}
