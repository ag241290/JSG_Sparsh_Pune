'use client'

import React, { useState } from 'react'
import { UserCheck, Phone, Calendar, Trophy, Camera, Link, Shirt, X, Check, Users } from 'lucide-react'
import RegistrationSummary from './components/RegistrationSummary'
import PaymentDetails from './components/PaymentDetails'
import ConfirmationModal from './components/ConfirmationModal'

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

interface PaymentData {
  transactionId: string
  transactionScreenshot: File | null
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
  const [paymentData, setPaymentData] = useState<PaymentData>({
    transactionId: '',
    transactionScreenshot: null
  })
  const [showPayment, setShowPayment] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [registrationResult, setRegistrationResult] = useState<any>(null)

  const categories = [
    {
      id: 'male',
      name: 'Male',
      icon: UserCheck,
      color: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-800',
      buttonGradient: 'from-blue-500 to-blue-600',
      ageRequirement: 'Age: 14+ years'
    },
    {
      id: 'female',
      name: 'Female',
      icon: Users,
      color: 'bg-pink-500',
      hoverColor: 'hover:bg-pink-600',
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-800',
      buttonGradient: 'from-pink-500 to-pink-600',
      ageRequirement: 'Age: 14+ years'
    },
    {
      id: 'kids',
      name: 'Kids',
      icon: Trophy,
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-800',
      buttonGradient: 'from-green-500 to-green-600',
      ageRequirement: 'Age: 7-14 years'
    }
  ]

  const skillsets = ['Batsman', 'Bowler', 'All Rounder']
  const bowlingArms = ['Left Arm', 'Right Arm']
  const jerseySizes = [
    { size: 'XXS', chest: '28-30', label: 'XXS (28-30") - Kids' },
    { size: 'XS', chest: '30-32', label: 'XS (30-32") - Kids/Adult' },
    { size: 'S', chest: '32-34', label: 'S (32-34") - Kids/Adult' },
    { size: 'M', chest: '34-36', label: 'M (34-36") - Adult' },
    { size: 'L', chest: '36-38', label: 'L (36-38") - Adult' },
    { size: 'XL', chest: '38-40', label: 'XL (38-40") - Adult' },
    { size: 'XXL', chest: '40-42', label: 'XXL (40-42") - Adult' },
    { size: 'XXXL', chest: '42-44', label: 'XXXL (42-44") - Adult' }
  ]

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setSubmitError(null)
  }

  const handlePaymentInputChange = (field: keyof PaymentData, value: string) => {
    setPaymentData(prev => ({ ...prev, [field]: value }))
    setSubmitError(null)
  }

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setSubmitError('Photo size must be less than 10MB')
        return
      }
      
      const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/heic']
      const fileExt = file.name.split('.').pop()?.toLowerCase()
      const allowedExtensions = ['jpg', 'jpeg', 'png', 'heic']
      
      const mimeTypeValid = allowedMimeTypes.includes(file.type.toLowerCase())
      const extensionValid = fileExt ? allowedExtensions.includes(fileExt) : false

      if (!mimeTypeValid && !extensionValid) {
        setSubmitError('Please upload a valid image file (JPG, JPEG, PNG, or HEIC)')
        return
      }

      setFormData(prev => ({ ...prev, photo: file }))
      setSubmitError(null)
    }
  }

  const handleScreenshotUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setSubmitError('Screenshot size must be less than 10MB')
        return
      }
      
      const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/heic']
      const fileExt = file.name.split('.').pop()?.toLowerCase()
      const allowedExtensions = ['jpg', 'jpeg', 'png', 'heic']
      
      const mimeTypeValid = allowedMimeTypes.includes(file.type.toLowerCase())
      const extensionValid = fileExt ? allowedExtensions.includes(fileExt) : false

      if (!mimeTypeValid && !extensionValid) {
        setSubmitError('Please upload a valid image file (JPG, JPEG, PNG, or HEIC)')
        return
      }

      setPaymentData(prev => ({ ...prev, transactionScreenshot: file }))
      setSubmitError(null)
    }
  }

  const validateForm = (): string | null => {
    if (!formData.fullName.trim()) return 'Please enter your full name'
    if (!formData.mobileNumber.trim()) return 'Please enter your mobile number'
    if (!/^[0-9]{10}$/.test(formData.mobileNumber)) return 'Please enter a valid 10-digit mobile number'
    if (!formData.age) return 'Please enter your age'
    if (!formData.skillset) return 'Please select your skillset'
    if (!formData.bowlingArm) return 'Please select your bowling arm'
    if (!formData.photo) return 'Please upload your photo'
    if (!formData.jerseyName.trim()) return 'Please enter name for jersey'
    if (!formData.jerseyNumber) return 'Please enter jersey number'
    if (!formData.jerseySize) return 'Please select jersey size'
    
    if (selectedCategory === 'kids' && !formData.parentName.trim()) {
      return 'Please enter parent/guardian name'
    }
    
    const age = parseInt(formData.age)
    if (selectedCategory === 'kids' && (age < 7 || age > 14)) {
      return 'Age must be between 7-14 years for kids category'
    }
    if ((selectedCategory === 'male' || selectedCategory === 'female') && age < 14) {
      return 'Age must be 14+ years for male/female category'
    }
    
    return null
  }

  const validatePayment = (): string | null => {
    if (!paymentData.transactionId.trim()) return 'Please enter transaction ID'
    if (!paymentData.transactionScreenshot) return 'Please upload transaction screenshot'
    return null
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const validationError = validateForm()
    if (validationError) {
      setSubmitError(validationError)
      return
    }
    setShowPayment(true)
    setSubmitError(null)
  }

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const paymentValidationError = validatePayment()
      if (paymentValidationError) {
        setSubmitError(paymentValidationError)
        setIsSubmitting(false)
        return
      }

      const submitData = new FormData()
      submitData.append('category', selectedCategory)
      submitData.append('fullName', formData.fullName.trim())
      if (formData.parentName) submitData.append('parentName', formData.parentName.trim())
      submitData.append('mobileNumber', formData.mobileNumber.trim())
      submitData.append('age', formData.age)
      submitData.append('skillset', formData.skillset)
      submitData.append('bowlingArm', formData.bowlingArm)
      if (formData.cricketExperience) submitData.append('cricketExperience', formData.cricketExperience)
      if (formData.cricHeroesLink) submitData.append('cricHeroesLink', formData.cricHeroesLink.trim())
      submitData.append('jerseyName', formData.jerseyName.trim())
      submitData.append('jerseyNumber', formData.jerseyNumber)
      submitData.append('jerseySize', formData.jerseySize)
      submitData.append('transactionId', paymentData.transactionId.trim())
      submitData.append('paymentStatus', 'completed')
      
      if (formData.photo) {
        submitData.append('photo', formData.photo, formData.photo.name)
      }
      if (paymentData.transactionScreenshot) {
        submitData.append('transactionScreenshot', paymentData.transactionScreenshot, paymentData.transactionScreenshot.name)
      }

      const response = await fetch('/api/register', {
        method: 'POST',
        body: submitData
      })

      if (!response.ok) {
        let errorMessage = 'Registration failed'
        try {
          const errorResult = await response.json()
          errorMessage = errorResult.error || errorMessage
        } catch (e) {
          try {
            const errorText = await response.text()
            errorMessage = `Server error (${response.status}): ${errorText.substring(0, 100)}...`
          } catch (textError) {
            errorMessage = `Server error (${response.status}): Unable to get error details`
          }
        }
        throw new Error(errorMessage)
      }

      const result = await response.json()
      if (!result.success || !result.registration?.id) {
        throw new Error('Invalid response from server')
      }

      setRegistrationResult(result)
      setShowSuccessModal(true)

    } catch (error) {
      console.error('Registration error:', error)
      setSubmitError(error instanceof Error ? error.message : 'Registration failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
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
    setPaymentData({
      transactionId: '',
      transactionScreenshot: null
    })
    setShowPayment(false)
    setSubmitError(null)
  }

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false)
    setRegistrationResult(null)
    handleCancel()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-8">
        
        {/* Success Modal */}
        <ConfirmationModal
          isOpen={showSuccessModal}
          onClose={handleSuccessModalClose}
          playerName={formData.fullName}
          category={selectedCategory}
        />
        
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

        {/* Error Display */}
        {submitError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800 text-sm">{submitError}</p>
          </div>
        )}

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
                    className="group bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer border-3 border-transparent hover:border-blue-300 transform hover:-translate-y-2 hover:scale-105 min-h-[300px] flex flex-col relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-50/20 to-yellow-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border-2 border-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-500"></div>
                    
                    <div className="relative z-10 flex-1 flex flex-col">
                      <div className={`bg-gradient-to-br ${category.buttonGradient} p-4 sm:p-6 rounded-xl sm:rounded-2xl text-white text-center mb-4 sm:mb-6 transform group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-xl`}>
                        <IconComponent size={32} className="sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 group-hover:animate-bounce" />
                        <h3 className="text-xl sm:text-2xl font-bold">{category.name}</h3>
                      </div>
                      
                      <div className="flex-1 flex items-center justify-center mb-4">
                        <div className={`${category.bgColor} px-4 py-2 rounded-full border-2 border-transparent group-hover:border-opacity-50 transition-all duration-300`}>
                          <p className={`${category.textColor} text-sm font-medium text-center`}>
                            {category.ageRequirement}
                          </p>
                        </div>
                      </div>
                      
                      <button className={`w-full bg-gradient-to-r ${category.buttonGradient} ${category.hoverColor} text-white py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold hover:shadow-2xl transition-all duration-300 text-sm sm:text-base relative overflow-hidden group-hover:animate-pulse`}>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                        <span className="relative z-10 flex items-center justify-center space-x-2">
                          <span>Select {category.name}</span>
                          <div className="w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300"></div>
                        </span>
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
            
            <div className="text-center mt-8">
              <p className="text-gray-500 text-sm animate-pulse">
                ✨ Hover over a category to see it come to life!
              </p>
            </div>
          </div>
        ) : !showPayment ? (
          /* Registration Form */
          <form onSubmit={handleFormSubmit} className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg">
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

                {/* Cricket Experience for Male/Female */}
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
                  <div className={`border-2 border-dashed rounded-lg sm:rounded-xl p-6 text-center transition-colors ${formData.photo ? 'border-green-300 bg-green-50' : 'border-gray-300 hover:border-blue-500'}`}>
                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/heic"
                      onChange={handlePhotoUpload}
                      className="hidden"
                      id="photo-upload"
                    />
                    <label htmlFor="photo-upload" className="cursor-pointer">
                      {formData.photo ? (
                        <div className="text-green-600">
                          <Check className="mx-auto mb-2" size={32} />
                          <p className="text-sm sm:text-base font-medium">
                            {formData.photo.name}
                          </p>
                          <p className="text-xs text-green-500 mt-1">Photo uploaded successfully</p>
                        </div>
                      ) : (
                        <div className="text-gray-400">
                          <Camera className="mx-auto mb-2" size={32} />
                          <p className="text-sm sm:text-base">
                            Click to upload photo
                          </p>
                          <p className="text-xs text-gray-500 mt-1">JPG, JPEG, PNG, HEIC - Max size: 10MB</p>
                        </div>
                      )}
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
          <form onSubmit={handleFinalSubmit} className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg">
            <RegistrationSummary
              selectedCategory={selectedCategory}
              categories={categories}
              formData={formData}
            />
            
            <PaymentDetails
              selectedCategory={selectedCategory}
              paymentData={paymentData}
              onPaymentInputChange={handlePaymentInputChange}
              onScreenshotUpload={handleScreenshotUpload}
              isSubmitting={isSubmitting}
              onBack={() => setShowPayment(false)}
              onSubmit={handleFinalSubmit}
            />
          </form>
        )}
      </div>
    </div>
  )
}