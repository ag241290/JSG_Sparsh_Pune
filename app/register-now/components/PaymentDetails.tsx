'use client'

import React from 'react'
import { CreditCard, CheckCircle, Check, ImageIcon } from 'lucide-react'
import Image from 'next/image'

interface PaymentData {
  transactionId: string
  transactionScreenshot: File | null
}

interface PaymentDetailsProps {
  selectedCategory: string
  paymentData: PaymentData
  onPaymentInputChange: (field: keyof PaymentData, value: string) => void
  onScreenshotUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
  isSubmitting: boolean
  onBack: () => void
  onSubmit: (e: React.FormEvent) => void
}

const PaymentDetails: React.FC<PaymentDetailsProps> = ({
  selectedCategory,
  paymentData,
  onPaymentInputChange,
  onScreenshotUpload,
  isSubmitting,
  onBack,
  onSubmit
}) => {
  return (
    <>
      {/* Compact Payment Header */}
      <div className="text-center mb-3 sm:mb-4">
        <div className="bg-green-600 text-white p-2 sm:p-3 rounded-lg sm:rounded-xl mb-3">
          <CreditCard className="mx-auto mb-1" size={20} />
          <h2 className="text-base sm:text-lg font-bold">Complete Your Payment</h2>
          <p className="text-green-100 mt-1 text-xs">
            Scan QR code, pay, and upload transaction details
          </p>
        </div>
      </div>

      {/* Compact Registration Fee */}
      <div className="bg-yellow-50 p-2 sm:p-3 rounded-lg sm:rounded-xl mb-3 sm:mb-4 text-center">
        <h3 className="text-base sm:text-lg font-bold text-yellow-800 mb-1">
          Registration Fee
        </h3>
        <div className="text-xl sm:text-2xl font-bold text-yellow-600">
          {selectedCategory === 'kids' ? '₹600' : '₹800'}
        </div>
        <p className="text-yellow-700 text-xs mt-1">
          Includes tournament entry, jersey, and refreshments
        </p>
      </div>

      {/* Maximized QR Code Section */}
      <div className="bg-green-50 p-4 sm:p-6 rounded-lg sm:rounded-xl mb-4 sm:mb-6 text-center border-2 border-green-200">
        <h3 className="text-lg sm:text-xl font-bold text-green-800 mb-4 sm:mb-6">
          📱 Scan QR Code to Pay
        </h3>
        <div className="flex justify-center mb-4 sm:mb-6">
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border-2 border-green-300 w-full max-w-xs sm:max-w-sm">
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
        <div className="text-green-700 space-y-2">
          <p className="font-semibold text-sm sm:text-base">
            💳 Scan with any UPI app (GPay, PhonePe, Paytm, etc.)
          </p>
          <p className="text-xs sm:text-sm">
            After payment, enter transaction details below
          </p>
        </div>
      </div>

      {/* Compact Transaction Details */}
      <div className="space-y-3">
        <div className="border-2 border-gray-300 rounded-lg p-3 sm:p-4">
          <h4 className="font-bold text-gray-800 mb-3 flex items-center text-sm">
            <CheckCircle className="mr-2 text-green-600" size={16} />
            Enter Payment Details
          </h4>
          
          <div className="grid grid-cols-1 gap-3">

            {/* Transaction ID */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Transaction ID / UTR Number *
              </label>
              <input
                type="text"
                required
                value={paymentData.transactionId}
                onChange={(e) => onPaymentInputChange('transactionId', e.target.value)}
                className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:border-green-500 focus:outline-none transition-colors text-sm"
                placeholder="Enter 12-digit transaction ID"
              />
              <p className="text-xs text-gray-500 mt-1">
                Find this in your payment app after successful payment
              </p>
            </div>

            {/* Transaction Screenshot */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Transaction Screenshot *
              </label>
              <div className={`border-2 border-dashed rounded-lg p-3 text-center transition-colors ${paymentData.transactionScreenshot ? 'border-green-300 bg-green-50' : 'border-gray-300 hover:border-green-500'}`}>
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/heic"
                  onChange={onScreenshotUpload}
                  className="hidden"
                  id="screenshot-upload"
                />
                <label htmlFor="screenshot-upload" className="cursor-pointer">
                  {paymentData.transactionScreenshot ? (
                    <div className="text-green-600">
                      <Check className="mx-auto mb-1" size={20} />
                      <p className="text-xs font-medium">
                        {paymentData.transactionScreenshot.name}
                      </p>
                      <p className="text-xs text-green-500 mt-1">Screenshot uploaded successfully</p>
                    </div>
                  ) : (
                    <div className="text-gray-400">
                      <ImageIcon className="mx-auto mb-1" size={20} />
                      <p className="text-xs">
                        Click to upload screenshot
                      </p>
                      <p className="text-xs text-gray-500 mt-1">JPG, JPEG, PNG, HEIC - Max size: 10MB</p>
                    </div>
                  )}
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 border-2 border-gray-400 text-gray-600 py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold hover:bg-gray-50 transition-all duration-300 text-sm sm:text-base disabled:opacity-50"
            disabled={isSubmitting}
          >
            Back to Form
          </button>
          <button
            type="submit"
            onClick={onSubmit}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold hover:shadow-xl transition-all duration-300 text-sm sm:text-base disabled:opacity-50 flex items-center justify-center"
            disabled={isSubmitting}
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
      </div>
    </>
  )
}

export default PaymentDetails