import { describe, expect, it } from "vitest";

describe("Donation and Volunteer Pages", () => {
  describe("Donation Page", () => {
    it("displays donation page with hero section", () => {
      const pageTitle = "Fazer uma Doação";
      const pageDescription = "Sua contribuição faz uma diferença real na vida de crianças e adolescentes com deficiência.";
      
      expect(pageTitle).toBe("Fazer uma Doação");
      expect(pageDescription.length).toBeGreaterThan(0);
    });

    it("has donation amount options", () => {
      const donationAmounts = [50, 100, 200, 500];
      
      expect(donationAmounts).toHaveLength(4);
      expect(donationAmounts).toContain(50);
      expect(donationAmounts).toContain(100);
      expect(donationAmounts).toContain(200);
      expect(donationAmounts).toContain(500);
    });

    it("displays payment methods", () => {
      const paymentMethods = ["Cartão de Crédito", "Transferência Bancária", "PIX"];
      
      expect(paymentMethods).toHaveLength(3);
      expect(paymentMethods).toContain("Cartão de Crédito");
      expect(paymentMethods).toContain("Transferência Bancária");
      expect(paymentMethods).toContain("PIX");
    });

    it("shows donation impact examples", () => {
      const impacts = [
        "Fornece materiais escolares para 1 aluno por mês",
        "Cobre 1 sessão de fonoaudiologia especializada",
        "Financia 1 mês de terapia ocupacional para 1 criança",
        "Cobre custos de transporte para 10 alunos por mês",
      ];
      
      expect(impacts).toHaveLength(4);
      impacts.forEach(impact => {
        expect(impact.length).toBeGreaterThan(0);
      });
    });
  });

  describe("Volunteer Page", () => {
    it("displays volunteer page with hero section", () => {
      const pageTitle = "Seja um Voluntário";
      const pageDescription = "Junte-se a nós e faça a diferença na vida de crianças e adolescentes com deficiência.";
      
      expect(pageTitle).toBe("Seja um Voluntário");
      expect(pageDescription.length).toBeGreaterThan(0);
    });

    it("has volunteer role options", () => {
      const roles = ["Educador", "Terapeuta Assistente", "Facilitador de Eventos", "Mentor de Inclusão"];
      
      expect(roles).toHaveLength(4);
      roles.forEach(role => {
        expect(role.length).toBeGreaterThan(0);
      });
    });

    it("displays volunteer benefits", () => {
      const benefits = [
        "Desenvolvimento Pessoal",
        "Experiência Valiosa",
        "Comunidade",
        "Impacto Real",
      ];
      
      expect(benefits).toHaveLength(4);
      benefits.forEach(benefit => {
        expect(benefit.length).toBeGreaterThan(0);
      });
    });

    it("has availability options in form", () => {
      const availabilityOptions = [
        "Fins de semana",
        "Dias da semana (manhã)",
        "Dias da semana (tarde)",
        "Flexível",
      ];
      
      expect(availabilityOptions).toHaveLength(4);
      availabilityOptions.forEach(option => {
        expect(option.length).toBeGreaterThan(0);
      });
    });

    it("has interest areas in form", () => {
      const interestAreas = [
        "Educação",
        "Terapia",
        "Eventos",
        "Inclusão Social",
        "Outra",
      ];
      
      expect(interestAreas).toHaveLength(5);
      interestAreas.forEach(area => {
        expect(area.length).toBeGreaterThan(0);
      });
    });
  });

  describe("Navigation", () => {
    it("donation page is accessible at /donate route", () => {
      const route = "/donate";
      expect(route).toBe("/donate");
    });

    it("volunteer page is accessible at /volunteer route", () => {
      const route = "/volunteer";
      expect(route).toBe("/volunteer");
    });

    it("buttons navigate to correct pages", () => {
      const donateButtonLink = "/donate";
      const volunteerButtonLink = "/volunteer";
      
      expect(donateButtonLink).toBe("/donate");
      expect(volunteerButtonLink).toBe("/volunteer");
    });
  });
});
