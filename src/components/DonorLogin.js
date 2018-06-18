import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class DonorLogin extends Component {
  state = {
    username: '',
    password: '',
    error: ''
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    fetch('http://localhost:3000/api/v1/donor_sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
    .then(res => res.json())
    .then(json => {
      if (json.errors) {
        this.setState({
          error: json.errors
        })
      } else {
        localStorage.setItem('token', json.token)
        localStorage.setItem('username', json.username)
        localStorage.setItem('user_id', json.user_id)
        localStorage.setItem('user_class', json.user_class)

        this.props.history.push("/")
      }
    })
  }

  render() {
    return (
      <div className='flex center'>
        <div className='card login'>
          <form onSubmit={(event) => this.handleSubmit(event)}>
            <h2>Donor Login</h2>
            <input
              type='text'
              name='username'
              value={this.state.username}
              placeholder='Username'
              onChange={(event) => this.handleChange(event)}
            />
            <input
              type='password'
              name='password'
              value={this.state.password}
              placeholder='Password'
              onChange={(event) => this.handleChange(event)}
            />
            <input type='submit' />
          </form>
          { this.state.error ? <p>{this.state.error}</p> : ''}
          <div>
            <p>Not a member?</p>
            <p>Sign up as a <NavLink to='/donor-register'>donor</NavLink></p>
          </div>
        </div>
      </div>
    )
  }
}
