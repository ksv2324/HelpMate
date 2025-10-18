import { useState } from 'react';
import { Message } from '../types';

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    sender: 'them',
    text: 'Hello! Thank you for accepting.',
    time: '10:30 AM'
  },
  {
    id: '2',
    sender: 'me',
    text: 'Happy to help! When would be a good time?',
    time: '10:32 AM'
  }
];

export const useChat = (initialMessages: Message[] = INITIAL_MESSAGES) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: String(messages.length + 1),
        sender: 'me',
        text: newMessage,
        time: new Date().toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  return {
    messages,
    newMessage,
    setNewMessage,
    handleSend
  };
};
