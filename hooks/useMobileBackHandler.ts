// Add this to your Next.js app layout or a custom hook
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function useMobileBackHandler() {
  const router = useRouter()

  useEffect(() => {
    // Detect if running in Android WebView
    const isAndroidWebView = () => {
      const userAgent = navigator.userAgent.toLowerCase()
      return userAgent.includes('android') && userAgent.includes('wv')
    }

    // Detect if AndroidInterface is available
    const hasAndroidInterface = () => {
      return typeof window !== 'undefined' && window.AndroidInterface
    }

    if (isAndroidWebView() || hasAndroidInterface()) {
      // Handle browser back button for mobile app
      const handlePopState = (event) => {
        // Check if we're on the home page or category selection
        const currentPath = window.location.pathname
        
        if (currentPath === '/' || currentPath === '/register-now') {
          // Prevent default back behavior
          event.preventDefault()
          
          // Ask Android app to handle exit
          if (window.AndroidInterface) {
            window.AndroidInterface.requestAppExit()
          } else {
            // Fallback confirmation
            const shouldExit = confirm('Are you sure you want to exit JSG Sparsh Portal?')
            if (shouldExit) {
              window.close()
            } else {
              // Stay on current page
              window.history.pushState(null, '', currentPath)
            }
          }
        }
      }

      // Add event listener
      window.addEventListener('popstate', handlePopState)

      // Push initial state to handle first back press
      window.history.pushState(null, '', window.location.pathname)

      // Cleanup
      return () => {
        window.removeEventListener('popstate', handlePopState)
      }
    }
  }, [router])
}

// TypeScript interface for Android bridge
declare global {
  interface Window {
    AndroidInterface?: {
      onWebBackPressed: () => void
      requestAppExit: () => void
      showToast: (message: string) => void
    }
  }
}