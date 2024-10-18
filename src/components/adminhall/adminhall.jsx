import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import './Adminhall.css';

const Adminhall = () => {
    const [activeHall, setActiveHall] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [lockedDates, setLockedDates] = useState({}); // Store locked dates for each hall
    const [confirmPopupVisible, setConfirmPopupVisible] = useState(false);
    const [unlockPopupVisible, setUnlockPopupVisible] = useState(false);

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
        "Hall Four": { seating: "250 seats", stageSize: "Medium Stage", projector: "Available" },
        "Hall Five": { seating: "100 seats", stageSize: "Small Stage", projector: "Not Available" },
    };

    useEffect(() => {
        // Load locked dates from the API when the component mounts
        const fetchLockedDates = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/lockeddates'); // Adjust the endpoint as necessary
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                const datesByHall = {};
                
                data.forEach(item => {
                    const { hallName, date } = item;
                    if (!datesByHall[hallName]) {
                        datesByHall[hallName] = [];
                    }
                    datesByHall[hallName].push(new Date(date));
                });
                
                setLockedDates(datesByHall);
            } catch (error) {
                console.error('Error fetching locked dates:', error);
            }
        };

        fetchLockedDates();
    }, []);

    const handleRowClick = (hallName) => {
        setActiveHall(activeHall === hallName ? null : hallName);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);

        // Check if the date is already locked for the active hall
        if (lockedDates[activeHall] && lockedDates[activeHall].some(lockedDate => new Date(lockedDate).toDateString() === date.toDateString())) {
            setUnlockPopupVisible(true);
        } else {
            setConfirmPopupVisible(true);
        }
    };

    const handleConfirmLock = async () => {
        try {
            // Lock the date on the backend
            const response = await fetch('http://localhost:5000/api/lockeddates', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    hallName: activeHall,
                    date: selectedDate.toISOString(), // Store date in ISO format
                }),
            });

            if (!response.ok) throw new Error('Failed to lock the date');

            // Update local state with the newly locked date
            const updatedLockedDates = { ...lockedDates };
            if (!updatedLockedDates[activeHall]) {
                updatedLockedDates[activeHall] = [];
            }

            updatedLockedDates[activeHall].push(selectedDate);
            setLockedDates(updatedLockedDates);
            setConfirmPopupVisible(false);
        } catch (error) {
            console.error('Error locking date:', error);
        }
    };

    const handleConfirmUnlock = async () => {
        try {
            // Unlock the date on the backend
            const response = await fetch('http://localhost:5000/api/unlockEventDate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    hallName: activeHall,
                    date: selectedDate.toISOString(), // Store date in ISO format
                }),
            });

            if (!response.ok) throw new Error('Failed to unlock the date');

            // Update local state to remove the unlocked date
            const updatedLockedDates = { ...lockedDates };
            if (updatedLockedDates[activeHall]) {
                updatedLockedDates[activeHall] = updatedLockedDates[activeHall].filter(lockedDate => new Date(lockedDate).toDateString() !== selectedDate.toDateString());
                setLockedDates(updatedLockedDates);
            }
            setUnlockPopupVisible(false);
        } catch (error) {
            console.error('Error unlocking date:', error);
        }
    };

    const handleCancel = () => {
        setConfirmPopupVisible(false);
        setUnlockPopupVisible(false);
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
                                                        tileClassName={({ date }) => {
                                                            return lockedDates[hall.name] && lockedDates[hall.name].some(lockedDate => new Date(lockedDate).toDateString() === date.toDateString()) ? 'highlight' : '';
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

            {confirmPopupVisible && (
                <div className="confirmation-popup">
                    <p>Are you sure you want to lock the date {selectedDate.toDateString()} for {activeHall}?</p>
                    <button onClick={handleConfirmLock}>Confirm</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            )}

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
