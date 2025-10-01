'use client'

import React, { useState, useEffect } from 'react'
import { MobileDetection, debugMobileInfo } from '../utils/mobileUtils'

export default function MobileDebugInfo() {
  const [showDebug, setShowDebug] = useState(false)
  const [mobileInfo, setMobileInfo] = useState<any>(null)

  useEffect(() => {
    setMobileInfo(MobileDetection.getPlatformInfo())
  }, [])

  // Only show in development or when specifically enabled
  if (process.env.NODE_ENV === 'production' && !showDebug) {
    return null
  }

  return (
    <>
      {/* Debug Toggle Button - Only show on mobile or when debug is enabled */}
      {(mobileInfo?.isMobile || showDebug) && (
        <button
          onClick={() => {
            setShowDebug(!showDebug)
            if (!showDebug) {
              debugMobileInfo()
            }
          }}
          className="fixed top-20 right-4 z-50 bg-blue-500 text-white p-2 rounded-full text-xs opacity-50 hover:opacity-100 transition-opacity"
          style={{ fontSize: '10px' }}
        >
          ??
        </button>
      )}

      {/* Debug Info Panel */}
      {showDebug && mobileInfo && (
        <div className="fixed top-24 right-4 z-50 bg-black bg-opacity-90 text-white p-3 rounded-lg text-xs max-w-xs">
          <div className="mb-2 font-bold text-blue-300">?? Mobile Debug Info</div>
          <div className="space-y-1">
            <div>Mobile: {mobileInfo.isMobile ? '?' : '?'}</div>
            <div>Android: {mobileInfo.isAndroid ? '?' : '?'}</div>
            <div>iOS: {mobileInfo.isIOS ? '?' : '?'}</div>
            <div>WebView: {mobileInfo.isWebView ? '?' : '?'}</div>
            <div className="text-yellow-300 mt-2">
              Back Handler: {mobileInfo.isMobile ? 'Active' : 'Inactive'}
            </div>
            <div className="text-gray-300 text-xs mt-2 border-t border-gray-600 pt-2">
              UA: {mobileInfo.userAgent.substring(0, 50)}...
            </div>
          </div>
          
          {/* Test Buttons */}
          <div className="mt-3 space-y-1">
            <button
              onClick={() => {
                console.log('Testing back button simulation...')
                window.history.back()
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded text-xs"
            >
              Test Back Button
            </button>
            <button
              onClick={() => {
                console.log('Testing exit simulation...')
                const shouldExit = confirm('Test exit confirmation?')
                console.log('Exit confirmed:', shouldExit)
              }}
              className="w-full bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-xs"
            >
              Test Exit Dialog
            </button>
          </div>
        </div>
      )}
    </>
  )
}