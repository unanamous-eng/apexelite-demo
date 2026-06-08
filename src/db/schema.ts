import { pgTable, serial, varchar, text, timestamp, integer } from "drizzle-orm/pg-core";

export const trialSignups = pgTable("trial_signups", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  trialDays: varchar("trial_days", { length: 10 }).default("7"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const planInterests = pgTable("plan_interests", {
  id: serial("id").primaryKey(),
  plan: varchar("plan", { length: 50 }).notNull(),
  count: integer("count").default(0).notNull(),
});
