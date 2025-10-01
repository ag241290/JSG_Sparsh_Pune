/**
 * Mobile Detection Utilities for JSG Sparsh Portal
 * Handles back button behavior for mobile users without requiring Android app changes
 */

export const MobileDetection = {
  // Check if user is on mobile device
  isMobile(): boolean {
    if (typeof window === 'undefined') return false
    
    const userAgent = navigator.userAgent.toLowerCase()
    return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
  },

  // Check if user is specifically on Android
  isAndroid(): boolean {
    if (typeof window === 'undefined') return false
    
    return navigator.userAgent.toLowerCase().includes('android')
  },

  // Check if user is in Android WebView (your app)
  isAndroidWebView(): boolean {
    if (typeof window === 'undefined') return false
    
    const userAgent = navigator.userAgent.toLowerCase()
    return userAgent.includes('android') && (
      userAgent.includes('wv') ||
      userAgent.includes('webview') ||
      !userAgent.includes('chrome') // Some WebViews don't include Chrome
    )
  },

  // Check if user is on iOS
  isIOS(): boolean {
    if (typeof window === 'undefined') return false
    
    const userAgent = navigator.userAgent.toLowerCase()
    return /iphone|ipad|ipod/.test(userAgent)
  },

  // Get mobile platform info
  getPlatformInfo(): {
    isMobile: boolean
    isAndroid: boolean
    isIOS: boolean
    isWebView: boolean
    userAgent: string
  } {
    return {
      isMobile: this.isMobile(),
      isAndroid: this.isAndroid(),
      isIOS: this.isIOS(),
      isWebView: this.isAndroidWebView(),
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : ''
    }
  }
}

/**
 * Mobile Back Button Handler
 * Implements double-tap-to-exit pattern for mobile users
 */
export class MobileBackButtonHandler {
  private backPressCount = 0
  private backPressTimer: NodeJS.Timeout | null = null
  private isInitialized = false

  constructor(private options: {
    exitMessage?: string
    exitTimeout?: number
    showToast?: boolean
  } = {}) {
    this.options = {
      exitMessage: 'Press back again to exit JSG Sparsh Portal',
      exitTimeout: 2000,
      showToast: true,
      ...options
    }
  }

  initialize(): () => void {
    if (this.isInitialized || !MobileDetection.isMobile()) {
      return () => {} // Return empty cleanup function
    }

    this.isInitialized = true

    const handlePopState = (event: PopStateEvent) => {
      this.handleBackPress(event)
    }

    // Add event listener
    window.addEventListener('popstate', handlePopState)

    // Push initial state
    window.history.pushState(null, '', window.location.pathname)

    // Return cleanup function
    return () => {
      window.removeEventListener('popstate', handlePopState)
      this.cleanup()
      this.isInitialized = false
    }
  }

  private handleBackPress(event: PopStateEvent): void {
    const currentPath = window.location.pathname
    const isAtExitPoint = this.isExitPoint(currentPath)

    if (isAtExitPoint) {
      event.preventDefault()
      this.backPressCount++

      if (this.backPressCount === 1) {
        this.handleFirstBackPress(currentPath)
      } else {
        this.handleSecondBackPress()
      }
    } else {
      this.resetBackPressCount()
    }
  }

  private isExitPoint(path: string): boolean {
    const exitPoints = ['/', '/register-now']
    return exitPoints.includes(path) || 
           (path === '/register-now' && !window.location.hash)
  }

  private handleFirstBackPress(currentPath: string): void {
    if (this.options.showToast) {
      this.showToast(this.options.exitMessage!)
    }

    // Reset counter after timeout
    this.backPressTimer = setTimeout(() => {
      this.backPressCount = 0
    }, this.options.exitTimeout)

    // Push state back to prevent navigation
    window.history.pushState(null, '', currentPath)
  }

  private handleSecondBackPress(): void {
    this.cleanup()
    this.attemptAppExit()
  }

  private resetBackPressCount(): void {
    this.backPressCount = 0
    if (this.backPressTimer) {
      clearTimeout(this.backPressTimer)
      this.backPressTimer = null
    }
  }

  private attemptAppExit(): void {
    if (MobileDetection.isAndroidWebView()) {
      // For Android WebView - try multiple methods
      try {
        window.close()
      } catch (e) {
        window.location.href = 'about:blank'
      }
    } else {
      // For mobile browsers - show confirmation
      const shouldExit = confirm('Are you sure you want to exit JSG Sparsh Portal?')
      if (shouldExit) {
        try {
          window.close()
        } catch (e) {
          window.location.href = 'about:blank'
        }
      } else {
        // Stay in app - push state back
        window.history.pushState(null, '', window.location.pathname)
      }
    }
  }

  private showToast(message: string): void {
    // Remove any existing toast
    const existingToast = document.getElementById('mobile-exit-toast')
    if (existingToast) {
      existingToast.remove()
    }

    // Create toast element
    const toast = document.createElement('div')
    toast.id = 'mobile-exit-toast'
    toast.textContent = message
    toast.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background-color: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 12px 24px;
      border-radius: 25px;
      font-size: 14px;
      font-weight: 500;
      z-index: 10000;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      max-width: 90%;
      text-align: center;
      transition: all 0.3s ease;
      opacity: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    `

    // Add to DOM
    document.body.appendChild(toast)

    // Animate in
    requestAnimationFrame(() => {
      toast.style.opacity = '1'
    })

    // Remove after timeout
    setTimeout(() => {
      toast.style.opacity = '0'
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast)
        }
      }, 300)
    }, this.options.exitTimeout! - 300)
  }

  private cleanup(): void {
    this.resetBackPressCount()
  }
}

// Export for debugging
export const debugMobileInfo = () => {
  if (typeof window === 'undefined') {
    console.log('Running on server side')
    return
  }

  const info = MobileDetection.getPlatformInfo()
  console.group('?? Mobile Detection Info')
  console.log('Is Mobile:', info.isMobile)
  console.log('Is Android:', info.isAndroid)
  console.log('Is iOS:', info.isIOS)
  console.log('Is WebView:', info.isWebView)
  console.log('User Agent:', info.userAgent)
  console.groupEnd()
}