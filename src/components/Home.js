import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchFunds } from '../actions/index';
import FundCard from './FundCard'

class Home extends Component {
  state = {
    filter: ''
  }

  componentDidMount() {
   fetch('http://localhost:3000/api/v1/funds')
    .then(res => res.json())
    .then(json => {
      this.props.dispatch(fetchFunds(json))
      // this.props.getFunds(funds)
    })

   // this.props.fetchFunds()
   // this.props.dispatch((dispatch) => {
   //   fetch('http://localhost:3000/api/v1/funds')
   //    .then(res => res.json())
   //    .then(funds => {
   //      dispatch(getFunds(funds))
   //    })
   // })
  }

  handleChange(event) {
    this.setState({
      filter: event.target.value
    })
  }

  render() {
    let funds = this.props.funds.map(fund => <FundCard key={fund.id} fund={fund} history={this.props.history} />)

    if (this.state.filter) {
      const filteredFunds = this.props.funds.filter(fund => fund.title.toLowerCase().includes(this.state.filter.toLowerCase()))
      funds = filteredFunds.map(fund =>
        <FundCard key={fund.id} fund={fund} history={this.props.history} />
      )
    }

    return (
      <div className='container'>
        <div className='logo-container'>
          <h1 className='logo'>Donatr</h1>
          <h2 className='tagline'>Crowd-sourcing for disaster relief.</h2>
        </div>

        <div>
          <h4 className='funds-header'>Current Crisis Funds</h4>
          <input
            className='search-bar'
            type='text'
            placeholder='Search funds'
            value={this.state.filter}
            onChange={(event) => this.handleChange(event)}
            />
        </div>

        <div className='flex'>
          { funds.length > 0 ? funds : <p className='white-text'>No funds match your search.</p>}
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

// Through this.props.yourAction
// function mapDispatchToProps(dispatch) {
//   return {
    // getFunds: (funds) => {
//       dispatch(getFunds(funds))
//     }
//    }
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     fetchFunds: () => {
//       dispatch(fetchFunds())
//     }
//    }
// }
