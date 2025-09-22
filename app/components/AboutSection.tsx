import { Heart, Users, Calendar, Award, Sparkles, Target, CheckCircle } from 'lucide-react'
import Image from 'next/image'

export default function AboutSection() {
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
    { label: 'Active Members', value: '300+', icon: Users },
    { label: 'Jain Sects United', value: '4', icon: CheckCircle },
    { label: 'Programs Organized', value: '15+', icon: Calendar },
    { label: 'Year Established', value: '2024', icon: Award },
  ]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="flex justify-center mb-8">
            <div className="bg-white p-4 rounded-2xl shadow-lg border-2 border-blue-100">
              <div className="relative w-20 h-20">
                <Image
                  src="/images/JSG_SPARSH.jpeg"
                  alt="JSG SPARSH Pune Logo"
                  fill
                  className="object-contain rounded-xl"
                />
              </div>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-6">
            About JSG SPARSH Pune
          </h2>
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

        {/* JSG Federation Partnership */}
        <div className="mb-20 animate-slide-up">
          <div className="bg-white rounded-3xl p-10 shadow-lg border border-blue-200 hover:shadow-xl transition-all duration-300">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="flex-1 mb-8 lg:mb-0 lg:pr-12">
                <div className="flex items-center mb-6">
                  <div className="w-2 h-12 bg-gradient-to-b from-blue-500 to-yellow-500 rounded-full mr-4"></div>
                  <h3 className="text-3xl font-bold text-blue-800">
                    Proud Member of JSG International Federation
                  </h3>
                </div>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  JSG SPARSH Pune operates under the umbrella of Jain Social Groups International Federation (JSGIF), 
                  connecting us with Jain communities worldwide. This partnership strengthens our mission and 
                  provides a broader platform for cultural exchange and community service.
                </p>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Through this global federation, we share best practices, collaborate on larger initiatives, 
                  and maintain the rich traditions of our Jain heritage while fostering international unity.
                </p>
                
                <div className="flex justify-start">
                  <a 
                    href="https://jsgif.org/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    Learn More About JSGIF
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
              
              <div className="flex-shrink-0">
                <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-gray-200">
                  <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto">
                    {/* Yellow Highlighter Effect - Only on Logo */}
                    <div className="absolute inset-0 bg-yellow-200 opacity-30 rounded-2xl animate-pulse"></div>
                    <div className="absolute -inset-2 bg-gradient-to-r from-yellow-300 to-yellow-400 opacity-40 rounded-3xl blur-lg"></div>
                    <div className="absolute inset-0 rounded-2xl border-3 border-yellow-300 opacity-60"></div>
                    
                    <Image
                      src="/images/JSG_Federation.jpeg"
                      alt="JSG International Federation Logo"
                      fill
                      className="object-contain relative z-10 rounded-xl"
                      style={{
                        filter: 'drop-shadow(0 0 8px rgba(255, 193, 7, 0.4)) brightness(1.1) contrast(1.1)'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-blue-800 mb-12 text-center">
            Our Key Focus Areas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group bg-white p-8 rounded-3xl shadow-md hover:shadow-lg transition-all duration-300 border border-blue-100"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="text-white" size={28} />
                </div>
                <h4 className="text-xl font-bold text-blue-800 mb-4">
                  {feature.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-blue-800 mb-12 text-center">
            Our Core Values
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-8 rounded-3xl shadow-md hover:shadow-lg transition-all duration-300 border border-blue-200">
              <h4 className="text-xl font-bold text-blue-800 mb-4">Community & Brotherhood</h4>
              <p className="text-blue-700 leading-relaxed">
                Strong emphasis on creating a supportive and nurturing environment where trust, 
                compassion, and respect are central to the relationships formed within the community.
              </p>
            </div>
            <div className="bg-yellow-50 p-8 rounded-3xl shadow-md hover:shadow-lg transition-all duration-300 border border-yellow-200">
              <h4 className="text-xl font-bold text-yellow-800 mb-4">Unity in Diversity</h4>
              <p className="text-yellow-700 leading-relaxed">
                Bringing together individuals from diverse Jain sects, highlighting the strength 
                that comes from collaboration and shared values across different traditions.
              </p>
            </div>
            <div className="bg-blue-50 p-8 rounded-3xl shadow-md hover:shadow-lg transition-all duration-300 border border-blue-200">
              <h4 className="text-xl font-bold text-blue-800 mb-4">Holistic Growth</h4>
              <p className="text-blue-700 leading-relaxed">
                Vision encompasses both spiritual well-being and professional opportunities, 
                recognizing that faith and commerce can coexist harmoniously to benefit the community.
              </p>
            </div>
          </div>
        </div>

        {/* Mission Statement with Stats */}
        <div className="bg-gradient-to-r from-blue-50 to-yellow-50 rounded-3xl p-10 shadow-lg border border-blue-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-blue-800 mb-6">Our Mission</h3>
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
                  className={`text-center p-6 rounded-2xl ${
                    index % 2 === 0 ? 'bg-blue-50 border-blue-200' : 'bg-yellow-50 border-yellow-200'
                  } hover:shadow-md transition-all duration-300 shadow-sm border`}
                >
                  <div className="flex justify-center mb-4">
                    <div className={`p-3 rounded-xl ${
                      index % 2 === 0 ? 'bg-blue-500' : 'bg-yellow-500'
                    }`}>
                      <achievement.icon className="text-white" size={24} />
                    </div>
                  </div>
                  <div className={`text-3xl font-bold mb-2 ${
                    index % 2 === 0 ? 'text-blue-600' : 'text-yellow-600'
                  }`}>
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
      </div>
    </section>
  )
}