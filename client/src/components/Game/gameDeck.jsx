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
    this.setState = () => console.log("xD");
  }

  async answer() {
    if (this._answer) {
      this.last.checked = false;
      this.refs.btnAnswer.disabled = true;
      const data = await this.props.answer(this._answer);
      this.refs.btnAnswer.disabled = false;
      alert(data.a ? ":)" : ":(");
      this._answer = "";
      this.setState({ kard: data.nextKard });
    }
    else {
      alert("pick answer");
    }
  }

  async dataChanged(e) {
    this._answer = e.target.value;
    this.last = e.target;
  }

  render() {
    if (this.state) {
      return (
        <div className="card" >
          <div>Question: {this.state.kard.q}</div>
          <div>
            <input name="answer" type="radio"
              value="q1"
              onClick={this.dataChanged} />
            {this.state.kard.q1}
          </div>
          <div>
            <input name="answer" type="radio"
              value="q2"
              onClick={this.dataChanged} />
            {this.state.kard.q2}
          </div>
          <div>
            <input name="answer" type="radio"
              value="q3"
              onClick={this.dataChanged} />
            {this.state.kard.q3}
          </div>
          <div>
            <input name="answer" type="radio"
              value="q4"
              onClick={this.dataChanged} />
            {this.state.kard.q4}
          </div>
          <input type="button" ref="btnAnswer" value="answer" onClick={this.answer} />
        </div>
      );
    }
    else return "";
  }
}

export default componentName;