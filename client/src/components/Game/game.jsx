import React, { Component } from 'react';
import GameDeck from "./gameDeck.jsx";
import { getFirstKard, getNextKard } from "./gameHandler";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = { kard: false };
    this.firstKard = this.firstKard.bind(this);
    this.answer = this.answer.bind(this);
  }

  componentDidMount() {
    this.firstKard(this.props.deck);
  }

  componentWillReceiveProps(props) {
    this.firstKard(props.deck);
  }

  async firstKard(deckName) {
    if (deckName) {
      const firstKard = await getFirstKard(deckName);
      this.setState({ kard: firstKard });
    }
  }


  async answer(answer) {
    return await getNextKard(answer);
  }

  render() {
    if (this.state.kard) {
      return (
        <GameDeck kard={this.state.kard} answer={this.answer} />
      );
    } else return "Please Pick A Deck";
  }
}

export default Game;