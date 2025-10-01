'use client'

import { useMobileBackHandler } from '../hooks/useMobileBackHandler'

export default function MobileBackWrapper({ children }: { children: React.ReactNode }) {
  useMobileBackHandler()
  
  return <>{children}</>
}