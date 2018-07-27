import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, NavLink, Redirect } from 'react-router-dom';
import { logout } from './actions/index';
import Home from './components/Home';
import DonorLogin from  './components/DonorLogin';
import DonorRegister from  './components/DonorRegister';
import DonorAccount from './components/DonorAccount';
import EditDonorAccount from './components/EditDonorAccount';
import OrganizationLogin from  './components/OrganizationLogin';
import OrganizationRegister from  './components/OrganizationRegister';
import OrganizationAccount from  './components/OrganizationAccount';
import EditOrganizationAccount from './components/EditOrganizationAccount';
import CreateFund from './components/CreateFund';
import Fund from './components/Fund';
import Organization from './components/Organization';

class App extends Component {
  handleLogout() {
    this.props.dispatch(logout())
  }

  render() {
    const loggedIn = !!localStorage.getItem('token');
    const isDonor = localStorage.getItem('user_class') === 'Donor';
    const isOrganization = localStorage.getItem('user_class') === 'Organization';

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
              loggedIn && isDonor ?
                <Redirect to='/donor-account'/>
                :
                <DonorLogin {...props} />}
                />
          <Route path='/donor-register' render={(props) =>
              loggedIn && isDonor ?
                <Redirect to='/donor-account'/>
                :
                <DonorRegister {...props} />}
                />
          <Route exact path='/donor-account' render={(props) =>
              loggedIn && isDonor ?
                <DonorAccount {...props} />
                :
                <Redirect to='/donor-login'/>}
                />
          <Route exact path='/donor-account/edit' render={(props) =>
              loggedIn && isDonor ?
                <EditDonorAccount {...props} />
                :
                <Redirect to='/donor-login'/>}
                />
          <Route exact path='/organization-login' render={(props) =>
              loggedIn && isOrganization ?
                <Redirect to='/organization-account'/>
                :
                <OrganizationLogin {...props}/>}
                />
          <Route exact path='/organization-register' render={(props) =>
              loggedIn && isOrganization ?
                <Redirect to='/organization-account'/>
                :
                <OrganizationRegister {...props}/>}
                />
          <Route exact path='/organization-account' render={(props) =>
              loggedIn && isOrganization ?
                <OrganizationAccount {...props}/>
                :
                <Redirect to='/organization-account'/>}
                />
          <Route exact path='/organization-account/edit' render={(props) =>
              loggedIn && isOrganization ?
                <EditOrganizationAccount {...props} />
                :
                <Redirect to='/organization-login'/>}
                />
          <Route exact path='/create-fund' render={(props) =>
              loggedIn && isOrganization ?
                <CreateFund {...props} />
                :
                <Redirect to='/organization-login'/>}
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
