import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/eduhub';

let isConnected = false;

export async function connectToDatabase() {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

// Resource Schema
const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  subject: { type: String, required: true },
  semester: { type: String, default: null },
  fileUrl: { type: String, required: true },
  fileSize: { type: String, required: true },
  fileType: { type: String, default: 'pdf' },
  downloads: { type: Number, default: 0 },
  rating: { type: String, default: '0.0' },
  uploadedAt: { type: Date, default: Date.now },
});

export const ResourceModel = mongoose.model('Resource', resourceSchema);