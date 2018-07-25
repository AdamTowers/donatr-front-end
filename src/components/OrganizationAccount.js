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
    const funds =
     this.props.user.funds.map(fund =>
     <FundCard key={fund.id} fund={fund} history={this.props.history} />).slice(0,9)

    return (
      <div className='container'>
        {
          this.state.loaded ?
          <div>
            <h1 className='name white-text'>{this.props.user.name}</h1>
            <div className='account-buttons-container'>
              <button className='button-lg' onClick={() => this.props.history.push('/organization-account/edit')}>Edit Account</button>
            </div>
            {
              this.props.user.funds.length > 0 ?
              <div>
                <h3 className='white-text'>Recent Funds</h3>
                <div className='flex'>
                  {funds}
                </div>
              </div>
              :
              <div>
                <p className='white-text'>You have no funds yet.</p>
              </div>
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
