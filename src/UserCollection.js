import React, { Component } from 'react';
import { Card } from 'semantic-ui-react'
import UserCard from './UserCard'

class UserCollection extends Component {
  constructor(props){
    super(props)
  }

  renderUsers = () => {
    return this.props.displayUsers.map(u => <UserCard
      key={u.id} profile={u} clickHandler={this.props.userSelect} />)
  }

  render() {
    return(
      <Card.Group itemsPerRow={4}>
        {this.renderUsers()}
      </Card.Group>
    )
  }
}

export default UserCollection
