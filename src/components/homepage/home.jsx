import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import homelogo from '../../../backend/eventease2.png';
import './home.css';
import colleges from '../../../backend/colleges';
import axios from 'axios'; // Import axios for making HTTP requests

const Mainpage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [name, setName] = useState(""); // New input state for name
    const [loading, setLoading] = useState(false);
    const [selectedCollege, setSelectedCollege] = useState('');
    const [message, setMessage] = useState(''); // State for messages

    const eventsclick = () => {
        navigate('/Eventspage');
    };
    const hallclick = () => {
        navigate('/Hallpage');
    };
    const aboutusclick = () => {
        navigate('/aboutUs');
    };
    const contactclick = () => {
        navigate('/Contact us');
    };
    const loginclick = () => {
        navigate('/Login-signup-page');
    };

    // Handle change event when a college is selected
    const handleCollegeChange = (event) => {
        setSelectedCollege(event.target.value);
    };

    // Handle form submission for college selection
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        if (selectedCollege) {
            alert(`You selected: ${selectedCollege}`);
        } else {
            alert('Please select a college.');
        }
    };

    // Handle email subscription
    const handleSubscribe = async (e) => {
        e.preventDefault(); // Prevent default form submission
        setMessage(''); // Clear previous messages

        if (!email || !selectedCollege) {
            alert("Please enter both an email address and select a college");
            return;
        }

        setLoading(true); // Start loading

        try {
            const response = await axios.post('http://localhost:5000/api/subscribe', {
                email,
                college: selectedCollege,
            });

            // Assuming successful response
            alert("Subscription successful!"); // Show success message
            setEmail(''); // Clear email input on success
            setSelectedCollege(''); // Clear college selection
        } catch (error) {
            if (error.response && error.response.status === 400) {
                // If email already exists, alert the user
                alert('This email is already subscribed.'); // Alert for existing email
            } else {
                alert('Failed to subscribe. Please try again.'); // Generic error message
            }
        } finally {
            setLoading(false); // Stop loading after email processing
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSubscribe(event);
        }
    };

    return (
        <div className="main">
            <div className="main-holder">
                <div className="header">
                    <div className="left-section">EventEase</div>
                    <div className="middle-section">
                        <div className="home">Home</div>
                        <div className="events" onClick={eventsclick}>Events</div>
                        <div className='hall' onClick={hallclick}> Hall</div>
                        <div className="about" onClick={aboutusclick}>About Us</div>
                        <div className="contact" onClick={contactclick}>Contact Us</div>
                    </div>
                    <div className="right-section">
                        <div className="login" onClick={loginclick}>Login / Sign Up</div>
                        <span>{new Date().toLocaleDateString()}</span> {/* Current date */}
                    </div>
                </div>

                <div className="page-container">
                    <div className="page-container-left">
                        <p>- Kongu Engineering college</p>
                        <h1>Your one-stop destination for your college events.</h1>
                        <h4>Stay ahead, stay informed, and never miss a moment!</h4>
                    </div>
                    <div className="page-container-right">
                        <img src={homelogo} alt="" />
                    </div>
                </div>

                <div className="home-to-event-clg-name">
                    <form onSubmit={handleSubmit}>
                        <label className="selectcollege">College:</label>
                        <select id="college" value={selectedCollege} onChange={handleCollegeChange}>
                            <option value="">-- Select a College --</option>
                            {colleges.map((college, index) => (
                                <option key={index} value={college}>
                                    {college}
                                </option>
                            ))}
                        </select>
                        <button type="submit">Submit</button>
                    </form>
                </div>

                <div className="footer">
                    <h4>Make informed choices! Review all event details carefully before registering.
                        Registration is completely optional — it's your call!</h4>
                        
                    {/* Subscription Section */}
                    <div className="subscription">
                        <form onSubmit={handleSubscribe}>
                            <label className="selectcollege">College:</label>
                            <select id="subscribe-college" value={selectedCollege} onChange={handleCollegeChange}>
                                <option value="">-- Select a College --</option>
                                {colleges.map((college, index) => (
                                    <option key={index} value={college}>
                                        {college}
                                    </option>
                                ))}
                            </select>
                            <input type="email" placeholder="Enter your email" value={email}
                                onChange={(e) => setEmail(e.target.value)} onKeyPress={handleKeyPress}
                                className="email-input" />
                            <button type="submit" className="subscribe-button" disabled={loading}>
                                {loading ? 'Processing...' : 'Subscribe'} {/* Show loading text */}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Mainpage;
