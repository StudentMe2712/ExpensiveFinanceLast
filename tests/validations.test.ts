import { applicationSchema } from '@/lib/validations'

describe('Application Validation', () => {
  it('validates correct application data', () => {
    const validData = {
      fullName: 'Иванов Иван Иванович',
      phone: '+7 (999) 123-45-67',
      email: 'ivan@example.com',
      loanAmount: 500000,
      comment: 'Нужен кредит на покупку квартиры'
    }

    const result = applicationSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  it('rejects invalid email', () => {
    const invalidData = {
      fullName: 'Иванов Иван Иванович',
      phone: '+7 (999) 123-45-67',
      email: 'invalid-email',
      loanAmount: 500000,
    }

    const result = applicationSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.errors[0].message).toContain('email')
    }
  })

  it('rejects invalid phone number', () => {
    const invalidData = {
      fullName: 'Иванов Иван Иванович',
      phone: '123',
      email: 'ivan@example.com',
      loanAmount: 500000,
    }

    const result = applicationSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.errors[0].message).toContain('телефон')
    }
  })

  it('rejects loan amount below minimum', () => {
    const invalidData = {
      fullName: 'Иванов Иван Иванович',
      phone: '+7 (999) 123-45-67',
      email: 'ivan@example.com',
      loanAmount: 5000, // Below minimum of 10000
    }

    const result = applicationSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.errors[0].message).toContain('10,000')
    }
  })

  it('rejects loan amount above maximum', () => {
    const invalidData = {
      fullName: 'Иванов Иван Иванович',
      phone: '+7 (999) 123-45-67',
      email: 'ivan@example.com',
      loanAmount: 100000000, // Above maximum of 50000000
    }

    const result = applicationSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.errors[0].message).toContain('50,000,000')
    }
  })

  it('rejects empty full name', () => {
    const invalidData = {
      fullName: '',
      phone: '+7 (999) 123-45-67',
      email: 'ivan@example.com',
      loanAmount: 500000,
    }

    const result = applicationSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.errors[0].message).toContain('2 символа')
    }
  })

  it('accepts valid data without comment', () => {
    const validData = {
      fullName: 'Иванов Иван Иванович',
      phone: '+7 (999) 123-45-67',
      email: 'ivan@example.com',
      loanAmount: 500000,
    }

    const result = applicationSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })
})
