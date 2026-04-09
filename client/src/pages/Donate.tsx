import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, CreditCard, Banknote, Gift } from "lucide-react";
import { useState } from "react";

export default function Donate() {
  const { user, loading, error, isAuthenticated, logout } = useAuth();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  const donationAmounts = [
    { value: 50, label: "R$ 50" },
    { value: 100, label: "R$ 100" },
    { value: 200, label: "R$ 200" },
    { value: 500, label: "R$ 500" },
  ];

  const impactExamples = [
    {
      amount: "R$ 50",
      impact: "Fornece materiais escolares para 1 aluno por mês",
      icon: "📚",
    },
    {
      amount: "R$ 100",
      impact: "Cobre 1 sessão de fonoaudiologia especializada",
      icon: "🎤",
    },
    {
      amount: "R$ 200",
      impact: "Financia 1 mês de terapia ocupacional para 1 criança",
      icon: "🎨",
    },
    {
      amount: "R$ 500",
      impact: "Cobre custos de transporte para 10 alunos por mês",
      icon: "🚌",
    },
  ];

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
            <a href="/partnerships" className="text-gray-700 hover:text-green-600 font-medium transition">Parcerias</a>
            <a href="/#contato" className="text-gray-700 hover:text-green-600 font-medium transition">Contato</a>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full bg-gradient-to-r from-orange-500 to-orange-600 py-16 md:py-24 px-4">
          <div className="container mx-auto text-center text-white">
            <div className="flex justify-center mb-6">
              <Gift className="w-16 h-16" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Fazer uma Doação</h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Sua contribuição faz uma diferença real na vida de crianças e adolescentes com deficiência. Juntos, transformamos vidas através da inclusão e educação especializada.
            </p>
          </div>
        </section>

        {/* Valores de Doação */}
        <section className="py-16 md:py-24 px-4 bg-gray-50">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
              Escolha um Valor para Doar
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-8">
              {donationAmounts.map((amount) => (
                <button
                  key={amount.value}
                  onClick={() => setSelectedAmount(amount.value)}
                  className={`p-6 rounded-lg font-bold text-lg transition transform hover:scale-105 ${
                    selectedAmount === amount.value
                      ? "bg-orange-500 text-white shadow-lg"
                      : "bg-white text-orange-600 border-2 border-orange-500 hover:bg-orange-50"
                  }`}
                >
                  {amount.label}
                </button>
              ))}
            </div>
            <div className="text-center">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-12 py-6 text-lg font-semibold">
                <CreditCard className="w-5 h-5 mr-2" />
                Doar Agora
              </Button>
            </div>
          </div>
        </section>

        {/* Impacto da Doação */}
        <section className="py-16 md:py-24 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
              Veja o Impacto da Sua Doação
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {impactExamples.map((example, index) => (
                <Card key={index} className="p-8 border-l-4 border-orange-500">
                  <div className="text-4xl mb-4">{example.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{example.amount}</h3>
                  <p className="text-gray-600 text-lg">{example.impact}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Formas de Doação */}
        <section className="py-16 md:py-24 px-4 bg-gray-50">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
              Formas de Doação
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card className="p-8 text-center">
                <CreditCard className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-4">Cartão de Crédito</h3>
                <p className="text-gray-600 mb-6">
                  Doação segura e rápida via cartão de crédito ou débito.
                </p>
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                  Doar com Cartão
                </Button>
              </Card>

              <Card className="p-8 text-center">
                <Banknote className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-4">Transferência Bancária</h3>
                <p className="text-gray-600 mb-6">
                  Banco: Itaú | Agência: 1234 | Conta: 567890-X
                </p>
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                  Ver Dados Bancários
                </Button>
              </Card>

              <Card className="p-8 text-center">
                <Gift className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-4">PIX</h3>
                <p className="text-gray-600 mb-6">
                  Doação instantânea via PIX. Chave: apae@itajai.org.br
                </p>
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                  Copiar Chave PIX
                </Button>
              </Card>
            </div>
          </div>
        </section>

        {/* Depoimentos */}
        <section className="py-16 md:py-24 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
              Histórias de Impacto
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="p-8 bg-orange-50 border-orange-200">
                <p className="text-gray-700 mb-4 italic">
                  "A doação que recebi permitiu que meu filho tivesse acesso a fonoaudiologia. Hoje ele consegue se comunicar melhor e está mais feliz na escola."
                </p>
                <p className="font-bold text-gray-800">- Mãe de aluno</p>
              </Card>

              <Card className="p-8 bg-orange-50 border-orange-200">
                <p className="text-gray-700 mb-4 italic">
                  "Graças aos doadores, conseguimos oferecer atividades de lazer e inclusão social que transformam a vida dessas crianças."
                </p>
                <p className="font-bold text-gray-800">- Coordenador da APAE</p>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-16 md:py-24 px-4 bg-gradient-to-r from-orange-500 to-orange-600">
          <div className="container mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Faça sua Doação Hoje
            </h2>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Cada doação, por menor que seja, faz diferença. Juntos, podemos oferecer oportunidades de inclusão e desenvolvimento para todas as crianças.
            </p>
            <Button className="bg-white text-orange-600 hover:bg-gray-100 px-12 py-6 text-lg font-semibold">
              Doar Agora
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">APAE Itajaí</h3>
              <p className="text-gray-400 text-sm">
                Associação de Pais e Amigos dos Excepcionais - Transformando vidas através da inclusão.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Contato</h3>
              <p className="text-gray-400 text-sm">Telefone: (47) 3245-1234</p>
              <p className="text-gray-400 text-sm">Email: contato@apaeitajai.org.br</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">CNPJ</h3>
              <p className="text-gray-400 text-sm">CNPJ: 12.345.678/0001-90</p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2026 APAE Itajaí. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
