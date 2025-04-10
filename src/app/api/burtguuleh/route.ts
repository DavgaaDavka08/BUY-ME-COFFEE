import { NextResponse } from "next/server";
import { runQuery } from "../../../../utils/qeuryService";

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { username, password, email } = await req.json();

    if (!username || !password || !email) {
      return NextResponse.json(
        { error: "Бүх талбарыг бүрэн бөглөнө үү" },
        { status: 400 }
      );
    }

    // 1. Хэрэглэгч давхардах эсэхийг шалгах
    const checkedUser = `SELECT * FROM "user" WHERE username = $1 OR email = $2;`;
    const existingUser = await runQuery(checkedUser, [username, email]);

    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: "username эсвэл email аль нэг нь бүртгэлтэй байна" },
        { status: 400 }
      );
    }

    // 2. Шинэ хэрэглэгч үүсгэх
    const createUser = `
      INSERT INTO "user" (username, email, password, receiveddonations, createdat, profileid, bankcard, updatedat)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `;
    const now = new Date().toISOString();
    const receiveddonations = "0₮";
    const profileid = "";
    const bankcard = "";
    const newUser = await runQuery(createUser, [
      username,
      email,
      password,
      receiveddonations,
      now,
      profileid,
      bankcard,
      now,
    ]);

    return NextResponse.json(
      {
        user: newUser[0],
        message: "Амжилттай бүртгэгдлээ",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Хэрэглэгч бүртгэхэд алдаа гарлаа:", error);
    return NextResponse.json(
      { error: "Серверийн алдаа: хэрэглэгч үүсгэхэд амжилтгүй боллоо" },
      { status: 500 }
    );
  }
}
