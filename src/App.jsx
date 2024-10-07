import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AdminLogin from './components/adminlogin/adminlogin';
import Events from './components/allevents/allevents';
import Login from './components/login/Login';
import Mainpage from './components/homepage/home';
import Hall from './components/hall/hall';
import Eventregister from './components/EventRegister/eventregister';
import Event from './components/event/event';

const App = () => {
  return (
    <Router>
      <Routes>

        <Route path='/' element={<Login />} />
        <Route path='/Adminlogin' element={<AdminLogin />} />
        <Route path='/Mainpage' element={<Mainpage />} />
        <Route path='/Events' element={<Events />} />
        <Route path='/Hall' element={<Hall/>} />
        <Route path='/EventRegister' element={<Eventregister />} />
        <Route path='/event/:id' element={<Event />} /> {/* Updated to dynamic route */}
      </Routes>
    </Router>
  );
}

export default App;
