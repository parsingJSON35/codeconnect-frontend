import React, { Component } from 'react';
import UserCollection from './UserCollection';
import {Route} from 'react-router-dom'
import './App.css';

class App extends Component {
  constructor() {
    super()

    this.state = {
      users: [],
      selected_user: null
    }
  }

  highlightUser = (user) => {
    console.log('highlighting user');
    this.setState({selected_user: user})
  }
  componentDidMount() {
    fetch('http://localhost:3001/api/v1/users').then(res => res.json()).then(data => this.setState({users: data}))
  }

  render() {
    return (
      <div className="App">
        <Route path='/' render={() => <UserCollection
          displayUsers={this.state.users} userSelect={this.highlightUser}/>} />
        <Route exact path='/users/:id' />
      </div>
    )
  }
}

export default App;
