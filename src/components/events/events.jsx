import React from 'react'
import './events.css'
import poster from '../../../assests/poster.jpg'
const Events = () => {
  return (
<div className="main">
        <div className="events-main-holder">
            <div className="header">
                <div className="left-section">
                    EventEase
                </div>
                <div className="middle-section">
                    <div className="event-nav-home">
                        Home
                    </div>
                    <div className="event-nav-events" >
                        Events
                    </div>
                    <div className="about">
                        About Us
                    </div>
                    <div className="contact">
                        Contact Us
                    </div>
                </div>
                <div className="right-section">
                    date
                </div>
            </div>
            <div className="event-container">
                <div className="event-container-event">
                    <img src={poster} alt="event poster" />
                    <p>college Name</p>
                    <h3>Event Name</h3>
                    <h3>Event date:DD/MM/YYYY</h3>
                    <h4>Registration</h4>

                    <div className="event-register-date">
                        <p>opens: DD/MM/YYYY</p>
                        <p>End: DD/MM/YYYY</p>
                    </div>
                </div>
                <div className="event-container-event">
                    <img src={poster} alt="event poster" />
                    <p>college Name</p>
                    <h3>Event Name</h3>
                    <h3>Event date:DD/MM/YYYY</h3>
                    <h4>Registration</h4>

                    <div className="event-register-date">
                        <p>opens: DD/MM/YYYY</p>
                        <p>End: DD/MM/YYYY</p>
                    </div>
                </div>
                <div className="event-container-event">
                    <img src={poster} alt="event poster" />
                    <p>college Name</p>
                    <h3>Event Name</h3>
                    <h3>Event date:DD/MM/YYYY</h3>
                    <h4>Registration</h4>

                    <div className="event-register-date">
                        <p>opens: DD/MM/YYYY</p>
                        <p>End: DD/MM/YYYY</p>
                    </div>
                </div>
                <div className="event-container-event">
                    <img src={poster} alt="event poster" />
                    <p>college Name</p>
                    <h3>Event Name</h3>
                    <h3>Event date:DD/MM/YYYY</h3>
                    <h4>Registration</h4>

                    <div className="event-register-date">
                        <p>opens: DD/MM/YYYY</p>
                        <p>End: DD/MM/YYYY</p>
                    </div>
                </div>
                <div className="event-container-event">
                    <img src={poster} alt="event poster" />
                    <p>college Name</p>
                    <h3>Event Name</h3>
                    <h3>Event date:DD/MM/YYYY</h3>
                    <h4>Registration</h4>

                    <div className="event-register-date">
                        <p>opens: DD/MM/YYYY</p>
                        <p>End: DD/MM/YYYY</p>
                    </div>
                </div>
                <div className="event-container-event">
                    <img src={poster} alt="event poster" />
                    <p>college Name</p>
                    <h3>Event Name</h3>
                    <h3>Event date:DD/MM/YYYY</h3>
                    <h4>Registration</h4>

                    <div className="event-register-date">
                        <p>opens: DD/MM/YYYY</p>
                        <p>End: DD/MM/YYYY</p>
                    </div>
                </div>
                
            </div>
        </div>
</div>

  )
}

export default Events