import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./prisma";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) return null;

                const admin = await prisma.admin.findUnique({
                    where: { username: credentials.username as string },
                });

                if (!admin) return null;

                const isPasswordValid = await bcrypt.compare(
                    credentials.password as string,
                    admin.password
                );

                if (!isPasswordValid) return null;

                return {
                    id: admin.id,
                    name: admin.username,
                };
            },
        }),
    ],
    pages: {
        signIn: "/admin/login",
    },
});
