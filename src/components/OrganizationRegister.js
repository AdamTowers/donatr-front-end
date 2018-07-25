import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class OrganizationRegister extends Component {
  state = {
    username: '',
    name: '',
    bio: '',
    email: '',
    password: '',
    errors: []
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    fetch('http://localhost:3000/api/v1/organizations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        name: this.state.name,
        bio: this.state.bio,
        email: this.state.email,
        password: this.state.password
      })
    })
    .then(res => res.json())
    .then(json => {
      if (json.errors) {
        this.setState({errors: json.errors})
      } else {
        localStorage.setItem('token', json.token)
        localStorage.setItem('username', json.username)
        localStorage.setItem('user_id', json.user_id)
        localStorage.setItem('user_class', json.user_class)

        this.props.history.push('/')
      }
    })
  }

  render() {
    const errors = this.state.errors.map((error, i) =>
      <p key={i}>{error}</p>
    )

    return (
      <div className='flex center'>
        <div className='card register'>
          <form onSubmit={(event) => this.handleSubmit(event)}>
            <h2>Organization Registration</h2>
            <div className='flex'>
              <input
                className='text-input input-flex-half'
                type='text'
                name='username'
                value={this.state.username}
                placeholder='Username'
                onChange={(event) => this.handleChange(event)}
              />
              <input
                className='text-input input-flex-half'
                type='text'
                name='name'
                value={this.state.first_name}
                placeholder='Organization Name'
                onChange={(event) => this.handleChange(event)}
              />
            <textarea
                className='text-input input-flex-tall'
                type='text'
                name='bio'
                value={this.state.bio}
                placeholder='Bio'
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
                className='text-input input-flex'
                type='password'
                name='password'
                value={this.state.password}
                placeholder='Password'
                onChange={(event) => this.handleChange(event)}
              />
              <input
                className='submit-button button-margin'
                type='submit'
                value='Sign Up'
                />
            </div>
          </form>
          { this.state.errors.length > 0 ? <div className='errors-box'>{errors}</div> : ''}
          <div className='sign-up'>
            <p><NavLink to='/donor-login'>Login</NavLink><br/>
              Or sign up as a <NavLink to='/donor-register'>Donor</NavLink></p>
          </div>
        </div>
      </div>
    )
  }
}
