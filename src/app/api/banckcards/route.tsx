import { NextResponse } from "next/server";
import { runQuery } from "../../../../utils/qeuryService";

export async function POST(req: Request): Promise<NextResponse> {
    try {
        const { firstname, lastname, country, cardnumber, expirydate, userid } = await req.json();

        // SQL query for creating a user
        const createUser = `INSERT INTO "public"."bankcard" 
            (firstname, lastname, country, cardnumber, createdat, updatedat, expirydate, userid) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;`;

        console.log({ firstname, lastname, country, cardnumber, expirydate, userid });

        const newUser = await runQuery(createUser, [
            firstname,
            lastname,
            country,
            cardnumber,
            new Date(),
            new Date(),
            expirydate,   // expirydate should be passed here
            userid         // userid should be passed here
        ]);

        return new NextResponse(
            JSON.stringify({
                user: newUser[0],
                message: "Амжилттай карт бүртгэлээ!",
            }),
            { status: 201 }
        );
    } catch (error) {
        console.log("Банк карт бүртгэхэд алдаа гарлаа", error);
        return new NextResponse(
            JSON.stringify({ error: "Банк карт бүртгэж чадсангүй." }),
            { status: 500 }
        );
    }
}
