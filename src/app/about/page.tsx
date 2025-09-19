import AboutSection from '@/components/AboutSection'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ApplicationFormButton from '@/components/ApplicationFormButton'

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <AboutSection />
      
      {/* Дополнительная информация о компании */}
      <section className="section-padding luxury-gradient">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Наша история
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Expensive Finance была основана в 2018 году группой финансовых экспертов, 
                  которые видели необходимость в персонализированном подходе к кредитованию 
                  в Казахстане.
                </p>
                <p>
                  За годы работы мы помогли более чем 1000 клиентам получить кредиты на 
                  общую сумму свыше 500 миллионов тенге, включая сложные случаи с 
                  неидеальной кредитной историей.
                </p>
                <p>
                  Наша команда состоит из сертифицированных финансовых консультантов 
                  с многолетним опытом работы в ведущих банках Казахстана.
                </p>
              </div>
            </div>
            
            <div className="card-medium glow-medium">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Наши достижения
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-2">1000+</div>
                  <div className="text-gray-600">Довольных клиентов</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-2">95%</div>
                  <div className="text-gray-600">Успешных заявок</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-2">24ч</div>
                  <div className="text-gray-600">Среднее время</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-2">7 лет</div>
                  <div className="text-gray-600">На рынке</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Команда */}
      <section className="section-padding bg-white geometric-bg">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Наша команда
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Профессионалы с многолетним опытом в банковской сфере и финансовом консалтинге
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Алия Нурланова',
                position: 'Директор по развитию',
                experience: '12 лет в банковской сфере'
              },
              {
                name: 'Ержан Касымов',
                position: 'Ведущий финансовый консультант',
                experience: '8 лет в кредитовании'
              },
              {
                name: 'Сауле Абдрахманова',
                position: 'Специалист по работе с клиентами',
                experience: '6 лет в финансовых услугах'
              }
            ].map((member, index) => (
              <div key={index} className="card-subtle glow-subtle text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-primary-500 to-primary-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-primary-600 font-medium mb-2">
                  {member.position}
                </p>
                <p className="text-gray-600 text-sm">
                  {member.experience}
                </p>
              </div>
            ))}
          </div>
          
          {/* Призыв к действию */}
          <div className="text-center mt-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Готовы начать работу с нами?
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Оставьте заявку и получите бесплатную консультацию уже сегодня
            </p>
            <ApplicationFormButton />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
