import React, { Component } from 'react';
import model from "./models/kardModel";
import Input from "../../Input.jsx";
import Collapse from "../../Collapse.jsx";
class Kard extends Component {
  constructor(props) {
    super(props);
    this.removeKard = this.removeKard.bind(this);
    this.editKard = this.editKard.bind(this);
    this.kard = model(props.kard);
    this.state = { open: false };
  }

  removeKard() {
    this.props.removeKard(this.props.kard._id);
  }

  editKard() {
    this.props.editKard(this.kard);
  }



  render() {
    const i = this.kard.inputs;
    return (
      <div className="mt-2" >
        <button className=" form-control col-sm-6" onClick={() => this.setState({ open: !this.state.open })} >{this.kard.q}</button>
        <Collapse open={this.state.open}>
          <Input name="Question" type="q" set={i} />
          <Input name="Answer" type="a" set={i} />
          <Input name="Help" type="h" set={i} />
          <input type="button" value="remove" onClick={this.removeKard} />
          <input type="button" value="edit" onClick={this.editKard} />
        </Collapse>
      </div>
    );
  }
}

export default Kard;
