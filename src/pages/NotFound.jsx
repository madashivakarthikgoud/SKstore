// src/pages/NotFound.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white text-center">
      <div className="max-w-lg">
        <h1 className="text-4xl sm:text-5xl font-semibold text-gray-800 mb-4">404</h1>
        <p className="text-xl sm:text-2xl text-gray-600 mb-8">Oops! The page you're looking for doesn't exist.</p>
        
        <div className="space-x-4">
          <button
            onClick={handleGoBack}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Go Back
          </button>
          
          <Link 
            to="/" 
            className="px-6 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
