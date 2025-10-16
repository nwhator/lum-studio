// Booking document interface (keep for type safety)
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

// Always export these for type safety
export const DB_NAME = process.env.MONGODB_URI ? 'lum-studios' : '';
export const BOOKINGS_COLLECTION = process.env.MONGODB_URI ? 'bookings' : '';

// Only require mongodb if URI is set
let clientPromise: Promise<any> | undefined = undefined;

if (process.env.MONGODB_URI) {
  // Only import and create client if enabled
  const { MongoClient } = require('mongodb');
  const uri = process.env.MONGODB_URI;
  const options = {};
  let client: any;
  if (process.env.NODE_ENV === 'development') {
    if (!(global as any)._mongoClientPromise) {
      client = new MongoClient(uri, options);
      (global as any)._mongoClientPromise = client.connect();
    }
    clientPromise = (global as any)._mongoClientPromise;
  } else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }
}

export default clientPromise;

// Safe dummy for getBookingsCollection
export async function getBookingsCollection(): Promise<any> {
  if (!process.env.MONGODB_URI || !clientPromise) {
    throw new Error('MongoDB is disabled');
  }
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  return db.collection(BOOKINGS_COLLECTION) as import('mongodb').Collection<BookingDocument>;
}

// Safe dummy for createIndexes
export async function createIndexes() {
  if (!process.env.MONGODB_URI) return;
  try {
    const collection = await getBookingsCollection();
    await collection.createIndex({ date: 1 });
    await collection.createIndex({ status: 1 });
    await collection.createIndex({ createdAt: -1 });
    await collection.createIndex({ date: 1, status: 1 });
    console.log('✅ MongoDB indexes created successfully');
  } catch (error) {
    console.error('Error creating indexes:', error);
  }
}