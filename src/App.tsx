import React from 'react';
import './App.css';
import ApplicationRouter from "./routing/ApplicationRouter";
import { RouterProvider} from "react-router-dom";

function App() {
  return (
    <div className="App">
        <ApplicationRouter />
    </div>
  );
}

export default App;
