'use client'

import React from 'react'
import { CreditCard, CheckCircle, Check, ImageIcon, AlertCircle } from 'lucide-react'
import Image from 'next/image'

interface PaymentData {
  transactionId: string
  transactionScreenshot: File | null
}

interface FieldErrors {
  [key: string]: string
}

interface PaymentDetailsProps {
  selectedCategory: string
  paymentData: PaymentData
  paymentErrors: FieldErrors
  onPaymentInputChange: (field: keyof PaymentData, value: string) => void
  onScreenshotUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
  isSubmitting: boolean
  onBack: () => void
  onSubmit: (e: React.FormEvent) => void
}

const PaymentDetails: React.FC<PaymentDetailsProps> = ({
  selectedCategory,
  paymentData,
  paymentErrors,
  onPaymentInputChange,
  onScreenshotUpload,
  isSubmitting,
  onBack,
  onSubmit
}) => {
  // Error message component for consistency
  const ErrorMessage = ({ error }: { error: string }) => (
    error ? (
      <div className="flex items-center mt-1 text-red-600 dark:text-red-400">
        <AlertCircle size={14} className="mr-1 flex-shrink-0" />
        <span className="text-xs">{error}</span>
      </div>
    ) : null
  )

  return (
    <>
      {/* Compact Payment Header */}
      <div className="text-center mb-3 sm:mb-4">
        <div className="bg-green-600 dark:bg-green-700 text-white p-2 sm:p-3 rounded-lg sm:rounded-xl mb-3">
          <CreditCard className="mx-auto mb-1" size={20} />
          <h2 className="text-base sm:text-lg font-bold">Complete Your Payment</h2>
          <p className="text-green-100 dark:text-green-200 mt-1 text-xs">
            Scan QR code, pay, and upload transaction details
          </p>
        </div>
      </div>

      {/* Compact Registration Fee */}
      <div className="bg-yellow-50 dark:bg-yellow-900/30 p-2 sm:p-3 rounded-lg sm:rounded-xl mb-3 sm:mb-4 text-center border border-yellow-200 dark:border-yellow-800">
        <h3 className="text-base sm:text-lg font-bold text-yellow-800 dark:text-yellow-300 mb-1">
          Registration Fee
        </h3>
        <div className="text-xl sm:text-2xl font-bold text-yellow-600 dark:text-yellow-400">
          {selectedCategory === 'kids' ? '₹600' : '₹800'}
        </div>
        <p className="text-yellow-700 dark:text-yellow-300 text-xs mt-1">
          Includes tournament entry, jersey, and refreshments
        </p>
      </div>

      {/* Maximized QR Code Section */}
      <div className="bg-green-50 dark:bg-green-900/30 p-4 sm:p-6 rounded-lg sm:rounded-xl mb-4 sm:mb-6 text-center border-2 border-green-200 dark:border-green-800">
        <h3 className="text-lg sm:text-xl font-bold text-green-800 dark:text-green-300 mb-4 sm:mb-6">
          📱 Scan QR Code to Pay
        </h3>
        <div className="flex justify-center mb-4 sm:mb-6">
          <div className="bg-white dark:bg-gray-100 p-4 sm:p-6 rounded-xl shadow-lg border-2 border-green-300 dark:border-green-600 w-full max-w-xs sm:max-w-sm">
            <Image
              src="/images/SPARSH_QR_Code.jpeg"
              alt="JSG SPARSH Payment QR Code"
              width={320}
              height={320}
              className="mx-auto rounded-lg w-full h-auto"
              priority
            />
          </div>
        </div>
        <div className="text-green-700 dark:text-green-300 space-y-2">
          <p className="font-semibold text-sm sm:text-base">
            💳 Scan with any UPI app (GPay, PhonePe, Paytm, etc.)
          </p>
          <p className="text-xs sm:text-sm">
            After payment, enter transaction details below
          </p>
        </div>
      </div>

      {/* Enhanced Transaction Details with Field-Specific Validation */}
      <div className="space-y-3">
        <div className="border-2 border-gray-300 dark:border-gray-600 rounded-lg p-3 sm:p-4 bg-white dark:bg-gray-800">
          <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center text-sm">
            <CheckCircle className="mr-2 text-green-600 dark:text-green-400" size={16} />
            Enter Payment Details
          </h4>
          
          <div className="grid grid-cols-1 gap-4">
            {/* Transaction ID with Inline Validation */}
            <div>
              <label htmlFor="payment-transactionId" className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Transaction ID / UTR Number *
              </label>
              <input
                id="payment-transactionId"
                type="text"
                required
                value={paymentData.transactionId}
                onChange={(e) => onPaymentInputChange('transactionId', e.target.value)}
                className={`w-full border-2 ${
                  paymentErrors.transactionId 
                    ? 'border-red-500 dark:border-red-400 bg-red-50 dark:bg-red-900/20' 
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                } rounded-lg px-3 py-2 focus:border-green-500 dark:focus:border-green-400 focus:outline-none transition-all duration-300 text-sm text-gray-900 dark:text-white hover:border-green-300 dark:hover:border-green-500`}
                placeholder="Enter 12-digit transaction ID"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Find this in your payment app after successful payment
              </p>
              <ErrorMessage error={paymentErrors.transactionId || ''} />
            </div>

            {/* Transaction Screenshot with Enhanced Validation */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Transaction Screenshot *
              </label>
              <div className={`border-2 border-dashed rounded-lg p-3 text-center transition-all duration-300 ${
                paymentErrors.transactionScreenshot 
                  ? 'border-red-500 dark:border-red-400 bg-red-50 dark:bg-red-900/20' 
                  : paymentData.transactionScreenshot 
                    ? 'border-green-300 dark:border-green-600 bg-green-50 dark:bg-green-900/20' 
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-green-500 dark:hover:border-green-400 hover:bg-green-50 dark:hover:bg-green-900/10'
              }`}>
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/heic"
                  onChange={onScreenshotUpload}
                  className="hidden"
                  id="screenshot-upload"
                />
                <label htmlFor="screenshot-upload" className="cursor-pointer">
                  {paymentData.transactionScreenshot ? (
                    <div className="text-green-600 dark:text-green-400">
                      <Check className="mx-auto mb-1" size={20} />
                      <p className="text-xs font-medium break-all">
                        {paymentData.transactionScreenshot.name}
                      </p>
                      <p className="text-xs text-green-500 dark:text-green-400 mt-1">Screenshot uploaded successfully</p>
                    </div>
                  ) : (
                    <div className={`transition-colors duration-300 ${
                      paymentErrors.transactionScreenshot 
                        ? 'text-red-500 dark:text-red-400' 
                        : 'text-gray-400 dark:text-gray-500 hover:text-green-500 dark:hover:text-green-400'
                    }`}>
                      <ImageIcon className="mx-auto mb-1 hover:animate-bounce" size={20} />
                      <p className="text-xs">
                        Click to upload screenshot
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">JPG, JPEG, PNG, HEIC - Max size: 10MB</p>
                    </div>
                  )}
                </label>
              </div>
              <ErrorMessage error={paymentErrors.transactionScreenshot || ''} />
            </div>
          </div>
        </div>

        {/* Enhanced Action Buttons with Better Accessibility */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 border-2 border-gray-400 dark:border-gray-500 text-gray-600 dark:text-gray-300 py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-500 dark:hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-300 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
            aria-label="Go back to registration form"
          >
            Back to Form
          </button>
          <button
            type="submit"
            onClick={onSubmit}
            className="flex-1 bg-green-600 hover:bg-green-700 focus:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:bg-green-700 text-white py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-all duration-300 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            disabled={isSubmitting}
            aria-label="Complete registration and submit payment details"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin mr-2 w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                Submitting Registration...
              </>
            ) : (
              <>
                <CheckCircle className="mr-2" size={20} />
                Complete Registration
              </>
            )}
          </button>
        </div>

        {/* Enhanced Payment Instructions */}
        <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-3 sm:p-4 mt-4">
          <h4 className="font-semibold text-blue-800 dark:text-blue-300 text-sm mb-2">
            💡 Payment Instructions:
          </h4>
          <div className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
            <p>1. Scan the QR code with any UPI app</p>
            <p>2. Pay the exact registration fee amount</p>
            <p>3. Take a screenshot of the successful payment</p>
            <p>4. Enter the transaction ID and upload the screenshot</p>
            <p>5. Click "Complete Registration" to submit</p>
          </div>
        </div>

        {/* Support Information */}
        <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 text-center">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Need help? Contact support at{' '}
            <a 
              href="mailto:support@jsgsparhpune.com" 
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline font-medium transition-colors duration-300"
            >
              support@jsgsparhpune.com
            </a>
          </p>
        </div>
      </div>
    </>
  )
}

export default PaymentDetails