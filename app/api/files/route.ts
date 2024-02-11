import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: Request, { params }: any) {
  console.log(request);
  const greeting = 'Hello World!!';
  const json = {
    greeting
  };

  return NextResponse.json(json);
}
