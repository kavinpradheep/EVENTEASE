import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Events from './components/events/events';
import Login from './components/login/Login'
import Mainpage from './components/homepage/home';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/Mainpage' element={<Mainpage/>}/>
        <Route path='/Events' element={<Events/>}/>
      </Routes>
    </Router>
  )
}

export default App