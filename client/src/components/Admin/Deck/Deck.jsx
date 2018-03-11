import React, { Component } from 'react';
import Kard from './kard.jsx';
import kard from "../../../util/serverFetcher/kardData";
import DeckEdit from "./DeckEdit.jsx";
import KardAdd from "./KardAdd.jsx";
import Collapse from "../../Collapse.jsx";


class Deck extends Component {
  constructor(props) {
    super(props);
    this.currentName = props.deck.name;
    this.addKard = this.addKard.bind(this);
    this.removeKard = this.removeKard.bind(this);
    this.editKard = this.editKard.bind(this);
    this.state = { kards: this.props.deck.kards, open: false };
  }

  async addKard(_kard) {
    const g = await kard.addKard(this.currentName, _kard);
    const kards = this.state.kards;
    kards.push(g);
    this.setState({ kards: kards });
  }

  async removeKard(id) {
    const g = await kard.removeKard(this.currentName, id);
    const kards = this.state.kards;
    for (let i = 0; i < kards.length; i++) {
      if (kards[i]._id === id) {
        kards.splice(i, 1);
        this.setState({ kards: kards });
      }
    }
  }

  async editKard(_kard) {
    const g = await kard.editKard(_kard.getModel(), this.props.deck.name);
  }

  render() {
    return (
      <div>
        <DeckEdit deck={this.props.deck}
          remove={this.props.remove}
          rename={this.props.rename} />
        <KardAdd add={this.addKard} />
        <hr />
        <div>
          <button className="btn btn-lg btn-outline-primary col-sm-6" onClick={() => this.setState({ open: !this.state.open })} >Kards: {this.props.deck.kards.length}</button>
          <Collapse open={this.state.open}>
            {this.props.deck.kards.map((k) =>
              <Kard kard={k}
                key={k._id}
                removeKard={this.removeKard}
                editKard={this.editKard} ></Kard>)}
          </Collapse>
        </div>
        <hr style={{ marginBottom: 30 }} />
      </div>
    );
  }
}

export default Deck;
