import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = [
    {
    question: 'How can I book a train ticket on IRCTC?',
    answer: 'You can book train tickets through the IRCTC website or mobile app. Log in, enter your source and destination, select the train, choose your class, and proceed to payment.'
  },
  {
    question: 'What are the available payment options for train booking?',
    answer: 'IRCTC supports various payment methods including Net Banking, UPI, Credit/Debit Cards, e-Wallets, and IRCTC Pay.'
  },
  {
    question: 'How can I check train availability and fare?',
    answer: 'Go to the Train Ticket Booking section, enter your travel details, and IRCTC will show train availability, seat status, and fare.'
  },
  {
    question: 'Can I cancel my train ticket after booking?',
    answer: 'Yes, you can cancel your ticket online. Navigate to My Bookings, select your ticket, and choose the Cancel option. Cancellation charges may apply.'
  }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">FAQ</h2>
        
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 bg-gray-50 hover:bg-gray-100 flex justify-between items-center transition"
              >
                <span className="text-left font-semibold text-gray-800">{item.question}</span>
                <ChevronDown
                  size={20}
                  className={`text-gray-600 transition-transform flex-shrink-0 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="px-6 py-4 bg-white border-t border-gray-200">
                  <p className="text-gray-700">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="text-blue-600 hover:text-blue-800 font-semibold">
            
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
