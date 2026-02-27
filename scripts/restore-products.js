const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function restore() {
    console.log("⏪ Starting industrial data restoration...");

    // 1. Data mapping (Reconstructed from logs and migrate-products.js)
    const productData = [
        {
            id: "cmm1mpv0a0000k1049pq9ecng",
            name: "Berger paint Easy Clean",
            category: "Paints & Colours",
            description: "Luxury Interior Washable Paint Also Available In 1L,4L,10L And 20L",
            image: "https://vstqzleksszcpphyuggc.supabase.co/storage/v1/object/public/products/0.7912181469800189.webp"
        },
        {
            id: "cmm1q9goa000bvfs4mr9aj1j3",
            name: "Berger Rangoli",
            category: "Paints & Colours",
            description: "Soft Sheen Interior Emulsion. Luxury finish at a budget price.",
            image: "https://vstqzleksszcpphyuggc.supabase.co/storage/v1/object/public/products/0.34566315289735894.jpeg"
        },
        {
            id: "cmm1q9gm6000avfs4649nim5y",
            name: "Berger Easy Clean Fresh",
            category: "Paints & Colours",
            description: "Low Sheen Smooth Finish Interior Emulsion with Freshness.",
            image: "https://images.bergerpaints.com/2025-10/ecf_1st.jpg"
        },
        {
            id: "cmm1q9gk40009vfs4mif0ygwj",
            name: "Berger Silk Dazzle",
            category: "Paints & Colours",
            description: "Luxury Interior Emulsion with Dazzling Finish.",
            image: "https://images.bergerpaints.com/2024-04/silk_glamor_dazzle-2272x1280_0.png"
        },
        {
            id: "cmm1mrh9e0000l504otyc0okp",
            name: "Berger Silk Glamour",
            category: "Paints & Colours",
            description: "Premium Luxury Interior Emulsion.",
            image: "https://vstqzleksszcpphyuggc.supabase.co/storage/v1/object/public/products/0.28610846421486147.jpg"
        },
        {
            id: "cmm1q9fyc0000vfs40g8798hj",
            name: "Berger Weathercoat Anti Dustt",
            category: "Paints & Colours",
            description: "Soft Sheen Acrylic Exterior Emulsion. Dust resistant.",
            image: "https://images.bergerpaints.com/2024-04/weathercoat-antidust-back.png"
        },
        {
            id: "cmm1q9g310001vfs4g3fmm9xv",
            name: "Berger Weathercoat Glow",
            category: "Paints & Colours",
            description: "Premium Exterior Emulsion with high shine.",
            image: "https://images.bergerpaints.com/2024-01/product_weathercoat_glow.jpg"
        },
        {
            id: "cmm1q9gdv0006vfs4wv4rf42a",
            name: "Berger Weathercoat Long Life 10",
            category: "Paints & Colours",
            description: "Advanced PU & Silicon technology. 10 Years Warranty.",
            image: "https://images.bergerpaints.com/2023-11/weathercoat_long_life_10_canshot.jpg"
        },
        {
            id: "cmm1q9g520002vfs4m4z6lllw",
            name: "Berger Weathercoat Champ",
            category: "Paints & Colours",
            description: "Premium exterior emulsion suitable for dry to moderate climate.",
            image: "https://images.bergerpaints.com/2024-01/product_weathercoat_champ.jpg"
        },
        {
            id: "cmm1q9gfz0007vfs4jtau0w5l",
            name: "Berger Weathercoat Long Life 15",
            category: "Paints & Colours",
            description: "Advanced technology for 15 Years Warranty.",
            image: "https://images.bergerpaints.com/2024-01/product_weathercoat_long_life_15.jpg"
        },
        {
            id: "cmm1mt0qz0000jx04cko5bl0t",
            name: "Berger Anti-Dust",
            category: "Paints & Colours",
            description: "Dust repellent exterior paint.",
            image: "https://vstqzleksszcpphyuggc.supabase.co/storage/v1/object/public/products/0.5007999368911331.jpg"
        },
        {
            id: "cmm1q9gsp000dvfs4mo56ajz7",
            name: "Berger Walmasta",
            category: "Paints & Colours",
            description: "Water-based exterior emulsion.",
            image: "https://images.bergerpaints.com/s3fs-public/2023-09/Walmasta%20can.png"
        },
        {
            id: "cmm1q9gqf000cvfs4ioknfl6a",
            name: "Berger Walmasta Lite",
            category: "Paints & Colours",
            description: "Economy exterior emulsion.",
            image: "https://vstqzleksszcpphyuggc.supabase.co/storage/v1/object/public/products/0.5253138296726022.webp"
        },
        {
            id: "cmm1q9g770003vfs4975o9lpv",
            name: "Berger Walmasta Glow",
            category: "Paints & Colours",
            description: "Exterior emulsion with Xtra Shine.",
            image: "https://vstqzleksszcpphyuggc.supabase.co/storage/v1/object/public/products/0.25681251390824233.webp"
        },
        {
            id: "cmm1p0o690000vfck8h6xu73t",
            name: "Nerolac Perma Tile Adhesive Classic",
            category: "Paints & Colours",
            description: "Cement based polymer modified tile adhesive.",
            image: "https://www.nerolac.com/sites/default/files/2026-01/Nerolac-Perma-Tile-Adhesive-Classic-20-kg-r.png"
        },
        {
            id: "cmm1p0obh0001vfckfyuydpnt",
            name: "Nerolac Perma Tile Adhesive Silver",
            category: "Paints & Colours",
            description: "High performance tile adhesive.",
            image: "https://www.nerolac.com/sites/default/files/2026-01/Nerolac-Perma-Tile-Adhesive-Silver-20-kg-r.png"
        },
        {
            id: "cmm1p0oe40002vfck4ig0yca9",
            name: "Nerolac Perma Tile Adhesive Gold",
            category: "Paints & Colours",
            description: "Premium tile adhesive with high strength.",
            image: "https://www.nerolac.com/sites/default/files/2026-01/Nerolac-Perma-Tile-Adhesive-Gold-20-kg-r.png"
        },
        {
            id: "cmm1p0ogc0003vfckwjiw9dx4",
            name: "Nerolac Perma Tile Adhesive Diamond",
            category: "Paints & Colours",
            description: "Industrial grade tile adhesive.",
            image: "https://www.nerolac.com/sites/default/files/2026-01/Nerolac-Perma-Tile-Adhesive-Diamond-20-kg-r.png"
        },
        {
            id: "cmm1p0ok40004vfckvfqr8yua",
            name: "Nerolac Perma Tile Adhesive Diamond +",
            category: "Paints & Colours",
            description: "Superior strength tile adhesive.",
            image: "https://www.nerolac.com/sites/default/files/2026-01/Nerolac-Perma-Tile-Adhesive-Diamond-plus-20-kg-Final_3D-r.png"
        },
        {
            id: "cmm1p0ond0005vfckjhqbw17s",
            name: "Nerolac Perma Tile Adhesive Platinum",
            category: "Paints & Colours",
            description: "Ultra premium tile adhesive.",
            image: "https://www.nerolac.com/sites/default/files/2026-01/Nerolac-Perma-Tile-Adhesive-Platinum-20-kg_3D-r.png"
        },
        {
            id: "cmm1p0orb0006vfckmna5t0i6",
            name: "Nerolac Perma Tile Adhesive Platinum +",
            category: "Paints & Colours",
            description: "Top-tier performance tile adhesive.",
            image: "https://www.nerolac.com/sites/default/files/2026-01/Nerolac-Perma-Tile-Adhesive--Platinum-Plus-20-kg_3D-r.png"
        },
        {
            id: "cmm1p0ovo0007vfckvzhspbkv",
            name: "Nerolac Perma Tile R-Poxy 3K",
            category: "Paints & Colours",
            description: "Epoxy tile joint filler.",
            image: "https://www.nerolac.com/sites/default/files/2026-01/NEROLAC-PERMA-R-POXY-3K-3D-Packshort-New.png"
        },
        {
            id: "cmm1p0oyw0008vfckzfcxpia5",
            name: "Nerolac Perma Tile Multiclean",
            category: "Paints & Colours",
            description: "Effective tile and mould cleaning liquid.",
            image: "https://www.nerolac.com/sites/default/files/2026-01/NEROLAC-PERMA-TILE-MULTICLEAN-1L-Label.png"
        },
        {
            id: "cmm1p0p1s0009vfckokm23nu4",
            name: "Nerolac Perma Tile Stick",
            category: "Paints & Colours",
            description: "Specialized tile primer.",
            image: "https://www.nerolac.com/sites/default/files/2026-01/Nerolac-Perma-Tile-Stick-1L.png"
        },
        {
            id: "cmm1p0p6q000bvfckjxoi0jwb",
            name: "Nerolac Perma Tile R-Poxy 2K",
            category: "Paints & Colours",
            description: "2-part epoxy tile joint filler.",
            image: "https://www.nerolac.com/sites/default/files/2026-01/Nerolac-Perma-Tile-R-poxy-2K-1kg.png"
        },
        {
            id: "cmm1p0p4h000avfck720q567b",
            name: "Nerolac Perma Tile K-Tone Filler",
            category: "Paints & Colours",
            description: "Polymer modified cement based tile joint filler.",
            image: "https://vstqzleksszcpphyuggc.supabase.co/storage/v1/object/public/products/0.3735904858104321.webp"
        },
        {
            id: "cmm1r6x570000l40469co1z6f",
            name: "FINOLEX PIPE AND FITTING",
            category: "Plumbing Materials",
            description: "UPVC, CPVC, SWR Pipe and Fitting Material.",
            image: "https://vstqzleksszcpphyuggc.supabase.co/storage/v1/object/public/products/0.3478822100408382.webp"
        },
        {
            id: "cmm1rfmuj0000ji04v77kbrs5",
            name: "CERA BATHROOM FITTING",
            category: "Plumbing Materials",
            description: "High quality bathroom fittings and fixtures.",
            image: "https://vstqzleksszcpphyuggc.supabase.co/storage/v1/object/public/products/0.8639151282905442.avif"
        },
        {
            id: "cmm1rhj830001ji046avcbr1p",
            name: "KCI BATHROOM FITTINGS",
            category: "Plumbing Materials",
            description: "Faucets, showers and other bathroom accessories.",
            image: "https://vstqzleksszcpphyuggc.supabase.co/storage/v1/object/public/products/0.3954039914376387.jpg"
        },
        {
            id: "cmm1mwm2x0001l504o5kem0km",
            name: "JK TOOLS DRILL SET",
            category: "Hardware Tools",
            description: "Complete drill set for professionals.",
            image: "https://vstqzleksszcpphyuggc.supabase.co/storage/v1/object/public/products/0.7470023112678983.jpg"
        },
        {
            id: "cmm1sk1bv0000l704iiz6s0o6",
            name: "ASIAN PAINTS",
            category: "Paints & Colours",
            description: "Authorized dealer of Asian Paints products.",
            image: "https://vstqzleksszcpphyuggc.supabase.co/storage/v1/object/public/products/0.9008265331922994.jpg"
        },
        {
            id: "cmm1no8nk0003l504fy2vgd09",
            name: "TILE ADHSIVE",
            category: "Hardware Tools",
            description: "High quality cement-based tile adhesive.",
            image: "https://vstqzleksszcpphyuggc.supabase.co/storage/v1/object/public/products/0.4687337270339037.webp"
        },
        {
            id: "cmm1n5vkx0001k104luf6lgk5",
            name: "APPLE CHEMIE INDIA PVT LTD",
            category: "Paints & Colours",
            description: "Industrial construction chemicals.",
            image: "https://vstqzleksszcpphyuggc.supabase.co/storage/v1/object/public/products/0.752712307557925.jpg"
        },
        {
            id: "cmm1navh10000kz049fvoexkv",
            name: "SBR LATEX",
            category: "Paints & Colours",
            description: "Bonding agent for repair and waterproofing.",
            image: "https://vstqzleksszcpphyuggc.supabase.co/storage/v1/object/public/products/0.3383718066458389.jpg"
        },
        {
            id: "cmm1pxb490001ju04x7qmcryh",
            name: "SAMRUDDHI WATER TANK",
            category: "Hardware Tools",
            description: "Multi-layered durable water storage tanks.",
            image: "https://vstqzleksszcpphyuggc.supabase.co/storage/v1/object/public/products/0.2394780033312558.webp"
        },
        {
            id: "cmm1rpzac0000ld04hwghn5t1",
            name: "FABRICATION MATERIAL",
            category: "Hardware Tools",
            description: "Welding rods, nut-bolts and other fabrication supplies.",
            image: "https://vstqzleksszcpphyuggc.supabase.co/storage/v1/object/public/products/0.4020919767338622.jpg"
        },
        {
            id: "cmm09fk200000vff0sbpxylm0",
            name: "Premium Interior Emulsion",
            category: "Paints & Colours",
            description: "High-quality, scrub-resistant interior paint.",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2070"
        },
        {
            id: "cmm09fl270002vff0yphmrstn",
            name: "Copper Pipe Fittings",
            category: "Plumbing Materials",
            description: "Grade A copper elbows and tees.",
            image: "https://images.unsplash.com/photo-1585713181935-d5f622cc2415?q=80&w=2070"
        },
        {
            id: "cmm1mysi30001jx04ksfzbd0y",
            name: "Professional Drill Kit",
            category: "Hardware Tools",
            description: "850W powerful impact drill set.",
            image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=2086"
        },
        {
            id: "cmm1n37di0002l504fmuesre8",
            name: "NEROLAC PERMA",
            category: "Paints & Colours",
            description: "Waterproofing material also available.",
            image: "https://www.nerolac.com/sites/default/files/2026-01/Nerolac-Perma-Tile-Adhesive-Diamond-plus-20-kg-Final_3D-r.png"
        },
        {
            id: "cmm1q9gi20008vfs4ib14afzt",
            name: "Berger Silk Glamor",
            category: "Paints & Colours",
            description: "Luxury interior smooth emulsion.",
            image: "https://images.bergerpaints.com/2023-11/Silk_Glamor_High_Sheen_canshot.jpg"
        }
    ];

    const categoryIds = [
        "cmm4a7rce0000vfm8a2u78ds8",
        "cmm4a7rtb0001vfm80h38qdhf",
        "cmm4a7ty40002vfm8m39veyry",
        "cmm4a7ufn0003vfm8x42e555z",
        "cmm4a7v1a0004vfm8443r6ckx",
        "cmm4a7voj0005vfm8emxhsukn",
        "cmm4a7xia0006vfm8ebq0lgdf",
        "cmm4a7xvf0007vfm8cck84abg",
        "cmm4a7yfz0008vfm8n20l5h7q",
        "cmm4a7z2t0009vfm8t6lat7u0"
    ];

    console.log(`📦 Restoring ${productData.length} individual products...`);

    for (const p of productData) {
        try {
            await prisma.product.create({
                data: {
                    id: p.id,
                    name: p.name,
                    description: p.description,
                    category: p.category,
                    image: p.image,
                    price: 0,
                    whatsappMessage: `Interested in ${p.name}`,
                    seoTitle: `${p.name} | Shreeraj Trading STC`,
                    seoDescription: `Buy ${p.name} at the best price in Akole.`
                }
            });
            console.log(`✅ Restored: ${p.name}`);
        } catch (error) {
            console.log(`⚠️ Skipping ${p.name} (perhaps already exists)`);
        }
    }

    console.log("🗑️ Deleting consolidation category entries...");
    for (const id of categoryIds) {
        try {
            await prisma.product.delete({ where: { id } });
            console.log(`✅ Deleted category entry: ${id}`);
        } catch (error) {
            console.log(`⚠️ Category entry ${id} not found or already deleted.`);
        }
    }

    console.log("✨ Restoration complete!");
}

restore()
    .catch(e => {
        console.error("❌ Restoration failed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
