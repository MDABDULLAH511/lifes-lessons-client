import React from "react";
import { Link } from "react-router";
import Container from "./Container";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import Logo from "./Logo";
import { SiMinutemailer } from "react-icons/si";
import { FaPhoneAlt } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";

const Footer = () => {
  return (
    <div className="pt-20 bg-gray-100 text-secondary">
      <Container>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12">
          {/* footer logo */}
          <div className="space-y-5 mr-10">
            <Logo />
            <p>
              Empowering growth through shared wisdom and meaningful life
              reflections for deeper clarity and transformation.
            </p>

            <ul className="flex gap-3 text-[#0b0b0b]">
              <li className="icon bg-linear-to-r from-[#0575B3] to-[#2489BE]">
                <FaLinkedinIn size={18} color="#ffffff" />
              </li>
              <li className="icon bg-base-200">
                <FaXTwitter size={18} color="#ffffff" />
              </li>
              <li className="icon bg-linear-to-r from-[#00B2FF] to-[#006AFF] ">
                <FaFacebookF size={18} color="#ffffff" />
              </li>
              <li className="icon bg-[#FF0000]">
                <FaYoutube size={18} color="#ffffff" />
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-5 flex flex-col items-start">
            <h2 className="text-[18px] font-bold border-b-3 border-primary">
              Quick Links
            </h2>
            <ul className="flex flex-col gap-3">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/dashboard/add-lesson">Add Lesson</Link>
              </li>
              <li>
                <Link to="/dashboard/my-lessons">My Lessons</Link>
              </li>
              <li>
                <Link to="/public-lessons">Public Lessons</Link>
              </li>
            </ul>
          </div>

          {/* About company */}
          <div className="space-y-5 flex flex-col items-start">
            <h2 className="text-[18px] font-bold border-b-3 border-primary">
              About company
            </h2>
            <ul className="flex flex-col gap-3">
              <li>
                <Link>About Us</Link>
              </li>
              <li>
                <Link>Our Team</Link>
              </li>
              <li>
                <Link>contact us</Link>
              </li>
              <li>
                <Link>Terms & Conditions</Link>
              </li>
            </ul>
          </div>

          {/* DownLoad Apps */}
          <div className="space-y-5 flex flex-col items-start ">
            <h2 className="text-[18px] font-bold border-b-3 border-primary">
              Contact Us
            </h2>
            <ul className="flex flex-col gap-3">
              <li className="footerContactInfo">
                <FaPhoneAlt size={18} color="#4681f7" />
                01883 11 22 44
              </li>
              <li className="footerContactInfo">
                <SiMinutemailer size={18} color="#4681f7" />
                info@life'slessons.com
              </li>
              <li className="footerContactInfo">
                <IoLocationSharp size={18} color="#4681f7" />
                Haji Abdul Jolil Road, Moishala, Pangsha, Rajbari
              </li>
            </ul>
          </div>
        </div>
      </Container>
      {/* Copy Right */}
      <div className="text-center py-10 border-t border-[#ffffff2d] bg-base">
        <p>©2025 Life's Lesson. All Rights Reserved. Developed by Abdullah</p>
      </div>
    </div>
  );
};

export default Footer;
