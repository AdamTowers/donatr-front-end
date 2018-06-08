import React, { Component } from 'react';
import FundCard from './FundCard'

export default class Home extends Component {
  render() {
    return (
      <div>
        <div>
          <h1>Donatr</h1>
          <h3>For all charitable giving.</h3>
        </div>

        <div>
          <h4>Current Crisis Funds</h4>
          <input type='text' placeholder='Search funds'></input>
        </div>

        <div className='fund-cards-container'>
          <FundCard />
        </div>
      </div>
    )
  }
}
