import { listDataDoaHaji } from "@/lib/doa/list-data";
import {NextRequest, NextResponse} from "next/server";

export async function GET (request: NextRequest){
    const json = listDataDoaHaji
    
    return NextResponse.json(json);
}