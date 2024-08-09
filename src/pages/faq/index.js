import { useState } from 'react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: 'What is the purpose of this FAQ section?',
      answer: 'This FAQ section is designed to answer the most common questions from our users to help them understand our service better. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac nisl ac sem dapibus tincidunt sed et erat. Pellentesque in sem elit. Aliquam felis justo, pulvinar in urna sed, euismod placerat tortor. Phasellus id massa nec urna euismod maximus eget nec nibh. Donec volutpat euismod semper. Etiam non massa scelerisque, varius ante ut, pretium tellus. In pharetra at ligula nec fringilla.',
    },
    {
      question: 'How can I contact support?',
      answer: 'You can contact support via our contact form or by emailing support@example.com. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac nisl ac sem dapibus tincidunt sed et erat. Pellentesque in sem elit. Aliquam felis justo, pulvinar in urna sed, euismod placerat tortor. Phasellus id massa nec urna euismod maximus eget nec nibh. Donec volutpat euismod semper. Etiam non massa scelerisque, varius ante ut, pretium tellus. In pharetra at ligula nec fringilla.',
    },
    {
      question: 'What is the purpose of this section?',
      answer: 'This FAQ section is designed to answer the most common questions from our users to help them understand our service better. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac nisl ac sem dapibus tincidunt sed et erat. Pellentesque in sem elit. Aliquam felis justo, pulvinar in urna sed, euismod placerat tortor. Phasellus id massa nec urna euismod maximus eget nec nibh. Donec volutpat euismod semper. Etiam non massa scelerisque, varius ante ut, pretium tellus. In pharetra at ligula nec fringilla.',
    },
    {
      question: 'How can I contact you?',
      answer: 'You can contact support via our contact form or by emailing support@example.com. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac nisl ac sem dapibus tincidunt sed et erat. Pellentesque in sem elit. Aliquam felis justo, pulvinar in urna sed, euismod placerat tortor. Phasellus id massa nec urna euismod maximus eget nec nibh. Donec volutpat euismod semper. Etiam non massa scelerisque, varius ante ut, pretium tellus. In pharetra at ligula nec fringilla.',
    },
    // Add more FAQ items here
  ];

  return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="mb-6">Here you will find answers to the most common questions.</p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-300 rounded-md bg-white shadow-sm overflow-hidden">
              <button onClick={() => toggleAccordion(index)} className="w-full text-left px-4 py-2 font-semibold text-gray-800 bg-gray-100 hover:bg-gray-200">
                {faq.question}
              </button>
              <div className={`transition-max-height duration-300 ease-in-out overflow-hidden px-4 text-gray-600 ${activeIndex === index ? ' py-2 max-h-screen' : 'max-h-0'}`}>
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
  );
};

export default FAQ;
