import React from 'react';

const AnnouncementComponent = () => {

  return (
    <div
      className="bg-gradient-to-r from-yellow-300 via-red-400 to-pink-500 text-white text-center py-4 px-6 rounded-md shadow-lg mt-6 mx-auto max-w-2xl">
      <h1 className="text-2xl font-bold mb-2">We've asked, and you answered!</h1>
      <p className="text-lg">
        DonorHub is now <span className="font-extrabold text-white">LuckyHub</span>
      </p>
    </div>
  )
}

export default AnnouncementComponent;
