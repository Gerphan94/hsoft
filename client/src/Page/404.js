// src/components/NotFound.js
import React from 'react';

const NotFound = () => {
  return (
    <div className="w-full flex items-center justify-center h-screen bg-gray-200">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Page not found</p>
        <a href="/" className="text-2xl text-blue-500 hover:underline">
          Go back to home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
