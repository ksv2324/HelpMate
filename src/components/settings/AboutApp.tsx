import { ArrowLeft, Heart, Users, Globe, Target, Lightbulb, Award } from 'lucide-react';

interface AboutAppProps {
  onBack: () => void;
}

export default function AboutApp({ onBack }: AboutAppProps) {
  return (
    <div className="h-full bg-white flex flex-col w-screen">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 border-b border-gray-200 shadow-sm">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-gray-900">About HelpMate</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {/* App Logo & Version */}
        <div className="p-6 text-center border-b border-gray-200">
          <div className="w-20 h-20 bg-[#4c6ef5] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Heart className="w-11 h-11 text-white" fill="white" />
          </div>
          <h2 className="text-gray-900 mb-1">HelpMate</h2>
          <p className="text-gray-600">Version 1.0.0</p>
        </div>

        {/* Purpose */}
        <div className="px-4 py-6 border-b border-gray-200">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Target className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-gray-900 mb-2">Our Purpose</h3>
              <p className="text-gray-700 leading-relaxed">
                HelpMate connects people who have extra items with those who need them. We believe in building stronger communities through direct, person-to-person sharing.
              </p>
            </div>
          </div>
        </div>

        {/* Why We Built This */}
        <div className="px-4 py-6 border-b border-gray-200">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="text-gray-900 mb-2">Why We Built This</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                We noticed that many people have usable items they no longer need, while others nearby are searching for those exact things. HelpMate bridges this gap by:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#4c6ef5] mt-1">•</span>
                  <span>Reducing waste by giving items a second life</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#4c6ef5] mt-1">•</span>
                  <span>Helping those in need access essentials</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#4c6ef5] mt-1">•</span>
                  <span>Building community connections</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* What It Does */}
        <div className="px-4 py-6 border-b border-gray-200">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Heart className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="text-gray-900 mb-2">What HelpMate Does</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-900 mb-1">For Donors:</p>
                  <p className="text-gray-600">
                    Post items you want to donate, connect with people nearby, and arrange pickups through our chat feature.
                  </p>
                </div>
                <div>
                  <p className="text-gray-900 mb-1">For Recipients:</p>
                  <p className="text-gray-600">
                    Browse available donations within 1-2 km, accept items you need, and coordinate pickup with donors.
                  </p>
                </div>
                <div>
                  <p className="text-gray-900 mb-1">No Money Involved:</p>
                  <p className="text-gray-600">
                    HelpMate is purely about sharing items - food, clothes, books, and more. Everything is free.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="px-4 py-6 border-b border-gray-200">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Award className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h3 className="text-gray-900 mb-2">Our Values</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#4c6ef5] mt-1">•</span>
                  <span><strong>Community First:</strong> Building connections between neighbors</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#4c6ef5] mt-1">•</span>
                  <span><strong>Sustainability:</strong> Reducing waste through sharing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#4c6ef5] mt-1">•</span>
                  <span><strong>Accessibility:</strong> Free for everyone to use</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#4c6ef5] mt-1">•</span>
                  <span><strong>Trust:</strong> Safe, verified interactions</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Impact */}
        <div className="px-4 py-6">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Users className="w-5 h-5 text-pink-600" />
            </div>
            <div>
              <h3 className="text-gray-900 mb-2">Our Impact</h3>
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div className="bg-gradient-to-br from-[#4c6ef5] to-[#7950f2] rounded-xl p-4 text-white shadow-md">
                  <p className="text-3xl mb-1">1,200+</p>
                  <p className="text-white/80">Items Donated</p>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl p-4 text-white shadow-md">
                  <p className="text-3xl mb-1">850+</p>
                  <p className="text-white/80">Active Users</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 pb-6 text-center">
          <p className="text-gray-500">
            © 2024 HelpMate. Made with ❤️ for the community.
          </p>
        </div>
      </div>
    </div>
  );
}
