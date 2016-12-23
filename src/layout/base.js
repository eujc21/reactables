import React, { PropTypes } from 'react'

export default class BaseLayout extends React.Component {
  static propTypes = {
    breakPoints: PropTypes.shape({
      xs: PropTypes.number,
      sm: PropTypes.number,
      md: PropTypes.number,
      lg: PropTypes.number,
      xl: PropTypes.number
    })
  }

  static defaultProps = {
    breakPoints: {
      xs: 400,
      sm: 767,
      md: 991,
      lg: 1030,
      xl: 1440
    }
  }


}