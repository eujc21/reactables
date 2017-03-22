import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/demo_actions'
import Section from '../components/section'
import { withRouter } from 'react-router'

import {
  Navbar,
  Input,
  DateTimePicker,
  Button,
  ButtonGroup,
  Table,
  Dropdown,
  DropdownOption,
  ElementLoader,
  HeatBar,
  Select,
  SelectOption,
  ProgressBar,
  Nav,
  NavLink,
  Code,
  HiddenPanel,
  TextSelector,
  TextHighlighter,
  TextMenuOption,
  Pagination,
  TextFinderBar,
  TextFinder,
  TestTable
} from '../../../../src/index'

class Components extends React.Component {

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

  handleFilterInputChange =(text)=>{
    this.props.updateFilterInputText(text)
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

  handlePanelVisibility =(shouldShow)=>{
    this.props.togglePanel(shouldShow)
  }

  handleTextSelectorOption =(text)=>{
    console.log(text)
  }

  handleTextSelection =(text)=>{
    console.log(text)
  }

  handlePaginationClick =(page)=>{
    this.props.updatePaginationPage(page)
  }

  render(){

    const { paginationPage, paginationCount, inputText, isMobile, inputFilterText } = this.props

    const styles = {
      base: {
        position: 'relative',
      },
      container: {
        display: 'flex',
        justifyContent: 'center',
        position: 'relative'
      },
      navContainer: {
        position: 'relative',
        order: 1,
        padding: '60px 60px 0 0'
      },
      contentContainer: {
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        maxWidth: 600,
        padding: '0 10px',
        order: 2,
      },
      componentContainer:{
        width: '100%'
      },
      nav: {
        base: { width: 150 },
        nav:{ borderTop: null, borderLeft: null, borderRadius: 0 }
      },
      navlink: {
        base: { border: 0, borderRadius: 0 },
        link:{ padding: '5px 3px' }
      },
      tableContainer: {
        backgroundColor: 'white',
        border: '1px solid #EBE9ED',
        borderRadius: 2
      },
      hiddenPanel: {
        height: 'inherit',
        width: 'inherit',
        backgroundColor: '#ffffff',
        textAlign: 'center',
      },
      dropdown: {
        base:{
          display: 'flex',
          alignItems: 'center',
          padding: 5,
          borderRadius: 3,
          backgroundColor: 'rgb(154, 66, 74)',
          color: 'white',
          boxShadow: null
        },
        text: { fontSize: 14, margin: 0, padding: 0 },
        icon: { fontSize: 14, paddingLeft: 4 }
      },
      datePicker: {
        base: {
          width: '100%'
        },
        input: {
          base: {
            height: 26,
            fontSize: 14
          }
        }
      }
    }



    return(
      <div id="container" ref={ container => this.container = container } style={ styles.base }>


        <HiddenPanel
          position={ 'right' }
          isVisible={ this.props.isPanelVisible }
          onClickOutside={ ()=> this.handlePanelVisibility(false) }
          width={414}
          style={{ panel: {height: '100vh'}}}
        >
          <div style={ styles.hiddenPanel }>
            <h4 style={{ marginTop: 0 }}>Hidden Panel</h4>
          </div>
        </HiddenPanel>

        <div style={ styles.container }>

          {!isMobile ?
            <div style={ styles.navContainer }>
              <Nav offsetTop={ 70 } style={ styles.nav }>
                <NavLink to="#testTable" style={ styles.navlink }>TestTable</NavLink>
                <NavLink to="#button" style={ styles.navlink }>Button</NavLink>
                <NavLink to="#input" style={ styles.navlink }>Input</NavLink>
                <NavLink to="#select" style={ styles.navlink }>Select</NavLink>
                <NavLink to="#dropdown" style={ styles.navlink }>Dropdown</NavLink>
                <NavLink to="#date-time-picker" style={ styles.navlink }>Date Picker</NavLink>
                <NavLink to="#table" style={ styles.navlink }>Table</NavLink>
                <NavLink to="#table-filtered" style={ styles.navlink }>Table w/Filter</NavLink>
                <NavLink to="#nav" style={ styles.navlink }>Nav</NavLink>
                <NavLink to="#navbar" style={ styles.navlink }>Navbar</NavLink>
                <NavLink to="#heat-bar" style={ styles.navlink }>HeatBar</NavLink>
                <NavLink to="#progress-bar" style={ styles.navlink }>ProgressBar</NavLink>
                <NavLink to="#element-loader" style={ styles.navlink }>ElementLoader</NavLink>
                <NavLink to="#hidden-panel" style={ styles.navlink }>HiddenPanel</NavLink>
                <NavLink to="#code" style={ styles.navlink }>Code</NavLink>
                <NavLink to="#text_selector" style={ styles.navlink }>Text Selector</NavLink>
                <NavLink to="#text_highlighter" style={ styles.navlink }>Text Highlighter</NavLink>
                <NavLink to="#text_menu_option" style={ styles.navlink }>Text Menu Option</NavLink>
              </Nav>
            </div> : null
          }

          <div style={ styles.contentContainer }>
            <Section id="testTable" name="testTable">
              <div style={ styles.tableContainer }>
                {
                  <TestTable
                    data={this.props.tableFakerData}
                    headers={Object.keys(this.props.tableFakerData[0])}
                  />
                }
              </div>

              <Code type={ 'jsx' }>
                <TestTable
                  data={`[Objects]`}
                />
              </Code>
            </Section>
            <Section id="button" name="Button">
              <div style={ styles.componentContainer }>
              { [0,1,2,3,4].map(num =>
                <Button
                  key={ num }
                  onClick={ this.handleButtonClick }
                  style={{base:{
                    backgroundColor: `#${3 + (num * 2) + 'A424A'}`,
                    color: '#ffffff',
                    marginRight: 10,
                    height: 25
                  }}}
                />
              )}
              </div>
              <Code type="jsx">
                <Button
                  text="button"
                  isHoverable={ true }
                  isDisabled={ false }
                  onClick={ this.handleButtonClick }
                  style={{base: {}}}
                />
              </Code>
            </Section>

            <Section id="button-group" name="Button Group">
              <div style={ styles.componentContainer }>
                <ButtonGroup>
                  <Button />
                  <Button />
                  <Button />
                </ButtonGroup>

              </div>
              <Code type="jsx">
                <ButtonGroup>
                </ButtonGroup>
              </Code>
            </Section>

            <Section id="input" name="Input">
              <Input
                text={ inputText }
                onChange={ this.handleInputChange }
                onSubmit={ this.handleInputSubmit }
                style={{ base: { width:'100%'}}}
              />
              <Code type="jsx">
                <Input
                  placeholder={ 'Search...' }
                  text={ 'String' }
                  onChange={ this.handleInputChange }
                  onSubmit={ this.handleInputSubmit }
                  style={{
                    base: {},
                    input: {},
                    submitIcon: {},
                    clearIcon: {}
                  }}/>
              </Code>
            </Section>

            <Section id="select" name="Select">
              <Select onChange={ this.handleSelect }>
                <SelectOption text="Option 1" value="option_1"/>
                <SelectOption text="Option 2" value="option_2"/>
                <SelectOption text="Option 3" value="option_3"/>
              </Select>
              <Code type="jsx">
                <Select onChange={ this.handleSelect }>

                </Select>
              </Code>
            </Section>

            <Section id="dropdown" name="Dropdown">
              <div style={ styles.componentContainer }>
                <Dropdown node={
                  <span style={ styles.dropdown.base }>
                    <p style={ styles.dropdown.text }>Dropdown</p>
                    <i style={ styles.dropdown.icon} className="material-icons">
                      keyboard_arrow_down
                    </i>
                  </span>
                }>

                  <DropdownOption text="Option 1" onClick={ this.handleDropdownClick }/>
                  <DropdownOption text="Option 2" onClick={ this.handleDropdownClick }/>
                  <DropdownOption text="Option 3" onClick={ this.handleDropdownClick }/>
                </Dropdown>
              </div>
              <Code type={ 'jsx' }>
                <Dropdown node="Node">
                </Dropdown>
              </Code>
            </Section>

            <Section id="date-time-picker" name="DateTimePicker">

              <DateTimePicker
                canClear
                placeholder={ 'Date Time' }
                onChange={ this.handleDateChange }
                style={ styles.datePicker }
              />

              <Code type={ 'jsx' }>
                <DateTimePicker/>
              </Code>
            </Section>


            <Section id="table" name="Table">
              <div style={ styles.tableContainer }>
                <Table isHoverable isStriped tableData={ this.props.tableData }/>
              </div>

              <Code type={ 'jsx' }>
                <Table tableData={ this.props.tableData }/>
              </Code>
            </Section>

            <Section id="table-filtered" name="Table Filter">
              <div style={ styles.tableContainer }>
                <Input
                  text={ inputFilterText || ''}
                  onChange={ this.handleFilterInputChange }
                  onSubmit={ this.handleFilterInputChange }
                  styles={{ base: { width:'100%'}}}
                />
                <Table
                  isHoverable
                  isStriped
                  tableData={ this.props.tableData }
                  filter={inputFilterText || ''}
                />
              </div>

              <Code type={ 'jsx' }>
                <Table
                  filter={inputFilterText || ''}
                  tableData={ this.props.tableData }/>
              </Code>
            </Section>

            <Section id="nav" name="Nav">
              <Code type={ 'jsx' }>
                <Nav>
                  <NavLink to="/url">Link</NavLink>
                </Nav>
              </Code>
            </Section>

            <Section id="navbar" name="Navbar">
              <Code type={ 'jsx' }>
                <Navbar />
              </Code>
            </Section>

            <Section id="heat-bar" name="HeatBar">
              <HeatBar score={ 10 } outOf={ 100 }/>
              <Code type={'jsx'}>
                <HeatBar score={ 10 } outOf={ 100 }/>
              </Code>
            </Section>

            <Section id="progress-bar" name="ProgressBar">
              <ProgressBar showUnits={ true } completed={ this.props.completed } outOf={ this.props.outOf}/>
              <Code type={ 'jsx' }>
                <ProgressBar completed={ 4 } outOf={ 100 } showUnits={ true } units={ 'percent' } style={{ base: {}, units:{}, bar:{}, completed:{}}}/>
              </Code>
            </Section>

            <Section id="pagination" name="Pagination">

              <Pagination
                page={ paginationPage }
                pageCount={ paginationCount }
                pageSkip={ 3 }
                showEllipses
                maintainSkipWidth
                onClick={ this.handlePaginationClick }
              />

              <Code type={ 'jsx' }>
                <Pagination
                  page={ paginationPage }
                  pageCount={ paginationCount }
                  pageSkip={ 3 }
                  showEllipses
                  maintainSkipWidth
                  firstText={'First'}
                  lastText={'Last'}
                  nextText={'Next'}
                  prevText={'Prev'}
                  onClick={()=>{}}
                  styles={{ul:{}, pageControl:{base:{}, disabled:{}}, pageNumber:{}, selected:{}, ellipses:{}}}/>
              </Code>
            </Section>

            <Section id="element-loader" name="ElementLoader">

              <div style={ styles.componentContainer }>
                <ElementLoader action={ 'DEMO_CALL' }>
                  <div style={{ border: '1px solid black', width: 100, backgroundColor: 'grey', textAlign: 'center', padding: '20px 0'}}>
                    <p>Wrapped Content</p>
                  </div>
                </ElementLoader>
              </div>

              <Code type="jsx">
                <ElementLoader spinner={ '<span className="optional-custom-spinner" />' } action="DEMO_CALL">
                  <div>
                    Wrapped Content
                  </div>
                </ElementLoader>
              </Code>
            </Section>

            <Section id="hidden-panel" name="HiddenPanel">
              <div style={ styles.componentContainer }>
                <Button
                  text={ 'Show Panel' }
                  onClick={ ()=> this.handlePanelVisibility(true) }
                  style={{
                    backgroundColor: 'rgb(58, 66, 74)',
                    color: 'white',
                    height: 25
                  }}/>
              </div>

              <Code type={ 'JSX' }>
                <HiddenPanel />
              </Code>
            </Section>

            <Section id="code" name="Code">
              <Code type="jsx">
                <Code type="jsx"><p>Display properly formatted code</p></Code>
              </Code>
            </Section>


            <Section id="text_selector" name="Text Selector">
              <TextSelector
                onSelect={ this.handleTextSelection }
                textMenuOptions={[
                  <TextMenuOption
                    onClick={ this.handleTextSelectorOption }>Option 1</TextMenuOption>,
                  <TextMenuOption
                    onClick={ this.handleTextSelectorOption }>Option 2</TextMenuOption>,
                  <TextMenuOption
                    onClick={ this.handleTextSelectorOption }>Option 3</TextMenuOption>
                ]}>
                Lorem ipsum dolor sit amet, arcu lobortis massa adipiscing tortor dui, porta dolor enim, dui pulvinar amet mauris enim vitae et, pede sagittis ac felis erat urna libero. Integer tortor in risus taciti vestibulum, in dui. Purus quisque neque massa enim enim urna, dolore bibendum, ac eget quisque, a sit. Velit mauris venenatis ornare a turpis, sed id, nulla vitae, sed eleifend commodo, feugiat voluptate tempor. Pretium non metus maecenas, aliquet magna vivamus, vivamus mauris dapibus proin ipsum, leo laoreet morbi vestibulum at ac eget, maecenas pede nec vitae lacinia purus. A praesent sit eros fermentum bibendum ullamcorper, sapien facilisis velit donec velit sapien hendrerit. Praesent quia lorem tempus et congue consequat.
              </TextSelector>

              <Code>
                <TextSelector textMenuOptions={['<TextMenuOption>Option</TextMenuOption>']}/>
              </Code>
            </Section>

            <Section id={ 'text_highlighter' } name="Text Highlighter">
              <TextHighlighter
                delimiter={ '#!#' }
                dataId={ true }
                text="Lorem ipsum dolor sit amet, arcu #!#123#!#lobortis#!# massa adipiscing tortor dui, #!#123#!#porta#!# dolor enim, dui pulvinar amet mauris enim vitae et, pede sagittis ac felis erat urna libero. Integer tortor in risus taciti vestibulum, in dui. Purus quisque neque massa enim enim urna, dolore bibendum, ac eget quisque, a sit. Velit mauris venenatis ornare a turpis, sed id, nulla vitae, sed eleifend commodo, feugiat voluptate tempor. Pretium non metus maecenas, aliquet magna vivamus, vivamus mauris dapibus proin ipsum, leo laoreet morbi vestibulum at ac eget, maecenas pede nec vitae lacinia purus. A praesent sit eros fermentum bibendum ullamcorper, sapien facilisis velit donec velit sapien hendrerit. Praesent quia lorem tempus et congue consequat."
                textMenuOptions={[
                  <TextMenuOption
                    onClick={ this.handleTextSelectorOption }>Option 1</TextMenuOption>,
                ]}
              />
              <Code>
                <TextHighlighter textMenuOptions={['<TextMenuOption>Option</TextMenuOption>']}/>
              </Code>
            </Section>

            <Section id={ 'text_menu_option' } name="Text Menu Option">
              <div style={{ backgroundColor: 'black', color: 'white', borderRadius: 3, fontSize: 12}}>
                <TextMenuOption onClick={()=>{}}>Option</TextMenuOption>
              </div>
              <Code>
                <TextMenuOption onClick={()=>{}}>Option</TextMenuOption>
              </Code>
            </Section>

            {/*<Section id="text_finder" name="Text Finder">*/}
              {/*<TextFinder*/}
                {/*elementToScroll={ document.getElementsByTagName('body')[0] }*/}
                {/*classToScrollTo={ ' ' }*/}
                {/*scrollOffset={ 0 }*/}
                {/*element="span"*/}
                {/*attribute="data-id"*/}
                {/*attrValue="1"*/}
                {/*displayValue="leo"*/}
                {/*onClear={ ()=>{} }*/}
              {/*/>*/}

              {/*<div className="hook">*/}
                {/*<div>*/}
                  {/*<div>*/}
                    {/*<div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dapibus, elit non blandit ornare, ex justo laoreet neque, feugiat accumsan est neque at orci. Aenean aliquet risus nisl, tempus malesuada quam tempus et. Integer sollicitudin, nunc tristique malesuada aliquam, erat nulla bibendum sapien, et mattis justo lacus in augue. Aliquam sollicitudin, risus ut ullamcorper vulputate, odio neque venenatis nulla, ut luctus ex libero non purus. Aliquam condimentum arcu id lorem maximus malesuada. Mauris in condimentum urna. Ut elementum tempor orci, vel blandit sem. Curabitur et eleifend quam, et lobortis elit. Nullam ac ipsum tempus, fringilla turpis at, facilisis orci. Fusce in suscipit nulla. Nulla ut neque tempus lorem rhoncus lobortis nec mattis ex. Aliquam erat volutpat."</div>*/}
                  {/*</div>*/}
                  {/*<div>*/}
                    {/*Nulla bibendum aliquet risus, sit amet ultrices urna vestibulum at. Curabitur consequat dictum ullamcorper. Fusce venenatis nulla mauris, ac pulvinar quam tristique eget. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec feugiat aliquam ligula sed tempor. Fusce eget lorem venenatis, molestie erat malesuada, gravida arcu. Nunc tempor, lectus viverra viverra dignissim, nibh felis lobortis orci, id commodo <span className="test-class another-one" data-id="1">leo</span> justo nec augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Ut vel ante vitae urna malesuada finibus. Cras mollis sollicitudin enim, sed faucibus metus rhoncus tempus. Quisque quis sapien in enim accumsan mattis eget at est. Maecenas facilisis fringilla odio. Donec id risus non mi lacinia cursus eget id nunc. Vivamus rutrum odio imperdiet, luctus sem sit amet, dictum enim. In vitae dignissim diam."*/}
                  {/*</div>*/}
                  {/*<div>*/}
                    {/*In nec condimentum felis. Etiam quis dui tellus. Morbi mollis hendrerit nulla eget finibus. Donec semper malesuada laoreet. Duis id enim vitae lorem fermentum cursus. Fusce sed lorem a justo tristique egestas vel ac sapien. Aenean dictum sapien eget eros accumsan interdum quis in est. Fusce sollicitudin augue nisl, quis eleifend lorem ultricies vitae. Nullam volutpat semper facilisis. Pellentesque luctus neque ac dui rhoncus eleifend. Proin congue mollis porta.*/}
                  {/*</div>*/}
                  {/*<div>*/}
                    {/*Maecenas ut suscipit <span data-id="1">leo</span>, eget sagittis justo. Morbi sollicitudin vulputate lacus, eget tristique diam blandit laoreet. Praesent laoreet nisl non ante tempor, id dictum erat scelerisque. Donec scelerisque in massa ut cursus. Donec tincidunt enim mauris, eget ultricies neque iaculis vitae. Nam laoreet efficitur ex in tincidunt. Suspendisse eget diam quis sapien imperdiet elementum. In ultrices eros nec accumsan malesuada. Integer fringilla ipsum ligula, sed rhoncus sem dapibus eget. Fusce a accumsan nisi. Praesent blandit rutrum dapibus. Maecenas pellentesque lacus eget dui auctor dapibus sed nec purus. Nullam eget sodales nisi. Suspendisse sed pulvinar <span data-id="1">leo</span>. Integer dapibus condimentum porta. Quisque ac tempus dui, lobortis aliquam enim.*/}
                  {/*</div>*/}
                  {/*<div>*/}
                    {/*Morbi eu aliquam dui, sed ullamcorper nulla. Curabitur viverra ligula varius tellus pretium, non consectetur sem eleifend. Praesent iaculis placerat <span data-id="1">leo</span>, interdum fermentum odio consequat commodo. Sed dignissim arcu auctor, dictum <span data-id="1">leo</span> vel, lacinia orci. Donec in ornare orci. Suspendisse lobortis, justo eu euismod iaculis, mauris ligula volutpat velit, maximus semper sapien nisl ut sapien. Nulla vitae aliquet sem. Proin in pulvinar erat. Curabitur lacinia, nibh eu tempor egestas, massa elit faucibus turpis, at sodales <span data-id="1">leo</span> orci in dolor. Ut vel dictum velit. Phasellus neque metus, interdum vitae quam ac, mattis vehicula diam. Donec et risus in mauris placerat condimentum.*/}
                  {/*</div>*/}
                {/*</div>*/}
              {/*</div>*/}
            {/*</Section>*/}

          </div>
        </div>

      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    paginationPage: state.components.paginationPage,
    paginationCount: state.components.paginationCount,
    isMobile: state.app.isMobile,
    inputText: state.components.inputText,
    inputFilterText: state.components.inputFilterText,
    outOf: state.components.outOf,
    completed: state.components.completed,
    tableData: state.components.tableData,
    tableFakerData: state.components.tableFakerData,
    isPanelVisible: state.components.isPanelVisible
  }
}

export default connect(mapStateToProps, {
  updatePaginationPage: actions.updatePaginationPage,
  updateInputText: actions.updateInputText,
  updateFilterInputText: actions.updateFilterInputText,
  demoCall: actions.demoCall,
  incrementCompleted: actions.incrementCompleted,
  togglePanel: actions.togglePanel
})(Components)
