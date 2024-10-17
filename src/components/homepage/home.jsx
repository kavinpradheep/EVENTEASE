import React from 'react'
import { useNavigate } from 'react-router-dom'
import './home.css'
import Contact from '../Contact us/contact';
const Mainpage = () => {
    const navigate = useNavigate();
    const eventsclick = () =>{
        navigate('/Eventspage')
    }
    const hallclick = () =>{
        navigate('/Hallpage')
    }
    const aboutusclick = () =>{
        navigate('/aboutUs')
    }
    const contactclick = () =>{
        navigate('/Contact us')
    }

  return (
    <div className="main">
        <div className="main-holder">
            <div className="header">
                <div className="left-section">
                    EventEase
                </div>
                <div className="middle-section">
                    <div className="home">
                        Home
                    </div>
                    <div className="events" onClick={eventsclick}>
                        Events
                    </div>
                    <div className='hall' onClick={hallclick}> Hall</div>
                    <div className="about">
                        About Us
                    </div>
                    <div className="contact" onClick={contactclick}>
                        Contact Us
                    </div>
                </div>
                <div className="right-section">
                    date
                </div>
            </div>
            
            <div className="page-container">
                <div className="page-container-left">
                    <p>- Kongu Engineeering college</p>
                    <h1>Your one-stop destination for 
                        your college events.</h1>
                    <h4>Stay ahead, stay informed, 
                        and never miss a moment!"</h4>
                </div>
                <div className="page-container-right">

                </div>
            </div>
            <div className="fotter">
                <h4>Make informed choices! Review all event 
                    details carefully before registering. 
                    Registration is completely optional
                    —it's your call!</h4>
            </div>
        </div>
    </div>
  )
}

export default Mainpage