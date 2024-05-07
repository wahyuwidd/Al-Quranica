import { listDataDoaIbadah } from "@/lib/doa/list-data";
import {NextRequest, NextResponse} from "next/server";

export async function GET (request: NextRequest){
    const json = listDataDoaIbadah
    
    return NextResponse.json(json);
}