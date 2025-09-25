import { FileText, Users, Shield, AlertCircle, CheckCircle, Scale } from 'lucide-react'

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-8">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24">
              <img
                src="/images/JSG_SPARSH.jpeg"
                alt="JSG SPARSH Pune Logo"
                className="w-full h-full object-contain rounded-2xl shadow-lg"
              />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Terms & Conditions</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Guidelines for our community members and service users
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Introduction */}
          <div className="text-center mb-16">
            <div className="bg-gradient-to-r from-blue-50 to-yellow-50 p-8 rounded-3xl shadow-md border border-blue-200">
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                Welcome to JSG SPARSH Pune. These Terms and Conditions govern your use of our services, 
                participation in our community, and attendance at our events. By becoming a member or 
                participating in our activities, you agree to comply with these terms.
              </p>
              <div className="text-sm text-gray-600">
                <strong>Last Updated:</strong> December 2024
              </div>
            </div>
          </div>

          {/* Membership */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8 mb-8">
            <div className="flex items-center mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl mr-4">
                <Users className="text-white" size={20} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Membership and Registration</h2>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-gray-600 leading-relaxed">Membership is open to all individuals who align with our community values and principles</p>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-gray-600 leading-relaxed">Members must provide accurate and complete information during registration</p>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-gray-600 leading-relaxed">Members are responsible for maintaining the confidentiality of their account information</p>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-gray-600 leading-relaxed">JSG SPARSH Pune reserves the right to verify membership eligibility</p>
              </li>
            </ul>
          </div>

          {/* Acceptable Use */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8 mb-8">
            <div className="flex items-center mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl mr-4">
                <CheckCircle className="text-white" size={20} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Acceptable Use</h2>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-gray-600 leading-relaxed">Use our services in accordance with applicable laws and regulations</p>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-gray-600 leading-relaxed">Respect the rights and dignity of all community members</p>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-gray-600 leading-relaxed">Do not engage in any activity that could harm our community or reputation</p>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-gray-600 leading-relaxed">Participate constructively in community events and discussions</p>
              </li>
            </ul>
          </div>

          {/* Privacy */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8 mb-8">
            <div className="flex items-center mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl mr-4">
                <Shield className="text-white" size={20} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Privacy and Data Protection</h2>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-gray-600 leading-relaxed">Your personal information will be handled in accordance with our Privacy Policy</p>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-gray-600 leading-relaxed">We implement appropriate security measures to protect your data</p>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-gray-600 leading-relaxed">You have the right to access, correct, or delete your personal information</p>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-gray-600 leading-relaxed">We will not share your information without your consent, except as legally required</p>
              </li>
            </ul>
          </div>

          {/* Member Responsibilities */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 border border-yellow-200 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Member Responsibilities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-bold text-yellow-800 mb-4">Community Guidelines</h3>
                <ul className="space-y-2">
                  <li className="flex items-start text-sm">
                    <CheckCircle className="text-yellow-600 mt-0.5 mr-2 flex-shrink-0" size={16} />
                    <span className="text-gray-700">Respect all members regardless of their Jain sect affiliation</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <CheckCircle className="text-yellow-600 mt-0.5 mr-2 flex-shrink-0" size={16} />
                    <span className="text-gray-700">Participate actively and positively in community activities</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <CheckCircle className="text-yellow-600 mt-0.5 mr-2 flex-shrink-0" size={16} />
                    <span className="text-gray-700">Support the mission and values of JSG SPARSH Pune</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold text-yellow-800 mb-4">Event Participation</h3>
                <ul className="space-y-2">
                  <li className="flex items-start text-sm">
                    <CheckCircle className="text-yellow-600 mt-0.5 mr-2 flex-shrink-0" size={16} />
                    <span className="text-gray-700">Register for events in a timely manner</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <CheckCircle className="text-yellow-600 mt-0.5 mr-2 flex-shrink-0" size={16} />
                    <span className="text-gray-700">Attend events you have committed to attending</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <CheckCircle className="text-yellow-600 mt-0.5 mr-2 flex-shrink-0" size={16} />
                    <span className="text-gray-700">Follow all safety guidelines during events</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Liability */}
          <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-8 border border-red-200 mb-8">
            <div className="flex items-center mb-4">
              <AlertCircle className="text-red-600 mr-3" size={24} />
              <h3 className="text-xl font-bold text-gray-800">Limitation of Liability</h3>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              JSG SPARSH Pune provides services and organizes events to the best of our ability. However, 
              we cannot guarantee the outcome of all activities or be held liable for personal injuries, 
              property damage, or other incidents beyond our reasonable control.
            </p>
          </div>

          {/* Dispute Resolution */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200 mb-12">
            <div className="flex items-center mb-4">
              <Scale className="text-blue-600 mr-3" size={24} />
              <h3 className="text-xl font-bold text-gray-800">Dispute Resolution</h3>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              We encourage open communication and peaceful resolution of any disputes through direct 
              communication, mediation by community leaders, or formal review processes when necessary.
            </p>
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">Questions or Concerns?</h3>
            <p className="text-blue-100 mb-6 leading-relaxed">
              If you have any questions about these Terms and Conditions, please contact our community team.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <strong className="text-yellow-300">Email:</strong>
                <br />
                <a href="mailto:jsgsparsh@gmail.com" className="text-blue-200 hover:text-yellow-300 transition-colors">
                  jsgsparsh@gmail.com
                </a>
              </div>
              <div>
                <strong className="text-yellow-300">Phone:</strong>
                <br />
                <a href="tel:+918975797500" className="text-blue-200 hover:text-yellow-300 transition-colors">
                  +91 89757 97500
                </a>
              </div>
            </div>
          </div>

          {/* Acceptance Statement */}
          <div className="mt-8 text-center">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
              <p className="text-gray-700 text-sm leading-relaxed">
                <strong>By participating in JSG SPARSH Pune activities, events, or services, you acknowledge 
                that you have read, understood, and agree to be bound by these Terms and Conditions.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
