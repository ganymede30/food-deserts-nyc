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
