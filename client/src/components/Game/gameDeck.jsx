import React, { Component } from 'react';

class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = { kard: props.kard };
    this.answer = this.answer.bind(this);
    this.dataChanged = this.dataChanged.bind(this);
  }

  componentWillReceiveProps(p) {
    this.setState({ kard: p.kard });
  }

  componentWillUnmount() {
    console.log("unmounting");
    this.setState = () => console.log("xD");
  }

  async answer() {
    const kard = await this.props.answer(this._answer);
    this.setState({ kard });
  }

  async dataChanged(e) {
    this._answer = e.target.value;
  }

  render() {
    if (this.state) {
      return (
        <div className="card" >
          <div>Question: {this.state.kard.q}</div>
          <div>Help: {this.state.kard.h}</div>
          <input type="text" placeholder="answer" onChange={this.dataChanged} defaultValue="" />
          <input type="button" value="answer" onClick={this.answer} />
        </div>
      );
    }
    else return "";
  }
}

export default componentName;