import React, { useState } from 'react';
import './FAQ.css';

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
    <section className="faq-section">
      <div className="faq-container">
        <h2 className="faq-title">FAQ</h2>
        
        <div className="faq-list">
          {faqData.map((item, index) => (
            <div key={index} className="faq-item">
              <button
                onClick={() => toggleFAQ(index)}
                className="faq-question-btn"
              >
                <span className="faq-question-text">{item.question}</span>
                <span
                  className={`faq-chevron ${
                    openIndex === index ? 'faq-chevron-rotated' : ''
                  }`}
                >
                  ▼
                </span>
              </button>

              {openIndex === index && (
                <div className="faq-answer">
                  <p className="faq-answer-text">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="faq-footer">
          <button className="faq-footer-btn">
            
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;

