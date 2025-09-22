import { Heart, Users, Calendar, Award, Sparkles, Target, CheckCircle } from 'lucide-react'

export default function AboutPage() {
  const features = [
    {
      icon: Users,
      title: 'Unity in Diversity',
      description: 'Bringing together members from all four Jain sects - Digamber, Shwetamber, Sthanakwasi, and Terapanthi - as one cohesive community.',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: Heart,
      title: 'Community & Brotherhood',
      description: 'Creating a supportive environment where trust, compassion, and respect are central to all relationships within our community.',
      gradient: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: Calendar,
      title: 'Cultural Events',
      description: 'Organizing vibrant celebrations like Rangbarse, Dazzle-N-Dance, Installation ceremonies, and traditional festival programs.',
      gradient: 'from-blue-600 to-blue-700'
    },
    {
      icon: Target,
      title: 'Dan Patra Initiatives',
      description: 'Multiple charitable programs including education support, go-mata seva, social service, blood donation, and community welfare.',
      gradient: 'from-yellow-600 to-yellow-700'
    },
    {
      icon: Award,
      title: 'Spiritual & Professional Growth',
      description: 'Fostering both spiritual well-being and professional opportunities through collaborative business ventures and personal development.',
      gradient: 'from-blue-700 to-blue-800'
    },
    {
      icon: Sparkles,
      title: 'Adventure & Bonding',
      description: 'Organizing exciting activities like Aqua Magic trips, adventure sports, and team-building experiences for all age groups.',
      gradient: 'from-yellow-500 to-yellow-600'
    }
  ]

  const achievements = [
    { label: 'Active Members', value: '300+', icon: Users, bg: 'bg-blue-50', text: 'text-blue-600', iconBg: 'bg-blue-500' },
    { label: 'Jain Sects United', value: '4', icon: CheckCircle, bg: 'bg-yellow-50', text: 'text-yellow-600', iconBg: 'bg-yellow-500' },
    { label: 'Programs Organized', value: '15+', icon: Calendar, bg: 'bg-blue-50', text: 'text-blue-600', iconBg: 'bg-blue-500' },
    { label: 'Year Established', value: '2024', icon: Award, bg: 'bg-yellow-50', text: 'text-yellow-600', iconBg: 'bg-yellow-500' },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-8">
            <div className="relative w-24 h-24">
              <img
                src="/images/JSG_SPARSH.jpeg"
                alt="JSG SPARSH Pune Logo"
                className="w-full h-full object-contain rounded-2xl shadow-lg"
              />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About JSG SPARSH Pune</h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto">
            Building Unity, Preserving Traditions, Serving Community
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* About Section */}
          <div className="text-center mb-20">
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed">
              In 2024, we launched JSG Pune SPARSH Group with a clear vision: to build a strong, 
              unified community based on the principles of brotherhood and mutual respect. The group 
              is proud to have CORE COMMITTEE & members from all four Jain sects working together 
              as one cohesive Jain Social Group.
            </p>
            <div className="bg-gradient-to-r from-blue-50 to-yellow-50 p-8 rounded-3xl max-w-3xl mx-auto shadow-md border border-blue-200">
              <p className="text-blue-800 font-bold text-lg mb-2">Our Guiding Principle</p>
              <p className="text-blue-700 text-2xl font-semibold italic">
                "Walk together, talk together, and act with one mind"
              </p>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-yellow-400 mx-auto mt-4 rounded-full"></div>
            </div>
          </div>

          {/* Key Focus Areas */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-blue-800 mb-12 text-center">
              Our Key Focus Areas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="group bg-white p-8 rounded-3xl shadow-md hover:shadow-lg transition-all duration-300 border border-blue-100"
                >
                  <div className={`flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="text-white" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-blue-800 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Core Values */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-blue-800 mb-12 text-center">
              Our Core Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-blue-50 p-8 rounded-3xl shadow-md hover:shadow-lg transition-all duration-300 border border-blue-200">
                <h3 className="text-xl font-bold text-blue-800 mb-4">Community & Brotherhood</h3>
                <p className="text-blue-700 leading-relaxed">
                  Strong emphasis on creating a supportive and nurturing environment where trust, 
                  compassion, and respect are central to the relationships formed within the community.
                </p>
              </div>
              <div className="bg-yellow-50 p-8 rounded-3xl shadow-md hover:shadow-lg transition-all duration-300 border border-yellow-200">
                <h3 className="text-xl font-bold text-yellow-800 mb-4">Unity in Diversity</h3>
                <p className="text-yellow-700 leading-relaxed">
                  Bringing together individuals from diverse Jain sects, highlighting the strength 
                  that comes from collaboration and shared values across different traditions.
                </p>
              </div>
              <div className="bg-blue-50 p-8 rounded-3xl shadow-md hover:shadow-lg transition-all duration-300 border border-blue-200">
                <h3 className="text-xl font-bold text-blue-800 mb-4">Holistic Growth</h3>
                <p className="text-blue-700 leading-relaxed">
                  Vision encompasses both spiritual well-being and professional opportunities, 
                  recognizing that faith and commerce can coexist harmoniously to benefit the community.
                </p>
              </div>
            </div>
          </div>

          {/* Mission & Statistics */}
          <div className="bg-gradient-to-r from-blue-50 to-yellow-50 rounded-3xl p-10 shadow-lg border border-blue-200">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-blue-800 mb-6">Our Mission</h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  To create a strong, united Jain community in Pune that upholds the principles of 
                  Jainism while embracing progress and inclusivity. We strive to be a platform where 
                  traditions meet modernity, and every member feels valued and connected.
                </p>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Our core philosophy reflects the group's commitment to collective growth, unity, 
                  and empowerment, where both personal connections and collaborative business ventures thrive.
                </p>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-blue-200">
                  <p className="text-blue-800 text-center font-semibold text-lg italic">
                    "Ahimsa Paramo Dharma" - Non-violence is the supreme religion
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                {achievements.map((achievement, index) => (
                  <div 
                    key={index}
                    className={`text-center p-6 rounded-2xl ${achievement.bg} hover:shadow-md transition-all duration-300 shadow-sm border border-opacity-20`}
                  >
                    <div className="flex justify-center mb-4">
                      <div className={`p-3 ${achievement.iconBg} rounded-xl`}>
                        <achievement.icon className="text-white" size={24} />
                      </div>
                    </div>
                    <div className={`text-3xl font-bold ${achievement.text} mb-2`}>
                      {achievement.value}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
                      {achievement.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Vision Section */}
          <div className="mt-20 text-center">
            <h2 className="text-3xl font-bold text-blue-800 mb-8">Our Vision</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                To be the leading Jain social organization in Pune that exemplifies unity in diversity, 
                fosters spiritual and professional growth, and serves as a beacon of community service 
                and cultural preservation for future generations.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-md border border-blue-100">
                  <Heart className="text-blue-600 mx-auto mb-3" size={32} />
                  <h3 className="font-semibold text-blue-800 mb-2">Community Service</h3>
                  <p className="text-sm text-gray-600">Dedicated to serving society through various Dan Patra initiatives</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md border border-yellow-100">
                  <Users className="text-yellow-600 mx-auto mb-3" size={32} />
                  <h3 className="font-semibold text-yellow-800 mb-2">Unity Building</h3>
                  <p className="text-sm text-gray-600">Bringing together all Jain sects under one umbrella</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md border border-blue-100">
                  <Sparkles className="text-blue-600 mx-auto mb-3" size={32} />
                  <h3 className="font-semibold text-blue-800 mb-2">Cultural Preservation</h3>
                  <p className="text-sm text-gray-600">Maintaining and celebrating our rich Jain heritage</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md border border-yellow-100">
                  <Award className="text-yellow-600 mx-auto mb-3" size={32} />
                  <h3 className="font-semibold text-yellow-800 mb-2">Excellence</h3>
                  <p className="text-sm text-gray-600">Striving for excellence in all our endeavors</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}