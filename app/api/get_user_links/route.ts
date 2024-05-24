import LinkManager from '@/lib/linkManager';

export async function GET(req: Request): Promise<Response> {
  try {
    const manager = new LinkManager();
    const links = await manager.getUserLinks();

    // Check if links are retrieved and respond accordingly
    if (links.length === 0) {
      return new Response(JSON.stringify({ message: 'No links found for this user.' }), { status: 404 });
    }

    // Successful retrieval of links
    return new Response(JSON.stringify(links), { headers: { 'Content-Type': 'application/json' }, status: 200 });
  } catch (error) {
    console.error('Failed to retrieve user links:', error);

    // Return a 500 Internal Server Error on failure
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
