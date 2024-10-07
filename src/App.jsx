import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Events from './components/allevents/allevents';
import Login from './components/login/Login';
import Mainpage from './components/homepage/home';
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
        <Route path='/Mainpage' element={<Mainpage />} />
        <Route path='/Events' element={<Events />} />
        <Route path='/EventRegister' element={<Eventregister />} />
        <Route path='/event/:id' element={<Event />} /> {/* Updated to dynamic route */}
        <Route path='/aboutUs' element={<About/ >}/>
        <Route path='/Contact us' element={<Contact/ >} />
        
      </Routes>
    </Router>
  );
}

export default App;
