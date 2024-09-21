import 'react-tooltip/dist/react-tooltip.css'
import React from "react";
import { Route, Routes } from 'react-router-dom';
import TableWithPaginate from './components/tableWithPaginate';
import Dashboard from './components/Dashboard';

function App() {

  return (
    <div className="container">
      <Routes>
        <Route path='/' element = {<Dashboard />} /> 
        <Route path='/table' element = {<TableWithPaginate />} /> 
      </Routes>
    </div>
  )
}

export default App;
