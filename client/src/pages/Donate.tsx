import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, CreditCard, Banknote, Gift } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

export default function Donate() {
  const { user, loading, error, isAuthenticated, logout } = useAuth();
  const [, setLocation] = useLocation();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);

  const handleDonate = () => {
    const amount = selectedAmount || (customAmount ? parseInt(customAmount) : null);
    if (amount) {
      setLocation(`/pix-donation?amount=${amount}`);
    }
  };

  const donationAmounts = [
    { value: 25, label: "R$ 25", description: "Pequeno gesto" },
    { value: 50, label: "R$ 50", description: "Muito obrigado" },
    { value: 100, label: "R$ 100", description: "Generoso" },
    { value: 250, label: "R$ 250", description: "Herói" },
    { value: 500, label: "R$ 500", description: "Transformador" },
    { value: 1000, label: "R$ 1.000", description: "Extraordinário" },
  ];

  const finalAmount = selectedAmount || (customAmount ? parseInt(customAmount) : null);

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
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">
              Escolha um Valor para Doar
            </h2>
            <p className="text-center text-gray-600 mb-12 text-lg">
              Selecione um valor predefinido ou digite um valor customizado
            </p>
            
            {/* Valores Predefinidos */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 max-w-5xl mx-auto mb-8">
              {donationAmounts.map((amount) => (
                <button
                  key={amount.value}
                  onClick={() => {
                    setSelectedAmount(amount.value);
                    setCustomAmount("");
                  }}
                  className={`p-4 rounded-lg font-bold text-sm md:text-base transition transform hover:scale-105 flex flex-col items-center gap-1 ${
                    selectedAmount === amount.value
                      ? "bg-orange-500 text-white shadow-lg border-2 border-orange-600"
                      : "bg-white text-orange-600 border-2 border-orange-300 hover:bg-orange-50 hover:border-orange-500"
                  }`}
                >
                  <span>{amount.label}</span>
                  <span className={`text-xs ${selectedAmount === amount.value ? "text-orange-100" : "text-orange-400"}`}>
                    {amount.description}
                  </span>
                </button>
              ))}
            </div>

            {/* Valor Customizado */}
            <div className="max-w-md mx-auto mb-8 bg-white p-6 rounded-lg border-2 border-gray-200">
              <label className="block text-gray-800 font-bold mb-3">Ou digite um valor customizado:</label>
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <span className="absolute left-3 top-3 text-gray-600 font-bold">R$</span>
                  <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(null);
                    }}
                    placeholder="0,00"
                    className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                  />
                </div>
              </div>
            </div>

            {/* Resumo da Doação */}
            {finalAmount && (
              <div className="max-w-md mx-auto mb-8 bg-green-50 p-6 rounded-lg border-2 border-green-200">
                <p className="text-gray-700 mb-2">Valor da doação:</p>
                <p className="text-3xl font-bold text-green-600 mb-4">R$ {finalAmount.toLocaleString('pt-BR')}</p>
                <p className="text-sm text-gray-600">✓ Doação segura e 100% dedicada à APAE</p>
              </div>
            )}

            {/* Botão Doar */}
            <div className="text-center">
              <Button 
                disabled={!finalAmount}
                onClick={handleDonate}
                className={`px-12 py-6 text-lg font-semibold transition ${
                  finalAmount
                    ? "bg-orange-500 hover:bg-orange-600 text-white cursor-pointer"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <CreditCard className="w-5 h-5 mr-2" />
                {finalAmount ? `Doar R$ ${finalAmount.toLocaleString('pt-BR')}` : "Selecione um valor"}
              </Button>
            </div>
          </div>
        </section>

        {/* Formas de Doação */}
        <section className="py-16 md:py-24 px-4 bg-gray-50">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
              Formas de Doação
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <Card className={`p-8 text-center cursor-pointer transition transform hover:scale-105 ${
                paymentMethod === 'transfer' ? 'border-2 border-orange-500 bg-orange-50' : 'border border-gray-200'
              }`}
              onClick={() => setPaymentMethod('transfer')}>
                <Banknote className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-4">Transferência Bancária</h3>
                <p className="text-gray-600 mb-6">
                  Banco: Itaú | Agência: 1234 | Conta: 567890-X
                </p>
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                  Ver Dados Bancários
                </Button>
              </Card>

              <Card className={`p-8 text-center cursor-pointer transition transform hover:scale-105 ${
                paymentMethod === 'pix' ? 'border-2 border-orange-500 bg-orange-50' : 'border border-gray-200'
              }`}
              onClick={() => setPaymentMethod('pix')}>
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
