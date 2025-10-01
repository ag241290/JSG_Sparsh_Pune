'use client'

import React, { useState, useEffect } from 'react'
import { MobileDetection } from '../utils/mobileUtils'

export default function MobileDebugInfo() {
  const [showDebug, setShowDebug] = useState(false)
  const [mobileInfo, setMobileInfo] = useState<any>(null)

  useEffect(() => {
    setMobileInfo(MobileDetection.getPlatformInfo())
  }, [])

  // Only show debug button on mobile and in development
  if (process.env.NODE_ENV === 'production' && !mobileInfo?.isMobile) {
    return null
  }

  return (
    <>
      {/* Debug Toggle Button - Only show on mobile */}
      {mobileInfo?.isMobile && (
        <button
          onClick={() => setShowDebug(!showDebug)}
          className="fixed top-16 right-4 z-40 bg-gray-600 text-white p-2 rounded-full text-xs opacity-30 hover:opacity-80 transition-opacity"
          style={{ fontSize: '10px', width: '30px', height: '30px' }}
        >
          ??
        </button>
      )}

      {/* Debug Info Panel */}
      {showDebug && mobileInfo && (
        <div className="fixed top-20 right-4 z-40 bg-black bg-opacity-90 text-white p-3 rounded-lg text-xs max-w-xs">
          <div className="mb-2 font-bold text-blue-300">?? Debug Info</div>
          <div className="space-y-1">
            <div>Mobile: {mobileInfo.isMobile ? '?' : '?'}</div>
            <div>Android: {mobileInfo.isAndroid ? '?' : '?'}</div>
            <div>WebView: {mobileInfo.isWebView ? '?' : '?'}</div>
            <div className="text-yellow-300 mt-2">
              Back Handler: {mobileInfo.isMobile ? 'Active' : 'Inactive'}
            </div>
          </div>
          
          <button
            onClick={() => {
              console.log('Current URL:', window.location.href)
              console.log('History length:', window.history.length)
              console.log('User Agent:', navigator.userAgent)
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded text-xs mt-2"
          >
            Log Info
          </button>
        </div>
      )}
    </>
  )
}