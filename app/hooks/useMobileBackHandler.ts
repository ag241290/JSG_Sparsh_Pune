'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { MobileBackButtonHandler, MobileDetection } from '../utils/mobileUtils'

export function useMobileBackHandler() {
  const pathname = usePathname()

  useEffect(() => {
    // Only initialize for mobile users
    if (!MobileDetection.isMobile()) {
      return
    }

    // Create handler instance
    const handler = new MobileBackButtonHandler({
      exitMessage: 'Press back again to exit JSG Sparsh Portal',
      exitTimeout: 2000,
      showToast: true
    })

    // Initialize and get cleanup function
    const cleanup = handler.initialize()

    // Return cleanup function
    return cleanup
  }, [pathname])
}

// Re-export utility functions for convenience
export const { isMobile: isMobileDevice, isAndroidWebView } = MobileDetection