export async function GET() {
  return new Response(JSON.stringify({ data: "ajilna" }));
}
export const POST = async (req: Request) => {
  const body = await req.json();
  console.log(body);
  return new Response("hello world");
};
