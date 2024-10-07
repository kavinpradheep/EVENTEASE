import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

<<<<<<< HEAD
import Adminhall from './components/adminhall/adminhall';
import AdminLogin from './components/adminlogin/adminlogin';
=======
import LoginForm from './components/Actuallogin/LoginForm';
>>>>>>> 7a22d3db5875e1d9ea6c4c4e033f031344ce6349
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
<<<<<<< HEAD

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
        
=======
        <Route path='/' element={<Login/>}/>
        <Route path='/Actuallogin' element={<LoginForm/>}/>
        <Route path='/Mainpage' element={<Mainpage/>}/>
        <Route path='/Events' element={<Events/>}/>
        <Route path='/EventRegister' element={<Eventregister/>} />
>>>>>>> 7a22d3db5875e1d9ea6c4c4e033f031344ce6349
      </Routes>
    </Router>
  );
}

export default App;
