import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class OrganizationLogin extends Component {
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

    fetch('http://localhost:3000/api/v1/organization_sessions', {
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
            <h2>Organization Login</h2>
            <input
              className='text-input'
              type='text'
              name='username'
              value={this.state.username}
              placeholder='Username'
              onChange={(event) => this.handleChange(event)}
            />
            <input
              className='text-input'
              type='password'
              name='password'
              value={this.state.password}
              placeholder='Password'
              onChange={(event) => this.handleChange(event)}
            />
          <input className='submit-button' type='submit' value='Sign In' />
          </form>
          { this.state.error ? <div className='errors-box'><p>{this.state.error}</p></div> : ''}

          <div className='login-link'>
            <p><NavLink to='/donor-login'>Donor Login</NavLink></p>
          </div>

          <div className='sign-up'>
            <p>Not a member?<br/>
            Sign up as a <NavLink to='/donor-register'>Donor</NavLink> or <NavLink to='/organization-register'>Organization</NavLink></p>
          </div>
        </div>
      </div>
    )
  }
}
