import React, { useState, useEffect, useCallback } from 'react';

const Carousel = ({ images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const placeholderImages = [
    'https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg',
    'https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg',
    'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg',
  ];

  const activeImages = images.length > 0 ? images : placeholderImages;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === activeImages.length - 1 ? 0 : prevIndex + 1
    );
  }, [activeImages.length]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(intervalId);
  }, [nextSlide]);

  if (activeImages.length === 0) {
    return <div className="text-center">No images to display.</div>;
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto overflow-hidden rounded-lg shadow-lg">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {activeImages.map((image, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-auto object-cover" // Maintain aspect ratio, cover the area
              style={{ minHeight: '300px' }} // Ensure a minimum height
            />
          </div>
        ))}
      </div>

      {/* Optional: Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {activeImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? 'bg-white' : 'bg-gray-400'
            } focus:outline-none`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>

      {/* Optional: Navigation Arrows (simplified) */}
      <button
        onClick={() => setCurrentIndex(currentIndex === 0 ? activeImages.length - 1 : currentIndex - 1)}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full focus:outline-none hover:bg-opacity-75"
        aria-label="Previous slide"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full focus:outline-none hover:bg-opacity-75"
        aria-label="Next slide"
      >
        &#10095;
      </button>
    </div>
  );
};

export default Carousel;
