'use client'

import React, { useEffect } from 'react'
import { CheckCircle } from 'lucide-react'

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  playerName: string
  category: string
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ 
  isOpen, 
  onClose, 
  playerName, 
  category 
}) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      // Add padding to prevent layout shift when scrollbar is hidden
      document.body.style.paddingRight = 'var(--scrollbar-width, 0px)'
    } else {
      document.body.style.overflow = 'unset'
      document.body.style.paddingRight = '0px'
    }

    // Calculate scrollbar width and set CSS variable
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`)

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset'
      document.body.style.paddingRight = '0px'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto"
      onClick={(e) => {
        // Close modal if clicking on backdrop
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
    >
      <div 
        className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 relative overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-yellow-50 opacity-50"></div>
        
        {/* Decorative Elements */}
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-green-200 rounded-full opacity-20"></div>
        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-200 rounded-full opacity-20"></div>
        
        <div className="relative z-10">
          {/* Success Icon */}
          <div className="text-center mb-6">
            <div className="mx-auto w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4 animate-bounce">
              <CheckCircle className="text-white" size={32} />
            </div>
            <div className="text-4xl mb-2">🎉</div>
            <h2 className="text-2xl font-bold text-green-800 mb-2">
              Registration Successful!
            </h2>
            <p className="text-green-600 text-sm">
              Welcome to SPL 02!
            </p>
          </div>

          {/* Player Details */}
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-4 mb-6">
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                Player Details
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-600">Name:</span>
                  <span className="text-gray-800">{playerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-600">Category:</span>
                  <span className="text-gray-800 capitalize">{category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-600">Payment:</span>
                  <span className="text-green-600 font-semibold">✅ Completed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tournament Info */}
          <div className="bg-yellow-50 rounded-2xl p-4 mb-6">
                      <h4 className="font-bold text-yellow-800 mb-2 text-center">🏆 Tournament Details</h4>
            <p className="text-yellow-700 text-sm mb-1">
              <strong>Date:</strong> November 15-16, 2025
            </p>
            <p className="text-yellow-700 text-sm">
              <strong>Venue:</strong> Pushpa Sports Arena (PSA)
            </p>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 rounded-2xl p-4 mb-6">
            <h4 className="font-bold text-blue-800 mb-3 text-center">🔜 What's Next?</h4>
            <div className="space-y-2 text-sm text-blue-700">
              <div className="flex items-start">
                <span className="text-blue-500 mr-2">🏆</span>
                <span>See you in Auction..!!</span>
              </div>
              <div className="flex items-start">
                <span className="text-blue-500 mr-2">📋</span>
                <span>Details will be shared soon</span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-center mb-6">
            <p className="text-gray-600 text-sm mb-2">
              For any query, Contact us :
                      </p>
                      <span>📞 </span>
            <a
              href="/committee"
                          className="inline-block text-center text-blue-600 font-semibold text-sm hover:text-blue-800 transition-colors duration-300 underline"
            > Committee 
            </a>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 rounded-2xl font-bold hover:from-green-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Continue to Homepage
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal