
import { useState } from 'react'

import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import QuickNote from './pages/notes/Quicknote'
import HomePage from './pages/home/home'
import AudioUploadPage from './pages/notes/AudioUploadPage'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/note" element={<QuickNote />} />
        <Route path="/upload" element={<AudioUploadPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
