import React, { Component } from 'react';
import model from "./models/kardModel";
import Input from "../../Inputs/Input.jsx";
import Collapse from "../../Collapse.jsx";
import Radio from '../../Inputs/Radio.jsx';

class KardAdd extends Component {

  constructor() {
    super();
    this.kard = model({ q: "", q1: "", q2: "", q3: "", q4: "", a: "" });
    this.addKard = this.addKard.bind(this);
    this.reset = this.reset.bind(this);
    this.setAnswer = this.setAnswer.bind(this); this.state = { open: false, clear: false };
  }

  async addKard() {
    if (this.kard.isValid()) {
      await this.props.add(this.kard.getModel());
      this.kard.clear();
      this.setState({ clear: true });
    }
  }

  reset() {
    this.forceUpdate();
  }

  setAnswer(e) {
    this.kard.a = e.target.value;
  }

  render() {
    const i = this.kard.inputs;
    const names = [this.kard.q1, this.kard.q2, this.kard.q3, this.kard.q4,];
    const haveQuestions = names.filter(n => n).length === 4;
    return (
      <div>
        <button className=" form-control col-sm-6" onClick={() => this.setState({ open: !this.state.open })} >Add Kard</button>
        <Collapse open={this.state.open}>
          <Input name="Question" type="q" set={i} clear={this.state.clear} />
          <Input name="Answer 1" type="q1" set={i} clear={this.state.clear} onChange={this.reset} />
          <Input name="Answer 2" type="q2" set={i} clear={this.state.clear} onChange={this.reset} />
          <Input name="Answer 3" type="q3" set={i} clear={this.state.clear} onChange={this.reset} />
          <Input name="Answer 4" type="q4" set={i} clear={this.state.clear} onChange={this.reset} />

          {haveQuestions ? <div><div>Answer</div>
            Question: <span className="text-primary" >{this.kard.q}</span>
            <Radio names={names} type="a" set={i} clear={this.state.clear} /></div> : null}

          <input type="button" className="form-control col-sm-6" value="ADD" onClick={this.addKard} />
        </Collapse>
      </div>
    );
  }
}

export default KardAdd;

/*
 <Input name={this.kard.q1} type="a" set={i} clear={this.state.clear} onChange={this.reset} />
          <Input name={this.kard.q2} type="a" set={i} clear={this.state.clear} onChange={this.reset} />
          <Input name={this.kard.q3} type="a" set={i} clear={this.state.clear} onChange={this.reset} />
          <Input name={this.kard.q4} type="a" set={i} clear={this.state.clear} onChange={this.reset} />

          <div> <input type="radio" name="answer" value={this.kard.q1} onClick={this.setAnswer} /> {this.kard.q1}</div>
          <div> <input type="radio" name="answer" value={this.kard.q2} onClick={this.setAnswer} /> {this.kard.q2}</div>
          <div> <input type="radio" name="answer" value={this.kard.q3} onClick={this.setAnswer} /> {this.kard.q3}</div>
          <div> <input type="radio" name="answer" value={this.kard.q4} onClick={this.setAnswer} /> {this.kard.q4}</div>
          */