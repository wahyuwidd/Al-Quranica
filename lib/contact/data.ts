import { prisma } from "@/lib/prisma"	
import connectToDatabase from "../mongodb";
import { ObjectId } from "mongodb";

interface Filter {
    $or?: ({ name: { $in: RegExp[] }; } | { phone: { $in: RegExp[] }; })[];
    }

    const ITEM_PER_PAGE = 5

export const getContacts = async (query: string, currentPage: number) => {
    const offset = (currentPage - 1) * ITEM_PER_PAGE
    try {
        const db = await connectToDatabase();
        let filter: Filter = {};
        let skip = 0;
        if (currentPage > 1) {
            skip = (currentPage - 1) * ITEM_PER_PAGE;
        }

        if (query) {
            const queryArray = query.split(' ');

            const nameRegex = queryArray.map(term => new RegExp(term, 'i')); // 'i' untuk mengabaikan huruf besar/kecil
            const phoneRegex = queryArray.map(term => new RegExp(term, 'i')); // Anda bisa menyesuaikan jika Anda memiliki pola pencarian yang berbeda untuk nama dan nomor telepon

            filter.$or = [
                { name: { $in: nameRegex } },
                { phone: { $in: phoneRegex } }
            ];
        }

        const collection = await db.collection('contacts').find(filter).skip(skip).limit(ITEM_PER_PAGE).toArray();
        return collection;
    } catch (error) {
        throw error;
    }
}

export const getContactsById = async ( id: string ) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('contacts').findOne({ _id : new ObjectId(id) })
        return collection
    } catch (error) {
        throw error
    }
}

export const getContactsPages = async (query: string) => {
    
    try {
        const db = await connectToDatabase();
        let filter: Filter = {};

        if (query) {
            const queryArray = query.split(' ');

            const nameRegex = queryArray.map(term => new RegExp(term, 'i')); // 'i' untuk mengabaikan huruf besar/kecil
            const phoneRegex = queryArray.map(term => new RegExp(term, 'i')); // Anda bisa menyesuaikan jika Anda memiliki pola pencarian yang berbeda untuk nama dan nomor telepon

            filter.$or = [
                { name: { $in: nameRegex } },
                { phone: { $in: phoneRegex } }
            ];
        }

        const collection = await db.collection('contacts').countDocuments(filter);

        const totalPages = Math.ceil(Number(collection) / ITEM_PER_PAGE);
        return totalPages;
    } catch (error) {
        throw error;
    }
}
