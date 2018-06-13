import React, { Component } from 'react';

export default class FundCard extends Component {
  handleFundClick(event) {
    this.props.history.push(`/funds/${this.props.fund.id}`)
  }

  render() {
    return (
      <div className='card' onClick={(event) => this.handleFundClick(event)}>
        <h4 onClick={(event) => this.handleFundClick(event)}>{this.props.fund.title}</h4>
        <h5>{this.props.fund.organization_name}</h5>
        <h4>{this.props.fund.donation_count} donations</h4>
        <p>${this.props.fund.raised}/<strong>${this.props.fund.goal}</strong> goal reached</p>
      </div>
    )
  }
}
