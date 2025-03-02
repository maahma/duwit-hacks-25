import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChatWithGemini from "./Components/chat"; 

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/chat" element={<ChatWithGemini />} /> 
          </Routes>
      </Router>
  );
}

export default App;
