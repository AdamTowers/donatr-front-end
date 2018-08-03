import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchUser } from '../actions/index'
import FundCard from './FundCard'
import ReactLoading from 'react-loading';

class OrganizationAccount extends Component {
  state = {
    loaded: false
  }

  componentDidMount() {
    if(localStorage.getItem('token')) {
      fetch(`http://localhost:3000/api/v1/organizations/${localStorage.getItem('user_id')}`, {
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
    let activeFunds = []
    let pastFunds = []

    if (this.props.user.funds) {
      let active = this.props.user.funds.filter(fund => fund.active)
      let past = this.props.user.funds.filter(fund => !fund.active)

      activeFunds = active.map(fund =>
      <FundCard key={fund.id} fund={fund} history={this.props.history} />).slice(0,9).reverse()

      pastFunds = past.map(fund =>
      <FundCard key={fund.id} fund={fund} history={this.props.history} />).slice(0,9).reverse()
    }


    return (
      <div className='container'>
        {
          this.state.loaded ?
          <div>
            <h1 className='name white-text'>{this.props.user.name}</h1>
            <div className='account-buttons-container'>
              <button className='button-lg' onClick={() => this.props.history.push('/organization-account/edit')}>Edit Account</button>
              <button className='button-lg' onClick={() => this.props.history.push('/create-fund')}>Create Fund</button>
            </div>
            {
              activeFunds.length > 0 ?
              <div>
                <h3 className='white-text'>Active Funds</h3>
                <div className='flex'>
                  {activeFunds}
                </div>
              </div>
              :
              <div>
                <p className='white-text'>You have no active funds.</p>
              </div>
            }
            {
              pastFunds.length > 0 ?
              <div>
                <h3 className='white-text'>Past Funds</h3>
                <div className='flex'>
                  {pastFunds}
                </div>
              </div>
              :
              ''
            }
          </div>
          :
          <ReactLoading className='loading-icon' type='spin' height={32} width={32} />
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
export default connect(mapStateToProps, mapDispatchToProps)(OrganizationAccount)
