import React from "react";
import Link from "next/link";

export default function ConfirmRegistration() {
  return (
    <div>
      <h1>Thanks for registering for Budget Planner</h1>
      <p>Please check your email, and spam, for a confirmation link.</p>
      <p>
        If you have not received an email please{" "}
        <Link href={"/confirmation/resend"}>click here</Link>
      </p>
    </div>
  );
}
