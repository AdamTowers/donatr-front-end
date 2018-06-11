import React, { Component } from 'react';

export default class FundCard extends Component {
  handleOrgClick(event) {
    console.log(this.props)
  }

  render() {
    return (
      <div className='fund-card'>
        <h4>{this.props.fund.title}</h4>
        <h5 onClick={(event)=>this.handleOrgClick(event)}>{this.props.fund.organization.name}</h5>
        <h4><strong>{this.props.fund.donor_count} donors</strong></h4>
        <p>${this.props.fund.raised}/<strong>${this.props.fund.goal}</strong> goal reached</p>
      </div>
    )
  }
}
