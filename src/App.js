import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Navbar from "./components/navbar.component";
import RecepiesList from "./components/recepies-list.component";
import EditRecepie from "./components/edit-recepie.component";
import CreateRecepie from "./components/create-recepie.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <Navbar /><div className="container">

        <br />
        <Route path="/" exact component={RecepiesList} />
        <Route path="/edit/:id" component={EditRecepie} />
        <Route path="/create" component={CreateRecepie} />
        <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
