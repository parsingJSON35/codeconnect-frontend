import React, { Component } from 'react';
import { Card } from 'semantic-ui-react'
import UserCard from './UserCard'
import UserFilter from './UserFilter'

class UserCollection extends Component {
  constructor(props){
    super(props)

    this.state = {
      filteredUsers: [],
      distanceFilter: 'Any',
      roleFilter: 'All',
      languageFilter: 'Any',
    }
  }

  updateFilter = (filter) => {
    console.log('updating filters');
    this.setState({[filter.name]: filter.value})
  }

  setDistance = (id, distance) => {
    let user = this.props.displayUsers.find(u => u.id === id)
    user.distance = distance
  }

  // filterDistance = () => {
  //   return this.state.distanceFilter !== 'Any' ?
  //     this.props.displayUsers.filter(u => u.distance <=
  //       this.state.distanceFilter).sort((a,b) => a.distance-b.distance) : this.props.displayUsers.sort((a,b) => a.distance-b.distance)
  // }

  // updateDistance = input => this.setState({distanceFilter: input.value})

  filterUsers = () => {
    let filtered = this.props.displayUsers.filter(user => user !==
    this.state.current_user)

    console.log(this.state.languageFilter);

    if(this.state.distanceFilter !== 'Any') {
      filtered = filtered.filter(user => user.distance <= this.state.distanceFilter)
    }

    if(this.state.languageFilter !== 'Any') {
        filtered = filtered.filter(user => {
          let matched = false
          let i = 0

          while(!matched && i < user.skills.length) {

            matched = user.skills[i].language.toLowerCase() === this.state.languageFilter.toLowerCase() ?
              true : false
            i++
          }

          return matched
        })
    }

    if(this.state.roleFilter !== 'All') {
        filtered = filtered.filter(user => {
          let matched = false
          let i = 0

          while(!matched && i < user.skills.length) {

            matched = user.skills[i].role.toLowerCase() === this.state.roleFilter.toLowerCase() ?
              true : false
            i++
          }

          return matched
        })
    }


    return filtered.sort((a,b) => a.distance - b.distance)
  }

  renderUsers = () => {
    return this.filterUsers().length !== 0 ? this.filterUsers().map(u => <UserCard
      key={u.id} profile={u} isLiked={this.props.isLiked} current={this.props.current} updateLike={this.props.updateLike}
      setDistance={this.setDistance} />) : <h3 id='empty'>NO USERS FOUND</h3>
  }

  componentDidMount() {
    // let zips = this.props.displayUsers.map(u => u.zip_code)
    // let uniq_zips = []
    //
    // zips.forEach(zip => uniq_zips.includes(zip) ? null : uniq_zips.push(zip))
    //
    // fetch(`https://www.zipcodeapi.com/rest/${process.env.REACT_APP_ZIPCODE_API_KEY}/multi-distance.json/${this.props.current.zip_code}/${uniq_zips}/mile`)
    //   .then(res => res.json()).then(data => {
    //     this.props.displayUsers.forEach(u => {
    //       u.distance = data.distances[u.zip_code]
    //   })
    // })
  }

  // shouldComponentUpdate(nextProps) {
  //   console.log(this.props, nextProps);
  //   return this.props !== nextProps
  // }

  render() {
    return(
      <div>
        <UserFilter updateFilter={this.updateFilter} updateDistance={this.updateDistance}/>
        <Card.Group itemsPerRow={4}>
          {this.renderUsers()}
        </Card.Group>
      </div>
    )
  }
}

export default UserCollection
