import React, { Component } from 'react';
import { Card } from 'semantic-ui-react'
import UserCard from './UserCard'
import UserFilter from './UserFilter'

class UserCollection extends Component {
  constructor(props){
    super(props)

    this.state = {
      filteredUsers: [],
      distanceFilter: 'Any'
    }
  }

  filterDistance = () => {
    return this.state.distanceFilter !== 'Any' ?
      this.props.displayUsers.filter(u => u.distance <=
        this.state.distanceFilter).sort((a,b) => a.distance-b.distance) : this.props.displayUsers.sort((a,b) => a.distance-b.distance)
  }

  updateDistance = input => this.setState({distanceFilter: input.value})

  renderUsers = () => {
    return this.filterDistance() ? this.filterDistance().map(u => <UserCard
      key={u.id} profile={u} isLiked={this.props.isLiked} current={this.props.current}
      clickHandler={this.props.userSelect} updateLike={this.props.updateLike}/>) : <h1>NO USERS FOUND</h1>
  }

  componentDidMount() {
    let zips = this.props.displayUsers.map(u => u.zip_code)
    let uniq_zips = []

    zips.forEach(zip => uniq_zips.includes(zip) ? null : uniq_zips.push(zip))

    fetch(`https://www.zipcodeapi.com/rest/${process.env.REACT_APP_ZIPCODE_API_KEY}/multi-distance.json/${this.props.current.zip_code}/${uniq_zips}/mile`)
      .then(res => res.json()).then(data => {
        this.props.displayUsers.forEach(u => {
          u.distance = data.distances[u.zip_code]
      })
    })
  }

  render() {
    return(
      <div>
        <UserFilter updateFilter={this.props.updateFilter} updateDistance={this.updateDistance}/>
        <Card.Group itemsPerRow={4}>
          {this.renderUsers()}
        </Card.Group>
      </div>
    )
  }
}

export default UserCollection
