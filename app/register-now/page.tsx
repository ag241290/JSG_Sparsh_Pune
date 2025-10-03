'use client'

import React, { useState, useEffect } from 'react'
import { AlertCircle, Wifi, WifiOff } from 'lucide-react'
import { RegistrationFormData, PaymentData } from './types'
import { useFormValidation } from './hooks/useFormValidation'
import { HeaderSection } from './components/HeaderSection'
import { CategorySelection } from './components/CategorySelection'
import { RegistrationForm } from './components/RegistrationForm'
import { PaymentForm } from './components/PaymentForm'
import ConfirmationModal from './components/ConfirmationModal'
import { TroubleshootingGuide } from './components/TroubleshootingGuide'

// Constants for localStorage keys
const STORAGE_KEYS = {
  CATEGORY: 'jsg_registration_category',
  FORM_DATA: 'jsg_registration_form_data',
  PAYMENT_DATA: 'jsg_registration_payment_data',
  SHOW_PAYMENT: 'jsg_registration_show_payment'
}

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
  const [isOnline, setIsOnline] = useState(true)
  const [connectionType, setConnectionType] = useState<string>('unknown')
  const [dataRestored, setDataRestored] = useState(false)

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

  // Helper functions for localStorage
  const saveToStorage = (key: string, data: any) => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(data))
      }
    } catch (error) {
      console.warn('Failed to save to localStorage:', error)
    }
  }

  const loadFromStorage = (key: string) => {
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem(key)
        return saved ? JSON.parse(saved) : null
      }
    } catch (error) {
      console.warn('Failed to load from localStorage:', error)
    }
    return null
  }

  const clearStorage = () => {
    try {
      if (typeof window !== 'undefined') {
        Object.values(STORAGE_KEYS).forEach(key => {
          localStorage.removeItem(key)
        })
      }
    } catch (error) {
      console.warn('Failed to clear localStorage:', error)
    }
  }

  // Load saved data on component mount
  useEffect(() => {
    const savedCategory = loadFromStorage(STORAGE_KEYS.CATEGORY)
    const savedFormData = loadFromStorage(STORAGE_KEYS.FORM_DATA)
    const savedPaymentData = loadFromStorage(STORAGE_KEYS.PAYMENT_DATA)
    const savedShowPayment = loadFromStorage(STORAGE_KEYS.SHOW_PAYMENT)

    let hasRestoredData = false

    if (savedCategory) {
      setSelectedCategory(savedCategory)
      hasRestoredData = true
    }

    if (savedFormData) {
      // Restore form data except for file objects which can't be serialized
      const restoredFormData = {
        ...savedFormData,
        photo: null // Files can't be restored from localStorage
      }
      setFormData(restoredFormData)
      hasRestoredData = true
    }

    if (savedPaymentData) {
      // Restore payment data except for file objects
      const restoredPaymentData = {
        ...savedPaymentData,
        transactionScreenshot: null // Files can't be restored from localStorage
      }
      setPaymentData(restoredPaymentData)
      hasRestoredData = true
    }

    if (savedShowPayment) {
      setShowPayment(savedShowPayment)
      hasRestoredData = true
    }

    if (hasRestoredData) {
      setDataRestored(true)
      // Show a brief notification that data was restored
      setTimeout(() => setDataRestored(false), 5000)
    }
  }, [])

  // Save data to localStorage whenever state changes
  useEffect(() => {
    if (selectedCategory) {
      saveToStorage(STORAGE_KEYS.CATEGORY, selectedCategory)
    }
  }, [selectedCategory])

  useEffect(() => {
    // Only save non-empty form data
    const hasData = Object.values(formData).some(value => 
      value && value !== '' && value !== null
    )
    if (hasData) {
      // Create a serializable version of form data (excluding File objects)
      const serializableFormData = {
        ...formData,
        photo: formData.photo ? { name: formData.photo.name, size: formData.photo.size } : null
      }
      saveToStorage(STORAGE_KEYS.FORM_DATA, serializableFormData)
    }
  }, [formData])

  useEffect(() => {
    // Only save non-empty payment data
    const hasPaymentData = paymentData.transactionId.trim() !== ''
    if (hasPaymentData) {
      // Create a serializable version of payment data (excluding File objects)
      const serializablePaymentData = {
        ...paymentData,
        transactionScreenshot: paymentData.transactionScreenshot ? 
          { name: paymentData.transactionScreenshot.name, size: paymentData.transactionScreenshot.size } : null
      }
      saveToStorage(STORAGE_KEYS.PAYMENT_DATA, serializablePaymentData)
    }
  }, [paymentData])

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.SHOW_PAYMENT, showPayment)
  }, [showPayment])

  // Network monitoring
  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine)
    }

    const updateConnectionType = () => {
      if ('connection' in navigator) {
        const conn = (navigator as any).connection
        setConnectionType(conn.effectiveType || conn.type || 'unknown')
      }
    }

    // Initial check
    updateOnlineStatus()
    updateConnectionType()

    // Add event listeners
    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)

    // Monitor connection changes if available
    if ('connection' in navigator) {
      (navigator as any).connection.addEventListener('change', updateConnectionType)
    }

    return () => {
      window.removeEventListener('online', updateOnlineStatus)
      window.removeEventListener('offline', updateOnlineStatus)
      if ('connection' in navigator) {
        (navigator as any).connection.removeEventListener('change', updateConnectionType)
      }
    }
  }, [])

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
      // Check file size limits with warnings
      if (file.size > 10 * 1024 * 1024) {
        setFieldError('photo', 'Photo size must be less than 10MB')
        return
      }
      
      // Warning for large files that might cause timeout
      if (file.size > 5 * 1024 * 1024) {
        setFieldError('photo', `Large file (${(file.size / 1024 / 1024).toFixed(1)}MB) may upload slowly. Consider compressing the image if upload fails.`)
      }

      const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/heic']
      const fileExt = file.name.split('.').pop()?.toLowerCase()
      const allowedExtensions = ['jpg', 'jpeg', 'png', 'heic']

      const mimeTypeValid = allowedMimeTypes.indexOf(file.type.toLowerCase()) !== -1
      const extensionValid = fileExt ? allowedExtensions.indexOf(fileExt) !== -1 : false

      if (!mimeTypeValid && !extensionValid) {
        setFieldError('photo', 'Please upload a valid image file (JPG, JPEG, PNG, or HEIC). Note: HEIC files may not work on all devices.')
        return
      }

      setFormData(prev => ({ ...prev, photo: file }))
      
      // Clear error if file size is acceptable
      if (file.size <= 5 * 1024 * 1024) {
        clearFieldError('photo')
      }
      setSubmitError(null)
    }
  }

  const handleScreenshotUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Check file size limits with warnings
      if (file.size > 10 * 1024 * 1024) {
        setPaymentError('transactionScreenshot', 'Screenshot size must be less than 10MB')
        return
      }
      
      // Warning for large files that might cause timeout
      if (file.size > 5 * 1024 * 1024) {
        setPaymentError('transactionScreenshot', `Large file (${(file.size / 1024 / 1024).toFixed(1)}MB) may upload slowly. Consider compressing the image if upload fails.`)
      }

      const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/heic']
      const fileExt = file.name.split('.').pop()?.toLowerCase()
      const allowedExtensions = ['jpg', 'jpeg', 'png', 'heic']

      const mimeTypeValid = allowedMimeTypes.indexOf(file.type.toLowerCase()) !== -1
      const extensionValid = fileExt ? allowedExtensions.indexOf(fileExt) !== -1 : false

      if (!mimeTypeValid && !extensionValid) {
        setPaymentError('transactionScreenshot', 'Please upload a valid image file (JPG, JPEG, PNG, or HEIC). Note: HEIC files may not work on all devices.')
        return
      }

      setPaymentData(prev => ({ ...prev, transactionScreenshot: file }))
      
      // Clear error if file size is acceptable
      if (file.size <= 5 * 1024 * 1024) {
        clearPaymentError('transactionScreenshot')
      }
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

    // Helper function to create AbortController with timeout
    const createTimeoutController = (timeoutMs: number) => {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs)
      return { controller, timeoutId }
    }

    // Retry function with exponential backoff
    const submitWithRetry = async (retryCount = 0): Promise<any> => {
      const maxRetries = 2
      const timeoutMs = 60000 + (retryCount * 30000) // 60s, 90s, 120s
      
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

        const { controller, timeoutId } = createTimeoutController(timeoutMs)

        try {
          const response = await fetch('/api/register', {
            method: 'POST',
            body: submitData,
            signal: controller.signal
          })

          clearTimeout(timeoutId)

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

            // Don't retry for client errors (4xx)
            if (response.status >= 400 && response.status < 500) {
              throw new Error(errorMessage)
            }

            // Retry for server errors (5xx) or network issues
            if (retryCount < maxRetries) {
              console.log(`Attempt ${retryCount + 1} failed, retrying... (${errorMessage})`)
              await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1))) // 1s, 2s delay
              return submitWithRetry(retryCount + 1)
            }

            throw new Error(errorMessage)
          }

          const result = await response.json()
          if (!result.success || !result.registration?.id) {
            throw new Error('Invalid response from server')
          }

          return result

        } catch (fetchError) {
          clearTimeout(timeoutId)
          
          // Handle different error types
          if (fetchError instanceof Error) {
            if (fetchError.name === 'AbortError') {
              const timeoutMessage = `Request timeout after ${timeoutMs / 1000} seconds. This may be due to slow internet connection or large file uploads.`
              
              if (retryCount < maxRetries) {
                console.log(`Attempt ${retryCount + 1} timed out, retrying...`)
                await new Promise(resolve => setTimeout(resolve, 2000)) // 2s delay for timeouts
                return submitWithRetry(retryCount + 1)
              }
              
              throw new Error(timeoutMessage + ' Please check your internet connection and try again.')
            }
            
            if (fetchError.message === 'Failed to fetch') {
              const networkMessage = 'Network connection failed. This could be due to internet connectivity issues or server problems.'
              
              if (retryCount < maxRetries) {
                console.log(`Network error on attempt ${retryCount + 1}, retrying...`)
                await new Promise(resolve => setTimeout(resolve, 2000 * (retryCount + 1))) // 2s, 4s delay
                return submitWithRetry(retryCount + 1)
              }
              
              throw new Error(networkMessage + ' Please check your internet connection and try again.')
            }
          }
          
          throw fetchError
        }

      } catch (error) {
        if (retryCount < maxRetries && error instanceof Error &&
            (error.message.includes('fetch') || error.message.includes('network') || error.message.includes('timeout'))) {
          console.log(`Retrying due to error: ${error.message}`)
          await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1)))
          return submitWithRetry(retryCount + 1)
        }
        throw error
      }
    }

    try {
      const result = await submitWithRetry()
      setRegistrationResult(result)
      setShowSuccessModal(true)
      // Clear saved data after successful submission
      clearStorage()

    } catch (error) {
      console.error('Registration error:', error)
      let errorMessage = 'Registration failed. Please try again.'
      
      if (error instanceof Error) {
        if (error.message.includes('timeout')) {
          errorMessage = 'Registration is taking longer than expected. This may be due to slow internet or large file uploads. Please try again with a stable internet connection.'
        } else if (error.message.includes('Failed to fetch') || error.message.includes('network')) {
          errorMessage = 'Network connection problem. Please check your internet connection and try again. If the problem persists, try switching between WiFi and mobile data.'
        } else {
          errorMessage = error.message
        }
      }
      
      setSubmitError(errorMessage)
      // Scroll to error message
      scrollToTop()
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
    // Clear saved data when user cancels
    clearStorage()
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

  const handleRetry = () => {
    if (showPayment) {
      const fakeEvent = { preventDefault: () => {} } as React.FormEvent
      handleFinalSubmit(fakeEvent)
    } else {
      const fakeEvent = { preventDefault: () => {} } as React.FormEvent
      handleFormSubmit(fakeEvent)
    }
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

        {/* Data Restored Notification */}
        {dataRestored && (
          <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-xl p-4 mb-6 animate-slide-up">
            <div className="flex items-center">
              <AlertCircle className="text-green-600 dark:text-green-400 mr-2 flex-shrink-0" size={20} />
              <p className="text-green-800 dark:text-green-200 text-sm">
                Your previously entered data has been restored. You can continue from where you left off. Note: You'll need to re-upload any photos.
              </p>
            </div>
          </div>
        )}

        {/* Header Section */}
        <HeaderSection />

        {/* Network Status Indicator */}
        {!isOnline && (
          <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-6 animate-slide-up">
            <div className="flex items-center">
              <WifiOff className="text-red-600 dark:text-red-400 mr-2 flex-shrink-0" size={20} />
              <p className="text-red-800 dark:text-red-200 text-sm">
                No internet connection detected. Please check your connection before submitting. Your form data is being saved automatically.
              </p>
            </div>
          </div>
        )}

        {isOnline && connectionType && (connectionType === 'slow-2g' || connectionType === '2g') && (
          <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4 mb-6 animate-slide-up">
            <div className="flex items-center">
              <Wifi className="text-yellow-600 dark:text-yellow-400 mr-2 flex-shrink-0" size={20} />
              <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                Slow internet connection detected ({connectionType}). File uploads may take longer than usual. Your form data is being saved automatically.
              </p>
            </div>
          </div>
        )}

        {/* Error Display */}
        {submitError && (
          <>
            <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-6 animate-slide-up">
              <div className="flex items-center">
                <AlertCircle className="text-red-600 dark:text-red-400 mr-2 flex-shrink-0" size={20} />
                <p className="text-red-800 dark:text-red-200 text-sm">{submitError}</p>
              </div>
            </div>
            
            <TroubleshootingGuide 
              error={submitError} 
              onRetry={handleRetry}
            />
          </>
        )}

        {/* Network Status Display */}
        <div className="mb-4 text-center">
            {isOnline ? null : (
                <div className="flex items-center justify-center text-red-600 dark:text-red-400">
                    <WifiOff className="mr-2" />
                    <span>You are offline. Please check your internet connection.</span>
                </div>
            )}
        </div>

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