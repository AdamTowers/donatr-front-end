import React, { Component } from 'react';

export default class DonationCard extends Component {
  render() {
    return (
      <div className='card xsm' onClick={() => this.props.history.push(`/funds/${this.props.donation.fund_id}`)}>
        <h3>${this.props.donation.amount}</h3>
        <h5>{this.props.donation.fund_title}</h5>
      </div>
    )
  }
}
