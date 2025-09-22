'use client'

import { useState } from 'react'
import { Filter, Download, Share, Eye, Calendar } from 'lucide-react'

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedYear, setSelectedYear] = useState('all')

  const galleryItems = [
    {
      id: 1,
      title: 'Mahavir Jayanti 2024',
      category: 'Religious',
      year: '2024',
      date: '2024-04-21',
      images: [
        { id: 1, src: '/images/mahavir-1.jpg', alt: 'Mahavir Jayanti Puja' },
        { id: 2, src: '/images/mahavir-2.jpg', alt: 'Community Gathering' },
        { id: 3, src: '/images/mahavir-3.jpg', alt: 'Cultural Program' },
        { id: 4, src: '/images/mahavir-4.jpg', alt: 'Prasad Distribution' },
      ],
      description: 'Beautiful moments from Mahavir Jayanti celebration with community puja and cultural programs.',
      featured: true
    },
    {
      id: 2,
      title: 'Youth Cultural Night 2024',
      category: 'Cultural',
      year: '2024',
      date: '2024-04-28',
      images: [
        { id: 5, src: '/images/cultural-1.jpg', alt: 'Dance Performance' },
        { id: 6, src: '/images/cultural-2.jpg', alt: 'Music Program' },
        { id: 7, src: '/images/cultural-3.jpg', alt: 'Youth Participation' },
      ],
      description: 'Energetic performances and cultural showcase by our talented youth members.',
      featured: false
    },
    {
      id: 3,
      title: 'Paryushan Mahaparva 2023',
      category: 'Religious',
      year: '2023',
      date: '2023-08-20',
      images: [
        { id: 8, src: '/images/paryushan-1.jpg', alt: 'Paryushan Celebration' },
        { id: 9, src: '/images/paryushan-2.jpg', alt: 'Pravachan Session' },
        { id: 10, src: '/images/paryushan-3.jpg', alt: 'Community Meal' },
        { id: 11, src: '/images/paryushan-4.jpg', alt: 'Meditation Session' },
        { id: 12, src: '/images/paryushan-5.jpg', alt: 'Charitable Activity' },
      ],
      description: 'Eight days of spiritual enlightenment, community service, and devotion during Paryushan.',
      featured: true
    },
    {
      id: 4,
      title: 'Annual Picnic - Lonavala',
      category: 'Social',
      year: '2024',
      date: '2024-03-15',
      images: [
        { id: 13, src: '/images/picnic-1.jpg', alt: 'Family Fun' },
        { id: 14, src: '/images/picnic-2.jpg', alt: 'Group Activities' },
        { id: 15, src: '/images/picnic-3.jpg', alt: 'Nature Enjoyment' },
      ],
      description: 'Fun-filled family picnic with games, activities, and bonding in beautiful Lonavala.',
      featured: false
    },
    {
      id: 5,
      title: 'Health Camp 2024',
      category: 'Social',
      year: '2024',
      date: '2024-02-10',
      images: [
        { id: 16, src: '/images/health-1.jpg', alt: 'Health Checkup' },
        { id: 17, src: '/images/health-2.jpg', alt: 'Doctor Consultation' },
        { id: 18, src: '/images/health-3.jpg', alt: 'Yoga Session' },
      ],
      description: 'Community health awareness and free medical checkup camp for all members.',
      featured: false
    },
    {
      id: 6,
      title: 'Diwali Celebration 2023',
      category: 'Cultural',
      year: '2023',
      date: '2023-11-12',
      images: [
        { id: 19, src: '/images/diwali-1.jpg', alt: 'Diwali Decorations' },
        { id: 20, src: '/images/diwali-2.jpg', alt: 'Rangoli Competition' },
        { id: 21, src: '/images/diwali-3.jpg', alt: 'Festival Celebration' },
        { id: 22, src: '/images/diwali-4.jpg', alt: 'Community Gathering' },
      ],
      description: 'Spectacular Diwali celebration with traditional decorations and cultural programs.',
      featured: true
    }
  ]

  const categories = ['all', 'Religious', 'Cultural', 'Social']
  const years = ['all', '2024', '2023', '2022']

  const filteredItems = galleryItems.filter(item => {
    const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory
    const yearMatch = selectedYear === 'all' || item.year === selectedYear
    return categoryMatch && yearMatch
  })

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Religious': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'Cultural': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'Social': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Photo Gallery
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-4">
            Relive the beautiful moments from our community events, festivals, and gatherings. 
            Each picture tells a story of unity, celebration, and togetherness.
          </p>
          <p className="text-base text-primary-600 font-hindi">
            ????? ????? ?? ?????? - ?????? ?? ???? ?? ??
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex items-center space-x-2">
              <Filter size={20} className="text-gray-500" />
              <span className="font-medium text-gray-700">Filter Gallery:</span>
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

              {/* Year Filter */}
              <select 
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {years.map(year => (
                  <option key={year} value={year}>
                    {year === 'all' ? 'All Years' : year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <div 
              key={item.id} 
              className={`bg-white rounded-xl shadow-lg overflow-hidden card-hover ${
                item.featured ? 'ring-2 ring-primary-200' : ''
              }`}
            >
              {/* Image Grid */}
              <div className="grid grid-cols-2 gap-1 h-64">
                {item.images.slice(0, 4).map((image, imageIndex) => (
                  <div 
                    key={image.id} 
                    className={`relative overflow-hidden ${
                      imageIndex === 0 && item.images.length > 2 ? 'col-span-2' : ''
                    } ${
                      item.images.length === 3 && imageIndex === 0 ? 'col-span-2' : ''
                    }`}
                  >
                    <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                      <span className="text-primary-600 font-medium">
                        {image.alt}
                      </span>
                    </div>
                    {imageIndex === 3 && item.images.length > 4 && (
                      <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center text-white font-semibold text-lg">
                        +{item.images.length - 4} more
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Gallery Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(item.category)}`}>
                      {item.category}
                    </span>
                    {item.featured && (
                      <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium border border-yellow-200">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar size={14} className="mr-1" />
                    <span>{new Date(item.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {item.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{item.images.length} photos</span>
                  <span>{new Date(item.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center justify-center space-x-2">
                    <Eye size={16} />
                    <span>View All</span>
                  </button>
                  <button className="border border-gray-300 text-gray-600 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center">
                    <Download size={16} />
                  </button>
                  <button className="border border-gray-300 text-gray-600 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center">
                    <Share size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl text-gray-300 mb-4">??</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No photos found
            </h3>
            <p className="text-gray-500">
              Try adjusting your filters to see more gallery items.
            </p>
          </div>
        )}

        {/* Upload Photos Section */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Share Your Event Photos
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Have photos from our community events? Share them with us to make our gallery more vibrant 
            and help preserve our beautiful memories together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200">
              Upload Photos
            </button>
            <button className="border-2 border-primary-600 text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors duration-200">
              Contact Admin
            </button>
          </div>
        </div>

        {/* Gallery Statistics */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="text-2xl font-bold text-primary-600">200+</div>
            <div className="text-sm text-gray-600">Total Photos</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="text-2xl font-bold text-secondary-600">25+</div>
            <div className="text-sm text-gray-600">Events Covered</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="text-2xl font-bold text-green-600">3</div>
            <div className="text-sm text-gray-600">Years Archive</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-md">
            <div className="text-2xl font-bold text-purple-600">15+</div>
            <div className="text-sm text-gray-600">Contributors</div>
          </div>
        </div>
      </div>
    </div>
  )
}