import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

const Mainpage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false); // Loading state

    const handleEventClick = () => {
        navigate('/Events');
    };

    const handleSubscribe = async () => {
        if (!email) {
            alert("Please enter an email address");
            return;
        }

        setLoading(true); // Start loading

        try {
            const response = await fetch('http://localhost:5000/api/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message);
            } else {
                alert(data.error || "Failed to subscribe");
            }
        } catch (error) {
            console.error(error);
            alert("Server error, please try again later.");
        } finally {
            setLoading(false); // Stop loading after email processing
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSubscribe();
        }
    };

    return (
        <div className="main">
            <div className="main-holder">
                <div className="header">
                    <div className="left-section">EventEase</div>
                    <div className="middle-section">
                        <div className="home">Home</div>
                        <div className="events" onClick={handleEventClick}>Events</div>
                        <div className="hall">Hall</div>
                        <div className="about">About Us</div>
                        <div className="contact">Contact Us</div>
                    </div>
                    <div className="right-section">date</div>
                </div>

                <div className="page-container">
                    <div className="page-container-left">
                        <p>- Kongu Engineering College</p>
                        <h1>Your one-stop destination for your college events.</h1>
                        <h4>Stay ahead, stay informed, and never miss a moment!</h4>
                    </div>
                    <div className="page-container-right"></div>
                </div>

                {/* Footer with subscription */}
                <div className="footer">
                    <h4>
                        Make informed choices! Review all event details carefully before registering.
                        Registration is completely optional — it's your call!
                    </h4>
                </div>

                <div className="subscription">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="email-input"
                    />
                    <button onClick={handleSubscribe} className="subscribe-button" disabled={loading}>
                        {loading ? 'Processing...' : 'Subscribe'} {/* Show loading text */}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Mainpage;
