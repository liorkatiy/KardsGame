import React, { Component } from 'react';
import account from "../../util/serverFetcher/accountData";
import userModel from "../Admin/User/models/userCreate";
import Input from "../Inputs/Input.jsx";

class Login extends Component {
  constructor() {
    super();
    this.user = userModel({});
    this.register = this.register.bind(this);
  }



  async register() {
    if (this.user.isValid()) {
      const result = await account.register(this.user.name, this.user.password);
      alert(result ? "Registered!" : "username alredy in use");
    }
  }

  render() {
    const i = this.user.inputs;
    return (
      <div>
        <Input set={i} type="name" name="User Name" />
        <Input set={i} type="password" name="Password" />
        <input className="form-control" type="button" value="Register" onClick={this.register} />
      </div>
    );
  }
}

export default Login;