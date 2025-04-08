import { NextResponse } from "next/server";
import { runQuery } from "../../../../utils/qeuryService";

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { username, password, email } = await req.json();
    console.log(password);
    //1uussen email bnu shalgaj baina
    const checkedUser = `SELECT * FROM "user" WHERE username = $1;`;
    const existingUser = await runQuery(checkedUser, [username]);
    if (existingUser.length > 0) {
      return new NextResponse(
        JSON.stringify({ error: "username already exists" }),
        {
          status: 400,
        }
      );
    }
    //2shine hereglegch burtgeh
    const createUser = `INSERT INTO "user" (username, email, password) VALUES ($1, $2 ,$3)`;
    const newUser = await runQuery(createUser, [username, email, password]);
    return new NextResponse(
      JSON.stringify({
        user: newUser[0],
        message: "amjilttai hereglegch burtgelee",
      }),
      { status: 201 }
    );
  } catch (error) {
    console.log("hereglegch burtgehed aldaa garalaa", error);
    return new NextResponse(
      JSON.stringify({ error: "hereglegch burtej chadsanguue" }),
      { status: 500 }
    );
  }
}
