import { type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "../sanity/client";
import Link from "next/link";
import Image from "next/image";
import { cache } from 'react';

const builder = imageUrlBuilder(client);

const urlFor = (source: SanityImageSource) => {
  return builder.image(source);
};

// Cache the post list query
const getPosts = cache(async () => {
  return client.fetch<SanityDocument[]>(
    `*[_type == "post" && publishedAt < now()] | order(publishedAt desc)`,
    {},
    { next: { revalidate: 60 } } // Revalidate once per minute
  );
});

// Add metadata for better SEO
export const metadata = {
  title: 'Blog | Heritier Akilimali',
  description: 'Explore the latest articles and insights from Heritier Akilimali on AI, coding, and technology.',
};

interface Post extends SanityDocument {
  title: string;
  slug: { current: string };
  publishedAt: string;
  mainImage?: {
    _type: string;
    asset: {
      _ref: string;
    };
  };
  excerpt?: string;
}

export default async function BlogPage() {
  const posts = await getPosts() as Post[];

  return (
    <main className="container mx-auto px-6 py-12 max-w-5xl">
      <Link href="/" className="text-blue-600 hover:underline inline-flex items-center mb-4">
        <span className="mr-1">←</span> Back Home
      </Link>
      <h1 className="text-4xl font-bold mb-10 text-center">Blog</h1>
      
      {posts.length === 0 ? (
        <div className="text-center text-gray-600">No posts found.</div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post: Post) => {
            let imageUrl = null;
            try {
              imageUrl = post.mainImage ? urlFor(post.mainImage).width(800).height(450).url() : null;
            } catch (error) {
              console.error(`Error generating image URL for post "${post.title}":`, error);
              // Continue with null imageUrl
            }
            
            // Format the date
            const publishedDate = post.publishedAt 
              ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })
              : 'No date';
              
            return (
              <Link 
                href={`/blog/${encodeURIComponent(post.slug.current)}`}
                key={post._id}
                className="rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
              >
                <div className="relative aspect-video">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={post.title || "Blog post thumbnail"}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={posts.indexOf(post) < 6} // Priority loading for first 6 posts
                    />
                  ) : (
                    <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                      <span className="text-gray-500">No image</span>
                    </div>
                  )}
                </div>
                
                <div className="p-6 flex-grow flex flex-col">
                  <h2 className="text-xl font-bold mb-2 text-gray-800">{post.title}</h2>
                  <p className="text-gray-600 mb-4 text-sm">{publishedDate}</p>
                  {post.excerpt && (
                    <p className="text-gray-700 flex-grow">{post.excerpt}</p>
                  )}
                  <div className="mt-4">
                    <span className="text-blue-600 hover:underline">Read more →</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}
