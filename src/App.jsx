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
import About from './components/aboutUs/About';
import Contact from './components/Contact us/contact';

<comp></comp>
const App = () => {
  return (
    <Router>
      <Routes>

        <Route path='/' element={<Login />} />
        <Route path='/Adminlogin' element={<AdminLogin />} />
        <Route path='/Adminhall' element={<Adminhall/>} />
        <Route path='/Mainpage' element={<Mainpage />} />
        <Route path='/Events' element={<Events />} />
        <Route path='/Hall' element={<Hall/>} />
        <Route path='/EventRegister' element={<Eventregister />} />
        <Route path='/event/:id' element={<Event />} /> {/* Updated to dynamic route */}
        <Route path='/aboutUs' element={<About/ >}/>
        <Route path='/Contact us' element={<Contact/ >} />
        
      </Routes>
    </Router>
  );
}

export default App;
