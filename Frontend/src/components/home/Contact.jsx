


import React, { useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaWhatsapp,
  FaCross,    // WhatsApp icon
} from "react-icons/fa";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (you can implement an API call or other functionality)
    alert("Message sent!");
  };

  return (
    <div className="flex justify-between p-5 bg-white mt-2 max-sm:flex-col">
     
      <div className=" p-5 bg-white border-2 border-gray-300 w-[30vw] shadow-lg rounded-lg max-sm:w-full">
        <h2 className="text-center font-bold text-2xl text-orange-400">
          Contact Us
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="font-medium text-sm mb-2"> Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 text-lg border border-gray-300 rounded-lg"
              placeholder="Enter Your Name"
            />
          </div>

          <div className="mb-4">
            <label className="font-medium text-sm mb-2"> Email</label>
            <input
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 text-lg border border-gray-300 rounded-lg"
            />
          </div>

          <div className="mb-4">
            <label className="font-medium text-sm mb-2">Message</label>
            <textarea
              placeholder="Enter Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2 text-lg border border-gray-300 rounded-lg min-h-[100px]"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-orange-400 text-white p-2 px-6 rounded-lg text-lg"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>

      <div className="w-[50vw] p-5 bg-white rounded-lg px-10 space-y-8 max-sm:w-full">
        <div className="space-y-8">
          <h2 className="text-4xl font-bold text-orange-400">
            Get In Touch
          </h2>
          <p className="text-[16px] mb-5 text-gray-600">
            Feel free to reach out through any of the methods below.
            <br /> We are available from 9am-5pm on weekdays. We’d love to hear
            from you! Whether you have a question, need support, or want to
            collaborate, the InvestCly team is here to help.
          </p>
        </div>

        <div className="space-y-3">

          <h2 className="text-3xl font-bold text-orange-400">
            investcly@gmail.com
          </h2>
          {/* <p className="text-sm text-[#666666]">
            <span className="text-[16px] text-black font-medium mr-3">
              Address:
            </span>
            123 Learning Lane, Education City, 12345
          </p>
          <p className="text-sm text-[#666666]">
            <span className="text-[16px] text-black font-medium mr-3">
              Phone:
            </span>
            (123) 456-7890
          </p>
          <p className="text-sm text-[#666666]">
            <span className="text-[16px] text-black font-medium mr-3">
              Email:
            </span>
            contact@edtech.com
          </p> */}
        </div>

        {/* Social Media Icons */}
        <div className="flex space-x-5 mt-6">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600 text-xl"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-sky-500 text-xl"
          >
            <FaTwitter />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-700 text-xl"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-green-700 text-xl"
          >
            <FaWhatsapp />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-pink-500 text-xl"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
