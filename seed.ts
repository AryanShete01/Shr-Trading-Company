import prisma from "./src/lib/prisma";

async function main() {
    const products = [
        {
            name: "Premium Interior Emulsion",
            description: "High-quality, scrub-resistant interior paint with a smooth matte finish. Perfect for living rooms and bedrooms.",
            price: 1250.00,
            category: "Paints & Colours",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2070",
        },
        {
            name: "Professional Drill Kit",
            description: "850W powerful impact drill with variable speed and a set of 13 bits. Ideal for masonry and metal work.",
            price: 3499.00,
            category: "Hardware Tools",
            image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=2086",
        },
        {
            name: "Copper Pipe Fittings",
            description: "Grade A copper elbows and tees for plumbing. Corrosian resistant and lead-free.",
            price: 150.00,
            category: "Plumbing Materials",
            image: "https://images.unsplash.com/photo-1585713181935-d5f622cc2415?q=80&w=2070",
        },
        {
            name: "Modern Switch Plate",
            description: "Elegant 6-module modular switch plate with a sleek white finish. Flame retardant material.",
            price: 450.00,
            category: "Electrical Items",
            image: "https://images.unsplash.com/photo-1558211583-03ed8a0b3d5b?q=80&w=2070",
        }
    ];

    console.log("Seeding products...");
    for (const p of products) {
        await prisma.product.create({ data: p });
    }
    console.log("Seeded successfully!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
