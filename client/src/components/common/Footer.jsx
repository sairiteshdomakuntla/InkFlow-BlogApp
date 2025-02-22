import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-sm-3">
            <div>
              <h6 className="footer-heading">
                Information
              </h6>
              <ul className="list-unstyled footer-link mt-4">
                <li><a href="#">Pages</a></li>
                <li><a href="#">Our Team</a></li>
                <li><a href="#">Features</a></li>
                <li><a href="#">Pricing</a></li>
              </ul>
            </div>
          </div>

          <div className="col-sm-3">
            <div>
              <h6 className="footer-heading">
                Resources
              </h6>
              <ul className="list-unstyled footer-link mt-4">
                <li><a href="#">Wikipedia</a></li>
                <li><a href="#">React blog</a></li>
                <li><a href="#">Terms & Service</a></li>
                <li><a href="#">Angular dev</a></li>
              </ul>
            </div>
          </div>

          <div className="col-sm-3">
            <div>
              <h6 className="footer-heading">
                Help & Support
              </h6>
              <ul className="list-unstyled footer-link mt-4">
                <li><a href="#">Support</a></li>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="col-sm-3">
            <div>
              <h6 className="footer-heading">
                Connect with Us
              </h6>
              <ul className="list-unstyled footer-link mt-4">
                <li><a href="#">Facebook</a></li>
                <li><a href="#">Twitter</a></li>
                <li><a href="#">Instagram</a></li>
                <li><a href="#">LinkedIn</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;