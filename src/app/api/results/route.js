import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt"
import client from "./client";

export const GET = async (req, params) => { 
  const job_id = req.nextUrl.searchParams.get("job_id");
  const token = await getToken({ req })

  const url = `/results?job_id=${job_id}`

  if (token) {
    try {
      const response = await client.get(url, {headers: {
        'Authorization': `Bearer ${token.accessToken}`
      }})
      return NextResponse.json(response.data, { status: 200 });
    } catch (err) {
      return NextResponse.json(err.response.data, { status: err.response.status });
    }
  } else {
    // Not Signed in
    console.log('sem token')
    return NextResponse.json({ err: true }, { status: 401 });
  }
};