import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class DonorLogin extends Component {
  state = {
    username: '',
    password: ''
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.onSubmit(this.state.username, this.state.password, this.props.history.push)
  }

  render() {
    return (
      <div>
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
        <div>
          <p>Not a member?</p>
          <p>Sign up as a <NavLink to='/donor-register'>donor</NavLink> or organization</p>
        </div>
      </div>

    )
  }
}
