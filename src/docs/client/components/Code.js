import React from 'react'
import PropTypes from 'prop-types'
import merge from 'lodash/merge'

const Code =({ type, style, children })=>{

  const styles = {
    base:{
      display: 'flex',
      flexWrap: 'wrap',
      width: '100%',
      border: '1px solid rgba(16,16,16,0.1)',
      borderRadius: 2,
      marginTop: 10,
    },
    header:{
      base:{
        width: '100%',
        padding: 5,
        backgroundColor: '#32b1d1',
      },
      text: {
        color: '#ffffff',
        margin: 0,
        padding: 0
      }
    },
    code:{
      width: '100%',
      whiteSpace: 'pre-wrap',
      margin: 0,
      backgroundColor: 'rgba(56, 210, 224, 0.1)',
      padding: 10
    }

  }

  merge(styles, style)

  return (
    <div style={ styles.base }>
      <div style={ styles.header.base }>
        <h5 style={ styles.header.text }>{ type.toUpperCase() }</h5>
      </div>
      <pre style={ styles.code }><code>
        { JsxString(children) }
      </code></pre>
    </div>
  )
}

Code.propTypes = {
  type: PropTypes.string.isRequired,
  style: PropTypes.object
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