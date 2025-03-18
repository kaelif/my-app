'use client';
import React, { useState } from 'react';
import LoginForm from './LoginForm'; // Import the LoginForm component

export default function Login({ onLogin }) {
  const [showForm, setShowForm] = useState(false); // State to control form visibility

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center w-96">
        {!showForm ? ( // Show the "Sign In" button if the form is not visible
          <>
            <h1 className="text-2xl font-bold mb-4 text-gray-800">Please Sign In</h1>
            <button
              onClick={() => setShowForm(true)} // Show the form when clicked
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Sign In
            </button>
          </>
        ) : (
          // Show the form when showForm is true
          <LoginForm onLogin={onLogin} />
        )}
      </div>
    </div>
  );
}