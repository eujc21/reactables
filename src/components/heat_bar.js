import React, { PropTypes } from 'react'

const HeatBar = ({ score, width, height, scoreTitle, colorArray, textColor, startSide }) => {
    const style = {
        base: {
            height
        },
        heatBar: {
            height, 
            background: `linear-gradient(to ${startSide}, ${colorArray[0]} 0%,${colorArray[1]} 40%,${colorArray[2]} 60%,${colorArray[3]} 100%)`,
            filter: `progid:DXImageTransform.Microsoft.gradient( startColorstr='${colorArray[0]}', endColorstr='${colorArray[3]}',GradientType=1 )`,
            padding: 0
        },
        indicatorScore: {
            fontWeight: 'bold',
            margin: 0,
            color: textColor
        },
        indicatorLine: {
            fontWeight: 'bold',
            margin: 0,
            marginLeft: `${score}%`,
            color: textColor,
            borderLeft: '2px solid #000'
        }
    }

    width === undefined ? style.base.boxSizing = 'content-box' : style.base.width = width
    width === undefined ? style.heatBar.boxSizing = 'content-box' : style.heatBar.width = width

    return (
        <div style={ { display: 'flex', flexDirection: 'column'} }>
            <div style={ style.base }>
                <p style={ style.indicatorScore }><span style={ { fontSize: '11px', fontWeight: 'normal'}}>{scoreTitle}</span></p>
            </div>
            <div style={ style.heatBar }>
                <p style={ style.indicatorLine }>&nbsp;</p>
            </div>
        </div>
    )
}

HeatBar.PropTypes = {
    score: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    scoreTitle: PropTypes.string,
    colorArray: PropTypes.arrayOf(PropTypes.string),
    textColor: PropTypes.string,
    startSide: PropTypes.string
}

HeatBar.defaultProps = {
    width: undefined,
    score: 0,
    height: 20,
    scoreTitle: '',
    colorArray: ['#27ae60', '#dfea10', '#efec13', '#e74c3c'],
    textColor: '#000',
    startSide: 'left'
}

export default HeatBar