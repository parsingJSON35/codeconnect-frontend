import React from 'react'
import {Grid} from 'semantic-ui-react'
import Avatar from 'react-avatar'

const Likes = (props) => {

  const getLikees = () => {
    return ( props.current_user.user_likees ?
      props.current_user.user_likees.map(user =>
        <Avatar value={`${user.username}`} size='150'/>) : ''
    )
  }

  const getLikers = () => {
    return ( props.current_user.user_likers ?
      props.current_user.user_likers.map(user =>
        <Avatar value={`${user.username}`} size='150'/>) : ''
    )
  }

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={8}>
          <h1>Users I Like</h1>
          {getLikees()}
        </Grid.Column>

        <Grid.Column width={8}>
          <h1>Users That Like Me</h1>
          <div>{getLikers()}</div>
        </Grid.Column>
      </Grid.Row>
    </Grid>

  )
}

export default Likes
