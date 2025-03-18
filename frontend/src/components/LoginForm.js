'use client';
import React from 'react';

export default function LoginForm({ onLogin }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault(); // Prevent default form submission
        onLogin(); // Call the onLogin function after form submission
      }}
    >
      
      <div className="mb-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Enter Credentials</h1>
        <input
          type="email"
          placeholder="Email"
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-500"
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          placeholder="Password"
          className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-500"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Submit
      </button>
    </form>
  );
}