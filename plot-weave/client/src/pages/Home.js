import React, { useEffect, useState } from "react";
import weave from "../images/demo.png";
import book from "../images/book.png";
import PostList from "../Components/PostList";
import { Link } from "react-router-dom";
import RandomProfiles from "../Components/TrendingProfiles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faPen, faWater } from "@fortawesome/free-solid-svg-icons";
import Footer from "../Components/Footer";
import phone from "../images/phone.png";

function Home() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const isFirstVisit = localStorage.getItem("isFirstVisit");

    if (!isFirstVisit) {
      setShowModal(true);
      localStorage.setItem("isFirstVisit", "true");
    }
  }, []);

  window.addEventListener('load', function() {
    const phoneDemo = document.querySelector('.phone-demo');
    phoneDemo.classList.add('loaded');
  });

  return (
    <>
      <div className="hero">
        <div className="circle appear"></div>
        <div className="intro">
          <h1>
            <span className="morph">Crea</span>te The Ending{" "}
            <span className="morph">You H</span>oped For.
          </h1>
          <p>
            Branch off of any story, at any line. Create the storyline that you
            want within someone else's universe.
          </p>
          <button className="start">
            <Link to="/community">Start Reading</Link>
          </button>
        </div>
        <div className="demo">
          <div className="one-div appear"></div>
          <img src={phone} className="phone-demo"></img>
        </div>
      </div>
      <div className="section-2">
        <h1>How to use Plot Weave</h1>
        <p className="how-p">
          Learn about how to best utilize Plot Weave to get your work discovered
          by thousands of daily users!
        </p>
        <div className="how-to">
          <div className="how-section">
            <div className="card-side">
              <FontAwesomeIcon icon={faBook} className="intro-icon" />
              <div className="tut-card">
                <h3>Read</h3>
                <p>
                  Browse stories from creators around the world. From Sci-Fi to
                  Romance, find your favorite genre and immerse yourself in the
                  writing.
                </p>
              </div>
            </div>
          </div>
          <div className="how-section">
            <div className="card-side">
              <FontAwesomeIcon icon={faPen} className="intro-icon" />
              <div className="tut-card">
                <h3>Write</h3>
                <p>
                  Share your unique stories to large audiences across the
                  platform. Allow users to weave your stories to create a larger
                  story universe!
                </p>
              </div>
            </div>
          </div>
          <div className="how-section">
            <div className="card-side">
              <FontAwesomeIcon icon={faWater} className="intro-icon" />
              <div className="tut-card">
                <h3>Weave</h3>
                <p>
                  Found an amazing story but don't quite like the ending? Choose
                  any sentence to break off of, and create your own story from
                  there.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section-3">
        <h1>Explore Trending Creators</h1>
        <RandomProfiles />
      </div>
      <Footer />
      {showModal && (
        <div className="modal-container">
          <div className="modal-background"></div>
          <div className="modal-content">
            <h2>Welcome to Plot Weave</h2>
            <p>
              Welcome to our platform! We're excited to have you here, but
              before we begin, we want to let you know that we are currently in
              a very early beta stage. As a result, there are certain
              functionalities that may be missing or not working as expected.
              We're constantly working hard to improve and enhance the platform,
              with new features being implemented daily.
              <br />
              <br />
              During this beta stage, we appreciate your understanding and
              patience as we work through any issues that may arise. Your
              feedback is incredibly valuable to us, and we encourage you to
              share any suggestions, concerns, or bug reports you may have. Your
              input will play a crucial role in shaping the future development
              of our platform.
              <br />
              <br />
              Please note that some features may be limited or undergoing
              testing, and there may be occasional hiccups or interruptions in
              service. We apologize in advance for any inconvenience caused and
              assure you that we are diligently working to address these issues
              as quickly as possible.
            </p>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
