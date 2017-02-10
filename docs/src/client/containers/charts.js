import React from 'react'
import { connect } from 'react-redux'
import { generateChartData } from '../actions/demo_actions'
import { Nav, NavLink, BarChart, PieChart, LineChart, Sankey, Code } from '../../../../src/index'
import Section from '../components/section'

class Charts extends React.Component {

  componentDidMount(){
    this.props.generateChartData()
  }

  render(){

    const {isMobile} = this.props

    const style = {
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
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 600,
        padding: '0 10px',
        order: 2,
      },
      nav: {
        base: { width: 150 },
        nav:{ borderTop: null, borderLeft: null, borderRadius: 0 }
      },
      navlink: {
        base: { border: 0, borderRadius: 0 },
        link:{ padding: '5px 3px' }
      },
      tooltip: {
        padding: 10,
        borderRadius: 3,
        fontSize: 12,
        color: 'white',
        backgroundColor: 'black',
        opacity: 0.8
      }
    }

    return(
      <div style={ style.base }>

        <div style={ style.container }>

          {!isMobile ?
            <div style={ style.navContainer }>
              <Nav offsetTop={ 70 } styles={ style.nav }>
                <NavLink to="#line" styles={ style.navlink }>Line</NavLink>
                <NavLink to="#bar" styles={ style.navlink }>Bar</NavLink>
                <NavLink to="#pie" styles={ style.navlink }>Pie</NavLink>
                <NavLink to="#sankey" styles={ style.navlink }>Sankey</NavLink>
              </Nav>
            </div> : null
          }

          <div style={ style.contentContainer }>

            <Section id="line" name="Line">
              <LineChart
                isResponsive
                data={ this.props.lineData }
                pointRadius={ 8 }
                tickFontSize={ 20 }
                xProp="date"
                yProp="count"
                tooltip={ (obj) =>
                  <div style={ style.tooltip }>{ obj.data.count }</div>
                }/>
              <Code type="jsx">
                <LineChart
                  isResponsive
                  data={
                    [{
                      name: 'Set 1',
                      values: [{count: 0 , date: '12-10-2016'}]
                    }]
                  }
                  xProp="date"
                  yProp="count"
                  tooltip={ (obj) => '<div>{ obj.data.count }</div>' }/>
              </Code>
            </Section>

            <Section id="bar" name="Bar">

              <BarChart
                isResponsive
                data={ this.props.barData }
                xProp="year"
                initialWidth={ 960 } //960
                initialHeight={ 480 } //480
                yProp={ ['count', 'number'] }
                tooltip={ (obj) =>
                  <div style={ style.tooltip }>
                    <h3 style={{ margin: 0}}>{ obj.data.year }</h3>
                    <p style={{ marginBottom: 0}}>
                      Count: { obj.data.count }
                    </p>
                    <p style={{ marginBottom: 0, marginTop: 1}}>
                      Number: { obj.data.number }
                    </p>
                  </div>
                }
                margin={{
                  top: 20,
                  right: 50,
                  bottom: 40,
                  left: 50
                }}/>


              <Code type="jsx">
                <BarChart
                  data={ [{count: 4, year: 2016}] }
                  isResponsive
                  xProp="year"
                  yProp="count"/>
              </Code>
            </Section>

            <Section id="pie" name="Pie">
              <PieChart
                isResponsive
                data={ this.props.pieData }
                labelProp="age"
                valueProp="population"
                hideLabelPercentage={ 3 }
                tooltip={ (obj) =>
                  <div style={ style.tooltip }>
                    <h3 style={{ margin: 0}}>{ obj.data.age}</h3>
                    <p style={{ marginBottom: 0}}>
                      Pop: { obj.data.population }
                    </p>
                  </div>
                }
              />
              <Code type="jsx">
                <PieChart
                  isResponsive
                  data={ [{age: '<5', population: 1234 }] }
                  labelFontSize={ 20 }
                  labelProp="age"
                  valueProp="population"
                  tooltip={ (obj) => '<div>{ obj.data.count }</div>' }
                />
              </Code>
            </Section>

            <Section id="sankey" name="Sankey">
              <Sankey
                isResponsive
                data={ this.props.sankeyData }
                tooltip={ (obj) =>
                  <div style={ style.tooltip }>
                    <h3 style={{ margin: 0}}>{ obj.data.age}</h3>
                    <p style={{ marginBottom: 0}}>
                      Node: { obj.data.name }
                    </p>
                    <p style={{ marginBottom: 0}}>
                      Value: { obj.data.value }
                    </p>
                  </div>
                }
              />
              <Code type="jsx">
                <Sankey isResponsive data={{ nodes: [], links: []}}/>
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
    isMobile: state.app.isMobile,
    lineData: state.charts.lineData,
    barData: state.charts.barData,
    sankeyData: state.charts.sankeyData,
    pieData: state.charts.pieData
  }
}

export default connect(mapStateToProps, {
  generateChartData
})(Charts)