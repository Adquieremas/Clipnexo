import { NextResponse } from "next/server";

export async function GET() {
  const catalog = {
    linkset: [
      {
        anchor: "https://clipnexo.com/api/download",
        "service-desc": "https://clipnexo.com/api/download",
        "service-doc": "https://clipnexo.com/es/descargar-tiktok",
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
