import Link from 'next/link'
import { ArrowRight, Calendar, Users, Heart, Star } from 'lucide-react'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="hero-gradient text-white py-24 relative overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-jain-pattern bg-repeat opacity-20"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Logo and Main Title */}
          <div className="flex flex-col items-center mb-12 animate-fade-in">
            <div className="relative w-24 h-24 md:w-32 md:h-32 mb-8 logo-glow">
              <Image
                src="/images/JSG_SPARSH.jpeg"
                alt="JSG SPARSH Pune Logo"
                fill
                className="object-contain rounded-2xl shadow-large"
                priority
              />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
              JSG SPARSH
              <span className="block text-3xl md:text-4xl font-medium mt-3 text-orange-100 tracking-wide">
                Pune
              </span>
            </h1>
          </div
          
          {/* JSG Federation Badge */}
          <div className="flex items-center justify-center mb-8 animate-slide-up">
            <div className="bg-white/15 backdrop-blur-md rounded-full px-6 py-3 flex items-center space-x-3 shadow-large border border-white/20">
              <div className="relative w-8 h-8">
                <Image
                  src="/images/JSG_Federation.jpeg"
                  alt="JSG Federation Logo"
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
              <span className="text-orange-100 font-medium">Proud Member of JSG Federation</span>
              <Star className="w-4 h-4 text-gold-300" />
            </div>
          </div>
          
          {/* Enhanced Tagline */}
          <div className="mb-8 animate-slide-up" style={{animationDelay: '0.2s'}}>
            <p className="text-2xl md:text-3xl mb-4 text-orange-100 font-medium">
              Jain Social Group - Unity in Community
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-gold-400 to-gold-600 mx-auto rounded-full"></div>
          </div>
          
          {/* Enhanced Description */}
          <p className="text-lg md:text-xl mb-12 max-w-4xl mx-auto text-orange-100 leading-relaxed animate-slide-up" style={{animationDelay: '0.4s'}}>
            Connecting hearts, preserving traditions, and building a stronger Jain community in Pune through 
            social activities, cultural events, and community service. Walking together towards collective growth 
            and spiritual enlightenment.
          </p>

          {/* Enhanced Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-slide-up" style={{animationDelay: '0.6s'}}>
            <Link 
              href="/events" 
              className="group bg-white text-primary-600 px-10 py-4 rounded-2xl font-semibold hover:bg-orange-50 transition-all duration-300 flex items-center space-x-3 shadow-large hover:shadow-xl transform hover:-translate-y-1"
            >
              <Calendar size={22} />
              <span>Upcoming Events</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/committee" 
              className="group border-3 border-white/80 text-white px-10 py-4 rounded-2xl font-semibold hover:bg-white hover:text-primary-600 transition-all duration-300 flex items-center space-x-3 backdrop-blur-sm hover:shadow-xl transform hover:-translate-y-1"
            >
              <Users size={22} />
              <span>Meet Our Team</span>
            </Link>
          </div>

          {/* Enhanced Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto animate-slide-up" style={{animationDelay: '0.8s'}}>
            <div className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center justify-center mb-3">
                <div className="p-3 bg-white/20 rounded-full">
                  <Users className="text-orange-200" size={28} />
                </div>
              </div>
              <div className="text-4xl font-bold mb-2">275+</div>
              <div className="text-orange-200 font-medium">Community Members</div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center justify-center mb-3">
                <div className="p-3 bg-white/20 rounded-full">
                  <Calendar className="text-orange-200" size={28} />
                </div>
              </div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-orange-200 font-medium">Events Organized</div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center justify-center mb-3">
                <div className="p-3 bg-white/20 rounded-full">
                  <Heart className="text-orange-200" size={28} />
                </div>
              </div>
              <div className="text-4xl font-bold mb-2">2024</div>
              <div className="text-orange-200 font-medium">Year Established</div>
            </div>
          </div>

          {/* Guiding Principle */}
          <div className="mt-16 animate-slide-up" style={{animationDelay: '1s'}}>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-2xl mx-auto border border-white/20">
              <p className="text-orange-100 text-lg font-medium mb-2">Our Guiding Principle</p>
              <p className="text-white text-xl md:text-2xl font-semibold italic">
                "Walk together, talk together, and act with one mind"
              </p>
              <div className="w-16 h-1 bg-gradient-to-r from-gold-400 to-gold-600 mx-auto mt-4 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/5 rounded-full animate-bounce-soft"></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-white/5 rounded-full animate-bounce-soft" style={{animationDelay: '1s'}}></div>
    </section>
  )
}