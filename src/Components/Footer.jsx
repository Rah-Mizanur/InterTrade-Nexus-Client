import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-base-100 border-t border-base-200 mt-16">
      <div className="w-11/12 mx-auto py-12 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Brand */}
        <div>
          <Link to="/" className="text-2xl font-bold text-accent">
            Inter<span className="text-base-content">Trade</span>
          </Link>
          <p className="mt-4 text-sm text-base-content/70 leading-relaxed">
            InterTrade Nexus connects global importers and exporters through
            reliable, on-demand trade solutions built for modern businesses.
          </p>
        </div>

        {/* Quick Links */}
        <nav>
          <h6 className="text-base font-semibold mb-4">Quick Links</h6>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-accent transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-accent transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-accent transition-colors">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </nav>

        {/* Social */}
        <nav>
          <h6 className="text-base font-semibold mb-4">Follow Us</h6>
          <div className="flex gap-4">
            <a
              href="https://www.facebook.com/mizanur.rahman.481998"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-accent transition-colors"
            >
              <FaFacebook />
            </a>

            <a
              href="https://www.instagram.com/mizan_90786/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-accent transition-colors"
            >
              <FaInstagram />
            </a>

            <a
              href="https://x.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-accent transition-colors"
            >
              <FaX />
            </a>
          </div>
        </nav>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-base-200 py-4">
        <p className="text-center text-sm text-base-content/70">
          © {new Date().getFullYear()} InterTrade Nexus. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
