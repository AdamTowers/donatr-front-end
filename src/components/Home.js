import React, { Component } from 'react';
import FundCard from './FundCard'
import { connect } from 'react-redux'
import { getFunds, fetchFunds } from '../actions/index'

class Home extends Component {
  componentDidMount() {
   fetch('http://localhost:3000/api/v1/funds')
    .then(res => res.json())
    .then(funds => {
      this.props.dispatch(getFunds(funds))
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

// Through this.props.dispatch(yourAction)
function mapDispatchToProps(dispatch) {
  return {
    dispatch
   }
}

// Through this.props.yourAction
// function mapDispatchToProps(dispatch) {
//   return {
    // getFunds: (funds) => {
//       dispatch(getFunds(funds))
//     }
//    }
// }
//
// function mapDispatchToProps(dispatch) {
//   return {
//     fetchFunds: () => {
//       dispatch(fetchFunds())
//     }
//    }
// }

export default connect(mapStateToProps, mapDispatchToProps)(Home)
