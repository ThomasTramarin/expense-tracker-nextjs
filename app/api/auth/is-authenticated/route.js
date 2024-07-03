import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";
import { NextResponse } from "next/server";

//Return boolean value
export async function GET(request){
    const session = await getServerSession(authOptions);
    return NextResponse.json({authenticated: !!session});
}