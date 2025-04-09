import { NextResponse } from "next/server";
import { runQuery } from "../../../../utils/qeuryService";

export async function GET(): Promise<NextResponse> {
    try {
        // SQL query for fetching all bank cards
        const getBankCards = `SELECT * FROM "public"."bankcard";`;

        // Run the query
        const bankCards = await runQuery(getBankCards, []);

        return new NextResponse(
            JSON.stringify({
                bankCards,
                message: "Амжилттай картуудыг авлаа!",
            }),
            { status: 200 }
        );
    } catch (error) {
        console.log("Банк картуудыг авахад алдаа гарлаа", error);
        return new NextResponse(
            JSON.stringify({ error: "Банк картуудыг авахад алдаа гарлаа." }),
            { status: 500 }
        );
    }
}
