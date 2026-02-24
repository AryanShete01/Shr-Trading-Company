import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log("Setting up Supabase Storage RLS policies for 'products' bucket...");

    try {
        // Drop existing policies if they exist to avoid errors
        await prisma.$executeRawUnsafe(`DROP POLICY IF EXISTS "products_public_select" ON storage.objects;`);
        await prisma.$executeRawUnsafe(`DROP POLICY IF EXISTS "products_public_insert" ON storage.objects;`);
        await prisma.$executeRawUnsafe(`DROP POLICY IF EXISTS "products_public_update" ON storage.objects;`);
        await prisma.$executeRawUnsafe(`DROP POLICY IF EXISTS "products_public_delete" ON storage.objects;`);

        // Create new policies for full public access to the 'products' bucket
        // Note: In a real app, you might restrict this more carefully, but for this admin setup, we allow it.
        await prisma.$executeRawUnsafe(`
      CREATE POLICY "products_public_select" 
      ON storage.objects FOR SELECT 
      USING (bucket_id = 'products');
    `);

        await prisma.$executeRawUnsafe(`
      CREATE POLICY "products_public_insert" 
      ON storage.objects FOR INSERT 
      WITH CHECK (bucket_id = 'products');
    `);

        await prisma.$executeRawUnsafe(`
      CREATE POLICY "products_public_update" 
      ON storage.objects FOR UPDATE 
      USING (bucket_id = 'products');
    `);

        await prisma.$executeRawUnsafe(`
      CREATE POLICY "products_public_delete" 
      ON storage.objects FOR DELETE 
      USING (bucket_id = 'products');
    `);

        console.log("✅ Successfully applied new Storage RLS policies for the 'products' bucket.");
    } catch (error) {
        console.error("❌ Failed to set RLS policies. Make sure your database connection allows this execution.");
        console.error(error);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
