import React, { Component } from 'react';
import { user } from '../../../util/dbFetch';
import Progress from './progress.jsx';
import UserDeckAdd from "./UserDeckAdd.jsx";
import { localUser, googleUser } from "./models/user";
import Input from "../../Inputs/Input.jsx";
import Collapse from "../../Collapse.jsx";
import Select from "../../Inputs/Select.jsx";
import { MdDelete, MdEdit } from "react-icons/lib/md";

class User extends Component {
  constructor(props) {
    super(props);
    this.isLocal = props.user.userData.localUserID ? true : false;
    this.isGoogle = props.user.userData.googleID ? true : false;
    this.user = this.isGoogle ? googleUser(props.user) : localUser(props.user);
    this.addDeck = this.addDeck.bind(this);
    this.removeDeck = this.removeDeck.bind(this);
    this.edit = this.edit.bind(this);
    this.remove = this.remove.bind(this);
    this.state = { progress: props.user.progress, open: false, clear: false };
  }

  async addDeck(deck) {
    try {
      const g = await user.addProg(this.user.name, deck);
      if (g) {
        const progress = this.state.progress;
        progress.push({ name: deck });
        this.setState({ progress });
      }
      else {
        console.log("haa");
      }
    }
    catch (e) {
      console.log(e);
    }
  }

  async removeDeck(deckName) {
    let removed = await user.removeProg(this.user.name, deckName);
    if (removed) {
      const progress = this.state.progress.filter(p => p.name !== deckName);
      this.setState({ progress });
    }
    else {
      alert("bah");
    }
  }

  async edit() {
    if (this.user.isValid()) {
      let v = await this.props.edit(this.user.getModel());
      if (v) {
        alert("edited");
        this.setState({ clear: true });
      }
      else {
        alert("didnt edit");
        this.setState({ clear: true });
      }
    }
  }
  async remove() {
    const user = this.user;
    const isLocal = this.user.userData.localUserID ? true : false;
    let v = await this.props.remove(user._id, isLocal);
    if (v) {
      alert("removed " + user.name);
    }
    else {
      alert("error couldnt delete " + user.name);
    }
  }

  haveProgress() {
    return this.state.progress.length ?
      <div>
        <div>
          <b> Decks:</b>
        </div>
        <div>
          {this.state.progress.map(p =>
            <Progress key={p.name} prog={p} remove={this.removeDeck} />
          )}
        </div>
      </div> : null;
  }

  render() {
    const i = this.user.inputs;
    const c = this.state.clear;
    const options = [
      { value: 0, name: "user" },
      { value: 1, name: "admin" }
    ];
    return (
      <div className="mt-3">
        <div className="input-group col-sm-8">
          <button
            className="form-control"
            onClick={() => this.setState({ open: !this.state.open })} >
            {this.user.name}
          </button>
          <button
            className="form-control btn btn-outline-primary col-sm-2"
            onClick={this.remove}>
            <MdDelete size="24" />
          </button>
          <button
            className="form-control btn btn-outline-primary col-sm-2"
            onClick={this.edit}>
            <MdEdit />
          </button>
        </div>

        <Collapse open={this.state.open}>
          <form className="card col-sm-8" onSubmit={(e) => e.preventDefault()} >
            <Input name="User Name" type="name" set={i} clear={c} />
            {this.isLocal ? <Input
              name="Password"
              type="userData.localUserID.password"
              set={i}
              clear={c} /> : this.isGoogle ? "google" : "facebook"}
            {this.isLocal ? <Select
              name="Premission"
              type="userData.localUserID.premission"
              set={i}
              clear={c}
              options={options} /> : null}

            <UserDeckAdd add={this.addDeck} decks={this.props.decks} prog={this.state.progress} />
            {this.haveProgress()}

          </form>

        </Collapse>
      </div>
    );
  }
}

export default User;