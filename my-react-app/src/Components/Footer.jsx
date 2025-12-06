import React from 'react';
import { Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-12 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <hr className="border-gray-700 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            <p>© {new Date().getFullYear()} Indian Railway Catering and Tourism Corporation Ltd. All rights reserved.</p>
          </div>

          
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm text-gray-400">
            <a href="#" className="hover:text-yellow-500">Privacy Policy</a>
            <a href="#" className="hover:text-yellow-500">Terms &amp; Conditions</a>
            <a href="#" className="hover:text-yellow-500">Site Map</a>
            <a href="#" className="hover:text-yellow-500">FAQs</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
