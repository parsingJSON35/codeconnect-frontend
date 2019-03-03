import React from 'react'
import {Grid} from 'semantic-ui-react'
import Avatar from 'react-avatar'
import {Link} from 'react-router-dom'

const Likes = (props) => {

  const getLikes = users => {
    return (
      users.map(user => {
        return (
          <Link to={`/profiles/${user.username}`}>
            <Avatar value={`${user.username}`} size='150'/>
          </Link>
        )
      }) : ''
    )
  }

  let likees = props.current_user.user_likees
  let likers = props.current_user.user_likers

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={8}>
          <h1>Users I Like</h1>
          <div>{ likees ? getLikes(likees) : null }</div>
        </Grid.Column>

        <Grid.Column width={8}>
          <h1>Users That Like Me</h1>
          <div>{likers ? getLikes(likers) : null }</div>
        </Grid.Column>
      </Grid.Row>
    </Grid>

  )
}

export default Likes
