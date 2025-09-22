import { HandHeart, Users, Calendar, Award } from 'lucide-react'

export default function AboutSection() {
  const features = [
    {
      icon: HandHeart,
      title: 'Community Service',
      description: 'Organizing charitable activities and helping those in need within and beyond our community.',
      hindi: '???????? ????'
    },
    {
      icon: Calendar,
      title: 'Cultural Events',
      description: 'Celebrating Jain festivals, organizing cultural programs, and preserving our rich traditions.',
      hindi: '?????????? ?????????'
    },
    {
      icon: Users,
      title: 'Social Networking',
      description: 'Building connections among Jain families in Pune through regular social gatherings.',
      hindi: '??????? ??????????'
    },
    {
      icon: Award,
      title: 'Youth Development',
      description: 'Mentoring young minds and providing platforms for their personal and professional growth.',
      hindi: '???? ?????'
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            About JSG SPARSH Pune
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-4">
            JSG SPARSH Pune is a vibrant social organization dedicated to bringing together 
            the Jain community in Pune. We focus on preserving our cultural heritage while 
            adapting to modern times.
          </p>
          <p className="text-base text-primary-600 font-hindi">
            ????? ???????? ??? ?????? ?? ????? ???? ?? ????? ???????? ?? ??? ?????? ??
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md card-hover">
              <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-4">
                <feature.icon className="text-primary-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-primary-600 font-hindi mb-2">
                {feature.hindi}
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 mb-4">
                To create a strong, united Jain community in Pune that upholds the principles of 
                Jainism while embracing progress and inclusivity. We strive to be a platform where 
                traditions meet modernity, and every member feels valued and connected.
              </p>
              <div className="bg-primary-50 p-4 rounded-lg">
                <p className="text-primary-800 font-hindi text-center">
                  "?????? ???? ?????" - Non-violence is the supreme religion
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-primary-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-primary-600">2008</div>
                <div className="text-sm text-gray-600">Established</div>
              </div>
              <div className="bg-secondary-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-secondary-600">500+</div>
                <div className="text-sm text-gray-600">Families</div>
              </div>
              <div className="bg-primary-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-primary-600">50+</div>
                <div className="text-sm text-gray-600">Events</div>
              </div>
              <div className="bg-secondary-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-secondary-600">15+</div>
                <div className="text-sm text-gray-600">Years</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}