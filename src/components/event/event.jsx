import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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
                <div className="event-detail-description">
                    {eventData.description} {/* Dynamic Description */}
                </div>
                <img className="event-detail-poster" src={`http://localhost:5000/${eventData.eventPoster}`} alt={`${eventData.collegeName} Poster`} /> {/* Dynamic Image */}
                <div className="event-detail-aboutevent">
                    {eventData.detailedInfo} {/* Dynamic About Event */}
                </div>
                <div className="event-detail-typeofevent">
                    {eventData.events && eventData.events.map((eventItem, index) => (
                        <div key={index}>{eventItem.eventName}</div> // Displaying event names (typeOfEvent equivalent)
                    ))}
                </div>
                <div className="event-detail-contact">
                    {eventData.contacts && eventData.contacts.map((contact, index) => (
                        <div key={index}>
                            {contact.contactName}: {contact.contactNumber}
                        </div>
                    ))} {/* Dynamic Contact Details */}
                </div>
                <div className="event-detail-registration">
                    <a href={eventData.gformLink} target="_blank" rel="noopener noreferrer">Registration Link</a> {/* Dynamic GForm Link */}
                </div>
            </div>
        </div>
    );
};

export default Event;
