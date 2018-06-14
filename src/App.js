import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, NavLink, Redirect } from 'react-router-dom';
import { logout } from './actions/index';
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

  handleLogout() {
    this.props.dispatch(logout())
  }

  render() {
    const loggedIn = !!localStorage.getItem('token')

    return (
      <Router>
        <div className='app-container'>
          <div>
            <NavLink to='/'>Donatr</NavLink>
            { loggedIn ?
              <div>
                <NavLink to='/account'>Account</NavLink>
                <NavLink to='/' onClick={() => this.handleLogout()}>Logout</NavLink>
              </div>
              :
              <div>
                <NavLink to='/donor-login'>Login</NavLink>
              </div>
            }
          </div>

          <Route exact path='/' render={(props) => <Home {...props} />} />
          <Route exact path='/funds/:id' render={(props) => <Fund {...props} />} />
          <Route exact path='/organizations/:id' render={(props) => <Organization {...props} />} />
          <Route path='/donor-login' render={(props) =>
              loggedIn ?
                <Redirect to='/account'/>
                :
                <DonorLogin onSubmit={this.donorLogin} {...props} />}
                />
              <Route path='/donor-register' render={(props) =>
              loggedIn ?
                <Redirect to='/account'/>
                :
                <DonorRegister {...props} />}
                />
          <Route exact path='/account' render={(props) =>
              loggedIn ?
                <DonorAccount {...props} />
                :
                <Redirect to='/donor-login'/>}
                />
          <Route exact path='/account/edit' render={(props) =>
              loggedIn ?
                <EditDonorAccount {...props} />
                :
                <Redirect to='/donor-login'/>}
                />
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
