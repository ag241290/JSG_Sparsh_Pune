import React from 'react'

interface HeaderSectionProps {
  // Add any props if needed in the future
}

export const HeaderSection: React.FC<HeaderSectionProps> = () => {
  return (
    <div className="text-center mb-8 sm:mb-12 animate-slide-up">
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl sm:rounded-4xl p-6 sm:p-10 mb-6 shadow-large border border-white/50 dark:border-gray-700/50 relative overflow-hidden group hover:shadow-glow-lg transition-all duration-500">
        <div className="relative z-10 space-y-2 sm:space-y-3">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-800 dark:text-blue-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 leading-tight">
            JSG Pune Sparsh
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 font-medium leading-tight">
            in proud association with
          </p>
          
          {/* Title Sponsor Logo */}
          <div className="flex justify-center py-4 relative">
            <div className="absolute inset-0 pointer-events-none"></div>

            <div className="group/logo relative">
              <div className="absolute -inset-4 rounded-full border border-yellow-400/30 animate-ping opacity-10 group-hover/logo:opacity-25 transition-opacity duration-500" style={{ animationDuration: '4s' }}></div>
              
              <div className="relative transform group-hover/logo:scale-105 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 via-transparent to-yellow-100/50 blur-2xl opacity-0 group-hover/logo:opacity-60 transition-all duration-700"></div>
                
                <img
                  src="/images/TitleSponsor.png"
                  alt="Title Sponsor"
                  className="relative max-h-48 sm:max-h-56 md:max-h-64 lg:max-h-56 w-auto object-contain transition-all duration-500 group-hover/logo:brightness-110 group-hover/logo:contrast-105"
                  style={{ 
                    filter: 'brightness(1.02) contrast(1.02) saturate(1.05)',
                  }}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/20 opacity-0 group-hover/logo:opacity-30 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            </div>
          </div>
          
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 font-medium leading-tight">
            presents
          </p>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-yellow-600 bg-clip-text text-transparent leading-tight">
            Sparsh Premier League
          </h2>
          
          <h3 className="text-xl sm:text-xl md:text-2xl font-bold text-yellow-600 dark:text-yellow-400 hover:text-yellow-500 dark:hover:text-yellow-300 transition-colors duration-300 leading-tight">
            Season 02
          </h3>

          {/* Date - Using HTML entities for emojis */}
          <div className="text-xl sm:text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400 animate-pulse pt-4">
            <span className="inline-block">&#127952;</span> 15 & 16 November 2025 <span className="inline-block">&#127952;</span>
            <p className="text-base sm:text-lg hover:text-white text-green-600 dark:text-green-400 transition-colors duration-300">
                Venue : Pushpa Sports Arena, Kondhwa, Pune-48
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}