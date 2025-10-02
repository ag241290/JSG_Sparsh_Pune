'use client'

import React, { useState, useEffect } from 'react'
import { UserCheck, Phone, Calendar, Trophy, Camera, Link, Shirt, X, Check, Users, AlertCircle, Info } from 'lucide-react'
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
  battingStyle: string
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

interface FieldErrors {
  [key: string]: string
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
    battingStyle: '',
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
  
  // Field-specific errors
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [paymentErrors, setPaymentErrors] = useState<FieldErrors>({})

  // Scroll to top utility function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Effect to scroll to top when category is selected
  useEffect(() => {
    if (selectedCategory) {
      scrollToTop()
    }
  }, [selectedCategory])

  // Effect to scroll to top when showing payment section
  useEffect(() => {
    if (showPayment) {
      scrollToTop()
    }
  }, [showPayment])

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
      ageRequirement: 'Born before 14 November 2013',
      fee: '₹800'
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
      ageRequirement: 'Born before 14 November 2013',
      fee: '₹800'
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
      ageRequirement: 'Born on or after 14 November 2013 and before 14 November 2018',
      fee: '₹600'
    }
  ]

  const skillsets = ['Batsman', 'Bowler', 'All Rounder']
  const bowlingArms = ['Left Arm', 'Right Arm']
  const battingStyles = ['Left Handed', 'Right Handed']
  const jerseySizes = [
    { size: 'XXS', chest: '34', label: 'XXS (34) - Kids' },
    { size: 'XS', chest: '36', label: 'XS (36) - Kids/Adult' },
    { size: 'S', chest: '38', label: 'S (38) - Kids/Adult' },
    { size: 'M', chest: '40', label: 'M (40) - Adult' },
    { size: 'L', chest: '42', label: 'L (42) - Adult' },
    { size: 'XL', chest: '44', label: 'XL (44) - Adult' },
    { size: 'XXL', chest: '46', label: 'XXL (46) - Adult' },
    { size: 'XXXL', chest: '48', label: 'XXXL (48) - Adult' }
  ]

  // Field validation functions
  const validateField = (field: keyof FormData, value: string | File | null | undefined): string => {
    switch (field) {
      case 'parentName':
        if (selectedCategory === 'kids' && (!value || (typeof value === 'string' && !value.trim()))) {
          return 'Parent/Guardian name is required for kids category'
        }
        return ''
      
      case 'fullName':
        if (!value || (typeof value === 'string' && !value.trim())) {
          return 'Full name is required'
        }
        if (typeof value === 'string' && value.trim().length < 2) {
          return 'Full name must be at least 2 characters'
        }
        return ''
      
      case 'mobileNumber':
        if (!value || (typeof value === 'string' && !value.trim())) {
          return 'Mobile number is required'
        }
        if (typeof value === 'string' && !/^[0-9]{10}$/.test(value)) {
          return 'Please enter a valid 10-digit mobile number'
        }
        return ''
      
      case 'age':
        if (!value || (typeof value === 'string' && !value.trim())) {
          return 'Age is required'
        }
        if (typeof value === 'string') {
          const age = parseInt(value)
          if (isNaN(age) || age < 1 || age > 100) {
            return 'Please enter a valid age'
          }
          // Updated age validation based on birth dates
          if (selectedCategory === 'kids' && (age < 7 || age > 12)) {
            return 'Age must be between 7-12 years for kids category (born on or after 14 November 2013 and before 14 November 2018)'
          }
          if ((selectedCategory === 'male' || selectedCategory === 'female') && age < 12) {
            return 'Age must be 12+ years for male/female category (born before 14 November 2013)'
          }
        }
        return ''
      
      case 'skillset':
        if (!value || (typeof value === 'string' && !value.trim())) {
          return 'Please select your skillset'
        }
        return ''
      
      case 'bowlingArm':
        if (!value || (typeof value === 'string' && !value.trim())) {
          return 'Please select your bowling arm'
        }
        return ''
      
      case 'battingStyle':
        if (!value || (typeof value === 'string' && !value.trim())) {
          return 'Please select your batting style'
        }
        return ''
      
      case 'photo':
        if (!value) {
          return 'Please upload your photo'
        }
        return ''
      
      case 'cricHeroesLink':
        if (!value || (typeof value === 'string' && !value.trim())) {
          return 'Cric Heroes Link is required'
        }
        if (typeof value === 'string') {
          const cricHeroesPattern = /^https:\/\/cricheroes\.com\/player-profile\/\d+\/[^\/\s]+.*$/;
          if (!cricHeroesPattern.test(value)) {
            return 'Please enter a valid Cric Heroes Link format: https://cricheroes.com/player-profile/ID/name'
          }
        }
        return ''
      
      case 'jerseyName':
        if (!value || (typeof value === 'string' && !value.trim())) {
          return 'Jersey name is required'
        }
        if (typeof value === 'string' && value.trim().length > 12) {
          return 'Jersey name must be 12 characters or less'
        }
        return ''
      
      case 'jerseyNumber':
        if (!value || (typeof value === 'string' && !value.trim())) {
          return 'Jersey number is required'
        }
        if (typeof value === 'string') {
          const num = parseInt(value)
          if (isNaN(num) || num < 1 || num > 99) {
            return 'Jersey number must be between 1-99'
          }
        }
        return ''
      
      case 'jerseySize':
        if (!value || (typeof value === 'string' && !value.trim())) {
          return 'Please select jersey size'
        }
        return ''
      
      default:
        return ''
    }
  }

  // Payment field validation
  const validatePaymentField = (field: keyof PaymentData, value: string | File | null): string => {
    switch (field) {
      case 'transactionId':
        if (!value || (typeof value === 'string' && !value.trim())) {
          return 'Transaction ID is required'
        }
        if (typeof value === 'string' && value.trim().length < 8) {
          return 'Transaction ID must be at least 8 characters'
        }
        return ''
      
      case 'transactionScreenshot':
        if (!value) {
          return 'Transaction screenshot is required'
        }
        return ''
      
      default:
        return ''
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear field error when user starts typing
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({ ...prev, [field]: '' }))
    }
    
    // Real-time validation for immediate feedback
    const error = validateField(field, value)
    if (error && value.trim()) { // Only show error if user has entered something
      setFieldErrors(prev => ({ ...prev, [field]: error }))
    }
    
    setSubmitError(null)
  }

  const handlePaymentInputChange = (field: keyof PaymentData, value: string) => {
    setPaymentData(prev => ({ ...prev, [field]: value }))
    
    // Clear payment field error when user starts typing
    if (paymentErrors[field]) {
      setPaymentErrors(prev => ({ ...prev, [field]: '' }))
    }
    
    // Real-time validation for payment fields
    const error = validatePaymentField(field, value)
    if (error && value.trim()) {
      setPaymentErrors(prev => ({ ...prev, [field]: error }))
    }
    
    setSubmitError(null)
  }

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setFieldErrors(prev => ({ ...prev, photo: 'Photo size must be less than 10MB' }))
        return
      }
      
      const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/heic']
      const fileExt = file.name.split('.').pop()?.toLowerCase()
      const allowedExtensions = ['jpg', 'jpeg', 'png', 'heic']
      
      const mimeTypeValid = allowedMimeTypes.indexOf(file.type.toLowerCase()) !== -1
      const extensionValid = fileExt ? allowedExtensions.indexOf(fileExt) !== -1 : false

      if (!mimeTypeValid && !extensionValid) {
        setFieldErrors(prev => ({ ...prev, photo: 'Please upload a valid image file (JPG, JPEG, PNG, or HEIC)' }))
        return
      }

      setFormData(prev => ({ ...prev, photo: file }))
      setFieldErrors(prev => ({ ...prev, photo: '' }))
      setSubmitError(null)
    }
  }

  const handleScreenshotUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setPaymentErrors(prev => ({ ...prev, transactionScreenshot: 'Screenshot size must be less than 10MB' }))
        return
      }
      
      const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/heic']
      const fileExt = file.name.split('.').pop()?.toLowerCase()
      const allowedExtensions = ['jpg', 'jpeg', 'png', 'heic']
      
      const mimeTypeValid = allowedMimeTypes.indexOf(file.type.toLowerCase()) !== -1
      const extensionValid = fileExt ? allowedExtensions.indexOf(fileExt) !== -1 : false

      if (!mimeTypeValid && !extensionValid) {
        setPaymentErrors(prev => ({ ...prev, transactionScreenshot: 'Please upload a valid image file (JPG, JPEG, PNG, or HEIC)' }))
        return
      }

      setPaymentData(prev => ({ ...prev, transactionScreenshot: file }))
      setPaymentErrors(prev => ({ ...prev, transactionScreenshot: '' }))
      setSubmitError(null)
    }
  }

  const validateAllFields = (): boolean => {
    const errors: FieldErrors = {}
    let hasErrors = false

    // Validate all form fields
    const formKeys = Object.keys(formData) as Array<keyof FormData>
    formKeys.forEach(key => {
      const value = formData[key]
      const error = validateField(key, value)
      if (error) {
        errors[key] = error
        hasErrors = true
      }
    })

    setFieldErrors(errors)
    return !hasErrors
  }

  const validateAllPaymentFields = (): boolean => {
    const errors: FieldErrors = {}
    let hasErrors = false

    // Validate all payment fields
    const paymentKeys = Object.keys(paymentData) as Array<keyof PaymentData>
    paymentKeys.forEach(key => {
      const value = paymentData[key]
      const error = validatePaymentField(key, value)
      if (error) {
        errors[key] = error
        hasErrors = true
      }
    })

    setPaymentErrors(errors)
    return !hasErrors
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateAllFields()) {
      setShowPayment(true)
      setSubmitError(null)
    } else {
      // Scroll to first error field
      const firstErrorField = Object.keys(fieldErrors).find(key => fieldErrors[key])
      if (firstErrorField) {
        const element = document.getElementById(firstErrorField)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' })
          element.focus()
        }
      }
    }
  }

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateAllPaymentFields()) {
      // Scroll to first payment error field
      const firstErrorField = Object.keys(paymentErrors).find(key => paymentErrors[key])
      if (firstErrorField) {
        const element = document.getElementById(`payment-${firstErrorField}`)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' })
          element.focus()
        }
      }
      return
    }

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const submitData = new FormData()
      submitData.append('category', selectedCategory)
      submitData.append('fullName', formData.fullName.trim())
      if (formData.parentName) submitData.append('parentName', formData.parentName.trim())
      submitData.append('mobileNumber', formData.mobileNumber.trim())
      submitData.append('age', formData.age)
      submitData.append('skillset', formData.skillset)
      submitData.append('bowlingArm', formData.bowlingArm)
      submitData.append('battingStyle', formData.battingStyle)
      if (formData.cricketExperience) submitData.append('cricketExperience', formData.cricketExperience)
      submitData.append('cricHeroesLink', formData.cricHeroesLink.trim())
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
      battingStyle: '',
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
    setFieldErrors({})
    setPaymentErrors({})
    // Scroll to top when cancelling to show category selection
    scrollToTop()
  }

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false)
    setRegistrationResult(null)
    handleCancel()
  }

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setFieldErrors({}) // Clear any existing errors when selecting category
    setTimeout(() => scrollToTop(), 100)
  }

  // Error message component for better reusability
  const ErrorMessage = ({ error }: { error: string }) => (
    error ? (
      <div className="flex items-center mt-1 text-red-600 dark:text-red-400">
        <AlertCircle size={14} className="mr-1 flex-shrink-0" />
        <span className="text-xs">{error}</span>
      </div>
    ) : null
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 sm:py-12 animate-fade-in">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-8">
        
        {/* Success Modal */}
        <ConfirmationModal
          isOpen={showSuccessModal}
          onClose={handleSuccessModalClose}
          playerName={formData.fullName}
          category={selectedCategory}
        />
        
        {/* Header with Enhanced Title Sponsor */}
        <div className="text-center mb-8 sm:mb-12 animate-slide-up">
          {/* Enhanced Title Sponsor Section */}
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl sm:rounded-4xl p-6 sm:p-10 mb-6 shadow-large border border-white/50 dark:border-gray-700/50 relative overflow-hidden group hover:shadow-glow-lg transition-all duration-500">
            {/* Animated background elements */}
            
            <div className="relative z-10 space-y-2 sm:space-y-3">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-800 dark:text-blue-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 leading-tight">
                JSG Pune Sparsh
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 font-medium leading-tight">
                in proud association with
              </p>
              
              {/* Naturally Integrated Title Sponsor Logo */}
              <div className="flex justify-center py-4 relative">
                {/* Floating Elements Around Logo */}
                <div className="absolute inset-0 pointer-events-none">
                </div>

                <div className="group/logo relative">
                  {/* Pulsing Outer Ring - Very subtle */}
                  <div className="absolute -inset-4 rounded-full border border-yellow-400/30 animate-ping opacity-10 group-hover/logo:opacity-25 transition-opacity duration-500" style={{ animationDuration: '4s' }}></div>
                  
                  {/* Natural Integration Container - No frames or borders */}
                  <div className="relative transform group-hover/logo:scale-105 transition-all duration-500">
                    {/* Subtle Glow Behind Logo */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 via-transparent to-yellow-100/50 blur-2xl opacity-0 group-hover/logo:opacity-60 transition-all duration-700"></div>
                    
                    {/* Logo - Naturally integrated */}
                    <img
                      src="/images/TitleSponsor.png"
                      alt="Title Sponsor"
                      className="relative max-h-48 sm:max-h-56 md:max-h-64 lg:max-h-56 w-auto object-contain transition-all duration-500 group-hover/logo:brightness-110 group-hover/logo:contrast-105"
                      style={{ 
                        filter: 'brightness(1.02) contrast(1.02) saturate(1.05)',
                      }}
                    />
                    
                    {/* Subtle highlight overlay for natural integration */}
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/20 opacity-0 group-hover/logo:opacity-30 transition-opacity duration-500 pointer-events-none"></div>
                  </div>
                </div>
              </div>
              
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 font-medium leading-tight">
                presents
              </p>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-yellow-600 bg-clip-text text-transparent leading-tight">
                Sparsh Premier League
              </h2>
              
              <h3 className="text-xl sm:text-xl md:text-2xl font-bold text-yellow-600 dark:text-yellow-400 hover:text-yellow-500 dark:hover:text-yellow-300 transition-colors duration-300 leading-tight">
                Season 02
              </h3>

              {/* Date */}
              <div className="text-xl sm:text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400 animate-pulse pt-4">
                🥎 15 & 16 November 2025 🥎
                <p className="text-base sm:text-lg hover:text-white text-green-600 dark:text-green-400 transition-colors duration-300">
                    Join the most awaited Box Cricket Tournament
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {submitError && (
          <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-6 animate-slide-up">
            <div className="flex items-center">
              <AlertCircle className="text-red-600 dark:text-red-400 mr-2 flex-shrink-0" size={20} />
              <p className="text-red-800 dark:text-red-200 text-sm">{submitError}</p>
            </div>
          </div>
        )}

        {!selectedCategory ? (
          /* Enhanced Category Selection */
          <div className="space-y-6 sm:space-y-8">
            <div className="text-center animate-fade-in">
              <h2 className="text-2xl sm:text-3xl font-bold text-blue-800 dark:text-blue-300 mb-4 sm:mb-6 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                Choose Your Category
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg mb-8">
                Select the category that best fits your profile
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {categories.map((category, index) => {
                const IconComponent = category.icon
                return (
                  <div
                    key={category.id}
                    onClick={() => handleCategorySelect(category.id)}
                    className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl sm:rounded-4xl p-6 sm:p-8 shadow-large hover:shadow-glow-lg transition-all duration-500 cursor-pointer border-3 border-transparent hover:border-blue-300 dark:hover:border-blue-600 transform hover:-translate-y-2 hover:scale-105 min-h-[320px] flex flex-col relative overflow-hidden"
                    style={{
                      animationDelay: `${index * 200}ms`,
                      animation: 'slideUp 0.8s ease-out forwards'
                    }}
                  >
                    {/* Enhanced background effects */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-50/20 dark:via-blue-900/20 to-yellow-50/20 dark:to-yellow-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute inset-0 rounded-3xl sm:rounded-4xl border-2 border-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-500"></div>
                    
                    <div className="relative z-10 flex-1 flex flex-col">
                      <div className={`bg-gradient-to-br ${category.buttonGradient} p-4 sm:p-6 rounded-2xl sm:rounded-3xl text-white text-center mb-4 sm:mb-6 transform group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-xl`}>
                        <IconComponent size={32} className="sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 group-hover:animate-bounce" />
                        <h3 className="text-xl sm:text-2xl font-bold">{category.name}</h3>
                      </div>
                      
                      <div className="flex-1 flex flex-col items-center justify-center mb-4 space-y-3">
                        <div className={`${category.bgColor} dark:bg-opacity-20 px-4 py-2 rounded-full border-2 border-transparent group-hover:border-opacity-50 transition-all duration-300`}>
                          <p className={`${category.textColor} dark:text-gray-300 text-xs font-medium text-center leading-tight`}>
                            {category.ageRequirement}
                          </p>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-1">
                            Registration Fee
                          </div>
                          <div className="text-xl font-bold text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                            {category.fee}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            
            {/* Age Proof Disclaimer */}
            <div className="bg-blue-50/80 dark:bg-blue-900/20 backdrop-blur-sm border border-blue-200 dark:border-blue-800 rounded-2xl p-4 mb-6 animate-fade-in hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-300">
              <div className="flex items-start justify-center space-x-3">
                <div className="text-center">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
                    📋 Age Verification
                  </h4>
                  <p className="text-blue-700 dark:text-blue-300 text-sm">
                    Please carry a valid age proof along, just in case it's needed for verification.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Enhanced disclaimers */}
            <div className="bg-yellow-50/80 dark:bg-yellow-900/20 backdrop-blur-sm border border-yellow-200 dark:border-yellow-800 rounded-2xl p-4 mb-6 animate-fade-in hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors duration-300">
              <div className="flex items-center justify-center">
                <div className="text-yellow-800 dark:text-yellow-300 text-center">
                  <p className="text-sm font-medium">
                    ⚠️ <strong>Important:</strong> Registration fees are non-refundable
                  </p>
                  <p className="text-xs mt-1 opacity-75">
                    Please ensure all details are correct before proceeding with payment
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50/80 dark:bg-blue-900/20 backdrop-blur-sm border border-blue-200 dark:border-blue-800 rounded-2xl p-4 mb-6 animate-fade-in hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-300">
              <div className="text-center text-blue-800 dark:text-blue-300">
                <p className="text-sm">
                  By registering, you agree to our{' '}
                  <a href="/privacy-policy" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline font-medium transition-colors duration-300">
                    Privacy Policy
                  </a>
                  {' '}and{' '}
                  <a href="/terms-and-conditions" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline font-medium transition-colors duration-300">
                    Terms & Conditions
                  </a>
                </p>
              </div>
            </div>
            
            <div className="text-center mt-8 animate-fade-in">
              <p className="text-gray-500 dark:text-gray-400 text-sm animate-pulse">
                ✨ Hover over a category to see it come to life!
              </p>
            </div>
          </div>
        ) : !showPayment ? (
          /* Enhanced Registration Form */
          <form onSubmit={handleFormSubmit} className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl sm:rounded-4xl p-6 sm:p-8 shadow-large border border-white/50 dark:border-gray-700/50 hover:shadow-glow-lg transition-all duration-500 animate-slide-up">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-blue-800 dark:text-blue-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                Registration Form - {categories.find(c => c.id === selectedCategory)?.name}
              </h2>
              <button
                type="button"
                onClick={() => setSelectedCategory('')}
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
              >
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Left Column - Enhanced */}
              <div className="space-y-4 sm:space-y-6">
                {/* Parent Name - Only for Kids */}
                {selectedCategory === 'kids' && (
                  <div className="animate-fade-in">
                    <label htmlFor="parentName" className="block text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Father/Mother Name *
                    </label>
                    <input
                      id="parentName"
                      type="text"
                      required
                      value={formData.parentName}
                      onChange={(e) => handleInputChange('parentName', e.target.value)}
                      className={`w-full border-2 ${fieldErrors.parentName ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'} rounded-2xl px-4 py-3 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all duration-300 text-sm sm:text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:border-blue-300 dark:hover:border-blue-500`}
                      placeholder="Enter parent's full name"
                    />
                    <ErrorMessage error={fieldErrors.parentName || ''} />
                  </div>
                )}

                {/* Enhanced form fields with animations and inline validation */}
                <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
                  <label htmlFor="fullName" className="block text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className={`w-full border-2 ${fieldErrors.fullName ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'} rounded-2xl px-4 py-3 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all duration-300 text-sm sm:text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:border-blue-300 dark:hover:border-blue-500`}
                    placeholder="Enter your full name"
                  />
                  <ErrorMessage error={fieldErrors.fullName || ''} />
                </div>

                <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
                  <label htmlFor="mobileNumber" className="block text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Mobile Number *
                  </label>
                  <input
                    id="mobileNumber"
                    type="tel"
                    required
                    pattern="[0-9]{10}"
                    value={formData.mobileNumber}
                    onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                    className={`w-full border-2 ${fieldErrors.mobileNumber ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'} rounded-2xl px-4 py-3 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all duration-300 text-sm sm:text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:border-blue-300 dark:hover:border-blue-500`}
                    placeholder="Enter 10-digit mobile number"
                  />
                  <ErrorMessage error={fieldErrors.mobileNumber || ''} />
                </div>

                <div className="animate-fade-in" style={{ animationDelay: '300ms' }}>
                  <label htmlFor="age" className="block text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Age *
                  </label>
                  <input
                    id="age"
                    type="number"
                    required
                    min={selectedCategory === 'kids' ? 7 : 12}
                    max={selectedCategory === 'kids' ? 12 : 60}
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    className={`w-full border-2 ${fieldErrors.age ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'} rounded-2xl px-4 py-3 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all duration-300 text-sm sm:text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:border-blue-300 dark:hover:border-blue-500`}
                    placeholder="Enter your age"
                  />
                  <ErrorMessage error={fieldErrors.age || ''} />
                </div>

                <div className="animate-fade-in" style={{ animationDelay: '400ms' }}>
                  <label htmlFor="skillset" className="block text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Skillset *
                  </label>
                  <select
                    id="skillset"
                    required
                    value={formData.skillset}
                    onChange={(e) => handleInputChange('skillset', e.target.value)}
                    className={`w-full border-2 ${fieldErrors.skillset ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'} rounded-2xl px-4 py-3 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all duration-300 text-sm sm:text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:border-blue-300 dark:hover:border-blue-500`}
                  >
                    <option value="">Select your skillset</option>
                    {skillsets.map((skill) => (
                      <option key={skill} value={skill}>
                        {skill}
                      </option>
                    ))}
                  </select>
                  <ErrorMessage error={fieldErrors.skillset || ''} />
                </div>

                <div className="animate-fade-in" style={{ animationDelay: '500ms' }}>
                  <label htmlFor="bowlingArm" className="block text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Bowling Arm *
                  </label>
                  <select
                    id="bowlingArm"
                    required
                    value={formData.bowlingArm}
                    onChange={(e) => handleInputChange('bowlingArm', e.target.value)}
                    className={`w-full border-2 ${fieldErrors.bowlingArm ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'} rounded-2xl px-4 py-3 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all duration-300 text-sm sm:text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:border-blue-300 dark:hover:border-blue-500`}
                  >
                    <option value="">Select bowling arm</option>
                    {bowlingArms.map((arm) => (
                      <option key={arm} value={arm}>
                        {arm}
                      </option>
                    ))}
                  </select>
                  <ErrorMessage error={fieldErrors.bowlingArm || ''} />
                </div>

                <div className="animate-fade-in" style={{ animationDelay: '550ms' }}>
                  <label htmlFor="battingStyle" className="block text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Batting Style *
                  </label>
                  <select
                    id="battingStyle"
                    required
                    value={formData.battingStyle}
                    onChange={(e) => handleInputChange('battingStyle', e.target.value)}
                    className={`w-full border-2 ${fieldErrors.battingStyle ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'} rounded-2xl px-4 py-3 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all duration-300 text-sm sm:text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:border-blue-300 dark:hover:border-blue-500`}
                  >
                    <option value="">Select batting style</option>
                    {battingStyles.map((style) => (
                      <option key={style} value={style}>
                        {style}
                      </option>
                    ))}
                  </select>
                  <ErrorMessage error={fieldErrors.battingStyle || ''} />
                </div>

                {/* Cricket Experience for Male/Female */}
                {(selectedCategory === 'male' || selectedCategory === 'female') && (
                  <div className="animate-fade-in" style={{ animationDelay: '600ms' }}>
                    <label htmlFor="cricketExperience" className="block text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Cricket Experience
                    </label>
                    <select
                      id="cricketExperience"
                      value={formData.cricketExperience || '' }
                      onChange={(e) => handleInputChange('cricketExperience', e.target.value)}
                      className="w-full border-2 border-gray-300 dark:border-gray-600 rounded-2xl px-4 py-3 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all duration-300 text-sm sm:text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:border-blue-300 dark:hover:border-blue-500"
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

              {/* Right Column - Enhanced */}
              <div className="space-y-4 sm:space-y-6">
                {/* Enhanced Photo Upload */}
                <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
                  <label className="block text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Photo Upload *
                  </label>
                  <div className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all duration-300 ${fieldErrors.photo ? 'border-red-500 dark:border-red-400 bg-red-50 dark:bg-red-900/20' : formData.photo ? 'border-green-300 dark:border-green-600 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30' : 'border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'}`}>
                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/heic"
                      onChange={handlePhotoUpload}
                      className="hidden"
                      id="photo-upload"
                    />
                    <label htmlFor="photo-upload" className="cursor-pointer">
                      {formData.photo ? (
                        <div className="text-green-600 dark:text-green-400">
                          <Check className="mx-auto mb-2 animate-bounce" size={32} />
                          <p className="text-sm sm:text-base font-medium">
                            {formData.photo.name}
                          </p>
                          <p className="text-xs text-green-500 dark:text-green-400 mt-1">Photo uploaded successfully</p>
                        </div>
                      ) : (
                        <div className="text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300">
                          <Camera className="mx-auto mb-2 hover:animate-bounce" size={32} />
                          <p className="text-sm sm:text-base">
                            Click to upload photo
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">JPG, JPEG, PNG, HEIC - Max size: 10MB</p>
                        </div>
                      )}
                    </label>
                  </div>
                  <ErrorMessage error={fieldErrors.photo || ''} />
                </div>

                {/* Enhanced Cric Heroes Link */}
                <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
                  <label htmlFor="cricHeroesLink" className="block text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Cric Heroes Link *
                  </label>
                  <input
                    id="cricHeroesLink"
                    type="url"
                    required
                    value={formData.cricHeroesLink}
                    onChange={(e) => handleInputChange('cricHeroesLink', e.target.value)}
                    className={`w-full border-2 ${fieldErrors.cricHeroesLink ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'} rounded-2xl px-4 py-3 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all duration-300 text-sm sm:text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:border-blue-300 dark:hover:border-blue-500`}
                    placeholder="https://cricheroes.com/player-profile/5594432/amit-gandhi"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Format: https://cricheroes.com/player-profile/[ID]/[name]
                  </p>
                  <ErrorMessage error={fieldErrors.cricHeroesLink || ''} />
                </div>

                {/* Enhanced Jersey Section */}
                <div className="bg-yellow-50/80 dark:bg-yellow-900/20 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-yellow-200 dark:border-yellow-800 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-all duration-300 animate-fade-in" style={{ animationDelay: '300ms' }}>
                  <h3 className="text-lg sm:text-xl font-bold text-yellow-800 dark:text-yellow-300 mb-4 flex items-center">
                    <Shirt className="mr-2 group-hover:animate-bounce" size={20} />
                    Jersey Details
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="jerseyName" className="block text-sm font-semibold text-yellow-800 dark:text-yellow-300 mb-2">
                        Name on Jersey *
                      </label>
                      <input
                        id="jerseyName"
                        type="text"
                        required
                        maxLength={12}
                        value={formData.jerseyName}
                        onChange={(e) => handleInputChange('jerseyName', e.target.value)}
                        className={`w-full border-2 ${fieldErrors.jerseyName ? 'border-red-500 dark:border-red-400' : 'border-yellow-300 dark:border-yellow-600'} rounded-xl px-3 py-2 focus:border-yellow-500 dark:focus:border-yellow-400 focus:outline-none transition-all duration-300 text-sm sm:text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:border-yellow-400 dark:hover:border-yellow-500`}
                        placeholder="Max 12 characters"
                      />
                      <ErrorMessage error={fieldErrors.jerseyName || ''} />
                    </div>

                    <div>
                      <label htmlFor="jerseyNumber" className="block text-sm font-semibold text-yellow-800 dark:text-yellow-300 mb-2">
                        Number on Jersey *
                      </label>
                      <input
                        id="jerseyNumber"
                        type="number"
                        required
                        min="1"
                        max="99"
                        value={formData.jerseyNumber}
                        onChange={(e) => handleInputChange('jerseyNumber', e.target.value)}
                        className={`w-full border-2 ${fieldErrors.jerseyNumber ? 'border-red-500 dark:border-red-400' : 'border-yellow-300 dark:border-yellow-600'} rounded-xl px-3 py-2 focus:border-yellow-500 dark:focus:border-yellow-400 focus:outline-none transition-all duration-300 text-sm sm:text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:border-yellow-400 dark:hover:border-yellow-500`}
                        placeholder="1-99"
                      />
                      <ErrorMessage error={fieldErrors.jerseyNumber || ''} />
                    </div>

                    <div>
                      <label htmlFor="jerseySize" className="block text-sm font-semibold text-yellow-800 dark:text-yellow-300 mb-2">
                        Jersey Size *
                      </label>
                      <select
                        id="jerseySize"
                        required
                        value={formData.jerseySize}
                        onChange={(e) => handleInputChange('jerseySize', e.target.value)}
                        className={`w-full border-2 ${fieldErrors.jerseySize ? 'border-red-500 dark:border-red-400' : 'border-yellow-300 dark:border-yellow-600'} rounded-xl px-3 py-2 focus:border-yellow-500 dark:focus:border-yellow-400 focus:outline-none transition-all duration-300 text-sm sm:text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:border-yellow-400 dark:hover:border-yellow-500`}
                      >
                        <option value="">Select size</option>
                        {jerseySizes.map((size) => (
                          <option key={size.size} value={size.size}>
                            {size.label}
                          </option>
                        ))}
                      </select>
                      <ErrorMessage error={fieldErrors.jerseySize || ''} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 sm:mt-12 animate-fade-in" style={{ animationDelay: '700ms' }}>
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 border-2 border-gray-400 dark:border-gray-500 text-gray-600 dark:text-gray-300 py-3 sm:py-4 rounded-2xl font-bold hover:bg-gray-50 dark:hover:bg-gray-700 hover:scale-105 transition-all duration-300 text-sm sm:text-base group"
              >
                <span className="group-hover:animate-pulse">Cancel</span>
              </button>
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 sm:py-4 rounded-2xl font-bold hover:shadow-glow hover:scale-105 transition-all duration-300 text-sm sm:text-base group"
              >
                <span className="group-hover:animate-pulse">Proceed to Payment</span>
              </button>
            </div>
          </form>
        ) : (
          /* Enhanced Payment Section */
          <form onSubmit={handleFinalSubmit} className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl sm:rounded-4xl p-6 sm:p-8 shadow-large border border-white/50 dark:border-gray-700/50 hover:shadow-glow-lg transition-all duration-500 animate-slide-up">
            <RegistrationSummary
              selectedCategory={selectedCategory}
              categories={categories}
              formData={formData}
            />
            
            <PaymentDetails
              selectedCategory={selectedCategory}
              paymentData={paymentData}
              paymentErrors={paymentErrors}
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