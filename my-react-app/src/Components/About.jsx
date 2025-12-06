import React from 'react';
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const About = () => {
  return (
    <section className="py-12 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* About Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* About IRCTC */}
          <div>
            <h3 className="text-2xl font-bold mb-4">About IRCTC</h3>
            <p className="text-gray-300 leading-relaxed">
             Your trusted platform for secure, fast, and reliable train ticket booking.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Our Services</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:text-yellow-500 cursor-pointer">• Train Bookings</li>
              <li className="hover:text-yellow-500 cursor-pointer">• PNR status checking</li>
              <li className="hover:text-yellow-500 cursor-pointer">• Train schedule</li>
              <li className="hover:text-yellow-500 cursor-pointer">• Seat availability</li>
              <li className="hover:text-yellow-500 cursor-pointer">• Ticket cancellations</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone size={20} className="text-yellow-500" />
                <a href="tel:+911800111111" className="text-gray-300 hover:text-yellow-500">+835601915</a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={20} className="text-yellow-500" />
                <a href="mailto:support@irctc.co.in" className="text-gray-300 hover:text-yellow-500">support@irctc.co.in</a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin size={20} className="text-yellow-500 mt-1" />
                <span className="text-gray-300">Pune, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer is rendered globally via the shared Footer component. */}
      </div>
    </section>
  );
};

export default About;
