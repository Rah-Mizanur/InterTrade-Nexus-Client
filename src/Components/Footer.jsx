import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <div>
      <footer className="bg-accent my-8" >
        <div className="footer sm:footer-horizontal  text-base-content p-10 items-center justify-items-center">

        <nav>
          <h6 className="footer-title">Quick links</h6>
          <Link to='/about-us' className="link link-hover">About us</Link>
          <Link to='/contact' className="link link-hover">Contact</Link>
        
          <Link to='/privacy-policy' className="link link-hover">Privacy Policy</Link>
        </nav>
        <nav>
          <h6 className="footer-title">Social</h6>
          <div className="grid grid-flow-col gap-4">
            <a target="blank" href="https://www.facebook.com/mizanur.rahman.481998" className="text-2xl">
              <FaFacebook></FaFacebook>
            </a>
            <a target="blank" href="https://www.instagram.com/mizan_90786/" className="text-2xl">
              <FaInstagram></FaInstagram>
            </a>
            <a target="blank" className="text-2xl">
              <FaLinkedin></FaLinkedin>
            </a>
          </div>
        </nav>
        </div>
        <div className="footer sm:footer-horizontal footer-center text-base-content p-4">
          <aside>
            <p>
              Copyright © {new Date().getFullYear()} - All right reserved by
            InterTrade Nexus
            </p>
          </aside>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
