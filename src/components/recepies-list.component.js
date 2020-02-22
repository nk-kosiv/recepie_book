import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Recepies = props => (
  <div className="card">
    <div className="card-header">
      <span>Author: {props.recepies.username}</span>
      <span>Date: {props.recepies.createdAt.substring(0, 10)}</span>
    </div>
    <div className="card-body">
      <h5 className="card-title">{props.recepies.recepieName}</h5>
      <p className="card-text">{props.recepies.recepie}</p>
    </div>
    <div className="card-footer">
      <span><Link className="btn btn-light" to={"/edit/" + props.recepies._id}>edit</Link> </span>
      <span><a href="#" className="btn btn-light" onClick={() => { props.deleteRecepie(props.recepies._id) }}>delete</a></span>
    </div>
  </div>
)

export default class RecepiesList extends Component {
  constructor(props) {
    super(props);
    this.deleteRecepie = this.deleteRecepie.bind(this);
    this.recepiesList = this.recepiesList.bind(this);
    this.state = { recepies: [] }
  }
  componentDidMount() {
    axios.get('http://localhost:5000/recepies/')
      .then(response => {
        this.setState({ recepies: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }
  deleteRecepie(id) {
    axios.delete('http://localhost:5000/recepies/' + id)
      .then(res => console.log(res.data));
    this.setState({
      recepies: this.state.recepies.filter(el => el._id !== id)
    })
  }
  recepiesList() {
    return this.state.recepies.map(currentrecepie => {
      return <Recepies recepies={currentrecepie} deleteRecepie={this.deleteRecepie} key={currentrecepie._id} />;
    })
  }
  render() {
    return (
      <div>
        <h3>All Recepies</h3>
        {this.recepiesList()}
      </div>
    )
  }
}