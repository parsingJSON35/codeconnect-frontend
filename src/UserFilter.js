import React, {Component} from 'react'
import {Dropdown} from 'semantic-ui-react'

const languageOptions = [
  {
    text: 'Any',
    value: 'Any'
  },
  {
    text: 'Ruby',
    value: 'Ruby'
  },
  {
    text: 'Rails',
    value: 'Rails'
  },
  {
    text: 'JavaScript',
    value: 'JavaScript'
  },
  {
    text: 'React',
    value: 'React'
  }
]

const roleOptions = [
  {
    text: 'All',
    value: 'All'
  },
  {
    text: 'Driver',
    value: 'Driver'
  },
  {
    text: 'Navigator',
    value: 'Navigator'
  }
]

const UserFilter = (props) => {

  const handleChange = (e, input) => {
    props.updateFilter(input)
  }

  return (
    <div>
      <span>
      I am a looking for {' '}
      <Dropdown inline options={roleOptions} name='roleFilter' defaultValue={roleOptions[0].text}
      onChange={(e, i) => handleChange(e, i)} />{' '}
      partners in {' '}
      <Dropdown inline name='languageFilter' options={languageOptions}
      onChange={(e, i) => handleChange(e, i)} defaultValue={languageOptions[0].text} />{' '}
      language.
      </span><br /><br /><br /><br />
    </div>
  )
}

export default UserFilter
