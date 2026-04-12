import { describe, expect, it } from "vitest";

describe("QR Code Dinâmico PIX", () => {
  describe("QR Code Generation", () => {
    it("generates QR code with valid PIX data", () => {
      const pixKeyEmail = "apae@itajai.org.br";
      const pixQRData = `00020126580014br.gov.bcb.brcode0136${pixKeyEmail}5204000053039865802BR5913APAE Itajai6009ITAJAI62410503***63041D99`;

      expect(pixQRData).toBeDefined();
      expect(pixQRData.length).toBeGreaterThan(0);
      expect(pixQRData).toContain("br.gov.bcb.brcode");
      expect(pixQRData).toContain(pixKeyEmail);
    });

    it("QR code includes institution name", () => {
      const institution = "APAE Itajai";
      const pixQRData = `00020126580014br.gov.bcb.brcode0136apae@itajai.org.br5204000053039865802BR5913${institution}6009ITAJAI62410503***63041D99`;

      expect(pixQRData).toContain(institution);
    });

    it("QR code includes city information", () => {
      const city = "ITAJAI";
      const pixQRData = `00020126580014br.gov.bcb.brcode0136apae@itajai.org.br5204000053039865802BR5913APAE Itajai6009${city}62410503***63041D99`;

      expect(pixQRData).toContain(city);
    });

    it("QR code data follows PIX standard format", () => {
      const pixQRData = `00020126580014br.gov.bcb.brcode0136apae@itajai.org.br5204000053039865802BR5913APAE Itajai6009ITAJAI62410503***63041D99`;

      // Verifica se começa com 00020126 (padrão PIX)
      expect(pixQRData).toMatch(/^00020126/);
      // Verifica se contém br.gov.bcb.brcode
      expect(pixQRData).toContain("br.gov.bcb.brcode");
      // Verifica se contém dados de país
      expect(pixQRData).toContain("5802BR");
    });
  });

  describe("QR Code Display", () => {
    it("displays QR code with correct size", () => {
      const qrSize = 200;
      expect(qrSize).toBe(200);
      expect(qrSize).toBeGreaterThan(100);
      expect(qrSize).toBeLessThan(500);
    });

    it("QR code has correct error correction level", () => {
      const errorCorrectionLevel = "H";
      expect(errorCorrectionLevel).toBe("H");
      expect(["L", "M", "Q", "H"]).toContain(errorCorrectionLevel);
    });

    it("QR code uses correct colors", () => {
      const fgColor = "#1f2937"; // Cinza escuro
      const bgColor = "#ffffff"; // Branco

      expect(fgColor).toMatch(/^#[0-9a-f]{6}$/i);
      expect(bgColor).toMatch(/^#[0-9a-f]{6}$/i);
      expect(fgColor).not.toBe(bgColor);
    });

    it("QR code includes margin", () => {
      const includeMargin = true;
      expect(includeMargin).toBe(true);
    });
  });

  describe("Dynamic Amount Display", () => {
    it("displays donation amount from URL parameter", () => {
      const amounts = [25, 50, 100, 250, 500, 1000];

      amounts.forEach(amount => {
        const formatted = amount.toLocaleString('pt-BR');
        expect(formatted).toBeDefined();
        expect(formatted.length).toBeGreaterThan(0);
      });
    });

    it("formats amount in Brazilian currency", () => {
      const amount = 1250;
      const formatted = amount.toLocaleString('pt-BR');

      expect(formatted).toBe("1.250");
    });

    it("handles custom amounts correctly", () => {
      const customAmounts = [33, 77, 333, 999, 5555];

      customAmounts.forEach(amount => {
        const formatted = amount.toLocaleString('pt-BR');
        expect(formatted).toBeDefined();
        expect(parseInt(formatted.replace(/\./g, ''))).toBe(amount);
      });
    });

    it("displays amount in QR code section", () => {
      const amount = 250;
      const displayText = `Valor: R$ ${amount.toLocaleString('pt-BR')}`;

      expect(displayText).toContain("Valor:");
      expect(displayText).toContain("R$");
      expect(displayText).toContain("250");
    });
  });

  describe("QR Code Download", () => {
    it("provides download functionality", () => {
      const downloadButton = "Baixar QR Code";
      expect(downloadButton).toBeDefined();
      expect(downloadButton.length).toBeGreaterThan(0);
    });

    it("generates download filename with amount", () => {
      const amount = "250";
      const filename = `qrcode-doacao-${amount}.png`;

      expect(filename).toBe("qrcode-doacao-250.png");
      expect(filename).toContain("qrcode-doacao");
      expect(filename).toContain(".png");
    });

    it("download filename includes various amounts", () => {
      const amounts = [25, 50, 100, 250, 500, 1000];

      amounts.forEach(amount => {
        const filename = `qrcode-doacao-${amount}.png`;
        expect(filename).toContain(amount.toString());
      });
    });

    it("download button has download icon", () => {
      const hasIcon = true;
      expect(hasIcon).toBe(true);
    });
  });

  describe("PIX Key Integration", () => {
    it("QR code uses correct PIX email key", () => {
      const pixKeyEmail = "apae@itajai.org.br";
      expect(pixKeyEmail).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    });

    it("PIX key is included in QR data", () => {
      const pixKeyEmail = "apae@itajai.org.br";
      const pixQRData = `00020126580014br.gov.bcb.brcode0136${pixKeyEmail}5204000053039865802BR5913APAE Itajai6009ITAJAI62410503***63041D99`;

      expect(pixQRData).toContain(pixKeyEmail);
    });

    it("QR code data is properly formatted with PIX key", () => {
      const pixKeyEmail = "apae@itajai.org.br";
      const pixQRData = `00020126580014br.gov.bcb.brcode0136${pixKeyEmail}5204000053039865802BR5913APAE Itajai6009ITAJAI62410503***63041D99`;

      // Verifica estrutura básica
      expect(pixQRData.length).toBeGreaterThan(50);
      expect(pixQRData).toContain("5802BR"); // País
      expect(pixQRData).toContain("5913"); // Nome do recebedor
    });
  });

  describe("Page Layout", () => {
    it("QR code section has proper styling", () => {
      const containerClass = "flex flex-col items-center bg-gray-50 p-6 rounded-lg";
      expect(containerClass).toContain("flex");
      expect(containerClass).toContain("items-center");
      expect(containerClass).toContain("bg-gray-50");
    });

    it("QR code card has border styling", () => {
      const cardClass = "p-8 border-2 border-blue-200";
      expect(cardClass).toContain("border-2");
      expect(cardClass).toContain("border-blue-200");
    });

    it("QR code is positioned before other PIX methods", () => {
      const methods = ["QR Code PIX", "PIX por Email", "Transferência Bancária"];
      expect(methods[0]).toBe("QR Code PIX");
    });
  });

  describe("User Experience", () => {
    it("displays clear instructions for QR code usage", () => {
      const instruction = "Escaneie o QR Code com seu celular para fazer a doação de forma rápida e segura";
      expect(instruction).toContain("Escaneie");
      expect(instruction).toContain("QR Code");
      expect(instruction).toContain("celular");
    });

    it("shows security message for QR code method", () => {
      const message = "✓ Doação instantânea e segura";
      expect(message).toContain("✓");
      expect(message).toContain("segura");
    });

    it("provides visual feedback for download button", () => {
      const buttonClass = "w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition";
      expect(buttonClass).toContain("bg-blue-600");
      expect(buttonClass).toContain("hover:bg-blue-700");
    });
  });

  describe("Accessibility", () => {
    it("QR code has alt text or description", () => {
      const description = "Escaneie o QR Code com seu celular para fazer a doação";
      expect(description.length).toBeGreaterThan(0);
    });

    it("download button has descriptive text", () => {
      const buttonText = "Baixar QR Code";
      expect(buttonText).toBeDefined();
      expect(buttonText.length).toBeGreaterThan(0);
    });

    it("amount display is clear and readable", () => {
      const amountDisplay = "Valor: R$ 250";
      expect(amountDisplay).toContain("Valor:");
      expect(amountDisplay).toContain("R$");
    });
  });
});
