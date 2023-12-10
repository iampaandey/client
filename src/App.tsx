import './App.css';
import Nav from './components/Nav.tsx';
import React from "react"
import Questions from './components/Questions.tsx';

const App:React.FC=()=> {
  return (
    <div className="App">
      <Nav/>
      <Questions/>
    </div>
  );
}

export default App;
