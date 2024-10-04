import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './components/login/Login'
import Mainpage from './components/mainpage/mainpage';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/Mainpage' element={<Mainpage/>}/>
      </Routes>
    </Router>
  )
}

export default App