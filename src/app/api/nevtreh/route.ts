import { NextResponse } from "next/server";
import { runQuery } from "../../../../utils/qeuryService";
interface User {
  id: number;
  email: string;
  password: string;
}
export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email болон нууц үгийг бөглөнө үү" },
        { status: 400 }
      );
    }
    // 1. Хэрэглэгч байгаа эсэхийг шалгах
    const getUser = `SELECT * FROM "user" WHERE email = $1;`;
    const result = await runQuery(getUser, [email]);

    if (result.length === 0) {
      return NextResponse.json(
        { error: "Хэрэглэгч олдсонгүй" },
        { status: 401 }
      );
    }
    const user = result[0] as User;
    const isValidPassword = user.password === password;
    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Нууц үг буруу байна" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      user,
      message: "Амжилттай нэвтэрлээ",
    });
  } catch (err) {
    console.error("Login дээр алдаа гарлаа:", err);
    return NextResponse.json(
      { error: "Серверийн алдаа гарлаа" },
      { status: 500 }
    );
  }
}
