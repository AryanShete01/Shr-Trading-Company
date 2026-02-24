"use server";

import prisma from "./prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import fs from "fs/promises";
import path from "path";

export async function createProduct(formData: FormData) {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const category = formData.get("category") as string;
    const imageFile = formData.get("image") as File | null;
    let imageUrl = "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070";

    if (imageFile && imageFile.size > 0 && typeof imageFile !== "string") {
        const buffer = Buffer.from(await imageFile.arrayBuffer());
        const filename = `${Date.now()}-${imageFile.name.replace(/\s+/g, "-")}`;
        const uploadDir = path.join(process.cwd(), "public", "uploads");

        // Ensure directory exists
        await fs.mkdir(uploadDir, { recursive: true });

        await fs.writeFile(path.join(uploadDir, filename), buffer);
        imageUrl = `/uploads/${filename}`;
    } else if (typeof imageFile === "string" && imageFile) {
        imageUrl = imageFile;
    }

    await prisma.product.create({
        data: {
            name,
            description,
            price,
            category,
            image: imageUrl,
        },
    });

    revalidatePath("/products");
    revalidatePath("/admin/dashboard");
    redirect("/admin/dashboard");
}

export async function updateProduct(id: string, formData: FormData) {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const category = formData.get("category") as string;
    const imageFile = formData.get("image") as File | null;
    let imageUrl: string | undefined;

    if (imageFile && imageFile.size > 0 && typeof imageFile !== "string") {
        const buffer = Buffer.from(await imageFile.arrayBuffer());
        const filename = `${Date.now()}-${imageFile.name.replace(/\s+/g, "-")}`;
        const uploadDir = path.join(process.cwd(), "public", "uploads");
        await fs.mkdir(uploadDir, { recursive: true });
        await fs.writeFile(path.join(uploadDir, filename), buffer);
        imageUrl = `/uploads/${filename}`;
    } else if (typeof imageFile === "string" && imageFile) {
        imageUrl = imageFile;
    }

    await prisma.product.update({
        where: { id },
        data: {
            name,
            description,
            price,
            category,
            ...(imageUrl ? { image: imageUrl } : {}),
        },
    });

    revalidatePath("/products");
    revalidatePath(`/products/${id}`);
    revalidatePath("/admin/dashboard");
    redirect("/admin/dashboard");
}

export async function deleteProduct(id: string) {
    await prisma.product.delete({
        where: { id },
    });

    revalidatePath("/products");
    revalidatePath("/admin/dashboard");
}

export async function createEnquiry(formData: FormData) {
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const message = formData.get("message") as string;
    const category = formData.get("category") as string;

    await prisma.enquiry.create({
        data: {
            name,
            phone,
            message: `[Category: ${category}] ${message}`,
            status: "NEW",
        },
    });

    revalidatePath("/admin/dashboard/enquiries");
    revalidatePath("/admin/dashboard");
}

export async function updateEnquiryStatus(id: string, status: string) {
    await prisma.enquiry.update({
        where: { id },
        data: { status },
    });

    revalidatePath("/admin/dashboard/enquiries");
}
