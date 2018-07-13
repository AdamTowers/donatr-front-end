import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchUser } from '../actions/index'
import DonationCard from './DonationCard'
import ReactLoading from 'react-loading';

class DonorAccount extends Component {
  state = {
    loaded: false
  }

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
       .then(
         this.setState({
           loaded: true
         })
       )
    } else {
      this.props.history.push('/login')
    }
  }

  render() {
    const donations =
     this.props.user.donations.map(donation =>
     <DonationCard key={donation.id} donation={donation} history={this.props.history} />).slice(0,9)

    return (
      <div className='container'>
        {
          this.state.loaded ?
          <div>
            <h1 className='name white-text'>{this.props.user.first_name} {this.props.user.last_name}</h1>
            <div className='account-buttons-container'>
              <button className='button-lg' onClick={() => this.props.history.push('/account/edit')}>Edit Account</button>
            </div>
            {
              this.props.user.donations.length > 0 ?
              <div>
                <h3 className='white-text'>Recent Donations</h3>
                <div className='flex'>
                  {donations}
                </div>
              </div>
              :
              <div>
                <p className='white-text'>You have no donations yet.</p>
              </div>
            }
          </div>
          :
          <ReactLoading className='loading-icon' type='spin' height='32px' width='32px' />
        }

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
