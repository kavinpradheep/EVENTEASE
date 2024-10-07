import React, { useState } from 'react';
import Calendar from 'react-calendar'; // Import React Calendar
import './hall.css';

const Hall = () => {
    const [activeHall, setActiveHall] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(null);

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

    return (
        <div className="main-holder">
            <div className="header">
                <div className="left-section">EventEase</div>
                <div className="middle-section">
                    <div className="home">Home</div>
                    <div className="events">Events</div>
                    <div className="hall">Hall</div>
                    <div className="about">About Us</div>
                    <div className="contact">Contact Us</div>
                </div>
                <div className="right-section">date</div>
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
                                                    <Calendar/>
                                                    
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
