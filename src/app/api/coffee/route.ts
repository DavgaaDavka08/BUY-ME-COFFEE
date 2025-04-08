import { NextResponse } from "next/server";
import { runQuery } from "../../../../utils/qeuryService";

export async function GET(): Promise<NextResponse> {
  try {
    const incomingName = "boldo";
    // const createTable = `CREATE TABLE "public"."Food" ("id" integer PRIMARY KEY,"name" varchar NOT NULL,"price" integer);`;
    const getUser = `SELECT name,password FROM "User" WHERE name='${incomingName}' AND password='1235';`;

    const user = await runQuery(getUser);
    if (user.length <= 0) {
      return new NextResponse(JSON.stringify({ error: "user not found" }), {
        status: 404,
      });
    }

    return new NextResponse(JSON.stringify({ foods: user }));
  } catch (err) {
    console.error("Failed to run query:", err);
    return new NextResponse(JSON.stringify({ error: "Failed to run query" }), {
      status: 500,
    });
  }
}
