import React, { PropTypes } from 'react'
import merge from 'lodash/merge'

const Code =({ type, styles, children })=>{

  const style = {
    base:{
      border: '1px solid rgba(16,16,16,0.1)',
      borderRadius: 2,
      marginTop: 10,
    },
    header:{
      base:{
        padding: 5,
        backgroundColor: '#F0AD4E',
      },
      text: {
        color: '#6E4A2A',
        margin: 0,
        padding: 0
      }
    },
    code:{
      margin: 0,
      backgroundColor: '#f8f5ec',
      padding: 10
    }

  }

  merge(style, styles)

  return (
    <div style={ style.base }>
      <div style={ style.header.base }>
        <h5 style={ style.header.text }>{ type.toUpperCase() }</h5>
      </div>
      <pre style={ style.code }><code>
        { JsxString(children) }
      </code></pre>
    </div>
  )
}

Code.propTypes = {
  type: PropTypes.string.isRequired,
  styles: PropTypes.object
}

Code.defaultProps = {
  type: 'code'
}

export default Code



const JsxString = (component, counter = 0) => {

  if(!(component instanceof Object))
    return component

  let type = component.type.name || component.type
  let props = component.props
  let propsString = ""

  // handle Redux wrapped components
  if(component.type.name === 'Connect')
    type = component.type.WrappedComponent.name


  for (let key in props) {
    if (key !== "children") {

      let propValue = props[key]
      let value = ""

      if(typeof propValue === 'string'){
        value = `"${propValue}"`
      } else if (propValue instanceof Function){
        value = propValue.toString()
      }
      else if (propValue instanceof Object) {
        value = `{${JSON.stringify(propValue).replace(/['"]+/g, '')}}`
      } else {
        value = `{${propValue}}`
      }
      propsString += `\n\r ${key}=${value}`
    }
  }

  if (props.children) {
    counter += 2
    let children = JsxString(props.children, counter)
    return `<${type}${propsString}>
${Array(counter -1).join(" ")}  ${ children }
${Array(counter -1).join(" ")}</${type}>`
  }

  return `<${type}${propsString}/>`
}