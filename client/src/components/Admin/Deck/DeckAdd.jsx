import React, { Component } from 'react';
import Collapse from "../../Collapse.jsx";

class DeckAdd extends Component {

  constructor() {
    super();
    this.name = '';
    this.DataChange = this.DataChange.bind(this);
    this.addDeck = this.addDeck.bind(this);
    this.state = { p: false };
  }

  DataChange(e) {
    this.name = e.target.value;
  }

  async addDeck() {
    await this.props.add(this.name, this.refs.isDefault.checked);
  }

  c() {
    this.setState({ p: !this.state.p });
  }
  render() {
    return (
      <div className="mb-2 mt-2">
        <button className="btn btn-primary col-sm-6" onClick={this.c.bind(this)} >Create Deck</button>
        <Collapse open={this.state.p}>
          <h1>Create Deck</h1>
          <form>
            <input type="text" onChange={this.DataChange} />
            <input type="button" value="ADD" onClick={this.addDeck} />
            <div>
              <input type="checkbox" ref="isDefault" />Is Default?
            </div>
          </form>
        </Collapse>
      </div>);
  }
}

export default DeckAdd;