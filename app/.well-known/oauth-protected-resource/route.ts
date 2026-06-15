import { NextResponse } from "next/server";

export async function GET() {
  const metadata = {
    resource: "https://clipnexo.com/",
    resource_name: "Clipnexo",
    resource_logo_uri: "https://clipnexo.com/icon.png",
    authorization_servers: [],
    scopes_supported: [],
    bearer_methods_supported: [],
  };

  return new NextResponse(JSON.stringify(metadata, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
