import Link from 'next/link'
import { ArrowRight, Calendar, Users, Heart } from 'lucide-react'

export default function Hero() {
  return (
    <section className="hero-gradient text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            JSG SPARSH
            <span className="block text-2xl md:text-3xl font-normal mt-2 text-orange-100">
              Pune
            </span>
          </h1>
          
          {/* Tagline */}
          <p className="text-xl md:text-2xl mb-4 text-orange-100">
            Jain Social Group - Unity in Community
          </p>
          
          {/* English Description */}
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-orange-100">
            Connecting hearts, preserving traditions, and building a stronger Jain community in Pune through 
            social activities, cultural events, and community service.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link 
              href="/events" 
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-2"
            >
              <Calendar size={20} />
              <span>Upcoming Events</span>
              <ArrowRight size={16} />
            </Link>
            <Link 
              href="/committee" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors duration-200 flex items-center space-x-2"
            >
              <Users size={20} />
              <span>Meet Our Team</span>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="text-orange-200" size={24} />
              </div>
              <div className="text-3xl font-bold">500+</div>
              <div className="text-orange-200">Community Members</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Calendar className="text-orange-200" size={24} />
              </div>
              <div className="text-3xl font-bold">50+</div>
              <div className="text-orange-200">Events Organized</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Heart className="text-orange-200" size={24} />
              </div>
              <div className="text-3xl font-bold">15+</div>
              <div className="text-orange-200">Years of Service</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}