import React from "react";
//import { FaInstagram } from "react-icons/fa";
//import { FaTwitter } from "react-icons/fa";
//import { FaLinkedin } from "react-icons/fa";
//import { FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <>
      <div className="bg-gray-50 h-1/2 w-full flex md:flex-row flex-col justify-around items-start p-20">
          <ul>
            <p className="text-gray-800 font-bold text-2xl pb-4">Contactos</p>
            <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
              Formulario de contacto
            </li>
            <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
              Reportes de incidentes
            </li>
            <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
              Trabajar con nosotros
            </li>
            <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
              Si querés estudiar
            </li>
            <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
              Si querés ser proveedor
            </li>
          </ul>
        <div className="p-5">
          <ul>
            <p className="text-gray-800 font-bold text-2xl pb-4">Legales</p>
            <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
              Términos y condiciones de uso
            </li>
            <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
              Política de privacidad
            </li>
            <li className="text-gray-500 text-md pb-2 font-semibold hover:text-blue-600 cursor-pointer">
              Defensa de las y los Consumidores
            </li>
          </ul>
        </div>
        <div className="p-5">
          <ul>
            <p className="text-gray-800 font-bold text-3xl pb-6">Seguinos</p>
            <div className="flex gap-6 pb-5">
              
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