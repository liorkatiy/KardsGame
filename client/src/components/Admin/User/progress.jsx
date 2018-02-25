import React, { Component } from 'react';
import { MdDelete } from "react-icons/lib/md";

class Progress extends Component {
  constructor(props) {
    super(props);
    this.remove = this.remove.bind(this);
  }

  remove() {
    this.props.remove(this.props.prog.deck);
  }

  render() {
    return <div className="input-group">
      <button
        className=" btn btn-outline-dark input-group-addon"
        onClick={this.remove} ><MdDelete />
      </button>
      <span className="input-group-text bg-dark text-white" >{this.props.prog.deck}</span>
    </div>;
  }
}
export default Progress;