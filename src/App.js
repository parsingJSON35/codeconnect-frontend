import React, { Component } from 'react';
import UserCollection from './UserCollection';
import UserProfile from './UserProfile'
import UserUpdate from './UserUpdate'
import Signup from './Signup'
import Navbar from './Navbar'
import Likes from './Likes'
import Login from './Login'
import {Route, withRouter} from 'react-router-dom'
import './App.css';

class App extends Component {
  constructor() {
    super()

    this.state = {
      users: [],
      current_user: null,
      roleFilter: 'All',
      languageFilter: 'Any'
    }
  }

  updateLike = user => {
    console.log('like updated')

    let update = this.state.current_user
    let userCopy = this.state.users
    let newest = userCopy.find(u => u.id === user.id)

    console.log(user, update, newest);

    if (update.user_likees.find(u => u.id === user.id)) {
      update.user_likees = update.user_likees.filter(u => u.id !== user.id)
      newest.user_likers = newest.user_likers.filter(u => u.id !== update.id)
    } else {
      update.user_likees.push(user)
      newest.user_likers.push(update)
    }


    this.setState({
      current_user: update,
      users: userCopy
    })
  }


  isLiked = (user) => this.state.current_user.user_likees.find(likee =>
    likee.id === user.id)

  setUrl = path => this.setState({url: path})

  displayUsers = () => {
    let filtered = this.state.users.filter(user => user !==
    this.state.current_user)

    console.log(this.state.languageFilter);

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


    return filtered
  }

  updateFilter = (filter) => {
    console.log('updating filters');
    this.setState({[filter.name]: filter.value})
  }

  loginUser = (e, username) => {
    e.preventDefault()
    this.setState({
      current_user: this.state.users.find(user =>
        user.username.toLowerCase() === username.toLowerCase())})
  }

  getUser = username => this.state.users.find(user =>
    user.username.toLowerCase() === username.toLowerCase())

  setCurrentUser = user => this.setState({current_user: user})

  getUpdatedUsers = (users) => {
    this.setState({
      users: users,
      current_user: users[users.length-1]
    }, this.props.history.push('/'))
  }

  logoutUser = () => {
    this.setState({current_user: null}, this.props.history.push('/'))
  }

  updateCurrentUser = (user) => {
    let current = this.state.current_user
    current.username = user.username
    current.zip_code = user.zip_code
    current.bio = user.bio

    this.setState({current_user: current}, this.props.history.push('/profiles'))
  }

  componentDidMount() {
    fetch('http://localhost:3001/api/v1/users').then(res => res.json()).then(data => this.setState({
      users: data,
    }))
  }

  render() {
  if(this.state.current_user) { console.log(Object.getOwnPropertyNames(this.state.current_user)) }

    return this.state.current_user ? (
      <div className="App">
        <Navbar logout={this.logoutUser}/>
        <Route exact path=':path(/|/profiles)'render={() => <UserCollection
          displayUsers={this.displayUsers()} current={this.state.current_user} isLiked={this.isLiked}
          updateFilter={this.updateFilter} updateLike={this.updateLike} />}  />
        <Route exact path='/likes' render={() => <Likes
          current_user={this.state.current_user}/>} />

        <Route exact path='/profiles/:username' render={(props) => {
          let username = props.match.params.username
          return <UserProfile profile={this.getUser(username)} />
        }} />

        <Route exact path='/profile' render={() => {
          return (
            <UserUpdate current={this.state.current_user}
              updateCurrent={this.updateCurrentUser}
              setCurrent={this.setCurrentUser}/>
          )
        }} />
      </div>
    ) : (
      <div className="App">
        <Route exact path='/' render={() =>
          <Login handleSubmit={this.loginUser}/> } />

        <Route exact path='/signup' render={() => <Signup updateUsers={this.getUpdatedUsers} />} />
      </div>
    )
  }
}
export default withRouter(App);
