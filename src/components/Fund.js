import React, { Component } from 'react';
import { connect } from 'react-redux'
import { selectedFund } from '../actions/index'

class Fund extends Component {
  state = {
    donationAmount: ''
  }

  componentDidMount() {
    fetch(`http://localhost:3000/api/v1/funds/${parseInt(this.props.match.params.id, 0)}`)
    .then(res => res.json())
    .then(json => {
      this.props.dispatch(selectedFund(json))
    })
  }

  componentDidUpdate() {
    fetch(`http://localhost:3000/api/v1/funds/${parseInt(this.props.match.params.id, 0)}`)
    .then(res => res.json())
    .then(json => {
      this.props.dispatch(selectedFund(json))
    })
  }

  handleChange(event) {
    this.setState({
      donationAmount: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.setState({
      donationAmount: ''
    })
    if(localStorage.getItem('token')) {
      fetch('http://localhost:3000/api/v1/donations', {
        method: 'POST',
        headers: {
          'Authorization': localStorage.getItem('token'),
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          donor_id: localStorage.getItem('user_id'),
          fund_id: parseInt(this.props.match.params.id, 0),
          amount: this.state.donationAmount
        })
      })
      .then(res => res.json())
      .then(json => console.log(json))
    }
  }

  handleOrgClick(event) {
    this.props.history.push(`/organizations/${this.props.selectedFund.organization_id}`)
  }

  render() {
    const selectedFund = this.props.selectedFund
    return (
      <div>
        <div>
          <h1>{selectedFund.title}</h1>
          <h3 onClick={(event) => this.handleOrgClick(event)}>{selectedFund.organization_name}</h3>
          <p>{selectedFund.description}</p>
        </div>

        <div>
          <h3>${selectedFund.raised}/${selectedFund.goal} raised</h3>
          <h5>{selectedFund.donation_count} donations</h5>
          {
            localStorage.getItem('token') ?
            <form onSubmit={(event) => this.handleSubmit(event)}>
              <input
                type='number'
                placeholder='$'
                value={this.state.donationAmount}
                onChange={(event) => this.handleChange(event)}
                />
              <input type='submit' value='Donate' />
            </form>
            :
            <div>
              <p>Login to make a donation</p>
              <button onClick={() => this.props.history.push('/login')}>Login</button>
            </div>
          }

        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    selectedFund: state.selectedFund,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
   }
}
export default connect(mapStateToProps, mapDispatchToProps)(Fund)
