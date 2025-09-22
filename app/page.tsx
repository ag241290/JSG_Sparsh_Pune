import Hero from './components/Hero'
import AboutSection from './components/AboutSectionSimple'

export default function Home() {
  return (
    <div className="scroll-smooth">
      <Hero />
      <AboutSection />
    </div>
  )
}