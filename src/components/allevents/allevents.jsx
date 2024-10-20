import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './allevents.css';
import eventpopup from '../../../assests/event_register_popup.jpg';

const Events = () => {
    const navigate = useNavigate();

    const homeclick = () => {
        navigate('/');
    };

    const loginclick = () => {
        navigate('/Login-signup-page');
    };

    const eventregisterclick = () => {
        navigate('/EventRegisterpage');
    };
    const hallclick = () => {
        navigate('/Hallpage')
    }
    // Update view more click to navigate with event ID
    const viewmoreclick = (eventId) => {
        navigate(`/event/${eventId}`); // Adjust the route to include the event ID
    };

    const [events, setEvents] = useState([]); // State to hold events data

    // Fetch events data from the backend
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/events');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setEvents(data); 
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents(); 
    }, []); 

    return (
        <div className="events-main">
            <div className="events-main-holder">
                <div className="header">
                    <div className="left-section">EventEase</div>
                    <div className="middle-section">
                        <div className="event-nav-home" onClick={homeclick}>
                            Home
                        </div>
                        <div className="event-nav-events">Events</div>
                        <div className="hall" onClick={hallclick}>Hall</div>
                        <div className="about">About Us</div>
                        <div className="contact">Contact Us</div>
                    </div>
                    <div className="right-section">
                        <div className="login" onClick={loginclick}>Login / Sign Up</div>
                        <span>{new Date().toLocaleDateString()}</span> {/* Current date */}
                    </div>
                </div>
                <div className="eventregister-popup">
                    <div className="eventregister-popup-container">
                        <img src={eventpopup} alt="Event Registration Popup" />
                        <h3>Showcase your Event</h3>
                        <button onClick={eventregisterclick}>
                            PUBLISH
                        </button>
                    </div>
                </div>
                <div className="event-container">
                    {events.length === 0 ? (
                        <p>No events available.</p> 
                    ) : (
                        events.map((event) => (
                            <div className="event-container-event" key={event._id}>
                                <img 
                                    src={`http://localhost:5000/${event.eventPoster}`} 
                                    alt={`${event.eventName} Poster`} 
                                />
                                <p>{event.collegeName}</p>
                                <h3>{event.eventName}</h3>
                                <h3>Event date: {new Date(event.eventDate).toLocaleDateString()}</h3>
                                <h4>Registration</h4>
                                <div className="event-register-date">
                                    <p>Opens: {new Date(event.registrationOpen).toLocaleDateString()}</p>
                                    <p>Ends: {new Date(event.registrationClose).toLocaleDateString()}</p>
                                </div>
                                <div 
                                    className="view-more" 
                                    onClick={() => viewmoreclick(event._id)} 
                                    style={{ cursor: 'pointer', color: 'blue' }} // Optional styling
                                >
                                    View More
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Events;
