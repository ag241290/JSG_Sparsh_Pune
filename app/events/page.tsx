'use client'

import { Calendar, MapPin, Clock, Users, ArrowRight } from 'lucide-react'

export default function Events() {
  const events = [
    // Past Programs (for reference and inspiration)
    {
      id: 1,
      title: 'Rangbarse & AGM 2025',
      date: '2025-03-16',
      time: '9:00 AM - 6:00 PM',
      venue: 'Bharti Resort, Pune',
      description: 'A memorable Holi celebration with record-breaking participation of 275 members! Featured breakfast, adventure activities, vibrant Holi party with colors, foam, rain dance, and concluded with AGM presentation.',
      attendees: 275,
      highlights: ['Adventure Activities', 'Rain Dance', 'DJ & Dancing', 'AGM Presentation']
    },
    {
      id: 2,
      title: 'Installation Ceremony - Desh Rangila',
      date: '2025-04-16',
      time: '5:00 PM - 11:00 PM',
      venue: 'Utsav Banquet, Pune',
      description: 'Vibrant celebration of India\'s cultural heritage with committee installation. Members dressed in traditional attire representing diverse Indian cultures, with dance performances and oath-taking ceremony.',
      attendees: 200,
      highlights: ['Committee Installation', 'Cultural Performances', 'Traditional Attire', 'Award Ceremony']
    },
    {
      id: 3,
      title: 'SPARSH Aqua Magic',
      date: '2025-06-01',
      time: '7:00 AM - 11:00 PM',
      venue: 'Aqua Imagica Water Park',
      description: 'Unforgettable splash of fun at Aqua Imagica! Started with Darshan at Kalash Mandir, followed by thrilling water rides, wave pools, lunch at the park, and dinner at Zalawadi.',
      attendees: 150,
      highlights: ['Water Rides', 'Wave Pools', 'Temple Darshan', 'Full Day Fun']
    },
    {
      id: 4,
      title: 'Dazzle-N-Dance',
      date: '2025-07-06',
      time: '4:00 PM - 11:30 PM',
      venue: 'Epitome, Pune',
      description: 'Glam & Glitter edition with Masti Mania, live band musical tambola by Abhishek Parekh, and high-energy Bachata-Bollywood fusion by actress Aiyli Giya. Dance floor alive till the end!',
      attendees: 180,
      highlights: ['Live Band Tambola', 'Bachata-Bollywood Fusion', 'Celebrity Performance', 'DJ Night']
    }
  ]

  // Truncate description to ensure consistent length
  const truncateDescription = (text: string, maxLength: number = 120) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength).trim() + '...'
  }

  // Ensure exactly 4 highlights per event
  const normalizeHighlights = (highlights: string[]) => {
    if (highlights.length >= 4) return highlights.slice(0, 4)
    const padding = Array(4 - highlights.length).fill('More Details')
    return [...highlights, ...padding]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-yellow-600 mb-4 sm:mb-6">
            JSG SPARSH Events
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-2">
            Discover our vibrant community events - from cultural celebrations and adventure trips 
            to memorable experiences that bring our JSG SPARSH family together. Relive the moments 
            that made our community stronger and more united.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {events.map((event, index) => {
            const isEvenIndex = index % 2 === 0
            const headerColor = isEvenIndex ? 'from-blue-500 to-blue-600' : 'from-yellow-500 to-yellow-600'
            const accentColor = isEvenIndex ? 'blue' : 'yellow'
            
            return (
              <div 
                key={event.id} 
                className="bg-white rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                {/* Event Header */}
                <div className={`bg-gradient-to-r ${headerColor} p-6 sm:p-8 text-white relative overflow-hidden`}>
                  <div className="absolute inset-0 opacity-10">
                    <div className={`w-32 h-32 sm:w-48 sm:h-48 ${isEvenIndex ? 'bg-yellow-300' : 'bg-blue-300'} rounded-full -top-16 -right-16 sm:-top-24 sm:-right-24`}></div>
                  </div>
                  <div className="relative z-10 flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-bold mb-2 leading-tight">{event.title}</h3>
                      <div className={`w-12 sm:w-16 h-1 ${isEvenIndex ? 'bg-yellow-300' : 'bg-blue-300'} rounded-full`}></div>
                    </div>
                    <div className="text-right">
                      <div className={`text-3xl sm:text-4xl font-bold ${isEvenIndex ? 'text-yellow-200' : 'text-blue-200'}`}>
                        {new Date(event.date).getDate()}
                      </div>
                      <div className="text-sm opacity-90 font-medium">
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Event Details */}
                <div className="p-6 sm:p-8">
                  {/* Fixed Height Description */}
                  <div className="mb-4 sm:mb-6 h-16 sm:h-16">
                    <p className="text-gray-700 leading-relaxed font-medium text-sm sm:text-base">
                      {truncateDescription(event.description, 120)}
                    </p>
                  </div>
                  
                  {/* Fixed Height Event Highlights */}
                  <div className="mb-6 sm:mb-8 h-20 sm:h-20">
                    <h4 className={`font-bold ${isEvenIndex ? 'text-blue-800' : 'text-yellow-800'} mb-3 text-sm uppercase tracking-wide`}>
                      Event Highlights
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {normalizeHighlights(event.highlights).map((highlight, idx) => (
                        <span 
                          key={idx} 
                          className={`${isEvenIndex ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'} px-2 sm:px-3 py-1 rounded-lg text-xs font-semibold border text-center`}
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Event Info */}
                  <div className="space-y-3 mb-6 sm:mb-8">
                    <div className={`flex items-center ${isEvenIndex ? 'text-blue-700' : 'text-yellow-700'}`}>
                      <Calendar size={16} className={`mr-3 ${isEvenIndex ? 'text-blue-600' : 'text-yellow-600'} flex-shrink-0`} />
                      <span className="font-medium text-sm">
                        {new Date(event.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                    <div className={`flex items-center ${isEvenIndex ? 'text-blue-700' : 'text-yellow-700'}`}>
                      <Clock size={16} className={`mr-3 ${isEvenIndex ? 'text-blue-600' : 'text-yellow-600'} flex-shrink-0`} />
                      <span className="text-sm">{event.time}</span>
                    </div>
                    <div className={`flex items-center ${isEvenIndex ? 'text-blue-700' : 'text-yellow-700'}`}>
                      <MapPin size={16} className={`mr-3 ${isEvenIndex ? 'text-blue-600' : 'text-yellow-600'} flex-shrink-0`} />
                      <span className="text-sm">{event.venue}</span>
                    </div>
                    <div className={`flex items-center ${isEvenIndex ? 'text-blue-700' : 'text-yellow-700'}`}>
                      <Users size={16} className={`mr-3 ${isEvenIndex ? 'text-blue-600' : 'text-yellow-600'} flex-shrink-0`} />
                      <span className="text-sm">
                        <strong className="font-bold">{event.attendees}</strong> members attended
                      </span>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <button className={`flex-1 ${isEvenIndex ? 'bg-blue-600 hover:bg-blue-700' : 'bg-yellow-500 hover:bg-yellow-600'} text-white py-3 px-4 sm:px-6 rounded-xl sm:rounded-2xl transition-all duration-300 flex items-center justify-center space-x-2 font-bold text-sm shadow-lg hover:shadow-xl transform hover:scale-105`}>
                      <span>View Gallery</span>
                      <ArrowRight size={16} />
                    </button>
                    <button className={`flex-1 border-2 ${isEvenIndex ? 'border-blue-600 text-blue-600 hover:bg-blue-50' : 'border-yellow-500 text-yellow-600 hover:bg-yellow-50'} py-3 px-4 sm:px-6 rounded-xl sm:rounded-2xl transition-all duration-300 font-bold text-sm hover:shadow-lg transform hover:scale-105`}>
                      Share Event
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Call to Action - Enhanced Design */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-center shadow-2xl border-2 border-gray-100 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-yellow-50 opacity-50"></div>
          <div className="relative z-10">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-yellow-600">
              Want to Propose an Event?
            </h3>
            <p className="text-base sm:text-xl text-gray-600 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed px-2">
              Have an exciting idea for a JSG SPARSH event? Whether it's cultural, adventure, 
              or community bonding - we'd love to hear your suggestions and make it happen together!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
                Propose Event
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
                Contact Event Team
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}