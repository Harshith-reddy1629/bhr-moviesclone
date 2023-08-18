import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'

const Contacts = () => (
  <div className="contacts-container">
    <div className="contact-icons-container">
      <FaGoogle />

      <FaTwitter />

      <FaInstagram />

      <FaYoutube />
    </div>

    <p className="contact-text"> Contact us </p>
  </div>
)

export default Contacts
