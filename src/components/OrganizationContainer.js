import React, { Component } from 'react';

export default class OrganizationContainer extends Component {
  render() {
    return (
      <div className='organization-container'>
        <h1>{this.props.organization.name}</h4>
      </div>
    )
  }
}
