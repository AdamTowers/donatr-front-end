import React, { Component } from 'react';
import { Line } from 'rc-progress';

export default class FundCard extends Component {
  handleFundClick(event) {
    this.props.history.push(`/funds/${this.props.fund.id}`)
  }

  render() {
    return (
      <div className='card sm' onClick={(event) => this.handleFundClick(event)}>
        <div className='fund-card-image-container'>
          <img className='fund-card-image' src={this.props.fund.picture} />
        </div>
        <h4 onClick={(event) => this.handleFundClick(event)}>{this.props.fund.title}</h4>
        <h5>{this.props.fund.organization_name}</h5>
        <p>${this.props.fund.raised}/<strong>${this.props.fund.goal}</strong> goal reached</p>
        <Line
          percent='10'
          strokeWidth='6'
          strokeColor='rgb(236, 144, 35)'
          trailWidth='3'
          gapDegree='360'
          />
      </div>
    )
  }
}
