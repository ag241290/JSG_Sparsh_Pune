import React from 'react'
import { Camera, Shirt, Check, X } from 'lucide-react'
import { RegistrationFormData, FieldErrors } from '../types'
import { categories, skillsets, bowlingArms, battingStyles, jerseySizes, genderOptions } from '../constants'
import { ErrorMessage } from './ErrorMessage'

interface RegistrationFormProps {
  selectedCategory: string
  formData: RegistrationFormData
  fieldErrors: FieldErrors
  isSubmitting: boolean
  onInputChange: (field: keyof RegistrationFormData, value: string) => void
  onPhotoUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent) => void
  onCancel: () => void
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  selectedCategory,
  formData,
  fieldErrors,
  isSubmitting,
  onInputChange,
  onPhotoUpload,
  onSubmit,
  onCancel
}) => {
  return (
    <form onSubmit={onSubmit} className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl sm:rounded-4xl p-6 sm:p-8 shadow-large border border-white/50 dark:border-gray-700/50 hover:shadow-glow-lg transition-all duration-500 animate-slide-up">
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-800 dark:text-blue-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
          Registration Form - {categories.find(c => c.id === selectedCategory)?.name}
        </h2>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
        >
          <X size={24} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Left Column */}
        <div className="space-y-4 sm:space-y-6">
          {/* Parent Name - Only for Kids */}
          {selectedCategory === 'kids' && (
            <div className="animate-fade-in">
              <label htmlFor="parentName" className="block text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Father/Mother Name *
              </label>
              <input
                id="parentName"
                type="text"
                required
                value={formData.parentName}
                onChange={(e) => onInputChange('parentName', e.target.value)}
                className={`w-full border-2 ${fieldErrors.parentName ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'} rounded-2xl px-4 py-3 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all duration-300 text-sm sm:text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:border-blue-300 dark:hover:border-blue-500`}
                placeholder="Enter parent's full name"
              />
              <ErrorMessage error={fieldErrors.parentName} />
            </div>
          )}

          {/* Full Name */}
          <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
            <label htmlFor="fullName" className="block text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Full Name *
            </label>
            <input
              id="fullName"
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => onInputChange('fullName', e.target.value)}
              className={`w-full border-2 ${fieldErrors.fullName ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'} rounded-2xl px-4 py-3 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all duration-300 text-sm sm:text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:border-blue-300 dark:hover:border-blue-500`}
              placeholder="Enter your full name"
            />
            <ErrorMessage error={fieldErrors.fullName} />
          </div>

          {/* Gender - Only for Kids */}
          {selectedCategory === 'kids' && (
            <div className="animate-fade-in" style={{ animationDelay: '150ms' }}>
              <label htmlFor="gender" className="block text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Gender *
              </label>
              <select
                id="gender"
                required
                value={formData.gender || ''}
                onChange={(e) => onInputChange('gender', e.target.value)}
                className={`w-full border-2 ${fieldErrors.gender ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'} rounded-2xl px-4 py-3 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all duration-300 text-sm sm:text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:border-blue-300 dark:hover:border-blue-500`}
              >
                <option value="">Select gender</option>
                {genderOptions.map((gender) => (
                  <option key={gender} value={gender}>
                    {gender}
                  </option>
                ))}
              </select>
              <ErrorMessage error={fieldErrors.gender} />
            </div>
          )}

          {/* Mobile Number */}
          <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
            <label htmlFor="mobileNumber" className="block text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Mobile Number *
            </label>
            <input
              id="mobileNumber"
              type="tel"
              required
              pattern="[0-9]{10}"
              value={formData.mobileNumber}
              onChange={(e) => onInputChange('mobileNumber', e.target.value)}
              className={`w-full border-2 ${fieldErrors.mobileNumber ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'} rounded-2xl px-4 py-3 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all duration-300 text-sm sm:text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:border-blue-300 dark:hover:border-blue-500`}
              placeholder="Enter 10-digit mobile number"
            />
            <ErrorMessage error={fieldErrors.mobileNumber} />
          </div>

          {/* Date of Birth - Fixed width for mobile */}
          <div className="animate-fade-in" style={{ animationDelay: '300ms' }}>
            <label htmlFor="dateOfBirth" className="block text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Date of Birth *
            </label>
            <input
              id="dateOfBirth"
              type="date"
              required
              value={formData.dateOfBirth}
              onChange={(e) => onInputChange('dateOfBirth', e.target.value)}
              className={`w-full max-w-full sm:max-w-none border-2 ${fieldErrors.dateOfBirth ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'} rounded-2xl px-3 sm:px-4 py-3 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all duration-300 text-sm sm:text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:border-blue-300 dark:hover:border-blue-500 text-left [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-70 hover:[&::-webkit-calendar-picker-indicator]:opacity-100`}
              max={new Date().toISOString().split('T')[0]}
              min="1920-01-01"
            />
            <ErrorMessage error={fieldErrors.dateOfBirth} />
            
            {/* Helper text for date validation */}
            {selectedCategory && (
              <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {selectedCategory === 'kids' ? (
                  <>Born between 14 November 2013 and 13 November 2018</>
                ) : (
                  <>Born before 14 November 2013</>
                )}
              </div>
            )}
          </div>

          {/* Skillset */}
          <div className="animate-fade-in" style={{ animationDelay: '400ms' }}>
            <label htmlFor="skillset" className="block text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Skillset *
            </label>
            <select
              id="skillset"
              required
              value={formData.skillset}
              onChange={(e) => onInputChange('skillset', e.target.value)}
              className={`w-full border-2 ${fieldErrors.skillset ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'} rounded-2xl px-4 py-3 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all duration-300 text-sm sm:text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:border-blue-300 dark:hover:border-blue-500`}
            >
              <option value="">Select your skillset</option>
              {skillsets.map((skill) => (
                <option key={skill} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
            <ErrorMessage error={fieldErrors.skillset} />
          </div>

          {/* Bowling Arm */}
          <div className="animate-fade-in" style={{ animationDelay: '500ms' }}>
            <label htmlFor="bowlingArm" className="block text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Bowling Arm *
            </label>
            <select
              id="bowlingArm"
              required
              value={formData.bowlingArm}
              onChange={(e) => onInputChange('bowlingArm', e.target.value)}
              className={`w-full border-2 ${fieldErrors.bowlingArm ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'} rounded-2xl px-4 py-3 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all duration-300 text-sm sm:text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:border-blue-300 dark:hover:border-blue-500`}
            >
              <option value="">Select bowling arm</option>
              {bowlingArms.map((arm) => (
                <option key={arm} value={arm}>
                  {arm}
                </option>
              ))}
            </select>
            <ErrorMessage error={fieldErrors.bowlingArm} />
          </div>

          {/* Batting Style */}
          <div className="animate-fade-in" style={{ animationDelay: '550ms' }}>
            <label htmlFor="battingStyle" className="block text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Batting Style *
            </label>
            <select
              id="battingStyle"
              required
              value={formData.battingStyle}
              onChange={(e) => onInputChange('battingStyle', e.target.value)}
              className={`w-full border-2 ${fieldErrors.battingStyle ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'} rounded-2xl px-4 py-3 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all duration-300 text-sm sm:text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:border-blue-300 dark:hover:border-blue-500`}
            >
              <option value="">Select batting style</option>
              {battingStyles.map((style) => (
                <option key={style} value={style}>
                  {style}
                </option>
              ))}
            </select>
            <ErrorMessage error={fieldErrors.battingStyle} />
          </div>

          {/* Cricket Experience for Male/Female */}
          {(selectedCategory === 'male' || selectedCategory === 'female') && (
            <div className="animate-fade-in" style={{ animationDelay: '600ms' }}>
              <label htmlFor="cricketExperience" className="block text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Cricket Experience
              </label>
              <select
                id="cricketExperience"
                value={formData.cricketExperience || ''}
                onChange={(e) => onInputChange('cricketExperience', e.target.value)}
                className="w-full border-2 border-gray-300 dark:border-gray-600 rounded-2xl px-4 py-3 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all duration-300 text-sm sm:text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:border-blue-300 dark:hover:border-blue-500"
              >
                <option value="">Select experience level</option>
                <option value="beginner">Beginner (0-2 years)</option>
                <option value="intermediate">Intermediate (2-5 years)</option>
                <option value="advanced">Advanced (5+ years)</option>
                <option value="professional">Professional/Semi-Pro</option>
              </select>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-4 sm:space-y-6">
          {/* Photo Upload */}
          <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
            <label className="block text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Photo Upload *
            </label>
            <div className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all duration-300 ${fieldErrors.photo ? 'border-red-500 dark:border-red-400 bg-red-50 dark:bg-red-900/20' : formData.photo ? 'border-green-300 dark:border-green-600 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30' : 'border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'}`}>
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/heic"
                onChange={onPhotoUpload}
                className="hidden"
                id="photo-upload"
              />
              <label htmlFor="photo-upload" className="cursor-pointer">
                {formData.photo ? (
                  <div className="text-green-600 dark:text-green-400">
                    <Check className="mx-auto mb-2 animate-bounce" size={32} />
                    <p className="text-sm sm:text-base font-medium">
                      {formData.photo.name}
                    </p>
                    <p className="text-xs text-green-500 dark:text-green-400 mt-1">Photo uploaded successfully</p>
                  </div>
                ) : (
                  <div className="text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300">
                    <Camera className="mx-auto mb-2 hover:animate-bounce" size={32} />
                    <p className="text-sm sm:text-base">
                      Click to upload photo
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">JPG, JPEG, PNG, HEIC - Max size: 10MB</p>
                  </div>
                )}
              </label>
            </div>
            <ErrorMessage error={fieldErrors.photo} />
          </div>

          {/* Cric Heroes Link */}
          <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
            <label htmlFor="cricHeroesLink" className="block text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Cric Heroes Link *
            </label>
            <input
              id="cricHeroesLink"
              type="url"
              required
              value={formData.cricHeroesLink}
              onChange={(e) => onInputChange('cricHeroesLink', e.target.value)}
              className={`w-full border-2 ${fieldErrors.cricHeroesLink ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'} rounded-2xl px-4 py-3 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all duration-300 text-sm sm:text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:border-blue-300 dark:hover:border-blue-500`}
              placeholder="https://cricheroes.com/player-profile/5594432/amit-gandhi"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Format: https://cricheroes.com/player-profile/[ID]/[name]
            </p>
            <ErrorMessage error={fieldErrors.cricHeroesLink} />
          </div>

          {/* Jersey Section */}
          <div className="bg-yellow-50/80 dark:bg-yellow-900/20 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-yellow-200 dark:border-yellow-800 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-all duration-300 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <h3 className="text-lg sm:text-xl font-bold text-yellow-800 dark:text-yellow-300 mb-4 flex items-center">
              <Shirt className="mr-2 group-hover:animate-bounce" size={20} />
              Jersey Details
            </h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="jerseyName" className="block text-sm font-semibold text-yellow-800 dark:text-yellow-300 mb-2">
                  Name on Jersey *
                </label>
                <input
                  id="jerseyName"
                  type="text"
                  required
                  maxLength={12}
                  value={formData.jerseyName}
                  onChange={(e) => onInputChange('jerseyName', e.target.value)}
                  className={`w-full border-2 ${fieldErrors.jerseyName ? 'border-red-500 dark:border-red-400' : 'border-yellow-300 dark:border-yellow-600'} rounded-xl px-3 py-2 focus:border-yellow-500 dark:focus:border-yellow-400 focus:outline-none transition-all duration-300 text-sm sm:text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:border-yellow-400 dark:hover:border-yellow-500`}
                  placeholder="Max 12 characters"
                />
                <ErrorMessage error={fieldErrors.jerseyName} />
              </div>

              <div>
                <label htmlFor="jerseyNumber" className="block text-sm font-semibold text-yellow-800 dark:text-yellow-300 mb-2">
                  Number on Jersey *
                </label>
                <input
                  id="jerseyNumber"
                  type="number"
                  required
                  min="1"
                  max="99"
                  value={formData.jerseyNumber}
                  onChange={(e) => onInputChange('jerseyNumber', e.target.value)}
                  className={`w-full border-2 ${fieldErrors.jerseyNumber ? 'border-red-500 dark:border-red-400' : 'border-yellow-300 dark:border-yellow-600'} rounded-xl px-3 py-2 focus:border-yellow-500 dark:focus:border-yellow-400 focus:outline-none transition-all duration-300 text-sm sm:text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:border-yellow-400 dark:hover:border-yellow-500`}
                  placeholder="Enter jersey number (1-99)"
                />
                <ErrorMessage error={fieldErrors.jerseyNumber} />
              </div>

              <div>
                <label htmlFor="jerseySize" className="block text-sm font-semibold text-yellow-800 dark:text-yellow-300 mb-2">
                  Jersey Size *
                </label>
                <select
                  id="jerseySize"
                  required
                  value={formData.jerseySize}
                  onChange={(e) => onInputChange('jerseySize', e.target.value)}
                  className={`w-full border-2 ${fieldErrors.jerseySize ? 'border-red-500 dark:border-red-400' : 'border-yellow-300 dark:border-yellow-600'} rounded-xl px-3 py-2 focus:border-yellow-500 dark:focus:border-yellow-400 focus:outline-none transition-all duration-300 text-sm sm:text-base bg-white dark:bg-gray-700 text-gray-900 dark:text-white hover:border-yellow-400 dark:hover:border-yellow-500`}
                >
                  <option value="">Select size</option>
                  {jerseySizes.map((size) => (
                    <option key={size.size} value={size.size}>
                      {size.label}
                    </option>
                  ))}
                </select>
                <ErrorMessage error={fieldErrors.jerseySize} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6 sm:mt-8 text-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full sm:w-auto px-6 py-3 rounded-2xl font-semibold text-white transition-all duration-300 flex items-center justify-center mx-auto group ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 via-purple-600 to-yellow-600 hover:from-blue-500 hover:via-purple-500 hover:to-yellow-500'}`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 616-7.745V5a10 10 0 000 14v-1.255A8 8 0 614 12z"></path>
              </svg>
              Submitting...
            </>
          ) : (
            'Proceed to Payment'
          )}
        </button>
      </div>
    </form>
  )
}