This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

--------------------

## Main Info

Sure! Here's a **neutral, reporting-style rewrite** of the project summary, keeping the third-person tone and technical clarity, while still emphasizing Heritier's role without sounding overly promotional:

---

# Building a Modern Blog Platform with Next.js and Sanity CMS  
**GitHub Repository:** [github.com/heriman22/blog_main](https://github.com/heriman22/blog_main)

## Overview

As digital publishing demands grow, developers are tasked with creating platforms that offer speed, flexibility, and efficient content management. In response to this need, Heritier developed a blog platform using **Next.js 15** and **Sanity CMS**, navigating a range of architectural and technical challenges throughout the project.

## Project Architecture

The blog platform is structured as a **monorepo**, consisting of two primary components:

- **Frontend (`frontend-blackrock-int`)**: A static site generated (SSG) application powered by the new **Next.js App Router**, supporting dynamic routing.
- **Backend (`studio-blackrock-int`)**: A **Sanity CMS studio**, providing a robust and user-friendly interface for content management.

This architecture allows the frontend and backend to operate independently, while still integrating smoothly within a unified workflow.

## Key Technical Challenges and Solutions

### 1. **Handling URL-Encoded Slugs**

One early issue involved URL-encoded slugs (e.g., `%20` for spaces) breaking queries in Sanity. Since Sanity expects decoded strings, a decoding step was added:

```ts
const decodedSlug = decodeURIComponent(params.slug);
const post = await client.fetch(POST_QUERY, { slug: decodedSlug }, options);
```

### 2. **Next.js 15 Parameter Handling**

With the update to Next.js 15, route parameters are now promises instead of plain objects. Heritier adjusted the page component accordingly:

```ts
export async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  // ...
}
```

### 3. **Component Rendering Enhancements**

Rendering was optimized using:

- **Portable Text Components** for Sanity content
- **Image Optimization** using the Next.js `<Image />` component
- **Syntax Highlighting** with fully typed code blocks

### 4. **TypeScript & Build Fixes**

Several issues were addressed during deployment:

- Unused types and interfaces were removed
- `any` types were replaced with specific interfaces
- Linting issues (e.g., unescaped quotes) were corrected
- React component type mismatches were resolved

## Deployment & Performance Optimization

### Environment Configs

Hardcoded values were replaced with environment variables to support multiple environments:

```ts
projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
```

### Performance Techniques

- **Revalidation Strategy**: Added a 60-second cache revalidation
- **Image Format Support**: Used WebP and AVIF formats for modern browsers
- **Font Loading**: Applied `font-display: swap` for faster rendering
- **Suspense Boundaries**: Enabled progressive rendering for non-essential content

### Hydration Error Prevention

Hydration mismatches caused by browser extensions were mitigated with:

```html
<body suppressHydrationWarning>
  {children}
</body>
```

## Future Improvements

Heritier has outlined several areas for ongoing enhancement:

1. **Search Functionality**  
2. **Category & Tag Filters**  
3. **SEO Enhancements**  
4. **Analytics Integration**  
5. **Commenting System**

## Technical Takeaways

Throughout the project, several valuable lessons emerged:

- Proper error handling in async functions is critical
- TypeScript offers significant benefits in catching issues before runtime
- Managing environment configurations is a non-trivial but essential task
- Thoughtful performance tuning improves both user experience and SEO

## Conclusion

This project showcases the multifaceted nature of building a modern blog platform. From routing and rendering to deployment and optimization, every phase required careful planning and implementation. Heritier’s approach reflects a strong emphasis on scalability, maintainability, and real-world usability in modern web development.

---

Would you like this formatted as a blog post PDF, Markdown file, or for publishing to a portfolio or site?