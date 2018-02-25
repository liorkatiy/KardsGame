import React, { Component } from 'react';
import model from "./models/kardModel";
import Input from "../../Input.jsx";
import Collapse from "../../Collapse.jsx";

class KardAdd extends Component {

  constructor() {
    super();
    this.kard = model({ q: "", a: "", h: "" });
    this.addKard = this.addKard.bind(this);
    this.state = { open: false, clear: false };
  }

  async addKard() {
    if (this.kard.isValid()) {
      await this.props.add(this.kard);
      this.kard.clear();
      this.setState({ clear: true });
    }
  }

  render() {
    const i = this.kard.inputs;
    return (
      <div>
        <button className=" form-control col-sm-6" onClick={() => this.setState({ open: !this.state.open })} >Add Kard</button>
        <Collapse open={this.state.open}>
          <Input name="Question" type="q" set={i} clear={this.state.clear} />
          <Input name="Answer" type="a" set={i} clear={this.state.clear} />
          <Input name="Help" type="h" set={i} clear={this.state.clear} />
          <input type="button" className="form-control col-sm-6" value="ADD" onClick={this.addKard} />
        </Collapse>
      </div>
    );
  }
}

export default KardAdd;