import React, {useState, useEffect} from 'react'
import {shallowEqual, useSelector, useDispatch} from 'react-redux'
import {gotGrocers} from '../store/grocers'

/**
 * COMPONENT
 */

export default function Home() {
  const grocers = useSelector(state => state.grocers)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(gotGrocers())
  }, [])

  console.log('Grocers:', grocers)

  return (
    <div>
      {!grocers ? <div>Grocers need to load</div> : <div>Grocers loaded</div>}
    </div>
  )
}

// export const Home = props => {
//   const {grocers} = props
//   console.log("props:", props)

//   componentDidMount(){
//     this.props.gotGrocers()
//   }

//   return (
//     <div>
//       {!grocers ? <div>Grocers need to load</div> : <div>{grocers}</div>}
//     </div>
//   )
// }

/**
 * CONTAINER
 */
// const mapState = state => {
//   return {
//     grocers: state.grocers
//   }
// }

// const mapDispatch = dispatch => ({
//   gotGrocers: () => dispatch(gotGrocers())
// })

//export default connect(mapState, mapDispatch)(Home)
