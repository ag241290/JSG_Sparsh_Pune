import React from 'react'
import { AlertCircle } from 'lucide-react'

interface ErrorMessageProps {
  error?: string
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => (
  error ? (
    <div className="flex items-center mt-1 text-red-600 dark:text-red-400">
      <AlertCircle size={14} className="mr-1 flex-shrink-0" />
      <span className="text-xs">{error}</span>
    </div>
  ) : null
)