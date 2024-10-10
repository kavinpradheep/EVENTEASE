import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar'; // Import React Calendar
import './hall.css';
import { useNavigate } from 'react-router-dom';


const Hall = () => {
    const navigate = useNavigate();
    const homeclick = () =>{
        navigate('/Homepage')
    }
    const eventsclick = () =>{
        navigate('/Eventspage')
    }
    const loginclick = () => {
        navigate('/Login-signup-page')
    }
    const [activeHall, setActiveHall] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(null);
    const [eventDates, setEventDates] = useState([]); // State for storing event dates

    const halls = [
        { name: "Hall One", department: "Computer Science" },
        { name: "Hall Two", department: "Electrical Engineering" },
        { name: "Hall Three", department: "Mechanical Engineering" },
        { name: "Hall Four", department: "Civil Engineering" },
        { name: "Hall Five", department: "Business Administration" },
    ];

    const hallDetails = {
        "Hall One": {
            seating: "200 seats",
            stageSize: "Medium Stage",
            projector: "Available",
        },
        "Hall Two": {
            seating: "150 seats",
            stageSize: "Small Stage",
            projector: "Not Available",
        },
        "Hall Three": {
            seating: "300 seats",
            stageSize: "Large Stage",
            projector: "Available",
        },
        // Add details for other halls
    };

    const handleRowClick = (hallName) => {
        setActiveHall(activeHall === hallName ? null : hallName);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setSelectedTime(null); // Reset time selection when date changes
    };

    const handleTimeChange = (event) => {
        setSelectedTime(event.target.value);
    };

    // Fetch event dates from the API when the component mounts
    useEffect(() => {
        const fetchEventDates = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/lockeddates'); // Fetch from your local server
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const dates = await response.json();
                const formattedDates = dates.map(event => new Date(event.date).toLocaleDateString()); // Convert event dates to a usable format
                setEventDates(formattedDates);
            } catch (error) {
                console.error('Error fetching locked dates:', error);
            }
        };

        fetchEventDates();
    }, []);

    // Function to determine if a date has an event
    const tileClassName = ({ date }) => {
        const dateString = date.toLocaleDateString();
        return eventDates.includes(dateString) ? 'highlight' : null; // Apply highlight class if date has an event
    };

    return (
        <div className="main-holder">
            <div className="header">
                <div className="left-section">EventEase</div>
                <div className="middle-section">
                    <div className="home" onClick={homeclick}>Home</div>
                    <div className="events" onClick={eventsclick}>Events</div>
                    <div className="hall">Hall</div>
                    <div className="about">About Us</div>
                    <div className="contact">Contact Us</div>
                </div>
                <div className="right-section">
                    <div className="login" onClick={loginclick}>Login / Sign Up</div>
                    <span>{new Date().toLocaleDateString()}</span> 
                </div>
            </div>

            <div className="hall-main-container">
                <table className="hall-table">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Hall Name</th>
                            <th>Department</th>
                        </tr>
                    </thead>
                    <tbody>
                        {halls.map((hall, index) => (
                            <React.Fragment key={index}>
                                <tr onClick={() => handleRowClick(hall.name)}>
                                    <td>{index + 1}</td>
                                    <td>{hall.name}</td>
                                    <td>{hall.department}</td>
                                </tr>
                                {activeHall === hall.name && (
                                    <tr className="active-row">
                                        <td colSpan="3">
                                            <div className="details-container">
                                                <div className="details-left-section">
                                                    <p><strong>Seating Capacity:</strong> {hallDetails[hall.name].seating}</p>
                                                    <p><strong>Stage Size:</strong> {hallDetails[hall.name].stageSize}</p>
                                                    <p><strong>Projector Availability:</strong> {hallDetails[hall.name].projector}</p>
                                                </div>
                                                <div className="details-right-section">
                                                    <Calendar 
                                                        onChange={handleDateChange} 
                                                        value={selectedDate} 
                                                        tileClassName={tileClassName} // Apply the tileClassName function
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Hall;
