import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Events from './components/events/events';
import Login from './components/login/Login';
import Mainpage from './components/homepage/home';
import Eventregister from './components/EventRegister/eventregister';

const clientId = "809188169045-fk7d1hqogk3fbm3692fpognmj967171p.apps.googleusercontent.com";

const App = () => {

  
  return (
    <Router>
      <div className="App">
        

        {/* React Router Pages */}
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/Mainpage' element={<Mainpage />} />
          <Route path='/Events' element={<Events />} />
          <Route path='/EventRegister' element={<Eventregister />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
