import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import ServicesSlider from '@/components/ServicesSlider'
import CreditCalculator from '@/components/CreditCalculator'
import ServicesSection from '@/components/ServicesSection'
import AnimatedSection from '@/components/AnimatedSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <AnimatedSection animation="fade-in-up">
        <ServicesSlider />
      </AnimatedSection>
      <AnimatedSection animation="scale-in" delay={200}>
        <CreditCalculator />
      </AnimatedSection>
      <AnimatedSection animation="fade-in-right" delay={300}>
        <ServicesSection />
      </AnimatedSection>
      <Footer />
    </main>
  )
}