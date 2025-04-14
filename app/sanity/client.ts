import { createClient } from "next-sanity";

// Configure the client with better caching for production
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ,
  useCdn: process.env.NODE_ENV === 'production', // Use CDN in production for better performance
  perspective: 'published', // Only fetch published content
  // Disable stega to avoid the studioUrl requirement
  stega: false,
});
