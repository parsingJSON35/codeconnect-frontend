import React from 'react'
import Avatar from 'react-avatar'
import { Grid, Image } from 'semantic-ui-react'

const UserProfile = (props) => (
  props.profile ? (
    <Grid id='profile' divided stackable columns={2}>
      <Grid.Column>
          <Avatar value={`${props.profile.username}`} size='225'/>
          <h3>{props.profile.zip_code}</h3>
      </Grid.Column>
      <Grid.Column textAlign='left'>
        <p id='profile-bio'>{props.profile.bio}</p>
      </Grid.Column>
    </Grid>
  ) : null
)



export default UserProfile
