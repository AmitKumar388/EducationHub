import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all resources with optional filters
  app.get("/api/resources", async (req, res) => {
    try {
      const { category, subject, semester, search, sortBy } = req.query;
      
      const resources = await storage.getResources({
        category: category as string,
        subject: subject as string,
        semester: semester as string,
        search: search as string,
        sortBy: sortBy as string,
      });
      
      res.json(resources);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch resources" });
    }
  });

  // Get featured resources
  app.get("/api/resources/featured", async (req, res) => {
    try {
      const resources = await storage.getFeaturedResources();
      res.json(resources);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured resources" });
    }
  });

  // Get resource stats
  app.get("/api/stats", async (req, res) => {
    try {
      const stats = await storage.getResourceStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  });

  // Get single resource
  app.get("/api/resources/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const resource = await storage.getResource(id);
      
      if (!resource) {
        return res.status(404).json({ message: "Resource not found" });
      }
      
      res.json(resource);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch resource" });
    }
  });

  // Download resource (increment counter and return download URL)
  app.post("/api/resources/:id/download", async (req, res) => {
    try {
      const id = req.params.id;
      const resource = await storage.getResource(id);
      
      if (!resource) {
        return res.status(404).json({ message: "Resource not found" });
      }
      
      await storage.incrementDownloads(id);
      
      // In a real app, this would generate a secure download URL
      // For now, we'll return a mock PDF download response
      res.json({ 
        downloadUrl: `/api/download/${id}`,
        filename: `${resource.title}.pdf`,
        success: true 
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to initiate download" });
    }
  });

  // Mock PDF download endpoint
  app.get("/api/download/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const resource = await storage.getResource(id);
      
      if (!resource) {
        return res.status(404).json({ message: "Resource not found" });
      }

      // Generate a simple PDF mock response
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${resource.title}.pdf"`);
      
      // Send a mock PDF content (in reality, this would serve the actual file)
      const mockPdfContent = Buffer.from(`
        %PDF-1.4
        1 0 obj
        <<
        /Type /Catalog
        /Pages 2 0 R
        >>
        endobj
        2 0 obj
        <<
        /Type /Pages
        /Kids [3 0 R]
        /Count 1
        >>
        endobj
        3 0 obj
        <<
        /Type /Page
        /Parent 2 0 R
        /MediaBox [0 0 612 792]
        /Contents 4 0 R
        >>
        endobj
        4 0 obj
        <<
        /Length 44
        >>
        stream
        BT
        /F1 12 Tf
        100 700 Td
        (${resource.title}) Tj
        ET
        endstream
        endobj
        xref
        0 5
        0000000000 65535 f 
        0000000009 00000 n 
        0000000058 00000 n 
        0000000115 00000 n 
        0000000206 00000 n 
        trailer
        <<
        /Size 5
        /Root 1 0 R
        >>
        startxref
        301
        %%EOF
      `);
      
      res.send(mockPdfContent);
    } catch (error) {
      res.status(500).json({ message: "Failed to download file" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
