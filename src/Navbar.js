import React, {Component} from 'react'
import {Menu} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

class Navbar extends Component {
  state = { }

  handleClick = (e, name) => this.setState({activeItem: name})

  render() {
    const {activeItem} = this.setState

    return (
      <Menu id='nav'>
        <Menu.Item as={Link} to='/'>
          <h2>CodeConnect</h2><br />
        </Menu.Item>
        <Menu.Item as={Link} to='/profiles'
          name='profiles'
          active={this.state.activeItem === 'profiles'}
          onClick={this.handleClick}
        >
          Browse Profiles
        </Menu.Item>

        <Menu.Item as={Link} to='/likes'
          name='likes'
          active={this.state.activeItem === 'likes'}
          onClick={this.handleClick}
        >
          My Likes
        </Menu.Item>

        <Menu.Item as={Link} to='/profile'
          name='profile'
          active={this.state.activeItem === 'profile'}
          onClick={this.handleClick}
        >
          My Profile
        </Menu.Item>

        <Menu.Menu position='right'>
          <Menu.Item
            name='logout'
            onClick={this.props.logout}
          >
            Logout
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}

export default Navbar
