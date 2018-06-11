import React, { Component } from 'react';
import FundCard from './FundCard'
import { connect } from 'react-redux'
import { fetchFunds } from '../actions/index'

class Home extends Component {
  componentDidMount() {
   this.props.getFunds()
  }

  render() {
    console.log(this.props)
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

function mapStateToProps(state) {
  return {
    funds: state.funds
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getFunds: () => {
      return dispatch(fetchFunds())
    }
   }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home)
