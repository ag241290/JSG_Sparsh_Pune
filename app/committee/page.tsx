import { Mail, Phone, Linkedin } from 'lucide-react'

export default function Committee() {
  const committeeMembers = [
    {
      name: 'Shri Rajesh Jain',
      position: 'President',
      description: 'Leading the community with vision and dedication for over 10 years.',
      email: 'rajesh@jsgsparshpune.com',
      phone: '+91 98765 43210',
      image: '/images/placeholder-avatar.jpg',
      category: 'executive'
    },
    {
      name: 'Smt. Priya Jain',
      position: 'Vice President',
      description: 'Coordinating cultural events and women\'s activities.',
      email: 'priya@jsgsparshpune.com',
      phone: '+91 98765 43211',
      image: '/images/placeholder-avatar.jpg',
      category: 'executive'
    },
    {
      name: 'Shri Amit Shah',
      position: 'Secretary',
      description: 'Managing administrative affairs and member communications.',
      email: 'amit@jsgsparshpune.com',
      phone: '+91 98765 43212',
      image: '/images/placeholder-avatar.jpg',
      category: 'executive'
    },
    {
      name: 'Shri Vikas Jain',
      position: 'Treasurer',
      description: 'Overseeing financial management and fund allocation.',
      email: 'vikas@jsgsparshpune.com',
      phone: '+91 98765 43213',
      image: '/images/placeholder-avatar.jpg',
      category: 'executive'
    },
    {
      name: 'Smt. Kavita Jain',
      position: 'Cultural Committee Head',
      description: 'Organizing festivals and cultural programs.',
      email: 'kavita@jsgsparshpune.com',
      phone: '+91 98765 43214',
      image: '/images/placeholder-avatar.jpg',
      category: 'committee'
    },
    {
      name: 'Shri Suresh Jain',
      position: 'Youth Coordinator',
      description: 'Engaging youth members and organizing sports activities.',
      email: 'suresh@jsgsparshpune.com',
      phone: '+91 98765 43215',
      image: '/images/placeholder-avatar.jpg',
      category: 'committee'
    },
    {
      name: 'Dr. Meera Jain',
      position: 'Health & Welfare Committee',
      description: 'Organizing health camps and welfare activities.',
      email: 'meera@jsgsparshpune.com',
      phone: '+91 98765 43216',
      image: '/images/placeholder-avatar.jpg',
      category: 'committee'
    },
    {
      name: 'Shri Ashok Jain',
      position: 'Social Service Head',
      description: 'Leading charitable activities and community service.',
      email: 'ashok@jsgsparshpune.com',
      phone: '+91 98765 43217',
      image: '/images/placeholder-avatar.jpg',
      category: 'committee'
    }
  ]

  const executiveMembers = committeeMembers.filter(member => member.category === 'executive')
  const committeeHeads = committeeMembers.filter(member => member.category === 'committee')

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Committee
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-4">
            Meet the dedicated volunteers who work tirelessly to serve our community and 
            organize various activities throughout the year.
          </p>
          <p className="text-base text-primary-600 font-hindi">
            ?????? ???? ??? ??????? ????? ??????????
          </p>
        </div>

        {/* Executive Committee */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Executive Committee
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {executiveMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
                <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-6 text-white text-center">
                  <div className="w-20 h-20 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold">
                      {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-orange-100 font-medium">{member.position}</p>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {member.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-500 text-sm">
                      <Mail size={14} className="mr-2" />
                      <a href={`mailto:${member.email}`} className="hover:text-primary-600 truncate">
                        {member.email}
                      </a>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Phone size={14} className="mr-2" />
                      <a href={`tel:${member.phone}`} className="hover:text-primary-600">
                        {member.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Committee Heads */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Committee Heads
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {committeeHeads.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
                <div className="bg-gradient-to-r from-secondary-500 to-secondary-600 p-6 text-white text-center">
                  <div className="w-20 h-20 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold">
                      {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-blue-100 font-medium">{member.position}</p>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {member.description}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-500 text-sm">
                      <Mail size={14} className="mr-2" />
                      <a href={`mailto:${member.email}`} className="hover:text-secondary-600 truncate">
                        {member.email}
                      </a>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Phone size={14} className="mr-2" />
                      <a href={`tel:${member.phone}`} className="hover:text-secondary-600">
                        {member.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Get in Touch with Our Committee
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Have questions, suggestions, or want to volunteer? Our committee members are always 
            ready to help and welcome new members to join our community activities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200">
              Join Our Team
            </button>
            <button className="border-2 border-primary-600 text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors duration-200">
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}