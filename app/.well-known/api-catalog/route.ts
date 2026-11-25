import { NextResponse } from "next/server";

export async function GET() {
  const catalog = {
    linkset: [
      {
        anchor: "https://clipnexo.com",
        "service-desc": "https://clipnexo.com/llms.txt",
        "service-doc": "https://clipnexo.com/es/herramientas",
        status: "https://clipnexo.com",
      },
    ],
  };

  return new NextResponse(JSON.stringify(catalog, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/linkset+json",
    },
  });
}
