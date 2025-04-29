// src/App.js
import {  Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import Register from "./pages/Register";
import AddQuestions from "./pages/AddQuestions";
import PrivateRoute from "./pages/components/PrivateRoute";
import Welcome from "./pages/Welcome";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/quiz"
        element={
          <PrivateRoute>
            <Quiz />
          </PrivateRoute>
        }
      />
      <Route
        path="/welcome"
        element={
          <PrivateRoute>
            <Welcome />
          </PrivateRoute>
        }
      />
      <Route path="/result" element={<Result />} />
      <Route path="/" element={<Register />} />
      <Route path="/add" element={<AddQuestions />}></Route>
    </Routes>
  );
}

export default App;
