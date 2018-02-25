import React from "react";
import { Link } from "react-router-dom";
import collapseAnimation from "../util/collapseAnimation";

class Nav extends React.Component {

  componentDidMount() {
    this.collapse = collapseAnimation(this.refs.collapse, false, 4, 120);

  }
  collapse() {
    //  this.refs.collapse.classList.toggle("collapse");
    this.collapse();
  }

  shouldComponentUpdate(props) {
    return this.props.children.length !== props.children.length;
  }

  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
        <a className="navbar-brand colors" href="/">Kards Game</a>
        <button className="navbar-toggler" type="button" onClick={this.collapse.bind(this)} >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div ref="collapse" className="navbar-collapse droptest">
          {this.props.children}
        </div>
      </nav>
    );
  }
}

export const LiLink = (props) =>
  <li className="nav-item">
    <Link onClick={props.onClick} className="btn btn-primary" to={props.to}>
      {props.name}
    </Link>
  </li>;

export const NavBar = Nav;