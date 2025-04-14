import { PortableText, type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "../../sanity/client";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PortableTextComponents } from "../../components/PortableTextComponents";
import { cache } from 'react';

interface PostPageProps {
    height: number,
    width: number
  }

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;
const ALL_POSTS_QUERY = `*[_type == "post" && defined(slug.current)].slug.current`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

// Add cache wrapper for data fetching
const getPost = cache(async (slug: string) => {
  return client.fetch<SanityDocument>(
    POST_QUERY, 
    { slug }, 
    { next: { revalidate: 60 } } // Revalidate once per minute
  );
});

// Generate static pages for known blog posts at build time
export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(ALL_POSTS_QUERY);
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for the page
export async function generateMetadata({ params }: { params: { slug: string } }) {
  // Await params before using properties
  const slug = await params.slug;
  const decodedSlug = decodeURIComponent(slug);
  const post = await getPost(decodedSlug);
  
  if (!post) return { title: 'Post Not Found' };
  
  // Create OpenGraph image URL safely
  let ogImageUrl: string | undefined;
  if (post.mainImage && urlFor) {
    const imageBuilder = urlFor(post.mainImage);
    if (imageBuilder) {
      ogImageUrl = imageBuilder.width(1200).height(630).url();
    }
  }
  
  return {
    title: post.title,
    description: post.excerpt || `Read about ${post.title}`,
    openGraph: {
      images: ogImageUrl ? [ogImageUrl] : [],
    },
  };
}

// Component for blog post content to allow separate suspense boundary
const PostContent = ({ post }: { post: SanityDocument }) => {
  return (
    <div className="prose prose-lg max-w-none">
      {post?.body && <PortableText value={post.body} components={PortableTextComponents} />}
    </div>
  );
};

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  // Await params before using properties
  const slug = await params.slug;
  const decodedSlug = decodeURIComponent(slug);
  const post = await getPost(decodedSlug);
  
  if (!post) {
    notFound();
  }
  
  // Create post image URL safely
  let postImageUrl: string | undefined;
  if (post.mainImage && urlFor) {
    const imageBuilder = urlFor(post.mainImage);
    if (imageBuilder) {
      postImageUrl = imageBuilder.width(1200).height(675).url();
    }
  }

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
      <Link href="/blog" className="text-blue-600 hover:underline inline-flex items-center mb-4">
        <span className="mr-1">←</span> Back to posts
      </Link>
      
      {/* Priority content that should load first */}
      <h1 className="text-4xl font-bold mb-6 text-gray-800">{post?.title}</h1>
      
      <div className="mb-6 text-gray-600">
        <p>Published: {new Date(post?.publishedAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}</p>
      </div>
      
      {postImageUrl && (
        <div className="mb-8">
          <Image
            src={postImageUrl}
            alt={post?.title || "Blog post image"}
            className="aspect-video rounded-xl shadow-md w-full"
            width={1200}
            height={675}
            priority
            quality={85}
          />
        </div>
      )}

      {/* Content that can be deferred */}
      <Suspense fallback={<div className="animate-pulse h-screen bg-gray-100 rounded-lg"></div>}>
        <PostContent post={post} />
      </Suspense>
    </main>
  );
}
