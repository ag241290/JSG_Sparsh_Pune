import Link from 'next/link'
import { ArrowRight, Calendar, Users, Heart } from 'lucide-react'

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <div className="flex flex-col items-center mb-12 animate-fade-in">
            <div className="relative w-24 h-24 md:w-32 md:h-32 mb-8">
              <img
                src="/images/JSG_SPARSH.jpeg"
                alt="JSG SPARSH Pune Logo"
                className="w-full h-full object-contain rounded-2xl shadow-lg"
              />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight text-white">
              JSG SPARSH
              <span className="block text-3xl md:text-4xl font-medium mt-3 text-yellow-300 tracking-wide">
                Pune
              </span>
            </h1>
          </div>
          
          <div className="mb-8 animate-slide-up">
            <p className="text-2xl md:text-3xl mb-4 text-yellow-200 font-medium">
              Jain Social Group - Unity in Community
            </p>
            <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full"></div>
          </div>
          
          <p className="text-lg md:text-xl mb-12 max-w-4xl mx-auto text-blue-100 leading-relaxed animate-slide-up">
            Connecting hearts, preserving traditions, and building a stronger Jain community in Pune through 
            social activities, cultural events, and community service. Walking together towards collective growth 
            and spiritual enlightenment.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-slide-up">
            <Link 
              href="/spl02" 
              className="group bg-white text-blue-700 px-10 py-4 rounded-2xl font-semibold hover:bg-yellow-50 transition-all duration-300 flex items-center space-x-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Calendar size={22} />
              <span>Upcoming Events</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/committee" 
              className="group bg-yellow-500 hover:bg-yellow-600 text-blue-800 px-10 py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center space-x-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Users size={22} />
              <span>Meet Our Team</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto animate-slide-up">
            <div className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center justify-center mb-3">
                <div className="p-3 bg-yellow-400/20 rounded-full">
                  <Users className="text-yellow-300" size={28} />
                </div>
              </div>
              <div className="text-4xl font-bold mb-2 text-white">300+</div>
              <div className="text-yellow-200 font-medium">Community Members</div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center justify-center mb-3">
                <div className="p-3 bg-yellow-400/20 rounded-full">
                  <Calendar className="text-yellow-300" size={28} />
                </div>
              </div>
              <div className="text-4xl font-bold mb-2 text-white">15+</div>
              <div className="text-yellow-200 font-medium">Events Organized</div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center justify-center mb-3">
                <div className="p-3 bg-yellow-400/20 rounded-full">
                  <Heart className="text-yellow-300" size={28} />
                </div>
              </div>
              <div className="text-4xl font-bold mb-2 text-white">2024</div>
              <div className="text-yellow-200 font-medium">Year Established</div>
            </div>
          </div>

          <div className="mt-16 animate-slide-up">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-2xl mx-auto border border-white/20">
              <p className="text-yellow-300 text-lg font-medium mb-2">Our Guiding Principle</p>
              <p className="text-white text-xl md:text-2xl font-semibold italic">
                "Walk together, talk together, and act with one mind"
              </p>
              <div className="w-16 h-1 bg-yellow-400 mx-auto mt-4 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/5 rounded-full animate-bounce"></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-white/5 rounded-full animate-bounce"></div>
    </section>
  )
}