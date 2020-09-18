import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div className="navBar">
    <h1>New York City Food Availability</h1>
    <p>
      The green points on the map represent grocery stores and the opaque
      polygon represents the travel distance from the center of the map. You can
      adjust your travel distance using the slider below and you can adjust how
      you are traveling by clicking the buttons below. Enjoy!
    </p>
  </div>
)

export default Navbar
