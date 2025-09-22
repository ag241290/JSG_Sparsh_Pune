'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, Home, Users, Calendar, Camera, Heart, Info } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/about', label: 'About', icon: Info },
    { href: '/committee', label: 'Committee', icon: Users },
    { href: '/events', label: 'Events', icon: Calendar },
    { href: '/social', label: 'Social', icon: Heart },
    { href: '/gallery', label: 'Gallery', icon: Camera },
  ]

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-neutral-200/50' 
        : 'bg-white shadow-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link href="/" className="group flex items-center space-x-4">
              <div className="relative w-12 h-12">
                <img
                  src="/images/JSG_SPARSH.jpeg"
                  alt="JSG SPARSH Pune Logo"
                  className="w-full h-full object-contain rounded-xl transition-transform group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl text-blue-700 group-hover:text-blue-800 transition-colors">
                  JSG SPARSH
                </span>
                <span className="text-sm text-neutral-600 font-medium">Pune</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center space-x-2 text-neutral-700 hover:text-blue-600 px-4 py-2 rounded-xl transition-all duration-300 hover:bg-yellow-50"
              >
                <item.icon size={18} className="group-hover:scale-110 transition-transform" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
            
            {/* CTA Button */}
            <div className="ml-6 pl-6 border-l border-neutral-300">
              <Link
                href="/social"
                className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                Join Us
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-neutral-700 hover:text-blue-600 focus:outline-none p-2 rounded-xl hover:bg-yellow-50 transition-colors duration-200"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="py-4 space-y-2 border-t border-neutral-200/50">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-3 text-neutral-700 hover:text-blue-600 hover:bg-yellow-50 px-4 py-3 rounded-xl transition-all duration-200 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </Link>
              ))}
              
              {/* Mobile CTA */}
              <div className="pt-4 mt-4 border-t border-neutral-200/50">
                <Link
                  href="/social"
                  className="flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-blue-900 px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  Join JSG SPARSH
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}