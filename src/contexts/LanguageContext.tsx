'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

export type Language = 'ru' | 'kk'

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Функция для получения перевода по ключу
const getTranslation = (translations: any, key: string): string => {
  const keys = key.split('.')
  let value = translations
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k]
    } else {
      return key // Возвращаем ключ, если перевод не найден
    }
  }
  
  return typeof value === 'string' ? value : key
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('ru')
  const [translations, setTranslations] = useState<any>(getBasicTranslations())
  const [isLoading, setIsLoading] = useState(false)

  // Загружаем переводы
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        setIsLoading(true)
        
        // Проверяем, есть ли переводы в кэше
        const cacheKey = `translations_${language}`
        const cachedTranslations = sessionStorage.getItem(cacheKey)
        
        if (cachedTranslations) {
          setTranslations(JSON.parse(cachedTranslations))
          setIsLoading(false)
          return
        }
        
        // Загружаем переводы с сервера
        const response = await fetch(`/locales/${language}.json?t=${Date.now()}`, {
          cache: 'no-store'
        })
        
        if (!response.ok) {
          throw new Error('Failed to load translations')
        }
        
        const data = await response.json()
        setTranslations(data)
        
        // Сохраняем в кэш
        sessionStorage.setItem(cacheKey, JSON.stringify(data))
        
      } catch (error) {
        console.error('Ошибка загрузки переводов:', error)
        
        // Fallback на русский
        if (language !== 'ru') {
          try {
            const response = await fetch(`/locales/ru.json?t=${Date.now()}`, {
              cache: 'no-store'
            })
            const data = await response.json()
            setTranslations(data)
            sessionStorage.setItem(`translations_ru`, JSON.stringify(data))
          } catch (fallbackError) {
            console.error('Ошибка загрузки fallback переводов:', fallbackError)
            // Используем базовые переводы как последний fallback
            setTranslations(getBasicTranslations())
          }
        } else {
          setTranslations(getBasicTranslations())
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadTranslations()
  }, [language])

  // Загружаем сохраненный язык из localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && (savedLanguage === 'ru' || savedLanguage === 'kk')) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Сохраняем язык в localStorage и обновляем cookie
  useEffect(() => {
    localStorage.setItem('language', language)
    
    // Обновляем cookie
    document.cookie = `language=${language}; max-age=${60 * 60 * 24 * 365}; path=/; samesite=lax`
  }, [language])

  const t = (key: string): string => {
    return getTranslation(translations, key)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

// Базовые переводы как fallback
function getBasicTranslations() {
  return {
    common: {
      loading: "Загрузка...",
      error: "Ошибка",
      success: "Успешно",
      submitApplication: "Оставить заявку"
    },
    navigation: {
      home: "Главная",
      about: "О компании", 
      services: "Услуги",
      contacts: "Контакты"
    },
    hero: {
      title: "Помогаем получить <span class=\"text-gradient\">кредит</span>, даже если банки отказывают",
      subtitle: "Expensive Finance — надёжный партнёр в решении финансовых вопросов.",
      learnMore: "Узнать больше",
      stats: {
        successfulApplications: "Успешных заявок",
        averageTime: "Средний срок рассмотрения", 
        satisfiedClients: "Довольных клиентов"
      }
    },
    servicesSlider: {
      title: "Популярные",
      titleHighlight: "услуги",
      subtitle: "Выберите подходящий продукт для решения ваших финансовых задач",
      learnMore: "Подробнее",
      previousSlide: "Предыдущий слайд",
      nextSlide: "Следующий слайд",
      goToSlide: "Перейти к слайду",
      services: {
        expressCredit: {
          title: "Экспресс кредит",
          subtitle: "Быстрое одобрение за 24 часа",
          description: "Получите кредит в кратчайшие сроки с минимальным пакетом документов",
          features: {
            noIncomeDocuments: "Без справок о доходах",
            onlineApplication: "Онлайн заявка", 
            fastDecision: "Быстрое решение"
          }
        },
        rahmetDeposit: {
          title: "Рахмет депозит",
          subtitle: "Арзан қызыққа алдандай, көбірек ақша жинаңыз",
          description: "Выгодные условия размещения депозита с высокой процентной ставкой",
          features: {
            highPercentage: "Высокий процент",
            flexibleConditions: "Гибкие условия",
            reliableProtection: "Надежная защита"
          }
        },
        businessCredit: {
          title: "Кредит для бизнеса",
          subtitle: "Развивайте свое дело с нами",
          description: "Специальные условия кредитования для предпринимателей и малого бизнеса",
          features: {
            gracePeriod: "Льготный период",
            noCollateral: "Без залога",
            individualApproach: "Индивидуальный подход"
          }
        },
        mortgageCredit: {
          title: "Ипотечный кредит",
          subtitle: "Купите жилье мечты сегодня",
          description: "Выгодные условия ипотечного кредитования на приобретение недвижимости",
          features: {
            lowRate: "Низкая ставка",
            longTerm: "Долгосрочный период",
            governmentSupport: "Гос. поддержка"
          }
        },
        autoCredit: {
          title: "Автокредит",
          subtitle: "Новый автомобиль уже завтра",
          description: "Специальные условия кредитования на покупку автомобиля",
          features: {
            noDownPayment: "Без первоначального взноса",
            fastProcessing: "Быстрое оформление",
            freeInsurance: "Страховка в подарок"
          }
        }
      }
    },
    creditCalculator: {
      title: "Кредитный",
      titleHighlight: "калькулятор",
      subtitle: "Рассчитайте и получите решение по кредиту",
      loanAmount: {
        title: "Сумма кредита"
      },
      loanTerm: {
        title: "Срок",
        years: "года",
        minTerm: "7 месяцев",
        maxTerm: "5 лет"
      },
      paymentMethod: {
        title: "Метод ежемесячного погашения",
        equalPayments: "Равными платежами",
        decreasingPayments: "С уменьшением",
        differenceQuestion: "В чем разница методов погашения?"
      },
      monthlyPayment: "Ежемесячный платеж",
      totalOverpayment: "Общая переплата",
      interestRate: "Процентная ставка",
      insurance: {
        withInsurance: "Со страховкой",
        withoutInsurance: "Без страховки"
      },
      submitApplication: "Оставить заявку",
      amountOptions: {
        "500k": "500 тыс ₸",
        "1m": "1 млн ₸",
        "1_5m": "1,5 млн ₸",
        "2m": "2 млн ₸",
        "3m": "3 млн ₸",
        "8m": "8 млн ₸"
      },
      termOptions: {
        "1year": "1 год",
        "2years": "2 года",
        "3years": "3 года",
        "4years": "4 года",
        "5years": "5 лет"
      }
    },
    applicationForm: {
      title: "Оставить заявку",
      subtitle: "Заполните форму, и мы свяжемся с вами в течение 24 часов",
      fields: {
        fullName: {
          label: "Полное имя",
          placeholder: "Иванов Иван Иванович"
        },
        phone: {
          label: "Телефон",
          placeholder: "+7 (777) 123-45-67"
        },
        email: {
          label: "Email",
          placeholder: "example@mail.com"
        },
        loanAmount: {
          label: "Желаемая сумма кредита (₸)",
          placeholder: "Например, 1 000 000"
        },
        comment: {
          label: "Комментарий",
          placeholder: "Опишите ваши потребности или задайте вопрос..."
        }
      },
      submitButton: "Отправить заявку",
      submitting: "Отправка...",
      successMessage: "Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.",
      errorMessage: "Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз."
    },
    footer: {
      description: "Надёжный партнёр в решении финансовых вопросов. Помогаем получить кредит, даже если банки отказывают.",
      contacts: {
        title: "Контакты",
        address: "Алматы, пр. Аль-Фараби, 123"
      },
      navigation: {
        title: "Навигация"
      },
      botButton: {
        text: "💬 Задать вопрос боту",
        description: "Получите быстрый ответ на ваши вопросы"
      },
      copyright: "Все права защищены."
    }
  }
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}