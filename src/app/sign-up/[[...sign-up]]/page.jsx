"use client";
import { SignUp } from "@clerk/nextjs";

export default function SignInPage() {
  return <SignUp routing="path" path="/sign-up" />;
}
