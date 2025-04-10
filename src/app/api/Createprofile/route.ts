import { NextResponse } from "next/server";
import { runQuery } from "../../../../utils/qeuryService";

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { name, about, avatarImage, socialMediaURL, id } = await req.json();
    //2shine hereglegch burtgeh;
    const createUser = `INSERT INTO "public"."createprofile" 
(name, about, "avatarImage", "socialMediaURL", "createdAt", "updatedAt") 
VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`;
    console.log({ name, about, avatarImage, socialMediaURL });
    const newUser = await runQuery(createUser, [
      name,
      about,
      avatarImage,
      socialMediaURL,
      new Date(),
      new Date(),
    ]);
    const update = `UPDATE "user" SET "profileid" = $1 WHERE id = $2`;
    const updateUser = await runQuery(update, [newUser[0]?.id, id]);
    if (!updateUser) {
      return NextResponse.json(
        { error: "username эсвэл email аль нэг нь бүртгэлтэй байна" },
        { status: 400 }
      );
    }
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
      JSON.stringify({ error: "hereglegch burtgej chadsanguue" }),
      { status: 500 }
    );
  }
}
