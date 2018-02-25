import React, { Component } from 'react';
import userModel from "./models/userCreate";
import Input from "../../Input.jsx";
import Collapse from "../../Collapse.jsx";

class UserAdd extends Component {
  constructor() {
    super();
    this.addUser = this.addUser.bind(this);
    this.onNameError = this.onNameError.bind(this);
    this.onPasswordError = this.onPasswordError.bind(this);
    this.user = userModel({});
    this.state = { cls: "collapse show", p: false };
  }

  async addUser() {
    const user = this.user;
    const r = user.isValid();
    if (r) {
      await this.props.add(user.name, user.password);
    }
  }

  onNameError(err) {
    const s = this.state;
    s.name = err;
    this.setState(s);
  }

  onPasswordError(err) {
    const s = this.state;
    s.password = err;
    this.setState(s);
  }

  c() {
    this.setState({ p: !this.state.p });
  }

  render() {
    const i = this.user.inputs;
    return (
      <div className="mb-2 mt-2">
        <button className="btn btn-primary col-sm-6" onClick={this.c.bind(this)} >Create User</button>
        <Collapse open={this.state.p}>
          <form className="col-sm-6" >
            <Input name="Name" type="name" set={i} />
            <Input name="Password" type="password" set={i} />
            <input
              type="button"
              className="form-control btn btn btn-outline-primary"
              value="ADD"
              onClick={this.addUser} />

          </form>
        </Collapse>
      </div>);
  }
}

export default UserAdd;