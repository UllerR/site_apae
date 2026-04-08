import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, events, donations, contacts, eventRegistrations, InsertEvent, InsertDonation, InsertContact, InsertEventRegistration } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Events queries
export async function getAllEvents() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(events).orderBy(events.date);
}

export async function createEvent(event: InsertEvent) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(events).values(event);
}

// Donations queries
export async function createDonation(donation: InsertDonation) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(donations).values(donation);
}

export async function getAllDonations() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(donations).orderBy(donations.createdAt);
}

// Event registrations queries
export async function createEventRegistration(registration: InsertEventRegistration) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(eventRegistrations).values(registration);
}

export async function getEventRegistrations(eventId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(eventRegistrations).where(eq(eventRegistrations.eventId, eventId));
}

// Contacts queries
export async function createContact(contact: InsertContact) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(contacts).values(contact);
}

export async function getAllContacts() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(contacts).orderBy(contacts.createdAt);
}
