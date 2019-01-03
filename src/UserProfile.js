import React from 'react'

const UserProfile = (props) => (
  props.profile ? (
    <div>
      <h1>{props.profile.username}</h1>
      <h3>{props.profile.zip_code}</h3>
      <p>{props.profile.bio}</p>
    </div>
  ) : null
)



export default UserProfile
