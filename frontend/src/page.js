'use client';
import React, { useState } from 'react';
import Login from './components/Login';
import Todo from './components/Todo';
import Weather from './components/Weather';
import { Menu, X } from 'lucide-react'; // Import icons for the hamburger menu
import Stocks from './components/Stocks';

export default function Home() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('weather'); // Track active page
  const [menuOpen, setMenuOpen] = useState(false); // Track menu state

  const handleLogin = () => setIsSignedIn(true);
  const handleLogout = () => setIsSignedIn(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      {isSignedIn ? (
        <div className="min-h-screen bg-gray-100">
          {/* Navigation Bar */}
          <nav className="bg-blue-600 text-white p-4 shadow-md">
            <div className="max-w-4xl mx-auto flex justify-between items-center">
              <h1 className="text-xl font-bold">My App</h1>
              
              {/* Hamburger Menu Button */}
              <button onClick={toggleMenu} className="sm:hidden">
                {menuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>

              {/* Desktop Navigation */}
              <ul className="hidden sm:flex gap-6">
                <li 
                  className={`cursor-pointer ${currentPage === 'weather' ? 'underline' : ''}`} 
                  onClick={() => setCurrentPage('weather')}
                >
                  Weather
                </li>
                <li 
                  className={`cursor-pointer ${currentPage === 'todo' ? 'underline' : ''}`} 
                  onClick={() => setCurrentPage('todo')}
                >
                  Todo
                </li>
                <li 
                  className={`cursor-pointer ${currentPage === 'stocks' ? 'underline' : ''}`} 
                  onClick={() => setCurrentPage('stocks')}
                >
                  Stocks
                </li>
                <li>
                  <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600">
                    Logout
                  </button>
                </li>
              </ul>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
              <ul className="sm:hidden bg-blue-700 mt-2 space-y-3 p-4 rounded-md">
                <li 
                  className="cursor-pointer" 
                  onClick={() => { setCurrentPage('weather'); setMenuOpen(false); }}
                >
                  Weather
                </li>
                <li 
                  className="cursor-pointer" 
                  onClick={() => { setCurrentPage('todo'); setMenuOpen(false); }}
                >
                  Todo
                </li>
                <li 
                  className="cursor-pointer" 
                  onClick={() => { setCurrentPage('stocks'); setMenuOpen(false); }}
                >
                  Stocks
                </li>
                <li>
                  <button 
                    onClick={handleLogout} 
                    className="w-full bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </nav>

          {/* Page Content */}
          <div className="p-6">
            {currentPage === 'weather' ? (
              <Weather onLogout={handleLogout} />
            ) : currentPage === 'todo' ? (
                <Todo onLogout={handleLogout} />
            ) : (
              <Stocks onLogout={handleLogout} />
            )
            }
          </div>
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </>
  );
}
