'use client'

import { useMobileBackHandler } from '../hooks/useMobileBackHandler'
import MobileExitHandler from './MobileExitHandler'

export default function MobileBackWrapper({ children }: { children: React.ReactNode }) {
  useMobileBackHandler()
  
  return (
    <>
      {children}
      <MobileExitHandler />
    </>
  )
}