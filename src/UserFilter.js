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

const distanceOptions = [
  {
    text: 'Any',
    value: 'Any'
  },
  {
    text: '100 miles',
    value: 100
  },
  {
    text: '50 miles',
    value: 50
  },
  {
    text: '25 miles',
    value: 25
  },
  {
    text: '10 miles',
    value: 10
  },
  {
    text: '5 miles',
    value: 5
  }
]

const UserFilter = (props) => {

  const handleChange = (e, input) => {
    props.updateFilter(input)
  }

  const distChange = (e, input) => {
    props.updateDistance(input);
  }

  return (
    <div id='filter'>
      <span id='filter-text'>
      I am a looking for {' '}
      <Dropdown inline options={roleOptions} name='roleFilter'
        defaultValue={roleOptions[0].text}
        onChange={(e, i) => handleChange(e, i)} />

      {' '} partners in {' '}

      <Dropdown inline name='languageFilter' options={languageOptions}
        onChange={(e, i) => handleChange(e, i)}
        defaultValue={languageOptions[0].text} />

      {' '} language {' '} within {' '}

      <Dropdown inline name='distanceFilter' options={distanceOptions}
        defaultValue={distanceOptions[0].text}
        onChange={(e, i) => handleChange(e, i)} />

      {' '} distance.
      </span><br /><br /><br /><br />
    </div>
  )
}

export default UserFilter
