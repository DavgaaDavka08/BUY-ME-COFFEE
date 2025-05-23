import { NextResponse } from "next/server";
import { runQuery } from "../../../../utils/qeuryService";

export async function GET(): Promise<NextResponse> {
  try {
    const getUsers = `SELECT * FROM "user" ORDER BY "createdat" DESC;`;
    const users = await runQuery(getUsers, []);
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.log("Хэрэглэгч авахад алдаа гарлаа:", error);
    return NextResponse.json(
      { error: "Хэрэглэгч татаж чадсангүй" },
      { status: 500 }
    );
  }
}
