import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Copy, Check, QrCode, Download } from "lucide-react";
import { useState, useRef } from "react";
import { useLocation } from "wouter";
import { QRCodeSVG } from "qrcode.react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function PixDonation() {
  const { user, loading, error, isAuthenticated, logout } = useAuth();
  const [, setLocation] = useLocation();
  const [copied, setCopied] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createDonation = trpc.donations.create.useMutation({
    onSuccess: () => {
      toast.success("Doação registrada com sucesso! Email de confirmação enviado.");
      setShowConfirmation(true);
      setDonorName("");
      setDonorEmail("");
      setTimeout(() => setShowConfirmation(false), 5000);
    },
    onError: (error) => {
      toast.error("Erro ao registrar doação. Tente novamente.");
      console.error(error);
    },
  });

  const handleConfirmDonation = async () => {
    if (!donorName || !donorEmail) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    setIsSubmitting(true);
    try {
      await createDonation.mutateAsync({
        donorName,
        donorEmail,
        amount,
        method: "pix",
        message: "Doação via PIX",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Extrair valor da URL
  const params = new URLSearchParams(window.location.search);
  const amount = params.get("amount") || "0";

  const pixData = {
    cnpj: "12.345.678/0001-90",
    pixKey: "12.345.678/0001-90",
    pixKeyEmail: "apae@itajai.org.br",
    institution: "APAE Itajaí",
    bankData: {
      bank: "Itaú",
      agency: "1234",
      account: "567890-X",
    },
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixData.pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(pixData.pixKeyEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const qrRef = useRef<HTMLDivElement>(null);

  // Gerar dados PIX dinâmicos com CNPJ (simplificado)
  const pixQRData = `00020126580014br.gov.bcb.brcode0136${pixData.pixKey}5204000053039865802BR5913APAE Itajai6009ITAJAI62410503***63041D99`;

  const handleDownloadQR = () => {
    const canvas = qrRef.current?.querySelector('canvas') as HTMLCanvasElement;
    if (canvas) {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `qrcode-doacao-${amount}.png`;
      link.click();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">APAE Itajaí</h1>
              <p className="text-xs text-gray-600">Doação via PIX</p>
            </div>
          </div>
          <a href="/donate">
            <Button className="bg-gray-600 hover:bg-gray-700 text-white">
              Voltar
            </Button>
          </a>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-16 px-4 bg-gradient-to-r from-green-600 to-green-700">
          <div className="container mx-auto text-center text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Confirme Sua Doação
            </h1>
            <p className="text-lg md:text-xl mb-4">
              Valor: <span className="font-bold text-2xl">R$ {parseInt(amount).toLocaleString('pt-BR')}</span>
            </p>
            <p className="text-base md:text-lg opacity-90">
              Escaneie o QR Code ou use as chaves PIX abaixo para completar sua doação
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 md:py-24 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Formulário de Confirmação */}
              <div>
                <Card className="p-8 border-2 border-green-200">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Seus Dados</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nome Completo
                      </label>
                      <input
                        type="text"
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        placeholder="Seu nome"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={donorEmail}
                        onChange={(e) => setDonorEmail(e.target.value)}
                        placeholder="seu@email.com"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-700">
                        <span className="font-bold">Valor da doação:</span> R$ {parseInt(amount).toLocaleString('pt-BR')}
                      </p>
                      <p className="text-sm text-gray-700 mt-2">
                        <span className="font-bold">Método:</span> PIX
                      </p>
                    </div>
                    <Button
                      onClick={handleConfirmDonation}
                      disabled={isSubmitting || !donorName || !donorEmail}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold"
                    >
                      {isSubmitting ? "Processando..." : "Confirmar Doação"}
                    </Button>
                    <p className="text-xs text-gray-600 text-center">
                      Você receberá um email de confirmação após a doação
                    </p>
                  </div>
                </Card>
              </div>

              {/* QR Code e Chaves PIX */}
              <div className="space-y-6">
                {/* QR Code */}
                <Card className="p-8 border-2 border-blue-200">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <QrCode className="w-6 h-6" />
                    QR Code PIX
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Escaneie o QR Code com seu celular para fazer a doação de forma rápida e segura:
                  </p>
                  <div className="flex flex-col items-center bg-gray-50 p-6 rounded-lg mb-4">
                    <div ref={qrRef} className="bg-white p-4 rounded-lg">
                      <QRCodeSVG
                        value={pixQRData}
                        size={200}
                        level="H"
                        includeMargin={true}
                        fgColor="#1f2937"
                        bgColor="#ffffff"
                      />
                    </div>
                    <p className="text-sm text-gray-600 mt-4 text-center">
                      Valor: R$ {parseInt(amount).toLocaleString('pt-BR')}
                    </p>
                  </div>
                  <Button
                    onClick={handleDownloadQR}
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Baixar QR Code
                  </Button>
                  <p className="text-sm text-gray-600 mt-4">
                    ✓ Doação instantânea e segura
                  </p>
                </Card>

                {/* Chaves PIX */}
                <Card className="p-8 border-2 border-orange-200">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Chaves PIX</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">CNPJ</p>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={pixData.pixKey}
                          readOnly
                          className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded text-sm"
                        />
                        <Button
                          size="sm"
                          onClick={handleCopyPix}
                          className="bg-orange-500 hover:bg-orange-600"
                        >
                          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Email</p>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={pixData.pixKeyEmail}
                          readOnly
                          className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded text-sm"
                        />
                        <Button
                          size="sm"
                          onClick={handleCopyEmail}
                          className="bg-orange-500 hover:bg-orange-600"
                        >
                          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Instruções */}
            <div className="mt-16">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
                Como Fazer a Doação
              </h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-600 text-white font-bold">
                      1
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Abra seu Banco</h3>
                    <p className="text-gray-600">
                      Abra o aplicativo do seu banco ou acesse o site de sua instituição financeira.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-600 text-white font-bold">
                      2
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Selecione PIX</h3>
                    <p className="text-gray-600">
                      Escolha a opção "PIX" ou "Transferência PIX" no menu de transações.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-600 text-white font-bold">
                      3
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Escaneie ou Cole a Chave</h3>
                    <p className="text-gray-600">
                      Escaneie o QR Code ou cole uma das chaves PIX acima no campo de destinatário.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-600 text-white font-bold">
                      4
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Digite o Valor</h3>
                    <p className="text-gray-600">
                      Digite o valor R$ {parseInt(amount).toLocaleString('pt-BR')} e confirme a transação.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-600 text-white font-bold">
                      5
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Confirme Aqui</h3>
                    <p className="text-gray-600">
                      Volte para esta página e preencha seus dados para confirmar a doação e receber o email de confirmação.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-16 md:py-24 px-4 bg-gradient-to-r from-green-600 to-green-700">
          <div className="container mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Obrigado por Sua Generosidade!
            </h2>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Sua doação faz uma diferença real na vida de crianças e adolescentes com deficiência.
            </p>
            <a href="/donate">
              <Button className="bg-white text-green-600 hover:bg-gray-100 px-12 py-6 text-lg font-semibold">
                Voltar para Doações
              </Button>
            </a>
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
              <p className="text-gray-400 text-sm">CNPJ: {pixData.cnpj}</p>
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
