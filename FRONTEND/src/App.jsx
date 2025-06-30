import Test from "./components/Test/Test"
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {

  return (
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Test />} />
  </Routes>
  </BrowserRouter>
  )
}

export default App
