import React, { Component } from 'react';
import { MdAdd } from "react-icons/lib/md";
class UserDeckAdd extends Component {
  constructor(props) {
    super(props);
    this.componentWillReceiveProps(props);
    this.dataChanged = this.dataChanged.bind(this);
    this.addDeck = this.addDeck.bind(this);
    this.state = { filter: "" };
  }

  componentWillReceiveProps(props) {
    if (props.decks.length) {
      const prog = props.prog.map(p => p.deck);
      this.avDecks = this.props.decks.filter(d =>
        prog.indexOf(d.name) === -1);
      this.newDeck = this.avDecks.length ? this.avDecks[0].name : "";
    }
  }

  dataChanged(e) {
    this.newDeck = e.target.value;
  }

  async addDeck() {
    await this.props.add(this.newDeck);
  }

  deckSearch(e) {
    this.setState({ filter: e.target.value })
  }

  render() {
    const f = this.state.filter;
    const deckList = this.avDecks.filter(d => d.name.includes(f));
    if (this.avDecks.length) {
      return (
        <div className="col-sm-12" >
          <div> Add Deck:</div>
          <div className="input-group" >
            <input className="form-control" placeholder="Deck Search" type="text" onChange={this.deckSearch.bind(this)} />
            <button className="btn btn-outline-primary" onClick={this.addDeck} ><MdAdd /></button>

          </div>
          <select size="3" onBlur={this.dataChanged} className="custom-select"  >

            {deckList.map((deck) => <option key={deck.name} value={deck.name} >{deck.name}</option>)}
          </select>
        </div>
      );
    } else return <div>"No Decks To Add"</div>;
  }
}

export default UserDeckAdd;