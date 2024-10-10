import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Adminhall from './components/adminhall/adminhall';
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

        <Route path='/Login-signup-page' element={<Login />} />
        <Route path='/Adminlogin' element={<AdminLogin />} />
        <Route path='/Adminhall' element={<Adminhall/>} />
        <Route path='/Homepage' element={<Mainpage />} />
        <Route path='/Eventspage' element={<Events />} />
        <Route path='/Hallpage' element={<Hall/>} />
        <Route path='/EventRegisterpage' element={<Eventregister />} />
        <Route path='/event/:id' element={<Event />} /> {/* Updated to dynamic route */}
      </Routes>
    </Router>
  );
}

export default App;
