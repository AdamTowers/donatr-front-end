import React, { Component } from 'react';

export default class FundCard extends Component {
  render() {
    return (
      <div className='fund-card'>
        <h4>Fund title goes here...</h4>
        <h5>Organization</h5>
        <h4><strong>000 donors</strong></h4>
        <p>$0/<strong>$20,000</strong> goal reached</p>
      </div>
    )
  }
}
