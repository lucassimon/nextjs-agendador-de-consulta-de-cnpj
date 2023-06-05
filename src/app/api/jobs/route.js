import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt"
import client from "./client";

export const GET = async (req) => { 
  const token = await getToken({ req })
  console.log(token)

  const page_id = req.nextUrl.searchParams.get("page");
  const per_page = req.nextUrl.searchParams.get("per_page");
  const url = `/jobs?page=${page_id}&per_page=${per_page}`
  // console.log(page_id,per_page, url )

  if (token) {
    try {
      const response = await client.get(url, {headers: {
        'Authorization': `Bearer ${token.accessToken}`
      }})
      // console.log(response)
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