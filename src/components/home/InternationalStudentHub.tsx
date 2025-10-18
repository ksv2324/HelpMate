import { ArrowLeft, Globe, CheckCircle, Upload, Phone, BookOpen, DollarSign, MapPin } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface InternationalStudentHubProps {
  onBack: () => void;
}

export default function InternationalStudentHub({ onBack }: InternationalStudentHubProps) {
  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#7950f2] to-[#4c6ef5] px-6 pt-12 pb-6 text-white shadow-md">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex items-center gap-2">
            <Globe className="w-6 h-6" />
            <h1>International Student Hub</h1>
          </div>
        </div>
        <p className="text-white/90">
          Special support and resources for international students
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-6 py-6">
        {/* Verification Status */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-6 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900 mb-1">Verification Status</h3>
              <p className="text-gray-600 mb-3">
                Your international student status is verified
              </p>
              <Badge className="bg-green-500 text-white border-0">
                Verified Student
              </Badge>
            </div>
          </div>
        </div>

        {/* Language & Currency */}
        <div className="mb-6">
          <h3 className="text-gray-900 mb-4">Preferences</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-gray-700">Display Language</label>
              <Select defaultValue="en">
                <SelectTrigger className="h-12 shadow-sm">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="ar">العربية</SelectItem>
                  <SelectItem value="zh">中文</SelectItem>
                  <SelectItem value="hi">हिन्दी</SelectItem>
                  <SelectItem value="pt">Português</SelectItem>
                  <SelectItem value="ja">日本語</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-gray-700">Preferred Currency</label>
              <Select defaultValue="usd">
                <SelectTrigger className="h-12 shadow-sm">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usd">USD ($)</SelectItem>
                  <SelectItem value="eur">EUR (€)</SelectItem>
                  <SelectItem value="gbp">GBP (£)</SelectItem>
                  <SelectItem value="jpy">JPY (¥)</SelectItem>
                  <SelectItem value="cny">CNY (¥)</SelectItem>
                  <SelectItem value="inr">INR (₹)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Verification Checklist */}
        <div className="mb-6">
          <h3 className="text-gray-900 mb-4">Verification Documents</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between bg-green-50 rounded-xl p-4 border border-green-200 shadow-sm">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-gray-900">Student ID</span>
              </div>
              <Badge className="bg-green-500 text-white border-0">Verified</Badge>
            </div>
            <div className="flex items-center justify-between bg-green-50 rounded-xl p-4 border border-green-200 shadow-sm">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-gray-900">Visa Documentation</span>
              </div>
              <Badge className="bg-green-500 text-white border-0">Verified</Badge>
            </div>
            <button className="w-full flex items-center justify-between bg-gray-50 rounded-xl p-4 border border-gray-200 hover:bg-gray-100 transition-colors shadow-sm">
              <div className="flex items-center gap-3">
                <Upload className="w-5 h-5 text-gray-600" />
                <span className="text-gray-900">Embassy Contact (Optional)</span>
              </div>
              <Badge variant="outline">Add</Badge>
            </button>
          </div>
        </div>

        {/* Resources */}
        <div className="mb-6">
          <h3 className="text-gray-900 mb-4">Support Resources</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center gap-3 bg-gray-50 rounded-xl p-4 border border-gray-200 hover:bg-gray-100 transition-colors shadow-sm text-left">
              <div className="w-10 h-10 bg-[#4c6ef5] rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-gray-900">24/7 Support Hotline</p>
                <p className="text-gray-600">Get help in your language</p>
              </div>
            </button>
            <button className="w-full flex items-center gap-3 bg-gray-50 rounded-xl p-4 border border-gray-200 hover:bg-gray-100 transition-colors shadow-sm text-left">
              <div className="w-10 h-10 bg-[#7950f2] rounded-full flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-gray-900">Resource Library</p>
                <p className="text-gray-600">Guides and FAQs for international students</p>
              </div>
            </button>
            <button className="w-full flex items-center gap-3 bg-gray-50 rounded-xl p-4 border border-gray-200 hover:bg-gray-100 transition-colors shadow-sm text-left">
              <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-gray-900">Financial Aid Resources</p>
                <p className="text-gray-600">Scholarships and emergency funds</p>
              </div>
            </button>
            <button className="w-full flex items-center gap-3 bg-gray-50 rounded-xl p-4 border border-gray-200 hover:bg-gray-100 transition-colors shadow-sm text-left">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-gray-900">Nearby Support Centers</p>
                <p className="text-gray-600">Find help near your location</p>
              </div>
            </button>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6">
          <h3 className="text-gray-900 mb-2">Translation Services</h3>
          <p className="text-gray-600 mb-3">
            All donation requests can be automatically translated to your preferred language. Donors can also see translations of your requests.
          </p>
          <Button variant="outline" className="w-full">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
}
