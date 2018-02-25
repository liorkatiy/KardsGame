import React from 'react';
import User from "./User/User.jsx";
import UserAdd from "./User/UserAdd.jsx";
import UserSearch from "./User/UserSearch.jsx";
import { user } from '../../util/dbFetch';
import PropTypes from 'prop-types';

class AdminUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = { users: props.users, decklist: props.decklist };
    // this.ready = () => this.state.users && this.state.decklist;
    this.addUser = this.addUser.bind(this);
    this.removeUser = this.removeUser.bind(this);
    this.editUser = this.editUser.bind(this);
    this.findUser = this.findUser.bind(this);
  }

  async findUser(name) {
    const users = await user.getUser(name);
    if (users) {
      this.setState({ users });
    } else {
      this.setState({ users: [] });
    }
  }

  async addUser(name, password) {
    const newUser = await user.addUser(name, password);
    const users = this.state.users;
    users.push(newUser);
    this.setState({ users });
  }

  async removeUser(id) {
    let removed = await user.removeUser(id);
    if (removed) {
      const users = this.state.users.filter(u => u._id !== id);
      this.setState({ users });
    } else {
      alert("bahh");
    }
  }

  async editUser(_user) {
    const edited = await user.editUser(_user);
    return edited;
  }

  render() {
    return (
      <div className="col-lg-12">
        <UserAdd add={this.addUser} />
        <UserSearch search={this.findUser} />
        {
          this.state.users.map(user =>
            <User
              key={user._id}
              user={user}
              edit={this.editUser}
              remove={this.removeUser}
              decks={this.state.decklist} />
          )}
      </div>);

  }
}
AdminUser.propTypes = {
  users: PropTypes.array
};
export default AdminUser;
