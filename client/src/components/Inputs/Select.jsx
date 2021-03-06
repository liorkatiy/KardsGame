import React, { Component } from 'react';
import ID from "./Id";

class Select extends Component {
  constructor() {
    super();
    this.onError = this.onError.bind(this);
    this.state = { err: "__dirty" };
    this.idx = ID();
  }

  componentWillReceiveProps(props) {
    if (props.clear) {
      this.setState({ err: "__dirty" });
    }
  }

  onError(err) {
    if (this.state.err !== err) {
      this.setState({ err });
    }
  }

  render() {
    let cls = "form-control";

    if (this.state.err == null) {
      cls += " is-valid";
    }
    else if (this.state.err !== "__dirty") {
      cls += " is-invalid";
    }
    const id = "input" + this.idx;
    return (
      <div className="form-group mb-4" >
        <label className="control-label  col-sm-12" htmlFor="select" >
          {this.props.name}:

        <select id={id}
            className={cls}
            ref={this.props.set(this.props.type, this.onError)} >
            {this.props.options.map((o, i) =>
              <option key={i} value={o.value} >{o.name}</option>)}
          </select>
          <div className="invalid-tooltip">
            {this.state.err}
          </div>
        </label>
      </div>
    );
  }
}

export default Select;