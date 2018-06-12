import React, { Component } from 'react';
import FundCard from './FundCard'
import DonationCard from './DonationCard'

import { connect } from 'react-redux'
import { selectFund } from '../actions/index'

class Fund extends Component {


  render() {
    return (
      <div>
        <h1>Fund name</h1>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    selectedFund: state.selectedFund,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
   }
}
export default connect(mapStateToProps, mapDispatchToProps)(Fund)
