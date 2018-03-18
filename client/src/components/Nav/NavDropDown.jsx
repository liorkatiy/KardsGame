import collapseAnimation from "../../util/collapseAnimation";
import React from "react";
import { Link } from "react-router-dom";

class DeckDropDown extends React.Component {
  constructor(props) {
    super(props);
    this.linkClick = this.linkClick.bind(this);
    this.getDecksList = this.getDecksList.bind(this);
  }
  componentDidMount() {
    if (this.refs.decksDropDown)
      this.drp = collapseAnimation(this.refs.decksDropDown, false, 1, 60);
  }
  componentDidUpdate() {
    if (this.refs.decksDropDown)
      this.drp = collapseAnimation(this.refs.decksDropDown, false, 1, 60);
  }

  linkClick(name) {
    return () => {
      this.drp();
      this.props.mainDeck.name = name;
    };
  }

  getDecksList() {
    const d = this.props.decks;
    return d.length ?
      d.map(d =>
        <Link key={d.name}
          onClick={this.linkClick(d.name)}
          className="dropdown-item"
          to="/">
          {d.name}
        </Link>)
      :
      <span className="dropdown-item">
        No Decks Found Try ReLogin Or Contract An Admin
  </span>;
  }

  render() {
    return (
      <li className="nav-item dropdown dropdown-primary">
        <button className="btn btn-primary" onClick={function () {
          this.drp();
        }.bind(this)}>Game Decks</button>
        <div className="dropdown-menu show" ref="decksDropDown" >
          {this.getDecksList()}
        </div>
      </li>
    );
  }
}

export default DeckDropDown;