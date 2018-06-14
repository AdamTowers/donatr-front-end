import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchFunds } from '../actions/index';
import FundCard from './FundCard'

class Home extends Component {
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

  render() {
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
