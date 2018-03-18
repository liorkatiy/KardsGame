import collapseAnimation from "../../util/collapseAnimation";
import React from "react";

class Nav extends React.Component {

  componentDidMount() {
    this.collapse = collapseAnimation(this.refs.collapse, false, 1, 60);

  }
  collapse() {
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

export default Nav;