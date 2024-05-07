import { listDataDoaLainnya } from "@/lib/doa/list-data";
import {NextRequest, NextResponse} from "next/server";

export async function GET (request: NextRequest){
    const json = listDataDoaLainnya
    
    return NextResponse.json(json);
}