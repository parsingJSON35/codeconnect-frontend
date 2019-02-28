import React, {Component, Fragment} from 'react';
import { Card, Icon, Image, Button } from 'semantic-ui-react'
import Avatar from 'react-avatar'

class UserCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      liked: this.props.isLiked(this.props.profile)
    }
  }


  // const isLiked = () => this.props.current.user_likees.find(likee =>
  //   likee.id === props.profile.id)

  likeUser = e => {
    let profile = {
      username: this.props.profile.username,
      id: this.props.profile.id,
      bio: this.props.profile.bio,
      zip_code: this.props.profile.zip_code
    }

    fetch(`http://localhost:3001/api/v1/users/${this.props.current.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accepted': 'application/json'
      },
      body: JSON.stringify({user: profile})
    }).then(() => {
      this.props.updateLike(this.props.profile)
      this.setState({liked: !this.state.liked})
    })
  }


  render() {
    return (
      <Fragment>
        <Card onClick={(e) => {
          this.props.clickHandler(e, this.props.profile)
        }}>
          <Card.Content>
            <Card.Header>
              <div>{this.props.profile.username}</div>
              <Avatar className='card-ava' name={`${this.props.profile.username}`} size='75'/>
            </Card.Header>

            <Card.Meta className='card-skills'>{this.props.profile.skills.map(skill =>
              skill.language).join(' | ')}
            </Card.Meta>

            <Card.Description>{`${this.props.profile.bio.slice(0, 100)}...`}</Card.Description>

            <h3><strong>15 Miles</strong></h3>

          </Card.Content>
          <Card.Content extra>
            { this.state.liked ? <Button color='red'
              onClick={this.likeUser}>Remove Like</Button> : <Button
              color='green' onClick={ e => this.likeUser(e, this.props.profile)} >Like</Button> }
          </Card.Content>
        </Card>

      </Fragment>
    )
  }
}


export default UserCard
