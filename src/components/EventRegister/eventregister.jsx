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

  const [eventPoster, setEventPoster] = useState(null); // State for handling image file

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setEventPoster(e.target.files[0]); // Set the selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData(); // Create FormData object
  
    // Append all form fields to FormData
    formData.append('collegeName', eventData.collegeName);
    formData.append('eventName', eventData.eventName);
    formData.append('eventDate', eventData.eventDate);
    formData.append('gformLink', eventData.gformLink);
    formData.append('registrationOpen', eventData.registrationOpen);
    formData.append('registrationClose', eventData.registrationClose);
    
    // Append the selected file to FormData
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput.files.length > 0) {
      formData.append('eventPoster', fileInput.files[0]); // Add the file
    } else {
      alert("Please upload an event poster.");
      return; // Early exit if no file is uploaded
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/registerEvent', {
        method: 'POST',
        body: formData, // Send the FormData
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
      <div className="header">
        <div className="left-section">EventEase</div>
        <div className="middle-section">
          <div className="event-nav-home">Home</div>
          <div className="event-nav-events">Events</div>
          <div className="about">About Us</div>
          <div className="contact">Contact Us</div>
        </div>
        <div className="right-section">date</div>
      </div>
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
            {/* Image input added here, after Event Name */}
            <p>Event Poster</p>
            <input
              type="file"
              name="eventPoster"
              accept="image/*"
              onChange={handleImageChange}
              className="register-eventname"
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
