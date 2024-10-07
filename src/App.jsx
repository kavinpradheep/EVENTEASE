import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginForm from './components/Actuallogin/LoginForm';
import Events from './components/allevents/allevents';
import Login from './components/login/Login'
import Mainpage from './components/homepage/home';
import Eventregister from './components/EventRegister/eventregister';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/Actuallogin' element={<LoginForm/>}/>
        <Route path='/Mainpage' element={<Mainpage/>}/>
        <Route path='/Events' element={<Events/>}/>
        <Route path='/EventRegister' element={<Eventregister/>} />
      </Routes>
    </Router>
  )
}

export default App