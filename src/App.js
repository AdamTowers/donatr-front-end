import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, NavLink, Redirect } from 'react-router-dom';
import { logout } from './actions/index';
import Home from './components/Home';
import DonorLogin from  './components/DonorLogin';
import DonorRegister from  './components/DonorRegister';
import DonorAccount from './components/DonorAccount';
import OrganizationLogin from  './components/OrganizationLogin';
import OrganizationRegister from  './components/OrganizationRegister';
import Fund from './components/Fund';
import Organization from './components/Organization';
import EditDonorAccount from './components/EditDonorAccount';

class App extends Component {
  handleLogout() {
    this.props.dispatch(logout())
  }

  render() {
    const loggedIn = !!localStorage.getItem('token')

    return (
      <Router>
        <div className='app-container'>
          <div className='navbar'>
            <div className='nav-left'>
              <NavLink className='nav-link' to='/'>Home</NavLink>
            </div>
            {
              loggedIn ?
              <div className='nav-right'>
                <NavLink className='nav-link' to={`/${localStorage.getItem('user_class').toLowerCase()}-account`}>Account</NavLink>
                <NavLink className='nav-link outline' to='/' onClick={() => this.handleLogout()}>Logout</NavLink>
              </div>
              :
              <div className='nav-right'>
                <NavLink className='nav-link outline' to='/donor-login'>Login</NavLink>
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
                <DonorLogin {...props} />}
                />
          <Route path='/donor-register' render={(props) =>
              loggedIn ?
                <Redirect to='/account'/>
                :
                <DonorRegister {...props} />}
                />
              <Route exact path='/donor-account' render={(props) =>
              loggedIn ?
                <DonorAccount {...props} />
                :
                <Redirect to='/donor-login'/>}
                />
              <Route exact path='/donor-account/edit' render={(props) =>
              loggedIn ?
                <EditDonorAccount {...props} />
                :
                <Redirect to='/donor-login'/>}
                />
          <Route exact path='/organization-login' render={(props) =>
              loggedIn ?
                <Redirect to='/account'/>
                :
                <OrganizationLogin {...props}/>}
                />
          <Route exact path='/organization-register' render={(props) =>
              loggedIn ?
                <Redirect to='/account'/>
                :
                <OrganizationRegister {...props}/>}
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
