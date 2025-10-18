import { ArrowLeft, Send, MapPin, Navigation, Heart } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useLanguage } from '../shared/LanguageContext';
import { useChat } from '../../hooks/useChat';
import { Donation, Request } from '../../types';

interface ChatBoxProps {
  item: Donation | Request;
  type: 'donation' | 'request';
  onClose: () => void;
}

export default function ChatBox({ item, type, onClose }: ChatBoxProps) {
  const { t } = useLanguage();
  const { messages, newMessage, setNewMessage, handleSend } = useChat();

  const userName = type === 'donation' 
    ? ('donor' in item ? item.donor : '') || t.anonymous
    : ('requester' in item ? item.requester : '') || t.anonymous;

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-4 py-4 flex items-center gap-3">
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div className="flex-1">
            <h3 className="text-gray-900">{userName}</h3>
            <div className="flex items-center gap-1 text-gray-500">
              <MapPin className="w-3 h-3" />
              <span>{item.distance} away</span>
            </div>
          </div>
        </div>

        {/* Item Info */}
        <div className="px-4 pb-3">
          <div className="bg-gray-50 rounded-xl p-3 flex gap-3">
            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
              <ImageWithFallback
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-gray-900">{item.title}</p>
              <p className="text-gray-500 truncate">{item.location}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-auto px-4 py-4 bg-gray-50">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[75%]`}>
                <div
                  className={`rounded-2xl px-4 py-2 ${
                    message.sender === 'me'
                      ? 'bg-[#4c6ef5] text-white'
                      : 'bg-white text-gray-900 shadow-sm'
                  }`}
                >
                  <p>{message.text}</p>
                </div>
                <p className={`text-gray-400 mt-1 px-2 ${message.sender === 'me' ? 'text-right' : 'text-left'}`}>
                  {message.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 py-3 border-t border-gray-200 bg-white">
        <div className="grid grid-cols-2 gap-2 mb-3">
          <Button
            variant="outline"
            className="h-11 flex items-center justify-center gap-2"
          >
            <Heart className="w-4 h-4" />
            {t.viewDetails}
          </Button>
          <Button
            className="h-11 flex items-center justify-center gap-2 bg-[#4c6ef5] hover:bg-[#4263eb] text-white"
          >
            <Navigation className="w-4 h-4" />
            {t.getDirections}
          </Button>
        </div>
      </div>

      {/* Input */}
      <div className="px-4 pb-4 bg-white">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Type a message..."
            className="flex-1 h-11"
          />
          <Button
            onClick={handleSend}
            disabled={!newMessage.trim()}
            className="bg-[#4c6ef5] hover:bg-[#4263eb] text-white px-4"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
