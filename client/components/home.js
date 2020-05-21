import React from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const Home = props => {
  const {groceries} = props

  return (
    <div>
      {!groceries ? <div>Groceries need to load</div> : <div>{groceries}</div>}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    groceries: state.groceries
  }
}

export default connect(mapState)(Home)
