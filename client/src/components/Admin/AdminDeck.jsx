import React from 'react';
import Deck from "./Deck/Deck.jsx";
import AddDeck from "./Deck/DeckAdd.jsx";
import { deck } from '../../util/dbFetch';

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = { decks: props.decks };
    this.addDeck = this.addDeck.bind(this);
    this.removeDeck = this.removeDeck.bind(this);
  }

  async addDeck(name) {
    const newDeck = await deck.addDeck(name);
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

  async renameDeck(name, newName) {
    const f = await deck.renameDeck(name, newName);
    return f;
  }

  render() {
    if (this.state.decks) {
      return (
        <div>
          <AddDeck add={this.addDeck} />
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
