import React from "react";
import Container from "./Container";
import { HiOutlineMail } from "react-icons/hi";
import { MdCall } from "react-icons/md";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const NavbarTop = () => {
  return (
    <div className="bg-primary hidden lg:block">
      <Container>
        <div className="flex justify-between items-center text-white py-2">
          <ul className="flex items-center gap-3 ">
            <li className="navIcon">
              <FaFacebookF />
            </li>
            <li className="navIcon">
              <FaInstagram />
            </li>
            <li className="navIcon">
              <FaLinkedinIn />
            </li>
          </ul>
          <ul className="flex items-center gap-4">
            <li className="flex items-center gap-2 cursor-pointer">
              <HiOutlineMail size={18} />
              info@life'slessons.com
            </li>
            <li className="flex items-center gap-2 cursor-pointer">
              <MdCall size={16} />
              01883 11 22 44
            </li>
          </ul>
        </div>
      </Container>
    </div>
  );
};

export default NavbarTop;
