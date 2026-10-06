import { NextRequest } from "next/server";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import { createApraxusMcpServer } from "@/lib/mcp/server";
import { verifyApraxusApiKey } from "@/lib/mcp/auth";

export const runtime = "nodejs";

async function handleMcpRequest(request: NextRequest) {
  const authorization = request.headers.get("authorization");

  if (!authorization) {
    return new Response("Missing Authorization header", { status: 401 });
  }

  const [type, token] = authorization.split(" ");

  if (type?.toLowerCase() !== "bearer" || !token) {
    return new Response("Invalid Authorization header", { status: 401 });
  }

  let authInfo;

  try {
    authInfo = await verifyApraxusApiKey(
      token,
      request.headers.get("x-apraxus-developer-id") ?? undefined,
    );
  } catch {
    return new Response("Invalid or revoked Apraxus API key", {
      status: 401,
    });
  }

  const server = createApraxusMcpServer();
  const transport = new WebStandardStreamableHTTPServerTransport();

  await server.connect(transport);

  const response = await transport.handleRequest(request, {
    authInfo,
  });

  return response;
}

export async function POST(request: NextRequest) {
  return handleMcpRequest(request);
}

export async function GET(request: NextRequest) {
  return handleMcpRequest(request);
}

export async function DELETE(request: NextRequest) {
  return handleMcpRequest(request);
}
