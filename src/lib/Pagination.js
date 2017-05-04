import React from 'react'
import PropTypes from 'prop-types'
import merge from 'lodash/merge'

const Pagination =({
  page,
  pageCount,
  pageSkip,
  showFirst,
  showLast,
  showEllipses,
  firstText,
  lastText,
  prevText,
  nextText,
  maintainSkipWidth,
  onClick,
  style })=>{

  const handleNext=()=>{
    const pageNumber = page + 1
    if(pageNumber > pageCount) return
    onClick(pageNumber)
  }

  const handlePrev=()=>{
    const pageNumber = page - 1
    if(pageNumber < 1) return
    onClick(pageNumber)
  }

  const handleSkip=(pageNumber)=>{
    if(page === pageNumber) return
    onClick(pageNumber)
  }

  const handleFirst =()=>{
    onClick(1)
  }

  const handleLast =()=>{
    onClick(pageCount)
  }

  const styles = {
    ul: {
      display: 'flex',
      listStyleType: 'none',
      margin: 0,
      padding: 0
    },
    pageControl: {
      base:{
        //border: '1px solid rgba(16,16,16,0.1)',
        backgroundColor: '#525252',
        color: '#fff',
        borderRadius: 2,
        margin: '0 3px',
        padding: 7,
        cursor: 'pointer'
      },
      disabled:{
        //border: '1px solid rgba(16,16,16,0.1)',
        borderRadius: 2,
        margin: '0 3px',
        padding: 7,
        cursor: 'default'
      }
    },
    pageNumber: {
      margin: '0 3px',
      padding: 7,
      cursor: 'pointer'
    },
    selected: {
      margin: '0 3px',
      padding: 7,
      //border: '1px solid rgba(16,16,16,0.1)',
      borderRadius: 2,
      backgroundColor: '#525252',
      color: '#fff'
    },
    ellipses: {
      margin: 0,
      padding: 7,
      whiteSpace: 'nowrap',
      cursor: 'pointer'
    }
  }

  merge(styles, style)

  const First =()=>{
    if(!showFirst) return null
    return(
      <li style={ page <= 1 ? styles.pageControl.disabled : styles.pageControl.base } onClick={ handleFirst }>
        { firstText }
      </li>
    )
  }

  const Prev =()=>{
    return(<li style={ page <= 1 ? styles.pageControl.disabled : styles.pageControl.base} onClick={ handlePrev }>{ prevText }</li>)
  }

  const LeftEllipses =()=>{

    if(!showEllipses) return null
    if(pageSkip * 2 >= pageCount) return null
    if(page <= pageSkip + 1) return null

    return(
      <li
        style={ styles.ellipses }
        onClick={()=> handleSkip(1)}>
        1 ...
      </li>
    )
  }

  const RightEllipses =()=>{
    if(!showEllipses) return null
    if(pageSkip * 2 >= pageCount) return null
    if(page >= (pageCount - pageSkip)) return null

    return(
      <li
        onClick={ ()=> handleSkip(pageCount) }
        style={ styles.ellipses }>
        ... { pageCount }
      </li>
    )
  }


  const buildPages =()=>{
    if(pageSkip <= 0) return null

    const frontSkip = maintainSkipWidth
      ? (pageCount - page) < pageSkip ? (pageSkip - (pageCount - page)) + pageSkip : pageSkip
      : pageSkip

    const backSkip = maintainSkipWidth
      ? (page <= pageSkip) ? pageSkip + (pageSkip - page + 1) : pageSkip
      : pageSkip

    const front = new Array(frontSkip)
      .fill(page)
      .reduce((arr, next, index) => {
        next = next - index - 1
        if(next < 1) return arr
        return [next, ...arr]
      }, [])

    const back = new Array(backSkip)
      .fill(page)
      .reduce((arr, next, index) => {
        next = next + index + 1
        if(next > pageCount) return arr
        return [...arr, next]
      }, [])

    return [...front, page, ...back].map(pageNumber =>
      <li
        key={ pageNumber }
        style={ page !== pageNumber ? styles.pageNumber : styles.selected }
        onClick={ ()=> handleSkip(pageNumber) }
      >{pageNumber}</li>)
  }

  const Next =()=>{
    return(<li style={ page >= pageCount ? styles.pageControl.disabled : styles.pageControl.base } onClick={ handleNext }>{ nextText }</li>)
  }

  const Last =()=>{
    if(!showLast) return null
    return(<li style={ page >= pageCount ? styles.pageControl.disabled : styles.pageControl.base} onClick={ handleLast }>{ lastText }</li>)
  }

  return(
    <ul style={ styles.ul }>
      <First />
      <Prev />
      <LeftEllipses/>
      { buildPages() }
      <RightEllipses/>
      <Next />
      <Last />
    </ul>
  )

}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  pageSkip: PropTypes.number,
  showFirst: PropTypes.bool,
  showLast: PropTypes.bool,
  showEllipses: PropTypes.bool,
  firstText: PropTypes.node,
  lastText: PropTypes.node,
  nextText: PropTypes.node,
  prevText: PropTypes.node,
  maintainSkipWidth: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.object
}

Pagination.defaultProps = {
  page: 1,
  pageCount: 1,
  showEllipses: false,
  showFirst: false,
  showLast: false,
  firstText: 'First',
  lastText: 'Last',
  nextText: 'Next',
  prevText: 'Prev',
  style:{}
}

export default Pagination