import React, { Component } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class EditRecepie extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeRecepie = this.onChangeRecepie.bind(this);
    this.onChangeRecepieName = this.onChangeRecepieName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      recepie: '',
      recepieName: '',
      users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/recepies/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          username: response.data.username,
          recepie: response.data.recepie,
          recepieName: response.data.recepieName
        })
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:5000/users/')
      .then(response => {
        this.setState({ users: response.data.map(user => user.username) });
      })
      .catch((error) => {
        console.log(error);
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
      recepieName: this.state.recepieName
    };

    console.log(recepieAdd);

    axios.post('http://localhost:5000/recepies/update/' + this.props.match.params.id, recepieAdd)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
      <div>
        <h3>Edit Recepie</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Author: </label>
            <select ref="userInput"
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
            <input type="submit" value="Edit Recepie" className="btn btn-light" />
          </div>
        </form>
      </div>
    )
  }
}