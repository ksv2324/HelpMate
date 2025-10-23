import { MapPin, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useLanguage } from '../shared/LanguageContext';
import { Request } from '../../types';

interface RequestListProps {
  requests: Request[];
  acceptedRequests: Set<string>;
  onAccept: (request: Request) => void;
  onOpenChat: (request: Request) => void;
}

export default function RequestList({
  requests,
  acceptedRequests,
  onAccept,
  onOpenChat
}: RequestListProps) {
  const { t } = useLanguage();

  return (
    <div className="px-4 pb-20">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-900">{t.nearbyRequests}</h3>
        <span className="text-gray-500">{requests.length} requests</span>
      </div>
      
      <div className="space-y-4">
        {requests.map((request, index) => {
          const isAccepted = acceptedRequests.has(request.id);
          
          return (
            <motion.div
              key={request.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="relative h-48">
                <ImageWithFallback
                  src={request.image}
                  alt={request.title}
                  className="w-full h-full object-cover"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                  className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full flex items-center gap-1"
                >
                  <MapPin className="w-3 h-3" />
                  {request.distance}
                </motion.div>
              </div>
              
              <div className="p-4">
                <h3 className="text-gray-900 mb-1">{request.title}</h3>
                <p className="text-gray-600 mb-2">
                  by {request.requester || t.anonymous}
                </p>
                <div className="flex items-center gap-1 text-gray-500 mb-3">
                  <MapPin className="w-4 h-4" />
                  <span>{request.location}</span>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">{request.description}</p>
                
                {!isAccepted ? (
                  <Button
                    onClick={() => onAccept(request)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white h-11"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {t.acceptChat}
                  </Button>
                ) : (
                  <Button
                    onClick={() => onOpenChat(request)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white h-11"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Open Chat
                  </Button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
