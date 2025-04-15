import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Extract the secret from the request
    const body = await req.json();
    const secret = req.headers.get('x-webhook-secret');

    // Validate the request has proper authentication
    if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
    }

    // Get the paths to revalidate from the request
    // The _type in Sanity indicates what kind of document was changed
    const { _type } = body;
    
    const pathsToRevalidate: string[] = ['/'];
    
    // If it's a post, also revalidate the blog pages
    if (_type === 'post') {
      pathsToRevalidate.push('/blog');
      
      // If the webhook includes a slug, revalidate that specific post too
      if (body.slug?.current) {
        pathsToRevalidate.push(`/blog/${body.slug.current}`);
      }
    }

    // Revalidate all required paths
    for (const path of pathsToRevalidate) {
      revalidatePath(path);
    }

    return NextResponse.json(
      { revalidated: true, message: 'Revalidation triggered' },
      { status: 200 }
    );
  } catch (err) {
    console.error('Error revalidating:', err);
    return NextResponse.json(
      { revalidated: false, message: 'Error revalidating' },
      { status: 500 }
    );
  }
} 