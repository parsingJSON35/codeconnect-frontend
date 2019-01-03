import React, {Component} from 'react'
import {Form, Button, Grid} from 'semantic-ui-react'
import {Link, withRouter} from 'react-router-dom'

class UserUpdate extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: props.current.username,
      zip_code: props.current.zip_code,
      bio: props.current.bio,
    }
  }

  handleChange = (e, input) => {
    this.setState({ [input.name]: input.value})
  }

  handleSubmit = e => {
    e.preventDefault()
    console.log('updating user');
    let profile = {
      username: this.state.username,
      zip_code: this.state.zip_code,
      bio: this.state.bio
    }


    fetch(`http://localhost:3001/api/v1/users/${this.props.current.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accepted': 'application/json'
      },

      body: JSON.stringify(profile)
    }).then(this.props.updateCurrent(profile))

  }

  deleteAccount = () => {
    fetch(`http://localhost:3001/api/v1/users/${this.props.current.id}`,
      {method: 'DELETE'}).then(this.props.setCurrent(null))
      .then(this.props.history.push('/'))
  }

  render() {
    return (
      <Grid textAlign='center'>
        <Grid.Column style={{maxWidth: 900}}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Input
              label='Username'
              value={this.state.username}
              name='username'
              onChange={(e, input) => this.handleChange(e, input)}
            />

            <Form.Input
              label='Zip Code'
              value={this.state.zip_code}
              name='zip_code'
              type='number'
              onChange={(e, input) => this.handleChange(e, input)} />

            <Form.TextArea
              label='Biography'
              name='bio'
              value={this.state.bio}
              onChange={(e, input) => this.handleChange(e, input)} />

            <Form.Button color='blue' type='submit'>Update My Profile</Form.Button>
          </Form>
          <br />
          <Button as={Link} to='/' color='red' onClick={this.deleteAccount}>DELETE MY ACCOUNT</Button>
        </Grid.Column>
      </Grid>
    )
  }
}

export default UserUpdate


// <Form.Group>
//   <Form.Select onChange={(e, input) => this.skillset(e, input)}
//   label='Ruby' name='ruby' options={options}/>
//
//   <Form.Select onChange={(e, input) => this.skillset(e, input)}
//     label='Rails' name='rails' options={options}/>
//
//   <Form.Select onChange={(e, input) => this.skillset(e, input)}
//     label='React' name='react' options={options}/>
//
//   <Form.Select onChange={(e, input) => this.skillset(e, input)}
//     label='JavaScript' name='javascript' options={options}/>
// </Form.Group>
