import React, { Component } from 'react';
import { connect } from 'react-redux';

class CreateFund extends Component {
  state = {
    title: '',
    description: '',
    goal: '',
    picture: '',
    errors: []
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    fetch('http://localhost:3000/api/v1/funds', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        organization_id: localStorage.getItem('user_id'),
        title: this.state.title,
        description: this.state.description,
        goal: this.state.goal,
        picture: this.state.picture,
      })
    })
    .then(res => res.json())
    .then(json => {
      if (json.errors) {
        this.setState({errors: json.errors})
      } else {
        debugger

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
        <form className='card register' onSubmit={(event) => this.handleSubmit(event)}>
          <h2>Create Fund</h2>
          <div className='flex'>
            <input
              className='text-input input-flex-half'
              type='text'
              name='title'
              value={this.state.title}
              placeholder='Title'
              onChange={(event) => this.handleChange(event)}
            />
            <textarea
              className='text-input input-flex-tall'
              type='text'
              name='description'
              value={this.state.description}
              placeholder='Description'
              onChange={(event) => this.handleChange(event)}
            />
            <input
              className='text-input input-flex-half'
              type='text'
              name='goal'
              value={this.state.goal}
              placeholder='Organization Name'
              onChange={(event) => this.handleChange(event)}
            />
            <input
              className='text-input input-flex'
              type='text'
              name='picture'
              value={this.state.picture}
              placeholder='Picture link'
              onChange={(event) => this.handleChange(event)}
            />
            <input
              className='submit-button button-margin'
              type='submit'
              value='Create Fund'
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
export default connect(mapStateToProps, mapDispatchToProps)(CreateFund)
