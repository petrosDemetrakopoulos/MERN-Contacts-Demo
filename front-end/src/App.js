import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ContactFormPage from './Pages/ContactFormPage'
import ContactListPage from './Pages/ContactListPage'
import './App.css'

class App extends Component {
  render() {
    return (
        <Router>
          <div className="container">
          <nav className="navbar navbar-expand-lg bg-light">
            <Link to="/" className="navbar-brand bold">Demo Contacts App</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Contacts</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create Contact</Link>
                </li>
              </ul>
            </div>
          </nav>
          <Route path='/' exact component={ContactListPage} />
          <Route path='/edit/:_id' component={ContactFormPage} />
          <Route path='/create' component={ContactFormPage} />
          </div>
      </Router>
    );
  }
}

export default App;
