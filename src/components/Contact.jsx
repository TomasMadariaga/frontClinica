import React, { useEffect } from "react";

const Contacto = () => {
  document.title = "Contact form";
  return (
    <div className="flex items-center justify-center p-12">
      <div className="mx-auto w-full max-w-[550px] bg-white p-4 rounded-md shadow-md">
        <h3 className="text-2xl mb-4 text-teal-600 font-semibold">
          Contact Form
        </h3>
        <hr className="border-t-2 border-gray-300 mb-4" />
        <form
          action="https://formsubmit.co/8972cd4ba0c2cfb1ae56348e1dcbbfa2"
          method="POST"
        >
          <div className="mb-5">
            <label
              htmlFor="name"
              className="mb-3 block text-base font-medium text-teal-600"
            >
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Full Name"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-teal-600 focus:shadow-md"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="mb-3 block text-base font-medium text-teal-600"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="example@domain.com"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-teal-600 focus:shadow-md"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="dni"
              className="mb-3 block text-base font-medium text-teal-600"
            >
              DNI
            </label>
            <input
              type="text"
              name="dni"
              id="dni"
              placeholder="Enter your DNI"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-teal-600 focus:shadow-md"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="phone-number"
              className="mb-3 block text-base font-medium text-teal-600"
            >
              Phone Number
            </label>
            <input
              type="text"
              name="phone-number"
              id="phone-number"
              placeholder="Enter your phone number"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-teal-600 focus:shadow-md"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="message"
              className="mb-3 block text-base font-medium text-teal-600"
            >
              Write your inquiry.
            </label>
            <textarea
              rows="4"
              name="message"
              id="message"
              placeholder="Write your inquiry here."
              className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-teal-600 focus:shadow-md"
            ></textarea>
          </div>
          <div className="text-right">
            <button className="hover:shadow-form rounded-md bg-teal-600 hover:bg-teal-900 py-3 px-8 text-base font-semibold text-white outline-none">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contacto;
