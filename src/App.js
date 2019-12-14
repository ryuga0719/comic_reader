import React from 'react';
import './App.css';
import './reset.css';
import SERIES_ALL from './components/SERIES_ALL';
import AppBar from './components/AppBar';

function App() {
  return (
    <div className="App">
        <AppBar />
        <SERIES_ALL />
    </div>
  );
}

export default App;
