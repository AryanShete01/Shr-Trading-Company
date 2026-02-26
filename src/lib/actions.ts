"use server";

import prisma from "./prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabase } from "./supabase";

export async function createProduct(formData: FormData) {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const category = formData.get("category") as string;
    const imageFile = formData.get("image") as File | null;
    let imageUrl = "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070";

    // If an image is provided immediately (handled for backward compatibility or direct upload)
    if (imageFile && imageFile.size > 0 && typeof imageFile !== "string") {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('products')
            .upload(filePath, imageFile, {
                cacheControl: '3600',
                upsert: false
            });

        if (uploadError) {
            console.error("Supabase upload error:", uploadError);
            throw new Error("Failed to upload image");
        }

        const { data } = supabase.storage.from('products').getPublicUrl(filePath);
        imageUrl = data.publicUrl;
    } else if (typeof imageFile === "string" && imageFile) {
        imageUrl = imageFile;
    }

    const product = await prisma.product.create({
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
    return { success: true, product };
}

export async function updateProduct(id: string, formData: FormData) {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const category = formData.get("category") as string;
    const imageFile = formData.get("image") as File | null;
    let imageUrl: string | undefined;

    if (imageFile && imageFile.size > 0 && typeof imageFile !== "string") {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('products')
            .upload(filePath, imageFile, {
                cacheControl: '3600',
                upsert: false
            });

        if (uploadError) {
            console.error("Supabase upload error:", uploadError);
            throw new Error("Failed to upload image");
        }

        const { data } = supabase.storage.from('products').getPublicUrl(filePath);
        imageUrl = data.publicUrl;
    } else if (typeof imageFile === "string" && imageFile) {
        imageUrl = imageFile;
    }

    const product = await prisma.product.update({
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
    return { success: true, product };
}

export async function uploadProductImage(productId: string, formData: FormData) {
    const imageFile = formData.get("image") as File;

    if (!imageFile || imageFile.size === 0) {
        return { error: "No image file provided" };
    }

    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${productId}_${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
        .from('products')
        .upload(filePath, imageFile, {
            cacheControl: '3600',
            upsert: false
        });

    if (uploadError) {
        console.error("Supabase upload error:", uploadError);
        return { error: "Failed to upload image to storage" };
    }

    const { data } = supabase.storage.from('products').getPublicUrl(filePath);
    const imageUrl = data.publicUrl;

    await prisma.product.update({
        where: { id: productId },
        data: { image: imageUrl },
    });

    revalidatePath("/products");
    revalidatePath(`/products/${productId}`);
    revalidatePath("/admin/dashboard");

    return { success: true, imageUrl };
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
