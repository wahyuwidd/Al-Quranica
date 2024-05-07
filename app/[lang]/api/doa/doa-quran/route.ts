import { listDataDoaQuran } from "@/lib/doa/list-data";
import {NextRequest, NextResponse} from "next/server";

export async function GET (request: NextRequest){
    const json = listDataDoaQuran
    
    return NextResponse.json(json);
}
