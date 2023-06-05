import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt"
import client from "../../jobs/client";

export const GET = async (req, { params }) => {
  const { id } = params;

  const token = await getToken({ req })
  
  const url = `/job/${id}`
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

export const DELETE = async (request, { params }) => {
  const { id } = params;

  try {

    return new NextResponse("Post has been deleted", { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
