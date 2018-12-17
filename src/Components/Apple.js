import React from 'react';

class Apple extends React.Component {
  newApple() {
    return (
      <div
        className="apple"
        style={{
          width: this.props.dims.distRatio - 4 + 'px',
          height: this.props.dims.distRatio - 4 + 'px',
          margin: -this.props.dims.distRatio / 2 - 2 + 'px',
          borderRadius: this.props.dims.distRatio / 2 + 'px',
          // Location = square*ratio + offset
          left: this.props.ax * this.props.dims.distRatio + this.props.dims.distRatio*0.6 + 'px',
          top: this.props.ay * this.props.dims.distRatio - this.props.dims.scoreHeight + this.props.dims.distRatio*0.6 + 'px'
        }}
      ></div>
    );
  }

  render() {
    const apple = this.newApple();
    return (
      <div>{apple}</div>
    )
  }
}

export default Apple;