import { resources, type Resource, type InsertResource } from "@shared/schema";

export interface IStorage {
  getResources(filters?: {
    category?: string;
    subject?: string;
    semester?: string;
    search?: string;
    sortBy?: string;
  }): Promise<Resource[]>;
  getResource(id: number): Promise<Resource | undefined>;
  createResource(resource: InsertResource): Promise<Resource>;
  incrementDownloads(id: number): Promise<void>;
  getFeaturedResources(): Promise<Resource[]>;
  getResourceStats(): Promise<{
    notes: number;
    pyqs: number;
    books: number;
    interviews: number;
  }>;
}

export class MemStorage implements IStorage {
  private resources: Map<number, Resource>;
  private currentId: number;

  constructor() {
    this.resources = new Map();
    this.currentId = 1;
    this.seedData();
  }

  private seedData() {
    const sampleResources: Omit<Resource, 'id'>[] = [
      {
        title: "Data Structures & Algorithms",
        description: "Comprehensive notes covering all DSA topics with examples and practice problems.",
        category: "notes",
        subject: "Computer Science",
        semester: "Semester 3",
        fileUrl: "/api/download/1",
        fileSize: "2.3 MB",
        fileType: "pdf",
        downloads: 2100,
        rating: "4.8",
        uploadedAt: new Date("2024-01-15"),
      },
      {
        title: "Google SDE Interview Questions",
        description: "Real interview questions asked at Google for SDE positions with detailed solutions.",
        category: "company-pyqs",
        subject: "Software Engineering",
        semester: null,
        fileUrl: "/api/download/2",
        fileSize: "1.9 MB",
        fileType: "pdf",
        downloads: 1800,
        rating: "4.9",
        uploadedAt: new Date("2024-01-10"),
      },
      {
        title: "Machine Learning Handbook",
        description: "Complete guide to ML algorithms, implementations, and real-world applications.",
        category: "books",
        subject: "Machine Learning",
        semester: null,
        fileUrl: "/api/download/3",
        fileSize: "5.1 MB",
        fileType: "pdf",
        downloads: 3200,
        rating: "4.7",
        uploadedAt: new Date("2024-01-05"),
      },
      {
        title: "Operating Systems PYQ",
        description: "Previous year questions from top universities with detailed solutions and explanations.",
        category: "pyqs",
        subject: "Operating Systems",
        semester: "Semester 4",
        fileUrl: "/api/download/4",
        fileSize: "1.7 MB",
        fileType: "pdf",
        downloads: 1500,
        rating: "4.6",
        uploadedAt: new Date("2024-01-12"),
      },
      {
        title: "System Design Interview Guide",
        description: "Complete system design interview preparation with real examples and case studies.",
        category: "interview",
        subject: "System Design",
        semester: null,
        fileUrl: "/api/download/5",
        fileSize: "3.4 MB",
        fileType: "pdf",
        downloads: 2800,
        rating: "4.9",
        uploadedAt: new Date("2024-01-08"),
      },
      {
        title: "Database Management Systems",
        description: "Comprehensive DBMS notes with SQL queries, normalization, and practical examples.",
        category: "notes",
        subject: "Database Management",
        semester: "Semester 5",
        fileUrl: "/api/download/6",
        fileSize: "2.8 MB",
        fileType: "pdf",
        downloads: 1900,
        rating: "4.8",
        uploadedAt: new Date("2024-01-03"),
      },
      {
        title: "Microsoft Software Engineer Questions",
        description: "Latest interview questions from Microsoft with coding problems and solutions.",
        category: "company-pyqs",
        subject: "Software Engineering",
        semester: null,
        fileUrl: "/api/download/7",
        fileSize: "2.1 MB",
        fileType: "pdf",
        downloads: 1600,
        rating: "4.7",
        uploadedAt: new Date("2024-01-14"),
      },
      {
        title: "Computer Networks Complete Guide",
        description: "All networking concepts explained with protocols, layers, and practical examples.",
        category: "books",
        subject: "Computer Science",
        semester: "Semester 6",
        fileUrl: "/api/download/8",
        fileSize: "4.2 MB",
        fileType: "pdf",
        downloads: 2400,
        rating: "4.8",
        uploadedAt: new Date("2024-01-07"),
      },
    ];

    sampleResources.forEach(resource => {
      const id = this.currentId++;
      this.resources.set(id, { ...resource, id });
    });
  }

  async getResources(filters?: {
    category?: string;
    subject?: string;
    semester?: string;
    search?: string;
    sortBy?: string;
  }): Promise<Resource[]> {
    let results = Array.from(this.resources.values());

    if (filters) {
      if (filters.category && filters.category !== "all") {
        results = results.filter(r => r.category === filters.category);
      }
      if (filters.subject) {
        results = results.filter(r => r.subject === filters.subject);
      }
      if (filters.semester) {
        results = results.filter(r => r.semester === filters.semester);
      }
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        results = results.filter(r => 
          r.title.toLowerCase().includes(searchLower) ||
          r.description.toLowerCase().includes(searchLower) ||
          r.subject.toLowerCase().includes(searchLower)
        );
      }

      // Sort results
      switch (filters.sortBy) {
        case "latest":
          results.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());
          break;
        case "rating":
          results.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
          break;
        case "downloads":
          results.sort((a, b) => b.downloads - a.downloads);
          break;
        case "name":
          results.sort((a, b) => a.title.localeCompare(b.title));
          break;
        default:
          results.sort((a, b) => b.downloads - a.downloads);
      }
    }

    return results;
  }

  async getResource(id: number): Promise<Resource | undefined> {
    return this.resources.get(id);
  }

  async createResource(insertResource: InsertResource): Promise<Resource> {
    const id = this.currentId++;
    const resource: Resource = {
      ...insertResource,
      id,
      downloads: 0,
      uploadedAt: new Date(),
      semester: insertResource.semester || null,
      fileType: insertResource.fileType || "pdf",
      rating: insertResource.rating || "0.0",
    };
    this.resources.set(id, resource);
    return resource;
  }

  async incrementDownloads(id: number): Promise<void> {
    const resource = this.resources.get(id);
    if (resource) {
      resource.downloads += 1;
      this.resources.set(id, resource);
    }
  }

  async getFeaturedResources(): Promise<Resource[]> {
    const allResources = Array.from(this.resources.values());
    return allResources
      .sort((a, b) => b.downloads - a.downloads)
      .slice(0, 6);
  }

  async getResourceStats(): Promise<{
    notes: number;
    pyqs: number;
    books: number;
    interviews: number;
  }> {
    const allResources = Array.from(this.resources.values());
    return {
      notes: allResources.filter(r => r.category === "notes").length,
      pyqs: allResources.filter(r => r.category === "pyqs" || r.category === "company-pyqs").length,
      books: allResources.filter(r => r.category === "books").length,
      interviews: allResources.filter(r => r.category === "interview").length,
    };
  }
}

export const storage = new MemStorage();
