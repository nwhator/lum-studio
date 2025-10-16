import { MongoClient, Db, Collection } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Check if MongoDB URI is configure
// if (!process.env.MONGODB_URI) {
//   throw new Error("MONGODB_URI is not set");
// }

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable to preserve the connection
  // across hot reloads (Next.js fast refresh)
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri, options);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  // In production mode, create a new client for each request
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

// Database and collection names
export const DB_NAME = 'lum-studios';
export const BOOKINGS_COLLECTION = 'bookings';

// Booking document interface
export interface BookingDocument {
  id: string;
  date: string;
  timeSlots: string[];
  package: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
  updatedAt: string;
}

// Helper function to get bookings collection
export async function getBookingsCollection(): Promise<Collection<BookingDocument>> {
  const client = await clientPromise;
  const db: Db = client.db(DB_NAME);
  return db.collection<BookingDocument>(BOOKINGS_COLLECTION);
}

// Create indexes for better performance (run once on first connection)
export async function createIndexes() {
  try {
    const collection = await getBookingsCollection();
    
    // Index on date for faster date queries
    await collection.createIndex({ date: 1 });
    
    // Index on status for filtering
    await collection.createIndex({ status: 1 });
    
    // Index on createdAt for sorting (descending)
    await collection.createIndex({ createdAt: -1 });
    
    // Compound index for date + status queries
    await collection.createIndex({ date: 1, status: 1 });
    
    console.log('✅ MongoDB indexes created successfully');
  } catch (error) {
    console.error('Error creating indexes:', error);
  }
}
