'use client'

import React, { useEffect, useState } from 'react'
import { isMobileDevice, isAndroidWebView } from '../hooks/useMobileBackHandler'

export default function MobileExitHandler() {
  const [showExitPrompt, setShowExitPrompt] = useState(false)

  useEffect(() => {
    if (!isMobileDevice()) return

    let exitPromptTimer: NodeJS.Timeout | null = null

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      // Only show for mobile users
      if (isMobileDevice()) {
        event.preventDefault()
        event.returnValue = 'Are you sure you want to exit JSG Sparsh Portal?'
        return event.returnValue
      }
    }

    const handleVisibilityChange = () => {
      if (document.hidden && isMobileDevice()) {
        // User might be trying to exit - prepare for potential return
        console.log('App went to background')
      }
    }

    // Add event listeners
    window.addEventListener('beforeunload', handleBeforeUnload)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Cleanup
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      if (exitPromptTimer) {
        clearTimeout(exitPromptTimer)
      }
    }
  }, [])

  // Custom exit confirmation modal for better UX
  if (showExitPrompt) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl">
          <div className="text-center">
            <div className="mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Exit JSG Sparsh Portal?
              </h3>
              <p className="text-gray-600 text-sm">
                Are you sure you want to leave the JSG Sparsh Portal?
              </p>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowExitPrompt(false)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-4 rounded-xl transition-colors duration-200"
              >
                Stay
              </button>
              <button
                onClick={() => {
                  setShowExitPrompt(false)
                  // Try to close the app
                  try {
                    window.close()
                  } catch (e) {
                    // Fallback for WebView
                    window.location.href = 'about:blank'
                  }
                }}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
}