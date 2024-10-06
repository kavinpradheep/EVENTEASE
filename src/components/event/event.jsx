import React from 'react'
import { useNavigate } from 'react-router-dom'
const Event = () => {
    const navigate = useNavigate();
    const homeclick = () =>{
        navigate('/Mainpage')
    }
  return (
      <div className="events-main">
            <div className="events-main-holder">
                <div className="header">
                    <div className="left-section">
                        EventEase
                    </div>
                    <div className="middle-section">
                        <div className="event-nav-home" onClick={homeclick}>
                            Home
                        </div>
                        <div className="event-nav-events">
                            Events
                        </div>
                        <div className="about">
                            About Us
                        </div>
                        <div className="contact">
                            Contact Us
                        </div>
                    </div>
                </div>
            </div>
            <div className="event-detail-container">
                <div className="event-detail-name">
                    Event name
                </div>
                <div className="event-detail-description">
                    
                </div>
            </div>
        </div>
  )
}

export default Event
