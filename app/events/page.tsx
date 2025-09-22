'use client'

import { useState } from 'react'
import { Calendar, MapPin, Clock, Users, Filter, ArrowRight, Trophy, Heart, Camera } from 'lucide-react'

export default function Events() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedType, setSelectedType] = useState('all')

  const events = [
    // Past Programs (for reference and inspiration)
    {
      id: 1,
      title: 'Rangbarse & AGM 2025',
      date: '2025-03-16',
      time: '9:00 AM - 6:00 PM',
      venue: 'Bharti Resort, Pune',
      description: 'A memorable Holi celebration with record-breaking participation of 275 members! Featured breakfast, adventure activities, vibrant Holi party with colors, foam, rain dance, and concluded with AGM presentation.',
      category: 'Cultural',
      type: 'past',
      attendees: 275,
      registrationRequired: false,
      featured: true,
      highlights: ['Adventure Activities', 'Rain Dance', 'DJ & Dancing', 'AGM Presentation']
    },
    {
      id: 2,
      title: 'Installation Ceremony - Desh Rangila',
      date: '2025-04-16',
      time: '5:00 PM - 11:00 PM',
      venue: 'Utsav Banquet, Pune',
      description: 'Vibrant celebration of India\'s cultural heritage with committee installation. Members dressed in traditional attire representing diverse Indian cultures, with dance performances and oath-taking ceremony.',
      category: 'Official',
      type: 'past',
      attendees: 200,
      registrationRequired: false,
      featured: true,
      highlights: ['Committee Installation', 'Cultural Performances', 'Traditional Attire', 'Award Ceremony']
    },
    {
      id: 3,
      title: 'SPARSH Aqua Magic',
      date: '2025-04-01',
      time: '7:00 AM - 11:00 PM',
      venue: 'Aqua Imagica Water Park',
      description: 'Unforgettable splash of fun at Aqua Imagica! Started with Darshan at Kalash Mandir, followed by thrilling water rides, wave pools, lunch at the park, and dinner at Zalawadi.',
      category: 'Adventure',
      type: 'past',
      attendees: 150,
      registrationRequired: true,
      featured: true,
      highlights: ['Water Rides', 'Wave Pools', 'Temple Darshan', 'Full Day Fun']
    },
    {
      id: 4,
      title: 'Dazzle-N-Dance',
      date: '2025-07-06',
      time: '4:00 PM - 11:30 PM',
      venue: 'Epitome, Pune',
      description: 'Glam & Glitter edition with Masti Mania, live band musical tambola by Abhishek Parekh, and high-energy Bachata-Bollywood fusion by actress Aiyli Giya. Dance floor alive till the end!',
      category: 'Cultural',
      type: 'past',
      attendees: 180,
      registrationRequired: true,
      featured: true,
      highlights: ['Live Band Tambola', 'Bachata-Bollywood Fusion', 'Celebrity Performance', 'DJ Night']
    },
    // Upcoming Events
    {
      id: 5,
      title: 'Mahavir Jayanti Celebration 2026',
      date: '2026-04-10',
      time: '6:00 AM - 8:00 PM',
      venue: 'Multiple Jain Temples, Pune',
      description: 'Grand celebration of Mahavir Jayanti with Shobha Yatra participation, water distribution, food donation drive (1000+ packets), and blood donation camp in collaboration with local hospitals.',
      category: 'Religious',
      type: 'upcoming',
      attendees: 500,
      registrationRequired: true,
      featured: true,
      highlights: ['Shobha Yatra', 'Food Donation Drive', 'Blood Donation', 'Community Service']
    },
    {
      id: 6,
      title: 'Annual Picnic 2026',
      date: '2026-02-15',
      time: '8:00 AM - 8:00 PM',
      venue: 'Hill Station Resort (Location TBD)',
      description: 'Adventure-filled family picnic with outdoor activities, team games, nature walks, and traditional Jain food. Perfect opportunity for families to bond and create lasting memories.',
      category: 'Adventure',
      type: 'upcoming',
      attendees: 200,
      registrationRequired: true,
      featured: false,
      highlights: ['Adventure Activities', 'Family Games', 'Nature Walks', 'Traditional Food']
    },
    {
      id: 7,
      title: 'Cultural Night 2026',
      date: '2026-08-15',
      time: '6:00 PM - 11:00 PM',
      venue: 'Premium Banquet Hall, Pune',
      description: 'Annual cultural extravaganza featuring performances by JSG members, live music, dance competitions, and talent showcase. Celebrating artistic abilities within our community.',
      category: 'Cultural',
      type: 'upcoming',
      attendees: 250,
      registrationRequired: true,
      featured: true,
      highlights: ['Member Performances', 'Dance Competition', 'Talent Showcase', 'Live Music']
    },
    {
      id: 8,
      title: 'Health & Wellness Camp',
      date: '2026-01-25',
      time: '9:00 AM - 4:00 PM',
      venue: 'JSG Community Center',
      description: 'Comprehensive health camp with specialist consultations, blood donation drive, health screenings, yoga sessions, and nutrition awareness programs for community wellness.',
      category: 'Social Service',
      type: 'upcoming',
      attendees: 150,
      registrationRequired: true,
      featured: false,
      highlights: ['Health Screenings', 'Specialist Consultations', 'Yoga Sessions', 'Blood Donation']
    }
  ]

  const categories = ['all', 'Cultural', 'Religious', 'Adventure', 'Official', 'Social Service']
  const types = ['all', 'upcoming', 'past']

  const filteredEvents = events.filter(event => {
    const categoryMatch = selectedCategory === 'all' || event.category === selectedCategory
    const typeMatch = selectedType === 'all' || event.type === selectedType
    return categoryMatch && typeMatch
  })

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Religious': return 'from-orange-400 to-red-500'
      case 'Cultural': return 'from-purple-400 to-pink-500'
      case 'Adventure': return 'from-green-400 to-blue-500'
      case 'Official': return 'from-blue-500 to-indigo-600'
      case 'Social Service': return 'from-red-400 to-pink-500'
      default: return 'from-gray-400 to-gray-500'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Cultural': return Camera
      case 'Adventure': return Trophy
      case 'Social Service': return Heart
      default: return Calendar
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            JSG SPARSH Events
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover our vibrant community events - from cultural celebrations and adventure trips 
            to social service initiatives and religious programs. Join us in building stronger bonds 
            through meaningful experiences and shared memories.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex items-center space-x-2">
              <Filter size={20} className="text-gray-500" />
              <span className="font-medium text-gray-700">Filter Events:</span>
            </div>
            
            <div className="flex flex-wrap gap-4">
              {/* Category Filter */}
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>

              {/* Type Filter */}
              <select 
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {types.map(type => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'All Events' : type === 'upcoming' ? 'Upcoming Events' : 'Past Programs'}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredEvents.map((event, index) => {
            const CategoryIcon = getCategoryIcon(event.category)
            return (
              <div 
                key={event.id} 
                className={`bg-white rounded-xl shadow-lg overflow-hidden card-hover ${
                  event.featured ? 'ring-2 ring-primary-200' : ''
                } ${event.type === 'past' ? 'opacity-90' : ''}`}
              >
                {/* Event Header */}
                <div className={`bg-gradient-to-r ${getCategoryColor(event.category)} p-6 text-white`}>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                        {event.category}
                      </span>
                      {event.type === 'past' && (
                        <span className="bg-gray-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Past Event
                        </span>
                      )}
                      {event.featured && (
                        <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-medium">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">
                        {new Date(event.date).getDate()}
                      </div>
                      <div className="text-sm opacity-90">
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                      </div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
                </div>
                
                {/* Event Details */}
                <div className="p-6">
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {event.description}
                  </p>
                  
                  {/* Event Highlights */}
                  {event.highlights && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                        <CategoryIcon size={16} className="mr-2 text-primary-600" />
                        Highlights
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {event.highlights.map((highlight, idx) => (
                          <span key={idx} className="bg-primary-50 text-primary-700 px-2 py-1 rounded text-xs">
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Event Info */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-700">
                      <Calendar size={18} className="mr-3 text-primary-600" />
                      <span className="font-medium">
                        {new Date(event.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Clock size={18} className="mr-3 text-primary-600" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <MapPin size={18} className="mr-3 text-primary-600" />
                      <span>{event.venue}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Users size={18} className="mr-3 text-primary-600" />
                      <span>
                        {event.type === 'past' ? 'Attended: ' : 'Expected: '}
                        {event.attendees} participants
                      </span>
                    </div>
                  </div>

                  {/* Registration Status */}
                  {event.registrationRequired && event.type === 'upcoming' && (
                    <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-yellow-800 text-sm font-medium">
                        ?? Registration Required
                      </p>
                    </div>
                  )}
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button className="flex-1 bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center justify-center space-x-2">
                      <span>
                        {event.type === 'past' ? 'View Gallery' : event.registrationRequired ? 'Register Now' : 'Learn More'}
                      </span>
                      <ArrowRight size={16} />
                    </button>
                    <button className="border-2 border-primary-600 text-primary-600 py-3 px-6 rounded-lg hover:bg-primary-50 transition-colors duration-200">
                      Share Event
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* No Events Message */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl text-gray-300 mb-4">??</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No events found
            </h3>
            <p className="text-gray-500">
              Try adjusting your filters to see more events.
            </p>
          </div>
        )}

        {/* Contact for Events */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Want to Propose an Event?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Have an exciting idea for a JSG SPARSH event? Whether it's cultural, adventure, 
            social service, or community bonding - we'd love to hear your suggestions and 
            make it happen together!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200">
              Propose Event
            </button>
            <button className="border-2 border-primary-600 text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors duration-200">
              Contact Event Team
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}