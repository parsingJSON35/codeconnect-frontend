import React, {Component} from 'react'
import {Form, Button, Grid, Segment} from 'semantic-ui-react'
import {Link, withRouter} from 'react-router-dom'

const options = [
  { key: 'S', text: 'Not Interested', value: ' ' },
  { key: 'N', text: 'Navigator (Mentor)', value: 'navigator' },
  { key: 'D', text: 'Driver (Mentee)', value: 'driver' },
]

class Signup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      zip_code: 0,
      bio: '',
      skills: []
    }
  }

  handleChange = (e, input) => {
    this.setState({ [input.name]: input.value})
  }

  skillset = (e, input) => {

    let newSkills = [...this.state.skills]
    newSkills = newSkills.filter(skill => skill.language !== input.name)

    if(input.value !== ' ') {
      let skill = { language: input.name, role: input.value}
      newSkills.push(skill)
    }

    this.setState({ skills: newSkills})
  }

  handleSubmit = e => {
    e.preventDefault()
    console.log('creating new user');
    let profile = {
      username: this.state.username,
      zip_code: this.state.zip_code,
      bio: this.state.bio,
      skills: this.state.skills
    }
    console.log(profile)

    fetch('http://localhost:3001/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accepted': 'application/json'
      },
      body: JSON.stringify(profile)
    }).then(() => fetch('http://localhost:3001/api/v1/users')).then(res =>
      res.json()).then(users => this.props.updateUsers(users))
  }

  render() {
    return (
      <div className='login-form'>
      <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
        <Grid.Column style={{maxWidth: 925 }}>
        <h2>Sign Up for Your CodeConnect Account</h2>
      <Form>
        <Segment>
          <Form.Input label='Username' placeholder='Username' name='username'
            onChange={(e, input) => this.handleChange(e, input)} />

          <Form.Input label='Zip Code' placeholder='Zip Code' name='zip_code'
            type='number' onChange={(e, input) => this.handleChange(e, input)} />

              <Form.TextArea label='Biography'
            placeholder='Tell your fellow coders about yourself...' name='bio'
            onChange={(e, input) => this.handleChange(e, input)} />

            <h4>Skills</h4>
              <Segment>
                <Form.Group>
                  <Form.Select onChange={(e, input) => this.skillset(e, input)}
                    label='Ruby' name='ruby' options={options}/>

                    <Form.Select onChange={(e, input) => this.skillset(e, input)}
                      label='Rails' name='rails' options={options}/>

                    <Form.Select onChange={(e, input) => this.skillset(e, input)}
                      label='React' name='react' options={options}/>

                    <Form.Select onChange={(e, input) => this.skillset(e, input)}
                      label='JavaScript' name='javascript' options={options}/>
                  </Form.Group>
                </Segment>

                <Button as={Link} to='/profiles' color='green' onClick={this.handleSubmit}>Register Your Account</Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default withRouter(Signup)
