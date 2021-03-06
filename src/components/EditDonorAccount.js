import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../actions/index'

class EditDonorAccount extends Component {
  state = {
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    errors: []
  }

  componentDidMount() {
    if(localStorage.getItem('token')) {
      fetch(`http://localhost:3000/api/v1/donors/${localStorage.getItem('user_id')}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      })
       .then(res => res.json())
       .then(json => {
         this.setState({
           username: json.username,
           first_name: json.first_name,
           last_name: json.last_name,
           email: json.email
         })
         this.props.dispatch(fetchUser(json))
         }
        )
    } else {
      this.props.history.push('/login')
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    if (localStorage.getItem('token')) {
      fetch(`http://localhost:3000/api/v1/donors/${parseInt(localStorage.getItem('user_id'), 0)}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify({
          username: this.state.username,
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          email: this.state.email,
        })
      })
      .then(res => res.json())
      .then(json => {
        if (json.errors) {
          this.setState({errors: json.errors})
        } else {
          this.props.history.push('/donor-account')
        }
      })
    }
  }

  render() {
    const errors = this.state.errors.map((error, i) =>
      <p key={i}>{error}</p>
    )

    return (
      <div className='flex center'>
        <form className='card register' onSubmit={(event) => this.handleSubmit(event)}>
          <h2>Edit Account</h2>
          <div className='flex'>
            <input
              className='text-input input-flex'
              type='text'
              name='username'
              value={this.state.username}
              placeholder='Username'
              onChange={(event) => this.handleChange(event)}
            />
            <input
              className='text-input input-flex-half'
              type='text'
              name='first_name'
              value={this.state.first_name}
              placeholder='First name'
              onChange={(event) => this.handleChange(event)}
            />
            <input
              className='text-input input-flex-half'
              type='text'
              name='last_name'
              value={this.state.last_name}
              placeholder='Last name'
              onChange={(event) => this.handleChange(event)}
            />
            <input
              className='text-input input-flex'
              type='text'
              name='email'
              value={this.state.email}
              placeholder='Email'
              onChange={(event) => this.handleChange(event)}
            />
          <input
            className='submit-button button-margin'
            type='submit'
            value='Save'
            />
          </div>
          {
            this.state.errors.length > 0 ?
            <div class='errors-box'>{errors}</div>
            :
            ''
          }
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
   }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditDonorAccount)
