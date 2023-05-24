import { useState } from 'react';
import { Link } from 'react-router-dom';

function Footer() {

  return (
    <footer>
        <ul className="foot-elements">
            <Link to="/terms"><li>Terms</li></Link>
            <Link to="/"><li>Privacy</li></Link>
            <Link to="/"><li>Accessibility</li></Link>
            <Link to="/"><li>Help</li></Link>
            <Link to="/"><li>Contact</li></Link>
            <Link to="/"><li>Languages</li></Link>
        </ul>
    </footer>
  );
}

export default Footer;
