import React, { Component } from 'react';
import { connect } from 'react-redux'
import { selectedOrg } from '../actions/index'
import FundCard from './FundCard'

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
      <div className='container'>
        <div>
          <h1 className='name white-text'>{selectedOrg.name}</h1>
          <p className='bio white-text'>{selectedOrg.bio}</p>
        </div>

        <h3 className='white-text'>Current Funds</h3>
        <div className='cards-container flex'>
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
