import nodemailer from 'nodemailer'
import { Application, ApplicationStatus } from '@/types'

// Создание транспорта для отправки email
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: false, // true для 465, false для других портов
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })
}

// Отправка уведомления о новой заявке
export async function sendEmailNotification(application: Application) {
  const transporter = createTransporter()
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: `Новая заявка от ${application.name} - Expensive Finance`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #f59e0b, #d97706); padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Expensive Finance</h1>
          <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Новая заявка на кредит</p>
        </div>
        
        <div style="padding: 30px; background: #f9fafb;">
          <h2 style="color: #1f2937; margin-bottom: 20px;">Данные заявки</h2>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">ФИО:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${application.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Телефон:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;">
                  <a href="tel:${application.phone}" style="color: #f59e0b; text-decoration: none;">${application.phone}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Email:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;">
                  <a href="mailto:${application.email}" style="color: #f59e0b; text-decoration: none;">${application.email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Сумма кредита:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937; font-weight: bold;">${application.loanAmount ? application.loanAmount.toLocaleString('ru-RU') + ' ₽' : 'Не указана'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Статус:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${getStatusText(application.status)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Дата подачи:</td>
                <td style="padding: 8px 0; color: #1f2937;">${new Date(application.createdAt).toLocaleString('ru-RU')}</td>
              </tr>
            </table>
          </div>
          
          ${application.comment ? `
            <div style="background: white; padding: 20px; border-radius: 8px;">
              <h3 style="color: #1f2937; margin-bottom: 10px;">Комментарий клиента:</h3>
              <p style="color: #4b5563; line-height: 1.6; margin: 0;">${application.comment}</p>
            </div>
          ` : ''}
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/applications/${application.id}" 
               style="background: #f59e0b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
              Просмотреть заявку
            </a>
          </div>
        </div>
        
        <div style="background: #1f2937; padding: 20px; text-align: center;">
          <p style="color: #9ca3af; margin: 0; font-size: 14px;">
            © ${new Date().getFullYear()} Expensive Finance. Все права защищены.
          </p>
        </div>
      </div>
    `,
  }
  
  try {
    await transporter.sendMail(mailOptions)
    console.log('Email уведомление отправлено успешно')
  } catch (error) {
    console.error('Ошибка отправки email:', error)
    throw error
  }
}

// Получение текста статуса на русском языке
function getStatusText(status: ApplicationStatus): string {
  const statusMap: Record<ApplicationStatus, string> = {
    [ApplicationStatus.NEW]: 'Новая заявка',
    [ApplicationStatus.PENDING]: 'Ожидает рассмотрения',
    [ApplicationStatus.IN_PROGRESS]: 'В обработке',
    [ApplicationStatus.SENT_TO_BANK]: 'Отправлено в банк',
    [ApplicationStatus.APPROVED]: 'Одобрено',
    [ApplicationStatus.REJECTED]: 'Отклонено',
  }
  
  return statusMap[status] || status
}
