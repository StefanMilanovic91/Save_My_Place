import React from 'react'

const Modal = ({ modalMessage }) => modalMessage && <div className="modal"><h1>{modalMessage}</h1></div>

export default Modal
