require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    console.log("Connecting to database...");
    const admin = await prisma.admin.findFirst();
    console.log("Existing Admin in DB:", admin);

    if (!admin) {
        console.log("No admin found! Creating one...");
        const hash = await bcrypt.hash('password123', 10);
        await prisma.admin.create({
            data: {
                username: 'admin',
                password: hash
            }
        });
        console.log("Created admin with username 'admin' and password 'password123'");
    } else {
        // also check if password123 matches
        const isMatch = await bcrypt.compare('password123', admin.password);
        console.log("Does the existing admin password match 'password123'?", isMatch);
    }
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
