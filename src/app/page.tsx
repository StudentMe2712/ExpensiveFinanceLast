import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import ServicesSlider from '@/components/ServicesSlider'
import CreditCalculator from '@/components/CreditCalculator'
import AboutSection from '@/components/AboutSection'
import ServicesSection from '@/components/ServicesSection'
import ContactsSection from '@/components/ContactsSection'
import Footer from '@/components/Footer'
import AnimatedSection from '@/components/AnimatedSection'

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
      <AnimatedSection animation="fade-in-left" delay={300}>
        <AboutSection />
      </AnimatedSection>
      <AnimatedSection animation="fade-in-right" delay={400}>
        <ServicesSection />
      </AnimatedSection>
      <AnimatedSection animation="fade-in-up" delay={500}>
        <ContactsSection />
      </AnimatedSection>
      <Footer />
    </main>
  )
}
