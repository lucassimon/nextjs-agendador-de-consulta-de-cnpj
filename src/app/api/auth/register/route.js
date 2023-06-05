import { NextResponse } from "next/server";


const client = axios.create({baseURL: process.env.MS_API_USERS});

export const POST = async (request) => {
  const data = await request.json();

  try {
    await client.post('/users', data)
    return NextResponse.json({ success: true}, {status: 201});

  } catch (err) {
    const message = err.response.data?.message || 'An error occurred'
    return NextResponse.json({ error: message }, { status: err.response.status });
  }
};

