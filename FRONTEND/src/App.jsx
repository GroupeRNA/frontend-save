
import { useState } from 'react'

import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import QuickNote from './pages/notes/Quicknote'
import HomePage from './pages/home/home'
import AudioCapture from "../src/components/Capture/AudioCapture.jsx"


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/note" element={<QuickNote />} />
          <Route path="/audio" element={<AudioCapture />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
