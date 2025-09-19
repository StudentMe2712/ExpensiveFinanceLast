import { Target, Award, Heart } from 'lucide-react'
import ApplicationFormButton from './ApplicationFormButton'

const AboutSection = () => {
  const advantages = [
    {
      icon: Target,
      title: 'Индивидуальный подход',
      description: 'Каждый клиент получает персональное решение, учитывающее его уникальную ситуацию и потребности.'
    },
    {
      icon: Award,
      title: 'Опытные специалисты',
      description: 'Наша команда имеет многолетний опыт работы с банками и знает все тонкости кредитного процесса.'
    },
    {
      icon: Heart,
      title: 'Высокая вероятность одобрения',
      description: 'Благодаря правильной подготовке документов и выбору подходящих банков, мы добиваемся одобрения в 95% случаев.'
    }
  ]

  return (
    <section id="about" className="section-padding bg-white geometric-bg floating-elements">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            О компании
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expensive Finance — это команда профессионалов, которая помогает людям решать 
            финансовые вопросы и получать кредиты даже в сложных ситуациях.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => (
            <div key={index} className="card-dramatic glow-medium text-center group">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-700 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <advantage.icon size={32} className="text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {advantage.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {advantage.description}
              </p>
            </div>
          ))}
        </div>

        {/* Дополнительная информация */}
        <div className="mt-16 bg-gradient-to-r from-primary-50 to-primary-100 geometric-bg rounded-2xl p-8 lg:p-12 luxury-border">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Почему выбирают нас?
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Работаем с ведущими банками России</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Конфиденциальность и безопасность данных</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Бесплатные консультации и анализ ситуации</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Прозрачные условия без скрытых комиссий</span>
                </li>
              </ul>
            </div>
            <div className="text-center lg:text-right">
              <div className="inline-block bg-white rounded-xl p-6 shadow-lg">
                <div className="text-4xl font-bold text-primary-600 mb-2">5+</div>
                <div className="text-gray-600">лет успешной работы</div>
              </div>
            </div>
          </div>
          
          {/* Призыв к действию */}
          <div className="text-center mt-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Готовы доверить нам свои финансовые вопросы?
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Оставьте заявку и получите профессиональную помощь уже сегодня
            </p>
            <ApplicationFormButton />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
