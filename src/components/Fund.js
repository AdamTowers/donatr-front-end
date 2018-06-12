import React, { Component } from 'react';

import { connect } from 'react-redux'
import { selectedFund } from '../actions/index'

class Fund extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <div>
        <h1>{this.props.selectedFund.title}</h1>
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
