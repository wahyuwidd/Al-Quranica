import { IntegerType, ObjectId } from "mongodb"

export type Contact = {
    _id: IntegerType
    name: string
    phone: string
    createdAt: Date
}