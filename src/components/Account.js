import React, { Component } from 'react';
import FundCard from './FundCard'
import { connect } from 'react-redux'
import { getUser } from '../actions/index'

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
         this.props.dispatch(getUser(json))
        )
       //dispatch currentUser to state
    } else {
      this.props.history.push("/login");
    }
  }

  render() {
    // const donations =
    //  this.props.user.donations.map(donation =>
    //  <DonationCard key={donation.id} donation={donation} history={this.props.history} />)
    console.log(this.props.user)
    return (
      <div>
        <div>
          <h1>{this.props.user.first_name} {this.props.user.last_name}</h1>
          <div className=''>

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
