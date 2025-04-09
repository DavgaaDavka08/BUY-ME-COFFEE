import { NextResponse } from "next/server";
import { runQuery } from "../../../../utils/qeuryService";

export async function GET(): Promise<NextResponse> {
  try {
    const getUsers = `SELECT * FROM "createprofile" ORDER BY "createdAt" DESC;`;
    const users = await runQuery(getUsers, []);
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.log("Хэрэглэгчийн жагсаалт авахад алдаа гарлаа:", error);
    return NextResponse.json(
      { error: "Хэрэглэгчийн жагсаалт татаж чадсангүй" },
      { status: 500 }
    );
  }
}
