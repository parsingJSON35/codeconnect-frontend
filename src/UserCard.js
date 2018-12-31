import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'

const UserCard = (props) => (
  <Card onClick={() => props.clickHandler(props.profile)}>
    <Card.Content>
      <Card.Header>{props.profile.username}</Card.Header>
    </Card.Content>
  </Card>
)


export default UserCard
