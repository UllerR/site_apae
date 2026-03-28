import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Copy, Check, DollarSign, Smartphone, Building2, Gift } from "lucide-react";
import { useState } from "react";

/**
 * Página de Doação - APAE de Itajaí
 * Design: Humanista Acessível
 * Cores: Verde esperança e Laranja acolhimento
 */

export default function Donation() {
  const [copiedPix, setCopiedPix] = useState(false);
  const [copiedCNPJ, setCopiedCNPJ] = useState(false);

  const handleCopyPix = () => {
    navigator.clipboard.writeText("84.306.869/0001-59");
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2000);
  };

  const handleCopyCNPJ = () => {
    navigator.clipboard.writeText("84.306.869/0001-59");
    setCopiedCNPJ(true);
    setTimeout(() => setCopiedCNPJ(false), 2000);
  };

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
            <a href="/donation" className="text-green-600 font-bold transition">Doação</a>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-green-600 to-green-700 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Sua Doação Transforma Vidas
              </h1>
              <p className="text-xl mb-4 leading-relaxed">
                Há mais de 50 anos, a APAE de Itajaí oferece educação especializada, terapias e atendimento integral a pessoas com deficiência intelectual e múltiplas. Sua contribuição é essencial para manter nossos programas funcionando.
              </p>
              <p className="text-lg text-green-100">
                Cada doação, por menor que seja, faz uma diferença real na vida de nossos alunos e suas famílias.
              </p>
            </div>
          </div>
        </section>

        {/* Impacto da Doação */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-16">
              Veja o Impacto de Sua Doação
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              <Card className="p-8 text-center border-2 border-green-200 hover:shadow-lg transition">
                <div className="text-5xl font-bold text-green-600 mb-4">R$ 50</div>
                <p className="text-gray-700 font-semibold mb-2">Fornece materiais educacionais</p>
                <p className="text-gray-600 text-sm">para uma semana de aulas especializadas</p>
              </Card>

              <Card className="p-8 text-center border-2 border-orange-200 hover:shadow-lg transition">
                <div className="text-5xl font-bold text-orange-500 mb-4">R$ 100</div>
                <p className="text-gray-700 font-semibold mb-2">Sessão de fonoaudiologia</p>
                <p className="text-gray-600 text-sm">para desenvolvimento de fala e linguagem</p>
              </Card>

              <Card className="p-8 text-center border-2 border-green-200 hover:shadow-lg transition">
                <div className="text-5xl font-bold text-green-600 mb-4">R$ 200</div>
                <p className="text-gray-700 font-semibold mb-2">Atendimento psicológico</p>
                <p className="text-gray-600 text-sm">para aluno e acompanhamento familiar</p>
              </Card>

              <Card className="p-8 text-center border-2 border-orange-200 hover:shadow-lg transition">
                <div className="text-5xl font-bold text-orange-500 mb-4">R$ 500</div>
                <p className="text-gray-700 font-semibold mb-2">Mês de atendimento integral</p>
                <p className="text-gray-600 text-sm">educação, terapia e atividades recreativas</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Formas de Doação */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-16">
              Formas de Doação
            </h2>

            <div className="grid md:grid-cols-2 gap-12 mb-12">
              {/* PIX */}
              <Card className="p-10 border-2 border-green-200 hover:shadow-lg transition">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center">
                    <Smartphone className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">PIX</h3>
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  A forma mais rápida e prática. Escaneie o QR code ou use a chave PIX (CNPJ) abaixo. A doação é instantânea!
                </p>
                <div className="bg-gray-100 p-6 rounded-lg mb-6">
                  <p className="text-sm text-gray-600 mb-2">Chave PIX (CNPJ):</p>
                  <div className="flex items-center justify-between bg-white p-4 rounded border border-gray-300">
                    <code className="text-lg font-bold text-gray-800">84.306.869/0001-59</code>
                    <button
                      onClick={handleCopyPix}
                      className="ml-2 p-2 hover:bg-gray-100 rounded transition"
                      title="Copiar"
                    >
                      {copiedPix ? (
                        <Check className="w-5 h-5 text-green-600" />
                      ) : (
                        <Copy className="w-5 h-5 text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 text-center">
                  Disponível 24 horas por dia, 7 dias por semana
                </p>
              </Card>

              {/* Transferência Bancária */}
              <Card className="p-10 border-2 border-orange-200 hover:shadow-lg transition">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Building2 className="w-8 h-8 text-orange-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Transferência Bancária</h3>
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Realize uma transferência direta para a conta da APAE. Entre em contato para receber os dados bancários.
                </p>
                <div className="bg-gray-100 p-6 rounded-lg mb-6">
                  <p className="text-sm text-gray-600 mb-2">CNPJ:</p>
                  <div className="flex items-center justify-between bg-white p-4 rounded border border-gray-300">
                    <code className="text-lg font-bold text-gray-800">84.306.869/0001-59</code>
                    <button
                      onClick={handleCopyCNPJ}
                      className="ml-2 p-2 hover:bg-gray-100 rounded transition"
                      title="Copiar"
                    >
                      {copiedCNPJ ? (
                        <Check className="w-5 h-5 text-green-600" />
                      ) : (
                        <Copy className="w-5 h-5 text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3">
                  Solicitar Dados Bancários
                </Button>
              </Card>
            </div>

            {/* Doação Recorrente */}
            <Card className="p-10 border-2 border-green-200 bg-green-50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center">
                  <Gift className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Doação Recorrente</h3>
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Contribua mensalmente e tenha um impacto duradouro. Você pode cancelar a qualquer momento.
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Doadores recorrentes recebem relatórios mensais sobre o impacto de suas contribuições e são reconhecidos como apoiadores da APAE.
              </p>
              <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                Configurar Doação Recorrente
              </Button>
            </Card>
          </div>
        </section>

        {/* Perguntas Frequentes */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-16">
              Perguntas Frequentes
            </h2>

            <div className="max-w-3xl mx-auto space-y-6">
              <Card className="p-8 border-2 border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Minha doação é dedutível de impostos?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Sim! A APAE de Itajaí é uma instituição sem fins lucrativos registrada. Você pode solicitar o comprovante de doação para fins de deduções fiscais. Entre em contato conosco para mais informações.
                </p>
              </Card>

              <Card className="p-8 border-2 border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Como sei que minha doação está sendo usada corretamente?</h3>
                <p className="text-gray-700 leading-relaxed">
                  A APAE é transparente em suas operações. Publicamos relatórios anuais detalhando como os recursos são utilizados. Você pode solicitar informações específicas sobre o uso de sua doação.
                </p>
              </Card>

              <Card className="p-8 border-2 border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Posso fazer uma doação em nome de alguém?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Sim! Você pode fazer uma doação em homenagem a um familiar, amigo ou colega. Entre em contato conosco para que possamos registrar adequadamente sua intenção.
                </p>
              </Card>

              <Card className="p-8 border-2 border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Qual é o valor mínimo de doação?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Não há valor mínimo. Qualquer contribuição, por menor que seja, faz diferença. Acreditamos que cada real doado é um ato de amor e solidariedade.
                </p>
              </Card>

              <Card className="p-8 border-2 border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Posso fazer uma doação de bens ou serviços?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Sim! Aceitamos doações de materiais educacionais, equipamentos, alimentos e serviços profissionais. Entre em contato para discutir como sua empresa ou você pode contribuir.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Testemunhos */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-16">
              Histórias de Doadores
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8 border-2 border-green-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">Maria Silva</p>
                    <p className="text-sm text-gray-600">Doadora Recorrente</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed italic">
                  "Faço uma doação mensal porque acredito na missão da APAE. Ver o progresso das crianças nos relatórios que recebo é muito gratificante. Sinto que estou fazendo parte de algo importante."
                </p>
              </Card>

              <Card className="p-8 border-2 border-orange-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">João Santos</p>
                    <p className="text-sm text-gray-600">Doador Corporativo</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed italic">
                  "Minha empresa doa para a APAE porque queremos contribuir para a inclusão social. É uma honra apoiar uma instituição tão importante para nossa comunidade."
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-green-600 to-green-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Pronto para Fazer a Diferença?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Sua doação, por menor que seja, transforma vidas. Juntos, podemos oferecer educação especializada e atendimento integral a quem mais precisa.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-6 text-lg font-bold">
                Doar Agora via PIX
              </Button>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg font-bold">
                Entrar em Contato
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-orange-500">APAE Itajaí</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Transformando vidas através da inclusão e educação especializada há mais de 50 anos.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6">Contato</h3>
              <div className="space-y-2 text-gray-400">
                <p>Av. Joca Brandão, 537 - Centro</p>
                <p>Itajaí - SC, 88301-441</p>
                <p>(47) 3348-8813</p>
                <p>apae.itj@terra.com.br</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6">Links Rápidos</h3>
              <div className="space-y-2">
                <a href="/" className="text-gray-400 hover:text-orange-500 transition block">Início</a>
                <a href="/#sobre" className="text-gray-400 hover:text-orange-500 transition block">Sobre</a>
                <a href="/#servicos" className="text-gray-400 hover:text-orange-500 transition block">Serviços</a>
                <a href="/donation" className="text-gray-400 hover:text-orange-500 transition block">Doação</a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-400 text-center text-sm">
              © 2026 APAE de Itajaí. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
