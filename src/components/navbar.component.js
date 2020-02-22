import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Navbar extends Component {

  render() {
    return (
      <div>
        <nav className="navbar navbar-light navbar-expand-lg">
          <Link to="/" className="navbar-brand">Recepies Book</Link>
          <div className="collpase navbar-collapse">

            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/" className="nav-link">All Recipes</Link>
              </li>
              <li className="navbar-item">
                <Link to="/user" className="nav-link">Add New User</Link>
              </li>
            </ul>
          </div>
        </nav>
        <Link to="/create" className="add-recepie-btn"><span>&#43;</span></Link>
      </div>
    );
  }
}