import { useState, useCallback } from 'react'
import { RegistrationFormData, PaymentData, FieldErrors } from '../types'

export function useFormValidation(selectedCategory: string) {
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [paymentErrors, setPaymentErrors] = useState<FieldErrors>({})

  const validateField = useCallback((field: keyof RegistrationFormData, value: string | File | null | undefined): string => {
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
      
      case 'dateOfBirth':
        if (!value || (typeof value === 'string' && !value.trim())) {
          return 'Date of birth is required'
        }
        if (typeof value === 'string') {
          const birthDate = new Date(value)
          const today = new Date()
          const tournamentDate = new Date('2025-11-14') // Tournament date: 14 November 2025
          
          if (isNaN(birthDate.getTime())) {
            return 'Please enter a valid date'
          }
          
          if (birthDate > today) {
            return 'Date of birth cannot be in the future'
          }
          
          // Age validation based on category and tournament eligibility
          if (selectedCategory === 'kids') {
            // Kids: Born on or after 14 November 2013 and before 14 November 2018
            const minDate = new Date('2013-11-14')
            const maxDate = new Date('2018-11-13') // Day before 2018-11-14
            
            if (birthDate < minDate) {
              return 'For kids category, participant must be born on or after 14 November 2013'
            }
            if (birthDate > maxDate) {
              return 'For kids category, participant must be born before 14 November 2018'
            }
          } else if (selectedCategory === 'male' || selectedCategory === 'female') {
            // Male/Female: Born before 14 November 2013
            const maxDate = new Date('2013-11-13') // Day before 2013-11-14
            
            if (birthDate > maxDate) {
              return 'For male/female category, participant must be born before 14 November 2013'
            }
          }
        }
        return ''
      
      case 'gender':
        if (selectedCategory === 'kids' && (!value || (typeof value === 'string' && !value.trim()))) {
          return 'Gender is required for kids category'
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
          // Updated pattern to accept both .in and .com domains
          const cricHeroesPattern = /^https:\/\/cricheroes\.(in|com)\/player-profile\/\d+\/[^\/\s]+.*$/;
          if (!cricHeroesPattern.test(value)) {
            return 'Please enter a valid Cric Heroes Link format: https://cricheroes.[in/com]/player-profile/ID/name'
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
  }, [selectedCategory])

  const validatePaymentField = useCallback((field: keyof PaymentData, value: string | File | null): string => {
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
  }, [])

  const validateAllFields = useCallback((formData: RegistrationFormData): boolean => {
    const errors: FieldErrors = {}
    let hasErrors = false

    // Validate all form fields
    const formKeys = Object.keys(formData) as Array<keyof RegistrationFormData>
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
  }, [validateField])

  const validateAllPaymentFields = useCallback((paymentData: PaymentData): boolean => {
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
  }, [validatePaymentField])

  const clearFieldError = useCallback((field: string) => {
    setFieldErrors(prev => ({ ...prev, [field]: '' }))
  }, [])

  const clearPaymentError = useCallback((field: string) => {
    setPaymentErrors(prev => ({ ...prev, [field]: '' }))
  }, [])

  const setFieldError = useCallback((field: string, error: string) => {
    setFieldErrors(prev => ({ ...prev, [field]: error }))
  }, [])

  const setPaymentError = useCallback((field: string, error: string) => {
    setPaymentErrors(prev => ({ ...prev, [field]: error }))
  }, [])

  const clearAllErrors = useCallback(() => {
    setFieldErrors({})
    setPaymentErrors({})
  }, [])

  return {
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
  }
}