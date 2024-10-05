import React from 'react'
import './eventregister.css'
const Eventregister = () => {
  return (
    <div className="main">
        <div className="events-main-holder">
            <div className="header">
                <div className="left-section">
                    EventEase
                </div>
                <div className="middle-section">
                    <div className="event-nav-home" >
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
            
        </div>
        <div className="register-container">
            <div className="register-container-left">
                <h1>Publish Event</h1>
                <div class="rcl-h41">Upload the event details
                    <hr />    
                    corrections cant be done after publish
                </div>
                <p>college Name</p>
                <input type="text" class='register-eventname' placeholder='College Name' />
                <p>Event Name</p>
                <input type="text" class='register-eventname' placeholder='Event Name' />
                <p>Event Date</p>
                <input type="Date" class='register-eventname' />
                <p>Gform details</p>
                <input type="link" class='register-eventname' placeholder='Enter G-form Link' />
                <div className="register-event-gformdetails">
                    <p>Registration open</p>
                    <input type="date" class='register-gformdetails-date'
                         placeholder='Event Name' />
                    <p>Registration close</p>
                    <input type="date" class='register-gformdetails-date'
                         placeholder='Event Name' />
                </div>
                
            </div>
        <div className="register-container-right">

        </div>
    </div>
</div>
  )
}

export default Eventregister