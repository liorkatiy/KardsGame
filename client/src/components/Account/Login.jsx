import React, { Component } from 'react';
import { account } from "../../util/dbFetch";
import userModel from "../Admin/User/models/userCreate";
import Input from "../Inputs/Input.jsx";

class Login extends Component {
  constructor() {
    super();
    this.user = userModel({});
    this.login = this.login.bind(this);
    this.test = this.test.bind(this);
  }

  async login() {
    if (this.user.isValid()) {
      let result = await account.login(this.user.name, this.user.password);
      if (result) {
        this.props.reload();
      } else {
        alert("invalid username or password");
      }
    }
  }

  async test() {
    this.props.reload();
  }

  render() {
    const i = this.user.inputs;
    return (
      <div  >
        <a href="http://localhost:9001/account/google">google</a>
        <Input set={i} type="name" name="User Name" />
        <Input set={i} type="password" name="Password" />
        <input className="form-control" type="button" value="Login" onClick={this.login} />
      </div>
    );
  }
}

export default Login;