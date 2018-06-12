import React, { Component } from 'react';
import { Route, NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchOrgs } from './actions/index';

import Home from './components/Home';
import DonorLogin from  './components/DonorLogin';
import DonorRegister from  './components/DonorRegister';
import Account from './components/Account';
import Fund from './components/Fund';

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

  componentDidMount() {
   fetch('http://localhost:3000/api/v1/organizations')
    .then(res => res.json())
    .then(json => {
      this.props.dispatch(fetchOrgs(json))
      // this.props.getFunds(funds)
    })

   // this.props.fetchFunds()
   // this.props.dispatch((dispatch) => {
   //   fetch('http://localhost:3000/api/v1/funds')
   //    .then(res => res.json())
   //    .then(funds => {
   //      dispatch(getFunds(funds))
   //    })
   // })
  }

  render() {
    return (
      <div className='app-container'>
        <Route exact path='/' render={(props) => <Home {...props} />} />
        <Route path='/login' render={(props) => <DonorLogin onSubmit={this.donorLogin} {...props} />} />
        <Route path='/register' render={(props) => <DonorRegister onSubmit={this.donorRegister} {...props} />} />
        <Route path='/account' render={(props) => <Account {...props} />} />
        <Route exact path='/funds/:id' render={(props) => <Fund {...props} />} />
      </div>
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


// Through this.props.yourAction
// function mapDispatchToProps(dispatch) {
//   return {
    // getFunds: (funds) => {
//       dispatch(getFunds(funds))
//     }
//    }
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     fetchFunds: () => {
//       dispatch(fetchFunds())
//     }
//    }
// }
