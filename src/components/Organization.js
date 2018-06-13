import React, { Component } from 'react';
import FundCard from './FundCard'

import { connect } from 'react-redux'
import { selectedOrg } from '../actions/index'

class Organization extends Component {
  componentDidMount() {
    fetch(`http://localhost:3000/api/v1/organizations/${this.props.match.params.id}`)
    .then(res => res.json())
    .then(json => {
      this.props.dispatch(selectedOrg(json))
    })
  }

  render() {
    const selectedOrg = this.props.selectedOrg
    const funds = selectedOrg.funds.map(fund => <FundCard key={fund.id} fund={fund} history={this.props.history} />)

    return (
      <div>
        <div>
          <h1>{selectedOrg.name}</h1>
          <p>{selectedOrg.bio}</p>
        </div>

        <div  className='cards-container'>
          {funds}
        </div>
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
