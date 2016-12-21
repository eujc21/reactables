import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/demo_actions'
import Section from '../components/section'

import {
  Navbar,
  Input,
  DateTimePicker,
  Button,
  Table,
  Dropdown,
  DropdownItem,
  ElementLoader,
  HeatBar,
  Select,
  SelectOption,
  ProgressBar,
  Nav,
  NavLink,
  Code,
  HiddenPanel
} from '../../../src/index'

class App extends React.Component {

  componentDidMount(){
    // this.props.demoCall()
    // setInterval(()=>{
    //   this.props.demoCall()
    //   this.props.incrementCompleted(10)
    // }, 5000)

  }

  handleButtonClick =()=>{

  }

  handleInputChange =(text)=>{
    this.props.updateInputText(text)
  }

  handleInputSubmit =(text)=>{

  }

  handleSelect =(value)=>{
    console.log(value)
  }

  handleDropdownClick =()=>{
    console.log('dropdown click')
  }

  handleDateChange =(date1, date2)=>{
    console.log(date1, date2)
  }

  handleTogglePanel =()=>{
    const { togglePanel, isPanelVisible } = this.props
    togglePanel(!isPanelVisible)
  }

  render(){

    const { inputText } = this.props

    const style = {
      base: {
        position: 'relative',
        paddingTop: 70,
      },
      container: {
        display: 'flex',
        position: 'relative',
        margin: '0 auto',
        width: 991
      },
      pageNavContainer: {

      },
      contentContainer: {
        width: '100%'
      },
      hiddenPanel: {
        height: '100%',
        width: '100%',
        backgroundColor: '#ffffff',
        textAlign: 'center',
        padding: 10
      }
    }

    return(
      <div ref={ parentNode => this.parentNode = parentNode } style={ style.base }>

        <Navbar title="reactables"/>

        <HiddenPanel position={ 'left' } isVisible={ this.props.isPanelVisible }>
          <div style={ style.hiddenPanel }>
            <h4>Hidden Panel</h4>
          </div>
        </HiddenPanel>

        <div style={ style.container }>
          <Nav type="stacked">
          </Nav>
          <div style={ style.contentContainer }>

            <Section name="Button">
              { [0,1,2,3,4].map((num)=>
                <Button
                  key={ num }
                  text="button"
                  onClick={ this.handleButtonClick }
                  styles={{ backgroundColor: `#${3 + (num * 2) + 'A424A'}`, color: '#ffffff', marginRight: 10}}
                />
              )}
              <Code type="jsx">
                <Button
                  text="button"
                  isHoverable={ true }
                  isDisabled={ false }
                  onClick={ this.handleButtonClick }
                  styles={{base: {}}}
                />
              </Code>
            </Section>

            <Section name="Input">
              <Input
                text={ inputText }
                onChange={ this.handleInputChange }
                onSubmit={ this.handleInputSubmit } />
              <Code type="jsx">
                <Input
                  placeholder={ 'Search...' }
                  text={ 'String' }
                  onChange={ this.handleInputChange }
                  onSubmit={ this.handleInputSubmit }
                  styles={{
                    base: {},
                    input: {},
                    submitIcon: {},
                    clearIcon: {}
                  }}/>
              </Code>
            </Section>

            <Section name="Select">
              <Select onChange={ this.handleSelect }>
                <SelectOption text="Option 1" value="option_1"/>
                <SelectOption text="Option 2" value="option_2"/>
                <SelectOption text="Option 3" value="option_3"/>
              </Select>
              <Code type="jsx">

              </Code>
            </Section>

            <Section name="Dropdown">
              <Dropdown face="Dropdown">
                <DropdownItem text="Option 1" onClick={ this.handleDropdownClick }/>
                <DropdownItem text="Option 2" onClick={ this.handleDropdownClick }/>
                <DropdownItem text="Option 3" onClick={ this.handleDropdownClick }/>
              </Dropdown>
              <Code type={ 'jsx' }>
                <Dropdown face="Dropdown">
                </Dropdown>
              </Code>
            </Section>

            <Section name="DateTimePicker">

              <DateTimePicker
                isTimePicker
                placeholder={ 'Date Time' }
                onChange={ this.handleDateChange }/>

              <Code type={ 'jsx' }>
                <DateTimePicker/>
              </Code>
            </Section>


            <Section name="Table">
              <Table isHoverable isStriped stripeColor={ '#ffffff' } tableData={ this.props.tableData }/>

              <Code type={ 'jsx' }>
                <Table tableData={ this.props.tableData }/>
              </Code>
            </Section>

            <Section name="HeatBar">
              <HeatBar score={ 10 } outOf={ 100 }/>
              <Code type={'jsx'}>
                <HeatBar score={ 10 } outOf={ 100 }/>
              </Code>
            </Section>

            <Section name="ProgressBar">
              <ProgressBar showUnits={ true } completed={ this.props.completed } outOf={ this.props.outOf}/>
              <Code type={ 'jsx' }>
                <ProgressBar completed={ 4 } outOf={ 100 } showUnits={ true } units={ 'percent' } styles={{ base: {}, units:{}, bar:{}, completed:{}}}/>
              </Code>
            </Section>

            <Section name="ElementLoader">

              <ElementLoader action={ 'DEMO_CALL' }>
                <div style={{ border: '1px solid black', width: 100, backgroundColor: 'grey', textAlign: 'center', padding: '20px 0'}}>
                  <p>Wrapped Content</p>
                </div>
              </ElementLoader>

              <Code type="jsx">
                <ElementLoader spinner={ '<span className="optional-custom-spinner" />' } action="DEMO_CALL">
                  <div>
                    Wrapped Content
                  </div>
                </ElementLoader>
              </Code>
            </Section>

            <Section name="HiddenPanel">
              <Button text={ 'Toggle Panel' } onClick={ this.handleTogglePanel } styles={{ backgroundColor: 'rgb(58, 66, 74)', color: 'white'}}/>

              <Code type={ 'JSX' }>
                <HiddenPanel />
              </Code>
            </Section>


            <Section name="Code">
              <Code type="jsx">
                <Code type="jsx"><p>Display properly formatted code</p></Code>
              </Code>
            </Section>
          </div>
        </div>

      </div>
    )
  }
}


function mapStateToProps(state){
  return {
    inputText: state.app.inputText,
    outOf: state.app.outOf,
    completed: state.app.completed,
    tableData: state.app.tableData,
    isPanelVisible: state.app.isPanelVisible
  }
}

export default connect(mapStateToProps, {
  updateInputText: actions.updateInputText,
  demoCall: actions.demoCall,
  incrementCompleted: actions.incrementCompleted,
  togglePanel: actions.togglePanel
})(App)

