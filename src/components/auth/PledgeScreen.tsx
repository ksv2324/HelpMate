import { useState } from 'react';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Shield, Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface PledgeScreenProps {
  onAccept: () => void;
}

export default function PledgeScreen({ onAccept }: PledgeScreenProps) {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="h-full bg-white flex flex-col overflow-hidden">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="pt-12 pb-8 px-6">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-[#4c6ef5] rounded-full flex items-center justify-center shadow-md">
              <Shield className="w-11 h-11 text-white" />
            </div>
          </div>
          <h1 className="text-center text-gray-900 mb-2">Community Integrity Pledge</h1>
          <p className="text-center text-gray-600">Help us maintain a safe and honest community</p>
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          <div className="bg-gray-50 rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="space-y-4">
              <h3 className="text-gray-900">I pledge to:</h3>
              
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#4c6ef5] rounded-full mt-2 flex-shrink-0" />
                  <span>Use HelpMate honestly and transparently</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#4c6ef5] rounded-full mt-2 flex-shrink-0" />
                  <span>Provide accurate information in all donation requests</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#4c6ef5] rounded-full mt-2 flex-shrink-0" />
                  <span>Respect all community members and their contributions</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-[#4c6ef5] rounded-full mt-2 flex-shrink-0" />
                  <span>Report any misuse or fraudulent activity</span>
                </li>
              </ul>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-start gap-2">
                  <Info className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-600">
                    Misuse of this platform, including fraudulent requests or harassment, may result in account suspension and legal action.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Acceptance checkbox */}
          <div className="mt-6 flex items-start gap-3">
            <Checkbox
              id="accept"
              checked={accepted}
              onCheckedChange={(checked) => setAccepted(checked as boolean)}
              className="mt-1"
            />
            <label htmlFor="accept" className="text-gray-700 cursor-pointer">
              I have read and agree to the Community Integrity Pledge and understand the consequences of misuse
            </label>
          </div>
        </div>
      </div>

      {/* Accept Button - Fixed at bottom */}
      <div className="px-6 py-4 bg-white border-t border-gray-200 shadow-lg">
        <Button
          onClick={onAccept}
          disabled={!accepted}
          className="w-full bg-[#4c6ef5] hover:bg-[#4263eb] text-white h-14 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          I Accept
        </Button>
      </div>
    </div>
  );
}
