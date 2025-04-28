// src/App.js
import {  Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import Register from "./pages/Register";

function App() {
  return (
    
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
        <Route path="/register" element={<Register/>}/>
      </Routes>
  
  );
}

export default App;
