import React, { Component } from 'react';
import { Line } from 'rc-progress';

export default class FundCard extends Component {
  handleFundClick(event) {
    this.props.history.push(`/funds/${this.props.fund.id}`)
  }

  render() {
    const percent = this.props.fund.percent_raised > 100 ? 100 : this.props.fund.percent_raised

    let color
    if(percent === 100) {
      color = "#74ad75"
    } else if(percent < 100 && percent > 50) {
      color = "#ff9c28"
    } else {
      color = "#da4e4e"
    }

    return (
      <div className='card sm flex-left' onClick={(event) => this.handleFundClick(event)}>
        <div className='fund-image-container img-container-sm'>
          <img className='fund-image'
            src={this.props.fund.picture}
            alt={this.props.fund.title + ' image'}
            />
        </div>

        <div className='flex-sm-item'>
          {
            this.props.fund.title.length > 40 ?
            <h3 onClick={(event) => this.handleFundClick(event)}>{this.props.fund.title.slice(0, 40)}...</h3>
            :
            <h3 onClick={(event) => this.handleFundClick(event)}>{this.props.fund.title}</h3>
          }
        </div>

        <div className='flex-sm-item'>
          <h5>{this.props.fund.organization_name}</h5>
        </div>

        <div className='align-bottom'>
          <p>
            ${parseFloat(Math.round(this.props.fund.raised * 100) / 100).toFixed(2)}/
            <strong>${parseFloat(Math.round(this.props.fund.goal * 100) / 100).toFixed(2)}</strong> reached
          </p>
          <Line
            percent={percent}
            strokeWidth='5'
            strokeColor={color}
            trailWidth='5'
            />
        </div>
      </div>
    )
  }
}
