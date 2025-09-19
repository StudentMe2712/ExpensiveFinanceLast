import { z } from 'zod'

export const applicationSchema = z.object({
  fullName: z.string().min(2, 'Имя должно содержать минимум 2 символа').max(50, 'Имя не должно превышать 50 символов'),
  phone: z.string().regex(/^(\+7|8)?[\s\-]?\(?[67][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/, 'Введите корректный казахстанский номер телефона'),
  email: z.string().email('Введите корректный email адрес'),
  loanAmount: z.number().min(50000, 'Минимальная сумма кредита 50,000 тенге').max(50000000, 'Максимальная сумма кредита 50,000,000 тенге'),
  comment: z.string().max(500, 'Комментарий не должен превышать 500 символов').optional(),
})

export const contentSchema = z.object({
  section: z.string().min(1, 'Раздел обязателен'),
  title: z.string().optional(),
  content: z.string().min(1, 'Содержимое обязательно'),
})

export const newsSchema = z.object({
  title: z.string().min(1, 'Заголовок обязателен').max(200, 'Заголовок не должен превышать 200 символов'),
  content: z.string().min(1, 'Содержимое обязательно'),
  published: z.boolean().default(false),
})

export type ApplicationFormData = z.infer<typeof applicationSchema>
export type ContentFormData = z.infer<typeof contentSchema>
export type NewsFormData = z.infer<typeof newsSchema>
