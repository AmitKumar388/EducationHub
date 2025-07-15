import { pgTable, text, serial, integer, decimal, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const resources = pgTable("resources", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // "notes", "pyqs", "books", "company-pyqs", "interview", "study-materials"
  subject: text("subject").notNull(),
  semester: text("semester"),
  fileUrl: text("file_url").notNull(),
  fileSize: text("file_size").notNull(),
  fileType: text("file_type").notNull().default("pdf"),
  downloads: integer("downloads").notNull().default(0),
  rating: decimal("rating", { precision: 2, scale: 1 }).notNull().default("0.0"),
  uploadedAt: timestamp("uploaded_at").notNull().defaultNow(),
});

export const insertResourceSchema = createInsertSchema(resources).omit({
  id: true,
  downloads: true,
  uploadedAt: true,
});

export type InsertResource = z.infer<typeof insertResourceSchema>;
export type Resource = typeof resources.$inferSelect;

export const categories = [
  { value: "notes", label: "Study Notes" },
  { value: "pyqs", label: "Semester PYQs" },
  { value: "books", label: "Reference Books" },
  { value: "company-pyqs", label: "Company PYQs" },
  { value: "interview", label: "Interview Resources" },
  { value: "study-materials", label: "Study Materials" },
] as const;

export const subjects = [
  "Computer Science",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Electronics & Communication",
  "Civil Engineering",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Artificial Intelligence",
  "Data Science",
  "Software Engineering",
  "System Design",
  "Database Management",
  "Operating Systems",
  "Data Structures & Algorithms",
  "Machine Learning",
] as const;

export const semesters = [
  "Semester 1",
  "Semester 2", 
  "Semester 3",
  "Semester 4",
  "Semester 5",
  "Semester 6",
  "Semester 7",
  "Semester 8",
] as const;
