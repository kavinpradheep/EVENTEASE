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
    publisherName: '',
    publisherContact: '',
    staffInCharge: '',
    staffContact: '',
    otpEventName: '',
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

    // Append all required fields including the new ones
    formData.append('collegeName', eventData.collegeName);
    formData.append('eventDate', eventData.eventDate);
    formData.append('gformLink', eventData.gformLink);
    formData.append('registrationOpen', eventData.registrationOpen);
    formData.append('registrationClose', eventData.registrationClose);
    formData.append('publisherName', eventData.publisherName);
    formData.append('publisherContact', eventData.publisherContact);
    formData.append('staffInCharge', eventData.staffInCharge);
    formData.append('staffContact', eventData.staffContact);
    formData.append('otpEventName', eventData.otpEventName);

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
      {/* Register container open */}
      <div className="register-container">
        <div className="register-container-left">
          <h1>Publish Event</h1>
          <div className="rcl-h41">
            <p>Upload the event details</p>
            <hr />
            <p>Corrections can't be made after publishing</p>
          </div>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            {/* Existing form fields for left side */}
            <p>College Name</p>
            <input type="text" name="collegeName" value={eventData.collegeName} onChange={handleChange}
              className="register-eventname" placeholder="College Name" required />

            <p>Event Date</p>
            <input type="date" name="eventDate" value={eventData.eventDate}
              onChange={handleChange} className="register-eventname" required />

            <p>Gform details</p>
            <input type="url" name="gformLink" value={eventData.gformLink} onChange={handleChange}
              className="register-eventname" placeholder="Enter G-form Link" required />

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
       {/* right-container*/}
        <div className="register-container-right">
          <h1>Event details</h1>
          <form>
          <p> Event Name</p>
            <input
              type="text"
              name="EventName"
              value={eventData.EventName}
              onChange={handleChange}
              placeholder="Event Name"
              className='register-details'
              required
            />

            <p>Publisher Name</p>
            <input
              type="text"
              name="publisherName"
              value={eventData.publisherName}
              onChange={handleChange}
              placeholder="Publisher Name"
              className='register-details'
              required
            />

            <p>Publisher Contact Info</p>
            <input
              type="tel"
              name="publisherContact"
              value={eventData.publisherContact}
              onChange={handleChange}
              placeholder="Publisher Contact"
              className='register-details'
              required
            />

            <p>Staff In Charge Name</p>
            <input
              type="text"
              name="staffInCharge"
              value={eventData.staffInCharge}
              onChange={handleChange}
              placeholder="Staff In Charge"
              className='register-details'
              required
            />

            <p>Staff In Charge Contact Info</p>
            <input
              type="tel"
              name="staffContact"
              value={eventData.staffContact}
              onChange={handleChange}
              placeholder="Staff Contact"
              className='register-details'
              required
            />

            <p className='OTP'>Email OTP</p>
            <input
              type="text"
              name="otpEventName"
              value={eventData.otpEventName}
              onChange={handleChange}
              placeholder="OTP "
              className='register-details'
              required
            />

           <p className='OTP'>Mobile OTP</p>
            <input
              type="text"
              name="otpEventName"
              value={eventData.otpEventName}
              onChange={handleChange}
              placeholder="OTP "
              className='register-details'
              required
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Eventregister;
