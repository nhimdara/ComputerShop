import React from "react";
import Facebook from "../assets/Qrcode/FB.png";
import Instagram from "../assets/Qrcode/IG.png";
import Telegram from "../assets/Qrcode/TE.png";

const Contact = () => {
  return (
    <div className="w-full max-w-[1000px] min-h-[600px] mx-auto mt-10 md:mt-20 mb-10 md:mb-20 shadow-xl p-5 md:p-0">
      <div className="w-full h-full">
        <div className="pt-5">
          <h1 className="text-2xl md:text-3xl pl-0 md:pl-5">DayTech Computer</h1>
        </div>
        <div className="pl-0 md:pl-5 pt-3 text-base md:text-xl space-y-2">
          <p>
            <span className="font-bold">- អាស័យដ្ឋាន:</span> ផ្ទះលេខ០០៧
            ផ្លូវលំ សង្កាត់គោកឃ្លាង ខណ្ឌសែនសុខ រាជធានីភ្នំពេញ
          </p>
          <p className="text-sm md:text-base">
            - Address: No #007, Street Lom Khan SenSok Phnom Penh City
          </p>
          <p>- Tel : 016 257 290</p>
          <p>
            - Telegram Channel :{" "}
            <a 
              href="https://t.me/pechpor" 
              className="text-blue-600 hover:underline break-all"
            >
              Chanel Telegram
            </a>
          </p>
          <p>
            - Facebook :{" "}
            <a 
              href="https://web.facebook.com/dara.nhim.865637"
              className="text-blue-600 hover:underline break-all"
            >
              Master Computer
            </a>
          </p>
        </div>
        <div className="w-full pt-10 flex flex-col md:flex-row gap-6 md:gap-4 pl-0 md:pl-5">
          <div className="w-full md:w-[33%] flex flex-col items-center">
            <img 
              src={Telegram} 
              alt="Telegram QR Code" 
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain" 
            />
            <p className="mt-2 text-base md:text-lg font-semibold">Telegram</p>
          </div>
          <div className="w-full md:w-[33%] flex flex-col items-center">
            <img 
              src={Facebook} 
              alt="Facebook QR Code" 
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain" 
            />
            <p className="mt-2 text-base md:text-lg font-semibold">Facebook</p>
          </div>
          <div className="w-full md:w-[33%] flex flex-col items-center">
            <img 
              src={Instagram} 
              alt="Instagram QR Code" 
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain" 
            />
            <p className="mt-2 text-base md:text-lg font-semibold">Instagram</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;