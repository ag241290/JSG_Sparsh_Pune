import { Shield, Eye, Database, UserCheck } from 'lucide-react'

export default function PrivacyPolicyPage() {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Privacy Policy</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Your privacy and data protection are important to us
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
                At JSG Pune Sparsh, we are committed to protecting your privacy and ensuring the security
                of your personal information. This Privacy Policy explains how we collect, use, and safeguard 
                your data when you interact with our community and services.
              </p>
              <div className="text-sm text-gray-600">
                <strong>Last Updated:</strong> December 2024
              </div>
            </div>
          </div>

          {/* Information We Collect */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8 mb-8">
            <div className="flex items-center mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl mr-4">
                <Shield className="text-white" size={20} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Information We Collect</h2>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-gray-600 leading-relaxed">Personal information you provide when registering or joining our community</p>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-gray-600 leading-relaxed">Contact information including name, email address, phone number</p>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-gray-600 leading-relaxed">Demographic information and preferences</p>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-gray-600 leading-relaxed">Information about your participation in events and activities</p>
              </li>
            </ul>
          </div>

          {/* How We Use Information */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8 mb-8">
            <div className="flex items-center mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl mr-4">
                <Eye className="text-white" size={20} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">How We Use Your Information</h2>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-gray-600 leading-relaxed">To provide and improve our services to the community</p>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-gray-600 leading-relaxed">To communicate with you about events, programs, and initiatives</p>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-gray-600 leading-relaxed">To process donations and maintain volunteer records</p>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-gray-600 leading-relaxed">To ensure the security and integrity of our community platform</p>
              </li>
            </ul>
          </div>

          {/* Data Security */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8 mb-8">
            <div className="flex items-center mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl mr-4">
                <Database className="text-white" size={20} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Information Storage and Security</h2>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-gray-600 leading-relaxed">We implement appropriate security measures to protect your personal information</p>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-gray-600 leading-relaxed">Your data is stored securely and accessed only by authorized personnel</p>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-gray-600 leading-relaxed">We retain your information only as long as necessary for our legitimate purposes</p>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-gray-600 leading-relaxed">We do not sell, trade, or otherwise transfer your information to third parties</p>
              </li>
            </ul>
          </div>

          {/* Your Rights */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8 mb-12">
            <div className="flex items-center mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl mr-4">
                <UserCheck className="text-white" size={20} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Your Rights</h2>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-gray-600 leading-relaxed">Right to access your personal information</p>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-gray-600 leading-relaxed">Right to correct or update your information</p>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-gray-600 leading-relaxed">Right to request deletion of your data</p>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-gray-600 leading-relaxed">Right to withdraw consent for data processing</p>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">Questions About This Policy?</h3>
            <p className="text-blue-100 mb-6 leading-relaxed">
              If you have any questions about this Privacy Policy or how we handle your personal information, 
              please contact us.
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
        </div>
      </section>
    </div>
  )
}
