import React from 'react'
import Avatar from 'react-avatar'
import { Grid, Image } from 'semantic-ui-react'

const UserProfile = (props) => (
  props.profile ? (
    <Grid id='profile' divided stackable columns={2}>
      <Grid.Row>
        <Grid.Column>
            <Avatar value={`${props.profile.username}`} size='225'/>
            <h3>{props.profile.zip_code}</h3>
            <ul className='skillset-display'>
              {
                props.profile.skills.map(s => {
                  return (
                    <li>
                    <strong>{
                      `${s.language.charAt(0).toUpperCase()}${s.language.slice(1)}:`}</strong>
                      {`  ${s.role.charAt(0).toUpperCase()}${s.role.slice(1)}`}
                    </li>
                  )
                })
              }
            </ul>
        </Grid.Column>
        <Grid.Column textAlign='left'>
          <p id='profile-bio'>{props.profile.bio}</p>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  ) : null
)



export default UserProfile
