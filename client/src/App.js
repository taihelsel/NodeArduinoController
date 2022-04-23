import './App.css';
import React, { useState } from 'react';

import Home from "./Home/Home.js";
import Schedule from './Schedule/Schedule';
import ScheduleBuilder from './ScheduleBuilder/ScheduleBuilder';
function App() {
  const [page, setPage] = useState("schedulebuilder");
  const updatePage = (newPage) => {
    setPage(newPage);
  }
  if (page === "home") return <div className="App"><Home updatePage={updatePage} /></div>
  if (page === "schedule") return <div className="App"><Schedule updatePage={updatePage} /></div>
  if (page === "schedulebuilder") return <div className="App"><ScheduleBuilder updatePage={updatePage} /></div>
  return <div className="App">Error loading page</div>
}

export default App;
