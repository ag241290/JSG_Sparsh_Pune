'use client'

import { useState } from 'react'
import { Calendar, MapPin, Clock, Users, Filter, ArrowRight } from 'lucide-react'

export default function Events() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedMonth, setSelectedMonth] = useState('all')

  const events = [
    {
      id: 1,
      title: 'Mahavir Jayanti Celebration',
      date: '2024-04-21',
      time: '6:00 PM - 9:00 PM',
      venue: 'JSG Community Hall, Pune',
      description: 'Join us for the grand celebration of Mahavir Jayanti with special puja, cultural programs, bhajan sandhya, and community dinner. The celebration will include traditional rituals, inspiring speeches about Mahavir\'s teachings, and a cultural program by our youth members.',
      category: 'Religious',
      attendees: 300,
      registrationRequired: true,
      featured: true,
      image: '/images/mahavir-jayanti.jpg'
    },
    {
      id: 2,
      title: 'Youth Cultural Night',
      date: '2024-04-28',
      time: '7:00 PM - 10:00 PM',
      venue: 'Modern College Auditorium, Pune',
      description: 'An evening of music, dance, and entertainment organized by JSG youth members. The program includes classical and contemporary performances, stand-up comedy, and interactive sessions.',
      category: 'Cultural',
      attendees: 200,
      registrationRequired: true,
      featured: false,
      image: '/images/cultural-night.jpg'
    },
    {
      id: 3,
      title: 'Community Picnic - Sinhagad',
      date: '2024-05-05',
      time: '8:00 AM - 6:00 PM',
      venue: 'Sinhagad Fort, Pune',
      description: 'Annual family picnic with games, activities, trekking, and delicious Jain food. Perfect for families to bond and enjoy nature while exploring the historic Sinhagad Fort.',
      category: 'Social',
      attendees: 150,
      registrationRequired: true,
      featured: false,
      image: '/images/picnic.jpg'
    },
    {
      id: 4,
      title: 'Paryushan Mahaparva',
      date: '2024-08-15',
      time: '6:00 AM - 8:00 PM',
      venue: 'Multiple Jain Temples, Pune',
      description: 'Eight-day celebration of Paryushan with daily pravachans, meditation sessions, charitable activities, and community meals. A time for spiritual reflection and community bonding.',
      category: 'Religious',
      attendees: 500,
      registrationRequired: false,
      featured: true,
      image: '/images/paryushan.jpg'
    },
    {
      id: 5,
      title: 'Health & Wellness Camp',
      date: '2024-06-10',
      time: '9:00 AM - 4:00 PM',
      venue: 'JSG Community Center',
      description: 'Free health checkup camp with specialists, yoga sessions, nutrition counseling, and health awareness talks. Open to all community members and their families.',
      category: 'Health',
      attendees: 100,
      registrationRequired: true,
      featured: false,
      image: '/images/health-camp.jpg'
    },
    {
      id: 6,
      title: 'Diwali Celebration',
      date: '2024-11-01',
      time: '6:00 PM - 10:00 PM',
      venue: 'JSG Community Hall, Pune',
      description: 'Grand Diwali celebration with traditional decorations, cultural programs, fireworks display, and festive dinner. Celebrating the festival of lights with our community.',
      category: 'Cultural',
      attendees: 400,
      registrationRequired: true,
      featured: true,
      image: '/images/diwali.jpg'
    }
  ]

  const categories = ['all', 'Religious', 'Cultural', 'Social', 'Health']
  const months = ['all', 'April', 'May', 'June', 'August', 'November']

  const filteredEvents = events.filter(event => {
    const categoryMatch = selectedCategory === 'all' || event.category === selectedCategory
    const monthMatch = selectedMonth === 'all' || 
      new Date(event.date).toLocaleDateString('en-US', { month: 'long' }) === selectedMonth
    return categoryMatch && monthMatch
  })

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Religious': return 'from-orange-400 to-red-500'
      case 'Cultural': return 'from-purple-400 to-pink-500'
      case 'Social': return 'from-green-400 to-blue-500'
      case 'Health': return 'from-blue-400 to-indigo-500'
      default: return 'from-gray-400 to-gray-500'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Upcoming Events
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Stay updated with our exciting events, festivals, and community activities. 
            Join us in celebrating our culture and building stronger community bonds through 
            meaningful participation and shared experiences.
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

              {/* Month Filter */}
              <select 
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {months.map(month => (
                  <option key={month} value={month}>
                    {month === 'all' ? 'All Months' : month}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredEvents.map((event, index) => (
            <div 
              key={event.id} 
              className={`bg-white rounded-xl shadow-lg overflow-hidden card-hover ${
                event.featured ? 'ring-2 ring-primary-200' : ''
              }`}
            >
              {/* Event Header */}
              <div className={`bg-gradient-to-r ${getCategoryColor(event.category)} p-6 text-white`}>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                      {event.category}
                    </span>
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
                    <span>Expected: {event.attendees} participants</span>
                  </div>
                </div>

                {/* Registration Status */}
                {event.registrationRequired && (
                  <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-yellow-800 text-sm font-medium">
                      ?? Registration Required
                    </p>
                  </div>
                )}
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex-1 bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center justify-center space-x-2">
                    <span>{event.registrationRequired ? 'Register Now' : 'Learn More'}</span>
                    <ArrowRight size={16} />
                  </button>
                  <button className="border-2 border-primary-600 text-primary-600 py-3 px-6 rounded-lg hover:bg-primary-50 transition-colors duration-200">
                    Share Event
                  </button>
                </div>
              </div>
            </div>
          ))}
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
            Want to Organize an Event?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Have an idea for a community event or want to contribute to our activities? 
            Get in touch with our event committee to discuss your proposals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200">
              Propose Event
            </button>
            <button className="border-2 border-primary-600 text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors duration-200">
              Contact Committee
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}