export const maxDuration = 300;

export async function POST(req: Request) {
  const formData = await req.formData();
  const audio = formData.get("audio") as File;
  const image = formData.get("image") as File;

  const body = new FormData();
  body.append("audio", audio);
  body.append("image", image);

  const response = await fetch(
    "http://127.0.0.1:8000/generate",
    {
      method: "POST",
      body,
      signal: AbortSignal.timeout(300000),
    }
  );

  const videoBuffer = await response.arrayBuffer();

  return new Response(videoBuffer, {
    headers: {
      "Content-Type": "video/mp4",
      "Content-Disposition": 'attachment; filename="output.mp4"',
    },
  });
}
