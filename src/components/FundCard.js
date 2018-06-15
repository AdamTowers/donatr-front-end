import React, { Component } from 'react';

export default class FundCard extends Component {
  handleFundClick(event) {
    this.props.history.push(`/funds/${this.props.fund.id}`)
  }

  render() {
    return (
      <div className='card sm' onClick={(event) => this.handleFundClick(event)}>
        <h4 onClick={(event) => this.handleFundClick(event)}>{this.props.fund.title}</h4>
        <h5>{this.props.fund.organization_name}</h5>
        <p>${this.props.fund.raised}/<strong>${this.props.fund.goal}</strong> goal reached</p>
      </div>
    )
  }
}
