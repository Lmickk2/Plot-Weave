import React, { useEffect } from 'react';
import weave from "../images/demo.png";
import book from "../images/book.png";
import PostList from "../Components/PostList";
import { Link } from "react-router-dom";
import RandomProfiles from "../Components/TrendingProfiles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faPen, faWater } from "@fortawesome/free-solid-svg-icons";
import Footer from "../Components/Footer";
import phone from "../images/phone.png"

function Home() {
  useEffect(() => {
    const oneDiv = document.querySelector('.one-div');
    oneDiv.classList.add('animate');
  }, []);
  return (
    <>
      <div className="hero">
      <div className="circle appear"></div>
        <div className="intro">
          <h1><span className="morph">Crea</span>te The Ending <span className="morph">You H</span>oped For.</h1>
          <p>
            Branch off of any story, at any line. Create the storyline that you
            want within someone else's universe.
          </p>
            <button className="start"><Link to="/community">Start Reading</Link></button>
        </div>
        <div className="demo">
        <div className="one-div appear"></div>
        <img src={phone} className="phone-demo"></img>
        </div>
      </div>
      <div className="section-2">
        <h1>How to use Plot Weave</h1>
        <p className="how-p">Learn about how to best utilize Plot Weave to get your work discovered by thousands of daily users!</p>
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
                Found an amazing story but don't quite like the ending? Choose any sentence to break off of, and
                create your own story from there.
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
      <Footer/>
    </>
  );
}

export default Home;
