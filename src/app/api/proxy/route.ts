import { NextResponse } from "next/server";

// Whitelisted hosts that can be proxied
const ALLOWED_HOSTS = ["filedn.com"];

export async function GET(request: Request) {
  try {
  const reqUrl = new URL(request.url);
  const urlParam = reqUrl.searchParams.get("url");
    if (!urlParam) return NextResponse.json({ error: "missing url" }, { status: 400 });

    let target: URL;
    try {
      target = new URL(urlParam);
    } catch {
      return NextResponse.json({ error: "invalid url" }, { status: 400 });
    }

    if (!ALLOWED_HOSTS.includes(target.hostname.replace(/^www\./, ""))) {
      return NextResponse.json({ error: "host not allowed" }, { status: 403 });
    }

    // Forward Range header if present to support seeking
    const range = request.headers.get("range") || undefined;

    const headers: Record<string, string> = {};
    if (range) headers["range"] = range;

    const upstream = await fetch(target.toString(), { headers, method: "GET" });

  // Stream response back with status and headers
  const resHeaders = new Headers();
    // Copy some useful headers
    const copyList = ["content-type", "content-length", "accept-ranges", "content-range"];
    copyList.forEach((h) => {
      const v = upstream.headers.get(h);
      if (v) resHeaders.set(h, v);
    });

    // If upstream failed, add debug headers to help identify the problem in dev
    if (!upstream.ok) {
      resHeaders.set('X-Upstream-Status', String(upstream.status));
      resHeaders.set('X-Upstream-URL', target.toString());
    }

    // CORS - allow origin and allow range
    resHeaders.set("Access-Control-Allow-Origin", "*");
    resHeaders.set("Access-Control-Expose-Headers", "Content-Range, Accept-Ranges, Content-Length, Content-Type");

    return new NextResponse(upstream.body, { status: upstream.status, headers: resHeaders });
  } catch {
    return NextResponse.json({ error: "internal error" }, { status: 500 });
  }
}
