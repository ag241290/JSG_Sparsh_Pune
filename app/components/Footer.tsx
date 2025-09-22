'use client'

import Link from 'next/link'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Footer() {
  const [mounted, setMounted] = useState(false)
  const [currentYear, setCurrentYear] = useState(2024)

  useEffect(() => {
    setMounted(true)
    setCurrentYear(new Date().getFullYear())
  }, [])

  const quickLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
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

  // Prevent hydration errors by not rendering until mounted
  if (!mounted) {
    return (
      <footer className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-blue-700 rounded w-48 mx-auto mb-4"></div>
              <div className="h-4 bg-blue-700 rounded w-64 mx-auto"></div>
            </div>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-400 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative w-16 h-16">
                <img
                  src="/images/JSG_SPARSH.jpeg"
                  alt="JSG SPARSH Pune Logo"
                  className="w-full h-full object-contain rounded-2xl shadow-lg"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-2xl bg-gradient-to-r from-yellow-300 to-yellow-400 bg-clip-text text-transparent">
                  JSG SPARSH
                </span>
                <span className="text-lg text-blue-200 font-medium">Pune</span>
              </div>
            </div>
            
            <p className="text-blue-100 mb-8 max-w-lg leading-relaxed">
              Connecting the Jain community in Pune through social activities, cultural events, 
              Dan Patra initiatives, and community service. Building bonds, preserving traditions, 
              and serving society with unity in diversity.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="group p-3 bg-white/10 hover:bg-yellow-500 rounded-xl transition-all duration-300 hover:scale-110 border border-white/20"
                    aria-label={social.label}
                  >
                    <IconComponent size={20} className="text-blue-100 group-hover:text-blue-900 transition-colors" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-xl mb-6 text-yellow-300">Quick Links</h3>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="text-blue-100 hover:text-yellow-300 transition-colors duration-200 flex items-center space-x-2 group text-base"
                  >
                    <span className="w-2 h-2 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-xl mb-6 text-yellow-300">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail className="text-yellow-400 mt-1" size={18} />
                <div>
                  <p className="text-blue-100 font-medium text-sm">Email</p>
                  <a 
                    href="mailto:info@jsgsparshpune.com"
                    className="text-blue-200 hover:text-yellow-300 transition-colors text-sm"
                  >
                    info@jsgsparshpune.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Phone className="text-yellow-400 mt-1" size={18} />
                <div>
                  <p className="text-blue-100 font-medium text-sm">Phone</p>
                  <a 
                    href="tel:+919876543210"
                    className="text-blue-200 hover:text-yellow-300 transition-colors text-sm"
                  >
                    +91 98765 43210
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="text-yellow-400 mt-1" size={18} />
                <div>
                  <p className="text-blue-100 font-medium text-sm">Location</p>
                  <p className="text-blue-200 text-sm">Pune, Maharashtra, India</p>
                </div>
              </div>
            </div>

            {/* CTA Button - Solid Yellow */}
            <div className="mt-8">
              <Link
                href="/social"
                className="inline-block text-center bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                Join Our Community
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-blue-700 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-center lg:text-left">
              <p className="text-blue-200 text-sm">
                Copyright {currentYear} JSG SPARSH Pune. All rights reserved.
              </p>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-blue-200">
              <Link href="#" className="hover:text-yellow-300 transition-colors">Privacy Policy</Link>
              <span className="text-blue-400">•</span>
              <Link href="#" className="hover:text-yellow-300 transition-colors">Terms of Service</Link>
              <span className="text-blue-400">•</span>
              <Link href="#" className="hover:text-yellow-300 transition-colors">Sitemap</Link>
            </div>
          </div>
          
          {/* Inspirational Quote */}
          <div className="text-center mt-8 pt-6 border-t border-blue-700">
            <p className="text-blue-200 italic text-sm">
              "Ahimsa Paramo Dharma" - Non-violence is the supreme religion
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}