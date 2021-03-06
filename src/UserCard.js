import React, {Component, Fragment} from 'react';
import { Card, Icon, Image, Button } from 'semantic-ui-react'
import Avatar from 'react-avatar'
import {Link} from 'react-router-dom'

class UserCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      liked: this.props.isLiked(this.props.profile),
      distance: null,
      loading: true,
    }
  }

  likeUser = e => {
    e.preventDefault()

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

  componentDidMount() {
    // if(!this.state.distance) {
    //   fetch(`https://www.zipcodeapi.com/rest/${process.env.REACT_APP_ZIPCODE_API_KEY}/distance.json/${this.props.current.zip_code}/${this.props.profile.zip_code}/mile`)
    //     .then(res => res.json()).then(data => {
    //       console.log('data fetched');
    //       let distance = Math.floor(data.distance)
    //
    //       this.props.setDistance(this.props.profile.id, distance)
    //       this.setState({
    //         distance: distance,
    //         loading: false
    //       })
    //     })
    //   }
  }

  render() {
    return (
      this.state.loading ? null : (
            <Card as={Link} to={`/profiles/${this.props.profile.username}`}>
              <Card.Content>
                <Card.Header>
                  <div>{this.props.profile.username}</div>
                  <Avatar className='card-ava' name={`${this.props.profile.username}`} size='75'/>
                </Card.Header>

                <Card.Meta className='card-skills'>{this.props.profile.skills.map(skill =>
                  skill.language).join(' | ')}
                </Card.Meta>

                <Card.Description>{`${this.props.profile.bio.slice(0, 100)}...`}</Card.Description>

                <h3><strong>{this.state.distance} miles</strong></h3>

              </Card.Content>
              <Card.Content extra>
                { this.state.liked ? <Button color='red'
                  onClick={this.likeUser}>Remove Like</Button> : <Button
                  color='green' onClick={ e => this.likeUser(e, this.props.profile)} >Like</Button> }
              </Card.Content>
            </Card>
      )
    )
  }
}


export default UserCard
