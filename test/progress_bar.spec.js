import { React, TestUtils, expect, mount, render } from './.setup'
import { ProgressBar } from '../src/components/progress_bar'
import Color from 'color'

describe("<ProgressBar />", function(){

 before('render and mount element', ()=>{
   this.renderedComponent = render(
     <ProgressBar
       completed={ 45 }
       outOf={ 100 }
       showUnits={ false }
       barColor={ 'yellow' }
       completedColor={ 'orange' }
       height={ 20 } />
   )

   this.mountedComponent = mount(
     <ProgressBar
       completed={ 45 }
       outOf={ 100 }
       showUnits={ false }
       barColor={ 'yellow' }
       completedColor={ 'orange' }
       height={ 20 } />
   )

 })

  it('should insure percentage complete is a number', ()=>{
    expect(this.mountedComponent.state().percentageComplete).to.be.a('number')
  })

  it('should calculate the percentage complete ', ()=>{
    expect(this.mountedComponent.state().percentageComplete).to.equal(45)
  })

  it('should not display completed units', ()=>{

    expect(this.mountedComponent.find('.unit').isEmpty()).to.equal(true)
  })


  it('should set the bar height', ()=>{
    expect(this.mountedComponent.find('.baseBar')).to.have.style('height', '20px')
  })

  it('should set the base bar color', ()=>{
    expect(this.mountedComponent.find('.baseBar')).to.have.style('background-color', Color('yellow').rgbString())
  })

  it('should set the completed bar color', ()=>{

    const baseCompletedColor = Color( 'orange' ).hexString()
    const gradientCompletedColor = Color( 'orange' ).lighten(0.5).hexString()

    expect(this.renderedComponent.find('.completedBar')).to.have.style('background', `linear-gradient( to top right, ${ baseCompletedColor }, ${ gradientCompletedColor })`)
  })


  it('should display completed units as a percent', ()=>{
    this.mountedComponent.setProps({
      units: 'percent',
      showUnits: true
    })

    expect(this.mountedComponent.find('.units').text()).to.equal('45%')
  })

  it('should display completed units as a part to a whole', ()=>{
    this.mountedComponent.setProps({
      units: 'number'
    })

    expect(this.mountedComponent.find('.units').text()).to.equal('45 of 100')

  })

  it('should align the units properly', ()=>{
    this.mountedComponent.setProps({
      alignUnits: 'center'
    })
    expect(this.mountedComponent.find('.units')).to.have.style('text-align', 'center')
  })

  it('should set percentage complete to 100 if completed is greater than outOf', ()=>{
    this.mountedComponent.setProps({
      completed: 150
    })

    expect(this.mountedComponent.state().percentageComplete).to.equal(100)

  })

})