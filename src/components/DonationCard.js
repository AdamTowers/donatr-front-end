import React, { Component } from 'react';

export default class DonationCard extends Component {
  render() {
    return (
      <div className='card sm' onClick={() => this.props.history.push(`/funds/${this.props.donation.fund_id}`)}>
        <div className='fund-image-container img-container-sm'>
          <img className='fund-image' src={this.props.donation.fund_picture} />
        </div>
        <h2>${this.props.donation.amount}</h2>
        <h4>{this.props.donation.fund_title}</h4>
      </div>
    )
  }
}
