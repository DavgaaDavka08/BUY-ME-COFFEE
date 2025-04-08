import { NextResponse } from "next/server";
import { runQuery } from "../../../../utils/qeuryService";

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { email, password } = await req.json();

    const getUser = `SELECT * FROM "user" WHERE email = $1;`;

    const user = await runQuery(getUser, [email]);

    if (user.length <= 0) {
      return new NextResponse(JSON.stringify({ error: "user not found" }), {
        status: 401,
      });
    }
    const isValid = user[0].password === password;
    if (!isValid) {
      return new NextResponse(JSON.stringify({ error: "Password incorrect" }), {
        status: 401,
      });
    }

    return new NextResponse(
      JSON.stringify({ user: user, message: "Amjilttai nevterlee" })
    );
  } catch (err) {
    console.error("Failed to run query:", err);
    return new NextResponse(JSON.stringify({ error: "Failed to run query" }), {
      status: 500,
    });
  }
}
