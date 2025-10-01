'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function useMobileBackHandler() {
  const pathname = usePathname()

  useEffect(() => {
    // Detect if running in mobile environment
    const isMobile = () => {
      if (typeof window === 'undefined') return false
      const userAgent = navigator.userAgent.toLowerCase()
      return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
    }

    // Detect if running in Android WebView
    const isAndroidWebView = () => {
      if (typeof window === 'undefined') return false
      const userAgent = navigator.userAgent.toLowerCase()
      return userAgent.includes('android') && (
        userAgent.includes('wv') || 
        userAgent.includes('webview') ||
        !userAgent.includes('chrome')
      )
    }

    if (!isMobile()) return

    let backPressCount = 0
    let backPressTimer: NodeJS.Timeout | null = null

    const handlePopState = (event: PopStateEvent) => {
      const currentPath = window.location.pathname
      
      // Define exit points where double-tap-to-exit should work
      const exitPoints = ['/', '/register-now']
      const isAtExitPoint = exitPoints.includes(currentPath) || 
                           (currentPath === '/register-now' && window.location.search === '')

      if (isAtExitPoint) {
        // Prevent default back navigation
        event.preventDefault()
        
        backPressCount++
        
        if (backPressCount === 1) {
          // First back press - show toast
          showExitToast('Press back again to exit JSG Sparsh Portal')
          
          // Reset counter after 2 seconds
          if (backPressTimer) clearTimeout(backPressTimer)
          backPressTimer = setTimeout(() => {
            backPressCount = 0
          }, 2000)
          
          // Push state back to prevent navigation
          window.history.pushState(null, '', currentPath)
        } else {
          // Second back press - try to close app
          if (backPressTimer) clearTimeout(backPressTimer)
          backPressCount = 0
          
          if (isAndroidWebView()) {
            // For Android WebView - try to close
            try {
              window.close()
            } catch (e) {
              // Fallback - navigate to blank page
              window.location.href = 'about:blank'
            }
          } else {
            // For mobile browsers - simple confirmation
            if (confirm('Are you sure you want to exit JSG Sparsh Portal?')) {
              try {
                window.close()
              } catch (e) {
                window.location.href = 'about:blank'
              }
            } else {
              // User cancelled - push state back
              window.history.pushState(null, '', currentPath)
            }
          }
        }
      } else {
        // Not at exit point - reset counter and allow normal navigation
        backPressCount = 0
        if (backPressTimer) clearTimeout(backPressTimer)
      }
    }

    const showExitToast = (message: string) => {
      // Remove any existing toast
      const existingToast = document.getElementById('mobile-exit-toast')
      if (existingToast) {
        existingToast.remove()
      }

      // Create new toast
      const toast = document.createElement('div')
      toast.id = 'mobile-exit-toast'
      toast.textContent = message
      toast.style.cssText = `
        position: fixed;
        bottom: 80px;
        left: 50%;
        transform: translateX(-50%);
        background-color: rgba(0, 0, 0, 0.85);
        color: white;
        padding: 12px 20px;
        border-radius: 20px;
        font-size: 14px;
        font-weight: 500;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        max-width: 90%;
        text-align: center;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        opacity: 0;
        transition: opacity 0.3s ease;
      `

      document.body.appendChild(toast)

      // Animate in
      requestAnimationFrame(() => {
        toast.style.opacity = '1'
      })

      // Remove after 1.8 seconds
      setTimeout(() => {
        toast.style.opacity = '0'
        setTimeout(() => {
          if (document.body.contains(toast)) {
            document.body.removeChild(toast)
          }
        }, 300)
      }, 1800)
    }

    // Add popstate listener
    window.addEventListener('popstate', handlePopState)

    // Push initial state
    window.history.pushState(null, '', pathname)

    // Cleanup
    return () => {
      window.removeEventListener('popstate', handlePopState)
      if (backPressTimer) clearTimeout(backPressTimer)
    }
  }, [pathname])
}

// Export utility functions
export const isMobileDevice = () => {
  if (typeof window === 'undefined') return false
  const userAgent = navigator.userAgent.toLowerCase()
  return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
}

export const isAndroidWebView = () => {
  if (typeof window === 'undefined') return false
  const userAgent = navigator.userAgent.toLowerCase()
  return userAgent.includes('android') && (
    userAgent.includes('wv') || 
    userAgent.includes('webview') ||
    !userAgent.includes('chrome')
  )
}