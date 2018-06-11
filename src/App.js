import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink, Redirect } from 'react-router-dom';
import Home from './components/Home'
import DonorLogin from  './components/DonorLogin'
import DonorRegister from  './components/DonorRegister'
import { connect } from 'react'

class App extends Component {
  donorLogin = (username, password, callback) => {
    fetch('http://localhost:3000/api/v1/donor_sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then(json => {
      localStorage.setItem('token', json.token)
      localStorage.setItem('username', json.username)
      localStorage.setItem('user_id', json.user_id)
      localStorage.setItem('user_class', json.user_class)
    })

    callback("/")
  }

  donorRegister = (username, first_name, last_name, email, password, callback) => {
    fetch('http://localhost:3000/api/v1/donors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ username, first_name, last_name, email, password })
    })
    .then(res => res.json())
    .then(json => {
      localStorage.setItem('token', json.token)
      localStorage.setItem('username', json.username)
      localStorage.setItem('user_id', json.user_id)
      localStorage.setItem('user_class', json.user_class)
    })

    callback("/")
  }

  render() {
    console.log(this.props.store)
    return (
      <Router>
        <div className='app-container'>
          <Route exact path='/' component={Home} />
          <Route path='/login' render={(props) => <DonorLogin onSubmit={this.donorLogin} {...props} />} />
          <Route path='/register' render={(props) => <DonorRegister onSubmit={this.donorRegister} {...props} />} />
        </div>
      </Router>
    );
  }
}

export default App;
