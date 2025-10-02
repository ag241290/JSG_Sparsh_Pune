'use client'

import React from 'react'

interface Category {
  id: string
  name: string
  ageRequirement: string
}

interface FormData {
  parentName: string
  fullName: string
  mobileNumber: string
  age: string
  skillset: string
  bowlingArm: string
  photo: File | null
  cricHeroesLink: string
  jerseyName: string
  jerseyNumber: string
  jerseySize: string
  cricketExperience?: string
}

interface RegistrationSummaryProps {
  selectedCategory: string
  categories: Category[]
  formData: FormData
}

const RegistrationSummary: React.FC<RegistrationSummaryProps> = ({
  selectedCategory,
  categories,
  formData
}) => {
  const selectedCategoryData = categories.find(c => c.id === selectedCategory)

  return (
    <div className="bg-blue-50 dark:bg-blue-900/30 p-3 sm:p-4 rounded-lg sm:rounded-xl mb-4 sm:mb-6 border border-blue-200 dark:border-blue-800 backdrop-blur-sm">
      <h3 className="text-base sm:text-lg font-bold text-blue-800 dark:text-blue-300 mb-3">
        Registration Summary
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-blue-700 dark:text-blue-200">
        <div>
          <strong className="text-blue-800 dark:text-blue-300">Category:</strong> {selectedCategoryData?.name}
        </div>
        <div>
          <strong className="text-blue-800 dark:text-blue-300">Name:</strong> {formData.fullName}
        </div>
        {formData.parentName && (
          <div>
            <strong className="text-blue-800 dark:text-blue-300">Parent:</strong> {formData.parentName}
          </div>
        )}
        <div>
          <strong className="text-blue-800 dark:text-blue-300">Mobile:</strong> {formData.mobileNumber}
        </div>
        <div>
          <strong className="text-blue-800 dark:text-blue-300">Age:</strong> {formData.age} years
        </div>
        <div className="sm:col-span-2">
          <strong className="text-blue-800 dark:text-blue-300">Jersey:</strong> {formData.jerseyName} #{formData.jerseyNumber} ({formData.jerseySize})
        </div>
      </div>
    </div>
  )
}

export default RegistrationSummary