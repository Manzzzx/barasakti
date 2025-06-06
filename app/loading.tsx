"use client"

import React from 'react';

const Loading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-red-900 flex items-center justify-center p-4">
      <div className="text-center">
        {/* Animated Charcoal/Fire Elements */}
        <div className="relative mb-8">
          <div className="flex justify-center items-end space-x-2">
            {/* Burning Charcoal Animation */}
            {[0, 1, 2, 3, 4].map((index) => (
              <div key={index} className="relative">
                <div
                  className={`w-8 h-8 bg-gradient-to-t from-gray-900 via-gray-700 to-gray-600 rounded-lg animate-pulse shadow-lg border border-gray-500`}
                  style={{
                    animationDelay: `${index * 0.3}s`,
                    animationDuration: '2s'
                  }}
                >
                  {/* Charcoal texture */}
                  <div className="absolute inset-1 bg-gradient-to-br from-gray-800 to-black rounded opacity-80"></div>
                  <div className="absolute top-1 left-1 w-1 h-1 bg-gray-400 rounded-full opacity-60"></div>
                  <div className="absolute bottom-1 right-1 w-0.5 h-0.5 bg-gray-500 rounded-full opacity-40"></div>
                </div>
                
                {/* Fire/Ember Effect */}
                <div 
                  className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-2 h-3 opacity-70"
                  style={{
                    animationDelay: `${index * 0.2}s`,
                  }}
                >
                  <div className="w-full h-full bg-gradient-to-t from-red-500 via-orange-400 to-yellow-300 rounded-full animate-flicker blur-sm"></div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Heat/Smoke effect */}
          <div className="mt-4 flex justify-center">
            <div className="w-32 h-8 bg-gradient-to-t from-transparent via-gray-400 to-transparent opacity-30 rounded-full animate-pulse blur-sm"></div>
          </div>
          
          {/* Loading progress */}
          <div className="mt-6 w-24 sm:w-32 h-2 bg-gray-700 rounded-full mx-auto overflow-hidden border border-gray-600">
            <div className="h-full bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 rounded-full animate-loading-fire"></div>
          </div>
        </div>

        {/* Company Logo/Text */}
        <div className="mb-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 tracking-wide">
            <span className="text-red-500">BARA</span> <span className="text-orange-400">SAKTI</span>
          </h1>
          <p className="text-orange-300 font-semibold tracking-widest text-xs sm:text-sm uppercase">
            Premium Charcoal Briket
          </p>
          <div className="w-12 sm:w-16 h-0.5 bg-gradient-to-r from-red-500 to-orange-400 mx-auto mt-2"></div>
        </div>

        {/* Loading Text */}
        <div className="space-y-3">
          <p className="text-gray-300 text-base sm:text-lg font-medium px-4">
            Menyalakan api terbaik...
          </p>
          <div className="flex justify-center items-center space-x-1">
            <div className="flex space-x-1">
              {[0, 1, 2].map((index) => (
                <div
                  key={index}
                  className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full animate-bounce"
                  style={{
                    backgroundColor: index === 0 ? '#ef4444' : index === 1 ? '#f97316' : '#fbbf24',
                    animationDelay: `${index * 0.2}s`,
                    animationDuration: '1.2s'
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Fire/Flame SVG Animation */}
        <div className="mt-6 sm:mt-8 opacity-40">
          <svg 
            className="w-12 h-12 sm:w-16 sm:h-16 mx-auto animate-flicker" 
            viewBox="0 0 100 100" 
            fill="none"
          >
            <path 
              d="M50 10 C35 25, 35 40, 45 50 C40 35, 50 30, 55 45 C60 30, 70 35, 65 50 C75 40, 75 25, 60 10 C55 15, 50 10, 50 10 Z" 
              fill="url(#fireGradient)"
            />
            <defs>
              <linearGradient id="fireGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#dc2626" />
                <stop offset="50%" stopColor="#ea580c" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Sparks effect */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-orange-400 rounded-full animate-spark opacity-60"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes loading-fire {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        @keyframes flicker {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        @keyframes spark {
          0% { opacity: 0; transform: translateY(0px); }
          50% { opacity: 1; }
          100% { opacity: 0; transform: translateY(-20px); }
        }
        .animate-loading-fire {
          animation: loading-fire 3s ease-in-out infinite;
        }
        .animate-flicker {
          animation: flicker 1.5s ease-in-out infinite;
        }
        .animate-spark {
          animation: spark 2s ease-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Loading;