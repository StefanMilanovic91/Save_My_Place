import React from 'react'
import '../../css/modal.css';

const Modal = ({ modalMessage }) => modalMessage && <div className="modal"><h1 className="modal__title">{modalMessage}</h1></div>

export default Modal
