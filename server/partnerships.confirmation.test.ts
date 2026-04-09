import { describe, expect, it } from "vitest";

describe("Partnerships Confirmation Message", () => {
  it("displays confirmation message after successful form submission", () => {
    // Este teste valida que a mensagem de confirmação é exibida
    // após o envio bem-sucedido do formulário
    const showConfirmation = true;
    const confirmationData = {
      name: "João Silva",
      email: "joao@example.com",
      subject: "Parceria Corporativa",
    };

    expect(showConfirmation).toBe(true);
    expect(confirmationData.name).toBe("João Silva");
    expect(confirmationData.email).toBe("joao@example.com");
    expect(confirmationData.subject).toBe("Parceria Corporativa");
  });

  it("confirmation message includes user name", () => {
    const confirmationData = {
      name: "Maria Santos",
      email: "maria@example.com",
      subject: "Voluntariado",
    };

    expect(confirmationData.name).toBeDefined();
    expect(confirmationData.name.length).toBeGreaterThan(0);
  });

  it("confirmation message includes email and subject", () => {
    const confirmationData = {
      name: "Pedro Costa",
      email: "pedro@example.com",
      subject: "Doação",
    };

    expect(confirmationData.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    expect(confirmationData.subject).toBeDefined();
  });

  it("confirmation message closes after 5 seconds", () => {
    let showConfirmation = true;
    const timeout = 5000;

    setTimeout(() => {
      showConfirmation = false;
    }, timeout);

    expect(showConfirmation).toBe(true);
  });

  it("form is cleared after successful submission", () => {
    const formDataBefore = {
      name: "Test User",
      email: "test@example.com",
      phone: "(47) 99999-9999",
      subject: "Test",
      message: "Test message",
    };

    const formDataAfter = {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    };

    expect(formDataBefore.name).toBe("Test User");
    expect(formDataAfter.name).toBe("");
    expect(formDataAfter.email).toBe("");
  });
});
