import LinkManager from '@/lib/linkManager';

// Define a TypeScript interface for the incoming request body
interface ShortLinkRequest {
  url: string;
}

export async function POST(req: Request): Promise<Response> {
  // Use the built-in JSON method to safely parse the incoming request body
  const requestBody = await req.json() as Partial<ShortLinkRequest>;

  // Check if URL is present in the request body
  if (!requestBody.url) {
    return new Response(JSON.stringify({ error: 'URL is required' }), { status: 400 });
  }

  try {
    const manager = new LinkManager();
    const link = await manager.createShortLink(requestBody.url);

    // Successful creation of the short link
    return new Response(JSON.stringify(link), { status: 200 });
  } catch (error) {
    console.error('Failed to create short link:', error);

    // Return a 500 Internal Server Error on failure
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
