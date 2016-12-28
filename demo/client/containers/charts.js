import React from 'react'
import { connect } from 'react-redux'
import { Nav, NavLink, BarChart, LineChart, Sankey, Code } from '../../../src/index'
import Section from '../components/section'
import { barData, sankeyData } from '../constants/chart_data'
import moment from 'moment'

class Charts extends React.Component {

  render(){

    const style = {
      base: {
        position: 'relative',
      },
      container: {
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        margin: '0 auto',
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
        flexShrink: 1,
        maxWidth: 600,
        order: 2,
      },
      nav: {
        base: { width: 150 },
        nav:{ borderTop: null, borderLeft: null, borderRadius: 0 }
      },
      navlink: {
        base: { backgroundColor: null, border: 0 },
        link:{ padding: '0 0 10px 0' }
      },
    }

    return(
      <div style={ style.base }>

        <div style={ style.container }>

          <div style={ style.navContainer }>
            <Nav offsetTop={ 70 } styles={ style.nav }>
              <NavLink to="#line" styles={ style.navlink }>Line</NavLink>
              <NavLink to="#bar" styles={ style.navlink }>Bar</NavLink>
              <NavLink to="#sankey" styles={ style.navlink }>Sankey</NavLink>
            </Nav>
          </div>

          <div style={ style.contentContainer }>

            <Section id="line" name="Line">
              <LineChart isResponsive data={ [
                {
                  name: 'Set 1',
                  values: [
                    {
                      count: 12,
                      date: moment().toISOString()
                    },
                    {
                      count: 20,
                      date: moment().add(1, 'days').toISOString()
                    },
                    {
                      count: 55,
                      date: moment().add(2, 'days').toISOString()
                    },
                    {
                      count: 25,
                      date: moment().add(3, 'days').toISOString()
                    },
                    {
                      count: 35,
                      date: moment().add(4, 'days').toISOString()
                    }
                  ]
                }
              ] } xProp="date" yProp="count"/>
              <Code>
                <LineChart
                  isResponsive
                  data={
                    [{
                      name: 'Set 1',
                      values: [{count: 0 , date: '12-10-2016'}]
                    }]
                  }
                  xProp="date"
                  yProp="count"/>
              </Code>
            </Section>

            <Section id="bar" name="Bar">
              <BarChart
                data={[
                  {
                    count: 202,
                    year: 2000
                  },

                  {
                    count: 179,
                    year: 2002
                  },

                  {
                    count: 154,
                    year: 2003
                  },

                  {
                    count: 215,
                    year: 2001
                  },

                  {
                    count: 260,
                    year: 2010
                  }
                ]}
                isResponsive
                xProp="year"
                yProp="count"/>

              <Code>
                <BarChart
                  data={ [{count: 4, year: 2016}] }
                  isResponsive
                  xProp="year"
                  yProp="count"/>
              </Code>
            </Section>

            <Section id="sankey" name="Sankey">
              <Sankey isResponsive data={{
                nodes: [
                  { name: 'Node 0'},
                  { name: 'Node 1'},
                  { name: 'Node 2'},
                  { name: 'Node 3'},
                  { name: 'Node 4'},
                ],
                links: [
                  {
                    source: 0,
                    target: 4,
                    value: 10
                  },
                  {
                    source: 1,
                    target: 4,
                    value: 10
                  },
                  {
                    source: 2,
                    target: 4,
                    value: 10
                  },
                  {
                    source: 3,
                    target: 4,
                    value: 10
                  },
                ]
              }}/>
              <Code>
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

  }
}

export default connect(mapStateToProps, {

})(Charts)