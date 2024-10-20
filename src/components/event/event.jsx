import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './event.css'
const Event = () => {
    const navigate = useNavigate();
    
    const { id } = useParams(); // Get the event ID from the URL
    const [eventData, setEventData] = useState(null); // State to hold event details
    const homeclick = () => {
        navigate('/Mainpage');
    };
    const loginclick = () => {
        navigate('/')
    }
    const eventsclick = () =>{
        navigate('/Events')
    }
    useEffect(() => {
        // Fetch the event details from the server
        const fetchEventData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/events/${id}`); // Adjust the endpoint as necessary
                if (response.ok) {
                    const data = await response.json();
                    setEventData(data);
                } else {
                    console.error('Error fetching event data:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching event data:', error);
            }
        };

        fetchEventData();
    }, [id]);

    if (!eventData) return <div>Loading...</div>; 

    return (
        <div className="events-main">
            <div className="events-main-holder">
                <div className="header">
                    <div className="left-section">EventEase</div>
                    <div className="middle-section">
                        <div className="event-nav-home" onClick={homeclick}>
                            Home
                        </div>
                        <div className="event-nav-events" onClick={eventsclick}>Events</div>
                        <div className="event-nav-hall">Hall</div>
                        <div className="about">About Us</div>
                        <div className="contact">Contact Us</div>
                    </div>
                    <div className="right-section">
                        <div className="login" onClick={loginclick}>Login / Sign Up</div>
                        <span>{new Date().toLocaleDateString()}</span> {/* Current date */}
                    </div>
                </div>
            </div>
            <div className="event-details-popup">
                Event Quick link container
            </div>
            <div className="event-detail-container">
                <div className="event-detail-name">
                    {eventData.collegeName} 
                </div>

                <div className="event-main-event-name">
                     {eventData.eventName} 
                </div>

                <div className="event-detail-description">
                    {eventData.description} 
                </div>

                <img className="event-detail-poster" src={`http://localhost:5000/${eventData.eventPoster}`} 
                alt={`${eventData.collegeName} Poster`} /> 
                <div className="event-detail-about-event-title">
                    About Event
                </div>
                
                <div className="event-detail-aboutevent">
                    {eventData.detailedInfo} 
                </div>

                <p className='event-detail-typeofevent-title'>Events</p>
                <div className="event-detail-typeofevent">
                    {eventData.events && eventData.events.map((eventItem, index) => (
                        <div key={index}>{eventItem.eventName}</div> 
                    ))}
                </div>
                <p className='event-detail-webinarlink-title'>Webinar Link</p>
                <div className="event-detail-webinar">
                    {eventData.webinarLink && (
                        <div>
                            <a href={eventData.webinarLink} target="_blank" rel="noopener noreferrer">
                                {eventData.webinarLink}</a> 
                        </div>
                    )}
                </div>
                <p className='event-detail-contact-title'>Contact Details</p>
                <div className="event-detail-contact" >
                    {eventData.contacts && eventData.contacts.map((contact, index) => (
                        <div key={index}>
                            {contact.contactName}: {contact.contactNumber}
                        </div>
                    ))} 
                </div>
                <p className="event-detail-registration-link-title">
                    Registration Link
                </p>
                <div className="event-detail-registration-link">
                    <a href={eventData.gformLink} target="_blank" rel="noopener noreferrer">Register Here</a> {/* Dynamic GForm Link */}
                </div>
            </div>
        </div>
    );
};

export default Event;
