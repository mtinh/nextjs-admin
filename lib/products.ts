import "server-only";
import { connection } from "next/server";
import { db } from "@/lib/mongodb";

export type Product = {
    title_prod: string;
    code: string;
    category_slug: string;
    brand_slug: string;
    price: number;
    discount: number;
    discount_unit: string;
    qty: number;
    specifications: string;
    description: string;
    img_1: string;
    img_2?: string;
    img_3?: string;
};

const products = db.collection<Product>("products");

export async function getProducts() {
    await connection();
    return products.find({}, { projection: { _id: 0 } }).toArray();
}

export async function getProductByCode(code: string) {
    await connection();
    return products.findOne({ code }, { projection: { _id: 0 } });
}