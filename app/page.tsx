import Hero from './components/Hero'
import AboutSection from './components/AboutSection'
import UpcomingEvents from './components/UpcomingEvents'
import QuickLinks from './components/QuickLinks'

export default function Home() {
  return (
    <div className="scroll-smooth">
      <Hero />
      <AboutSection />
      <UpcomingEvents />
      <QuickLinks />
    </div>
  )
}