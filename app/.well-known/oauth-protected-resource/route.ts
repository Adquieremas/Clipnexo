import { NextResponse } from "next/server";

export async function GET() {
  const metadata = {
    resource: "https://clipnexo.com/",
    resource_name: "Clipnexo",
    authorization_servers: ["https://clipnexo.com"],
    scopes_supported: ["public"],
    bearer_methods_supported: ["header"],
  };

  return new NextResponse(JSON.stringify(metadata, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
