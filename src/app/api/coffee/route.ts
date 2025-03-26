import User from "../../../../_BACK-END/user";

export async function GET() {
  const user = await User();
  return new Response(JSON.stringify({ data: user }));
}

export async function POST(req: Request) {
  const body = await req.json();
  console.log({ body });
  return new Response(
    JSON.stringify({ message: "Hello world", received: body })
  );
}
