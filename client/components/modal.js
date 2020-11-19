import React from 'react'

const Modal = ({handleClose, show, children}) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none'

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <button id="x" onClick={handleClose}>
          {' '}
          X{' '}
        </button>
        <p>
          The green points on the map represent grocery stores and the opaque
          polygon is an isochrone representing the travel distance from the
          center of the polygon. You can click anywhere on the map to recenter
          the polygon. The slider below adjusts your travel time and the buttons
          adjust your form of transportation. Enjoy!
        </p>
        {/* <button onClick={handleClose}>close</button> */}
      </section>
    </div>
  )
}

export default Modal
