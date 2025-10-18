import { useState } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { ArrowLeft, MapPin, Clock, Award, Share2, Globe, Heart } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface DonationDetailsScreenProps {
  donationId: string;
  onBack: () => void;
}

const donationData: { [key: string]: any } = {
  '1': {
    title: 'Emergency Food Support',
    description: 'Single parent needing groceries for the week. Any help is appreciated. I recently lost my job and need support to feed my two children while I search for new employment.',
    target: 150,
    collected: 95,
    eta: '2 days left',
    isInternational: false,
    bonusPoints: 50,
    image: 'https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwZG9uYXRpb258ZW58MXx8fHwxNzYwNjg3MjA2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    location: '1.2 km away',
    donors: [
      { name: 'Sarah M.', amount: 25, avatar: 'SM' },
      { name: 'John D.', amount: 30, avatar: 'JD' },
      { name: 'Emily R.', amount: 20, avatar: 'ER' },
      { name: 'Michael B.', amount: 20, avatar: 'MB' }
    ]
  },
  '2': {
    title: 'Textbooks for Engineering Student',
    description: 'International student needs required textbooks for this semester. As an international student, textbooks are very expensive here and I need help covering the costs.',
    target: 300,
    collected: 120,
    eta: '5 days left',
    isInternational: true,
    bonusPoints: 75,
    image: 'https://images.unsplash.com/photo-1514369118554-e20d93546b30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwc3R1ZHlpbmd8ZW58MXx8fHwxNzYwNjk0MTI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    location: '3.5 km away',
    donors: [
      { name: 'David L.', amount: 50, avatar: 'DL' },
      { name: 'Anna K.', amount: 40, avatar: 'AK' },
      { name: 'Robert W.', amount: 30, avatar: 'RW' }
    ]
  }
};

export default function DonationDetailsScreen({ donationId, onBack }: DonationDetailsScreenProps) {
  const [donateAmount, setDonateAmount] = useState('');
  const [showDonateDialog, setShowDonateDialog] = useState(false);
  
  const donation = donationData[donationId] || donationData['1'];
  const progress = (donation.collected / donation.target) * 100;

  const handleDonate = () => {
    setShowDonateDialog(false);
    setDonateAmount('');
    // In a real app, process the donation here
  };

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header Image */}
      <div className="relative">
        <ImageWithFallback
          src={donation.image}
          alt={donation.title}
          className="w-full h-64 object-cover"
        />
        <button
          onClick={onBack}
          className="absolute top-6 left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <button
          className="absolute top-6 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
        >
          <Share2 className="w-5 h-5 text-gray-700" />
        </button>
        {donation.isInternational && (
          <Badge className="absolute bottom-4 right-4 bg-[#7950f2] text-white border-0 shadow-md">
            <Globe className="w-3 h-3 mr-1" />
            International Student
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <div className="px-6 py-6">
          {/* Title */}
          <h1 className="text-gray-900 mb-3">{donation.title}</h1>

          {/* Meta Info */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1 text-gray-500">
              <MapPin className="w-4 h-4" />
              <span>{donation.location}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500">
              <Clock className="w-4 h-4" />
              <span>{donation.eta}</span>
            </div>
          </div>

          {/* Progress Card */}
          <div className="bg-gray-50 rounded-2xl p-5 mb-6 shadow-sm border border-gray-200">
            <div className="flex justify-between mb-3">
              <div>
                <p className="text-gray-500 mb-1">Raised</p>
                <p className="text-gray-900 text-2xl">${donation.collected}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-500 mb-1">Goal</p>
                <p className="text-gray-700 text-2xl">${donation.target}</p>
              </div>
            </div>
            <Progress value={progress} className="h-3 mb-3" />
            <p className="text-gray-600 text-center">{Math.round(progress)}% funded</p>
          </div>

          {/* Bonus Points Badge */}
          <div className="bg-gradient-to-r from-[#4c6ef5] to-[#7950f2] rounded-xl p-4 mb-6 shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Award className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-white/80">Donate to earn</p>
                <p className="text-white text-xl">+{donation.bonusPoints} bonus points</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-gray-900 mb-2">About this request</h3>
            <p className="text-gray-700 leading-relaxed">{donation.description}</p>
          </div>

          {/* Donors */}
          <div className="mb-6">
            <h3 className="text-gray-900 mb-4">Recent Donors ({donation.donors.length})</h3>
            <div className="space-y-3">
              {donation.donors.map((donor: any, index: number) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 rounded-xl p-3 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#4c6ef5] rounded-full flex items-center justify-center text-white">
                      {donor.avatar}
                    </div>
                    <span className="text-gray-900">{donor.name}</span>
                  </div>
                  <span className="text-gray-700">${donor.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Donate Button */}
      <div className="px-6 py-4 border-t border-gray-200 bg-white">
        <Dialog open={showDonateDialog} onOpenChange={setShowDonateDialog}>
          <DialogTrigger asChild>
            <Button className="w-full bg-[#4c6ef5] hover:bg-[#4263eb] text-white h-14 shadow-md">
              <Heart className="w-5 h-5 mr-2" />
              Donate Now
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Make a Donation</DialogTitle>
              <DialogDescription>
                Your donation will help {donation.title.toLowerCase()}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="donate-amount">Amount ($)</Label>
                <Input
                  id="donate-amount"
                  type="number"
                  placeholder="0.00"
                  value={donateAmount}
                  onChange={(e) => setDonateAmount(e.target.value)}
                  className="h-12"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDonateAmount('10')}
                  className="flex-1"
                >
                  $10
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDonateAmount('25')}
                  className="flex-1"
                >
                  $25
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDonateAmount('50')}
                  className="flex-1"
                >
                  $50
                </Button>
              </div>
              <Button
                onClick={handleDonate}
                disabled={!donateAmount || parseFloat(donateAmount) <= 0}
                className="w-full bg-[#4c6ef5] hover:bg-[#4263eb] text-white h-12"
              >
                Confirm Donation
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
