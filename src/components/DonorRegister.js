import React, { Component } from 'react';

export default class UserRegister extends Component {
  state = {
    username: '',
    first_name: '',
    last_name: '',
    email: '',
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
      <form onSubmit={(event) => this.handleSubmit(event)}>
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
    )
  }
}
