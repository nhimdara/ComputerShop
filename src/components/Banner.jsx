import React, { useState, useEffect } from "react";

const Banner1 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      brand: "MSI",
      bgImage: "https://images6.alphacoders.com/130/thumb-1920-1306183.jpeg",
      productImage:
        "https://cdn.mos.cms.futurecdn.net/JBQ2tArTsf7YdmYJ3e3jvC.png",
      textColor: "text-white",
      highlightColor: "text-red-400",
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
    },
    {
      id: 5,
      brand: "DELL",
      bgImage:
        "https://i.pinimg.com/736x/49/af/7f/49af7f98dd6380e0fdd8983b92fe6d68.jpg",
      productImage:
        "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/dell-plus/db06250/media-gallery/blue/2n1-dell-db06250-mdnt-bl-gallery-2.psd?fmt=png-alpha&pscan=auto&scl=1&hei=804&wid=1179&qlt=100,1&resMode=sharp2&size=1179,804&chrss=full",
      textColor: "text-white",
      highlightColor: "text-blue-300",
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
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => setCurrentSlide(index);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);


  return (
    <div className="relative font-sans overflow-hidden">
      <div className="relative w-full h-[650px] md:h-[750px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.5)), url("${slide.bgImage}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="container mx-auto px-4 h-full">
              <div className="flex flex-col md:flex-row items-center justify-between h-full">
                {/* LEFT TEXT SECTION - Centered vertically */}
                <div className="md:w-1/2 text-center md:text-left flex flex-col justify-center h-full py-8 md:py-0">
                  <div className="relative">
                    {/* BIGGER Badge */}
                    <div className="inline-block bg-gradient-to-r from-red-600 to-red-700 text-white text-base md:text-lg font-extrabold px-6 py-3 rounded-full mb-6 animate-pulse shadow-xl">
                      ⚡️ LIMITED TIME OFFER ⚡️
                    </div>

                    <h1
                      className={`${slide.textColor} font-black text-5xl md:text-7xl lg:text-8xl mb-6 tracking-tight leading-tight`}
                    >
                      {slide.brand}
                    </h1>

                    <div
                      className={`${slide.textColor} text-2xl md:text-3xl space-y-3 mb-10 font-medium`}
                    >
                      <p className="opacity-90">Our Biggest Promotion Ever!</p>
                      <p className="text-4xl md:text-5xl font-bold">
                        Save Up To{" "}
                        <span
                          className={`${slide.highlightColor} text-5xl md:text-6xl font-black`}
                        >
                          10%
                        </span>
                      </p>
                      <p className="text-xl opacity-80">
                        On All {slide.brand} Products
                      </p>
                    </div>

                    {/* Button */}
                    <div>
                      <button
                        style={{
                          background:
                            "linear-gradient(135deg, #92400e, #b45309)",
                          color: "white",
                          padding: "14px 32px",
                          borderRadius: "999px",
                          border: "none",
                          fontSize: "16px",
                          fontWeight: "600",
                          cursor: "pointer",
                          boxShadow: "0 8px 20px rgba(146, 64, 14, 0.35)",
                          transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = "translateY(-2px)";
                          e.target.style.boxShadow =
                            "0 12px 25px rgba(146, 64, 14, 0.45)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = "translateY(0)";
                          e.target.style.boxShadow =
                            "0 8px 20px rgba(146, 64, 14, 0.35)";
                        }}
                      >
                        🛒 Shop Now
                      </button>
                    </div>

                    {/* Additional Info */}
                    <p
                      className={`${slide.textColor} text-base md:text-lg mt-8 opacity-80 font-semibold`}
                    >
                      ⚡️ Free Shipping • 30-Day Return • 2-Year Warranty
                    </p>
                  </div>
                </div>


                {/* RIGHT IMAGE SECTION */}
                <div className="md:w-1/2 flex justify-center items-center h-full">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-2xl rounded-full"></div>
                    <img
                      src={slide.productImage}
                      alt={`${slide.brand} Laptop`}
                      className="relative max-w-[500px] md:max-w-[600px] w-full h-auto transform transition-all duration-700 hover:scale-105 hover:rotate-2"
                    />
                    {/* Floating Price Tag - Bigger */}
                    <div className="absolute -bottom-6 -right-6 bg-white text-gray-900 font-bold py-3 px-5 rounded-xl shadow-2xl transform rotate-3 animate-bounce border-2 border-red-500">
                      <span className="text-base line-through opacity-60">
                        $1,299
                      </span>
                      <span className="block text-3xl text-red-600 font-black">
                        $1,169
                      </span>
                      <span className="text-xs text-green-600 font-semibold">
                        SAVE $130
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Enhanced Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-5 h-5 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-white scale-125 shadow-lg" : "bg-gray-400/60 hover:bg-gray-300"}`}
              aria-label={`Go to slide ${index + 1}`}
              role="button"
            />
          ))}
        </div>

        {/* Enhanced Prev Button - Bigger */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/40 p-4 rounded-full shadow-2xl transition-all duration-300 z-10 group"
          aria-label="Previous slide"
        >
          <span className="text-4xl text-white group-hover:text-red-300 transition-colors">
            ‹
          </span>
        </button>

        {/* Enhanced Next Button - Bigger */}
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/40 p-4 rounded-full shadow-2xl transition-all duration-300 z-10 group"
          aria-label="Next slide"
        >
          <span className="text-4xl text-white group-hover:text-red-300 transition-colors">
            ›
          </span>
        </button>

        {/* Slide Counter - Bigger */}
        <div className="absolute bottom-6 right-6 bg-black/60 text-white text-base px-4 py-2 rounded-xl backdrop-blur-sm font-bold">
          {currentSlide + 1} / {slides.length}
        </div>
      </div>
    </div>
  );
};

export default Banner1;
