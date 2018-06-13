import React, { Component } from 'react';

import { connect } from 'react-redux'
import { selectedFund } from '../actions/index'

class Fund extends Component {
  state = {
    donationAmount: 0
  }

  componentDidMount() {
    fetch(`http://localhost:3000/api/v1/funds/${parseInt(this.props.match.params.id)}`)
    .then(res => res.json())
    .then(json => {
      this.props.dispatch(selectedFund(json))
    })
  }

  componentDidUpdate() {
    fetch(`http://localhost:3000/api/v1/funds/${parseInt(this.props.match.params.id)}`)
    .then(res => res.json())
    .then(json => {
      this.props.dispatch(selectedFund(json))
    })
  }

  componentWillUnmount() {
    this.props.dispatch(selectedFund({}))
  }

  handleChange(event) {
    this.setState({
      donationAmount: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
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
          fund_id: parseInt(this.props.match.params.id),
          amount: this.state.donationAmount
        })
      })
      .then(res => res.json())
      .then(json => console.log(json))
    }

  }

  render() {
    const selectedFund = this.props.selectedFund
    return (
      <div>
        <div>
          <h1>{selectedFund.title}</h1>
          <h3>{selectedFund.organization_name}</h3>
          <p>{selectedFund.description}</p>
        </div>

        <div>
          <h4>${selectedFund.raised}/${selectedFund.goal} raised</h4>
          <form onSubmit={(event) => this.handleSubmit(event)}>
            <input
              type='number'
              placeholder='$'
              onChange={(event) => this.handleChange(event)}
              />
            <input type='submit' value='Donate' />
          </form>
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
