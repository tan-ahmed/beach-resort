import React from 'react';
import './App.css';

import Home from './pages/Home'
import Rooms from './pages/Rooms'
import SingleRoom from './pages/SingleRoom'
import Error from './pages/Error'

function App() {
  return (
    <div className="App">
      <Home></Home>
      <Rooms></Rooms>
      <SingleRoom></SingleRoom> 
      <Error></Error>
    </div>
  );
}

export default App;
