import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-800">
      <div className="text-center bg-gray-700 p-8 rounded-lg shadow-md max-w-md">
        <FaExclamationTriangle className="text-6xl text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-200 mb-2">404 - Page Not Found</h1>
        <p className="text-gray-100 mb-4">
          Oops! The page you're looking for doesn't exist.
        </p>
        <p className="text-gray-200 mb-6">
          Please check the URL or go back to the homepage.
        </p>
        <Link
          href="/"
          className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;