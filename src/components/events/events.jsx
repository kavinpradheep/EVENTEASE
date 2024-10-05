import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './events.css';
import eventpopup from '../../../assests/event_register_popup.jpg';
import poster from '../../../assests/poster.jpg';

const Events = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]); // State to hold events data

    const homeclick = () => {
        navigate('/Mainpage');
    };

    const eventregisterclick = () => {
        navigate('/EventRegister');
    };

    // Fetch events data from the backend
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/events');
                const data = await response.json();
                setEvents(data); // Update the state with fetched events
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents(); // Call the fetch function
    }, []); // Empty dependency array means it runs once when the component mounts

    return (
        <div className="main">
            <div className="events-main-holder">
                <div className="header">
                    <div className="left-section">
                        EventEase
                    </div>
                    <div className="middle-section">
                        <div className="event-nav-home" onClick={homeclick}>
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
                <div className="eventregister-popup">
                    <div className="eventregister-popup-container">
                        <img src={eventpopup} alt="" />
                        <h3>Showcase your Event</h3>
                        <button onClick={eventregisterclick}>
                            PUBLISH
                        </button>
                    </div>
                </div>
                <div className="event-container">
                    {events.map((event) => (
                        <div className="event-container-event" key={event._id}>
                            <img src={poster} alt="event poster" />
                            <p>{event.collegeName}</p>
                            <h3>{event.eventName}</h3>
                            <h3>Event date: {new Date(event.eventDate).toLocaleDateString()}</h3>
                            <h4>Registration</h4>

                            <div className="event-register-date">
                                <p>opens: {new Date(event.registrationOpen).toLocaleDateString()}</p>
                                <p>End: {new Date(event.registrationClose).toLocaleDateString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Events;
