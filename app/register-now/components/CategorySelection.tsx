import React from 'react'
import { categories } from '../constants'
import { Category } from '../types'

interface CategorySelectionProps {
  onCategorySelect: (categoryId: string) => void
}

export const CategorySelection: React.FC<CategorySelectionProps> = ({ onCategorySelect }) => {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="text-center animate-fade-in">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-800 dark:text-blue-300 mb-4 sm:mb-6 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
          Choose Your Category
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg mb-8">
          Select the category that best fits your profile
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {categories.map((category, index) => {
          const IconComponent = category.icon
          return (
            <div
              key={category.id}
              onClick={() => onCategorySelect(category.id)}
              className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl sm:rounded-4xl p-6 sm:p-8 shadow-large hover:shadow-glow-lg transition-all duration-500 cursor-pointer border-3 border-transparent hover:border-blue-300 dark:hover:border-blue-600 transform hover:-translate-y-2 hover:scale-105 min-h-[320px] flex flex-col relative overflow-hidden"
              style={{
                animationDelay: `${index * 200}ms`,
                animation: 'slideUp 0.8s ease-out forwards'
              }}
            >
              {/* Enhanced background effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-50/20 dark:via-blue-900/20 to-yellow-50/20 dark:to-yellow-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute inset-0 rounded-3xl sm:rounded-4xl border-2 border-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-500"></div>
              
              <div className="relative z-10 flex-1 flex flex-col">
                <div className={`bg-gradient-to-br ${category.buttonGradient} p-4 sm:p-6 rounded-2xl sm:rounded-3xl text-white text-center mb-4 sm:mb-6 transform group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-xl`}>
                  <IconComponent size={32} className="sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 group-hover:animate-bounce" />
                  <h3 className="text-xl sm:text-2xl font-bold">{category.name}</h3>
                </div>
                
                <div className="flex-1 flex flex-col items-center justify-center mb-4 space-y-3">
                  <div className={`${category.bgColor} dark:bg-opacity-20 px-4 py-2 rounded-full border-2 border-transparent group-hover:border-opacity-50 transition-all duration-300`}>
                    <p className={`${category.textColor} dark:text-gray-300 text-xs font-medium text-center leading-tight`}>
                      {category.ageRequirement}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-1">
                      Registration Fee
                    </div>
                    <div className="text-xl font-bold text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                    {category.fee}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      
      {/* Age Proof Disclaimer - Fix emoji using HTML entity */}
      <div className="bg-blue-50/80 dark:bg-blue-900/20 backdrop-blur-sm border border-blue-200 dark:border-blue-800 rounded-2xl p-4 mb-6 animate-fade-in hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-300">
        <div className="flex items-start justify-center space-x-3">
          <div className="text-center">
            <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
              <span className="inline-block">&#128221;</span> Age Verification
            </h4>
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              Please carry a valid age proof along, just in case it's needed for verification.
            </p>
          </div>
        </div>
      </div>
      
      {/* Enhanced disclaimers - Fix emoji using HTML entity */}
      <div className="bg-yellow-50/80 dark:bg-yellow-900/20 backdrop-blur-sm border border-yellow-200 dark:border-yellow-800 rounded-2xl p-4 mb-6 animate-fade-in hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors duration-300">
        <div className="flex items-center justify-center">
          <div className="text-yellow-800 dark:text-yellow-300 text-center">
            <p className="text-sm font-medium">
              <span className="inline-block">&#9888;</span> <strong>Important:</strong> Registration fees are non-refundable
            </p>
            <p className="text-xs mt-1 opacity-75">
              Please ensure all details are correct before proceeding with payment
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50/80 dark:bg-blue-900/20 backdrop-blur-sm border border-blue-200 dark:border-blue-800 rounded-2xl p-4 mb-6 animate-fade-in hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-300">
        <div className="text-center text-blue-800 dark:text-blue-300">
          <p className="text-sm">
            By registering, you agree to our{' '}
            <a href="/privacy-policy" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline font-medium transition-colors duration-300">
              Privacy Policy
            </a>
            {' '}and{' '}
            <a href="/terms-and-conditions" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline font-medium transition-colors duration-300">
              Terms & Conditions
            </a>
          </p>
        </div>
      </div>
      
      <div className="text-center mt-8 animate-fade-in">
        <p className="text-gray-500 dark:text-gray-400 text-sm animate-pulse">
          <span className="inline-block">&#10024;</span> Hover over a category to see it come to life!
        </p>
      </div>
    </div>
  )
}