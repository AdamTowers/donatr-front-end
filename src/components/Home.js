import React, { Component } from 'react';
import FundCard from './FundCard'
import { connect } from 'react-redux'

class Home extends Component {
  render() {
    console.log(this.props.funds)
    const funds = this.props.funds.map(fund => <FundCard key={fund.id} fund={fund} history={this.props.history} />)

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

        <div className='cards-container'>
          {funds}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    funds: state.funds
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
