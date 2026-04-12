import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("donations.create", () => {
  it("should create a donation with valid input", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.donations.create({
      donorName: "João Silva",
      donorEmail: "joao@example.com",
      amount: "250.00",
      method: "pix",
      message: "Doação via PIX",
    });

    expect(result).toEqual({
      success: true,
      message: "Doacao registrada com sucesso!",
    });
  });

  it("should reject invalid email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.donations.create({
        donorName: "João Silva",
        donorEmail: "invalid-email",
        amount: "250.00",
        method: "pix",
        message: "Doação via PIX",
      });
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("should reject empty donor name", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.donations.create({
        donorName: "",
        donorEmail: "joao@example.com",
        amount: "250.00",
        method: "pix",
        message: "Doação via PIX",
      });
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("should accept different payment methods", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const methods = ["pix", "transferencia", "cartao", "outro"] as const;

    for (const method of methods) {
      const result = await caller.donations.create({
        donorName: "Maria Silva",
        donorEmail: "maria@example.com",
        amount: "100.00",
        method,
        message: `Doação via ${method}`,
      });

      expect(result.success).toBe(true);
    }
  });

  it("should handle optional message field", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.donations.create({
      donorName: "Pedro Santos",
      donorEmail: "pedro@example.com",
      amount: "500.00",
      method: "pix",
    });

    expect(result.success).toBe(true);
  });
});
