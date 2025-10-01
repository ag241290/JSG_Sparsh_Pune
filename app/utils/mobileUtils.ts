/**
 * Simple Mobile Detection Utilities for JSG Sparsh Portal
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

  // Check if user is in Android WebView
  isAndroidWebView(): boolean {
    if (typeof window === 'undefined') return false
    
    const userAgent = navigator.userAgent.toLowerCase()
    return userAgent.includes('android') && (
      userAgent.includes('wv') ||
      userAgent.includes('webview') ||
      !userAgent.includes('chrome')
    )
  },

  // Check if user is on iOS
  isIOS(): boolean {
    if (typeof window === 'undefined') return false
    
    const userAgent = navigator.userAgent.toLowerCase()
    return /iphone|ipad|ipod/.test(userAgent)
  }
}