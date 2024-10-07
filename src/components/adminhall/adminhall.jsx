import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar'; // Import React Calendar
import './Adminhall.css'; // Ensure you have a CSS file for styling

const Adminhall = () => {
    const [activeHall, setActiveHall] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [confirmedDates, setConfirmedDates] = useState({}); // Object to store confirmed dates for each hall
    const [confirmPopupVisible, setConfirmPopupVisible] = useState(false); // State to show confirm popup
    const [unlockPopupVisible, setUnlockPopupVisible] = useState(false); // State to show unlock popup

    const halls = [
        { name: "Hall One", department: "Computer Science" },
        { name: "Hall Two", department: "Electrical Engineering" },
        { name: "Hall Three", department: "Mechanical Engineering" },
        { name: "Hall Four", department: "Civil Engineering" },
        { name: "Hall Five", department: "Business Administration" },
    ];

    const hallDetails = {
        "Hall One": { seating: "200 seats", stageSize: "Medium Stage", projector: "Available" },
        "Hall Two": { seating: "150 seats", stageSize: "Small Stage", projector: "Not Available" },
        "Hall Three": { seating: "300 seats", stageSize: "Large Stage", projector: "Available" },
        // Add details for other halls
    };

    useEffect(() => {
        // Load the locked dates from local storage when the component mounts
        const storedDates = JSON.parse(localStorage.getItem('eventDates'));
        if (storedDates) {
            setConfirmedDates(storedDates);
        }
    }, []);

    const handleRowClick = (hallName) => {
        setActiveHall(activeHall === hallName ? null : hallName);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);

        // Check if the date is already confirmed for the active hall
        if (confirmedDates[activeHall] && confirmedDates[activeHall].some(confirmedDate => confirmedDate.toDateString() === date.toDateString())) {
            setUnlockPopupVisible(true); // Show unlock confirmation popup
        } else {
            setConfirmPopupVisible(true); // Show lock confirmation popup
        }
    };

    const handleConfirmLock = () => {
        if (!confirmedDates[activeHall]) {
            confirmedDates[activeHall] = []; // Initialize the array if it doesn't exist
        }

        // Add the confirmed date
        confirmedDates[activeHall].push(selectedDate);
        setConfirmedDates({ ...confirmedDates }); // Update the state
        localStorage.setItem('eventDates', JSON.stringify(confirmedDates)); // Store updated dates in local storage
        setConfirmPopupVisible(false); // Hide the confirmation popup
    };

    const handleConfirmUnlock = () => {
        if (confirmedDates[activeHall]) {
            // Remove the confirmed date
            confirmedDates[activeHall] = confirmedDates[activeHall].filter(confirmedDate => confirmedDate.toDateString() !== selectedDate.toDateString());
            setConfirmedDates({ ...confirmedDates }); // Update the state
            localStorage.setItem('eventDates', JSON.stringify(confirmedDates)); // Update local storage
        }
        setUnlockPopupVisible(false); // Hide the unlock confirmation popup
    };

    const handleCancel = () => {
        setConfirmPopupVisible(false); // Hide the lock confirmation popup
        setUnlockPopupVisible(false); // Hide the unlock confirmation popup
    };

    return (
        <div className="main-holder">
            <div className="header">
                <div className="left-section">EventEase Admin</div>
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
                                                    <Calendar
                                                        onChange={handleDateChange}
                                                        value={selectedDate}
                                                        tileClassName={({ date, view }) => {
                                                            // Change the background color of confirmed dates for the active hall
                                                            return confirmedDates[hall.name] && confirmedDates[hall.name].some(confirmedDate => confirmedDate.toDateString() === date.toDateString()) ? 'highlight' : '';
                                                        }}
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

            {/* Confirmation Popup for Locking Date */}
            {confirmPopupVisible && (
                <div className="confirmation-popup">
                    <p>Are you sure you want to lock the date {selectedDate.toDateString()} for {activeHall}?</p>
                    <button onClick={handleConfirmLock}>Confirm</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            )}

            {/* Confirmation Popup for Unlocking Date */}
            {unlockPopupVisible && (
                <div className="confirmation-popup">
                    <p>Are you sure you want to unlock the date {selectedDate.toDateString()} for {activeHall}?</p>
                    <button onClick={handleConfirmUnlock}>Confirm</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default Adminhall;
