import React, { Component } from 'react';
import FundCard from './FundCard'
import { connect } from 'react-redux'
import { getFunds } from '../actions/index'

class Account extends Component {
  componentDidMount() {
   fetch(`http://localhost:3000/api/v1/donors/${localStorage.getItem('id')}`)
    .then(res => res.json())
    .then(json => console.log(json))
    //dispatch currentUser to state
  }

  render() {
    // const donations =
    //  this.props.currentUser.donations.map(donation =>
    //  <DonationCard key={donation.id} donation={donation} history={this.props.history} />)

    return (
      <div>
        <div>
          <h1>User Name</h1>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
   }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)
