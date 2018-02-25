import React, { Component } from 'react';
import { account } from "../../util/dbFetch";

class Login extends Component {
  constructor() {
    super();
    this.user = { name: "", password: "" };
    this.register = this.register.bind(this);
    this.dataChange = this.dataChange.bind(this);
  }

  dataChange(e) {
    this.user[e.target.name] = e.target.value;
  }

  async register() {
    try {
      await account.register(this.user.name, this.user.password);
      alert("Registered!");
    } catch (e) {
      alert("username alredy in use");
    }
  }

  render() {
    return (
      <div>
        <input type="text" name="name" placeholder="name" defaultValue={this.user.name} onChange={this.dataChange} />
        <input type="text" name="password" placeholder="password" defaultValue={this.user.pssword} onChange={this.dataChange} />
        <input type="button" value="Register" onClick={this.register} />
      </div>
    );
  }
}

export default Login;