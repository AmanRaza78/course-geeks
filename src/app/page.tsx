import CallToAction from "@/components/landing-ui/call-to-action"
import FeatureSection from "@/components/landing-ui/feature-section"
import HeroSection from "@/components/landing-ui/hero-section"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <HeroSection/>
        <FeatureSection/>
        <CallToAction/>
      </main>
      
    </div>
  )
}