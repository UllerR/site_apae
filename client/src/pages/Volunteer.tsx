import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Users, Clock, Award } from "lucide-react";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function Volunteer() {
  const { user, loading, error, isAuthenticated, logout } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    availability: "",
    interests: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationData, setConfirmationData] = useState<{name: string; email: string; availability: string} | null>(null);
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
        subject: `Voluntariado - ${formData.availability}`,
        message: `Interesses: ${formData.interests}\n\nMensagem: ${formData.message}`,
      });

      setConfirmationData({
        name: formData.name,
        email: formData.email,
        availability: formData.availability,
      });
      setShowConfirmation(true);

      setFormData({
        name: "",
        email: "",
        phone: "",
        availability: "",
        interests: "",
        message: "",
      });

      setTimeout(() => {
        setShowConfirmation(false);
      }, 5000);
    } catch (error) {
      toast.error("Erro ao enviar inscrição. Tente novamente.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const volunteerRoles = [
    {
      title: "Apoio Administrativo",
      description: "Auxilie nas tarefas administrativas e de organização",
      icon: "📋",
      requirements: "Atenção aos detalhes, organização",
    },
    {
      title: "Suporte Técnico",
      description: "Ajude com questões técnicas e de informática",
      icon: "💻",
      requirements: "Conhecimento técnico básico, paciência",
    },
  ];

  const benefits = [
    {
      icon: "💡",
      title: "Desenvolvimento Pessoal",
      description: "Crescimento pessoal e espiritual através do serviço",
    },
    {
      icon: "🌟",
      title: "Experiência Valiosa",
      description: "Adquira experiência em educação especial",
    },
    {
      icon: "👥",
      title: "Comunidade",
      description: "Faça parte de uma comunidade engajada",
    },
    {
      icon: "❤️",
      title: "Impacto Real",
      description: "Veja o impacto direto de suas ações",
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
        <section className="w-full bg-gradient-to-r from-blue-500 to-blue-600 py-16 md:py-24 px-4">
          <div className="container mx-auto text-center text-white">
            <div className="flex justify-center mb-6">
              <Users className="w-16 h-16" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Seja um Voluntário</h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Junte-se a nós e faça a diferença na vida de crianças e adolescentes com deficiência. Seu tempo e dedicação são valiosos!
            </p>
          </div>
        </section>

        {/* Confirmação */}
        {showConfirmation && confirmationData && (
          <section className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md bg-white">
              <div className="p-8 text-center">
                <div className="mb-6 flex justify-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Inscrição Recebida!
                </h3>
                <p className="text-gray-600 mb-6">
                  Obrigado, <strong>{confirmationData.name}</strong>! Sua inscrição foi recebida com sucesso.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-semibold">Email:</span> {confirmationData.email}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Disponibilidade:</span> {confirmationData.availability}
                  </p>
                </div>
                <p className="text-gray-600 text-sm mb-6">
                  Entraremos em contato em breve para discutir as oportunidades de voluntariado.
                </p>
                <Button
                  onClick={() => setShowConfirmation(false)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 font-semibold"
                >
                  Fechar
                </Button>
              </div>
            </Card>
          </section>
        )}

        {/* Oportunidades de Voluntariado */}
        <section className="py-16 md:py-24 px-4 bg-gray-50">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
              Oportunidades de Voluntariado
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {volunteerRoles.map((role, index) => (
                <Card key={index} className="p-8">
                  <div className="text-4xl mb-4">{role.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{role.title}</h3>
                  <p className="text-gray-600 mb-4">{role.description}</p>
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">Requisitos:</span> {role.requirements}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefícios */}
        <section className="py-16 md:py-24 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
              Benefícios de Ser Voluntário
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="p-8 text-center">
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Formulário de Inscrição */}
        <section className="py-16 md:py-24 px-4 bg-gray-50">
          <div className="container mx-auto max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">
              Inscreva-se como Voluntário
            </h2>
            <p className="text-center text-gray-600 mb-12">
              Preencha o formulário abaixo e nossa equipe entrará em contato para discutir as oportunidades.
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="(47) 99999-9999"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Disponibilidade *
                  </label>
                  <select
                    name="availability"
                    value={formData.availability}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  >
                    <option value="">Selecione sua disponibilidade</option>
                    <option value="Fins de semana">Fins de semana</option>
                    <option value="Dias da semana (manhã)">Dias da semana (manhã)</option>
                    <option value="Dias da semana (tarde)">Dias da semana (tarde)</option>
                    <option value="Flexível">Flexível</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Áreas de Interesse *
                  </label>
                  <select
                    name="interests"
                    value={formData.interests}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  >
                    <option value="">Selecione uma área</option>
                    <option value="Educação">Educação</option>
                    <option value="Terapia">Terapia</option>
                    <option value="Eventos">Eventos</option>
                    <option value="Inclusão Social">Inclusão Social</option>
                    <option value="Outra">Outra</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mensagem (opcional)
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Conte-nos um pouco sobre você e por que deseja ser voluntário"
                    rows={4}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 font-semibold"
                >
                  {isSubmitting ? "Enviando..." : "Inscrever-se"}
                </Button>
              </form>
            </Card>
          </div>
        </section>

        {/* Depoimentos */}
        <section className="py-16 md:py-24 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
              Histórias de Voluntários
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="p-8 bg-blue-50 border-blue-200">
                <p className="text-gray-700 mb-4 italic">
                  "Ser voluntário na APAE mudou minha vida. Ver o progresso de cada criança é gratificante e me motiva a continuar contribuindo."
                </p>
                <p className="font-bold text-gray-800">- João, Voluntário há 2 anos</p>
              </Card>

              <Card className="p-8 bg-blue-50 border-blue-200">
                <p className="text-gray-700 mb-4 italic">
                  "Encontrei propósito em ajudar. A APAE é uma comunidade acolhedora onde posso fazer diferença todos os dias."
                </p>
                <p className="font-bold text-gray-800">- Maria, Voluntária há 1 ano</p>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-16 md:py-24 px-4 bg-gradient-to-r from-blue-500 to-blue-600">
          <div className="container mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Pronto para Fazer a Diferença?
            </h2>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Sua dedicação pode transformar vidas. Inscreva-se agora e seja parte dessa missão!
            </p>
            <Button className="bg-white text-blue-600 hover:bg-gray-100 px-12 py-6 text-lg font-semibold">
              Inscrever-se Agora
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
