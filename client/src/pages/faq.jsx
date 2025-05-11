import React, { useState } from 'react';

const FAQ = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "How do I get started as a creator?",
      answer: "To get started, create your account, verify your social media profiles, and start browsing available deals. Make sure to complete your profile with your niche, audience demographics, and previous work examples."
    },
    {
      id: 2,
      question: "What are the requirements for applying to deals?",
      answer: "Each deal has specific requirements set by the brand, including minimum follower count, engagement rate, and content type. You'll only be able to apply to deals where you meet these criteria."
    },
    {
      id: 3,
      question: "How does the payment process work?",
      answer: "Payments are processed securely through our platform. Once you complete the deliverables and the brand approves your content, payment will be released to your account within 5-7 business days."
    },
    {
      id: 4,
      question: "How do brands verify my reach and engagement?",
      answer: "When you connect your social media accounts, we automatically verify your follower count and engagement rates. Brands can see these verified metrics when reviewing your application."
    },
    {
      id: 5,
      question: "What happens after I apply for a deal?",
      answer: "After applying, the brand will review your profile and application. If selected, you'll receive a notification and can begin discussing the collaboration details through our platform."
    },
    {
      id: 6,
      question: "Can I negotiate deal terms?",
      answer: "Yes, once a brand shows interest in working with you, you can discuss and negotiate terms through our built-in messaging system before accepting the deal."
    }
  ];

  return (
    <div className="min-h-[calc(85vh-4rem)] bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-600">
            Everything you need to know about Creator Collab
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-2">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between"
                onClick={() => setOpenQuestion(openQuestion === faq.id ? null : faq.id)}
              >
                <span className="font-medium text-gray-900">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-gray-500 transform transition-transform ${
                    openQuestion === faq.id ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openQuestion === faq.id && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Still have questions?{' '}
            <button className="text-rose-500 font-medium hover:text-rose-600">
              Contact Support
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;