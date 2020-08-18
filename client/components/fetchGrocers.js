import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {gotGrocers} from '../store/grocers'

export function fetchGrocers() {
  const grocers = useSelector(state => state.grocers)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(gotGrocers())
  }, [])

  // console.log(grocers)
  return grocers
}
