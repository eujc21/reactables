import React from 'react'
import TestUtils from 'react-addons-test-utils'
import chai from 'chai'
import chaiEnzyme from 'chai-enzyme'
import { mount, render } from 'enzyme'
var jsdom = require('jsdom').jsdom

chai.use(chaiEnzyme())
let expect = chai.expect

var exposedProperties = ['window', 'navigator', 'document']

global.document = jsdom('')
global.window = document.defaultView
Object.keys(document.defaultView).forEach(property => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property)
    global[property] = document.defaultView[property]
  }
})

global.navigator = {
  userAgent: 'node.js'
}


export { React, TestUtils, expect, mount, render }