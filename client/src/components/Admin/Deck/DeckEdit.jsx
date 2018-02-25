import React, { Component } from 'react';
import { FaEdit } from "react-icons/lib/fa/";
import { MdDelete } from "react-icons/lib/md";

class DeckEdit extends Component {

  constructor(props) {
    super(props);
    this.currentName = props.deck.name;
    this.remove = this.remove.bind(this);
    this.rename = this.rename.bind(this);
  }

  async rename() {
    let re = await this.props.rename(this.props.deck.name, this.refs.deckName.value);
    if (re) {
      this.props.deck.name = this.refs.deckName.value;
    }
    else {
      this.refs.deckName.value = this.props.deck.name;
    }
  }

  async remove() {
    this.props.remove(this.props.deck.name);
  }

  render() {
    return (
      <div className="input-group col-sm-6 mb-2" >
        <input className="form-control " ref="deckName" type="text" defaultValue={this.props.deck.name} />
        <div className="input-group-append" >
          <button className="btn btn-primary" type="button" value="Rename" onClick={this.rename} ><FaEdit size={20} /></button>
          <button className="btn btn-primary" type="button" value="Delete" onClick={this.remove} ><MdDelete size={20} /></button>
        </div>
      </div>
    );
  }
}

export default DeckEdit;