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
      gradient: 'from-red-500 to-red-600'
    },
    {
      icon: Calendar,
      title: 'Cultural Events',
      description: 'Organizing vibrant celebrations like Rangbarse, Dazzle-N-Dance, Installation ceremonies, and traditional festival programs.',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      icon: Target,
      title: 'Dan Patra Initiatives',
      description: 'Multiple charitable programs including education support, go-mata seva, social service, blood donation, and community welfare.',
      gradient: 'from-green-500 to-green-600'
    },
    {
      icon: Award,
      title: 'Spiritual & Professional Growth',
      description: 'Fostering both spiritual well-being and professional opportunities through collaborative business ventures and personal development.',
      gradient: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: Sparkles,
      title: 'Adventure & Bonding',
      description: 'Organizing exciting activities like Aqua Magic trips, adventure sports, and team-building experiences for all age groups.',
      gradient: 'from-orange-500 to-orange-600'
    }
  ]

  const achievements = [
    { label: 'Active Members', value: '275+', icon: Users },
    { label: 'Jain Sects United', value: '4', icon: CheckCircle },
    { label: 'Programs Organized', value: '15+', icon: Calendar },
    { label: 'Year Established', value: '2024', icon: Award },
  ]

  return (
    <section className="py-24 section-bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="flex justify-center mb-8">
            <div className="relative w-20 h-20 logo-glow">
              <Image
                src="/images/JSG_SPARSH.jpeg"
                alt="JSG SPARSH Pune Logo"
                fill
                className="object-contain rounded-2xl"
              />
            </div>
          </div>
          <h2 className="heading-secondary mb-6 decorative-border">
            About JSG SPARSH Pune
          </h2>
          <p className="text-xl text-neutral-600 max-w-4xl mx-auto mb-8 leading-relaxed">
            In 2024, we launched JSG Pune SPARSH Group with a clear vision: to build a strong, 
            unified community based on the principles of brotherhood and mutual respect. The group 
            is proud to have CORE COMMITTEE & members from all four Jain sects working together 
            as one cohesive Jain Social Group.
          </p>
          <div className="section-bg-saffron p-8 rounded-3xl max-w-3xl mx-auto shadow-soft">
            <p className="text-primary-800 font-bold text-lg mb-2">Our Guiding Principle</p>
            <p className="text-primary-700 text-2xl font-semibold italic">
              "Walk together, talk together, and act with one mind"
            </p>
            <div className="w-20 h-1 bg-gradient-to-r from-gold-400 to-gold-600 mx-auto mt-4 rounded-full"></div>
          </div>
        </div>

        {/* JSG Federation Partnership */}
        <div className="mb-20 animate-slide-up">
          <div className="bg-white rounded-3xl p-10 shadow-large hover:shadow-xl transition-all duration-300">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="flex-1 mb-8 lg:mb-0 lg:pr-12">
                <div className="flex items-center mb-6">
                  <div className="w-2 h-12 bg-gradient-to-b from-primary-500 to-secondary-500 rounded-full mr-4"></div>
                  <h3 className="text-3xl font-bold text-neutral-800">
                    Proud Member of JSG Federation
                  </h3>
                </div>
                <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
                  JSG SPARSH Pune is a proud member of the Jain Social Group Federation, connecting 
                  us with Jain communities worldwide. This partnership strengthens our mission and 
                  provides a broader platform for cultural exchange and community service.
                </p>
                <p className="text-lg text-neutral-600 leading-relaxed">
                  Through this federation, we share best practices, collaborate on larger initiatives, 
                  and maintain the rich traditions of our Jain heritage while fostering global unity.
                </p>
                
                {/* Partnership Benefits */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="text-green-500" size={20} />
                    <span className="text-neutral-700">Global Network Access</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="text-green-500" size={20} />
                    <span className="text-neutral-700">Best Practice Sharing</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="text-green-500" size={20} />
                    <span className="text-neutral-700">Cultural Exchange</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="text-green-500" size={20} />
                    <span className="text-neutral-700">Collaborative Initiatives</span>
                  </div>
                </div>
              </div>
              
              <div className="flex-shrink-0">
                <div className="relative w-40 h-40 logo-glow">
                  <Image
                    src="/images/JSG_Federation.jpeg"
                    alt="JSG Federation Logo"
                    fill
                    className="object-contain rounded-2xl shadow-medium"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-neutral-800 mb-12 text-center decorative-border">
            Our Key Focus Areas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group bg-white p-8 rounded-3xl shadow-medium card-hover"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="text-white" size={28} />
                </div>
                <h4 className="text-xl font-bold text-neutral-800 mb-4">
                  {feature.title}
                </h4>
                <p className="text-neutral-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-neutral-800 mb-12 text-center decorative-border">
            Our Core Values
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="section-bg-saffron p-8 rounded-3xl shadow-medium hover:shadow-large transition-all duration-300">
              <h4 className="text-xl font-bold text-primary-800 mb-4">Community & Brotherhood</h4>
              <p className="text-primary-700 leading-relaxed">
                Strong emphasis on creating a supportive and nurturing environment where trust, 
                compassion, and respect are central to the relationships formed within the community.
              </p>
            </div>
            <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 p-8 rounded-3xl shadow-medium hover:shadow-large transition-all duration-300">
              <h4 className="text-xl font-bold text-secondary-800 mb-4">Unity in Diversity</h4>
              <p className="text-secondary-700 leading-relaxed">
                Bringing together individuals from diverse Jain sects, highlighting the strength 
                that comes from collaboration and shared values across different traditions.
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-3xl shadow-medium hover:shadow-large transition-all duration-300">
              <h4 className="text-xl font-bold text-green-800 mb-4">Holistic Growth</h4>
              <p className="text-green-700 leading-relaxed">
                Vision encompasses both spiritual well-being and professional opportunities, 
                recognizing that faith and commerce can coexist harmoniously to benefit the community.
              </p>
            </div>
          </div>
        </div>

        {/* Mission Statement with Stats */}
        <div className="bg-white rounded-3xl p-10 shadow-large">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-neutral-800 mb-6">Our Mission</h3>
              <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
                To create a strong, united Jain community in Pune that upholds the principles of 
                Jainism while embracing progress and inclusivity. We strive to be a platform where 
                traditions meet modernity, and every member feels valued and connected.
              </p>
              <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                Our core philosophy reflects the group's commitment to collective growth, unity, 
                and empowerment, where both personal connections and collaborative business ventures thrive.
              </p>
              <div className="section-bg-saffron p-6 rounded-2xl">
                <p className="text-primary-800 text-center font-semibold text-lg italic">
                  "Ahimsa Paramo Dharma" - Non-violence is the supreme religion
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <div 
                  key={index}
                  className="text-center p-6 rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 hover:from-primary-100 hover:to-primary-200 transition-all duration-300 shadow-soft"
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-primary-500 rounded-xl">
                      <achievement.icon className="text-white" size={24} />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-primary-600 mb-2">
                    {achievement.value}
                  </div>
                  <div className="text-sm text-neutral-600 font-medium">
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