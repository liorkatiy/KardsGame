import React from "react";
import { Link } from "react-router-dom";

const LiLink = (props) =>
  <li className="nav-item">
    <Link onClick={props.onClick} className="btn btn-primary" to={props.to}>
      {props.name}
    </Link>
  </li>;

  export default LiLink;