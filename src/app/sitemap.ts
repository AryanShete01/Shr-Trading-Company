import { MetadataRoute } from 'next';
import prisma from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://www.shreerajtradingcompany.com";

    // Define core static routes
    const staticRoutes = [
        "",
        "/about",
        "/contact",
        "/products",
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: route === "" ? 1 : 0.8,
    }));

    try {
        // Fetch all products to create dynamic routes
        const products = await prisma.product.findMany({
            select: {
                id: true,
                updatedAt: true,
            },
        });

        const productRoutes = products.map((product) => ({
            url: `${baseUrl}/products/${product.id}`,
            lastModified: product.updatedAt,
            changeFrequency: "weekly" as const,
            priority: 0.6,
        }));

        return [...staticRoutes, ...productRoutes];
    } catch (error) {
        console.error("Error generating sitemap for products:", error);
        // Fallback to just static routes if DB fails
        return staticRoutes;
    }
}
