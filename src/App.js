import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, NavLink, Redirect } from 'react-router-dom';
import Home from './components/Home';
import DonorLogin from  './components/DonorLogin';
import DonorRegister from  './components/DonorRegister';
import DonorAccount from './components/DonorAccount';
import Fund from './components/Fund';
import Organization from './components/Organization';
import EditDonorAccount from './components/EditDonorAccount';

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
    return (
      <Router>
        <div className='app-container'>
          <Route exact path='/' render={(props) => <Home {...props} />} />
          <Route path='/login' render={(props) => <DonorLogin onSubmit={this.donorLogin} {...props} />} />
          <Route path='/register' render={(props) => <DonorRegister onSubmit={this.donorRegister} {...props} />} />
          <Route exact path='/account' render={(props) => <DonorAccount {...props} />} />
          <Route exact path='/funds/:id' render={(props) => <Fund {...props} />} />
          <Route exact path='/organizations/:id' render={(props) => <Organization {...props} />} />
          <Route exact path='/account/edit' render={(props) => <EditDonorAccount {...props} />} />
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
