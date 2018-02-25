import React, { Component } from 'react';

class DeckAdd extends Component {

  constructor() {
    super();
    this.name = '';
    this.DataChange = this.DataChange.bind(this);
    this.addDeck = this.addDeck.bind(this);
  }

  DataChange(e) {
    this.name = e.target.value;
  }

  async addDeck() {
    await this.props.add(this.name);
  }

  render() {
    return (
      <div>
        <h1>Create Deck</h1>
        <form>
          <input type="text" onChange={this.DataChange} />
          <input type="button" value="ADD" onClick={this.addDeck} />
        </form>
      </div>);
  }
}

export default DeckAdd;