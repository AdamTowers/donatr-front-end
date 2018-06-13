import React, { Component } from 'react';

import { connect } from 'react-redux'
import { selectedOrg } from '../actions/index'

class Organization extends Component {
  componentDidMount() {
    // debugger
    // fetch(`http://localhost:3000/api/v1/organizations/${this.props.match.params.slug}`)
    // .then(res => res.json())
    // .then(json => {
    //   this.props.dispatch(selectedFund(json))
    // })
  }

  render() {
    return (
      <div>
        <h1>Organization Name</h1>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    selectedOrg: state.selectedOrg,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
   }
}
export default connect(mapStateToProps, mapDispatchToProps)(Organization)
