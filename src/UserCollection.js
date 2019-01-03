import React, { Component } from 'react';
import { Card } from 'semantic-ui-react'
import UserCard from './UserCard'
import UserFilter from './UserFilter'

class UserCollection extends Component {
  constructor(props){
    super(props)
  }

  renderUsers = () => {
    return this.props.displayUsers.map(u => <UserCard
      key={u.id} profile={u} isLiked={this.props.isLiked} current={this.props.current}
      clickHandler={this.props.userSelect} />)
  }

  render() {
    return(
      <div>
        <UserFilter updateFilter={this.props.updateFilter}/>
        <Card.Group itemsPerRow={4}>
          {this.renderUsers()}
        </Card.Group>
      </div>
    )
  }
}

export default UserCollection
