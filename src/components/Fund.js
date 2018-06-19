import React, { Component } from 'react';
import { connect } from 'react-redux'
import { selectedFund } from '../actions/index'
import { updateFund } from '../actions/index'
import { Line } from 'rc-progress';

class Fund extends Component {
  state = {
    donationAmount: '',
    errors: []
  }

  componentDidMount() {
    fetch(`http://localhost:3000/api/v1/funds/${this.props.match.params.id}`)
    .then(res => res.json())
    .then(json => {
      this.props.dispatch(selectedFund(json))
    })
  }

  handleChange(event) {
    this.setState({
      donationAmount: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.setState({
      donationAmount: ''
    })
    if(localStorage.getItem('token')) {
      fetch('http://localhost:3000/api/v1/donations', {
        method: 'POST',
        headers: {
          'Authorization': localStorage.getItem('token'),
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          donor_id: localStorage.getItem('user_id'),
          fund_id: parseInt(this.props.match.params.id, 0),
          amount: this.state.donationAmount
        })
      })
      .then(res => res.json())
      .then(json => {
        if (json.errors) {
          this.setState({
            errors: json.errors
          })
        } else {
          this.props.dispatch(updateFund(json.amount))
        }
      })
    }
  }

  handleOrgClick(event) {
    this.props.history.push(`/organizations/${this.props.selectedFund.organization_id}`)
  }

  render() {
    const selectedFund = this.props.selectedFund
    const percent = selectedFund.percent_raised > 100 ? 100 : selectedFund.percent_raised
    const errors = this.state.errors.map((error, i) =>
      <p key={i}>{error}</p>
    )

    return (
      <div className='flex center'>
        <div className='container card single-card'>
          <div className='fund-image-container img-container-lg'>
            <img className='fund-image' src={selectedFund.picture} alt={selectedFund.title + ' image'} />
          </div>

          <div className='flex'>
            <div className='flex-half'>
              <h1>{selectedFund.title}</h1>
              <h3 onClick={(event) => this.handleOrgClick(event)}>{selectedFund.organization_name}</h3>
              <p>{selectedFund.description}</p>
            </div>

            <div className='flex-half'>
              <div className='input-flex'>
                <h2>
                  ${parseFloat(Math.round(selectedFund.raised * 100) / 100).toFixed(2)}/
                  <strong>${parseFloat(Math.round(selectedFund.goal * 100) / 100).toFixed(2)}</strong> raised
                </h2>
              </div>
              <div className='input-flex'>
                <Line
                  className='round-corners'
                  percent={percent}
                  strokeWidth='10'
                  strokeColor='#ff9c28'
                  trailWidth='10'
                  strokeLinecap='butt'
                  />
              </div>

              {
                localStorage.getItem('token') ?
                <form onSubmit={(event) => this.handleSubmit(event)}>
                  <div className='flex'>
                    <input
                      className='text-input input-flex-half'
                      type='number'
                      placeholder='$'
                      value={this.state.donationAmount}
                      onChange={(event) => this.handleChange(event)}
                      />
                    <input
                      className='input-flex-quarter submit-button'
                      type='submit'
                      value='Donate'
                      />
                  </div>
                </form>
                :
                <div>
                  <p><button onClick={() => this.props.history.push('/donor-login')}>Login</button> to make a donation</p>
                </div>
              }

              {
                this.state.errors.length > 0 ?
                <div className='errors-box'>
                  {errors}
                </div>
                :
                ''
              }

            </div>
          </div>
        </div>
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
