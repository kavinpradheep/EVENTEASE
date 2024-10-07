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

    if (!eventData) return <div>Loading...</div>; // Loading state

    return (
        <div className="events-main">
            <div className="event-detail-container">
                <div className="event-detail-name">
                    {eventData.collegeName} {/* Dynamic College Name */}
                </div>

                <div className="event-main-event-name">
                     {eventData.eventName} {/* Dynamic Main Event Name */}
                </div>

                <div className="event-detail-description">
                    {eventData.description} {/* Dynamic Description */}
                </div>

                <img className="event-detail-poster" src={`http://localhost:5000/${eventData.eventPoster}`} 
                alt={`${eventData.collegeName} Poster`} /> {/* Dynamic Image */}
                <div className="event-detail-about-event-title">
                    About Event
                </div>

                <div className="event-detail-aboutevent">
                    {eventData.detailedInfo} {/* Dynamic About Event */}
                </div>
                <p className='event-detail-typeofevent-title'>Events</p>
                <div className="event-detail-typeofevent">
                    {eventData.events && eventData.events.map((eventItem, index) => (
                        <div key={index}>{eventItem.eventName}</div> // Displaying sub-event names (typeOfEvent equivalent)
                    ))}
                </div>
                <p className='event-detail-webinarlink-title'>Webinar Link</p>
                <div className="event-detail-webinar">
                    {eventData.webinarLink && (
                        <div>
                            <a href={eventData.webinarLink} target="_blank" rel="noopener noreferrer">{eventData.webinarLink}</a> {/* Dynamic Webinar Link */}
                        </div>
                    )}
                </div>

                <div className="event-detail-contact">
                    <strong>Contact Details:</strong>
                    {eventData.contacts && eventData.contacts.map((contact, index) => (
                        <div key={index}>
                            {contact.contactName}: {contact.contactNumber}
                        </div>
                    ))} {/* Dynamic Contact Details */}
                </div>

                <div className="event-detail-registration">
                    <strong>Registration Link:</strong> 
                    <a href={eventData.gformLink} target="_blank" rel="noopener noreferrer">Register Here</a> {/* Dynamic GForm Link */}
                </div>
            </div>
        </div>
    );
};

export default Event;
