export async function GET() {
  const res = await fetch("https://dummyjson.com/products", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();

  return Response.json({ data });
}
