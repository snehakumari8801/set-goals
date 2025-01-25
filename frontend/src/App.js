import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//import './App.css';

import UserList from "./components/UserList";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import GoalTracking from "./components/GoalTracking";
import UserDetails from "./components/UserDetails";
import GoalForm from "./components/GoalForm";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/userdetails" element={<UserList />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/goal-form" element={<GoalForm />} />
          <Route path="/goal-tracking" element={<GoalTracking />} />
          <Route path="/user/:id" element={<UserDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
