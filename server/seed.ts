import { connectToDatabase, ResourceModel } from "./db";

const sampleResources = [
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
  },
  {
    title: "Advanced Algorithms Notes",
    description: "Advanced algorithmic concepts including dynamic programming, graph algorithms, and more.",
    category: "notes",
    subject: "Computer Science",
    semester: "Semester 7",
    fileUrl: "/api/download/9",
    fileSize: "3.1 MB",
    fileType: "pdf",
    downloads: 1750,
    rating: "4.7",
  },
  {
    title: "Python Programming PYQ",
    description: "Previous year questions for Python programming with solutions and explanations.",
    category: "pyqs",
    subject: "Computer Science",
    semester: "Semester 2",
    fileUrl: "/api/download/10",
    fileSize: "1.8 MB",
    fileType: "pdf",
    downloads: 2200,
    rating: "4.6",
  },
];

export async function seedDatabase() {
  try {
    console.log("Seeding database...");
    
    // Connect to MongoDB
    await connectToDatabase();
    
    // Clear existing data
    await ResourceModel.deleteMany({});
    
    // Insert sample data
    await ResourceModel.insertMany(sampleResources);
    
    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

// Run seed if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase().then(() => process.exit(0));
}