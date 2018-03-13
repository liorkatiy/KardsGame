import React, { Component } from 'react';
import model from "./models/kardModel";
import Input from "../../Inputs/Input.jsx";
import Collapse from "../../Collapse.jsx";
import Radio from "../../Inputs/Radio.jsx";

class Kard extends Component {
  constructor(props) {
    super(props);
    this.removeKard = this.removeKard.bind(this);
    this.editKard = this.editKard.bind(this);
    this.setAnswer = this.setAnswer.bind(this);
    this.reset = this.reset.bind(this);
    this.kard = model(props.kard);
    this.state = { open: false };
  }

  removeKard() {
    this.props.removeKard(this.kard._id);
  }

  editKard() {
    if (this.kard.isValid()) {
      this.props.editKard(this.kard);
    }
  }

  setAnswer(e) {
    this.kard.a = e.target.value;
  }

  reset() {
    this.forceUpdate();
  }

  render() {
    const i = this.kard.inputs;
    const names = [this.kard.q1, this.kard.q2, this.kard.q3, this.kard.q4,];

    return (
      <div className="mt-2" >
        <button className=" form-control col-sm-6" onClick={() => this.setState({ open: !this.state.open })} >{this.kard.q}</button>
        <Collapse open={this.state.open}>
          <form>
            <Input name="Question" type="q" set={i} onChange={this.reset} />
            <Input name="Answer1" type="q1" set={i} onChange={this.reset} />
            <Input name="Answer2" type="q2" set={i} onChange={this.reset} />
            <Input name="Answer3" type="q3" set={i} onChange={this.reset} />
            <Input name="Answer4" type="q4" set={i} onChange={this.reset} />

            <div>Answer</div>
            Question: <span className="text-primary" >{this.kard.q}</span>
            <Radio names={names} type="a" set={i} clear={this.state.clear} />


            <input type="button" value="remove" onClick={this.removeKard} />
            <input type="button" value="edit" onClick={this.editKard} />
          </form>
        </Collapse>
      </div>
    );
  }
}

export default Kard;
