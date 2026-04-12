import { describe, expect, it } from "vitest";
import { createUserWithPassword, getUserByEmail, verifyPassword } from "./db";

describe("Email/Password Authentication", () => {
  it("should create a user with hashed password", async () => {
    const email = `test-${Date.now()}@example.com`;
    const password = "TestPassword123!";
    const name = "Test User";

    await createUserWithPassword(email, password, name, "user");

    const user = await getUserByEmail(email);
    expect(user).toBeDefined();
    expect(user?.email).toBe(email);
    expect(user?.name).toBe(name);
    expect(user?.role).toBe("user");
    expect(user?.passwordHash).toBeDefined();
    expect(user?.passwordHash).not.toBe(password);
  });

  it("should verify correct password", async () => {
    const email = `test-verify-${Date.now()}@example.com`;
    const password = "CorrectPassword123!";

    await createUserWithPassword(email, password, "Test User", "user");

    const user = await getUserByEmail(email);
    expect(user?.passwordHash).toBeDefined();

    const isValid = await verifyPassword(password, user!.passwordHash!);
    expect(isValid).toBe(true);
  });

  it("should reject incorrect password", async () => {
    const email = `test-reject-${Date.now()}@example.com`;
    const password = "CorrectPassword123!";

    await createUserWithPassword(email, password, "Test User", "user");

    const user = await getUserByEmail(email);
    expect(user?.passwordHash).toBeDefined();

    const isValid = await verifyPassword("WrongPassword", user!.passwordHash!);
    expect(isValid).toBe(false);
  });

  it("should create admin user with correct role", async () => {
    const email = `admin-${Date.now()}@example.com`;
    const password = "AdminPassword123!";

    await createUserWithPassword(email, password, "Admin User", "admin");

    const user = await getUserByEmail(email);
    expect(user?.role).toBe("admin");
  });

  it("should retrieve user by email", async () => {
    const email = `retrieve-${Date.now()}@example.com`;
    const password = "TestPassword123!";
    const name = "Retrieve Test";

    await createUserWithPassword(email, password, name, "user");

    const user = await getUserByEmail(email);
    expect(user).toBeDefined();
    expect(user?.email).toBe(email);
    expect(user?.name).toBe(name);
  });

  it("should return undefined for non-existent email", async () => {
    const user = await getUserByEmail(`nonexistent-${Date.now()}@example.com`);
    expect(user).toBeUndefined();
  });
});
