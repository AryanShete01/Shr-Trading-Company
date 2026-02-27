const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function migrate() {
    console.log("🚀 Starting industrial data migration...");

    const allProducts = await prisma.product.findMany({
        orderBy: { category: 'asc' }
    });

    console.log(`📦 Found ${allProducts.length} legacy entries.`);

    const mappings = {
        "Berger Luxury Interior Emulsions": [
            "Berger Silk Glamour",
            "Berger Silk Dazzle",
            "Berger Easy Clean Fresh",
            "Berger paint Easy Clean",
            "Berger Rangoli"
        ],
        "Berger Premium Exterior Paints": [
            "Berger Weathercoat Anti Dustt",
            "Berger Weathercoat Glow",
            "Berger Weathercoat Long Life 10",
            "Berger Weathercoat Long Life 15",
            "Berger Weathercoat Champ",
            "Berger Anti-Dust"
        ],
        "Berger Economy Emulsions": [
            "Berger Walmasta",
            "Berger Walmasta Lite",
            "Berger Walmasta Glow"
        ],
        "Nerolac Perma Tile Adhesives": [
            "Nerolac Perma Tile Adhesive Classic",
            "Nerolac Perma Tile Adhesive Silver",
            "Nerolac Perma Tile Adhesive Gold",
            "Nerolac Perma Tile Adhesive Diamond",
            "Nerolac Perma Tile Adhesive Diamond +",
            "Nerolac Perma Tile Adhesive Platinum",
            "Nerolac Perma Tile Adhesive Platinum +"
        ],
        "Nerolac Tile Grouts & Fillers": [
            "Nerolac Perma Tile R-Poxy 3K",
            "Nerolac Perma Tile R-Poxy 2K",
            "Nerolac Perma Tile K-Tone Filler",
            "Nerolac Perma Tile Stick",
            "Nerolac Perma Tile Multiclean"
        ],
        "Finolex Plumbing Solutions": [
            "FINOLEX PIPE AND FITTING"
        ],
        "Sanitaryware & Bath Fittings": [
            "CERA BATHROOM FITTING",
            "KCI BATHROOM FITTINGS"
        ],
        "Professional Power Tools": [
            "JK TOOLS DRILL SET",
            "ASIAN PAINTS", // Assuming this was a test or broad entry
            "Professional Drill Kit"
        ],
        "Waterproofing & Construction Chemicals": [
            "SBR LATEX",
            "APPLE CHEMIE INDIA PVT LTD",
            "TILE ADHSIVE"
        ],
        "Heavy Storage & Fabrication": [
            "SAMRUDDHI WATER TANK",
            "FABRICATION MATERIAL"
        ]
    };

    const redirectMap = {};
    const createdEntities = [];

    for (const [newTitle, oldNames] of Object.entries(mappings)) {
        const matchingProducts = allProducts.filter(p => oldNames.some(name => p.name.includes(name)));

        if (matchingProducts.length === 0) {
            console.log(`⚠️ No products found for category: ${newTitle}`);
            continue;
        }

        console.log(`🔧 Consolidating ${matchingProducts.length} items into "${newTitle}"...`);

        // Extract data
        const descriptions = [...new Set(matchingProducts.map(p => p.description))].join("\n\n");
        const categories = [...new Set(matchingProducts.map(p => p.category))];
        const primaryCategory = categories[0] || "Hardware Tools";

        // Use up to 3 images
        const images = matchingProducts.map(p => p.image).filter(Boolean).slice(0, 3);

        // Construct variant text
        const variants = matchingProducts.map(p => p.name.replace(newTitle, "").trim()).filter(Boolean).join(", ") || "All standard sizes available";

        // Create new entity
        const newProduct = await prisma.product.create({
            data: {
                name: newTitle,
                description: matchingProducts[0].description, // Use the most descriptive one or first
                longDescription: descriptions,
                category: primaryCategory,
                image: images[0],
                image2: images[1] || null,
                image3: images[2] || null,
                variants: variants,
                applications: "Residential and Commercial Construction",
                whatsappMessage: `Interested in ${newTitle}`,
                seoTitle: `${newTitle} | Shreeraj Trading Akole`,
                seoDescription: `Get the best ${newTitle} from Shreeraj Trading Company, Akole. Authorized dealer.`,
                price: 0 // Using "Consult for Price" logic
            }
        });

        createdEntities.push(newProduct);

        // Map old IDs to this new ID
        matchingProducts.forEach(p => {
            redirectMap[p.id] = newProduct.id;
        });
    }

    // Save redirect map for frontend reference
    const fs = require('fs');
    fs.writeFileSync('./redirect-map.json', JSON.stringify(redirectMap, null, 2));

    console.log("✅ Migration complete!");
    console.log(`✨ Created ${createdEntities.length} consolidated entities.`);
    console.log(`🔗 Redirect map saved to redirect-map.json (${Object.keys(redirectMap).length} mappings).`);
}

migrate()
    .catch(e => {
        console.error("❌ Migration failed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
