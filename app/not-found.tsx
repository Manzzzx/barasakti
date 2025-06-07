"use client"

import React from 'react';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-red-900 flex items-center justify-center p-4">
      <div className="max-w-sm sm:max-w-md w-full text-center">
        {/* 404 with Charcoal/Fire Theme */}
        <div className="mb-8">
          <div className="relative">
            {/* Large 404 Text */}
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-gray-700 mb-4 select-none">
              404
            </h1>
            
            {/* Charcoal Pieces Pattern */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="grid grid-cols-8 gap-1 opacity-50">
                {/* Scattered charcoal pieces */}
                {[...Array(32)].map((_, index) => (
                  <div
                    key={index}
                    className={`
                      w-3 h-3 rounded-sm transform rotate-12
                      ${index % 3 === 0 ? 'bg-gray-800' : index % 3 === 1 ? 'bg-gray-700' : 'bg-gray-600'}
                      ${Math.random() > 0.3 ? 'opacity-80' : 'opacity-40'}
                    `}
                    style={{
                      transform: `rotate(${Math.random() * 45}deg) scale(${0.5 + Math.random() * 0.5})`
                    }}
                  >
                    {/* Charcoal texture dot */}
                    <div className="absolute inset-0.5 bg-black rounded-sm opacity-60"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Fire/Ember effects around 404 */}
            <div className="absolute top-4 left-8 w-2 h-2 bg-red-500 rounded-full animate-pulse opacity-70"></div>
            <div className="absolute top-8 right-12 w-1 h-1 bg-orange-400 rounded-full animate-ping opacity-60"></div>
            <div className="absolute bottom-8 left-12 w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse opacity-50"></div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8 space-y-4">
          <div className="mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Api Padam!
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base px-2 sm:px-0">
              Maaf, halaman yang Anda cari telah padam atau tidak dapat ditemukan. 
              Mari kita nyalakan kembali dengan kembali ke beranda.
            </p>
          </div>

          {/* Charcoal Theme Message */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-600 rounded-lg p-3 sm:p-4 mb-6">
            <div className="flex items-center justify-center mb-2">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.333 4z" />
              </svg>
              <span className="text-red-300 font-medium text-sm sm:text-base">Api Sedang Padam</span>
            </div>
            <p className="text-gray-300 text-xs sm:text-sm px-2 sm:px-0">
              Seperti bara yang perlu dinyalakan kembali, halaman ini mungkin sedang tidak aktif. 
              Gunakan navigasi di bawah untuk menemukan apa yang Anda cari.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link 
            href="/"
            className="block w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Nyalakan Kembali - Beranda
            </span>
          </Link>

          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <Link 
              href="/gallery"
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg border border-gray-600 transition-colors duration-200"
            >
              <span className="flex items-center justify-center text-sm">
                🔥 Gallery
              </span>
            </Link>
            <Link 
              href="/kontak"
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg border border-gray-600 transition-colors duration-200"
            >
              <span className="flex items-center justify-center text-sm">
                📞 Hubungi Kami
              </span>
            </Link>
          </div>
        </div>

        {/* Company Branding */}
        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-600">
          <div className="text-center">
            <p className="text-gray-400 text-xs sm:text-sm mb-2">
              <span className="font-semibold text-red-400">BARA</span> <span className="font-semibold text-orange-400">SAKTI</span> - Premium Charcoal Briket
            </p>
            <p className="text-gray-500 text-xs">
              Api yang berkualitas untuk kebutuhan terbaik Anda
            </p>
          </div>
        </div>

        {/* Floating Embers Effect */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          {[...Array(12)].map((_, index) => (
            <div
              key={index}
              className={`absolute rounded-full animate-float-ember`}
              style={{
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
                backgroundColor: index % 3 === 0 ? '#ef4444' : index % 3 === 1 ? '#f97316' : '#fbbf24',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
                opacity: 0.3 + Math.random() * 0.4
              }}
            ></div>
          ))}
        </div>

        {/* Fire SVG decoration */}
        <div className="absolute bottom-8 sm:bottom-10 left-1/2 transform -translate-x-1/2 opacity-20">
          <svg width="40" height="40" className="sm:w-[60px] sm:h-[60px]" viewBox="0 0 100 100" fill="none">
            <path 
              d="M50 10 C35 25, 35 40, 45 50 C40 35, 50 30, 55 45 C60 30, 70 35, 65 50 C75 40, 75 25, 60 10 C55 15, 50 10, 50 10 Z" 
              fill="url(#fireGradient404)"
              className="animate-pulse"
            />
            <defs>
              <linearGradient id="fireGradient404" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#dc2626" />
                <stop offset="50%" stopColor="#ea580c" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-ember {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            opacity: 0.3; 
          }
          50% { 
            transform: translateY(-10px) rotate(180deg); 
            opacity: 0.8; 
          }
        }
        .animate-float-ember {
          animation: float-ember 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default NotFound;