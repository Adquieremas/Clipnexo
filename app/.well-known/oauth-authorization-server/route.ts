import { NextResponse } from "next/server";

export async function GET() {
  const metadata = {
    resource: "https://clipnexo.com/",
    authorization_servers: ["https://clipnexo.com"],
    scopes_supported: [],
    bearer_methods_supported: ["header"],
    issuer: "https://clipnexo.com",
    service_documentation: "https://clipnexo.com/llms.txt",
    op_policy_uri: "https://clipnexo.com/es/politica-de-privacidad",
    op_tos_uri: "https://clipnexo.com/es/terminos-de-servicio",
    agent_auth: {
      skill: "https://clipnexo.com/auth.md",
      identity_endpoint: "",
      identity_types_supported: [],
      events_supported: [],
    },
  };

  return new NextResponse(JSON.stringify(metadata, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
