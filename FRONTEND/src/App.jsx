import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AudioCapture from "../src/components/Capture/AudioCapture.jsx"

function App() {


  return (
<BrowserRouter>
<Routes>
  <Route path="/audio" element={<AudioCapture />} />
</Routes>
</BrowserRouter>
  )
}

export default App
