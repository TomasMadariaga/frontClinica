import React from "react";
import { FaInstagram } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <div className="bg-gray-50 h-1/2 w-full flex md:flex-row flex-col justify-around items-start p-4">
        <div className="p-5">
          <ul>
            <p className="text-gray-800 font-bold text-2xl pb-4">Contacts</p>
            <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
              <Link to="/contact">Contact form</Link>
            </li>

            <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
              <Link to="/hours-of-operation-and-visits">
                Hours of operation and visits
              </Link>
            </li>
          </ul>
        </div>
        <div className="p-5">
          <ul>
            <p className="text-gray-800 font-bold text-2xl pb-4 ">Legal</p>
            <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
              <Link to="/terms-and-conditions">Terms and conditions</Link>
            </li>
            <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
              <Link to="/privacy-policy">Privacy Policy</Link>
            </li>
            <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
              <a
                href="https://autogestion.produccion.gob.ar/consumidores"
                target="_blank"
                rel="noopener noreferrer"
              >
                Consumer protection
              </a>
            </li>
          </ul>
        </div>
        <div className="p-5">
          <ul>
            <p className="text-gray-800 font-bold text-2xl pb-4 text-center">
              Follow Us
            </p>
            <div className="flex gap-6 pb-5">
              <FaInstagram className="text-2xl cursor-pointer hover:text-yellow-600" />
              <RiTwitterXFill className="text-2xl cursor-pointer hover:text-blue-600" />
              <FaLinkedin className="text-2xl cursor-pointer hover:text-blue-600" />
              <Link to='https://youtu.be/dQw4w9WgXcQ?si=Uv8C7zZrFKS3-7XEh'><FaYoutube className="text-2xl cursor-pointer hover:text-red-600" /></Link>
            </div>
          </ul>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center text-center py-5 bg-gray-50">
        <h1 className=" text-gray-800 font-semibold">
          © 2023 All rights reserved
        </h1>
      </div>
    </>
  );
}

export default Footer;
