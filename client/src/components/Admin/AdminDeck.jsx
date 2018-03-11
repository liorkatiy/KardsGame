import React from 'react';
import Deck from "./Deck/Deck.jsx";
import AddDeck from "./Deck/DeckAdd.jsx";
import deck from '../../util/serverFetcher/deckData';
import UserSearch from "./User/UserSearch.jsx";

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { decks: props.decks };
    this.addDeck = this.addDeck.bind(this);
    this.removeDeck = this.removeDeck.bind(this);
    this.findDeck = this.findDeck.bind(this);
  }

  async addDeck(name, isDefault) {
    const newDeck = await deck.addDeck(name, isDefault);
    const decko = this.state.decks;
    decko.push(newDeck);
    this.setState({ decks: decko });
  }

  async removeDeck(name) {
    let r = await deck.removeDeck(name);
    if (r) {
      let decks = this.state.decks.filter((d) => d.name !== name);;
      this.setState({ decks });
    }
  }

  async renameDeck(name, newName, isDefault) {
    const f = await deck.renameDeck(name, newName, isDefault);
    return f;
  }

  async findDeck(name) {
    const decks = await deck.getDeck(name);
    if (decks) {
      this.setState({ decks });
    } else {
      this.setState({ decks: [] });
    }
  }

  render() {
    if (this.state.decks) {
      return (
        <div>
          <AddDeck add={this.addDeck} />
          <UserSearch search={this.findDeck} />
          <hr />
          {
            this.state.decks.map((deck) =>
              <Deck key={deck._id}
                deck={deck}
                rename={this.renameDeck}
                remove={this.removeDeck} />
            )}
        </div>);
    }; return null;
  }
}

export default Admin;
