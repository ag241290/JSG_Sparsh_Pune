'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function useMobileBackHandler() {
  const pathname = usePathname()

  useEffect(() => {
    // Detect mobile environment
    const isMobile = () => {
      if (typeof window === 'undefined') return false
      const userAgent = navigator.userAgent.toLowerCase()
      return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
    }

    // Detect Android WebView
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

    const handleBackButton = (event: PopStateEvent) => {
      const currentPath = window.location.pathname
      
      // Exit points where double-tap should work
      const exitPoints = ['/', '/register-now']
      const isAtExitPoint = exitPoints.includes(currentPath) || 
                           (currentPath === '/register-now' && !window.location.search)

      if (isAtExitPoint) {
        event.preventDefault()
        backPressCount++
        
        if (backPressCount === 1) {
          // First press - show message
          showExitMessage('Press back again to exit')
          
          // Reset after 2 seconds
          if (backPressTimer) clearTimeout(backPressTimer)
          backPressTimer = setTimeout(() => {
            backPressCount = 0
          }, 2000)
          
          // Stay on current page
          window.history.pushState(null, '', currentPath)
        } else {
          // Second press - try to exit
          if (backPressTimer) clearTimeout(backPressTimer)
          backPressCount = 0
          
          if (isAndroidWebView()) {
            // Try to close WebView
            try {
              window.close()
            } catch (e) {
              window.location.href = 'about:blank'
            }
          } else {
            // Mobile browser confirmation
            if (confirm('Exit JSG Sparsh Portal?')) {
              try {
                window.close()
              } catch (e) {
                window.location.href = 'about:blank'
              }
            } else {
              window.history.pushState(null, '', currentPath)
            }
          }
        }
      } else {
        // Normal navigation - reset counter
        backPressCount = 0
        if (backPressTimer) clearTimeout(backPressTimer)
      }
    }

    const showExitMessage = (message: string) => {
      // Remove existing message
      const existing = document.getElementById('exit-toast')
      if (existing) existing.remove()

      // Create message
      const toast = document.createElement('div')
      toast.id = 'exit-toast'
      toast.textContent = message
      toast.style.cssText = `
        position: fixed;
        bottom: 80px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 12px 20px;
        border-radius: 20px;
        font-size: 14px;
        z-index: 9999;
        font-family: system-ui, sans-serif;
        opacity: 0;
        transition: opacity 0.3s ease;
      `

      document.body.appendChild(toast)
      
      // Show message
      requestAnimationFrame(() => {
        toast.style.opacity = '1'
      })

      // Hide after 1.5 seconds
      setTimeout(() => {
        toast.style.opacity = '0'
        setTimeout(() => {
          if (document.body.contains(toast)) {
            document.body.removeChild(toast)
          }
        }, 300)
      }, 1500)
    }

    // Add event listener
    window.addEventListener('popstate', handleBackButton)
    
    // Initialize with current state
    window.history.pushState(null, '', pathname)

    // Cleanup
    return () => {
      window.removeEventListener('popstate', handleBackButton)
      if (backPressTimer) clearTimeout(backPressTimer)
    }
  }, [pathname])
}

// Simple utility exports
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