import React, { Component } from 'react';
import { Line } from 'rc-progress';

export default class FundCard extends Component {
  handleFundClick(event) {
    this.props.history.push(`/funds/${this.props.fund.id}`)
  }

  render() {
    const percent = this.props.fund.percent_raised > 100 ? 100 : this.props.fund.percent_raised
    return (
      <div className='card sm' onClick={(event) => this.handleFundClick(event)}>
        <div className='fund-image-container img-container-sm'>
          <img className='fund-image' src={this.props.fund.picture} alt={this.props.fund.title + ' image'} />
        </div>
        {
          this.props.fund.title.length > 40 ?
          <h3 onClick={(event) => this.handleFundClick(event)}>{this.props.fund.title.slice(0, 40)}...</h3>
          :
          <h3 onClick={(event) => this.handleFundClick(event)}>{this.props.fund.title}</h3>
        }

        <h5>{this.props.fund.organization_name}</h5>
        <p>${this.props.fund.raised}/<strong>${this.props.fund.goal}</strong> goal reached</p>
        <Line
          percent={percent}
          strokeWidth='5'
          strokeColor='rgb(236, 144, 35)'
          trailWidth='5'
          />
      </div>
    )
  }
}
