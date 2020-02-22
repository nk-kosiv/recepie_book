import React, { Component } from 'react';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';

export default class CreateRecepie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      recepie: '',
      recepieName: '',
      users: []
    }
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeRecepie = this.onChangeRecepie.bind(this);
    this.onChangeRecepieName = this.onChangeRecepieName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
            username: response.data[0].username
          })
        }
      })
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeRecepie(e) {
    this.setState({
      recepie: e.target.value
    });
  }
  
  onChangeRecepieName(e) {
    this.setState({
      recepieName: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const recepieAdd = {
      username: this.state.username,
      recepie: this.state.recepie,
      recepieName: this.state.recepieName,
    };

    console.log(recepieAdd);
    axios.post('http://localhost:5000/recepies/add', recepieAdd)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
      <div>
        <h3>Create New Recepie</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Author: </label>
            <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
              {
                this.state.users.map(function (user) {
                  return <option
                    key={user}
                    value={user}>{user}
                  </option>;
                })
              }
            </select>
          </div>
          <div className="form-group">
            <label>Recepie Name: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.recepieName}
              onChange={this.onChangeRecepieName}
            />
          </div>
          <div className="form-group">
            <label>Recepie: </label>
            <textarea type="text"
              required
              className="form-control"
              value={this.state.recepie}
              onChange={this.onChangeRecepie}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Add Recepie" className="btn btn-light" />
          </div>
        </form>
      </div>
    )
  }
}