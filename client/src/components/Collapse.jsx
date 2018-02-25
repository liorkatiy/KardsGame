import React, { Component } from 'react';

class Collapse extends Component {
  constructor() {
    super();
    this.transition = { overflow: "hidden" };
  }

  componentDidMount() {
    this.setSize(this.props);
    this.transition = { transition: "all 1s ease-in-out", overflow: "hidden" };
  }

  componentWillReceiveProps(props) {
    this.setSize(props);
  }

  setSize(props) {
    const w = this.wrapper;
    if (!props.open) {
      w.style.transitionTimingFunction = "cubic-bezier(0,1,0,1)";
      w.style.maxHeight = "0px";
    }
    else {
      w.style.transitionTimingFunction = "cubic-bezier(1,0,1,0)";
      w.style.maxHeight = "10000px";
    }
  }

  render() {
    return (
      <div ref={(e) => {
        this.wrapper = e;
      }} style={this.transition}>{this.props.children}</div>
    );
  }
}

export default Collapse;