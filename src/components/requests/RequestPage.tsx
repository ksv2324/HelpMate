import { useState } from 'react';
import { Plus } from 'lucide-react';
import { ChatBox } from '../chat';
import RequestList from './RequestList';
import RequestForm from './RequestForm';
import { useLanguage } from '../shared/LanguageContext';
import { ScreenContainer } from '../shared';
import { REQUESTS } from '../../constants/requests';
import { Request } from '../../types';

export default function RequestPage() {
  const [showAddRequest, setShowAddRequest] = useState(false);
  const [acceptedRequests, setAcceptedRequests] = useState<Set<string>>(new Set());
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const { t } = useLanguage();

  const handleAccept = (request: Request) => {
    setAcceptedRequests(new Set([...acceptedRequests, request.id]));
    setSelectedRequest(request);
  };

  const handleSubmitRequest = (data: { title: string; requesterName: string; description: string; location: string }) => {
    // TODO: Add API call to submit request
    console.log('Submitting request:', data);
  };

  if (selectedRequest) {
    return (
      <ChatBox 
        item={selectedRequest} 
        type="request"
        onClose={() => setSelectedRequest(null)} 
      />
    );
  }

  if (showAddRequest) {
    return (
      <RequestForm 
        onClose={() => setShowAddRequest(false)}
        onSubmit={handleSubmitRequest}
      />
    );
  }

  return (
    <ScreenContainer className="bg-gray-50">
      {/* Content */}
      <div className="flex-1 overflow-auto min-w-0">
        {/* Info Box */}
        <div className="p-4">
          <div className="bg-linear-to-r from-green-500 to-emerald-500 rounded-2xl p-4 text-white shadow-md">
            <h3 className="mb-1">{t.nearbyRequests}</h3>
            <p className="text-white/90">
              Help people nearby by donating what they need. Accept to unlock chat.
            </p>
          </div>
        </div>

        <RequestList
          requests={REQUESTS}
          acceptedRequests={acceptedRequests}
          onAccept={handleAccept}
          onOpenChat={setSelectedRequest}
        />
      </div>

      {/* Floating Add Button */}
      <button
        onClick={() => setShowAddRequest(true)}
        className="absolute bottom-6 right-6 w-14 h-14 bg-green-600 rounded-full flex items-center justify-center shadow-lg hover:bg-green-700 transition-colors"
      >
        <Plus className="w-7 h-7 text-white" />
      </button>
    </ScreenContainer>
  );
}
