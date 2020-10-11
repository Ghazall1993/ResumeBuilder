import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import { BrowserRouter as Router } from "react-router-dom";
import Navigation from 'components/Navigation/Navigation';


function App() {

  return (
    <Router>
      <Navigation />
    </Router>
  );
}

export default App;