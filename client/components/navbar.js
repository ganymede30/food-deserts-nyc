import React, {useState} from 'react'
import {
  Grid,
  AppBar,
  Button,
  Typography,
  Box,
  IconButton
} from '@material-ui/core'
import {Brightness4, Brightness7} from '@material-ui/icons'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import Modal from './modal'

const Navbar = ({handleClick, isLoggedIn}) => {
  const [modal, setModal] = useState({show: true})
  const [navBar, setNavBar] = useState({
    backgroundColor: 'primary',
    padding: '0 1%'
  })
  const [gridContainer, setGridContainer] = useState({
    height: '55px'
  })
  const [buttonText, setButtonText] = useState({
    fontSize: '1.2em',
    color: '#fafafa'
  })

  const flipModal = () => {
    if (modal.show === false) {
      setModal({show: true})
    } else {
      setModal({show: false})
    }
  }

  return (
    // <div className="navBar">
    //   <h1>New York City Food Availability</h1>
    //   <Modal show={modal.show} handleClose={hideModal}/>
    //   <button type="button" onClick={showModal}>Open Modal</button>
    // </div>

    <Box component="nav">
      <AppBar position="static" className="navBar">
        <Grid className="gridContainer" container>
          <Grid item>
            <Button href="/">
              <Typography className="buttonText">
                New York City Grocery Isochrone
              </Typography>
            </Button>
          </Grid>
          <Grid item>
            <Button href="/">
              <Typography className="buttonText">Map</Typography>
            </Button>
            <Modal show={modal.show} handleClose={flipModal} className="modal">
              <p>
                The green points on the map represent grocery stores and the
                opaque polygon is an isochrone representing the travel distance
                from the center of the polygon. You can click anywhere on the
                map to recenter the polygon. The slider below adjusts your
                travel time and the buttons adjust your form of transportation.
                Enjoy!
              </p>
            </Modal>
            <IconButton
              className="buttonText"
              title="Toggle light/dark theme"
              aria-label="Toggle light/dark theme"
              onClick={() => flipModal()}
            >
              {modal.show ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Grid>
        </Grid>
      </AppBar>
    </Box>
  )
}

export default Navbar
