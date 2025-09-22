'use client'

import { useState } from 'react'
import { Upload, CreditCard, User, Phone, Calendar, Trophy, Camera, Link, Shirt, X, Check } from 'lucide-react'

interface FormData {
  parentName: string
  fullName: string
  mobileNumber: string
  age: string
  skillset: string
  bowlingArm: string
  photo: File | null
  cricHeroesLink: string
  jerseyName: string
  jerseyNumber: string
  jerseySize: string
  cricketExperience?: string
}

export default function RegisterPage() {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [formData, setFormData] = useState<FormData>({
    parentName: '',
    fullName: '',
    mobileNumber: '',
    age: '',
    skillset: '',
    bowlingArm: '',
    photo: null,
    cricHeroesLink: '',
    jerseyName: '',
    jerseyNumber: '',
    jerseySize: ''
  })
  const [showPayment, setShowPayment] = useState(false)

  const categories = [
    {
      id: 'male',
      name: 'Male',
      icon: User,
      color: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-800',
      criteria: [
        'Age: 14+ years',
        'Must be able to participate in box cricket',
        'Previous cricket experience preferred',
        'Team spirit and sportsmanship required'
      ]
    },
    {
      id: 'female',
      name: 'Female',
      icon: User,
      color: 'bg-pink-500',
      hoverColor: 'hover:bg-pink-600',
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-800',
      criteria: [
        'Age: 14+ years',
        'Must be able to participate in box cricket',
        'Previous cricket experience preferred',
        'Team spirit and sportsmanship required'
      ]
    },
    {
      id: 'kids',
      name: 'Kids',
      icon: Trophy,
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-800',
      criteria: [
        'Age: 7-14 years',
        'Parent/Guardian supervision required',
        'Basic cricket knowledge helpful',
        'Enthusiasm and willingness to learn'
      ]
    }
  ]

  const skillsets = [
    'Batsman',
    'Bowler',
    'All Rounder'
  ]

  const bowlingArms = [
    'Right Arm Fast',
    'Right Arm Medium',
    'Right Arm Spin',
    'Left Arm Fast',
    'Left Arm Medium',
    'Left Arm Spin',
    'Not Applicable'
  ]

  const jerseySizes = [
    { size: 'XS', chest: '32-34', label: 'XS (32-34")' },
    { size: 'S', chest: '34-36', label: 'S (34-36")' },
    { size: 'M', chest: '36-38', label: 'M (36-38")' },
    { size: 'L', chest: '38-40', label: 'L (38-40")' },
    { size: 'XL', chest: '40-42', label: 'XL (40-42")' },
    { size: 'XXL', chest: '42-44', label: 'XXL (42-44")' },
    { size: 'XXXL', chest: '44-46', label: 'XXXL (44-46")' }
  ]

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFormData(prev => ({
        ...prev,
        photo: file
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowPayment(true)
  }

  const handleCancel = () => {
    setSelectedCategory('')
    setFormData({
      parentName: '',
      fullName: '',
      mobileNumber: '',
      age: '',
      skillset: '',
      bowlingArm: '',
      photo: null,
      cricHeroesLink: '',
      jerseyName: '',
      jerseyNumber: '',
      jerseySize: ''
    })
    setShowPayment(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="bg-blue-600 text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 mb-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="w-32 h-32 sm:w-48 sm:h-48 bg-white rounded-full -top-16 -right-16 sm:-top-24 sm:-right-24"></div>
            </div>
            <div className="relative z-10">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">
                🏏 SPL 02 Registration
              </h1>
              <p className="text-blue-100 text-base sm:text-lg">
                Join the most awaited Box Cricket Tournament
              </p>
              <p className="text-yellow-200 text-sm sm:text-base font-medium mt-2">
                📅 November 15-16, 2025
              </p>
            </div>
          </div>
        </div>

        {!selectedCategory ? (
          /* Category Selection */
          <div className="space-y-6 sm:space-y-8">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-4 sm:mb-6">
                Choose Your Category
              </h2>
              <p className="text-gray-600 text-base sm:text-lg mb-8">
                Select the category that best fits your profile
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {categories.map((category) => {
                const IconComponent = category.icon
                return (
                  <div
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-blue-200 transform hover:-translate-y-1 min-h-[400px] flex flex-col"
                  >
                    <div className={`${category.color} p-4 sm:p-6 rounded-xl sm:rounded-2xl text-white text-center mb-4 sm:mb-6`}>
                      <IconComponent size={32} className="sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3" />
                      <h3 className="text-xl sm:text-2xl font-bold">{category.name}</h3>
                    </div>
                    
                    <div className={`${category.bgColor} p-4 rounded-lg sm:rounded-xl mb-4 flex-grow`}>
                      <h4 className={`${category.textColor} font-bold mb-2 text-sm sm:text-base`}>
                        Eligibility Criteria:
                      </h4>
                      <ul className="space-y-1">
                        {category.criteria.map((criterion, idx) => (
                          <li key={idx} className={`${category.textColor} text-xs sm:text-sm flex items-start`}>
                            <Check size={14} className="mr-2 mt-0.5 flex-shrink-0" />
                            {criterion}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <button className={`w-full ${category.color} ${category.hoverColor} text-white py-3 rounded-lg sm:rounded-xl font-bold hover:shadow-lg transition-all duration-300 text-sm sm:text-base`}>
                      Select {category.name}
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        ) : !showPayment ? (
          /* Registration Form */
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-blue-800">
                Registration Form - {categories.find(c => c.id === selectedCategory)?.name}
              </h2>
              <button
                type="button"
                onClick={() => setSelectedCategory('')}
                className="text-gray-500 hover:text-gray-700 p-2"
              >
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Left Column */}
              <div className="space-y-4 sm:space-y-6">
                {/* Parent Name - Only for Kids */}
                {selectedCategory === 'kids' && (
                  <div>
                    <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
                      Father/Mother Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.parentName}
                      onChange={(e) => handleInputChange('parentName', e.target.value)}
                      className="w-full border-2 border-gray-300 rounded-lg sm:rounded-xl px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors text-sm sm:text-base"
                      placeholder="Enter parent's full name"
                    />
                  </div>
                )}

                {/* Full Name */}
                <div>
                  <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="w-full border-2 border-gray-300 rounded-lg sm:rounded-xl px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors text-sm sm:text-base"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    value={formData.mobileNumber}
                    onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                    className="w-full border-2 border-gray-300 rounded-lg sm:rounded-xl px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors text-sm sm:text-base"
                    placeholder="Enter 10-digit mobile number"
                  />
                </div>

                {/* Age */}
                <div>
                  <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
                    Age *
                  </label>
                  <input
                    type="number"
                    required
                    min={selectedCategory === 'kids' ? 7 : 14}
                    max={selectedCategory === 'kids' ? 14 : 60}
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    className="w-full border-2 border-gray-300 rounded-lg sm:rounded-xl px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors text-sm sm:text-base"
                    placeholder="Enter your age"
                  />
                </div>

                {/* Skillset */}
                <div>
                  <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
                    Skillset *
                  </label>
                  <select
                    required
                    value={formData.skillset}
                    onChange={(e) => handleInputChange('skillset', e.target.value)}
                    className="w-full border-2 border-gray-300 rounded-lg sm:rounded-xl px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors text-sm sm:text-base"
                  >
                    <option value="">Select your skillset</option>
                    {skillsets.map((skill) => (
                      <option key={skill} value={skill}>
                        {skill}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Bowling Arm */}
                <div>
                  <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
                    Bowling Arm *
                  </label>
                  <select
                    required
                    value={formData.bowlingArm}
                    onChange={(e) => handleInputChange('bowlingArm', e.target.value)}
                    className="w-full border-2 border-gray-300 rounded-lg sm:rounded-xl px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors text-sm sm:text-base"
                  >
                    <option value="">Select bowling arm</option>
                    {bowlingArms.map((arm) => (
                      <option key={arm} value={arm}>
                        {arm}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Additional Field for Male/Female - Cricket Experience */}
                {(selectedCategory === 'male' || selectedCategory === 'female') && (
                  <div>
                    <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
                      Cricket Experience
                    </label>
                    <select
                      value={formData.cricketExperience || ''}
                      onChange={(e) => handleInputChange('cricketExperience', e.target.value)}
                      className="w-full border-2 border-gray-300 rounded-lg sm:rounded-xl px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors text-sm sm:text-base"
                    >
                      <option value="">Select experience level</option>
                      <option value="beginner">Beginner (0-2 years)</option>
                      <option value="intermediate">Intermediate (2-5 years)</option>
                      <option value="advanced">Advanced (5+ years)</option>
                      <option value="professional">Professional/Semi-Pro</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Right Column */}
              <div className="space-y-4 sm:space-y-6">
                {/* Photo Upload */}
                <div>
                  <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
                    Photo Upload *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg sm:rounded-xl p-6 text-center hover:border-blue-500 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      required
                      onChange={handlePhotoUpload}
                      className="hidden"
                      id="photo-upload"
                    />
                    <label htmlFor="photo-upload" className="cursor-pointer">
                      <Camera className="mx-auto mb-2 text-gray-400" size={32} />
                      <p className="text-gray-600 text-sm sm:text-base">
                        {formData.photo ? formData.photo.name : 'Click to upload photo'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Max size: 2MB</p>
                    </label>
                  </div>
                </div>

                {/* Cric Heroes Link */}
                <div>
                  <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
                    Cric Heroes Link
                  </label>
                  <input
                    type="url"
                    value={formData.cricHeroesLink}
                    onChange={(e) => handleInputChange('cricHeroesLink', e.target.value)}
                    className="w-full border-2 border-gray-300 rounded-lg sm:rounded-xl px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors text-sm sm:text-base"
                    placeholder="https://cricheros.com/profile/..."
                  />
                </div>

                {/* Jersey Section */}
                <div className="bg-yellow-50 p-4 sm:p-6 rounded-lg sm:rounded-xl border border-yellow-200">
                  <h3 className="text-lg sm:text-xl font-bold text-yellow-800 mb-4 flex items-center">
                    <Shirt className="mr-2" size={20} />
                    Jersey Details
                  </h3>
                  
                  <div className="space-y-4">
                    {/* Jersey Name */}
                    <div>
                      <label className="block text-sm font-semibold text-yellow-800 mb-2">
                        Name on Jersey *
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={12}
                        value={formData.jerseyName}
                        onChange={(e) => handleInputChange('jerseyName', e.target.value)}
                        className="w-full border-2 border-yellow-300 rounded-lg px-3 py-2 focus:border-yellow-500 focus:outline-none transition-colors text-sm sm:text-base"
                        placeholder="Max 12 characters"
                      />
                    </div>

                    {/* Jersey Number */}
                    <div>
                      <label className="block text-sm font-semibold text-yellow-800 mb-2">
                        Number on Jersey *
                      </label>
                      <input
                        type="number"
                        required
                        min="1"
                        max="99"
                        value={formData.jerseyNumber}
                        onChange={(e) => handleInputChange('jerseyNumber', e.target.value)}
                        className="w-full border-2 border-yellow-300 rounded-lg px-3 py-2 focus:border-yellow-500 focus:outline-none transition-colors text-sm sm:text-base"
                        placeholder="1-99"
                      />
                    </div>

                    {/* Jersey Size */}
                    <div>
                      <label className="block text-sm font-semibold text-yellow-800 mb-2">
                        Jersey Size *
                      </label>
                      <select
                        required
                        value={formData.jerseySize}
                        onChange={(e) => handleInputChange('jerseySize', e.target.value)}
                        className="w-full border-2 border-yellow-300 rounded-lg px-3 py-2 focus:border-yellow-500 focus:outline-none transition-colors text-sm sm:text-base"
                      >
                        <option value="">Select size</option>
                        {jerseySizes.map((size) => (
                          <option key={size.size} value={size.size}>
                            {size.label}
                          </option>
                        ))}
                      </select>
                      <p className="text-xs text-yellow-700 mt-1">
                        Size chart based on chest measurement
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 sm:mt-12">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 border-2 border-gray-400 text-gray-600 py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold hover:bg-gray-50 transition-all duration-300 text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold hover:shadow-xl transition-all duration-300 text-sm sm:text-base"
              >
                Proceed to Payment
              </button>
            </div>
          </form>
        ) : (
          /* Payment Section */
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg">
            <div className="text-center mb-6 sm:mb-8">
              <div className="bg-blue-600 text-white p-4 sm:p-6 rounded-xl sm:rounded-2xl mb-4">
                <CreditCard className="mx-auto mb-2" size={32} />
                <h2 className="text-xl sm:text-2xl font-bold">Payment Gateway</h2>
                <p className="text-blue-100 mt-2 text-sm sm:text-base">
                  Complete your registration with secure payment
                </p>
              </div>
            </div>

            {/* Registration Summary */}
            <div className="bg-blue-50 p-4 sm:p-6 rounded-lg sm:rounded-xl mb-6 sm:mb-8">
              <h3 className="text-lg sm:text-xl font-bold text-blue-800 mb-3">Registration Summary</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm sm:text-base">
                <div><strong>Category:</strong> {categories.find(c => c.id === selectedCategory)?.name}</div>
                <div><strong>Name:</strong> {formData.fullName}</div>
                <div><strong>Mobile:</strong> {formData.mobileNumber}</div>
                <div><strong>Age:</strong> {formData.age}</div>
                <div><strong>Jersey:</strong> {formData.jerseyName} #{formData.jerseyNumber}</div>
                <div><strong>Size:</strong> {formData.jerseySize}</div>
              </div>
            </div>

            {/* Payment Amount */}
            <div className="bg-yellow-50 p-4 sm:p-6 rounded-lg sm:rounded-xl mb-6 sm:mb-8 text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-yellow-800 mb-2">Registration Fee</h3>
              <div className="text-3xl sm:text-4xl font-bold text-yellow-600">₹500</div>
              <p className="text-yellow-700 text-sm sm:text-base mt-2">
                Includes tournament entry, jersey, and refreshments
              </p>
            </div>

            {/* Paytm UPI Payment */}
            <div className="space-y-4 sm:space-y-6">
              <div className="border-2 border-gray-300 rounded-lg sm:rounded-xl p-4 sm:p-6">
                <h4 className="font-bold text-gray-800 mb-3 flex items-center text-sm sm:text-base">
                  <CreditCard className="mr-2" size={20} />
                  Payment Options
                </h4>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input type="radio" name="payment" value="upi" className="text-blue-600" defaultChecked />
                    <span className="text-sm sm:text-base">UPI Payment</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input type="radio" name="payment" value="paytm" className="text-blue-600" />
                    <span className="text-sm sm:text-base">Paytm Wallet</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input type="radio" name="payment" value="card" className="text-blue-600" />
                    <span className="text-sm sm:text-base">Credit/Debit Card</span>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setShowPayment(false)}
                  className="flex-1 border-2 border-gray-400 text-gray-600 py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold hover:bg-gray-50 transition-all duration-300 text-sm sm:text-base"
                >
                  Back to Form
                </button>
                <button
                  onClick={() => alert('Payment gateway integration will be implemented')}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold hover:shadow-xl transition-all duration-300 text-sm sm:text-base"
                >
                  Pay ₹500 & Complete Registration
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}