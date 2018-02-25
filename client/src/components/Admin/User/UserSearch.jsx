import React, { Component } from 'react';
import SearchIcon from "react-icons/lib/fa/search";

class UserSearch extends Component {

  constructor() {
    super();
    this.setSearch = this.setSearch.bind(this);
    this.search = this.search.bind(this);
    this.searchText = "";
  }

  setSearch(e) {
    this.searchText = e.target.value;
  }

  search() {
    this.props.search(this.searchText);
  }

  render() {
    return (
      <div className="input-group col-sm-6">
        <input
          className="form-control"
          type="text"
          placeholder="Search"
          onChange={this.setSearch} />
        <div className="input-group-append">
          <button className="btn btn-primary" onClick={this.search} >
            <SearchIcon size={25} />
          </button>
        </div>
      </div>
    );
  }
}

export default UserSearch;