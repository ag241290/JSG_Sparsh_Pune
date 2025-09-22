import { Mail, Phone, User, Crown, Users, Trophy, Smartphone, Heart, Zap } from 'lucide-react'

export default function Committee() {
  const coreGroup = [
    {
      name: 'Dhiraj Shah',
      position: 'Founder President',
      description: 'Visionary founder and leader driving JSG SPARSH Pune towards unity and community excellence. Overseeing all strategic initiatives and fostering brotherhood among diverse Jain sects.',
      email: 'founder@jsgsparshpune.com',
      phone: '+91 98765 00001',
      icon: Crown,
      category: 'core'
    },
    {
      name: 'Arun Rathod',
      position: 'Vice President',
      description: 'Supporting the founder\'s vision and coordinating key initiatives. Leading community engagement and organizational development programs.',
      email: 'vicepresident@jsgsparshpune.com',
      phone: '+91 98765 00002',
      icon: User,
      category: 'core'
    },
    {
      name: 'Bhavik Shah',
      position: 'Secretary',
      description: 'Managing administrative affairs, member communications, and maintaining records of all JSG SPARSH activities and programs.',
      email: 'secretary@jsgsparshpune.com',
      phone: '+91 98765 00003',
      icon: User,
      category: 'core'
    },
    {
      name: 'Vinod Jain',
      position: 'Treasurer',
      description: 'Overseeing financial management, Dan Patra initiatives, and ensuring transparent fund allocation for community programs.',
      email: 'treasurer@jsgsparshpune.com',
      phone: '+91 98765 00004',
      icon: User,
      category: 'core'
    }
  ]

  const pros = [
    {
      name: 'Mukesh Jain',
      position: 'PRO Sports',
      description: 'Organizing sports activities, adventure trips like Aqua Magic, and promoting physical wellness within the community.',
      email: 'sports@jsgsparshpune.com',
      phone: '+91 98765 00005',
      icon: Trophy,
      category: 'pro'
    },
    {
      name: 'Jitendra Jain',
      position: 'PRO Business',
      description: 'Facilitating business networking, professional growth opportunities, and collaborative ventures among members.',
      email: 'business@jsgsparshpune.com',
      phone: '+91 98765 00006',
      icon: Users,
      category: 'pro'
    },
    {
      name: 'Darshan Shah',
      position: 'PRO Digital',
      description: 'Managing digital presence, social media, website maintenance, and online community engagement platforms.',
      email: 'digital@jsgsparshpune.com',
      phone: '+91 98765 00007',
      icon: Smartphone,
      category: 'pro'
    },
    {
      name: 'Timmeer Sanghavi',
      position: 'PRO Social',
      description: 'Leading Dan Patra initiatives, social service programs, and coordinating charitable activities for community welfare.',
      email: 'social@jsgsparshpune.com',
      phone: '+91 98765 00008',
      icon: Heart,
      category: 'pro'
    }
  ]

  const groupLeaders = [
    {
      name: 'Sachin Punamiya',
      position: 'Group 1 Leader',
      groupName: 'Gajab Toli',
      description: 'Leading the energetic Gajab Toli group, organizing exciting activities and fostering strong bonds among group members.',
      email: 'group1@jsgsparshpune.com',
      phone: '+91 98765 00009',
      icon: Zap,
      category: 'leader',
      color: 'from-red-500 to-red-600'
    },
    {
      name: 'Amit Gandhi',
      position: 'Group 2 Leader',
      groupName: 'Tashan Gang',
      description: 'Spearheading the stylish Tashan Gang, known for their cultural programs and vibrant participation in events.',
      email: 'group2@jsgsparshpune.com',
      phone: '+91 98765 00010',
      icon: Zap,
      category: 'leader',
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Satish Jain',
      position: 'Group 3 Leader',
      groupName: 'Jhakaas Club',
      description: 'Managing the fantastic Jhakaas Club, organizing fun-filled activities and maintaining high energy in all programs.',
      email: 'group3@jsgsparshpune.com',
      phone: '+91 98765 00011',
      icon: Zap,
      category: 'leader',
      color: 'from-green-500 to-green-600'
    },
    {
      name: 'Khush Oswal',
      position: 'Group 4 Leader',
      groupName: 'Bawaal Brigade',
      description: 'Leading the dynamic Bawaal Brigade, known for creating excitement and memorable experiences in community events.',
      email: 'group4@jsgsparshpune.com',
      phone: '+91 98765 00012',
      icon: Zap,
      category: 'leader',
      color: 'from-purple-500 to-purple-600'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Committee 2024-2025
          </h1>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto mb-4">
            Meet the dedicated team of JSG SPARSH Pune who work tirelessly to serve our community. 
            Our organizational structure includes the Core Group, specialized PROs (Public Relations Officers), 
            and dynamic Group Leaders managing our four vibrant member groups.
          </p>
          <div className="bg-primary-50 p-4 rounded-lg max-w-2xl mx-auto">
            <p className="text-primary-800 font-medium">
              "Walk together, talk together, and act with one mind"
            </p>
          </div>
        </div>

        {/* Core Group */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Core Group
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreGroup.map((member, index) => {
              const IconComponent = member.icon
              return (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
                  <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-6 text-white text-center">
                    <div className="w-20 h-20 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                      {member.position === 'Founder President' ? (
                        <IconComponent size={28} />
                      ) : (
                        <span className="text-2xl font-bold">
                          {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </span>
                      )}
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
              )
            })}
          </div>
        </div>

        {/* PROs (Public Relations Officers) */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            PROs (Public Relations Officers)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pros.map((member, index) => {
              const IconComponent = member.icon
              return (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
                  <div className="bg-gradient-to-r from-secondary-500 to-secondary-600 p-6 text-white text-center">
                    <div className="w-20 h-20 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <IconComponent size={28} />
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
              )
            })}
          </div>
        </div>

        {/* Group Leaders */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Group Leaders
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {groupLeaders.map((member, index) => {
              const IconComponent = member.icon
              return (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
                  <div className={`bg-gradient-to-r ${member.color} p-6 text-white text-center`}>
                    <div className="w-20 h-20 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <IconComponent size={28} />
                    </div>
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-white/90 font-medium mb-1">{member.position}</p>
                    <p className="text-white/80 text-sm font-bold">{member.groupName}</p>
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
              )
            })}
          </div>
        </div>

        {/* Group Information */}
        <div className="mb-16 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Our Four Dynamic Groups
            </h3>
            <p className="text-gray-700 max-w-3xl mx-auto mb-6">
              JSG SPARSH Pune is organized into four vibrant groups, each with its unique identity and energy. 
              These groups foster closer bonds among members and create exciting opportunities for participation 
              in various activities and events.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                <Zap className="text-red-600" size={24} />
              </div>
              <h4 className="font-bold text-red-600 mb-1">Group 1</h4>
              <p className="text-gray-800 font-medium">Gajab Toli</p>
              <p className="text-sm text-gray-600 mt-2">Energetic & Amazing</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                <Zap className="text-blue-600" size={24} />
              </div>
              <h4 className="font-bold text-blue-600 mb-1">Group 2</h4>
              <p className="text-gray-800 font-medium">Tashan Gang</p>
              <p className="text-sm text-gray-600 mt-2">Stylish & Cultural</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                <Zap className="text-green-600" size={24} />
              </div>
              <h4 className="font-bold text-green-600 mb-1">Group 3</h4>
              <p className="text-gray-800 font-medium">Jhakaas Club</p>
              <p className="text-sm text-gray-600 mt-2">Fantastic & Fun</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-3 flex items-center justify-center">
                <Zap className="text-purple-600" size={24} />
              </div>
              <h4 className="font-bold text-purple-600 mb-1">Group 4</h4>
              <p className="text-gray-800 font-medium">Bawaal Brigade</p>
              <p className="text-sm text-gray-600 mt-2">Dynamic & Exciting</p>
            </div>
          </div>
        </div>

        {/* Unity Message */}
        <div className="mb-16 bg-white rounded-2xl p-8 shadow-lg">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Unity in Diversity
            </h3>
            <p className="text-gray-700 max-w-3xl mx-auto mb-6">
              JSG SPARSH Pune proudly brings together members from all four Jain sects - 
              Digamber, Shwetamber, Sthanakwasi, and Terapanthi. Our committee represents 
              this beautiful diversity, working together to strengthen our community bonds 
              and uphold the values of brotherhood, mutual respect, and collective growth.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-primary-50 p-4 rounded-lg">
                <div className="text-primary-600 font-bold text-lg">275+</div>
                <div className="text-sm text-gray-600">Active Members</div>
              </div>
              <div className="bg-secondary-50 p-4 rounded-lg">
                <div className="text-secondary-600 font-bold text-lg">4</div>
                <div className="text-sm text-gray-600">Dynamic Groups</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-green-600 font-bold text-lg">15+</div>
                <div className="text-sm text-gray-600">Programs Organized</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-purple-600 font-bold text-lg">2024</div>
                <div className="text-sm text-gray-600">Year Established</div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Get in Touch with Our Committee
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Ready to be part of our growing JSG SPARSH family? Whether you want to join one of our 
            four dynamic groups, volunteer for events, or contribute to our Dan Patra initiatives, 
            we welcome you with open arms. Connect with our team and find your perfect group fit!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200">
              Join JSG SPARSH
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