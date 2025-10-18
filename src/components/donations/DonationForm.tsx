import { X, MapPin, Upload } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { useLanguage } from '../shared/LanguageContext';
import { useForm } from '../../hooks/useForm';

interface DonationFormProps {
  onClose: () => void;
  onSubmit?: (data: { title: string; donorName: string; description: string; location: string }) => void;
}

export default function DonationForm({ onClose, onSubmit }: DonationFormProps) {
  const { t } = useLanguage();
  const { values, handleChange } = useForm({
    title: '',
    donorName: '',
    description: '',
    location: ''
  });

  const handleSubmitForm = () => {
    if (onSubmit) {
      onSubmit(values);
    }
    onClose();
  };

  const isValid = values.title && values.description && values.location;

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header */}
      <div className="px-4 py-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-gray-900">{t.addDonation}</h2>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-auto px-4 py-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="item-image">Item Photo</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-gray-400 transition-colors cursor-pointer">
              <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Tap to upload photo</p>
              <p className="text-gray-500 mt-1">JPG, PNG up to 10MB</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Item Title</Label>
            <Input
              id="title"
              placeholder="e.g., Fresh Vegetables, Winter Clothes"
              value={values.title}
              onChange={handleChange('title')}
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="donor-name">{t.name} (Optional)</Label>
            <Input
              id="donor-name"
              placeholder="Leave empty to remain anonymous"
              value={values.donorName}
              onChange={handleChange('donorName')}
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the items you want to donate..."
              value={values.description}
              onChange={handleChange('description')}
              className="min-h-24 resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">
              <MapPin className="w-4 h-4 inline mr-1" />
              Pickup {t.location}
            </Label>
            <Input
              id="location"
              placeholder="Enter your location"
              value={values.location}
              onChange={handleChange('location')}
              className="h-12"
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-gray-700">
              <strong>Note:</strong> People in need within 1-2 km will be able to see your donation and contact you for pickup.
            </p>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="px-4 py-4 border-t border-gray-200">
        <Button
          onClick={handleSubmitForm}
          disabled={!isValid}
          className="w-full bg-[#4c6ef5] hover:bg-[#4263eb] text-white h-12 disabled:opacity-50"
        >
          Post {t.donation}
        </Button>
      </div>
    </div>
  );
}
