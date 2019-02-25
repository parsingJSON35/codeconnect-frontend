import React, { Component } from 'react';
import { Card } from 'semantic-ui-react'
import UserCard from './UserCard'
import UserFilter from './UserFilter'

class UserCollection extends Component {
  constructor(props){
    super(props)

    this.state = {
      distances: [],
      distanceFilter: 'Any'
    }
  }

  renderUsers = () => {
    return this.props.displayUsers.map(u => <UserCard
      key={u.id} profile={u} isLiked={this.props.isLiked} current={this.props.current}
      clickHandler={this.props.userSelect} />)
  }

  componentDidMount() {
    let zips = this.props.displayUsers.map(u => u.zip_code)

    // fetch(`https://www.zipcodeapi.com/rest/${process.env.REACT_APP_ZIPCODE_API_KEY}/multi-distance.json/${this.props.current.zip_code}/${zips}/mile`)
    //   .then(res => res.json()).then(data => {
    //     console.log(data);
    //     let results = []
    //     let idx = 0
    //
    //     this.props.displayUsers.forEach(u => {
    //       u.distance = data.distances[u.zip_code]
    //       results[idx] = u
    //       idx++
    //     })
    //
    //     this.setState({
    //       distances: results
    //     })
    //   })
  }

  render() {
    return(
      <div>
        <UserFilter updateFilter={this.props.updateFilter}/>
        <Card.Group itemsPerRow={4}>
          {this.renderUsers()}
        </Card.Group>
      </div>
    )
  }
}

export default UserCollection
