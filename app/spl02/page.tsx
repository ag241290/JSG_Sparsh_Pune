'use client'

import { Calendar, MapPin, Clock, Users, Trophy, Star, Target, Award, Phone, Mail, Zap, Heart, Gift } from 'lucide-react'

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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 py-6 sm:py-12">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">

                {/* Hero Section - Mobile Optimized */}
                <div className="text-center mb-12 sm:mb-16 relative">
                    <div className="bg-gradient-to-r from-blue-600 to-yellow-600 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-12 mb-6 sm:mb-8 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10">
                            <div className="w-48 h-48 sm:w-96 sm:h-96 bg-white rounded-full -top-24 -right-24 sm:-top-48 sm:-right-48"></div>
                            <div className="w-32 h-32 sm:w-64 sm:h-64 bg-white rounded-full -bottom-16 -left-16 sm:-bottom-32 sm:-left-32"></div>
                        </div>

                        <div className="relative z-10 space-y-4 sm:space-y-6">
                            <div className="text-lg sm:text-2xl md:text-3xl font-bold animate-pulse">
                                ✨ BLOCK YOUR DATES ! ✨
                            </div>
                            
                            <div className="text-2xl sm:text-4xl md:text-5xl font-bold leading-tight">
                                🥎 15 & 16 November 2025 🥎
                            </div>
                            
                            <div className="text-xl sm:text-3xl md:text-4xl font-bold leading-tight">
                                🏏 {tournamentInfo.subtitle}
                            </div>
                            
                            <div className="text-lg sm:text-2xl md:text-3xl font-bold text-yellow-200 leading-tight">
                                🔥 {tournamentInfo.title} – {tournamentInfo.season} 🔥
                            </div>

                            {/* Register Now Button */}
                            <div className="pt-2 sm:pt-4">
                                <a
                                    href="/register-now"
                                    className="inline-flex items-center space-x-2 bg-white text-blue-600 px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold hover:bg-blue-50 transition-colors duration-200 shadow-lg text-sm sm:text-base"
                                >
                                    <Trophy size={16} className="sm:w-5 sm:h-5" />
                                    <span>Register Now</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Tournament Description - Mobile Optimized */}
                    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-lg border border-blue-200 mb-6 sm:mb-8">
                        <h2 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-4 sm:mb-6">
                            💥 Get ready for the ultimate cricket showdown!
                        </h2>
                        <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                            The most anticipated Box Cricket Tournament is just around the corner, bringing you:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
                            <div className="bg-blue-50 p-3 sm:p-4 rounded-lg sm:rounded-xl">
                                <div className="text-xl sm:text-2xl mb-1 sm:mb-2">⚡</div>
                                <div className="font-bold text-blue-800 text-sm sm:text-base">Thrilling Matches</div>
                            </div>
                            <div className="bg-yellow-50 p-3 sm:p-4 rounded-lg sm:rounded-xl">
                                <div className="text-xl sm:text-2xl mb-1 sm:mb-2">💪</div>
                                <div className="font-bold text-yellow-800 text-sm sm:text-base">Fierce Competition</div>
                            </div>
                            <div className="bg-green-50 p-3 sm:p-4 rounded-lg sm:rounded-xl">
                                <div className="text-xl sm:text-2xl mb-1 sm:mb-2">🎉</div>
                                <div className="font-bold text-green-800 text-sm sm:text-base">Non-stop Excitement</div>
                            </div>
                        </div>
                        <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6">
                            Whether you're a player or a fan, this is the event you've been waiting for!
                        </p>
                        <div className="text-sm sm:text-lg text-blue-800 font-bold">
                            📣 Stay Tuned for updates on: 🏅 Sponsorship 📝 Registration 🗓️ Schedules 🎁 Prizes
                        </div>
                    </div>
                </div>

                {/* Team Categories - Mobile Friendly */}
                <div className="mb-12 sm:mb-16">
                    <h2 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-6 sm:mb-8 text-center">
                        Tournament Categories
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
                        {teamCategories.map((team, index) => {
                            const IconComponent = team.icon
                            return (
                                <div key={index} className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                                    <div className={`bg-gradient-to-r ${team.color} p-4 sm:p-6 rounded-xl sm:rounded-2xl text-white text-center mb-4 sm:mb-6`}>
                                        <IconComponent size={32} className="sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-4" />
                                        <h3 className="text-lg sm:text-2xl font-bold mb-1 sm:mb-2">{team.category}</h3>
                                        <div className="text-2xl sm:text-4xl font-bold">{team.count}</div>
                                        <div className="text-xs sm:text-sm opacity-90">Teams</div>
                                    </div>
                                    <p className="text-gray-600 text-center leading-relaxed text-sm sm:text-base">
                                        {team.description}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Sponsorship Section - Mobile Optimized */}
                <div className="mb-12 sm:mb-16">
                    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-12 shadow-lg border border-gray-100">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-blue-800 mb-4 sm:mb-8">
                            Why Sponsor SPL-02?
                        </h2>
                        <p className="text-base sm:text-xl text-gray-700 text-center mb-8 sm:mb-12 leading-relaxed max-w-4xl mx-auto">
                            Partnering with SPL-02 places your brand at the heart of a dynamic sporting celebration
                            that unites the community and delivers measurable visibility.
                        </p>

                        {/* Sponsorship Benefits - Mobile Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 mb-8 sm:mb-12">
                            {sponsorshipBenefits.map((benefit, index) => {
                                const IconComponent = benefit.icon
                                return (
                                    <div key={index} className="text-center p-4 sm:p-6 bg-blue-50 rounded-xl sm:rounded-2xl hover:bg-blue-100 transition-colors duration-200">
                                        <div className="bg-blue-600 text-white p-3 sm:p-4 rounded-full w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                                            <IconComponent size={18} className="sm:w-6 sm:h-6" />
                                        </div>
                                        <h3 className="text-lg sm:text-xl font-bold text-blue-800 mb-2 sm:mb-3">{benefit.title}</h3>
                                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{benefit.description}</p>
                                    </div>
                                )
                            })}
                        </div>

                        {/* Call to Action - Mobile Friendly */}
                        <div className="bg-gradient-to-r from-yellow-500 to-blue-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white text-center">
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">Let's Create Season 2 Together!</h3>
                            <p className="text-base sm:text-xl mb-4 sm:mb-6 leading-relaxed">
                                Be part of one of Pune's biggest community sporting events of 2025.
                                Build your brand, celebrate cricket, and strengthen community ties.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contact Section - Mobile Optimized */}
                <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-12 shadow-lg border border-gray-100 text-center">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-800 mb-6 sm:mb-8">
                        For Sponsorship Bookings and Inquiries
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
                        {contactPersons.map((person, index) => (
                            <div key={index} className="bg-blue-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:bg-blue-100 transition-colors duration-200">
                                <h4 className="text-lg sm:text-xl font-bold text-blue-800 mb-1 sm:mb-2">{person.name}</h4>
                                <p className="text-blue-600 font-medium mb-2 sm:mb-3 text-sm sm:text-base">{person.role}</p>
                                <a
                                    href={`tel:${person.phone}`}
                                    className="inline-flex items-center space-x-2 bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl hover:bg-blue-700 transition-colors duration-200 text-sm sm:text-base"
                                >
                                    <Phone size={14} className="sm:w-4 sm:h-4" />
                                    <span>{person.phone}</span>
                                </a>
                            </div>
                        ))}
                    </div>

                    {/* Action Buttons - Mobile Stack */}
                    <div className="mt-6 sm:mt-8">
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold text-base sm:text-lg transition-all duration-300 shadow-lg w-full sm:w-auto">
                                Become a Sponsor
                            </button>
                            <button 
                                onClick={handleBrochureDownload}
                                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold text-base sm:text-lg transition-all duration-300 w-full sm:w-auto"
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