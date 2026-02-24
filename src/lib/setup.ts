import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function ensureAdmin() {
    const adminCount = await prisma.admin.count();

    if (adminCount === 0) {
        const hashedPassword = await bcrypt.hash("password123", 10);
        await prisma.admin.create({
            data: {
                username: "admin",
                password: hashedPassword,
            },
        });
        console.log("Default admin created: admin / password123");
    }
}
