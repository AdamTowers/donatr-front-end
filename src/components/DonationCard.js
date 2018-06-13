import React, { Component } from 'react';

export default class DonationCard extends Component {
  handleFundClick(event) {
    console.log(this.props)
  }

  render() {
    return (
      <div className='card'>
        <h3>${this.props.donation.amount}</h3>
        <h5 onClick={(event)=>this.handleFundClick(event)}>{this.props.donation.fund_title}</h5>
      </div>
    )
  }
}
