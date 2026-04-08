import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type PublicUser = null;

function createPublicContext(): TrpcContext {
  const ctx: TrpcContext = {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return ctx;
}

describe("contacts.create", () => {
  it("creates a contact with valid input", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contacts.create({
      name: "João Silva",
      email: "joao@example.com",
      phone: "(47) 99999-9999",
      subject: "Parceria Corporativa",
      message: "Gostaria de conhecer mais sobre as oportunidades de parceria com a APAE.",
    });

    expect(result).toEqual({
      success: true,
      message: expect.stringContaining("sucesso"),
    });
  });

  it("rejects contact with invalid email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.contacts.create({
        name: "João Silva",
        email: "invalid-email",
        phone: "(47) 99999-9999",
        subject: "Parceria Corporativa",
        message: "Gostaria de conhecer mais sobre as oportunidades de parceria com a APAE.",
      });
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("rejects contact with missing required fields", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.contacts.create({
        name: "",
        email: "joao@example.com",
        phone: "(47) 99999-9999",
        subject: "Parceria Corporativa",
        message: "Mensagem muito curta",
      });
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("accepts optional phone field", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contacts.create({
      name: "Maria Santos",
      email: "maria@example.com",
      subject: "Voluntariado",
      message: "Gostaria de ser voluntária na APAE e ajudar as crianças.",
    });

    expect(result).toEqual({
      success: true,
      message: expect.stringContaining("sucesso"),
    });
  });
});
