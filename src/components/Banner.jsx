import React, { useState, useEffect, useCallback } from "react";

const Banner1 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const slides = [
    {
      id: 1,
      brand: "MSI",
      bgImage: "https://images6.alphacoders.com/130/thumb-1920-1306183.jpeg",
      productImage:
        "https://cdn.mos.cms.futurecdn.net/JBQ2tArTsf7YdmYJ3e3jvC.png",
      textColor: "text-white",
      highlightColor: "text-red-400",
      gradient: "from-purple-900/70 to-red-900/50",
      accentColor: "#dc2626",
    },
    {
      id: 2,
      brand: "ASUS TUF GAMING",
      bgImage:
        "https://wallpapers.com/images/hd/asus-t-u-f-gaming-logo-neon-wallpaper-by1f2cowqalcdo17.jpg",
      productImage:
        "https://s3.ap-southeast-1.amazonaws.com/uploads-store/uploads/all/SODVQ78TwS0ekG2ZRZTHFUYsyo2RcJ7mMmVO30eJ.png",
      textColor: "text-white",
      highlightColor: "text-yellow-400",
      gradient: "from-gray-900/70 to-yellow-900/50",
      accentColor: "#fbbf24",
    },
    {
      id: 3,
      brand: "ASUS ROG",
      bgImage:
        "https://preview.redd.it/5f4g48xotu261.png?width=1080&crop=smart&auto=webp&s=bef5a78bd8d80f7add8c217dae778a28092afbb4",
      productImage:
        "https://dlcdnwebimgs.asus.com/gain/E17607E8-B0AA-41B4-AFE2-8F30F0899C3E/w1000/h732",
      textColor: "text-white",
      highlightColor: "text-red-400",
      gradient: "from-red-900/70 to-black/70",
      accentColor: "#ef4444",
    },
    {
      id: 4,
      brand: "ASUS VIVOBOOK",
      bgImage:
        "https://wallpapers.com/images/hd/asus-background-1q3hr6l2eypw7lfp.jpg",
      productImage:
        "https://dlcdnwebimgs.asus.com/gain/13171c2d-3e77-4aa5-aec3-e620b0b8392f/w534",
      textColor: "text-white",
      highlightColor: "text-blue-300",
      gradient: "from-blue-900/70 to-cyan-900/50",
      accentColor: "#7dd3fc",
    },
    {
      id: 5,
      brand: "DELL",
      bgImage:
        "https://i.pinimg.com/736x/49/af/7f/49af7f98dd6380e0fdd8983b92fe6d68.jpg",
      productImage:
        "https://suhadha.lk/wp-content/uploads/2024/12/Dell-Inspiron-3530-13th-Gen-i3-DDR4-8GB-RAM-512GB-NVMe-SSD-Sri-Lanka-Badudeal.lk_-removebg-preview.png",
      textColor: "text-white",
      highlightColor: "text-blue-300",
      gradient: "from-blue-900/70 to-indigo-900/50",
      accentColor: "#3b82f6",
    },
    {
      id: 6,
      brand: "MacBook",
      bgImage:
        "https://preview.redd.it/2024-macos-wallpaper-4096x2304-v0-my98eufvv7lc1.jpeg?width=1080&crop=smart&auto=webp&s=8839e291d3ded99b546da0cd454870cc545fb580",
      productImage:
        "https://powermaccenter.com/cdn/shop/files/MacBook_Air_13_in_Midnight_PDP_Image_Position-1__WWEN-removebg-preview.png?v=1754530384",
      textColor: "text-white",
      highlightColor: "text-gray-300",
      gradient: "from-gray-900/70 to-slate-900/50",
      accentColor: "#94a3b8",
    },
    {
      id: 7,
      brand: "LENOVO",
      bgImage:
        "https://preview.redd.it/just-created-a-loq-wallpaper-v0-uulu5v78j8if1.png?auto=webp&s=a89a7d2bfa444290eb47f84b3749b1832072ec1c",
      productImage:
        "https://p1-ofp.static.pub/fes/cms/2021/12/17/ephit8bi4waypyhk5ayf20s55uhtf3918030.png",
      textColor: "text-white",
      highlightColor: "text-red-400",
      gradient: "from-red-900/70 to-black/70",
      accentColor: "#dc2626",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);


  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();

    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div
      className="relative font-sans overflow-hidden bg-gradient-to-b from-gray-900 to-black"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-gray-900/10 to-transparent"></div>

      <div className="relative w-full h-[550px] sm:h-[600px] md:h-[650px] lg:h-[700px] xl:h-[750px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-all duration-700 ease-out transform ${
              index === currentSlide
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-full pointer-events-none"
            }`}
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0.7)), url("${slide.bgImage}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* Mobile Gradient Overlay - Darker for better text readability */}
            <div
              className={`absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r ${slide.gradient} animate-gradient-x`}
            ></div>

            <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-30 h-full relative z-10">
              <div className="flex flex-col md:flex-row items-center justify-between h-full gap-2 sm:gap-4 md:gap-6 lg:gap-8">
                {/* LEFT TEXT SECTION - Mobile Optimized */}
                <div className="w-full md:w-1/2 text-center md:text-left flex flex-col justify-center h-full py-4 sm:py-6 md:py-0 px-2 sm:px-3">
                  <div className="max-w-md mx-auto md:mx-0 md:pr-4 lg:pr-6">
                    {/* Badge - Mobile Optimized */}
                    <div className="inline-block bg-gradient-to-r from-red-600 to-red-700 text-white text-xs font-bold px-3 py-1 rounded-full mb-3 sm:mb-4 animate-pulse shadow-lg hover:shadow-red-500/20 transition-all duration-300 sm:text-sm sm:px-3 sm:py-1.5 md:text-base">
                      ⚡️ LIMITED TIME OFFER ⚡️
                    </div>

                    {/* Brand Title - Mobile Responsive */}
                    <h1
                      className={`${slide.textColor} font-black text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl mb-2 sm:mb-3 md:mb-4 tracking-tight leading-tight`}
                    >
                      {slide.brand}
                    </h1>


                    {/* Description - Clean Mobile Layout */}
                    <div
                      className={`${slide.textColor} space-y-1 sm:space-y-2 mb-4 sm:mb-5 md:mb-7`}
                    >
                      <p className="text-sm sm:text-base md:text-xl opacity-90 font-medium">
                        Our Biggest Promotion Ever!
                      </p>
                      <p className="text-lg sm:text-xl md:text-3xl font-bold leading-tight">
                        Save Up To{" "}
                        <span
                          className={`${slide.highlightColor} text-xl sm:text-2xl md:text-4xl font-black drop-shadow-lg`}
                        >
                          10%
                        </span>
                      </p>
                      <p className="text-xs sm:text-sm md:text-lg opacity-80">
                        On All {slide.brand} Products
                      </p>
                    </div>

                    {/* Button - Mobile Optimized */}
                    <div className="mb-4 sm:mb-5 md:mb-6">
                      <button
                        className="relative group w-full max-w-xs mx-auto md:mx-0 md:w-auto px-5 py-2.5 sm:py-3 text-white font-bold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl text-sm sm:text-base"
                        style={{
                          background: `linear-gradient(135deg, ${slide.accentColor}, ${slide.accentColor}dd)`,
                        }}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          🛒 Shop Now
                          <svg
                            className="w-3 h-3 sm:w-4 sm:h-4 transform group-hover:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </span>
                        <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                      </button>
                    </div>


                    {/* Additional Info - Mobile Optimized Grid */}
                    <div
                      className={`${slide.textColor} grid grid-cols-3 gap-1.5 sm:gap-2 text-xs opacity-90 md:flex md:justify-start md:gap-3`}
                    >
                      <span className="flex flex-col items-center justify-center bg-white/5 backdrop-blur-sm px-1.5 py-1.5 rounded-lg sm:rounded-xl md:flex-row md:px-3 md:py-2 md:gap-1.5">
                        <span className="text-xs sm:text-sm">🚚</span>
                        <span className="text-[9px] sm:text-xs mt-0.5 md:text-xs">
                          Free Shipping
                        </span>
                      </span>
                      <span className="flex flex-col items-center justify-center bg-white/5 backdrop-blur-sm px-1.5 py-1.5 rounded-lg sm:rounded-xl md:flex-row md:px-3 md:py-2 md:gap-1.5">
                        <span className="text-xs sm:text-sm">🔄</span>
                        <span className="text-[9px] sm:text-xs mt-0.5 md:text-xs">
                          30-Day Return
                        </span>
                      </span>
                      <span className="flex flex-col items-center justify-center bg-white/5 backdrop-blur-sm px-1.5 py-1.5 rounded-lg sm:rounded-xl md:flex-row md:px-3 md:py-2 md:gap-1.5">
                        <span className="text-xs sm:text-sm">⚙️</span>
                        <span className="text-[9px] sm:text-xs mt-0.5 md:text-xs">
                          2-Year Warranty
                        </span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* RIGHT IMAGE SECTION - Mobile Optimized */}
                <div className="w-full md:w-1/2 flex justify-center items-center h-full p-2 sm:p-3 md:p-0 mt-2 sm:mt-0">
                  <div className="relative w-full max-w-[280px] sm:max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-2xl">
                    {/* Glow Effect - Subtle on Mobile */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-md rounded-full animate-pulse sm:blur-xl md:from-blue-500/20 md:to-purple-500/20"></div>

                    {/* Image Container */}
                    <div className="relative transform transition-all duration-500 group md:-ml-4 lg:-ml-6">
                      <img
                        src={slide.productImage}
                        alt={`${slide.brand} Laptop`}
                        className="w-full h-auto max-h-[150px] sm:max-h-[200px] md:max-h-[280px] lg:max-h-[320px] xl:max-h-[360px] object-contain transform transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />

                      {/* Floating Elements - Mobile Optimized */}
                      <div className="absolute -top-1.5 -right-1.5 sm:-top-3 sm:-right-3 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-md p-1 sm:p-1.5 rounded-full shadow-lg animate-float">
                        <div className="text-[8px] sm:text-xs font-bold text-white">
                          NEW
                        </div>
                      </div>


                      {/* Price Tag - Mobile Optimized */}
                      <div className="absolute -bottom-1.5 -right-1.5 sm:-bottom-3 sm:-right-3 bg-gradient-to-br from-white to-gray-50 text-gray-900 font-bold p-1 sm:p-1.5 rounded-lg shadow-lg transform rotate-2 animate-bounce border border-red-400/20">
                        <div className="flex flex-col items-center">
                          <span className="text-[8px] sm:text-xs line-through opacity-60">
                            $1,299
                          </span>
                          <span className="text-xs sm:text-base md:text-lg text-red-600 font-black">
                            $1,169
                          </span>
                          <span className="text-[7px] sm:text-xs text-green-600 font-semibold mt-0.5">
                            SAVE $130
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Dots - Mobile Optimized */}
        <div className="absolute bottom-3 sm:bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-1.5 sm:space-x-2.5 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white scale-110 sm:scale-125 shadow-md sm:shadow-lg"
                  : "bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Prev Button - Mobile Optimized */}
        <button
          onClick={prevSlide}
          className="absolute left-1.5 sm:left-3 md:left-4 top-1/2 transform -translate-y-1/2 bg-black/30 backdrop-blur-sm hover:bg-black/50 p-1.5 sm:p-2.5 md:p-3 rounded-full shadow-lg transition-all duration-300 z-10 group border border-white/10 active:scale-95"
          aria-label="Previous slide"
        >
          <div className="relative w-3 h-3 sm:w-5 sm:h-5 md:w-6 md:h-6 flex items-center justify-center">
            <svg
              className="w-2 h-2 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white/90 group-hover:text-white transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </div>
        </button>

        {/* Next Button - Mobile Optimized */}
        <button
          onClick={nextSlide}
          className="absolute right-1.5 sm:right-3 md:right-4 top-1/2 transform -translate-y-1/2 bg-black/30 backdrop-blur-sm hover:bg-black/50 p-1.5 sm:p-2.5 md:p-3 rounded-full shadow-lg transition-all duration-300 z-10 group border border-white/10 active:scale-95"
          aria-label="Next slide"
        >
          <div className="relative w-3 h-3 sm:w-5 sm:h-5 md:w-6 md:h-6 flex items-center justify-center">
            <svg
              className="w-2 h-2 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white/90 group-hover:text-white transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </button>

        {/* Slide Counter - Mobile Optimized */}
        <div className="absolute bottom-1.5 sm:bottom-3 right-1.5 sm:right-3 bg-black/50 text-white text-xs px-1.5 py-0.5 rounded-lg backdrop-blur-sm font-medium sm:px-2.5 sm:py-1 sm:text-sm">
          {currentSlide + 1} / {slides.length}
        </div>


        {/* Swipe Hint for Mobile - Clean Design */}
        <div className="absolute bottom-10 sm:bottom-16 left-1/2 transform -translate-x-1/2 text-white/70 text-xs flex items-center gap-1.5 animate-pulse md:hidden">
          <svg
            className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
            />
          </svg>
          <span className="text-[10px] sm:text-xs">Swipe to navigate</span>
        </div>
      </div>

      {/* Custom Animation Styles */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        @keyframes gradient-x {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 15s ease infinite;
        }
        
        /* Mobile-specific improvements */
        @media (max-width: 640px) {
          .container {
            padding-left: 0.75rem;
            padding-right: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Banner1;
