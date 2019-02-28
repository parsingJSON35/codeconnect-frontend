import React, {Component} from 'react'
import {Form, Segment, Message, Grid} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {username: ''}
  }

  handleChange = (e, input) => this.setState({ [input.name]: input.value})

  render() {
    return (
      <div className='login-form'>
      <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
        <Grid.Column style={{maxWidth: 600}}>
          <h1>Welcome to CodeConnect!</h1>
          <h3>Login to your account below</h3>
          <Form onSubmit={(e, name) => this.props.handleSubmit(e, this.state.username)}>
            <Segment stacked>
              <Form.Input fluid icon='user' iconPosition='left'
                placeholder='Username'  name='username'
                onChange={this.handleChange} />

              <Form.Button color='blue' type='submit' fluid>
                Login
              </Form.Button>
            </Segment>
          </Form>
          <Message>
             New to us? <Link to='/signup'>Sign Up</Link>
          </Message>
        </Grid.Column>
      </Grid>
      </div>
    )
  }
}

export default Login
