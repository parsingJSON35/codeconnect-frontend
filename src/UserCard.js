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

  likeUser = (e) => {
    debugger
    fetch(`http://localhost:3001/api/v1/users/${this.props.current.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accepted': 'application/json'
      },
      body: JSON.stringify(this.props.profile)
    }).then(this.setState({liked: !this.state.liked}))
  }

  unlikeUser = (e) => {
    debugger
    // let userToLike = {
    //   id: props.profile.id,
    //   username: props.profile.username,
    //   zip_code: props.profile.zip_code,
    //   bio: props.profile.bio
    // }

    // let likees = {user_likees: [...props.current.user_likees, userToLike]}

    fetch(`http://localhost:3001/api/v1/users/${this.props.current.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accepted': 'application/json'
      },
      body: JSON.stringify(this.props.profile)
    }).then(this.setState({liked: !this.state.liked}))
  }
  render() {
    return (
      <Fragment>
        <Card onClick={(e) => {
          debugger
          this.props.clickHandler(e, this.props.profile)
        }}>
          <Card.Content>
            <Card.Header>
              <div>{this.props.profile.username}</div>
              <Avatar name={`${this.props.profile.username}`} size='75'/>
            </Card.Header>
            <Card.Meta>{this.props.profile.skills.map(skill =>
              skill.language).join(' | ')}
            </Card.Meta>
            <Card.Description>{`${this.props.profile.bio.slice(0, 100)}...`}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            { this.state.liked ? <Button color='red'
              onClick={this.unlikeUser}>Remove Like</Button> : <Button
              color='green' onClick={this.likeUser} >Like</Button> }
          </Card.Content>
        </Card>

      </Fragment>
    )
  }
}


export default UserCard
