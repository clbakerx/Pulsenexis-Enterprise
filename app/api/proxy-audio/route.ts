// app/api/proxy-audio/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const audioUrl = searchParams.get('url');
  
  if (!audioUrl) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
  }

  try {
    // Handle range requests for audio streaming
    const range = request.headers.get('range');
    const fetchHeaders: HeadersInit = {
      'User-Agent': 'PulseNexis-Audio-Proxy/1.0',
      'Accept': 'audio/*,*/*;q=0.9',
      'Cache-Control': 'public, max-age=3600'
    };

    // Forward range header if present for streaming
    if (range) {
      fetchHeaders['Range'] = range;
    }

    const response = await fetch(audioUrl, {
      headers: fetchHeaders
    });
    
    if (!response.ok) {
      return NextResponse.json({ 
        error: `Failed to fetch audio: ${response.status} ${response.statusText}`,
        url: audioUrl 
      }, { status: response.status });
    }

    const contentType = response.headers.get('content-type') || 'audio/mpeg';
    const contentLength = response.headers.get('content-length');
    const contentRange = response.headers.get('content-range');
    
    // Stream the response instead of buffering it entirely
    const stream = response.body;
    
    // Enhanced response headers for streaming
    const responseHeaders: HeadersInit = {
      'Content-Type': contentType,
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Range, Accept, Accept-Encoding',
      'Access-Control-Expose-Headers': 'Content-Length, Content-Range, Accept-Ranges',
      'Cross-Origin-Resource-Policy': 'cross-origin',
      'X-Content-Type-Options': 'nosniff'
    };

    if (contentLength) {
      responseHeaders['Content-Length'] = contentLength;
    }

    if (contentRange) {
      responseHeaders['Content-Range'] = contentRange;
    }

    const status = response.status === 206 ? 206 : 200; // Maintain partial content status

    return new NextResponse(stream, {
      status,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json({ 
      error: 'Failed to proxy audio',
      details: error instanceof Error ? error.message : 'Unknown error',
      url: audioUrl
    }, { status: 500 });
  }
}

// Handle preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Range, Accept, Accept-Encoding',
      'Access-Control-Max-Age': '86400',
    },
  });
}