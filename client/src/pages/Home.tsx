import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Users, BookOpen, Stethoscope, Smile, MapPin, Phone, Mail } from "lucide-react";

/**
 * APAE de Itajaí - Site Oficial
 * Design: Humanista Acessível
 * Cores: Verde esperança e Laranja acolhimento
 * Tipografia: Poppins (títulos) e Inter (corpo)
 */

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">APAE Itajaí</h1>
              <p className="text-xs text-gray-600">Associação de Pais e Amigos dos Excepcionais</p>
            </div>
          </div>
          <nav className="hidden md:flex gap-8">
            <a href="#sobre" className="text-gray-700 hover:text-green-600 font-medium transition">Sobre</a>
            <a href="#servicos" className="text-gray-700 hover:text-green-600 font-medium transition">Serviços</a>
            <a href="#impacto" className="text-gray-700 hover:text-green-600 font-medium transition">Impacto</a>
            <a href="/events" className="text-gray-700 hover:text-green-600 font-medium transition">Eventos</a>
            <a href="/donation" className="text-gray-700 hover:text-green-600 font-medium transition">Doação</a>
            <a href="#contato" className="text-gray-700 hover:text-green-600 font-medium transition">Contato</a>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full h-96 md:h-[500px] overflow-hidden">
          <img 
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663171028636/5ESsVh8VNWCAbEwWJoC3UX/apae-hero-banner-izqELpwXfjdKNcVa4Akugv.webp"
            alt="APAE Itajaí - Crianças em atividades educacionais"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent flex items-center">
            <div className="container mx-auto px-4 pt-20 md:pt-0">
              <h2 className="text-2xl md:text-6xl font-bold text-white mb-4 max-w-2xl">
                Transformando Vidas Através da Inclusão
              </h2>
              <p className="text-xs md:text-xl text-white/90 mb-8 max-w-xl">
                Há mais de 50 anos, a APAE de Itajaí trabalha com dedicação e amor para oferecer educação especializada e atendimento integral.
              </p>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg">
                Saiba Mais
              </Button>
            </div>
          </div>
        </section>

        {/* Sobre Section */}
        <section id="sobre" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                  Quem Somos
                </h2>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  A APAE de Itajaí é uma instituição filantrópica que há mais de 50 anos dedica-se ao atendimento integral de pessoas com deficiência intelectual e múltiplas.
                </p>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                  Oferecemos serviços nas áreas de educação especializada, fonoaudiologia, psicologia, assistência social, lazer e saúde, atendendo pessoas de zero a sessenta anos de idade.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Nossa equipe multidisciplinar é composta por educadores, terapeutas e profissionais comprometidos com a qualidade do atendimento e o desenvolvimento integral de cada pessoa.
                </p>
              </div>
              <div className="bg-green-50 p-8 rounded-lg border-2 border-green-200">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-green-700 mb-2">Nossa Missão</h3>
                    <p className="text-gray-700">Promover e articular ações de defesa dos direitos e prestação de serviços de qualidade à pessoa com deficiência, garantindo inclusão social e desenvolvimento integral.</p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-green-700 mb-2">Nossa Visão</h3>
                    <p className="text-gray-700">Ser uma instituição de excelência, referência em educação especializada e atendimento humanizado, contribuindo para uma sociedade mais inclusiva e acolhedora.</p>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-green-700 mb-2">Nossos Valores</h3>
                    <p className="text-gray-700">Educação permanente, trabalho em equipe, compromisso com a qualidade, respeito à dignidade, inclusão social e amor ao próximo.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Estatísticas */}
        <section className="py-16 md:py-24 bg-green-600 text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Nosso Impacto</h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold mb-2">50+</div>
                <p className="text-xl">Anos de História</p>
              </div>
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold mb-2">500+</div>
                <p className="text-xl">Alunos Atendidos</p>
              </div>
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold mb-2">44+</div>
                <p className="text-xl">Educadores</p>
              </div>
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold mb-2">7</div>
                <p className="text-xl">Áreas de Atendimento</p>
              </div>
            </div>
          </div>
        </section>

        {/* Serviços Section */}
        <section id="servicos" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-16">Nossos Serviços</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Educação */}
              <Card className="p-8 hover:shadow-lg transition border-2 border-green-100">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Educação Especializada</h3>
                <p className="text-gray-700 leading-relaxed">
                  Centro de Atendimento Educacional Especializado (CAESP) Waldyr Benvenutti, oferecendo educação adaptada e inclusiva com métodos pedagógicos inovadores.
                </p>
              </Card>

              {/* Fonoaudiologia */}
              <Card className="p-8 hover:shadow-lg transition border-2 border-orange-100">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Smile className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Fonoaudiologia</h3>
                <p className="text-gray-700 leading-relaxed">
                  Atendimento especializado em desenvolvimento da fala, linguagem e comunicação, com profissionais qualificados e recursos terapêuticos modernos.
                </p>
              </Card>

              {/* Psicologia */}
              <Card className="p-8 hover:shadow-lg transition border-2 border-green-100">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Psicologia</h3>
                <p className="text-gray-700 leading-relaxed">
                  Suporte psicológico para alunos e famílias, promovendo bem-estar emocional e desenvolvimento de habilidades sociais.
                </p>
              </Card>

              {/* Assistência Social */}
              <Card className="p-8 hover:shadow-lg transition border-2 border-orange-100">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Assistência Social</h3>
                <p className="text-gray-700 leading-relaxed">
                  Orientação e apoio às famílias, facilitando acesso a benefícios, direitos e programas de inclusão social.
                </p>
              </Card>

              {/* Saúde */}
              <Card className="p-8 hover:shadow-lg transition border-2 border-green-100">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Stethoscope className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Saúde</h3>
                <p className="text-gray-700 leading-relaxed">
                  Acompanhamento de saúde integral, com parcerias com profissionais médicos e de enfermagem para atendimento especializado.
                </p>
              </Card>

              {/* Lazer e Recreação */}
              <Card className="p-8 hover:shadow-lg transition border-2 border-orange-100">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Smile className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Lazer e Recreação</h3>
                <p className="text-gray-700 leading-relaxed">
                  Atividades recreativas, eventos comunitários e programas de lazer que promovem inclusão social e qualidade de vida.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Impacto Visual */}
        <section id="impacto" className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-16">Histórias de Impacto</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <img 
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663171028636/5ESsVh8VNWCAbEwWJoC3UX/apae-services-education-CSyX9DT4PfLZYxcjsmA9L4.webp"
                  alt="Educação especializada"
                  className="w-full h-80 object-cover rounded-lg"
                />
                <h3 className="text-2xl font-bold text-gray-800">Educação que Transforma</h3>
                <p className="text-gray-700 leading-relaxed">
                  Cada dia, nossos educadores trabalham com dedicação para oferecer uma educação adaptada, respeitando o ritmo e as necessidades de cada aluno. Utilizamos metodologias inovadoras que promovem aprendizado significativo e desenvolvimento integral.
                </p>
              </div>
              <div className="space-y-4">
                <img 
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663171028636/5ESsVh8VNWCAbEwWJoC3UX/apae-community-impact-THUZBpzY9CL4gU8LQEgBfp.webp"
                  alt="Impacto comunitário"
                  className="w-full h-80 object-cover rounded-lg"
                />
                <h3 className="text-2xl font-bold text-gray-800">Comunidade Inclusiva</h3>
                <p className="text-gray-700 leading-relaxed">
                  Acreditamos que a inclusão vai além das salas de aula. Por isso, promovemos eventos comunitários, atividades de lazer e programas que integram nossos alunos à sociedade, celebrando a diversidade e criando oportunidades de participação social.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-green-600 to-green-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Faça Parte Dessa Missão</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Você pode contribuir para transformar vidas. Seja através de doações, voluntariado ou parcerias, sua ajuda faz a diferença.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-6 text-lg font-bold">
                Fazer Doação
              </Button>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg font-bold">
                Ser Voluntário
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contato" className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Informações */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-orange-500">APAE Itajaí</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Associação de Pais e Amigos dos Excepcionais - Centro de Atendimento Educacional Especializado Waldyr Benvenutti
              </p>
              <p className="text-gray-400 text-sm">
                Há mais de 50 anos transformando vidas através da inclusão e educação especializada.
              </p>
            </div>

            {/* Contato */}
            <div>
              <h3 className="text-xl font-bold mb-6">Contato</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Endereço</p>
                    <p className="text-gray-400">Av. Joca Brandão, 537 - Centro<br />Itajaí - SC, 88301-441</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-orange-500" />
                  <div>
                    <p className="font-semibold">(47) 3348-8813</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-orange-500" />
                  <div>
                    <p className="font-semibold">apae.itj@terra.com.br</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Doações */}
            <div>
              <h3 className="text-xl font-bold mb-6">Como Ajudar</h3>
              <p className="text-gray-300 mb-4">
                Suas doações são fundamentais para manter nossos programas e serviços.
              </p>
              <div className="bg-gray-800 p-4 rounded-lg mb-4">
                <p className="text-sm text-gray-400 mb-2">CNPJ para doações:</p>
                <p className="text-lg font-bold text-orange-500">84.306.869/0001-59</p>
              </div>
              <p className="text-sm text-gray-400">
                Você também pode fazer doações via PIX ou entrar em contato para conhecer outras formas de contribuir.
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © 2026 APAE de Itajaí. Todos os direitos reservados.
              </p>
              <div className="flex gap-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-orange-500 transition">Facebook</a>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition">Instagram</a>
                <a href="#" className="text-gray-400 hover:text-orange-500 transition">YouTube</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
