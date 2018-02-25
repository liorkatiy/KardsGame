import React, { Component } from 'react';
import { account } from "../../util/dbFetch";

class Login extends Component {
  constructor() {
    super();
    this.user = { name: "", password: "" };
    this.login = this.login.bind(this);
    this.dataChange = this.dataChange.bind(this);
  }

  dataChange(e) {
    this.user[e.target.name] = e.target.value;
  }

  async login() {
    try {
      let result = await account.login(this.user.name, this.user.password);
      if (result) {
        this.props.reload();
      } else {
        alert("bahh");
      }
    } catch (e) {
      alert(e);
      alert("invalid username or password");
    }
  }

  render() {
    return (
      <div  >
        <input type="text" name="name" placeholder="name" defaultValue={this.user.name} onChange={this.dataChange} />
        <input type="text" name="password" placeholder="password" defaultValue={this.user.pssword} onChange={this.dataChange} />
        <input type="button" value="Login" onClick={this.login} />
      </div>
    );
  }
}

export default Login;