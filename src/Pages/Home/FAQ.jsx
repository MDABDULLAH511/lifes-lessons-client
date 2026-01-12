import React, { useState } from "react";
import Container from "../../Components/Container";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I share my life lesson?",
      answer:
        "Simply create an account, navigate to the dashboard, and click 'Add Lesson'. Share your story, what you learned, and how it impacted you.",
    },
    {
      question: "Are the lessons moderated?",
      answer:
        "Yes, all lessons are reviewed by our community moderators to ensure they are respectful and valuable to readers.",
    },
    {
      question: "Can I save lessons for later?",
      answer:
        "Absolutely! Use the heart icon on any lesson to add it to your favorites. Access them anytime from your dashboard.",
    },
    {
      question: "Is the platform free to use?",
      answer:
        "Basic features are free. We offer premium memberships for enhanced features like advanced analytics and priority support.",
    },
    {
      question: "How can I report inappropriate content?",
      answer:
        "Use the report button on any lesson or comment. Our team reviews reports within 24 hours.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Container>
      <section className="py-10 md:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-bold text-2xl md:text-4xl mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600">
              Got questions? We've got answers. If you don't find what you're
              looking for, feel free to contact us.
            </p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
                >
                  <h3 className="font-semibold text-lg">{faq.question}</h3>
                  {openIndex === index ? <FiChevronUp /> : <FiChevronDown />}
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </Container>
  );
};

export default FAQ;
