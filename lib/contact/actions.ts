"use server";

import { z } from "zod";
import connectToDatabase from "../mongodb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ObjectId } from "mongodb";

const ContactSchema = z.object({
    name: z.string().min(6),
    phone: z.string().min(11)
});

export const saveContact = async (prevState: any, FormData: FormData) => {
    const validatedFields = ContactSchema.safeParse(Object.fromEntries(FormData.entries()));
    if(!validatedFields.success){
        return{
            Error: validatedFields.error.flatten().fieldErrors
        }
    }

    try {
        const db = await connectToDatabase();
        const collection = db.collection('contacts');
        await collection.insertOne({
            name: validatedFields.data.name,
            phone: validatedFields.data.phone,
            createdAt: new Date()
        });
    } catch (error) {
        return {message: "Failed to create contact"}
    }
    
    revalidatePath('/contact');
    redirect('/contact');
}

export const updateContact = async (id: any, prevState: any, FormData: FormData) => {
    const validatedFields = ContactSchema.safeParse(Object.fromEntries(FormData.entries()));
    if(!validatedFields.success){
        return{
            Error: validatedFields.error.flatten().fieldErrors
        }
    }

    try {
        const db = await connectToDatabase();
        const collection = db.collection('contacts');
        await collection.updateOne(
            // Kriteria pencarian
            { _id: new ObjectId(id) },
            // Perubahan yang ingin Anda terapkan pada dokumen
            { $set: { 
                name: validatedFields.data.name,
                phone: validatedFields.data.phone,
                createdAt: new Date()
            }}
          );
    } catch (error) {
        console.log(error);
        return {message: "Failed to update contact"}
    }
    
    revalidatePath('/contact');
    redirect('/contact');
}

export const deleteContact = async (id: any) => {
    
    try {
        const db = await connectToDatabase();
        const collection = db.collection('contacts');
        await collection.deleteOne({
            _id: new ObjectId(id)
        })
    } catch (error) {
        console.log(error);
        return {message: "Failed to delete contact"}
    }
    
    revalidatePath('/contact');
}
