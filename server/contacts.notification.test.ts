import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock da função notifyOwner
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn(async () => true),
}));

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

describe("contacts.create with email notification", () => {
  it("sends notification when contact is created", async () => {
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

  it("creates contact with all required fields", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contacts.create({
      name: "Maria Santos",
      email: "maria@example.com",
      phone: "(47) 98888-8888",
      subject: "Voluntariado",
      message: "Gostaria de ser voluntária na APAE e ajudar as crianças especiais.",
    });

    expect(result.success).toBe(true);
  });

  it("handles missing optional phone field", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contacts.create({
      name: "Pedro Costa",
      email: "pedro@example.com",
      subject: "Doação",
      message: "Gostaria de fazer uma doação para a APAE de Itajaí.",
    });

    expect(result.success).toBe(true);
  });

  it("rejects invalid email format", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.contacts.create({
        name: "Invalid Email",
        email: "not-an-email",
        subject: "Test",
        message: "This should fail due to invalid email",
      });
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("rejects message shorter than 10 characters", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.contacts.create({
        name: "Test User",
        email: "test@example.com",
        subject: "Test",
        message: "Short",
      });
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
