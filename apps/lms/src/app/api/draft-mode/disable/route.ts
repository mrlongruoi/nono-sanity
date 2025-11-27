// src/app/api/draft-mode/disable/route.ts

import { draftMode } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  (await draftMode()).disable();
  
  // Get the redirect URL from query params (sent by Presentation Tool)
  const url = new URL(request.url);
  const redirectTo = url.searchParams.get('redirect') || '/';
  
  return NextResponse.redirect(new URL(redirectTo, request.url));
}