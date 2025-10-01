import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

// WhatsApp API интеграция
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data } = body;

    // Обработка различных типов уведомлений
    switch (type) {
      case 'application_submitted':
        await sendWhatsAppNotification('admin', {
          message: `📋 *Новая заявка на кредит*\n\n👤 Клиент: ${data.name}\n📞 Телефон: ${data.phone}\n💰 Сумма: ${data.amount} ₸\n📅 Дата: ${new Date().toLocaleString('ru-RU')}\n\n🌐 Просмотреть: ${process.env.NEXTAUTH_URL}/admin/applications`,
          phone: process.env.WHATSAPP_ADMIN_PHONE
        });
        break;

      case 'application_approved':
        await sendWhatsAppNotification('client', {
          message: `✅ *Ваша заявка одобрена!*\n\n👤 ${data.name}, поздравляем!\n💰 Сумма: ${data.amount} ₸\n📊 Ставка: ${data.rate}% годовых\n\n📞 Наш менеджер свяжется с вами в течение часа.\n\n🌐 Подробности: ${process.env.NEXTAUTH_URL}/dashboard`,
          phone: data.phone
        });
        break;

      case 'application_rejected':
        await sendWhatsAppNotification('client', {
          message: `❌ *Заявка отклонена*\n\n👤 ${data.name}, к сожалению, ваша заявка была отклонена.\n\n💡 *Возможные причины:*\n• Неполный пакет документов\n• Недостаточный доход\n• Проблемы с кредитной историей\n\n📞 Свяжитесь с нами для консультации: +7 (777) 123-45-67\n\n🌐 Подать новую заявку: ${process.env.NEXTAUTH_URL}/#application`,
          phone: data.phone
        });
        break;

      case 'payment_reminder':
        await sendWhatsAppNotification('client', {
          message: `⏰ *Напоминание о платеже*\n\n👤 ${data.name}, напоминаем о предстоящем платеже:\n💰 Сумма: ${data.amount} ₸\n📅 Дата: ${data.dueDate}\n\n💳 Способы оплаты:\n• Банковский перевод\n• Карта онлайн\n• Наличными в офисе\n\n📞 Вопросы: +7 (777) 123-45-67`,
          phone: data.phone
        });
        break;

      case 'news_notification':
        await sendWhatsAppNotification('broadcast', {
          message: `📢 *Новости Expensive Finance*\n\n${data.title}\n\n${data.content}\n\n🌐 Подробнее: ${process.env.NEXTAUTH_URL}/news/${data.id}`,
          phones: data.subscribers || []
        });
        break;

      default:
        return NextResponse.json({ error: 'Unknown notification type' }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: 'WhatsApp notification sent' });
  } catch (error) {
    console.error('WhatsApp API error:', error);
    return NextResponse.json({ error: 'Failed to send WhatsApp notification' }, { status: 500 });
  }
}

// Функция отправки WhatsApp уведомления
async function sendWhatsAppNotification(type: 'admin' | 'client' | 'broadcast', data: {
  message: string;
  phone?: string;
  phones?: string[];
}) {
  try {
    // Здесь должна быть интеграция с WhatsApp Business API
    // Для демонстрации используем консольный вывод
    
    if (type === 'broadcast' && data.phones) {
      console.log('📱 WhatsApp Broadcast:', {
        message: data.message,
        recipients: data.phones.length
      });
      
      // В реальном проекте здесь будет отправка через WhatsApp Business API
      for (const phone of data.phones) {
        console.log(`📤 Sending to ${phone}: ${data.message.substring(0, 50)}...`);
      }
    } else if (data.phone) {
      console.log('📱 WhatsApp Notification:', {
        type,
        phone: data.phone,
        message: data.message.substring(0, 100) + '...'
      });
      
      // В реальном проекте здесь будет отправка через WhatsApp Business API
      console.log(`📤 Sending to ${data.phone}: ${data.message.substring(0, 50)}...`);
    }

    // Пример интеграции с внешним сервисом WhatsApp
    // await axios.post('https://api.whatsapp.com/send', {
    //   phone: data.phone,
    //   message: data.message
    // });

  } catch (error) {
    console.error('WhatsApp notification error:', error);
    throw error;
  }
}

// GET метод для проверки статуса WhatsApp интеграции
export async function GET() {
  return NextResponse.json({
    status: 'active',
    platform: 'WhatsApp',
    features: [
      'application_notifications',
      'payment_reminders',
      'news_broadcast',
      'client_support'
    ],
    endpoints: {
      admin: process.env.WHATSAPP_ADMIN_PHONE,
      client: process.env.WHATSAPP_CLIENT_PHONE
    }
  });
}
