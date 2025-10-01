/**
 * Simple Mobile Detection Utilities for JSG Sparsh Portal
 * Lightweight detection without complex handlers
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