const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function migrate() {
    console.log("🚀 Starting Pricing Migration...");

    // Find products with price 0
    const zeroPriceProducts = await prisma.product.findMany({
        where: {
            OR: [
                { price: 0 },
                { price: null }
            ]
        }
    });

    console.log(`📦 Found ${zeroPriceProducts.length} products with price 0 or null.`);

    let count = 0;
    for (const product of zeroPriceProducts) {
        await prisma.product.update({
            where: { id: product.id },
            data: {
                priceType: "CONTACT",
                price: 0 // Keep it 0 for consistency if it was null, or just set to 0
            }
        });
        console.log(`✅ Updated: ${product.name} -> CONTACT`);
        count++;
    }

    console.log(`\n✨ Migration complete! ${count} products updated.`);
}

migrate()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
