import React from 'react';

class Snake extends React.Component {
  render () {

    const snake = this.props.locations.map((location, index) => {
      return(
      <div 
        key={index} 
        className="snakepiece" 
        style={{
          width: this.props.dims.distRatio - 2 + 'px',
          height: this.props.dims.distRatio - 4 + 'px',
          margin: -this.props.dims.distRatio / 2 + 'px',
          borderRadius: this.props.dims.distRatio * 0.4 + 'px',
          // location = square*ratio + offset
          left: location.sx * this.props.dims.distRatio + this.props.dims.distRatio/2 + 'px',
          top: location.sy * this.props.dims.distRatio - this.props.dims.scoreHeight + this.props.dims.distRatio/2 + 'px'
        }}
      ></div>
      )
    })

    return (
      <div>{snake}</div>
    )
  }
}

export default Snake;