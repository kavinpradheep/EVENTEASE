import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './eventregister.css';

const Eventregister = () => {
  const navigate = useNavigate();
  const [eventCount, setEventCount] = useState(1); // State to hold the number of events
  const [events, setEvents] = useState([{ eventName: '' }]); // State to hold event details
  const [contactCount, setContactCount] = useState(1); // State to hold the number of contacts
  const [contacts, setContacts] = useState([{ contactName: '', contactNumber: '' }]); // State to hold contact details

  const [eventData, setEventData] = useState({
    collegeName: '',
    eventDate: '',
    gformLink: '',
    registrationOpen: '',
    registrationClose: '',
    description: '', // Added for event description
    detailedInfo: '', // Added for detailed information about the event
  });

  const [eventPoster, setEventPoster] = useState(null);

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setEventPoster(e.target.files[0]);
  };

  const handleEventCountChange = (count) => {
    setEventCount(count);
    const newEvents = Array.from({ length: count }, (_, index) => ({
      eventName: events[index]?.eventName || '',
    }));
    setEvents(newEvents);
  };

  const handleInputChange = (index, field, value) => {
    const updatedEvents = [...events];
    updatedEvents[index][field] = value;
    setEvents(updatedEvents);
  };

  const handleContactCountChange = (count) => {
    setContactCount(count);
    const newContacts = Array.from({ length: count }, (_, index) => ({
      contactName: contacts[index]?.contactName || '',
      contactNumber: contacts[index]?.contactNumber || '',
    }));
    setContacts(newContacts);
  };

  const handleContactInputChange = (index, field, value) => {
    const updatedContacts = [...contacts];
    updatedContacts[index][field] = value;
    setContacts(updatedContacts);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append event data to FormData
    formData.append('collegeName', eventData.collegeName);
    formData.append('eventDate', eventData.eventDate);
    formData.append('gformLink', eventData.gformLink);
    formData.append('registrationOpen', eventData.registrationOpen);
    formData.append('registrationClose', eventData.registrationClose);
    formData.append('description', eventData.description); // Append description
    formData.append('detailedInfo', eventData.detailedInfo); // Append detailed information

    // Handle event poster file upload
    if (eventPoster) {
      formData.append('eventPoster', eventPoster);
    } else {
      alert("Please upload an event poster.");
      return;
    }

    // Convert events and contacts arrays to JSON strings
    formData.append('events', JSON.stringify(events));
    formData.append('contacts', JSON.stringify(contacts));

    try {
      const response = await fetch('http://localhost:5000/api/registerEvent', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (response.status === 201) {
        alert('Event registered successfully');
        navigate('/Events');
      } else {
        alert(result.error || "Error registering event");
      }
    } catch (error) {
      console.error('Error registering event:', error);
      alert('Error registering event');
    }
  };

  return (
    <div className="main">
      {/* Header section */}
      <div className="header">
        <div className="left-section">EventEase</div>
        <div className="middle-section">
          <div className="event-nav-home" onClick={() => navigate('/Mainpage')}>Home</div>
          <div className="event-nav-events" onClick={() => navigate('/Events')}>Events</div>
          <div className="about">About Us</div>
          <div className="contact">Contact Us</div>
        </div>
        <div className="right-section">
          <div className="login" onClick={() => navigate('/')}>Login / Sign Up</div>
        </div>
      </div>
      {/* Register container */}
      <div className="register-container">
        <div className="register-container-left">
          <h1>Publish Event</h1>
          <div className="rcl-h41">
            <p>Upload the event details</p>
            <hr />
            <p>Corrections can't be made after publishing</p>
          </div>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <p>College Name</p>
            <input type="text" name="collegeName" value={eventData.collegeName} onChange={handleChange}
              className="register-eventname" placeholder="College Name" required />
            <p>Event Name</p>
            <input type="text" className='register-eventname' />
            <p>Event Date</p>
            <input type="date" name="eventDate" value={eventData.eventDate}
              onChange={handleChange} className="register-eventname" required />

            <p>Gform details</p>
            <input type="url" name="gformLink" value={eventData.gformLink} onChange={handleChange}
              className="register-eventname" placeholder="Enter G-form Link" required />
            <p>Website Link</p>
            <input type="url" className='register-eventname'/>
            <div className="register-event-gformdetails">
              <div>
                <p>Registration open</p>
                <input type="date" name="registrationOpen" value={eventData.registrationOpen}
                  onChange={handleChange} className="register-gformdetails-date" required />
              </div>
              <div>
                <p>Registration close</p>
                <input type="date" name="registrationClose" value={eventData.registrationClose}
                  onChange={handleChange} className="register-gformdetails-date" required />
              </div>
            </div>

            <p>Event Poster</p>
            <input type="file" name="eventPoster" accept="image/*" onChange={handleImageChange} className="register-poster" required />
            
            {/* Short description field */}
            <p>Enter short description</p>
            <textarea 
              className='register-event-description' 
              name="description" 
              value={eventData.description} 
              onChange={handleChange} 
              placeholder="Short description" 
              required 
            />
            
            {/* Detailed information field */}
            <p>Enter detailed information</p>
            <textarea 
              className='register-about-event' 
              name="detailedInfo" 
              value={eventData.detailedInfo} 
              onChange={handleChange} 
              placeholder="Detailed information about the event" 
              required 
            />

            <p>How many events do you want to register?</p>
            <input
              type="number"
              value={eventCount}
              onChange={(e) => handleEventCountChange(parseInt(e.target.value) || 1)} // Ensure at least 1
              min="1"
              className="event-count-input"
            />

            {Array.from({ length: eventCount }).map((_, index) => (
              <div key={index}>
                <h3 className='register-event-count'>Event {index + 1} Name</h3>
                <label>
                  <input
                    type="text"
                    value={events[index]?.eventName || ''}
                    onChange={(e) => handleInputChange(index, 'eventName', e.target.value)}
                    required
                    className="register-eventname"
                    placeholder="Event Name"
                  />
                </label>
              </div>
            ))}

            <p>How many contacts should be given?</p>
            <input
              type="number"
              value={contactCount}
              onChange={(e) => handleContactCountChange(parseInt(e.target.value) || 1)} // Ensure at least 1
              min="1"
              className="contact-count-input"
            />

            {Array.from({ length: contactCount }).map((_, index) => (
              <div key={index}>
                <h3 className='register-contact-count'>Contact {index + 1}</h3>
                <label>
                  <input
                    type="text"
                    value={contacts[index]?.contactName || ''}
                    onChange={(e) => handleContactInputChange(index, 'contactName', e.target.value)}
                    required
                    placeholder='Name'
                    className="register-contactname"
                  />
                </label>
                <label>
                  <input
                    type="tel"
                    value={contacts[index]?.contactNumber || ''}
                    onChange={(e) => handleContactInputChange(index, 'contactNumber', e.target.value)}
                    required
                    placeholder='Number'
                    className="register-contactnumber"
                  />
                </label>
              </div>
            ))}

            <button type="submit" className="submit-button">Register Event</button>
          </form>
        </div>
        <div className="register-container-right">
          {/* Add any extra content/design here if needed */}
        </div>
      </div>
    </div>
  );
};

export default Eventregister;
