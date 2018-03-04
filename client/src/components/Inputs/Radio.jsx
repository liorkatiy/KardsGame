import React, { Component } from 'react';
import ID from "./Id";

class Radio extends Component {
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
    /* if (this.props.onChange) {
       this.props.onChange();
     }*/
    if (this.state.err !== err) {
      this.setState({ err });
    }
  }

  render() {

    let cls = "";

    if (this.state.err == null) {
      cls += " is-valid";
    }
    else if (this.state.err !== "__dirty") {
      cls += " is-invalid";
    }
    const id = "input" + this.idx;
    return (
      <div className="form-group mb-4">
        {this.props.names.map((n, i) =>
          <div key={i} className="form-check">
            <label className="form-check-label" htmlFor="input">
              <input className="form-check-input"
                id={id}
                ref={this.props.set(this.props.type, this.onError)} />
              {n}
            </label>
          </div>)}
        <input className={cls}
          type="hidden"
        />
        <div className="invalid-feedback">
          {this.state.err}
        </div>

      </div>
    );
  }
}

export default Radio;