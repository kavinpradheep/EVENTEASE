import React from 'react';
import './About.css';  

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <div className="about-text">
          <h1 className="about-title">About Us</h1>
          <p>
            Welcome to <strong>EventEase</strong>, your one-stop destination for discovering the latest events happening across colleges! 
            Whether you’re looking for seminars, hackathons, cultural fests, workshops, or conferences, EventEase brings them all to your fingertips in a seamless and user-friendly platform.
          </p>
          <p>
            At EventEase, we’re constantly updating our event listings to keep you informed about the latest happenings. 
            By providing a smooth and intuitive interface, we ensure that you can quickly find the events that match your interests, register with ease, and stay connected with the vibrant world of college events.
          </p>
          <h2>Our Mission</h2>
          <p>
            Our mission is to simplify the process of finding and participating in college events. 
            We believe that events are a gateway to learning, networking, and growth, and we want to ensure that students and professionals alike never miss out on the opportunities that matter to them.
          </p>
          <h2>Our Vision</h2>
          <p>
            Our vision is to build a community where students and event organizers connect effortlessly, creating a vibrant ecosystem of knowledge-sharing, entertainment, and networking opportunities. 
            Join us on this journey and make the most of your event experiences with EventEase!
          </p>
        </div>
        <div className="about-image">
          <img src="https://img.freepik.com/premium-photo/flat-vector-style-illustration-diverse-group-people-white-background_941097-145169.jpg?w=740" alt="EventEase platform" />
        </div>
      </div>
    </div>
  );
};

export default About;
