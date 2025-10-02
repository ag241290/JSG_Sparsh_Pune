import React, { useState } from 'react'
import { AlertTriangle, CheckCircle, XCircle, RefreshCw, Wifi, Upload, Clock } from 'lucide-react'

interface TroubleshootingGuideProps {
  error: string
  onRetry?: () => void
}

export const TroubleshootingGuide: React.FC<TroubleshootingGuideProps> = ({ error, onRetry }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const getTroubleshootingSteps = (errorMessage: string) => {
    const steps = []

    if (errorMessage.includes('timeout') || errorMessage.includes('slow')) {
      steps.push({
        icon: Clock,
        title: 'Upload Timeout Issues',
        description: 'Your files are taking too long to upload',
        solutions: [
          'Check your internet connection speed',
          'Try compressing your images to reduce file size',
          'Switch from WiFi to mobile data (or vice versa)',
          'Try uploading during off-peak hours',
          'Ensure your images are under 5MB each for faster uploads'
        ]
      })
    }

    if (errorMessage.includes('Failed to fetch') || errorMessage.includes('network')) {
      steps.push({
        icon: Wifi,
        title: 'Network Connection Problems',
        description: 'Unable to connect to the registration server',
        solutions: [
          'Check your internet connection',
          'Try refreshing the page',
          'Switch between WiFi and mobile data',
          'Disable VPN if you\'re using one',
          'Check if other websites are working properly',
          'Try again in a few minutes'
        ]
      })
    }

    if (errorMessage.includes('file') || errorMessage.includes('upload') || errorMessage.includes('image')) {
      steps.push({
        icon: Upload,
        title: 'File Upload Issues',
        description: 'Problems with your photo or screenshot files',
        solutions: [
          'Ensure files are in JPG, JPEG, or PNG format',
          'Check that each file is under 10MB',
          'Try taking new photos with your device camera',
          'Avoid HEIC format as it may not work on all devices',
          'Make sure files are not corrupted'
        ]
      })
    }

    // Default general troubleshooting
    if (steps.length === 0) {
      steps.push({
        icon: RefreshCw,
        title: 'General Registration Issues',
        description: 'Something went wrong during registration',
        solutions: [
          'Try submitting the form again',
          'Check all required fields are filled',
          'Refresh the page and start over',
          'Try using a different browser',
          'Clear your browser cache and cookies',
          'Contact Committee if the problem persists'
        ]
      })
    }

    return steps
  }

  const troubleshootingSteps = getTroubleshootingSteps(error)

  return (
    <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-4 mt-4">
      <div className="flex items-start gap-3">
        <AlertTriangle className="text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" size={20} />
        <div className="flex-1">
          <h3 className="font-medium text-orange-800 dark:text-orange-200 mb-2">
            Registration Failed - Troubleshooting Guide
          </h3>
          
          <p className="text-orange-700 dark:text-orange-300 text-sm mb-3">
            {error}
          </p>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-orange-600 dark:text-orange-400 text-sm font-medium hover:underline mb-3"
          >
            {isExpanded ? 'Hide' : 'Show'} troubleshooting steps
          </button>

          {isExpanded && (
            <div className="space-y-4">
              {troubleshootingSteps.map((step, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-orange-200 dark:border-orange-700">
                  <div className="flex items-start gap-3 mb-3">
                    <step.icon className="text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" size={18} />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                        {step.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="ml-6">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Try these solutions:</p>
                    <ul className="space-y-1">
                      {step.solutions.map((solution, solutionIndex) => (
                        <li key={solutionIndex} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={14} />
                          {solution}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}

              {onRetry && (
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={onRetry}
                    className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm"
                  >
                    <RefreshCw size={16} />
                    Try Again
                  </button>
                  <button
                    onClick={() => window.location.reload()}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
                  >
                    <RefreshCw size={16} />
                    Refresh Page
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}