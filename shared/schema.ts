import { z } from "zod";

// Resource interface for MongoDB
export interface Resource {
  id?: string;
  title: string;
  description: string;
  category: string;
  subject: string;
  semester?: string | null;
  fileUrl: string;
  fileSize: string;
  fileType: string;
  downloads: number;
  rating: string;
  uploadedAt: Date;
}

// Zod schema for resource validation
export const insertResourceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  subject: z.string().min(1, "Subject is required"),
  semester: z.string().optional(),
  fileUrl: z.string().min(1, "File URL is required"),
  fileSize: z.string().min(1, "File size is required"),
  fileType: z.string().default("pdf"),
  downloads: z.number().default(0),
  rating: z.string().default("0.0"),
});

export type InsertResource = z.infer<typeof insertResourceSchema>;

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
