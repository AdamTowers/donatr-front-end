import React, { Component } from 'react';
import DonationCard from './DonationCard'

import { connect } from 'react-redux'
import { fetchUser } from '../actions/index'

class Account extends Component {
  componentDidMount() {
    if(localStorage.getItem('token')) {
      fetch(`http://localhost:3000/api/v1/donors/${localStorage.getItem('user_id')}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      })
       .then(res => res.json())
       .then(json =>
         this.props.dispatch(fetchUser(json))
        )
       //dispatch currentUser to state
    } else {
      //redirect to login
      // this.props.history.push("/login");
    }
  }

  render() {
    const donations =
     this.props.user.donations.map(donation =>
     <DonationCard key={donation.id} donation={donation} history={this.props.history} />).reverse()

    return (
      <div>
        <div>
          <h1>{this.props.user.first_name} {this.props.user.last_name}</h1>
          <div className='account-buttons-container'>
            <button>Payment Methods</button>
            <button>Edit Account</button>
          </div>
          <div className='cards-container'>
            {donations}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
   }
}
export default connect(mapStateToProps, mapDispatchToProps)(Account)
