import { render, screen } from '@testing-library/react'
import Header from '@/components/Header'

// Mock Next.js Link component
jest.mock('next/link', () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>
  }
})

describe('Header Component', () => {
  it('renders logo and company name', () => {
    render(<Header />)
    
    expect(screen.getByText('Expensive Finance')).toBeInTheDocument()
    expect(screen.getByText('EF')).toBeInTheDocument()
  })

  it('renders navigation menu', () => {
    render(<Header />)
    
    expect(screen.getByText('О компании')).toBeInTheDocument()
    expect(screen.getByText('Услуги')).toBeInTheDocument()
    expect(screen.getByText('Заявка')).toBeInTheDocument()
    expect(screen.getByText('Контакты')).toBeInTheDocument()
  })

  it('renders CTA button', () => {
    render(<Header />)
    
    expect(screen.getByText('Оставить заявку')).toBeInTheDocument()
  })

  it('has correct navigation links', () => {
    render(<Header />)
    
    const aboutLink = screen.getByText('О компании')
    const servicesLink = screen.getByText('Услуги')
    const applicationLink = screen.getByText('Заявка')
    const contactsLink = screen.getByText('Контакты')
    
    expect(aboutLink.closest('a')).toHaveAttribute('href', '#about')
    expect(servicesLink.closest('a')).toHaveAttribute('href', '#services')
    expect(applicationLink.closest('a')).toHaveAttribute('href', '#application')
    expect(contactsLink.closest('a')).toHaveAttribute('href', '#contacts')
  })
})
