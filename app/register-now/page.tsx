'use client'

import React, { useState, useEffect } from 'react'
import { AlertCircle } from 'lucide-react'
import { RegistrationFormData, PaymentData } from './types'
import { useFormValidation } from './hooks/useFormValidation'
import { HeaderSection } from './components/HeaderSection'
import { CategorySelection } from './components/CategorySelection'
import { RegistrationForm } from './components/RegistrationForm'
import { PaymentForm } from './components/PaymentForm'
import ConfirmationModal from './components/ConfirmationModal'

export default function RegisterPage() {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [formData, setFormData] = useState<RegistrationFormData>({
    parentName: '',
    fullName: '',
    mobileNumber: '',
    dateOfBirth: '',
    skillset: '',
    bowlingArm: '',
    battingStyle: '',
    photo: null,
    cricHeroesLink: '',
    jerseyName: '',
    jerseyNumber: '',
    jerseySize: '',
    gender: '' // Added for Kids category
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

  // Use the form validation hook
  const {
    fieldErrors,
    paymentErrors,
    validateField,
    validatePaymentField,
    validateAllFields,
    validateAllPaymentFields,
    clearFieldError,
    clearPaymentError,
    setFieldError,
    setPaymentError,
    clearAllErrors
  } = useFormValidation(selectedCategory)

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

  const handleInputChange = (field: keyof RegistrationFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))

    // Clear field error when user starts typing
    if (fieldErrors[field]) {
      clearFieldError(field)
    }

    // Real-time validation for immediate feedback
    const error = validateField(field, value)
    if (error && value.trim()) {
      setFieldError(field, error)
    }

    setSubmitError(null)
  }

  const handlePaymentInputChange = (field: keyof PaymentData, value: string) => {
    setPaymentData(prev => ({ ...prev, [field]: value }))

    // Clear payment field error when user starts typing
    if (paymentErrors[field]) {
      clearPaymentError(field)
    }

    // Real-time validation for payment fields
    const error = validatePaymentField(field, value)
    if (error && value.trim()) {
      setPaymentError(field, error)
    }

    setSubmitError(null)
  }

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setFieldError('photo', 'Photo size must be less than 10MB')
        return
      }

      const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/heic']
      const fileExt = file.name.split('.').pop()?.toLowerCase()
      const allowedExtensions = ['jpg', 'jpeg', 'png', 'heic']

      const mimeTypeValid = allowedMimeTypes.indexOf(file.type.toLowerCase()) !== -1
      const extensionValid = fileExt ? allowedExtensions.indexOf(fileExt) !== -1 : false

      if (!mimeTypeValid && !extensionValid) {
        setFieldError('photo', 'Please upload a valid image file (JPG, JPEG, PNG, or HEIC)')
        return
      }

      setFormData(prev => ({ ...prev, photo: file }))
      clearFieldError('photo')
      setSubmitError(null)
    }
  }

  const handleScreenshotUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setPaymentError('transactionScreenshot', 'Screenshot size must be less than 10MB')
        return
      }

      const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/heic']
      const fileExt = file.name.split('.').pop()?.toLowerCase()
      const allowedExtensions = ['jpg', 'jpeg', 'png', 'heic']

      const mimeTypeValid = allowedMimeTypes.indexOf(file.type.toLowerCase()) !== -1
      const extensionValid = fileExt ? allowedExtensions.indexOf(fileExt) !== -1 : false

      if (!mimeTypeValid && !extensionValid) {
        setPaymentError('transactionScreenshot', 'Please upload a valid image file (JPG, JPEG, PNG, or HEIC)')
        return
      }

      setPaymentData(prev => ({ ...prev, transactionScreenshot: file }))
      clearPaymentError('transactionScreenshot')
      setSubmitError(null)
    }
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateAllFields(formData)) {
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

    if (!validateAllPaymentFields(paymentData)) {
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
      if (formData.gender) submitData.append('gender', formData.gender) // Add gender for kids
      submitData.append('mobileNumber', formData.mobileNumber.trim())
      submitData.append('dateOfBirth', formData.dateOfBirth)
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
      dateOfBirth: '',
      skillset: '',
      bowlingArm: '',
      battingStyle: '',
      photo: null,
      cricHeroesLink: '',
      jerseyName: '',
      jerseyNumber: '',
      jerseySize: '',
      gender: '' // Reset gender field
    })
    setPaymentData({
      transactionId: '',
      transactionScreenshot: null
    })
    setShowPayment(false)
    setSubmitError(null)
    clearAllErrors()
    scrollToTop()
  }

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false)
    setRegistrationResult(null)
    handleCancel()
  }

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId)
    clearAllErrors()
    setTimeout(() => scrollToTop(), 100)
  }

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

        {/* Header Section */}
        <HeaderSection />

        {/* Error Display */}
        {submitError && (
          <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-6 animate-slide-up">
            <div className="flex items-center">
              <AlertCircle className="text-red-600 dark:text-red-400 mr-2 flex-shrink-0" size={20} />
              <p className="text-red-800 dark:text-red-200 text-sm">{submitError}</p>
            </div>
          </div>
        )}

        {/* Conditional Rendering Based on State */}
        {!selectedCategory ? (
          <CategorySelection onCategorySelect={handleCategorySelect} />
        ) : !showPayment ? (
          <RegistrationForm
            selectedCategory={selectedCategory}
            formData={formData}
            fieldErrors={fieldErrors}
            isSubmitting={isSubmitting}
            onInputChange={handleInputChange}
            onPhotoUpload={handlePhotoUpload}
            onSubmit={handleFormSubmit}
            onCancel={handleCancel}
          />
        ) : (
          <PaymentForm
            selectedCategory={selectedCategory}
            formData={formData}
            paymentData={paymentData}
            paymentErrors={paymentErrors}
            isSubmitting={isSubmitting}
            onPaymentInputChange={handlePaymentInputChange}
            onScreenshotUpload={handleScreenshotUpload}
            onSubmit={handleFinalSubmit}
            onBack={() => setShowPayment(false)}
          />
        )}
      </div>
    </div>
  )
}