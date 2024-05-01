import React from "react";
import './Footer.css';
import { FaLocationDot } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";

function Footer(){ 
    return (
        <div>
            <div className="empty-space"></div>
            <footer className="footer-container">
                <p className="CU">Contact Us</p>
                <div className="footer-content">
                    <div className="mail_content">
                    <IoMail className="mail"/>
                        {/* <img src='img/mail.png' alt="mail" className="mail"/> */}
                        <p>pohangavengers@gmail.com</p>
                    </div>
                    <div className="mail_content">
                        {/* <img src='img/location.png' alt="location" className="location"/> */}
                        <FaLocationDot className="location"/>
                        <p>  558, Handong-ro, Heunghae-eup, Buk-gu, Pohang-si, Gyeongsangbuk-do, Republic of Korea</p>
                    </div>
                    <p id="copy">&copy; Pohang Avengers 2024</p>
                </div>
            </footer>
        </div>
    );
}

export default Footer;