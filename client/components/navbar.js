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
      polygon is an isochrone representing the travel distance from the center
      of the polygon. You can click anywhere on the map to recenter the polygon.
      The slider below adjusts your travel time and the buttons adjust your form
      of transportation. Enjoy!
    </p>
  </div>
)

export default Navbar
