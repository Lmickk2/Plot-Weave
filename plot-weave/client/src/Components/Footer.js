import { useState } from 'react';
import { Link } from 'react-router-dom';

function Footer() {

  return (
    <footer>
        <ul className="foot-elements">
            <li>Terms</li>
            <li>Privacy</li>
            <li>Accessibility</li>
            <li>Help</li>
            <li>Contact</li>
            <li>Languages</li>
        </ul>
    </footer>
  );
}

export default Footer;
