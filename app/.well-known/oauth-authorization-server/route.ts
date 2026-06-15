import { NextResponse } from "next/server";

export async function GET() {
  const metadata = {
    issuer: "https://clipnexo.com",
    authorization_endpoint: "",
    token_endpoint: "",
    jwks_uri: "",
    scopes_supported: [],
    response_types_supported: [],
    grant_types_supported: [],
    subject_types_supported: [],
    id_token_signing_alg_values_supported: [],
    service_documentation: "https://clipnexo.com/llms.txt",
    op_policy_uri: "https://clipnexo.com/es/politica-de-privacidad",
    op_tos_uri: "https://clipnexo.com/es/terminos-de-servicio",
  };

  return new NextResponse(JSON.stringify(metadata, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
