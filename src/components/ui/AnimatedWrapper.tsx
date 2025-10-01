'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface AnimatedWrapperProps {
  children: React.ReactNode
  animation?: 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn' | 'slideUp'
  delay?: number
  duration?: number
  threshold?: number
  className?: string
  once?: boolean
}

const AnimatedWrapper = ({
  children,
  animation = 'fadeInUp',
  delay = 0,
  duration = 800,
  threshold = 0.1,
  className,
  once = true
}: AnimatedWrapperProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!hasAnimated) {
            setTimeout(() => {
              setIsVisible(true)
              setHasAnimated(true)
            }, delay)
          }
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [delay, threshold, once, hasAnimated])

  const animationClasses = {
    fadeInUp: 'animate-fade-in-up',
    fadeInDown: 'animate-fade-in-down',
    fadeInLeft: 'animate-fade-in-left',
    fadeInRight: 'animate-fade-in-right',
    scaleIn: 'animate-scale-in',
    slideUp: 'animate-slide-up'
  }

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-out',
        !isVisible && 'opacity-0',
        isVisible && animationClasses[animation],
        className
      )}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`
      }}
    >
      {children}
    </div>
  )
}

// Предустановленные компоненты для разных случаев
export const FadeInUp = ({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <AnimatedWrapper animation="fadeInUp" delay={delay} className={className}>
    {children}
  </AnimatedWrapper>
)

export const FadeInDown = ({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <AnimatedWrapper animation="fadeInDown" delay={delay} className={className}>
    {children}
  </AnimatedWrapper>
)

export const FadeInLeft = ({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <AnimatedWrapper animation="fadeInLeft" delay={delay} className={className}>
    {children}
  </AnimatedWrapper>
)

export const FadeInRight = ({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <AnimatedWrapper animation="fadeInRight" delay={delay} className={className}>
    {children}
  </AnimatedWrapper>
)

export const ScaleIn = ({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <AnimatedWrapper animation="scaleIn" delay={delay} className={className}>
    {children}
  </AnimatedWrapper>
)

export const SlideUp = ({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <AnimatedWrapper animation="slideUp" delay={delay} className={className}>
    {children}
  </AnimatedWrapper>
)

// Компонент для анимации списка элементов
export const AnimatedList = ({ 
  children, 
  staggerDelay = 100, 
  className 
}: { 
  children: React.ReactNode[]; 
  staggerDelay?: number; 
  className?: string 
}) => (
  <div className={className}>
    {children.map((child, index) => (
      <AnimatedWrapper key={index} delay={index * staggerDelay}>
        {child}
      </AnimatedWrapper>
    ))}
  </div>
)

export default AnimatedWrapper
