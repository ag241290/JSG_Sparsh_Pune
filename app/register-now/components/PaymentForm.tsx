import React from 'react'
import { Camera, Check } from 'lucide-react'
import { RegistrationFormData, PaymentData, FieldErrors } from '../types'
import { categories } from '../constants'
import { ErrorMessage } from './ErrorMessage'

interface PaymentFormProps {
  selectedCategory: string
  formData: RegistrationFormData
  paymentData: PaymentData
  paymentErrors: FieldErrors
  isSubmitting: boolean
  onPaymentInputChange: (field: keyof PaymentData, value: string) => void
  onScreenshotUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent) => void
  onBack: () => void
}

export const PaymentForm: React.FC<PaymentFormProps> = ({
  selectedCategory,
  formData,
  paymentData,
  paymentErrors,
  isSubmitting,
  onPaymentInputChange,
  onScreenshotUpload,
  onSubmit,
  onBack
}) => {
  const getPaymentAmount = () => selectedCategory === 'kids' ? '600' : '800'
  const getUPILink = () => {
    const amount = getPaymentAmount()
      return `MAB.037324053200005@AXISBANK`
  }

  return (
    <form onSubmit={onSubmit} className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl sm:rounded-4xl p-6 sm:p-8 shadow-large border border-white/50 dark:border-gray-700/50 hover:shadow-glow-lg transition-all duration-500 animate-slide-up">
      <div className="mb-6 sm:mb-8">

        {/* Payment amount notice */}
        <div className="text-center text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
          <p>
            Please make the payment of{' '}
            <span className="text-blue-600 dark:text-blue-400">
              ₹{getPaymentAmount()}
            </span>
            {' '}towards your registration fee
          </p>
        </div>

        {/* UPI Payment Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 mb-6 border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-bold text-blue-800 dark:text-blue-300 mb-4 text-center">
            <span className="inline-block">&#128179;</span> Payment Details
          </h3>
          
          <div className="text-center space-y-4">
            <div>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                UPI ID for Payment:
              </p>
              <p className="text-lg font-mono bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-lg text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-blue-700">
                MAB.037324053200005@AXISBANK
              </p>
            </div>
            
            <div>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Amount to Pay:
              </p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                ₹{getPaymentAmount()}
              </p>
            </div>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-lg p-3 mt-4">
              <p className="text-sm text-yellow-800 dark:text-yellow-200 font-medium">
                📱 <span className="font-semibold">Note:</span> QR Code is shared on SPARSH WhatsApp group
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-600 dark:text-gray-400">
              After payment, please enter your Transaction ID and upload screenshot below
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {/* Left Column - Payment Details */}
        <div className="space-y-4 sm:space-y-6">
          <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
            <label htmlFor="transactionId" className="block text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Transaction ID *
            </label>
            <input
              id="transactionId"
              type="text"
              required
              value={paymentData.transactionId}
              onChange={(e) => onPaymentInputChange('transactionId', e.target.value)}
              className={`w-full border-2 ${paymentErrors.transactionId ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'} rounded-2xl px-4 py-3 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all duration-300 text-sm sm:text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:border-blue-300 dark:hover:border-blue-500`}
              placeholder="Enter your transaction ID"
            />
            <ErrorMessage error={paymentErrors.transactionId} />
          </div>

          <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
            <label htmlFor="transactionScreenshot" className="block text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Transaction Screenshot *
            </label>
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/heic"
                  onChange={onScreenshotUpload}
                  className="hidden"
                  id="screenshot-upload"
                />
                <label htmlFor="screenshot-upload" className={`block cursor-pointer rounded-2xl px-4 py-3 text-center transition-all duration-300 border-2 ${paymentErrors.transactionScreenshot ? 'border-red-500 dark:border-red-400 bg-red-50 dark:bg-red-900/20' : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-blue-500 dark:hover:border-blue-400'}`}>
                  {paymentData.transactionScreenshot ? (
                    <div className="text-green-600 dark:text-green-400">
                      <Check className="mx-auto mb-2" size={24} />
                      <p className="text-sm font-medium">
                        Screenshot uploaded
                      </p>
                    </div>
                  ) : (
                    <div className="text-gray-400 dark:text-gray-500">
                      <Camera className="mx-auto mb-2" size={24} />
                      <p className="text-sm">
                        Upload payment screenshot
                      </p>
                      <p className="text-xs mt-1">
                        JPG, JPEG, PNG, HEIC - Max size: 10MB
                      </p>
                    </div>
                  )}
                </label>
              </div>
            </div>
            <ErrorMessage error={paymentErrors.transactionScreenshot} />
          </div>
        </div>

        {/* Right Column - Registration Summary */}
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-md border border-blue-200 dark:border-blue-800 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <h3 className="text-lg sm:text-xl font-bold text-blue-800 dark:text-blue-300 mb-4">
              Registration Summary
            </h3>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm sm:text-base">
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  Selected Category:
                </span>
                <span className="text-gray-900 dark:text-white">
                  {categories.find(c => c.id === selectedCategory)?.name}
                </span>
              </div>
              
              <div className="flex justify-between text-sm sm:text-base">
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  Player Name:
                </span>
                <span className="text-gray-900 dark:text-white">
                  {formData.fullName}
                </span>
              </div>
              
              <div className="flex justify-between text-sm sm:text-base">
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  Jersey Name:
                </span>
                <span className="text-gray-900 dark:text-white">
                  {formData.jerseyName}
                </span>
              </div>
              
              <div className="flex justify-between text-sm sm:text-base">
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  Jersey Number:
                </span>
                <span className="text-gray-900 dark:text-white">
                  #{formData.jerseyNumber}
                </span>
              </div>
              
              <div className="flex justify-between text-sm sm:text-base">
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  Jersey Size:
                </span>
                <span className="text-gray-900 dark:text-white">
                  {formData.jerseySize}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8 sm:mt-12 animate-fade-in" style={{ animationDelay: '400ms' }}>
        <button
          type="button"
          onClick={onBack}
          className="flex-1 border-2 border-gray-400 dark:border-gray-500 text-gray-600 dark:text-gray-300 py-3 sm:py-4 rounded-2xl font-bold hover:bg-gray-50 dark:hover:bg-gray-700 hover:scale-105 transition-all duration-300 text-sm sm:text-base group"
        >
          <span className="group-hover:animate-pulse">← Back to Form</span>
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`flex-1 py-3 sm:py-4 rounded-2xl font-bold hover:scale-105 transition-all duration-300 text-sm sm:text-base flex items-center justify-center ${
            isSubmitting 
              ? 'bg-gray-400 cursor-not-allowed text-white' 
              : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white hover:shadow-glow'
          }`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 616-7.745V5a10 10 0 000 14v-1.255A8 8 0 714 12z"></path>
              </svg>
              Processing...
            </>
          ) : (
            <span className="group-hover:animate-pulse">Complete Registration</span>
          )}
        </button>
      </div>
    </form>
  )
}