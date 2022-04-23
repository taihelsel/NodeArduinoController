import './App.css';
import React, { useState } from 'react';

import Home from "./Home/Home.js";
import Schedule from './Schedule/Schedule';
function App() {
  const [page, setPage] = useState("schedule");
  const updatePage = (newPage) => {
    setPage(newPage);
  }
  if (page === "home") return <div className="App"><Home updatePage={updatePage} /></div>
  if (page === "schedule") return <div className="App"><Schedule updatePage={updatePage} /></div>
  return <div className="App">Error loading page</div>
}

export default App;
