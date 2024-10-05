import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './eventregister.css';

const Eventregister = () => {
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    collegeName: '',
    eventName: '',
    eventDate: '',
    gformLink: '',
    registrationOpen: '',
    registrationClose: '',
  });

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/registerEvent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });
      const result = await response.json();
      if (response.status === 201) {
        alert('Event registered successfully');
        navigate('/Events');
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error('Error registering event:', error);
      alert('Error registering event');
    }
  };

  return (
    <div className="main">
      <div className="header">
                    <div className="left-section">
                        EventEase
                    </div>
                    <div className="middle-section">
                        <div className="event-nav-home">
                            Home
                        </div>
                        <div className="event-nav-events">
                            Events
                        </div>
                        <div className="about">
                            About Us
                        </div>
                        <div className="contact">
                            Contact Us
                        </div>
                    </div>
                    <div className="right-section">
                        date
                    </div>
                </div>
      <div className="register-container">
        <div className="register-container-left">
          <h1>Publish Event</h1>
          <div className="rcl-h41">
            <p>Upload the event details</p>
            <hr />
            <p>Corrections can't be made after publishing</p>
          </div>
          <form onSubmit={handleSubmit}>
            <p>College Name</p>
            <input 
              type="text" 
              name="collegeName" 
              value={eventData.collegeName} 
              onChange={handleChange} 
              className="register-eventname" 
              placeholder="College Name" 
            />
            <p>Event Name</p>
            <input 
              type="text" 
              name="eventName" 
              value={eventData.eventName} 
              onChange={handleChange} 
              className="register-eventname" 
              placeholder="Event Name" 
            />
            <p>Event Date</p>
            <input 
              type="date" 
              name="eventDate" 
              value={eventData.eventDate} 
              onChange={handleChange} 
              className="register-eventname" 
            />
            <p>Gform details</p>
            <input 
              type="url" 
              name="gformLink" 
              value={eventData.gformLink} 
              onChange={handleChange} 
              className="register-eventname" 
              placeholder="Enter G-form Link" 
            />
            <div className="register-event-gformdetails">
              <div>
                <p>Registration open</p>
                <input 
                  type="date" 
                  name="registrationOpen" 
                  value={eventData.registrationOpen} 
                  onChange={handleChange} 
                  className="register-gformdetails-date" 
                />
              </div>
              <div>
                <p>Registration close</p>
                <input 
                  type="date" 
                  name="registrationClose" 
                  value={eventData.registrationClose} 
                  onChange={handleChange} 
                  className="register-gformdetails-date" 
                />
              </div>
            </div>
            <button type="submit" className="submit-button">Register Event</button>
          </form>
        </div>
        <div className="register-container-right">
          {/* You can add content or design here */}
        </div>
      </div>
    </div>
  );
};

export default Eventregister;
