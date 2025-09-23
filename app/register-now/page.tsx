'use client'

import React, { useState } from 'react'
import { Upload, CreditCard, UserCheck, Phone, Calendar, Trophy, Camera, Link, Shirt, X, Check, Loader2, Users } from 'lucide-react'

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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [registrationId, setRegistrationId] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)

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

  const skillsets = [
    'Batsman',
    'Bowler',
    'All Rounder'
  ]

  const bowlingArms = [
    'Left Arm',
    'Right Arm'
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
    setSubmitError(null) // Clear error when user makes changes
  }

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file size (10MB max)
      if (file.size > 10 * 1024 * 1024) {
        setSubmitError('Photo size must be less than 10MB')
        return
      }
      
      // Validate file type (jpg, jpeg, png, heic)
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/heic']
      if (!allowedTypes.includes(file.type.toLowerCase())) {
        setSubmitError('Please upload a valid image file (JPG, JPEG, PNG, or HEIC)')
        return
      }

      setFormData(prev => ({
        ...prev,
        photo: file
      }))
      setSubmitError(null)
    }
  }

  // Validation function
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
    
    // Kids specific validation
    if (selectedCategory === 'kids' && !formData.parentName.trim()) {
      return 'Please enter parent/guardian name'
    }
    
    // Age validation
    const age = parseInt(formData.age)
    if (selectedCategory === 'kids' && (age < 7 || age > 14)) {
      return 'Age must be between 7-14 years for kids category'
    }
    if ((selectedCategory === 'male' || selectedCategory === 'female') && age < 14) {
      return 'Age must be 14+ years for male/female category'
    }
    
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      // Validate form
      const validationError = validateForm()
      if (validationError) {
        setSubmitError(validationError)
        setIsSubmitting(false)
        return
      }

      // Create FormData for file upload
      const submitData = new FormData()
      
      // Add all form fields
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
      
      // Add photo (we already validated it exists)
      if (formData.photo) {
        submitData.append('photo', formData.photo)
      }

      console.log('Submitting registration data...')

      // Submit to API
      const response = await fetch('/api/register', {
        method: 'POST',
        body: submitData
      })

      console.log('Response status:', response.status)

      if (!response.ok) {
        // Try to get error details from response
        let errorMessage = 'Registration failed'
        try {
          const errorResult = await response.json()
          errorMessage = errorResult.error || errorMessage
        } catch (e) {
          console.error('Could not parse error response:', e)
        }
        throw new Error(errorMessage)
      }

      const result = await response.json()
      console.log('Registration result:', result)

      if (!result.success || !result.registration?.id) {
        throw new Error('Invalid response from server')
      }

      // Success - store registration ID and proceed to payment
      setRegistrationId(result.registration.id)
      setShowPayment(true)

    } catch (error) {
      console.error('Registration error:', error)
      setSubmitError(error instanceof Error ? error.message : 'Registration failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePayment = async (paymentMethod: string) => {
    if (!registrationId) return

    setIsSubmitting(true)
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Update payment status
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          registrationId,
          paymentStatus: 'completed',
          paymentDetails: { method: paymentMethod }
        })
      })

      if (!response.ok) {
        throw new Error('Payment processing failed')
      }

      // Success - show confirmation
      alert(`🎉 Registration Successful! 
      
Payment Status: Completed
      
Thank you for registering for SPL 02! You will receive a confirmation email shortly.`)
      
      // Reset form
      handleCancel()

    } catch (error) {
      console.error('Payment error:', error)
      setSubmitError('Payment failed. Please try again.')
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
    setShowPayment(false)
    setRegistrationId(null)
    setSubmitError(null)
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

        {/* Error Display */}
        {submitError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800 text-sm">{submitError}</p>
          </div>
        )}

        {!selectedCategory ? (
          /* Category Selection - Enhanced Button Style */
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
                    {/* Animated Background Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-50/20 to-yellow-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Glowing Border Effect */}
                    <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border-2 border-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-500"></div>
                    
                    <div className="relative z-10 flex-1 flex flex-col">
                      <div className={`bg-gradient-to-br ${category.buttonGradient} p-4 sm:p-6 rounded-xl sm:rounded-2xl text-white text-center mb-4 sm:mb-6 transform group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-xl`}>
                        <IconComponent size={32} className="sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 group-hover:animate-bounce" />
                        <h3 className="text-xl sm:text-2xl font-bold">{category.name}</h3>
                      </div>
                      
                      {/* Simplified Age Requirement */}
                      <div className="flex-1 flex items-center justify-center mb-4">
                        <div className={`${category.bgColor} px-4 py-2 rounded-full border-2 border-transparent group-hover:border-opacity-50 transition-all duration-300`}>
                          <p className={`${category.textColor} text-sm font-medium text-center`}>
                            {category.ageRequirement}
                          </p>
                        </div>
                      </div>
                      
                      {/* Enhanced Button with Pulse Effect */}
                      <button className={`w-full bg-gradient-to-r ${category.buttonGradient} ${category.hoverColor} text-white py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold hover:shadow-2xl transition-all duration-300 text-sm sm:text-base relative overflow-hidden group-hover:animate-pulse`}>
                        {/* Button Shine Effect */}
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
            
            {/* Additional Visual Feedback */}
            <div className="text-center mt-8">
              <p className="text-gray-500 text-sm animate-pulse">
                ✨ Hover over a category to see it come to life!
              </p>
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
                disabled={isSubmitting}
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
                      disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
                      disabled={isSubmitting}
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
                {/* Photo Upload - Updated with new validation */}
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
                      disabled={isSubmitting}
                    />
                    <label htmlFor="photo-upload" className={`cursor-pointer ${isSubmitting ? 'opacity-50' : ''}`}>
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
                    disabled={isSubmitting}
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
                        disabled={isSubmitting}
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
                        disabled={isSubmitting}
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
                        disabled={isSubmitting}
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
                className="flex-1 border-2 border-gray-400 text-gray-600 py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold hover:bg-gray-50 transition-all duration-300 text-sm sm:text-base disabled:opacity-50"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold hover:shadow-xl transition-all duration-300 text-sm sm:text-base disabled:opacity-50 flex items-center justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={20} />
                    Submitting...
                  </>
                ) : (
                  'Proceed to Payment'
                )}
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

            {/* Registration Summary - Enhanced with all details */}
            <div className="bg-blue-50 p-4 sm:p-6 rounded-lg sm:rounded-xl mb-6 sm:mb-8">
              <h3 className="text-lg sm:text-xl font-bold text-blue-800 mb-4">Registration Summary</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm sm:text-base">
                <div><strong>Category:</strong> {categories.find(c => c.id === selectedCategory)?.name}</div>
                <div><strong>Full Name:</strong> {formData.fullName}</div>
                {formData.parentName && <div><strong>Parent Name:</strong> {formData.parentName}</div>}
                <div><strong>Mobile:</strong> {formData.mobileNumber}</div>
                <div><strong>Age:</strong> {formData.age} years</div>
                <div><strong>Skillset:</strong> {formData.skillset}</div>
                <div><strong>Bowling Arm:</strong> {formData.bowlingArm}</div>
                {formData.cricketExperience && <div><strong>Experience:</strong> {formData.cricketExperience}</div>}
                {formData.cricHeroesLink && <div><strong>Cric Heroes:</strong> <a href={formData.cricHeroesLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Profile Link</a></div>}
                <div><strong>Jersey Name:</strong> {formData.jerseyName}</div>
                <div><strong>Jersey Number:</strong> #{formData.jerseyNumber}</div>
                <div><strong>Jersey Size:</strong> {formData.jerseySize}</div>
                {formData.photo && <div><strong>Photo:</strong> {formData.photo.name}</div>}
              </div>
            </div>

            {/* Payment Amount */}
            <div className="bg-yellow-50 p-4 sm:p-6 rounded-lg sm:rounded-xl mb-6 sm:mb-8 text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-yellow-800 mb-2">Registration Fee</h3>
              <div className="text-3xl sm:text-4xl font-bold text-yellow-600">
                {selectedCategory === 'kids' ? '₹600' : '₹800'}
              </div>
              <p className="text-yellow-700 text-sm sm:text-base mt-2">
                Includes tournament entry, jersey, and refreshments
              </p>
            </div>

            {/* Payment Options */}
            <div className="space-y-4 sm:space-y-6">
              <div className="border-2 border-gray-300 rounded-lg sm:rounded-xl p-4 sm:p-6">
                <h4 className="font-bold text-gray-800 mb-3 flex items-center text-sm sm:text-base">
                  <CreditCard className="mr-2" size={20} />
                  Choose Payment Method
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => handlePayment('upi')}
                    className="p-3 border-2 border-blue-300 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <span>💳</span>}
                    <span>UPI Payment</span>
                  </button>
                  <button
                    onClick={() => handlePayment('paytm')}
                    className="p-3 border-2 border-blue-300 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <span>📱</span>}
                    <span>Paytm Wallet</span>
                  </button>
                  <button
                    onClick={() => handlePayment('card')}
                    className="p-3 border-2 border-blue-300 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <span>💳</span>}
                    <span>Card Payment</span>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setShowPayment(false)}
                  className="flex-1 border-2 border-gray-400 text-gray-600 py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold hover:bg-gray-50 transition-all duration-300 text-sm sm:text-base disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  Back to Form
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}