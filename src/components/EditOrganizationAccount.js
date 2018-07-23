import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../actions/index'

class EditOrganizationAccount extends Component {
  state = {
    username: '',
    name: '',
    bio: '',
    email: '',
    password: '',
    errors: []
  }

  componentDidMount() {
    if(localStorage.getItem('token')) {
      fetch(`http://localhost:3000/api/v1/organizations/${localStorage.getItem('user_id')}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      })
       .then(res => res.json())
       .then(json => {
         this.setState({
           username: json.username,
           name: json.name,
           bio: json.bio,
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
      fetch(`http://localhost:3000/api/v1/organizations/${parseInt(localStorage.getItem('user_id'), 0)}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify({
          username: this.state.username,
          name: this.state.name,
          bio: this.state.bio,
          email: this.state.email
        })
      })
      .then(res => res.json())
      .then(json => {
        if (json.errors) {
          this.setState({errors: json.errors})
        } else {
          this.props.history.push('/organization-account')
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
export default connect(mapStateToProps, mapDispatchToProps)(EditOrganizationAccount)
