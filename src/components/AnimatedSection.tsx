'use client'

import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { ReactNode } from 'react'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  animation?: 'fade-in-up' | 'fade-in-left' | 'fade-in-right' | 'scale-in'
  delay?: number
}

const AnimatedSection = ({ 
  children, 
  className = '', 
  animation = 'fade-in-up',
  delay = 0 
}: AnimatedSectionProps) => {
  const { elementRef, animationClasses } = useScrollAnimation({
    animationClass: `animate-${animation}`,
    threshold: 0.1,
    triggerOnce: true
  })

  const delayStyle = delay > 0 ? { animationDelay: `${delay}ms` } : {}

  return (
    <div 
      ref={elementRef} 
      className={`transition-all duration-800 ${animationClasses} ${className}`}
      style={delayStyle}
    >
      {children}
    </div>
  )
}

export default AnimatedSection
