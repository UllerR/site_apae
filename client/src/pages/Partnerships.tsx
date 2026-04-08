import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Users, Briefcase, HandshakeIcon, Target, Star } from "lucide-react";

export default function Partnerships() {
  const { user, loading, error, isAuthenticated, logout } = useAuth();

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
            <a href="/" className="text-gray-700 hover:text-green-600 font-medium transition">Início</a>
            <a href="/#sobre" className="text-gray-700 hover:text-green-600 font-medium transition">Sobre</a>
            <a href="/#servicos" className="text-gray-700 hover:text-green-600 font-medium transition">Serviços</a>
            <a href="/events" className="text-gray-700 hover:text-green-600 font-medium transition">Eventos</a>
            <a href="/partnerships" className="text-green-600 font-bold transition">Parcerias</a>
            <a href="/#contato" className="text-gray-700 hover:text-green-600 font-medium transition">Contato</a>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section - Faça Parte Dessa Missão */}
        <section className="w-full bg-gradient-to-r from-green-600 to-green-700 py-16 md:py-24 px-4">
          <div className="container mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Faça Parte Dessa Missão</h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Você pode contribuir para transformar vidas. Seja através de doações, voluntariado ou parcerias, sua ajuda faz a diferença.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold">
                Fazer Doação
              </Button>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg font-semibold">
                Ser Voluntário
              </Button>
            </div>
          </div>
        </section>

        {/* Formas de Contribuir */}
        <section className="py-16 md:py-24 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
              Formas de Contribuir
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Doações */}
              <Card className="p-8 hover:shadow-lg transition">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <Heart className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Doações</h3>
                <p className="text-gray-600 mb-6">
                  Contribua financeiramente para ajudar a manter nossos programas e serviços. Cada valor faz diferença na vida de nossas crianças.
                </p>
                <ul className="text-sm text-gray-600 space-y-2 mb-6">
                  <li>✓ Doação única ou recorrente</li>
                  <li>✓ PIX, transferência bancária</li>
                  <li>✓ Dedutível no imposto de renda</li>
                </ul>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                  Contribuir
                </Button>
              </Card>

              {/* Voluntariado */}
              <Card className="p-8 hover:shadow-lg transition">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Voluntariado</h3>
                <p className="text-gray-600 mb-6">
                  Dedique seu tempo e talento para ajudar. Procuramos voluntários para diversas atividades e áreas.
                </p>
                <ul className="text-sm text-gray-600 space-y-2 mb-6">
                  <li>✓ Atividades educacionais</li>
                  <li>✓ Eventos e oficinas</li>
                  <li>✓ Suporte administrativo</li>
                </ul>
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                  Voluntariar-se
                </Button>
              </Card>

              {/* Parcerias Corporativas */}
              <Card className="p-8 hover:shadow-lg transition">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <Briefcase className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Parcerias Corporativas</h3>
                <p className="text-gray-600 mb-6">
                  Sua empresa pode ser parceira da APAE. Oferecemos programas de responsabilidade social customizados.
                </p>
                <ul className="text-sm text-gray-600 space-y-2 mb-6">
                  <li>✓ Patrocínios de eventos</li>
                  <li>✓ Programas de RSE</li>
                  <li>✓ Doações em espécie</li>
                </ul>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Conversar
                </Button>
              </Card>
            </div>
          </div>
        </section>

        {/* Por Que Ser Parceiro */}
        <section className="py-16 md:py-24 px-4 bg-gray-50">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
              Por Que Ser Parceiro da APAE?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-600 text-white">
                    <Target className="h-6 w-6" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Impacto Direto</h3>
                  <p className="text-gray-600">
                    Sua contribuição impacta diretamente na vida de crianças e adolescentes com deficiência intelectual.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-600 text-white">
                    <HandshakeIcon className="h-6 w-6" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Transparência</h3>
                  <p className="text-gray-600">
                    Somos uma instituição registrada e transparente. Você saberá exatamente como seu apoio é utilizado.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-600 text-white">
                    <Star className="h-6 w-6" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Reconhecimento</h3>
                  <p className="text-gray-600">
                    Parceiros corporativos recebem reconhecimento público e relatórios de impacto personalizados.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-600 text-white">
                    <Heart className="h-6 w-6" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Responsabilidade Social</h3>
                  <p className="text-gray-600">
                    Contribua para uma sociedade mais inclusiva e igualitária. Faça a diferença que o mundo precisa.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Histórias de Impacto */}
        <section className="py-16 md:py-24 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
              Histórias de Impacto
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8 bg-green-50 border-green-200">
                <p className="text-gray-700 mb-4 italic">
                  "Graças ao apoio de nossos parceiros, conseguimos expandir nosso programa de fonoaudiologia. Hoje, 50 crianças recebem atendimento especializado que antes não era possível."
                </p>
                <p className="font-bold text-gray-800">- Diretora da APAE Itajaí</p>
              </Card>

              <Card className="p-8 bg-orange-50 border-orange-200">
                <p className="text-gray-700 mb-4 italic">
                  "Ser voluntário na APAE mudou minha perspectiva de vida. Ver o progresso de cada criança é gratificante e nos motiva a continuar contribuindo."
                </p>
                <p className="font-bold text-gray-800">- Voluntário há 2 anos</p>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-16 md:py-24 px-4 bg-green-600 text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para Fazer a Diferença?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Entre em contato conosco para conhecer as melhores formas de contribuir para a APAE de Itajaí.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold">
                Entrar em Contato
              </Button>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg font-semibold">
                Conhecer Mais
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-12 px-4">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-bold mb-4">APAE Itajaí</h3>
                <p className="text-gray-400">
                  Transformando vidas através da inclusão e educação especializada.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">Contato</h3>
                <p className="text-gray-400">📞 (47) 3348-1234</p>
                <p className="text-gray-400">📧 contato@apaeitajai.org.br</p>
                <p className="text-gray-400">📍 Itajaí, SC</p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-4">CNPJ</h3>
                <p className="text-gray-400">CNPJ: 00.000.000/0000-00</p>
                <p className="text-gray-400 text-sm mt-4">
                  Doações são dedutíveis no imposto de renda
                </p>
              </div>
            </div>
            <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
              <p>&copy; 2024 APAE Itajaí. Todos os direitos reservados.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
