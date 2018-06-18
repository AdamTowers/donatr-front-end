import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchUser } from '../actions/index'
import DonationCard from './DonationCard'

class DonorAccount extends Component {
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
    } else {
      this.props.history.push('/login')
    }
  }

  render() {
    const donations =
     this.props.user.donations.map(donation =>
     <DonationCard key={donation.id} donation={donation} history={this.props.history} />).reverse().slice(0,9)

    return (
      <div className='container'>
        <div>
          <h1 className='name white-text'>{this.props.user.first_name} {this.props.user.last_name}</h1>
          <div className='account-buttons-container'>
            <button onClick={() => this.props.history.push('/account/edit')}>Edit Account</button>
          </div>
          <h3 className='white-text'>Recent Donations</h3>
          <div className='flex'>
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
export default connect(mapStateToProps, mapDispatchToProps)(DonorAccount)
