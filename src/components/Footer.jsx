import React from "react";
import { MdAddIcCall, MdEmail } from "react-icons/md";
import {
  FaFacebook,
  FaTelegram,
  FaFacebookMessenger,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  const footerLinks = [
    "Home",
    "Products",
    "Laptops",
    "Gaming PCs",
    "Contact Us",
  ];

  const socialLinks = [
    {
      label: "Facebook",
      icon: FaFacebook,
      link: "https://web.facebook.com/?_rdc=1&_rdr#",
    },
    { label: "Telegram", icon: FaTelegram, link: "https://t.me/pechpor" },
    {
      label: "Messenger",
      icon: FaFacebookMessenger,
      link: "https://www.messenger.com/t/24242525865351434/",
    },
    { label: "Twitter", icon: FaTwitter, link: "https://twitter.com" },
  ];

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full bg-gradient-to-br from-[#081b29] via-[#0b2438] to-[#0f2a42] text-white px-4 sm:px-6 md:px-8 lg:px-10 py-8 sm:py-10 md:py-12">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 md:gap-8 lg:gap-10 mb-8 sm:mb-10">
          {/* Brand/About Section */}
          <div className="space-y-4">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                DayTech Computer
              </h2>
              <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 my-3 rounded-full" />
            </div>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Your trusted computer shop for laptops, desktops, and accessories.
              Quality products, fair prices, and reliable support for work,
              study, and gaming.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold mb-2">
                Quick Links
              </h2>
              <div className="w-10 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full" />
            </div>
            <ul className="space-y-3">
              {footerLinks.map((item) => (
                <li key={item}>
                  <button
                    onClick={() =>
                      handleScroll(item.toLowerCase().replace(" ", "-"))
                    }
                    className="text-gray-300 hover:text-cyan-400 transition-all duration-300 transform hover:translate-x-2 flex items-center group"
                  >
                    <span className=" bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>


          {/* Contact Info */}
          <div className="space-y-4">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold mb-2">
                Contact Info
              </h2>
              <div className="w-10 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full" />
            </div>
            <div className="space-y-4 text-gray-300">
              <p className="flex items-start">
                <span className="text-cyan-400 mr-3 mt-1">📍</span>
                Phnom Penh, Cambodia
              </p>
              <div className="flex items-center group">
                <MdAddIcCall className="text-cyan-400 text-lg mr-3 group-hover:scale-110 transition-transform" />
                <span className="hover:text-cyan-400 transition-colors">
                  (+855) 16 257 290
                </span>
              </div>
              <div className="flex items-center group">
                <MdEmail className="text-cyan-400 text-lg mr-3 group-hover:scale-110 transition-transform" />
                <span className="hover:text-cyan-400 transition-colors break-words">
                  porpech14@gmail.com
                </span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold mb-2">
                Follow Us
              </h2>
              <div className="w-10 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full" />
            </div>
            <p className="text-gray-300 text-sm sm:text-base mb-4">
              Follow us on social media for latest deals, new arrivals, and tech
              updates.
            </p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-3 rounded-xl bg-gradient-to-br from-[#0f2a42] to-[#0a1c2e] hover:from-cyan-500 hover:to-blue-600 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20"
                  aria-label={social.label}
                >
                  <social.icon className="text-xl sm:text-2xl group-hover:scale-110 transition-transform" />
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs bg-gray-900 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    {social.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-6 sm:my-8"></div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-gray-400 text-sm sm:text-base">
            © {new Date().getFullYear()}{" "}
            <span className="text-cyan-400 font-semibold">
              DayTech Computer
            </span>
            .<span className="hidden sm:inline"> All Rights Reserved.</span>
            <span className="inline sm:hidden"> All rights reserved.</span>
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Made with ❤️ for tech enthusiasts
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
