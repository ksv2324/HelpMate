import { useState } from 'react';
import { ArrowLeft, Search, HelpCircle, MessageCircle, Mail, Phone, ChevronRight } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface HelpSupportProps {
  onBack: () => void;
}

const faqItems = [
  {
    id: '1',
    question: 'How do I donate items?',
    answer: 'Go to the Donation tab and tap the + button to add your donation.'
  },
  {
    id: '2',
    question: 'How do I accept a donation?',
    answer: 'Browse donations, tap "Accept & Chat" to connect with the donor.'
  },
  {
    id: '3',
    question: 'What items can I donate?',
    answer: 'You can donate food, clothes, groceries, books, and household items.'
  },
  {
    id: '4',
    question: 'How does the distance work?',
    answer: 'We show donations within 1-2 km of your location for convenience.'
  },
  {
    id: '5',
    question: 'Is Hand-to-Hand free to use?',
    answer: 'Yes! Hand-to-Hand is completely free for everyone.'
  },
  {
    id: '6',
    question: 'How do I change my location?',
    answer: 'Go to Account Settings and update your location field.'
  }
];

export default function HelpSupport({ onBack }: HelpSupportProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFaq, setSelectedFaq] = useState<string | null>(null);

  const filteredFaqs = faqItems.filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 border-b border-gray-200 shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-gray-900">Help & Support</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
        </div>

        {/* FAQs */}
        <div className="px-4 mb-6">
          <h3 className="text-gray-900 mb-4">Frequently Asked Questions</h3>
          <div className="space-y-2">
            {filteredFaqs.map((faq) => (
              <div key={faq.id} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setSelectedFaq(selectedFaq === faq.id ? null : faq.id)}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="flex items-start gap-3 flex-1">
                    <HelpCircle className="w-5 h-5 text-[#4c6ef5] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-900">{faq.question}</span>
                  </div>
                  <ChevronRight 
                    className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${
                      selectedFaq === faq.id ? 'rotate-90' : ''
                    }`} 
                  />
                </button>
                {selectedFaq === faq.id && (
                  <div className="px-4 pb-4 pl-12">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="px-4 pb-6">
          <h3 className="text-gray-900 mb-4">Contact Support</h3>
          <div className="space-y-3">
            <Button variant="outline" className="w-full h-12 justify-start">
              <MessageCircle className="w-5 h-5 mr-3 text-gray-600" />
              Chat with Support
            </Button>
            <Button variant="outline" className="w-full h-12 justify-start">
              <Mail className="w-5 h-5 mr-3 text-gray-600" />
              Email Support
            </Button>
            <Button variant="outline" className="w-full h-12 justify-start">
              <Phone className="w-5 h-5 mr-3 text-gray-600" />
              Call Support
            </Button>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mt-4">
            <h4 className="text-gray-900 mb-2">Support Hours</h4>
            <p className="text-gray-700">
              Our support team is available Monday to Friday, 9 AM - 6 PM IST
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
