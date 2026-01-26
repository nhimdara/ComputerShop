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
    { label: "Facebook", link: "https://web.facebook.com/?_rdc=1&_rdr#" },
    { label: "Telegram", link: "https://t.me/pechpor" },
    {
      label: "Messenger",
      link: "https://www.messenger.com/t/24242525865351434/",
    },
    { label: "Twitter", link: "https://twitter.com" },
  ];

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full bg-gradient-to-br from-[#081b29] via-[#0b2438] to-[#0f2a42] text-white px-4 sm:px-6 md:px-8 lg:px-10 py-8 sm:py-10 md:py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
        {/* Stay Connected */}
        <div>
          <h2 className="text-base sm:text-lg md:text-xl font-semibold">
            Master Computer
          </h2>
          <div className="w-8 h-1 sm:w-10 sm:h-1 bg-cyan-400 my-1.5 sm:my-2 md:my-3 rounded-full" />
          <p className="text-gray-300 text-xs sm:text-sm md:text-base">
            Your trusted computer shop for laptops, desktops, and accessories.
            We provide quality products, fair prices, and reliable support for
            work, study, and gaming.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="pl-8 text-base sm:text-lg md:text-xl font-semibold">
            Quick Links
          </h2>
          <div className="w-8 h-1  sm:w-10 sm:h-1 bg-cyan-400 ml-8 my-1.5 sm:my-2 md:my-3 rounded-full" />
          <ul className="space-y-1 sm:space-y-2 text-gray-300 text-xs sm:text-sm md:text-base">
            {footerLinks.map((item) => (
              <li key={item}>
                <button
                  onClick={() => handleScroll(item.toLowerCase())}
                  className="hover:text-cyan-400 transition-colors text-left w-full text-start"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-base sm:text-lg md:text-xl font-semibold">
            Contact
          </h2>
          <div className="w-8 h-1 sm:w-10 sm:h-1 bg-cyan-400 my-1.5 sm:my-2 md:my-3 rounded-full" />
          <div className="text-gray-300 text-xs sm:text-sm md:text-base space-y-1.5 sm:space-y-2">
            <p>Phnom Penh, Cambodia</p>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <MdAddIcCall className="text-cyan-400 text-sm sm:text-base md:text-lg" />
              <span>(+855) 16 257 290</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <MdEmail className="text-cyan-400 text-sm sm:text-base md:text-lg" />
              <span>porpech14@gmail.com</span>
            </div>
          </div>
        </div>


        {/* Social */}
        <div>
          <h2 className="text-base sm:text-lg md:text-xl font-semibold">
            Social
          </h2>
          <div className="w-8 h-1 sm:w-10 sm:h-1 bg-cyan-400 my-1.5 sm:my-2 md:my-3 rounded-full" />
          <div>
            <p>
              Follow us on social media for latest deals, new arrivals, and tech
              updates. Stay connected with Master Computer.
            </p>
          </div>
          <div className="flex gap-2 sm:gap-3 md:gap-4">
            {socialLinks.map((social, i) => {
              const Icon = [
                FaFacebook,
                FaTelegram,
                FaFacebookMessenger,
                FaTwitter,
              ][i];
              return (
                <a
                  key={i}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 sm:p-2.5 md:p-3 rounded-full bg-[#0f2a42] hover:bg-cyan-500 transition-all duration-200 hover:scale-110"
                  aria-label={social.label}
                >
                  <Icon className="text-base sm:text-lg md:text-xl" />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 mt-6 sm:mt-8 md:mt-10 pt-4 sm:pt-5 text-center text-gray-400 text-xs sm:text-sm">
        © {new Date().getFullYear()}{" "}
        <span className="text-cyan-400">Master Computer</span>. All Rights
        Reserved.
      </div>
    </footer>
  );
};

export default Footer;
