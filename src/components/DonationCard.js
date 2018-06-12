import React, { Component } from 'react';

export default class DonationCard extends Component {
  handleFundClick(event) {
    console.log(this.props)
  }

  render() {
    return (
      <div className='card'>
        <h4>${this.props.donation.amount}</h4>
        <h5 onClick={(event)=>this.handleFundClick(event)}>{this.props.donation.fund_name}</h5>
      </div>
    )
  }
}
