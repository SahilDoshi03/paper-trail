export async function GET() {
  const key = process.env.GOOGLE_API_KEY;
  const res = await fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${key}`);
  const data = await res.json();

  return Response.json(data);
}

