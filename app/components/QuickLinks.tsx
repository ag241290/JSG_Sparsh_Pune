import Link from 'next/link'
import { Users, Calendar, Camera, FileText, ArrowRight } from 'lucide-react'

export default function QuickLinks() {
  const links = [
    {
      href: '/committee',
      title: 'Committee Members',
      description: 'Meet our dedicated team of volunteers who make everything possible.',
      icon: Users,
      color: 'from-blue-500 to-blue-600'
    },
    {
      href: '/events',
      title: 'Event Details',
      description: 'Explore our upcoming events and get all the information you need.',
      icon: Calendar,
      color: 'from-green-500 to-green-600'
    },
    {
      href: '/gallery',
      title: 'Photo Gallery',
      description: 'Browse through memories from our past events and celebrations.',
      icon: Camera,
      color: 'from-purple-500 to-purple-600'
    },
    {
      href: '#',
      title: 'Downloads',
      description: 'Access membership forms, event brochures, and other documents.',
      icon: FileText,
      color: 'from-orange-500 to-orange-600'
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Quick Access
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Navigate to different sections of our website quickly and easily.
          </p>
        </div>

        {/* Quick Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {links.map((link, index) => (
            <Link key={index} href={link.href}>
              <div className="group bg-white rounded-xl shadow-md card-hover overflow-hidden">
                <div className={`bg-gradient-to-r ${link.color} p-6 text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    <link.icon size={32} />
                    <ArrowRight 
                      size={20} 
                      className="group-hover:translate-x-1 transition-transform duration-200"
                    />
                  </div>
                  <h3 className="text-xl font-semibold">
                    {link.title}
                  </h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {link.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Want to Join JSG SPARSH Pune?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Become part of our growing community and participate in our cultural, social, 
            and charitable activities. Membership is open to all Jain families in Pune.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200">
              Become a Member
            </button>
            <button className="border-2 border-primary-600 text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors duration-200">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}