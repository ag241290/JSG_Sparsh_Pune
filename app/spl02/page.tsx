'use client'

import { Calendar, MapPin, Clock, Users, Trophy, Star, Target, Award, Phone, Mail, Play, Zap, Heart, Gift } from 'lucide-react'

export default function SPL02() {
    const tournamentInfo = {
        title: "SPARSH PREMIER LEAGUE",
        season: "Season 2",
        subtitle: "The Most Awaited Box Cricket Tournament",
        dates: "15 & 16 November 2025",
        venue: "Cricket Grounds, Pune",
        totalTeams: 20,
        registeredTeams: 8,
        prizePool: "₹1,00,000"
    }

    const teamCategories = [
        {
            category: "Men's Teams",
            count: 12,
            icon: Users,
            color: "from-blue-500 to-blue-600",
            description: "Elite male cricket teams competing for the championship"
        },
        {
            category: "Women's Teams",
            count: 4,
            icon: Heart,
            color: "from-pink-500 to-pink-600",
            description: "Talented female cricketers showcasing their skills"
        },
        {
            category: "Kids Teams",
            count: 4,
            icon: Star,
            color: "from-green-500 to-green-600",
            description: "Young cricket enthusiasts building the future of the sport"
        }
    ]

    const sponsorshipBenefits = [
        {
            title: "High Visibility",
            description: "Branding across the venue, social media, and live coverage",
            icon: Target
        },
        {
            title: "Direct Engagement",
            description: "Reach an enthusiastic Jain community audience",
            icon: Users
        },
        {
            title: "Networking",
            description: "Connect with business leaders and influencers",
            icon: Star
        },
        {
            title: "Positive Association",
            description: "Energetic, family-friendly sporting event",
            icon: Heart
        },
        {
            title: "Entertainment Factor",
            description: "DJ & Dhol keep the energy high all evening",
            icon: Zap
        },
        {
            title: "Community Impact",
            description: "Support local talent and contribute to sports development",
            icon: Gift
        }
    ]

    const contactPersons = [
        {
            name: "Mukesh G Jain",
            role: "PRO - Sports",
            phone: "9420277778"
        },
        {
            name: "Vinod Jain",
            role: "Treasurer",
            phone: "9028847311"
        },
        {
            name: "Dhiraj S Shah",
            role: "Founder President",
            phone: "8975797500"
        }
    ]

    const handleBrochureDownload = () => {
        const link = document.createElement('a')
        link.href = '/files/SPL02_Sponsorship.pdf'
        link.download = 'SPL02_Sponsorship_Brochure.pdf'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Hero Section with Announcement - Cleaned Up */}
                <div className="text-center mb-16 relative">
                    <div className="bg-gradient-to-r from-blue-600 to-yellow-600 text-white rounded-3xl p-8 md:p-12 mb-8 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10">
                            <div className="w-96 h-96 bg-white rounded-full -top-48 -right-48"></div>
                            <div className="w-64 h-64 bg-white rounded-full -bottom-32 -left-32"></div>
                        </div>

                        <div className="relative z-10 space-y-6">
                            <div className="text-2xl md:text-3xl font-bold animate-pulse">
                                ✨ BLOCK YOUR DATES ! ✨
                            </div>
                            
                            <div className="text-4xl md:text-5xl font-bold">
                                🥎 15 & 16 November 2025 🥎
                            </div>
                            
                            <div className="text-3xl md:text-4xl font-bold">
                                🏏 {tournamentInfo.subtitle}
                            </div>
                            
                            <div className="text-2xl md:text-3xl font-bold text-yellow-200">
                                🔥 {tournamentInfo.title} – {tournamentInfo.season} 🔥
                            </div>

                            {/* Teaser Video Link */}
                            <div className="pt-4">
                                <a
                                    href="https://youtu.be/kj3GMZgyCYc?si=I1XC9HMrZhS5DI0l"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center space-x-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors duration-200 shadow-lg"
                                >
                                    <Play size={20} />
                                    <span>Watch Teaser Video</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Tournament Description */}
                    <div className="bg-white rounded-3xl p-8 shadow-lg border border-blue-200 mb-8">
                        <h2 className="text-3xl font-bold text-blue-800 mb-6">
                            💥 Get ready for the ultimate cricket showdown!
                        </h2>
                        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                            The most anticipated Box Cricket Tournament is just around the corner, bringing you:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="bg-blue-50 p-4 rounded-xl">
                                <div className="text-2xl mb-2">⚡</div>
                                <div className="font-bold text-blue-800">Thrilling Matches</div>
                            </div>
                            <div className="bg-yellow-50 p-4 rounded-xl">
                                <div className="text-2xl mb-2">💪</div>
                                <div className="font-bold text-yellow-800">Fierce Competition</div>
                            </div>
                            <div className="bg-green-50 p-4 rounded-xl">
                                <div className="text-2xl mb-2">🎉</div>
                                <div className="font-bold text-green-800">Non-stop Excitement</div>
                            </div>
                        </div>
                        <p className="text-lg text-gray-700 mb-6">
                            Whether you're a player or a fan, this is the event you've been waiting for!
                        </p>
                        <div className="text-lg text-blue-800 font-bold">
                            📣 Stay Tuned for updates on: 🏅 Sponsorship 📝 Registration 🗓️ Schedules 🎁 Prizes
                        </div>
                    </div>
                </div>

                {/* Team Categories */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">
                        Tournament Categories
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {teamCategories.map((team, index) => {
                            const IconComponent = team.icon
                            return (
                                <div key={index} className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                                    <div className={`bg-gradient-to-r ${team.color} p-6 rounded-2xl text-white text-center mb-6`}>
                                        <IconComponent size={48} className="mx-auto mb-4" />
                                        <h3 className="text-2xl font-bold mb-2">{team.category}</h3>
                                        <div className="text-4xl font-bold">{team.count}</div>
                                        <div className="text-sm opacity-90">Teams</div>
                                    </div>
                                    <p className="text-gray-600 text-center leading-relaxed">
                                        {team.description}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Sponsorship Section - Now with 6 tiles (3x2 grid) */}
                <div className="mb-16">
                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-gray-100">
                        <h2 className="text-4xl font-bold text-center text-blue-800 mb-8">
                            Why Sponsor Sparsh Premier League – Season 2 (SPL-02)?
                        </h2>
                        <p className="text-xl text-gray-700 text-center mb-12 leading-relaxed max-w-4xl mx-auto">
                            Partnering with SPL-02 places your brand at the heart of a dynamic sporting celebration
                            that unites the community and delivers measurable visibility.
                        </p>

                        {/* Sponsorship Benefits - 3x2 Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                            {sponsorshipBenefits.map((benefit, index) => {
                                const IconComponent = benefit.icon
                                return (
                                    <div key={index} className="text-center p-6 bg-blue-50 rounded-2xl hover:bg-blue-100 transition-colors duration-200">
                                        <div className="bg-blue-600 text-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                            <IconComponent size={24} />
                                        </div>
                                        <h3 className="text-xl font-bold text-blue-800 mb-3">{benefit.title}</h3>
                                        <p className="text-gray-700 leading-relaxed">{benefit.description}</p>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Call to Action */}
                        <div className="bg-gradient-to-r from-yellow-500 to-blue-600 rounded-3xl p-8 text-white text-center">
                            <h3 className="text-3xl font-bold mb-4">Let's Create Season 2 Together!</h3>
                            <p className="text-xl mb-6 leading-relaxed">
                                Be part of one of Pune's biggest community sporting events of 2025.
                                Build your brand, celebrate cricket, and strengthen community ties.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contact Section */}
                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-gray-100 text-center">
                    <h3 className="text-3xl font-bold text-blue-800 mb-8">
                        For Sponsorship Bookings and Inquiries
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {contactPersons.map((person, index) => (
                            <div key={index} className="bg-blue-50 rounded-2xl p-6 hover:bg-blue-100 transition-colors duration-200">
                                <h4 className="text-xl font-bold text-blue-800 mb-2">{person.name}</h4>
                                <p className="text-blue-600 font-medium mb-3">{person.role}</p>
                                <a
                                    href={`tel:${person.phone}`}
                                    className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors duration-200"
                                >
                                    <Phone size={16} />
                                    <span>{person.phone}</span>
                                </a>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8">
                        <div className="inline-flex space-x-4">
                            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg">
                                Become a Sponsor
                            </button>
                            <button 
                                onClick={handleBrochureDownload}
                                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300"
                            >
                                Download Brochure
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}