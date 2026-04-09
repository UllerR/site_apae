import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Users, Briefcase, HandshakeIcon, Target, Star } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { toast } from "sonner";

export default function Partnerships() {
  const { user, loading, error, isAuthenticated, logout } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationData, setConfirmationData] = useState<{name: string; email: string; subject: string} | null>(null);
  const createContactMutation = trpc.contacts.create.useMutation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createContactMutation.mutateAsync({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        subject: formData.subject,
        message: formData.message,
      });

      // Mostrar confirmação
      setConfirmationData({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
      });
      setShowConfirmation(true);

      // Limpar formulário
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      // Fechar confirmação após 5 segundos
      setTimeout(() => {
        setShowConfirmation(false);
      }, 5000);
    } catch (error) {
      toast.error("Erro ao enviar mensagem. Tente novamente.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToForm = (subject: string) => {
    setFormData(prev => ({
      ...prev,
      subject: subject,
    }));
    const formElement = document.getElementById("contact-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
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
              <Button 
                onClick={() => scrollToForm("Doação")}
                className="bg-white text-green-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold"
              >
                Fazer Doação
              </Button>
              <Button 
                onClick={() => scrollToForm("Voluntariado")}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg font-semibold"
              >
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

        {/* Mensagem de Confirmação */}
        {showConfirmation && confirmationData && (
          <section className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md bg-white">
              <div className="p-8 text-center">
                <div className="mb-6 flex justify-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Mensagem Enviada!
                </h3>
                <p className="text-gray-600 mb-6">
                  Obrigado, <strong>{confirmationData.name}</strong>! Recebemos sua mensagem com sucesso.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-semibold">Email:</span> {confirmationData.email}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Tipo de Interesse:</span> {confirmationData.subject}
                  </p>
                </div>
                <p className="text-gray-600 text-sm mb-6">
                  Nossa equipe analisará sua solicitação e entrará em contato em breve.
                </p>
                <Button
                  onClick={() => setShowConfirmation(false)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 font-semibold"
                >
                  Fechar
                </Button>
              </div>
            </Card>
          </section>
        )}

        {/* Formulário de Contato */}
        <section className="py-16 md:py-24 px-4 bg-gray-50" id="contact-form">
          <div className="container mx-auto max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">
              Entre em Contato
            </h2>
            <p className="text-center text-gray-600 mb-12">
              Preencha o formulário abaixo e nossa equipe entrará em contato com você em breve.
            </p>
            <Card className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    placeholder="Seu nome"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                      placeholder="seu@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                      placeholder="(47) 9999-9999"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Interesse *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  >
                    <option value="">Selecione uma opção</option>
                    <option value="Doação">Doação</option>
                    <option value="Voluntariado">Voluntariado</option>
                    <option value="Parceria Corporativa">Parceria Corporativa</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mensagem *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    placeholder="Conte-nos mais sobre seu interesse..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 font-semibold"
                >
                  {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
                </Button>
              </form>
            </Card>
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
