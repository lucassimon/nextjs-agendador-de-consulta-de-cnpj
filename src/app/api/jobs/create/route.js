import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import client from "../client";



export const POST = async (req) => {
  const data = await req.json();  
  const token = await getToken({ req })
  if (token) {
    try {
      const response = await client.post('/jobs', data, {headers: {
        'Authorization': `Bearer ${token.accessToken}`
      }})
      // console.log(response.data)
      return NextResponse.json({ ok: true}, { status: 200 });
    } catch (err) {
      // console.log(err)
      return NextResponse.json({ err: true }, { status: err.response.status });
    }
  } else {
    // Not Signed in
    console.log('sem token')
    return NextResponse.json({ err: true }, { status: 401 });
  }
};
  