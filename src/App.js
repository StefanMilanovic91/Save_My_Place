import React, { useState } from 'react'

import Map from './components/Map/Map';
import Modal from './components/Modal/Modal';
import Navbar from './components/Navbar/Navbar';

const App = () => {

    const [modalMessage, setModalMessage] = useState(null);


    return (
        <main className="main-page">
            <Navbar />
            <Map setModalMessage={setModalMessage} />
            <Modal modalMessage={modalMessage} />

        </main>
    )
}

export default App
