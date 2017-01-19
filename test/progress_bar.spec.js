import { React, TestUtils, expect, mount, render } from './.setup'
import { ProgressBar } from '../src/components/progress_bar'
import Color from 'color'

describe("<ProgressBar />", function(){

 before('render and mount element', ()=>{
   // this.renderedComponent = render(
   //   <ProgressBar
   //     completed={ 45 }
   //     outOf={ 100 }
   //     showUnits={ false }
   //     barColor={ 'yellow' }
   //     completedColor={ 'orange' }
   //     height={ 20 } />
   // )

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

  it('should set the components styles', ()=>{
    this.mountedComponent.setProps({
      styles: {
        units: {
          textAlign: 'center'
        }
      }
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