import Link from 'next/link'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Heart, Users, Calendar } from 'lucide-react'
import Image from 'next/image'

export default function Footer() {
  const quickLinks = [
    { href: '/', label: 'Home' },
    { href: '/committee', label: 'Committee' },
    { href: '/events', label: 'Events' },
    { href: '/social', label: 'Social Initiatives' },
    { href: '/gallery', label: 'Gallery' },
  ]

  const socialLinks = [
    { href: '#', icon: Facebook, label: 'Facebook' },
    { href: '#', icon: Instagram, label: 'Instagram' },
    { href: '#', icon: Twitter, label: 'Twitter' },
  ]

  const highlights = [
    { icon: Users, label: '275+ Members', color: 'text-blue-400' },
    { icon: Calendar, label: '15+ Events', color: 'text-green-400' },
    { icon: Heart, label: '6 Dan Patra Programs', color: 'text-red-400' },
  ]

  return (
    <footer className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-500 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-500 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative w-16 h-16 logo-glow">
                <Image
                  src="/images/JSG_SPARSH.jpeg"
                  alt="JSG SPARSH Pune Logo"
                  fill
                  className="object-contain rounded-2xl"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-3xl bg-gradient-to-r from-orange-300 to-orange-500 bg-clip-text text-transparent">
                  JSG SPARSH
                </span>
                <span className="text-lg text-neutral-300 font-medium">Pune</span>
              </div>
            </div>
            
            <p className="text-neutral-300 mb-8 max-w-lg leading-relaxed text-lg">
              Connecting the Jain community in Pune through social activities, cultural events, 
              Dan Patra initiatives, and community service. Building bonds, preserving traditions, 
              and serving society with unity in diversity.
            </p>
            
            {/* Community Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm rounded-xl p-4">
                  <highlight.icon className={`${highlight.color}`} size={24} />
                  <span className="text-neutral-200 font-medium">{highlight.label}</span>
                </div>
              ))}
            </div>

            {/* JSG Federation Partnership */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 mb-8">
              <div className="flex items-center space-x-4 mb-4">
                <div className="relative w-12 h-12">
                  <Image
                    src="/images/JSG_Federation.jpeg"
                    alt="JSG Federation Logo"
                    fill
                    className="object-contain rounded-lg"
                  />
                </div>
                <div>
                  <p className="text-orange-300 font-semibold text-lg">JSG Federation Member</p>
                  <p className="text-neutral-400 text-sm">Part of global Jain community network</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="group p-3 bg-white/10 hover:bg-primary-500 rounded-xl transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon size={20} className="group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-xl mb-6 text-orange-300">Quick Links</h3>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="text-neutral-300 hover:text-orange-300 transition-colors duration-200 flex items-center space-x-2 group"
                  >
                    <span className="w-2 h-2 bg-primary-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mission Statement */}
            <div className="mt-8 p-6 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-2xl border border-primary-500/30">
              <p className="text-orange-200 font-medium text-center italic">
                "Walk together, talk together, and act with one mind"
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-xl mb-6 text-orange-300">Contact Us</h3>
            <div className="space-y-6">
              <div className="group">
                <div className="flex items-start space-x-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-200">
                  <Mail className="text-primary-400 mt-1" size={20} />
                  <div>
                    <p className="text-neutral-200 font-medium">Email</p>
                    <a 
                      href="mailto:info@jsgsparshpune.com"
                      className="text-neutral-300 hover:text-orange-300 transition-colors"
                    >
                      info@jsgsparshpune.com
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="group">
                <div className="flex items-start space-x-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-200">
                  <Phone className="text-primary-400 mt-1" size={20} />
                  <div>
                    <p className="text-neutral-200 font-medium">Phone</p>
                    <a 
                      href="tel:+919876543210"
                      className="text-neutral-300 hover:text-orange-300 transition-colors"
                    >
                      +91 98765 43210
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="group">
                <div className="flex items-start space-x-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-200">
                  <MapPin className="text-primary-400 mt-1" size={20} />
                  <div>
                    <p className="text-neutral-200 font-medium">Location</p>
                    <p className="text-neutral-300">Pune, Maharashtra, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-8">
              <Link
                href="/social"
                className="block text-center bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-large hover:shadow-xl hover:-translate-y-1"
              >
                Join Our Community
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-neutral-700 mt-16 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-center lg:text-left">
              <p className="text-neutral-400">
                &copy; {new Date().getFullYear()} JSG SPARSH Pune. All rights reserved.
              </p>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-neutral-400">
              <Link href="#" className="hover:text-orange-300 transition-colors">Privacy Policy</Link>
              <span>•</span>
              <Link href="#" className="hover:text-orange-300 transition-colors">Terms of Service</Link>
              <span>•</span>
              <Link href="#" className="hover:text-orange-300 transition-colors">Sitemap</Link>
            </div>
          </div>
          
          {/* Inspirational Quote */}
          <div className="text-center mt-8 pt-8 border-t border-neutral-800">
            <p className="text-neutral-400 italic">
              "Ahimsa Paramo Dharma" - Non-violence is the supreme religion
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}