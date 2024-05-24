import { PrismaClient } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { auth } from '../auth'; // Assumes auth() handles the session automatically

type ExtendedLinkWhereInput = Prisma.LinkWhereInput & {
  userId?: number;
};

class LinkManager {
  private static prismaInstance: PrismaClient;

  static get prisma(): PrismaClient {
    if (!LinkManager.prismaInstance) {
      LinkManager.prismaInstance = new PrismaClient();
    }
    return LinkManager.prismaInstance;
  }

  // Retrieve links associated with the authenticated user
  async getUserLinks(): Promise<{ url: string; shortCode: string; }[]> {
    const session = await auth();
    if (session?.user?.id) {
      const userId = parseInt(session.user.id);
      const links = await LinkManager.prisma.link.findMany({
        where: { userId } as ExtendedLinkWhereInput,
      });
      return links.map(link => ({ url: link.url, shortCode: link.shortCode }));
    }
    return [];
  }

  // Create a new short link
  async createShortLink(url: string): Promise<{ url: string; shortCode: string; accountId?: number }> {
    const shortCode = this.generateShortCode();
    const session = await auth();
    const linkData: any = { url, shortCode };

    if (session?.user?.id) {
      linkData.userId = parseInt(session.user.id);
    }

    try {
      const link = await LinkManager.prisma.link.create({
        data: linkData,
      });
      return link;
    } catch (error) {
      console.error('Failed to create short link:', error);
      throw new Error('Error creating short link');
    }
  }

  // Retrieve the original URL from a short code
  async getLongUrl(shortCode: string): Promise<string | null> {
    try {
      const link = await LinkManager.prisma.link.findUnique({
        where: { shortCode },
      });
      return link?.url || null;
    } catch (error) {
      console.error('Failed to retrieve URL for shortcode:', error);
      return null;
    }
  }

  // Generate a random short code for the URL
  private generateShortCode(): string {
    return Array(6).fill(null).map(() => Math.random().toString(36)[2] || '0').join('');
  }
}

export default LinkManager;
