import React, { Component } from 'react'
import loading from '../Gear.gif'
export default class Loading extends Component {
  render() {
    return (
      <div className='text-center my-5'>
          <img src={loading} alt="loading" />
      </div>
    )
  }
}
