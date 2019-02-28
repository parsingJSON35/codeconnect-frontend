import React, {Component, Fragment} from 'react'
import {Form, Button, Grid, Input, Segment} from 'semantic-ui-react'
import {Link, withRouter} from 'react-router-dom'

const options = [
  { key: 'S', text: 'Not Interested', value: ' ' },
  { key: 'N', text: 'Navigator (Mentor)', value: 'navigator' },
  { key: 'D', text: 'Driver (Mentee)', value: 'driver' },
]

class UserUpdate extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: props.current.username,
      zip_code: props.current.zip_code,
      bio: props.current.bio,
      skills: props.current.skills
    }
  }

  handleChange = (e, input) => {
    this.setState({ [input.name]: input.value})
  }

  handleSubmit = e => {
    e.preventDefault()
    console.log('updating user');
    let profile = {
      id: this.props.current.id,
      username: this.state.username,
      zip_code: this.state.zip_code,
      bio: this.state.bio,
      skills: this.state.skills
    }


    fetch(`http://localhost:3001/api/v1/users/${this.props.current.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accepted': 'application/json'
      },

      body: JSON.stringify({user: profile})
    }).then(this.props.updateCurrent(profile))

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

  deleteAccount = () => {
    console.log('deleted')
    fetch(`http://localhost:3001/api/v1/users/${this.props.current.id}`,
      {method: 'DELETE'}).then(this.props.setCurrent(null))
      .then(this.props.history.push('/'))
  }

  componentDidMount() {
    // let skillset = this.props.current.skills ? (
    //   this.props.current.skills.map(s => {
    //     return <Form.Select onChange={null}
    //       label={s.language.toUpperCase()} name={s.language} options={options}/>
    //   })
    // ) : null
    //
    // console.log(skillset);
  }

  render() {
    return (
      <div id='update-form' className='login-form'>
      <Grid textAlign='center' verticalAlign='middle' style={{ height: '100%' }} >
      <Grid.Column style={{maxWidth: 950}}>
      <h1>My Profile Summary</h1>
        <Form id='profile-update' size='large' onSubmit={this.handleSubmit}>
        <Segment>
            <Form.Field inline>
              <label>Username:</label>
              <Input
                value={this.state.username}
                name='username'
                onChange={(e, input) => this.handleChange(e, input)}
              />
            </Form.Field>

            <Form.Field inline>
              <label>Zip Code:</label>
              <Input
                value={this.state.zip_code}
                name='zip_code'
                type='number'
                onChange={(e, input) => this.handleChange(e, input)}
              />
            </Form.Field>

            <Form.Field inline>
              <label>Biography:</label>
              <textarea id='bio'
                value={this.state.bio}
                name='bio'
                onChange={(e, input) => this.handleChange(e, input)}
              ></textarea>
            </Form.Field>

            <h4>Skills Summary</h4>
            <Segment>

              <Form.Group>
              {this.props.current.skills ? (
                this.props.current.skills.map(s => {
                  return <Form.Select onChange={(e, input) => this.skillset(e, input)}
                    label={s.language.charAt(0).toUpperCase() + s.language.slice(1)} name={s.language} key={s.language} options={options} defaultValue={options.find(o => o.role === s.role)}/>
                })
              ) : null}

                </Form.Group>
              </Segment>

          <Form.Button color='blue' type='submit'>Update My Profile</
            Form.Button>
        </Segment>
        <Button as={Link} to='/' color='red'
          onClick={this.deleteAccount}>DELETE MY ACCOUNT</Button>
        </Form><br />

        </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default UserUpdate


// <Form.Select onChange={null}
//   label='Ruby' name='ruby' options={options}/>
//
//   <Form.Select onChange={null}
//     label='Rails' name='rails' options={options}/>
//
//   <Form.Select onChange={null}
//     label='React' name='react' options={options}/>
//
//   <Form.Select onChange={null}
//     label='JavaScript' name='javascript' options={options}/>

// <Grid textAlign='center'>
//   <Grid.Row>
//     <Grid.Column>
//
// </Grid.Column>
// </Grid.Row>
// </Grid>

// <Grid.Column style={{maxWidth: 900}}>
//   <Form onSubmit={this.handleSubmit}>
//     <Form.Input
//       label='Username'
//       value={this.state.username}
//       name='username'
//       onChange={(e, input) => this.handleChange(e, input)}
//     />
//
//     <Form.Input
//       label='Zip Code'
//       value={this.state.zip_code}
//       name='zip_code'
//       type='number'
//       onChange={(e, input) => this.handleChange(e, input)} />
//
//     <Form.TextArea
//       label='Biography'
//       name='bio'
//       value={this.state.bio}
//       onChange={(e, input) => this.handleChange(e, input)} />
//
//     <Form.Button color='blue' type='submit'>Update My Profile</Form.Button>
//   </Form>
//   <br />
//   <Button as={Link} to='/' color='red' onClick={this.deleteAccount}>DELETE MY ACCOUNT</Button>
// </Grid.Column>


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
