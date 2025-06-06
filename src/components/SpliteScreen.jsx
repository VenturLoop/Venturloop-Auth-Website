// components/layouts/AuthLayout.jsx

import { Toaster } from 'react-hot-toast';
import PropTypes from 'prop-types';
import Carousel from './Carousel'; // Import the Carousel component

export default function SpliteScreen({ children }) { // Removed 'data' prop
  const carouselImages = [
    'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg',
    'https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg',
    'https://images.pexels.com/photos/1181472/pexels-photo-1181472.jpeg',
    'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg',
  ];

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex flex-col md:flex-row h-screen w-screen bg-white">
        {/* Left Column: Carousel */}
        {/* Hidden on screens smaller than 'md' (tablets and mobiles) */}
        <div className="hidden md:flex md:w-1/2 lg:w-3/5 xl:w-1/2 bg-white flex-col justify-center items-center p-0">
          {/* Set p-0 or adjust as needed if Carousel has its own padding */}
          <Carousel images={carouselImages} />
        </div>

        {/* Right Column: Children */}
        {/* Takes full width on smaller screens, and specified proportion on larger screens */}
        <div className="w-full md:w-1/2 lg:w-2/5 xl:w-1/2 flex flex-col justify-center items-center p-6 sm:p-8 md:p-12 overflow-y-auto">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </div>
    </>
  );
}

SpliteScreen.propTypes = {
  // Removed propTypes for 'data'
  children: PropTypes.node.isRequired,
};
