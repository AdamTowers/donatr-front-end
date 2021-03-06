import React, { Component } from 'react';

export default class DonationCard extends Component {
  render() {
    return (
      <div className='card sm' onClick={() => this.props.history.push(`/funds/${this.props.donation.fund_id}`)}>
        <div className='fund-image-container img-container-sm'>
          <img
            className='fund-image'
            src={this.props.donation.fund_picture}
            alt={this.props.donation.fund_title + ' image'} />
        </div>
        <h2>${parseFloat(Math.round(this.props.donation.amount * 100) / 100).toFixed(2)}</h2>
        <h4>{this.props.donation.fund_title}</h4>
      </div>
    )
  }
}
