import React from 'react'
import {Grid} from 'semantic-ui-react'

const Likes = (props) => {

  const getLikees = () => {
    return ( props.current_user.user_likees ?
      props.current_user.user_likees.map(user =>
        <h4 key={user.id}>{user.username}</h4>) : ''
    )
  }

  const getLikers = () => {
    return ( props.current_user.user_likers ?
      props.current_user.user_likers.map(user =>
        <h4 key={user.id}>{user.username}</h4>) : ''
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
