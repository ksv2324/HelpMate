import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import { ArrowLeft, Upload, MapPin, Globe, Calendar } from 'lucide-react';

interface CreateDonationScreenProps {
  onSubmit: () => void;
  onBack: () => void;
}

export default function CreateDonationScreen({ onSubmit, onBack }: CreateDonationScreenProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [deadline, setDeadline] = useState('');
  const [location, setLocation] = useState('');
  const [isInternational, setIsInternational] = useState(false);
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = () => {
    if (title && description && amount) {
      onSubmit();
    }
  };

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-4 border-b border-gray-200 shadow-sm">
        <div className="flex items-center gap-4 mb-2">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-gray-900">Create Request</h1>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-auto px-6 py-6">
        <div className="space-y-5">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-gray-700">Request Title</Label>
            <Input
              id="title"
              placeholder="e.g., Emergency Food Support"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-12 shadow-sm"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-700">Description</Label>
            <Textarea
              id="description"
              placeholder="Explain what you need and why..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-32 shadow-sm resize-none"
            />
          </div>

          {/* Target Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-gray-700">Target Amount ($)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="h-12 shadow-sm"
            />
          </div>

          {/* Deadline */}
          <div className="space-y-2">
            <Label htmlFor="deadline" className="flex items-center gap-2 text-gray-700">
              <Calendar className="w-4 h-4" />
              Deadline (Optional)
            </Label>
            <Input
              id="deadline"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="h-12 shadow-sm"
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center gap-2 text-gray-700">
              <MapPin className="w-4 h-4" />
              Location
            </Label>
            <Input
              id="location"
              placeholder="Select location on map..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="h-12 shadow-sm"
            />
            <Button
              type="button"
              variant="outline"
              className="w-full"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Choose on Map
            </Button>
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label className="text-gray-700">Photo (Optional)</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-gray-400 transition-colors cursor-pointer">
              <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Tap to upload photo</p>
              <p className="text-gray-500 mt-1">JPG, PNG up to 10MB</p>
            </div>
          </div>

          {/* International Student Section */}
          <div className="border-t border-gray-200 pt-5">
            <div className="flex items-start gap-3 mb-4">
              <Checkbox
                id="international"
                checked={isInternational}
                onCheckedChange={(checked) => setIsInternational(checked as boolean)}
                className="mt-1"
              />
              <div>
                <label htmlFor="international" className="text-gray-900 cursor-pointer flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  I am an international student
                </label>
                <p className="text-gray-500 mt-1">
                  Access additional support and verification options
                </p>
              </div>
            </div>

            {isInternational && (
              <div className="bg-blue-50 rounded-xl p-4 space-y-3 border border-blue-200">
                <p className="text-gray-700">Additional international student options:</p>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Student ID
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  Add Embassy Contact
                </Button>
                <p className="text-gray-600">
                  Translation services available for your request
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="px-6 py-4 border-t border-gray-200 bg-white">
        <Button
          onClick={handleSubmit}
          disabled={!title || !description || !amount}
          className="w-full bg-[#4c6ef5] hover:bg-[#4263eb] text-white h-14 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit Request
        </Button>
      </div>
    </div>
  );
}
